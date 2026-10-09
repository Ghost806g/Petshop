import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PetRepository } from "@/repositories/petRepository";
import { redirect } from "next/navigation";
import { NewPetForm } from "@/components/NewPetForm";

export default async function PetsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const dono = await prisma.user.findUnique({ where: { email: session.user.email } });
  
  const meusPets = await PetRepository.getPetsByOwner(dono!.id);
  const isEmpty = meusPets.length === 0;

  return (
    <div className="page-container">
       <header className="header-section" style={{ paddingBottom: "20px" }}>
         <div>
           <h1 className="title" style={{ fontSize: "36px" }}>Meus Pets 🐾</h1>
           <p className="subtitle" style={{ fontSize: "16px", marginTop: "5px" }}>Cadastre seus melhores amigos para um atendimento personalizado.</p>
         </div>
       </header>

       <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr", gap: "40px" }}>
         
         {/* LADO ESQUERDO: LISTAGEM DE PETS */}
         <section>
           
           <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
             
             {isEmpty && (
               <div style={{ background: "#f8fafc", border: "2px dashed #cbd5e1", borderRadius: "16px", padding: "40px", textAlign: "center" }}>
                 <div style={{ fontSize: "60px", marginBottom: "15px" }}>🐕</div>
                 <p style={{ color: "#334155", fontWeight: "700", fontSize: "20px", marginBottom: "10px" }}>Nenhum pet cadastrado ainda!</p>
                 <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "300px", margin: "0 auto" }}>
                   Cadastre seu pet ao lado para que possamos conhecer todas as preferências, alergias e manias dele.
                 </p>
               </div>
             )}

             {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
             {meusPets.map((pet: any) => (
               <div key={pet.id} className="glass-panel" style={{ padding: "30px", borderRadius: "20px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "6px", height: "100%", background: "linear-gradient(to bottom, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" }}></div>
                  
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                    <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                      <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "35px" }}>
                        🐶
                      </div>
                      <div>
                        <h3 style={{ fontSize: "24px", color: "var(--text-primary)", fontWeight: "bold" }}>{pet.name}</h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "15px" }}>
                          {pet.breed || "Raça não informada"} • {pet.age || "Idade desconhecida"}
                        </p>
                      </div>
                    </div>
                    <button style={{ background: "transparent", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "6px 12px", cursor: "pointer", fontWeight: "600", color: "#64748b" }}>
                      Editar
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", background: "#f8fafc", padding: "20px", borderRadius: "16px" }}>
                    <div>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>⚠️ Alergias & Saúde</p>
                      <p style={{ fontSize: "15px", color: pet.allergies ? "#ef4444" : "var(--text-primary)", marginTop: "4px" }}>{pet.allergies || "Nenhuma registrada"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>🎾 Preferências</p>
                      <p style={{ fontSize: "15px", color: "var(--text-primary)", marginTop: "4px" }}>{pet.preferences || "Gosta de tudo!"}</p>
                    </div>
                    <div style={{ gridColumn: "1 / -1" }}>
                      <p style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>📝 Observações do Dono</p>
                      <p style={{ fontSize: "15px", color: "var(--text-primary)", marginTop: "4px", fontStyle: "italic" }}>&quot;{pet.description || "O melhor garoto/garota de todos."}&quot;</p>
                    </div>
                  </div>
               </div>
             ))}
           </div>
         </section>

         {/* LADO DIREITO: FORMULÁRIO DE NOVO PET */}
         <section>
           <div className="glass-panel" style={{ padding: "35px", borderRadius: "24px", borderTop: "5px solid #ff6b6b", position: "sticky", top: "20px" }}>
             <h3 style={{ fontSize: "22px", marginBottom: "25px", color: "var(--text-primary)", fontWeight: "bold" }}>
                🐶 Cadastrar Novo Pet
             </h3>
             
             <NewPetForm />
             
           </div>
         </section>

       </div>
    </div>
  )
}
