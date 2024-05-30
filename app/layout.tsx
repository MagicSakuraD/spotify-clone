import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import SupabaseProvider from "@/providers/SupabaseProvider";
import { User } from "lucide-react";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
const font = Figtree({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Sidebar>{children}</Sidebar>
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
