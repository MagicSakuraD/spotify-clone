import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import SupabaseProvider from "@/providers/SupabaseProvider";

import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
const font = Figtree({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

export const metadata: Metadata = {
  title: "Muinn",
  description: "Listen to music and play!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
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
              <Sidebar songs={userSongs}>{children}</Sidebar>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
