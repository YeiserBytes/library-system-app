'use client'
// @ts-expect-error TS7016: Could not find module or type declarations for side-effect import of './globals.css'.
import "../globals.css";
import Cookies from '@/node_modules/@types/js-cookie';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useRouter } from "next/navigation";
import { logoutUserAction } from "@/actions/auth";
import { getCurrentUserService } from "@/lib/strapi";
import { useState, useEffect } from "react";

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
  }

  useEffect(() => {
    const token = Cookies.get("token") || "";
    getCurrentUserService(token)
      .then((user) => setUsername(user))
      .catch((err) => {
        console.error("Failed to get current user:", err);
      });
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar logout={handleLogout} username={username} />
      <SidebarTrigger style={{ margin: 10 }} />
      <main className="flex-1">{children}</main>
    </SidebarProvider>
  );
}
