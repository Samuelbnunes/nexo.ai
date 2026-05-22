import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { api } from "../../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      // Faz a chamada na rota /api/auth/register do backend
      await api.post("/api/auth/register", {
        email,
        password,
      });

      // Feedback de Sucesso
      setSuccess(true);
      
      // Joga o usuário para o login depois de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (err: any) {
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Crie sua conta</h1>
        <p className={styles.subtitle}>E comece a usar a IA a seu favor</p>

        {error && <div className={styles.error}>{error}</div>}
        {success && (
          <div className={styles.error} style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}>
            Conta criada com sucesso! Redirecionando...
          </div>
        )}

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
              placeholder="Crie uma senha forte"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading || success}>
            {loading ? "Criando..." : "Cadastrar"}
          </button>
        </form>

        <div className={styles.link}>
          Já possui conta? <Link to="/login">Faça Login</Link>
        </div>
      </div>
    </div>
  );
}
