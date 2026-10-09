import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link"; 

export default async function PerfilPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Estilo premium para os botões
  const estiloBotao = {
    display: "block",
    width: "100%",
    padding: "15px", 
    background: "rgba(255, 255, 255, 0.9)", 
    color: "#4a5568", 
    borderRadius: "16px", 
    textAlign: "center" as const,
    textDecoration: "none",
    fontSize: "16px", 
    fontWeight: "bold",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
  };

  // Pegar a primeira letra para o Avatar gigante
  const primeiraLetra = session.user?.name?.charAt(0).toUpperCase() || "🐾";

  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundImage: "url('/bg-perfil-dog.jpg')", 
      backgroundSize: "cover", 
      backgroundPosition: "bottom center", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      
      {/* Efeito "Glassmorphism" (Vidro Fosco) no cartão */}
      <div style={{ 
        width: "90%", 
        maxWidth: "380px", 
        background: "rgba(255, 255, 255, 0.4)", 
        backdropFilter: "blur(12px)", 
        WebkitBackdropFilter: "blur(12px)", // Suporte para Safari
        borderRadius: "30px", 
        padding: "40px 30px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.5)",
        textAlign: "center",
        marginRight: "20%" // Empurra um pouquinho pra esquerda pra não tampar o cachorro
      }}>
        
        {/* Avatar grande com gradiente pastel */}
        <div style={{
          width: "110px",
          height: "110px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
          color: "white",
          fontSize: "45px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px auto",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)"
        }}>
          {primeiraLetra}
        </div>

        <h1 style={{ margin: "0 0 5px 0", color: "#2d3748", fontSize: "26px", fontWeight: "800" }}>
          {session.user?.name}
        </h1>
        <p style={{ margin: "0 0 35px 0", color: "#4a5568", fontSize: "15px", fontWeight: "500" }}>
          {session.user?.email}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link href="/" style={estiloBotao}>
            🏠 Voltar ao Menu
          </Link>
          
          <Link href="/agendamentos" style={estiloBotao}>
            📅 Ver Agendamentos
          </Link>

          {/* Botão de logoff com tom pastel avermelhado */}
          <Link href="/api/auth/signout" style={{ ...estiloBotao, color: "#e53e3e", background: "rgba(255, 245, 245, 0.9)" }}>
            🚪 Fazer Logoff
          </Link>
        </div>
      </div>
    </div>
  );
}
