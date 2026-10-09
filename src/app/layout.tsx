import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetSitter Pro",
  description: "O sistema premium para gestão de Dog Walkers e Pet Sitters.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-BR">
      <body>
        <div className="app-layout">
          {session?.user && <Sidebar />}
          <main className="main-content">
            {session?.user && <TopBar user={session.user} />}
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
