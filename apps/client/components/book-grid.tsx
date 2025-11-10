"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { STRAPI_BASE_URL } from "@/lib/strapi";
import type { Book } from "@/lib/types";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import SkeletonCard from "./skeletons/skeleton-card";

const statusConfig = {
	available: {
		label: "Disponible",
		color: "bg-green-500 text-green-50",
	},
	borrowed: {
		label: "Prestado",
		color: "bg-red-500 text-destructive-foreground",
	},
	reserved: {
		label: "Reservado",
		color: "bg-yellow-500 text-secondary-foreground",
	},
	inactive: { label: "Inactivo", color: "bg-muted text-muted-foreground" },
};

export function BookGrid() {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${STRAPI_BASE_URL}/api/books?populate=*`);
			const data = await res.json();

			const books = data.data as Book[];
			setBooks(books);
		};

		fetchData();
	}, []);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<p className="text-sm text-muted-foreground">
					Mostrando {books.length} libros
				</p>
			</div>

			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{books.map((book) => (
							<Card
								key={book.id}
								className="border-border/50 hover:shadow-lg transition-shadow"
							>
								<CardContent>
									<header className="flex relative items-start justify-between mb-4">
										<div className="w-64 h-80 flex items-center justify-center relative">
											<img
												src={`http://localhost:1337${book.cover.url}`}
												alt={book.cover.alternativeText}
												className="h-full w-full rounded-lg"
											/>
											<Badge
												variant="secondary"
												className={`${statusConfig[book.book_status as keyof typeof statusConfig].color} text-xs absolute top-2 right-2`}
											>
												{
													statusConfig[
														book.book_status as keyof typeof statusConfig
													].label
												}
											</Badge>
										</div>
									</header>

									<h3 className="font-semibold text-lg mb-2 leading-tight line-clamp-2">
										{book.title}
									</h3>

									<div className="space-y-2 mb-4">
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<User className="w-4 h-4" />
											<span className="text-sm text-muted-foreground line-clamp-1">
												{book.author.name}
											</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Calendar className="w-4 h-4" />
											<span className="text-sm text-muted-foreground">
												{book.publication_year}
											</span>
										</div>
									</div>

									<div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
										<div>
											<p className="text-xs text-muted-foreground mb-1">
												Código
											</p>
											<p className="text-sm font-mono font-medium">
												{book.code}
											</p>
										</div>
										<div className="text-right">
											<p className="text-xs text-muted-foreground mb-1">
												Disponibles
											</p>
											<p className="text-sm font-bold">
												{book.available_copies}/{book.total_copies}
											</p>
										</div>
									</div>

									<Button
										className="w-full cursor-pointer mt-5"
										variant={book.available_copies > 0 ? "default" : "ghost"}
									>
										{book.available_copies > 0 ? "Prestar Libro" : "Reservar"}
									</Button>
								</CardContent>
							</Card>
						))}
			</div>
		</div>
	);
}
