"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErro("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setErro(result.error);
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
      <div className="glass-panel" style={{ width: "100%", maxWidth: "420px", padding: "40px" }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>🐕</div>
          <h1 className="title" style={{ fontSize: "1.8rem" }}>Bem-vindo de volta!</h1>
          <p className="subtitle">Faça login para acessar o painel do seu pet.</p>
        </div>
        
        {erro && (
          <div style={{ color: "var(--accent-hover)", background: "var(--accent-light)", padding: "12px", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "500", fontSize: "0.9rem" }}>
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.95rem" }}>E-mail</label>
            <input name="email" type="email" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", transition: "border 0.2s" }} placeholder="seu@email.com" />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500", color: "var(--text-primary)", fontSize: "0.95rem" }}>Senha</label>
            <input name="password" type="password" required style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)", fontSize: "1rem", outline: "none", transition: "border 0.2s" }} placeholder="••••••••" />
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px", opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar na Conta"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Ainda não tem conta? <Link href="/cadastro" style={{ color: "var(--accent-primary)", fontWeight: "600", textDecoration: "none" }}>Cadastre-se</Link>
        </div>
      </div>
    </div>
  );
}
