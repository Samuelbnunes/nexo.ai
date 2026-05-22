# Nexo.ai 🚀

## 📌 Sobre o Projeto

O **Nexo.ai** é uma aplicação web full stack que utiliza a IA do Google (Gemini 2.5 Flash) para reescrever e estilizar currículos de forma profissional, adaptando o conteúdo para vagas e nichos específicos.

A ideia surgiu da necessidade real de candidatos que precisam adaptar seus currículos para diferentes processos seletivos — tarefa que consome tempo e exige habilidade de escrita técnica. O Nexo.ai automatiza esse processo em segundos, entregando um documento pronto para ser enviado a recrutadores.

Este projeto foi desenvolvido **inteiramente por mim, de forma individual**, com o objetivo de consolidar conhecimentos em desenvolvimento full stack, boas práticas de engenharia de software, segurança, autenticação e integração com APIs de IA — simulando o ciclo completo de um produto SaaS real.

---

## ✨ Funcionalidades

- **Upload de currículo em PDF** — extração automática do texto via PyMuPDF
- **Reescrita com IA** — o Gemini 2.5 reescreve o currículo completo com verbos de ação e métricas quantificáveis, adaptado para a vaga alvo
- **Visualizador A4** — preview paginado com separação visual por folha, zoom ajustável e fundo de impressão
- **Autenticação JWT** — sistema de login e cadastro com hash de senhas (bcrypt)
- **Perfil do usuário** — créditos, status de assinante e histórico
- **Painel lateral** — navegação entre Nova Análise, Histórico, Conversas, Planos e Conta
- **Landing Page** — apresentação do produto com seções de Como Funciona e Planos de Assinatura

---

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia | Finalidade |
|---|---|
| **FastAPI** (Python) | Framework da API REST |
| **PostgreSQL** | Banco de dados relacional |
| **SQLAlchemy** | ORM para modelagem e queries |
| **Google Gemini 2.5 Flash** | Motor de IA para reescrita |
| **PyMuPDF** | Extração de texto de PDFs |
| **bcrypt** | Hash seguro de senhas |
| **PyJWT** | Geração e validação de tokens JWT |
| **python-dotenv** | Gestão de variáveis de ambiente |

### Frontend
| Tecnologia | Finalidade |
|---|---|
| **React 18 + TypeScript** | Interface do usuário |
| **Vite** | Bundler e servidor de dev |
| **React Router DOM** | Roteamento SPA |
| **Axios** | Requisições HTTP à API |
| **CSS Modules** | Estilização isolada por componente |
| **Context API** | Estado global de autenticação |

---

## 🔄 Fluxo da Aplicação

```
[Usuário] → Upload PDF + informa a vaga
     ↓
[Backend] → Extrai texto com PyMuPDF
     ↓
[Gemini 2.5 Flash] → Reescreve e estiliza o currículo em HTML estilizado
     ↓
[Frontend] → Renderiza o HTML em páginas A4 navegáveis
     ↓
[Usuário] → Baixa o PDF formatado e envia ao recrutador
```

---

## 📚 Aprendizados e Motivação

Este projeto foi desenvolvido **individualmente** com o propósito de evoluir como desenvolvedor full stack. Durante a construção do Nexo.ai, coloquei em prática:

- Arquitetura de APIs REST com FastAPI e separação de responsabilidades (Routers, Services, Models)
- Autenticação segura com JWT e hashing de senhas
- Integração real com LLMs (Gemini) via prompt engineering estruturado
- Construção de interfaces modernas com React, TypeScript e CSS Modules
- Gerenciamento de estado global com Context API
- Renderização e exportação de documentos HTML como PDF no navegador
- Configuração de CORS para deploy em domínios separados (Render + Vercel)

---

## 🌍 Deploy (Planejado)

| Camada | Plataforma |
|---|---|
| Backend (API) | [Render.com](https://render.com) |
| Frontend (React) | [Vercel](https://vercel.com) |
| Banco de Dados | PostgreSQL gerenciado (Render) |

---

## 👨‍💻 Autor

**Samuel Barquel Nunes**  
Estudante de Ciência da Computação | Desenvolvedor Full Stack em formação  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Samuel%20Nunes-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/samuelbnunes)  
[![GitHub](https://img.shields.io/badge/GitHub-samuel.bnunes-181717?style=flat&logo=github)](https://github.com/samuel-bnunes)

---

> *"Construir sozinho é difícil. É exatamente por isso que vale a pena."*
