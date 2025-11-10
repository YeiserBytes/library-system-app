"use client";

import "../globals.css";
import Cookies from "js-cookie";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { logoutUserAction } from "@/actions/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCurrentUserService } from "@/lib/strapi";

function Loading() {
	return (
		<section className="flex justify-center items-center flex-1">
			<div className="m-auto text-center">
				<LoaderCircle className="mx-auto mb-4 h-10 w-10 animate-spin text-primary" />
				Cargando...
			</div>
		</section>
	);
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const [username, setUsername] = useState<string>("");

	const handleLogout = () => {
		logoutUserAction().then(() => {
			router.push("/signin");
		});
	};

	useEffect(() => {
		const token = Cookies.get("token") || "";
		const name = Cookies.get("username") || "";

		Promise.resolve().then(() => setUsername(name));

		getCurrentUserService(token)
			.then((user) => setUsername(user))
			.catch((err) => {
				console.error("Failed to get current user:", err);
			});
	}, []);

	const isMobile = useIsMobile();

	return (
		<SidebarProvider>
			{isMobile ? <SidebarTrigger style={{ marginBlock: "1rem" }} /> : null}
			<AppSidebar logout={handleLogout} username={username} />
			<main className="flex-1 flex flex-col overflow-hidden">
				<Suspense fallback={<Loading />}>{children}</Suspense>
			</main>
		</SidebarProvider>
	);
}
