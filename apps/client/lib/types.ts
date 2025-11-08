type BookState = "Disponible" | "Prestado" | "Reservado" | "Inactivo";

export interface Book {
  id: number;
  cover: Cover;
  title: string;
  description: string;
  author: Author;
  stock_quantity: number;
  book_state: BookState;
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: number;
  limit_date: string;
  return_date: string;
  loan_state: LoanState;
  user: User;
  books: Book[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export type LoanState = "Pendiente" | "Devuelto" | "Retrasado";

export interface Category {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  name: string;
}

export interface Cover {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  format: CoverFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface CoverFormats {
  thumbnail: Format;
  small: Format;
  medium: Format;
  large: Format;
}
