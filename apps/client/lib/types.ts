type BookState = "Disponible" | "Prestado" | "Reservado" | "Inactivo";

interface BaseResponse {
  data: any[];
  meta: Meta;
}

interface BaseItems {
  id: number;
  documentId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface BooksData extends BaseResponse {
  data: Book[];
  meta: Meta;
}

export interface Book extends BaseItems {
  title: string;
  description: string;
  code: string;
  publisher: string;
  publication_year: number;
  total_copies: number;
  available_copies: number;
  book_status: "available" | "borrowed" | "reserved" | "inactive";
  location: null;
  isbn: string;
  author: Author;
  cover: Cover;
  category: Author;
  loans: Loan[];
  reservations: any[];
}

export interface Author extends BaseItems {
  name: string;
  slug?: string;
  description?: Description[];
}

export interface Description {
  type: string;
  children: Child[];
}

export interface Child {
  type: Type;
  text: string;
  bold?: boolean;
}

export enum Type {
  Text = "text",
}

export interface Cover extends BaseItems {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: EXT;
  mime: MIME;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export enum EXT {
  Jpg = ".jpg",
  Webp = ".webp",
}

export interface Formats {
  thumbnail: Large;
  small?: Large;
  medium?: Large;
  large?: Large;
}

export interface Large {
  name: string;
  hash: string;
  ext: EXT;
  mime: MIME;
  path: null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export enum MIME {
  ImageJPEG = "image/jpeg",
  ImageWebp = "image/webp",
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface LoanData extends BaseResponse{
  data: LoanData[];
}

export interface Loan extends BaseItems {
  return_date: Date;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  loan_date: Date;
  due_date: Date;
  loan_status: string;
  notes: null | string;
  renewal_count: number;
  condition_at_loan: string;
  condition_at_return: null | string;
  user: ApprovedBy | null;
  book: Book | null;
  approved_by: ApprovedBy | null;
}

export interface ApprovedBy {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
