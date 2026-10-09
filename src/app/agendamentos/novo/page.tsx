"use client";

import { useState } from "react";
import { agendarServico } from "../../actions/servicos";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NovoServicoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<{name: string, price: number, icon: string} | null>(null);

  // LISTA FIXA DE SERVIÇOS (O cliente só clica e escolhe!)
  const servicosDisponiveis = [
    { name: "Passeio 30 min", price: 35, icon: "🐕" },
    { name: "Passeio 1h", price: 50, icon: "🦮" },
    { name: "Banho Simples", price: 60, icon: "🛁" },
    { name: "Tosa Completa", price: 80, icon: "✂️" },
    { name: "Hospedagem (Diária)", price: 100, icon: "🏠" },
  ];

  // PACOTES ESPECIAIS
  const pacotesDisponiveis = [
    { name: "Pacote Mensal (10 Passeios)", price: 300, icon: "🎫" },
    { name: "Combo Banho + Tosa", price: 120, icon: "✨" },
    { name: "Férias Tranquilas (7 dias)", price: 600, icon: "🏖️" },
  ];

  async function handleAgendar(formData: FormData) {
    if (!servicoSelecionado) {
      alert("⚠️ Por favor, escolha um serviço ou pacote clicando nos botões acima primeiro!");
      return;
    }
    
    setLoading(true);
    // Adicionamos os dados do serviço que ele clicou direto pro backend
    formData.append("serviceName", servicoSelecionado.name);
    formData.append("servicePrice", servicoSelecionado.price.toString());
    
    try {
      await agendarServico(formData);
      router.push("/agendamentos"); // Volta pros agendamentos!
    } catch {
      alert("Erro ao agendar. Tente novamente.");
      setLoading(false);
    }
  }

  const inputStyle = {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
    width: "100%",
    fontFamily: "sans-serif"
  };

  return (
    <div className="page-container">
      <header className="header-section">
        <div>
          <h1 className="title">Novo Agendamento 📅</h1>
          <p className="subtitle">Escolha o serviço ou pacote e marque a data.</p>
        </div>
        <Link href="/" className="btn-secondary" style={{ textDecoration: "none" }}>Voltar</Link>
      </header>

      <section className="glass-panel" style={{ maxWidth: "600px", margin: "30px auto" }}>
        
        {/* SERVIÇOS AVULSOS */}
        <h2 style={{ marginBottom: "15px", fontSize: "18px", color: "#4a5568" }}>Serviços Avulsos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
          {servicosDisponiveis.map((srv) => {
            const isSelecionado = servicoSelecionado?.name === srv.name;
            return (
              <button
                key={srv.name}
                type="button"
                onClick={() => setServicoSelecionado(srv)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "15px",
                  border: isSelecionado ? "2px solid #ff6b6b" : "2px solid transparent",
                  background: isSelecionado ? "#fff0f0" : "#f1f5f9",
                  color: isSelecionado ? "#e53e3e" : "#4a5568",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelecionado ? "0 4px 10px rgba(255, 107, 107, 0.2)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span style={{ fontSize: "18px" }}>{srv.icon}</span>
                {srv.name} (R$ {srv.price})
              </button>
            )
          })}
        </div>

        {/* PACOTES */}
        <h2 style={{ marginBottom: "15px", fontSize: "18px", color: "#4a5568", marginTop: "10px" }}>Pacotes Promocionais</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "30px" }}>
          {pacotesDisponiveis.map((pct) => {
            const isSelecionado = servicoSelecionado?.name === pct.name;
            return (
              <button
                key={pct.name}
                type="button"
                onClick={() => setServicoSelecionado(pct)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "15px",
                  border: isSelecionado ? "2px solid #6b46c1" : "2px solid transparent", // Roxo pros pacotes!
                  background: isSelecionado ? "#faf5ff" : "#f1f5f9",
                  color: isSelecionado ? "#805ad5" : "#4a5568",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: isSelecionado ? "0 4px 10px rgba(107, 70, 193, 0.2)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <span style={{ fontSize: "18px" }}>{pct.icon}</span>
                {pct.name} (R$ {pct.price})
              </button>
            )
          })}
        </div>

        <h2 style={{ marginBottom: "15px" }}>2. Preencha os detalhes</h2>
        
        <form action={handleAgendar} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          
          <input type="text" name="petName" placeholder="Qual o nome do Pet?" required style={inputStyle} />
          
          <input type="datetime-local" name="date" required style={inputStyle} />
          
          <textarea name="notes" placeholder="Alguma observação importante? (Opcional)" style={{...inputStyle, height: "100px"}}></textarea>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ background: loading ? "#ccc" : "#48bb78", marginTop: "10px" }}
          >
            {loading ? "Agendando..." : "Confirmar Agendamento"}
          </button>
        </form>

      </section>
    </div>
  );
}
