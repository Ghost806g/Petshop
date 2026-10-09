import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function PlanosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // Dados fake de histórico
  const faturas = [
    { id: "FAT-001", data: "05 Out 2026", valor: "R$ 150,00", status: "Pago", desc: "Renovação - Pacote Mensal" },
    { id: "FAT-002", data: "05 Set 2026", valor: "R$ 150,00", status: "Pago", desc: "Mensalidade Setembro" },
    { id: "FAT-003", data: "05 Ago 2026", valor: "R$ 45,00", status: "Pago", desc: "Passeio Avulso (Extra)" },
  ];

  return (
    <div className="page-container">
       <header className="header-section" style={{ paddingBottom: "20px" }}>
         <div>
           <h1 className="title" style={{ fontSize: "36px" }}>Planos e Pagamentos 💳</h1>
           <p className="subtitle" style={{ fontSize: "16px", marginTop: "5px" }}>Gerencie sua assinatura, formas de pagamento e histórico financeiro.</p>
         </div>
       </header>

       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", marginBottom: "40px" }}>
         
         {/* PLANO ATUAL */}
         <section className="glass-panel" style={{ padding: "30px", borderRadius: "24px", position: "relative", overflow: "hidden", border: "2px solid #e2e8f0" }}>
            <h3 style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "5px", fontWeight: "600" }}>Seu Plano Atual</h3>
            <h2 style={{ fontSize: "32px", color: "var(--text-primary)", fontWeight: "900", marginBottom: "15px" }}>Avulso (Free)</h2>
            
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "25px", lineHeight: "1.6" }}>
              Atualmente você paga apenas pelos passeios e banhos que agenda individualmente. Sem mensalidade fixa.
            </p>
            
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
               <div style={{ background: "#f1f5f9", padding: "12px 20px", borderRadius: "12px", flex: 1 }}>
                 <p style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", textTransform: "uppercase" }}>Próxima Fatura</p>
                 <p style={{ fontSize: "18px", color: "#334155", fontWeight: "bold" }}>R$ 0,00</p>
               </div>
               <button className="btn-secondary" style={{ padding: "16px 20px" }}>Cancelar Plano</button>
            </div>
         </section>

         {/* MÉTODOS DE PAGAMENTO */}
         <section className="glass-panel" style={{ padding: "30px", borderRadius: "24px", borderTop: "5px solid #0ea5e9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: "bold" }}>Método de Pagamento</h3>
              <button style={{ background: "none", border: "none", color: "#0ea5e9", fontWeight: "bold", cursor: "pointer", fontSize: "14px" }}>+ Adicionar Cartão</button>
            </div>
            
            <div style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)", borderRadius: "16px", padding: "20px", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ fontSize: "30px" }}>💳</div>
                  <div>
                    <p style={{ fontSize: "12px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "3px" }}>Cartão Principal</p>
                    <p style={{ fontSize: "16px", fontWeight: "bold", letterSpacing: "2px" }}>•••• •••• •••• 4291</p>
                  </div>
               </div>
               <div style={{ textAlign: "right" }}>
                 <p style={{ fontSize: "12px", color: "#94a3b8" }}>Validade</p>
                 <p style={{ fontSize: "15px", fontWeight: "bold" }}>12/28</p>
               </div>
            </div>
         </section>

       </div>

       {/* UPGRADE DE PLANO */}
       <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "var(--text-primary)", fontWeight: "bold" }}>Faça um Upgrade e Economize! ✨</h2>
       
       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "30px", marginBottom: "50px" }}>
          
          <div className="glass-panel hover-scale" style={{ padding: "35px", borderRadius: "24px", borderTop: "5px solid #ff6b6b", transition: "transform 0.2s" }}>
            <div style={{ display: "inline-block", background: "#fee2e2", color: "#ef4444", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginBottom: "15px" }}>MAIS POPULAR</div>
            <h3 style={{ fontSize: "24px", marginBottom: "10px", color: "var(--text-primary)", fontWeight: "900" }}>Plano Premium 🐕</h3>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#2d3748", marginBottom: "20px" }}>R$ 199<span style={{ fontSize: "16px", color: "#718096", fontWeight: "normal" }}>/mês</span></div>
            
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> 10 Passeios Mensais Inclusos</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> 1 Banho Grátis a cada 15 dias</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> Relatórios e Diários com fotos</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#10b981", fontWeight: "bold" }}>✓</span> Prioridade de Agendamento</li>
            </ul>
            <button style={{ width: "100%", background: "#ff6b6b", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontWeight: "bold", fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 15px rgba(255,107,107,0.3)" }}>Assinar Premium</button>
          </div>

          <div className="glass-panel hover-scale" style={{ padding: "35px", borderRadius: "24px", borderTop: "5px solid #8b5cf6", background: "linear-gradient(to bottom, #ffffff, #faf5ff)", transition: "transform 0.2s" }}>
            <div style={{ display: "inline-block", background: "#ede9fe", color: "#8b5cf6", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold", marginBottom: "15px" }}>TRATAMENTO VIP</div>
            <h3 style={{ fontSize: "24px", marginBottom: "10px", color: "var(--text-primary)", fontWeight: "900" }}>Plano VIP 👑</h3>
            <div style={{ fontSize: "36px", fontWeight: "900", color: "#2d3748", marginBottom: "20px" }}>R$ 349<span style={{ fontSize: "16px", color: "#718096", fontWeight: "normal" }}>/mês</span></div>
            
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#8b5cf6", fontWeight: "bold" }}>✓</span> Passeios Ilimitados (Seg-Sex)</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#8b5cf6", fontWeight: "bold" }}>✓</span> Banho e Tosa Premium Semanal</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#8b5cf6", fontWeight: "bold" }}>✓</span> Daycare / Creche Livre</li>
              <li style={{ display: "flex", alignItems: "center", gap: "10px", color: "#475569", fontSize: "15px" }}><span style={{ color: "#8b5cf6", fontWeight: "bold" }}>✓</span> Atendimento Veterinário Online 24h</li>
            </ul>
            <button style={{ width: "100%", background: "#8b5cf6", color: "white", padding: "16px", borderRadius: "12px", border: "none", fontWeight: "bold", fontSize: "16px", cursor: "pointer", boxShadow: "0 4px 15px rgba(139,92,246,0.3)" }}>Assinar VIP</button>
          </div>

       </div>

       {/* HISTÓRICO DE FATURAMENTO */}
       <section className="glass-panel" style={{ padding: "35px", borderRadius: "24px" }}>
          <h3 style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: "bold", marginBottom: "25px" }}>Histórico de Faturas</h3>
          
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px" }}>Código</th>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px" }}>Descrição</th>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px" }}>Data</th>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px" }}>Valor</th>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px" }}>Status</th>
                  <th style={{ padding: "15px 10px", color: "#64748b", fontWeight: "600", fontSize: "14px", textAlign: "right" }}>Comprovante</th>
                </tr>
              </thead>
              <tbody>
                {faturas.map((f, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "16px 10px", fontSize: "14px", fontWeight: "bold", color: "#334155" }}>{f.id}</td>
                    <td style={{ padding: "16px 10px", fontSize: "14px", color: "#475569" }}>{f.desc}</td>
                    <td style={{ padding: "16px 10px", fontSize: "14px", color: "#475569" }}>{f.data}</td>
                    <td style={{ padding: "16px 10px", fontSize: "15px", fontWeight: "bold", color: "#0f172a" }}>{f.valor}</td>
                    <td style={{ padding: "16px 10px" }}>
                      <span style={{ background: "#dcfce7", color: "#166534", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>{f.status}</span>
                    </td>
                    <td style={{ padding: "16px 10px", textAlign: "right" }}>
                      <button style={{ background: "transparent", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: "600", color: "#0ea5e9", fontSize: "13px" }}>Baixar PDF</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       </section>

    </div>
  )
}
