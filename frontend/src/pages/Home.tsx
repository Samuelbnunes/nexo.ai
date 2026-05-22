import React, { useContext, useState } from 'react';
import Upload from '../components/Upload/Upload';
import styles from './Home.module.css';
import { AuthContext } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const [result, setResult] = useState<{ original: string; improved: string } | null>(null);
  const { user, logout } = useContext(AuthContext);

  const handleSuccess = (original_text: string, improved_text: string) => {
    setResult({ original: original_text, improved: improved_text });
  };

  return (
    <div className={styles.homeContainer}>
      {/* Cabeçalho com info do usuário e botão de logout */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <span className={styles.headerEmail}>{user?.email}</span>
          <span className={styles.headerCredits}>
            💎 {user?.credits} créditos
          </span>
          {user?.is_subscriber && (
            <span className={styles.headerBadge}>⭐ Pro</span>
          )}
        </div>
        <button className={styles.logoutButton} onClick={logout}>
          Sair
        </button>
      </header>

      {!result ? (
        <section className={styles.uploadSection}>
          <h2>Comece enviando seu currículo</h2>
          <p>Nossa IA analisará e reescreverá suas experiências com foco em métricas e palavras-chave.</p>
          <Upload onSuccess={handleSuccess} />
        </section>
      ) : (
        <section className={styles.resultSection}>
          <h2>Resultado da Análise</h2>
          <button className={styles.resetButton} onClick={() => setResult(null)}>
            Analisar outro currículo
          </button>
          
          <div className={styles.comparisonGrid}>
            <div className={styles.card}>
              <h3>Texto Original Extraído</h3>
              <div className={styles.textContent}>{result.original}</div>
            </div>
            
            <div className={styles.card}>
              <h3>Sugestão da IA ✨</h3>
              <div className={styles.textContent}>{result.improved}</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
