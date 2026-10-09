"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar glass-panel">
      <div className="brand">🐾 PetSitter Pro</div>
      <nav className="nav-menu">
        <Link 
          href="/" 
          className={`nav-item ${pathname === '/' ? 'active' : ''}`}
        >
          🏠 Painel do Pet
        </Link>
        <Link 
          href="/agendamentos" 
          className={`nav-item ${pathname?.startsWith('/agendamentos') ? 'active' : ''}`}
        >
          📅 Agendamentos
        </Link>
        <Link 
          href="#" 
          className={`nav-item ${pathname?.startsWith('/diarios') ? 'active' : ''}`}
        >
          📸 Diários e Fotos
        </Link>
        <Link 
          href="/pets" 
          className={`nav-item ${pathname?.startsWith('/pets') ? 'active' : ''}`}
        >
          🐾 Meus Pets
        </Link>
        <Link 
          href="/planos" 
          className={`nav-item ${pathname?.startsWith('/planos') ? 'active' : ''}`}
        >
          💳 Planos e Pagamentos
        </Link>
      </nav>
    </aside>
  );
}
