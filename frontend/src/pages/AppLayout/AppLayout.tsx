import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './AppLayout.module.css';
import { AuthContext } from '../../contexts/AuthContext';
import Upload from '../../components/Upload/Upload';
import ResumeResult from '../../components/ResumeResult/ResumeResult';

// ─── Tipos de página ───────────────────────────
type PageKey = 'nova-analise' | 'historico' | 'conversas' | 'conta' | 'planos';

// ─── Itens de Navegação ────────────────────────
const navItems: { key: PageKey; icon: string; label: string; badge?: string }[] = [
  { key: 'nova-analise', icon: '✨', label: 'Nova Análise' },
  { key: 'historico',    icon: '📋', label: 'Histórico',    badge: '3' },
  { key: 'conversas',    icon: '💬', label: 'Conversas' },
  { key: 'planos',       icon: '⭐', label: 'Planos e Assinatura' },
  { key: 'conta',        icon: '👤', label: 'Minha Conta' },
];

// ─── Títulos das páginas ───────────────────────
const pageTitles: Record<PageKey, string> = {
  'nova-analise': 'Nova Análise de Currículo',
  'historico':    'Histórico de Análises',
  'conversas':    'Conversas',
  'conta':        'Minha Conta',
  'planos':       'Planos e Assinatura',
};

// ─── Dados fake de histórico (substituir por API) ──
const fakeHistory = [
  { id: 1, job: 'Desenvolvedor Full Stack',        date: '20/05/2025', status: 'Concluído' },
  { id: 2, job: 'Engenheiro de Software Sênior',   date: '18/05/2025', status: 'Concluído' },
  { id: 3, job: 'Tech Lead – Produto',             date: '15/05/2025', status: 'Concluído' },
];

export default function AppLayout() {
  const { user, logout } = useContext(AuthContext);
  const [activePage, setActivePage]     = useState<PageKey>('nova-analise');
  const [sidebarOpen, setSidebarOpen]   = useState(false);
  const [result, setResult]             = useState<{ original: string; improved: string } | null>(null);

  // Inicial do avatar a partir do email
  const avatarLetter = user?.email?.charAt(0).toUpperCase() ?? 'U';

  const handleSuccess = (original_text: string, improved_text: string) => {
    setResult({ original: original_text, improved: improved_text });
  };

  const closeSidebar = () => setSidebarOpen(false);

  // ── Navega e fecha sidebar no mobile ──
  const navigate = (key: PageKey) => {
    setActivePage(key);
    setSidebarOpen(false);
    if (key === 'nova-analise') setResult(null);
  };

  return (
    <div className={styles.appLayout}>

      {/* ── Botão hamburguer (mobile) ── */}
      <button
        className={styles.mobileToggle}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Abrir menu"
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* ── Overlay (mobile) ── */}
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles['overlay--open'] : ''}`}
        onClick={closeSidebar}
      />

      {/* ══════════════ SIDEBAR ══════════════ */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles['sidebar--open'] : ''}`}>

        {/* Logo */}
        <div className={styles.sidebarHeader}>
          <Link to="/" className={styles.sidebarLogo}>
            Nexo<span>.ai</span>
          </Link>
        </div>

        {/* Navegação */}
        <nav className={styles.sidebarNav} aria-label="Menu lateral">
          <span className={styles.navSection}>Ferramentas</span>

          {navItems.slice(0, 3).map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${activePage === item.key ? styles['navItem--active'] : ''}`}
              onClick={() => navigate(item.key)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
              {item.badge && (
                <span className={styles.navBadge}>{item.badge}</span>
              )}
            </button>
          ))}

          <span className={styles.navSection}>Configurações</span>

          {navItems.slice(3).map((item) => (
            <button
              key={item.key}
              className={`${styles.navItem} ${activePage === item.key ? styles['navItem--active'] : ''}`}
              onClick={() => navigate(item.key)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Perfil do usuário no rodapé da sidebar */}
        <div className={styles.sidebarUser}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>{avatarLetter}</div>
            <div className={styles.userDetails}>
              <div className={styles.userEmail}>{user?.email}</div>
              <div className={styles.userPlan}>
                <span className={styles.userPlanBadge}>
                  {user?.is_subscriber ? '⭐ Pro' : 'Grátis'}
                </span>
                <span className={styles.userCredits}>
                  💎 {user?.credits} créditos
                </span>
              </div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>
            🚪 Sair da conta
          </button>
        </div>
      </aside>

      {/* ══════════════ CONTEÚDO PRINCIPAL ══════════════ */}
      <div className={styles.mainContent}>

        {/* Topbar */}
        <header className={styles.topbar}>
          <h1 className={styles.topbarTitle}>{pageTitles[activePage]}</h1>
          <div className={styles.topbarCredits}>
            💎 {user?.credits ?? 0} créditos restantes
          </div>
        </header>

        {/* Área de conteúdo dinâmico */}
        <main className={styles.pageContent}>

          {/* ── Nova Análise ── */}
          {activePage === 'nova-analise' && (
            <div className={styles.uploadSection}>
              {!result ? (
                <>
                  <h2 className={styles.sectionTitle}>Otimize seu currículo</h2>
                  <p className={styles.sectionSubtitle}>
                    Nossa IA reescreve seu currículo completo, otimizado para a vaga escolhida,
                    pronto para ser baixado e enviado ao recrutador.
                  </p>
                  <Upload onSuccess={handleSuccess} />
                </>
              ) : (
                <ResumeResult
                  improved={result.improved}
                  onReset={() => setResult(null)}
                />
              )}
            </div>
          )}

          {/* ── Histórico ── */}
          {activePage === 'historico' && (
            <div>
              {fakeHistory.length > 0 ? (
                <div className={styles.historyList}>
                  {fakeHistory.map((item) => (
                    <div key={item.id} className={styles.historyCard}>
                      <div className={styles.historyCard__info}>
                        <div className={styles['historyCard__job']}>{item.job}</div>
                        <div className={styles['historyCard__date']}>📅 {item.date}</div>
                      </div>
                      <span className={styles['historyCard__badge']}>{item.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles['emptyState__icon']}>📋</div>
                  <div className={styles['emptyState__text']}>Nenhuma análise ainda</div>
                  <div className={styles['emptyState__sub']}>Faça sua primeira análise para ver o histórico aqui.</div>
                </div>
              )}
            </div>
          )}

          {/* ── Conversas ── */}
          {activePage === 'conversas' && (
            <div className={styles.emptyState}>
              <div className={styles['emptyState__icon']}>💬</div>
              <div className={styles['emptyState__text']}>Em breve</div>
              <div className={styles['emptyState__sub']}>
                O chat direto com a IA está sendo desenvolvido. Fique ligado!
              </div>
            </div>
          )}

          {/* ── Planos ── */}
          {activePage === 'planos' && (
            <div>
              <div className={styles.accountCard} style={{ maxWidth: 700 }}>
                <h2 className={styles.sectionTitle} style={{ marginBottom: '0.5rem' }}>Seu plano atual</h2>
                <p className={styles.sectionSubtitle}>
                  Você está no plano <strong>{user?.is_subscriber ? 'Pro' : 'Gratuito'}</strong>.
                </p>
                <div className={styles.accountPlanBox}>
                  <div>
                    <div className={styles.accountPlanName}>{user?.is_subscriber ? '⭐ Pro' : 'Gratuito'}</div>
                    <div className={styles.accountPlanCredits}>💎 {user?.credits} créditos disponíveis</div>
                  </div>
                  {!user?.is_subscriber && (
                    <button className={styles.upgradeBadge}>Fazer upgrade →</button>
                  )}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                  Em breve você poderá gerenciar sua assinatura diretamente aqui.
                </p>
              </div>
            </div>
          )}

          {/* ── Conta ── */}
          {activePage === 'conta' && (
            <div className={styles.accountCard}>
              <div className={styles.accountAvatar}>{avatarLetter}</div>

              <div className={styles.accountField}>
                <div className={styles.accountLabel}>E-mail</div>
                <div className={styles.accountValue}>{user?.email}</div>
              </div>

              <div className={styles.accountField}>
                <div className={styles.accountLabel}>Membro desde</div>
                <div className={styles.accountValue}>
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('pt-BR')
                    : '—'}
                </div>
              </div>

              <div className={styles.accountPlanBox}>
                <div>
                  <div className={styles.accountPlanName}>
                    {user?.is_subscriber ? '⭐ Plano Pro' : 'Plano Gratuito'}
                  </div>
                  <div className={styles.accountPlanCredits}>
                    💎 {user?.credits} créditos restantes
                  </div>
                </div>
                {!user?.is_subscriber && (
                  <button className={styles.upgradeBadge}>Upgrade →</button>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
