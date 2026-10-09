import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { BookingRepository } from "@/repositories/bookingRepository";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AgendamentosPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const dono = await prisma.user.findUnique({ where: { email: session.user.email } });
  
  const proximosAgendamentos = await BookingRepository.getUpcomingBookings(dono!.id);

  // Exemplo fantasma (Placeholder) para a tela não ficar "sem sal" quando estiver vazia
  const exemploFantasma = {
    service: { name: "Passeio Premium", price: 45 },
    petName: "Rex (Seu Pet)",
    date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) // Amanhã
  };

  const listaRender = proximosAgendamentos.length > 0 ? proximosAgendamentos : [exemploFantasma];
  const isEmpty = proximosAgendamentos.length === 0;

  return (
    <div className="page-container">
       <header className="header-section" style={{ paddingBottom: "10px" }}>
         <div>
           <h1 className="title" style={{ fontSize: "36px" }}>Meus Agendamentos 📅</h1>
           <p className="subtitle" style={{ fontSize: "16px", marginTop: "5px" }}>Controle total sobre as datas, históricos e horários do seu pet.</p>
         </div>
         <Link href="/agendamentos/novo" className="btn-primary" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", padding: "14px 28px" }}>
           <span>+</span> Nova Reserva
         </Link>
       </header>

       {/* Banner Superior Chique */}
       <div style={{ 
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
          borderRadius: "20px", 
          padding: "30px", 
          marginBottom: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 10px 20px rgba(118, 75, 162, 0.2)",
          color: "white"
        }}>
          <div>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>{isEmpty ? 'Vamos agendar a diversão?' : 'Sua agenda está organizada!'}</h2>
            <p style={{ opacity: 0.9, fontSize: "15px" }}>Acompanhe em tempo real o horário de pick-up e drop-off dos serviços.</p>
          </div>
          <div style={{ fontSize: "50px", opacity: 0.9 }}>🗓️</div>
        </div>

       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "30px" }}>
         
         {/* LADO ESQUERDO: CALENDÁRIO & LISTA DETALHADA */}
         <section>
           <h2 style={{ fontSize: "22px", marginBottom: "20px", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "10px" }}>
             Próximos Compromissos
           </h2>
           
           <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
             
             {isEmpty && (
               <div style={{ background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "16px", padding: "30px", textAlign: "center", marginBottom: "-10px" }}>
                 <p style={{ color: "#475569", fontWeight: "600", fontSize: "16px", marginBottom: "5px" }}>Nenhum agendamento oficial ainda.</p>
                 <p style={{ color: "#94a3b8", fontSize: "14px" }}>Veja abaixo um exemplo de como sua agenda ficará lindona!</p>
               </div>
             )}

             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
             {listaRender.map((booking: any, index: number) => {
                const date = new Date(booking.date);
                const pickupTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' });
                const dropoffDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
                const dropoffTime = dropoffDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' });

                return (
                  <div key={index} className="glass-panel" style={{ 
                    display: "flex", 
                    padding: "0", 
                    overflow: "hidden", 
                    borderRadius: "20px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                    border: isEmpty ? "2px solid #e2e8f0" : "none",
                    opacity: isEmpty ? 0.7 : 1,
                    transition: "transform 0.2s"
                  }}>
                    
                    {/* Bloquinho do Calendário Moderno */}
                    <div style={{ background: isEmpty ? "#94a3b8" : "#ff6b6b", color: "white", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: "110px" }}>
                      <span style={{ fontSize: "16px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "1px" }}>
                        {date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.','')}
                      </span>
                      <span style={{ fontSize: "40px", fontWeight: "900", lineHeight: "1" }}>{date.getDate()}</span>
                      <span style={{ fontSize: "14px", marginTop: "5px", opacity: 0.9 }}>
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.','')}
                      </span>
                    </div>

                    {/* Dados Detalhados */}
                    <div style={{ padding: "25px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <h3 style={{ fontSize: "20px", marginBottom: "6px", color: "var(--text-primary)", fontWeight: "bold" }}>{booking.service.name}</h3>
                          <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>Pet: <strong style={{color: "var(--text-primary)"}}>{booking.petName}</strong></p>
                        </div>
                        <span style={{ background: isEmpty ? "#f1f5f9" : "#e6f7f2", color: isEmpty ? "#64748b" : "#0d9488", padding: "6px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "bold" }}>
                          {isEmpty ? "👀 Exemplo" : "✓ Confirmado"}
                        </span>
                      </div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px", marginTop: "20px", paddingTop: "20px", borderTop: "1px solid var(--border-color)" }}>
                        <div>
                          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "500" }}>Recepção (Pick-up)</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                             <span style={{ fontSize: "18px" }}>🚙</span>
                             <span style={{ fontWeight: "700", fontSize: "16px", color: "var(--text-primary)" }}>{pickupTime}</span>
                          </div>
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px", fontWeight: "500" }}>Entrega (Drop-off)</p>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                             <span style={{ fontSize: "18px" }}>🏠</span>
                             <span style={{ fontWeight: "700", fontSize: "16px", color: "var(--text-primary)" }}>{dropoffTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
             })}
           </div>
         </section>

         {/* LADO DIREITO: ATUALIZAÇÕES E HISTÓRICO */}
         <section style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
           
           {/* Painel Profissional de Avisos */}
           <div className="glass-panel" style={{ padding: "30px", borderRadius: "20px", borderTop: "5px solid #38bdf8" }}>
             <h3 style={{ fontSize: "18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)" }}>
                📢 Mural do Petshop
             </h3>
             <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "20px" }}>
               <li style={{ background: "#f0f9ff", padding: "15px", borderRadius: "12px", borderLeft: "4px solid #38bdf8" }}>
                 <strong style={{ color: "#0369a1", display: "block", marginBottom: "6px", fontSize: "15px" }}>❄️ Campanha de Inverno</strong>
                 <p style={{ fontSize: "14px", color: "#0c4a6e", lineHeight: "1.5" }}>As temperaturas caíram! Por favor, tragam uma roupinha extra para as hospedagens noturnas.</p>
               </li>
               <li style={{ background: "#f0fdf4", padding: "15px", borderRadius: "12px", borderLeft: "4px solid #4ade80" }}>
                 <strong style={{ color: "#166534", display: "block", marginBottom: "6px", fontSize: "15px" }}>✨ Novo Serviço Disponível</strong>
                 <p style={{ fontSize: "14px", color: "#14532d", lineHeight: "1.5" }}>A partir de segunda, teremos Banho de Ofurô com sais relaxantes em todas as unidades.</p>
               </li>
             </ul>
           </div>

           {/* Painel de Histórico */}
           <div className="glass-panel" style={{ padding: "30px", borderRadius: "20px", borderTop: "5px solid #fbbf24" }}>
             <h3 style={{ fontSize: "18px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px", color: "var(--text-primary)" }}>
                ⏳ Histórico e Diários
             </h3>
             
             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <div style={{ fontSize: "40px", opacity: 0.5 }}>📖</div>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: "1.6" }}>
                  Seus registros antigos aparecerão aqui. Conforme os passeios forem concluídos, enviaremos as fotos e as notas do comportamento do pet diretamente pra essa aba!
                </p>
             </div>
           </div>
         </section>

       </div>
    </div>
  )
}
