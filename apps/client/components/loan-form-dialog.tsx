"use client";
import type React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createLoan, getBooks, getUsers } from "@/lib/strapi-api";
import type { Book } from "@/lib/types";
import { useEffect, useState } from "react";

interface LoanFormDialogProps {
	trigger: React.ReactNode;
	onSuccess?: () => void;
}

export function LoanFormDialog({ trigger, onSuccess }: LoanFormDialogProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [books, setBooks] = useState<Book[]>([]);
	const [users, setUsers] = useState<any[]>([]);
	const [formData, setFormData] = useState({
		libro: "",
		usuario: "",
		dias_prestamo: "7",
		observaciones: "",
	});

	useEffect(() => {
		const loadData = async () => {
			try {
				const [booksRes, usersRes] = await Promise.all([
					getBooks({ estado: "disponible", pageSize: 100 }),
					getUsers({ estado: "activo", pageSize: 100 }),
				]);

				setBooks(booksRes.data || []);
				setUsers(usersRes.data || []);
			} catch (error) {
				console.error("[v0] Error loading data:", error);
			}
		};
		if (open) {
			loadData();
		}
	}, [open]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const fechaVencimiento = new Date();
			fechaVencimiento.setDate(
				fechaVencimiento.getDate() + Number.parseInt(formData.dias_prestamo),
			);

			await createLoan({
				libro: Number.parseInt(formData.libro),
				usuario: Number.parseInt(formData.usuario),
				fecha_vencimiento: fechaVencimiento.toISOString(),
				observaciones: formData.observaciones,
			});

			setOpen(false);
			onSuccess?.();

			setFormData({
				libro: "",
				usuario: "",
				dias_prestamo: "7",
				observaciones: "",
			});
		} catch (error) {
			console.error("[v0] Error creating loan:", error);
			alert("Error al crear el préstamo. Por favor intenta de nuevo.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Nuevo Préstamo</DialogTitle>
					<DialogDescription>
						Registra un nuevo préstamo de libro
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="libro">Libro *</Label>
						<Select
							value={formData.libro}
							onValueChange={(value) =>
								setFormData({ ...formData, libro: value })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona un libro" />
							</SelectTrigger>
							<SelectContent>
								{books.map((book) => (
									<SelectItem key={book.id} value={book.id.toString()}>
										{book.title} - {book.author.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="usuario">Usuario *</Label>
						<Select
							value={formData.usuario}
							onValueChange={(value) =>
								setFormData({ ...formData, usuario: value })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona un usuario" />
							</SelectTrigger>
							<SelectContent>
								{users.map((user) => (
									<SelectItem key={user.id} value={user.id.toString()}>
										{user.attributes.nombre} {user.attributes.apellido} (
										{user.attributes.tipo_usuario})
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="dias">Días de préstamo *</Label>
						<Select
							value={formData.dias_prestamo}
							onValueChange={(value) =>
								setFormData({ ...formData, dias_prestamo: value })
							}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="3">3 días (Estudiante)</SelectItem>
								<SelectItem value="7">7 días (Docente)</SelectItem>
								<SelectItem value="14">
									14 días (Docente - extendido)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="observaciones">Observaciones</Label>
						<Textarea
							id="observaciones"
							value={formData.observaciones}
							onChange={(e) =>
								setFormData({ ...formData, observaciones: e.target.value })
							}
							rows={3}
							placeholder="Notas adicionales sobre el préstamo..."
						/>
					</div>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							disabled={loading || !formData.libro || !formData.usuario}
						>
							{loading ? "Creando..." : "Crear Préstamo"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
