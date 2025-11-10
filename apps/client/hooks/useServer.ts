import { useCallback, useState } from "react";

type Maybe<T> = T | null;

const STORAGE_KEY = "bibliotech_token";
const DEFAULT_BASE =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) ||
  (typeof process !== "undefined" && process.env.STRAPI_BASE_URL) ||
  "http://localhost:1337";

export interface Book {
  id: string | number;
  title: string;
  author?: string;
  isbn?: string;
  category?: string;
  status?: "available" | "borrowed" | "reserved";
  [key: string]: any;
}

export interface User {
  id: string | number;
  username: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

export interface Loan {
  id: string | number;
  bookId: string | number;
  userId: string | number;
  borrowedAt?: string;
  dueAt?: string;
  returnedAt?: string | null;
  [key: string]: any;
}

function buildUrl(path: string, base = DEFAULT_BASE) {
  return path.startsWith("http") ? path : `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

async function handleResponse(res: Response) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err: any = new Error(data?.message || res.statusText || "Server error");
    err.status = res.status;
    err.payload = data;
    throw err;
  }
  return data;
}

/**
 * useServer - Hook que expone métodos para interactuar con el backend.
 *
 * Ejemplo:
 * const { token, login, getBooks, createLoan, setToken, clearToken } = useServer();
 */
export default function useServer(baseUrl?: string) {
  const [token, setTokenState] = useState<Maybe<string>>(() => {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const setToken = useCallback((t: string | null) => {
    setTokenState(t);
    try {
      if (typeof window !== "undefined") {
        if (t) localStorage.setItem(STORAGE_KEY, t);
        else localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // noop
    }
  }, []);

  const clearToken = useCallback(() => setToken(null), [setToken]);

  const fetcher = useCallback(
    async (path: string, opts: RequestInit = {}) => {
      const url = buildUrl(path, baseUrl || DEFAULT_BASE);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(opts.headers as Record<string, string>),
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(url, { ...opts, headers });
      return handleResponse(res);
    },
    [token, baseUrl]
  );

  // Auth
  const login = useCallback(
    async (identifier: string, password: string) => {
      // Ajustar endpoint según backend (Strapi: /api/auth/local)
      const data = await fetcher("/api/auth/local", {
        method: "POST",
        body: JSON.stringify({ identifier, password }),
      });
      // Si la respuesta incluye jwt/ token, lo guardamos
      const jwt = data?.jwt || data?.token;
      if (jwt) setToken(jwt);
      return data;
    },
    [fetcher, setToken]
  );

  const me = useCallback(async () => {
    // Endpoint de ejemplo. Ajustar a /users/me o /api/users/me según backend.
    try {
      return await fetcher("/api/users/me");
    } catch (err) {
      throw err;
    }
  }, [fetcher]);

  // Books
  const getBooks = useCallback(
    async (params?: Record<string, any>) => {
      const query = params
        ? "?" +
          Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join("&")
        : "";
      return fetcher(`/api/books${query}`);
    },
    [fetcher]
  );

  const getBook = useCallback(
    async (id: string | number) => {
      return fetcher(`/api/books/${id}`);
    },
    [fetcher]
  );

  const createBook = useCallback(
    async (payload: Partial<Book>) => {
      return fetcher("/api/books", {
        method: "POST",
        body: JSON.stringify({ data: payload }),
      });
    },
    [fetcher]
  );

  // Loans (prestamos)
  const getLoans = useCallback(
    async (params?: Record<string, any>) => {
      const query = params
        ? "?" +
          Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join("&")
        : "";
      return fetcher(`/api/loans${query}`);
    },
    [fetcher]
  );

  const createLoan = useCallback(
    async (payload: Partial<Loan>) => {
      return fetcher("/api/loans", {
        method: "POST",
        body: JSON.stringify({ data: payload }),
      });
    },
    [fetcher]
  );

  const returnLoan = useCallback(
    async (loanId: string | number) => {
      return fetcher(`/api/loans/${loanId}/return`, {
        method: "POST",
      });
    },
    [fetcher]
  );

  return {
    // state
    token,
    setToken,
    clearToken,
    // low-level
    fetcher,
    // auth
    login,
    me,
    // books
    getBooks,
    getBook,
    createBook,
    // loans
    getLoans,
    createLoan,
    returnLoan,
    // utils
    baseUrl: baseUrl || DEFAULT_BASE,
  };
}
