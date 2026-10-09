"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function NewPetForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      breed: formData.get("breed"),
      age: formData.get("age"),
      allergies: formData.get("allergies"),
      preferences: formData.get("preferences"),
    };

    try {
      const res = await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        // Limpa o formulário
        (e.target as HTMLFormElement).reset();
        // Atualiza a página para mostrar o novo pet
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Falha ao salvar o pet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#475569" }}>Nome do Pet *</label>
        <input name="name" required type="text" placeholder="Ex: Thor" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px" }} />
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#475569" }}>Raça</label>
          <input name="breed" type="text" placeholder="Ex: Golden" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px" }} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#475569" }}>Idade</label>
          <input name="age" type="text" placeholder="Ex: 3 anos" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px" }} />
        </div>
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#475569" }}>Restrições / Alergias ⚠️</label>
        <input name="allergies" type="text" placeholder="Ex: Alérgico a frango, não pode pular alto" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px" }} />
      </div>

      <div>
        <label style={{ display: "block", fontSize: "14px", fontWeight: "600", marginBottom: "8px", color: "#475569" }}>Costumes & Preferências 🎾</label>
        <textarea name="preferences" rows={2} placeholder="Ex: Ama bolinha, tem medo de motos" style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "15px", fontFamily: "inherit" }} />
      </div>

      <button type="submit" disabled={loading} style={{ background: "#ff6b6b", color: "white", border: "none", padding: "16px", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", marginTop: "10px", transition: "transform 0.1s", boxShadow: "0 4px 14px rgba(255, 107, 107, 0.4)", opacity: loading ? 0.7 : 1 }}>
        {loading ? "Salvando..." : "Salvar Ficha do Pet"}
      </button>
    </form>
  );
}
