import axios from "axios";

// Instância base do Axios apontando para o nosso Backend Local (FastAPI)
// No futuro, podemos usar import.meta.env.VITE_API_URL para apontar para o Render.com
export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
});

// Interceptor: Antes de cada requisição ir para a API, checamos se temos um Token
// Se tivermos, injetamos ele no cabeçalho Authorization para a API saber quem somos nós.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@NexoAI:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
