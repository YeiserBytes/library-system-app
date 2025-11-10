/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { STRAPI_BASE_URL } from "@/lib/strapi";
import { Filter, X } from "lucide-react";
import { useEffect, useState } from "react";

const statuses = [
	{ id: "available", label: "Disponible" },
	{ id: "borrowed", label: "Prestado" },
	{ id: "reserved", label: "Reservado" },
];

function CategoriesSkeleton() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, idx) => (
				<div
					key={`skeleton-${idx}`}
					className="h-4 w-full bg-muted rounded animate-pulse mb-2"
				></div>
			))}
		</>
	);
}

export function CatalogFilters() {
	const [isLoading, setIsLoading] = useState(true);
	const [categories, setCategories] = useState<{ id: string; name: string }[]>(
		[],
	);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(`${STRAPI_BASE_URL}/api/categories?populate=*`);
			const data = await res.json();

			const categories = data.data.map(
				(category: { id: string; name: string }) => ({
					id: category.id,
					name: category.name,
				}),
			);
			setCategories(categories);
			setIsLoading(false);
		};

		fetchData();
	}, []);

	return (
		<Card className="border-border/50 sticky top-10">
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span className="flex items-center gap-2">
						<Filter className="w-4 h-4" />
						Filtros
					</span>
					<Button variant="ghost" size="sm" className="h-8 px-2">
						<X className="w-4 h-4" />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-3">
					<div className="space-y-2">
						<Label className="text-sm font-semibold">Categoría</Label>
						{isLoading ? (
							<CategoriesSkeleton />
						) : (
							categories.map((category) => (
								<div key={category.id} className="flex items-center space-x-2">
									<Checkbox id={category.id} />
									<label
										htmlFor={category.id}
										className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{category.name}
									</label>
								</div>
							))
						)}
					</div>
					<div className="space-y-2">
						<Label className="text-sm font-semibold">Estado</Label>
						{statuses.map((status) => (
							<div key={status.id} className="flex items-center space-x-2">
								<Checkbox id={status.id} />
								<label
									htmlFor={status.id}
									className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									{status.label}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="space-y-3">
					<Label className="text-sm font-semibold">Año de Publicación</Label>
					<Slider defaultValue={[2000]} max={2024} min={1900} step={1} />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>1900</span>
						<span>2024</span>
					</div>
				</div>

				<Button className="w-full">Aplicar Filtros</Button>
			</CardContent>
		</Card>
	);
}
