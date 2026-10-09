"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNotifications, markAsRead, markAllAsRead, createWelcomeNotification } from "@/app/actions/notifications";

type NotificationItem = {
  id: string;
  title: string;
  desc: string;
  unread: boolean;
  createdAt: Date;
};

export function TopBar({ user }: { user: { name?: string | null, email?: string | null } }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const firstName = user.name?.split(" ")[0] || "Usuário";
  const initial = firstName.charAt(0).toUpperCase();

  const loadNotifications = async () => {
    const data = await getNotifications();
    setNotifications(data);
  };

  useEffect(() => {
    let isMounted = true;
    const fetchNotifs = async () => {
      const data = await getNotifications();
      if (isMounted) setNotifications(data);
    };

    fetchNotifs();
    // Poll a cada 30 segundos
    const interval = setInterval(fetchNotifs, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleMarkAll = async () => {
    await markAllAsRead();
    loadNotifications();
  };

  const handleMarkOne = async (id: string, unread: boolean) => {
    if (!unread) return;
    await markAsRead(id);
    loadNotifications();
  };

  const handleCreateTest = async () => {
    await createWelcomeNotification();
    loadNotifications();
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "25px", marginBottom: "20px", position: "relative" }}>
      
      {/* Botão Secreto de Teste */}
      <button onClick={handleCreateTest} style={{ fontSize: "12px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "4px 8px", cursor: "pointer" }}>
        + Testar Notificação
      </button>

      {/* Sino de Notificações */}
      <div 
        style={{ position: "relative", cursor: "pointer", transition: "transform 0.1s" }} 
        onClick={() => setShowNotifs(!showNotifs)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span style={{ fontSize: "26px", opacity: 0.85 }}>🔔</span>
        {unreadCount > 0 && (
          <span style={{ position: "absolute", top: "-2px", right: "-6px", background: "#ff6b6b", color: "white", fontSize: "11px", fontWeight: "bold", padding: "2px 6px", borderRadius: "10px", border: "2px solid #f8fafc", boxShadow: "0 2px 5px rgba(255,107,107,0.4)" }}>
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown Mágico de Notificações */}
      {showNotifs && (
        <div style={{
          position: "absolute", top: "50px", right: "60px", width: "360px", background: "white", borderRadius: "20px",
          boxShadow: "0 15px 50px rgba(0,0,0,0.15)", zIndex: 9999, border: "1px solid #e2e8f0", overflow: "hidden",
          animation: "fadeIn 0.2s ease-out"
        }}>
          <style>
            {`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}
          </style>
          
          <div style={{ padding: "18px 22px", background: "linear-gradient(to right, #f8fafc, #f1f5f9)", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#334155", margin: 0 }}>Notificações 📬</h3>
            {unreadCount > 0 && (
              <button onClick={handleMarkAll} style={{ background: "none", border: "none", color: "#0ea5e9", fontSize: "13px", cursor: "pointer", fontWeight: "700", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#0284c7"} onMouseLeave={e => e.currentTarget.style.color = "#0ea5e9"}>
                Marcar lidas
              </button>
            )}
          </div>
          
          <div style={{ maxHeight: "380px", overflowY: "auto" }}>
            {notifications.length === 0 ? (
              <p style={{ textAlign: "center", padding: "30px", color: "#94a3b8" }}>Nenhuma notificação por enquanto!</p>
            ) : (
              notifications.map(n => (
                <div key={n.id} onClick={() => handleMarkOne(n.id, n.unread)} style={{ 
                  padding: "18px 22px", borderBottom: "1px solid #f1f5f9", display: "flex", gap: "16px", 
                  background: n.unread ? "linear-gradient(to right, #f0f9ff, white)" : "white", cursor: n.unread ? "pointer" : "default",
                  transition: "background 0.2s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
                onMouseLeave={e => e.currentTarget.style.background = n.unread ? "linear-gradient(to right, #f0f9ff, white)" : "white"}
                >
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: n.unread ? "#0ea5e9" : "transparent", marginTop: "6px", flexShrink: 0, boxShadow: n.unread ? "0 0 10px rgba(14, 165, 233, 0.4)" : "none" }}></div>
                  <div>
                    <p style={{ fontSize: "15px", fontWeight: n.unread ? "800" : "600", color: "#0f172a", marginBottom: "6px" }}>{n.title}</p>
                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.5", marginBottom: "8px" }}>{n.desc}</p>
                    <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600" }}>{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div style={{ padding: "14px", textAlign: "center", borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}>
             <button style={{ background: "none", border: "none", color: "#64748b", fontSize: "14px", cursor: "pointer", fontWeight: "600" }}>Ver histórico completo</button>
          </div>
        </div>
      )}

      {/* Avatar Bolado */}
      <Link href="/perfil" style={{ textDecoration: "none" }}>
        <div style={{ 
          width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", 
          display: "flex", alignItems: "center", justifyContent: "center", color: "#be123c", fontWeight: "900", fontSize: "20px", 
          boxShadow: "0 4px 15px rgba(255,107,107,0.3)", border: "2px solid white", transition: "transform 0.2s" 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {initial}
        </div>
      </Link>
    </div>
  );
}
