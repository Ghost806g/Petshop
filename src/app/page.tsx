import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/login");
  }

  // Pega o primeiro nome do usuário
  const firstName = session.user.name?.split(" ")[0] || "Usuário";

  return (
    <div className="page-container">
      <header className="header-section">
        <div>
          <h1 className="title">Bem-vindo, {firstName}! 🐾</h1>
          <p className="subtitle">Descubra o que preparamos para o seu melhor amigo hoje.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link href="/pets" className="btn-primary" style={{ textDecoration: "none", display: "inline-block", textAlign: "center" }}>
            + Cadastrar Pet
          </Link>
        </div>
      </header>

      <main>
        {/* BANNER CHAMATIVO E PROFISSIONAL */}
        <div style={{ 
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", 
          borderRadius: "24px", 
          padding: "40px", 
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 30px rgba(168, 237, 234, 0.4)",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "relative", zIndex: 2 }}>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px", color: "#2d3748" }}>O Spa que seu Pet merece! ✨</h2>
            <p style={{ fontSize: "17px", color: "#4a5568", maxWidth: "500px", lineHeight: "1.6" }}>
              Nossa missão é trazer conforto, diversão e muita saúde para o seu melhor amigo. Conheça nossos serviços premium e faça parte da família.
            </p>
          </div>
          <div style={{ fontSize: "80px", position: "relative", zIndex: 2, opacity: 0.9 }}>
            🐕
          </div>
        </div>

        {/* VITRINE DE SERVIÇOS (O que o Petshop tem a oferecer) */}
        <h2 style={{ fontSize: "1.6rem", marginBottom: "20px", color: "var(--text-primary)" }}>Nossos Serviços Premium</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "50px" }}>
          
          <div className="glass-panel" style={{ padding: "30px", borderRadius: "24px", borderTop: "5px solid #ff6b6b", transition: "transform 0.2s" }}>
            <div style={{ fontSize: "45px", marginBottom: "20px" }}>🦮</div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "var(--text-primary)" }}>Passeios Educativos</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
              Passeios focados em gastar energia e treinar comandos básicos. Mais saúde e obediência para o seu cão.
            </p>
            <Link href="/agendamentos/novo" style={{ color: "#ff6b6b", fontWeight: "bold", textDecoration: "none", fontSize: "15px" }}>Agendar Agora →</Link>
          </div>

          <div className="glass-panel" style={{ padding: "30px", borderRadius: "24px", borderTop: "5px solid #48bb78", transition: "transform 0.2s" }}>
            <div style={{ fontSize: "45px", marginBottom: "20px" }}>🛁</div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "var(--text-primary)" }}>Banho Hipoalergênico</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
              SPA completo com shampoos importados e massagem relaxante. Pelagem macia e livre de alergias.
            </p>
            <Link href="/agendamentos/novo" style={{ color: "#48bb78", fontWeight: "bold", textDecoration: "none", fontSize: "15px" }}>Agendar Agora →</Link>
          </div>

          <div className="glass-panel" style={{ padding: "30px", borderRadius: "24px", borderTop: "5px solid #805ad5", transition: "transform 0.2s" }}>
            <div style={{ fontSize: "45px", marginBottom: "20px" }}>🏠</div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "var(--text-primary)" }}>Resort & Hospedagem</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
              Vai viajar? Deixe seu pet no nosso resort livre de gaiolas com supervisão de veterinários 24h por dia.
            </p>
            <Link href="/agendamentos/novo" style={{ color: "#805ad5", fontWeight: "bold", textDecoration: "none", fontSize: "15px" }}>Saber Mais →</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
