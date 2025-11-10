import qs from "qs";
import type { Book, Loan } from "@/lib/types";
import { cacheLife, cacheTag } from "next/cache";

const STRAPI_BASE_URL =
	process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

const populateBooksQuery = qs.stringify(
	{
		populate: "*",
		sort: ["title:asc"],
	},
	{
		encodeValuesOnly: true,
	},
);

const populateLoansQuery = qs.stringify(
	{
		populate: ["user", "books"],
		sort: ["limit_date:desc"],
	},
	{
		encodeValuesOnly: true,
	},
);

export async function getAllBooks({
	token,
}: {
	token: string;
}): Promise<Book[]> {
	const response = await fetch(`${STRAPI_BASE_URL}/api/books?populate=*`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = (await response.json()) as { data: Book[] };

	return data.data;
}

export async function getAllLoans({
	token,
}: {
	token: string;
}): Promise<Loan[]> {
	const response = await fetch(
		`${STRAPI_BASE_URL}/api/loans?${populateLoansQuery}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	const data = (await response.json()) as { data: Loan[] };

	return data.data;
}

const populateReturnedLoansQuery = qs.stringify(
	{
		populate: ["user", "books"],
		filters: {
			loan_state: { $eq: "Devuelto" },
		},
		sort: ["return_date:desc"],
	},
	{
		encodeValuesOnly: true,
	},
);

export async function getBookReturns({
	token,
}: {
	token: string;
}) {
	const response = await fetch(
		`${STRAPI_BASE_URL}/api/loans?${populateReturnedLoansQuery}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	const data = (await response.json()) as { data: Loan[] };

	return data.data;
}

export const getStats = async ({ token }: { token: string }) => {
	// "use cache";
	const books = await getAllBooks({ token });
	const loans = await getAllLoans({ token });
	const returns = await getBookReturns({ token });

	return {
		totalBooks: books.length,
		currentBooksChange:
			(books.map(
				(book) =>
					new Date(book.createdAt) <
					new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			).length /
				books.length) *
			100,
		totalLoans: loans.length,
		currentLoansChange:
			(loans.map(
				(loan) =>
					new Date(loan.createdAt) <
					new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			).length /
				loans.length) *
			100,
		currentReturns: returns.length,
		currentReturnsChange:
			(returns.map(
				(loan) =>
					new Date(loan.createdAt) <
					new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			).length /
				returns.length) *
			100,
		totalActiveBooks: books.filter((book) => book.book_status === "Disponible")
			.length,
		currentActiveBooksChange:
			(books.map(
				(book) =>
					new Date(book.createdAt) <
					new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
			).length /
				books.length) *
			100,
	};
};
