"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cadastrarUsuario } from "../actions/auth";
import Link from "next/link";

export default function CadastroPage() {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro(""); 
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    
    try {
      const response = await cadastrarUsuario(formData);
      
      if (response?.erro) {
        setErro(response.erro);
      } else if (response?.sucesso) {
        router.push("/login?cadastrado=true");
      }
    } catch (error) {
      console.error(error);
      setErro("Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "420px", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>🐱</div>
          <h1 className="title" style={{ fontSize: "1.8rem" }}>Criar Conta</h1>
          <p className="subtitle">Junte-se a nossa família pet.</p>
        </div>
        
        {erro && (
          <div style={{ color: "var(--accent-hover)", background: "var(--accent-light)", padding: "12px", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "500", fontSize: "0.9rem" }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.95rem" }}>Nome Completo</label>
            <input name="name" type="text" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", transition: "border 0.2s" }} placeholder="João da Silva" />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.95rem" }}>E-mail</label>
            <input name="email" type="email" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", transition: "border 0.2s" }} placeholder="seu@email.com" />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.95rem" }}>Senha</label>
            <input name="password" type="password" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", transition: "border 0.2s" }} placeholder="Crie uma senha forte" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px", opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Cadastrando..." : "Criar minha conta"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Já tem uma conta? <Link href="/login" style={{ color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>Faça Login</Link>
        </div>
      </div>
    </div>
  );
}
