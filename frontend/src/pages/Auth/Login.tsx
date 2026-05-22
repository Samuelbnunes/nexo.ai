import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import { api } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Faz a chamada na nova rota /api/auth/login do backend
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      // Extrai o token e os dados
      const { access_token, user } = response.data;
      
      // Salva no contexto e redireciona (a lógica de redirecionar está no contexto)
      login(access_token, user);

    } catch (err: any) {
      // Trata mensagem de erro vinda do backend (ex: Email ou Senha Incorretos)
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Erro de conexão. O servidor está rodando?");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Acesse o Nexo.ai para otimizar currículos</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.link}>
          Não tem uma conta? <Link to="/register">Crie uma agora</Link>
        </div>
      </div>
    </div>
  );
}
