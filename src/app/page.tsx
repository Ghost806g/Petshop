export default function Home() {
  return (
    <div className="page-container">
      <header className="header-section">
        <div>
          <h1 className="title">Bem-vindo, João! 🐾</h1>
          <p className="subtitle">Aqui está o resumo dos seus passeios de hoje.</p>
        </div>
        <button className="btn-primary">+ Novo Relatório</button>
      </header>

      <main className="dashboard-grid">
        <section className="glass-panel stats-card">
          <h3>Faturamento do Mês</h3>
          <p className="stat-value">R$ 2.450,00</p>
          <span className="stat-badge positive">+15% vs último mês</span>
        </section>

        <section className="glass-panel stats-card">
          <h3>Passeios Hoje</h3>
          <p className="stat-value">6</p>
          <span className="stat-badge neutral">2 concluídos</span>
        </section>

        <section className="glass-panel stats-card">
          <h3>Pacotes Ativos</h3>
          <p className="stat-value">12</p>
          <span className="stat-badge warning">1 expirando</span>
        </section>
      </main>

      <section className="upcoming-section">
        <h2>Próximos Passeios</h2>
        <div className="card-list">
          <div className="card schedule-card">
            <div className="pet-info">
              <div className="pet-avatar">B</div>
              <div>
                <h4>Bolinha</h4>
                <p>Poodle • 10:00 - 11:00</p>
              </div>
            </div>
            <button className="btn-secondary">Iniciar Diário</button>
          </div>
          
          <div className="card schedule-card">
            <div className="pet-info">
              <div className="pet-avatar">R</div>
              <div>
                <h4>Rex</h4>
                <p>Pastor Alemão • 14:00 - 15:00</p>
              </div>
            </div>
            <button className="btn-secondary">Iniciar Diário</button>
          </div>
        </div>
      </section>
    </div>
  );
}
