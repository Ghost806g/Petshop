import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PetSitter Pro",
  description: "O sistema premium para gestão de Dog Walkers e Pet Sitters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-layout">
          <aside className="sidebar glass-panel">
            <div className="brand">🐾 PetSitter Pro</div>
            <nav className="nav-menu">
              <a href="#" className="nav-item active">Dashboard</a>
              <a href="#" className="nav-item">Agenda</a>
              <a href="#" className="nav-item">Clientes & Pets</a>
              <a href="#" className="nav-item">Faturamento</a>
            </nav>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
