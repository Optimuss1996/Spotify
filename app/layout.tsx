import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "./components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import Player from "./components/Player";
import { ThemeProvider } from "next-themes";
import { getPlaylists } from "@/action/getPlaylists";
import { Suspense } from "react";
import { ScaleLoader } from "react-spinners";

const inter = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Music",
  description: "Listen and Enjoy to music",
};
export const revalidate = 0;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPlaylists = await getPlaylists();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} `}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider />
              <Suspense fallback={<ScaleLoader />}>
                <Sidebar playlists={userPlaylists}>{children}</Sidebar>
              </Suspense>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
