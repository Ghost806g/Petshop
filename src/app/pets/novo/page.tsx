"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoPetPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      allergies: formData.get("allergies"),
      description: formData.get("description"),
      preferences: formData.get("preferences"),
    };

    try {
      const response = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Pet cadastrado com sucesso!");
        router.push("/pets");
        router.refresh();
      } else {
        const errorData = await response.json();
        alert(`Não foi possível salvar o pet: ${errorData.error || "Erro desconhecido."}\n(Dica: Tente sair da conta e entrar de novo para atualizar a sessão)`);
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao salvar dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "800px", margin: "0 auto" }}>
      <div className="header-section" style={{ marginBottom: "30px" }}>
        <div>
          <h1 className="title">Cadastrar Novo Pet 🐕</h1>
          <p className="subtitle">Adicione as informações do seu melhor amigo.</p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "32px" }}>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Nome do Pet *</label>
            <input name="name" type="text" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none" }} placeholder="Ex: Rex, Luna..." />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Raça</label>
            <input name="breed" type="text" style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none" }} placeholder="Ex: Golden Retriever, SRD" />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Idade</label>
            <input name="age" type="text" style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none" }} placeholder="Ex: 2 anos" />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Alergias (se houver)</label>
            <input name="allergies" type="text" style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none" }} placeholder="Ex: Frango, Poeira" />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Descrição / Comportamento</label>
            <textarea name="description" rows={3} style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", resize: "vertical" }} placeholder="Ex: Muito dócil, mas tem medo de trovões." />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)" }}>Preferências</label>
            <textarea name="preferences" rows={2} style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", resize: "vertical" }} placeholder="Ex: Gosta de bolinha, adora sachê de carne." />
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "16px" }}>
            <button type="button" onClick={() => router.back()} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary" style={{ opacity: loading ? 0.7 : 1 }} disabled={loading}>
              {loading ? "Salvando..." : "Salvar Pet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
