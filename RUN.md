# Guia de Inicialização e Execução - Nexo.ai 🚀

Este guia detalha o passo a passo completo para configurar, instalar os requisitos e rodar a aplicação **Nexo.ai** localmente no seu computador. Ele cobre o funcionamento do banco de dados (PostgreSQL), o backend (FastAPI) e o frontend (React + TS + Vite).

---

## 📌 Pré-requisitos do Sistema

Antes de iniciar, certifique-se de ter os seguintes softwares instalados na sua máquina:

1.  **Python** (versão 3.10 ou superior)
    *   [Download do Python](https://www.python.org/downloads/)
    *   *Nota: Durante a instalação no Windows, certifique-se de marcar a opção "Add Python to PATH".*
2.  **Node.js** (versão 18 ou superior recomendada)
    *   [Download do Node.js](https://nodejs.org/) (inclui o gerenciador de pacotes `npm`).
3.  **PostgreSQL** (banco de dados)
    *   [Download do PostgreSQL](https://www.postgresql.org/download/)
    *   Recomendado instalar junto com o **pgAdmin** (ferramenta visual para gerenciar o banco).

---

## 💾 1. Configurando o Banco de Dados (PostgreSQL)

O Nexo.ai está configurado para salvar usuários e históricos no PostgreSQL. Siga os passos abaixo para criar o banco de dados localmente:

### Passo 1.1: Conectar ao PostgreSQL
Abra o terminal do seu computador (PowerShell/CMD no Windows ou Bash no Linux) ou utilize o pgAdmin. Para fazer isso pelo terminal:
```bash
psql -U postgres
```
*(Será solicitada a senha que você definiu durante a instalação do PostgreSQL).*

### Passo 1.2: Criar o Banco de Dados
No terminal interativo do PostgreSQL (`postgres=#`), execute o comando para criar um banco de dados dedicado ao projeto:
```sql
CREATE DATABASE nexo_db;
```
Você pode confirmar que o banco foi criado listando todos com `\l` ou saindo do terminal PostgreSQL com `\q`.

---

## ⚙️ 2. Configuração e Inicialização do Backend (FastAPI)

O backend é responsável por processar o currículo em PDF via PyMuPDF, integrar-se à API do Gemini para a reescrita inteligente e gerenciar a autenticação e sessões de usuários.

### Passo 2.1: Navegar até a pasta do Backend
Abra seu terminal na raiz do projeto e navegue para a pasta `backend`:
```powershell
cd backend
```

### Passo 2.2: Criar o Ambiente Virtual (venv)
O ambiente virtual isola as bibliotecas do projeto de outros programas do seu sistema operacional.
```powershell
python -m venv venv
```

### Passo 2.3: Ativar o Ambiente Virtual
Dependendo do seu sistema operacional e do terminal utilizado, o comando de ativação varia:

*   **No Windows (PowerShell):**
    ```powershell
    .\venv\Scripts\Activate.ps1
    ```
    *Se você receber um erro de permissão de scripts no PowerShell, execute o PowerShell como Administrador e rode `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`, e depois tente ativar novamente.*
*   **No Windows (Prompt de Comando - CMD):**
    ```cmd
    .\venv\Scripts\activate.bat
    ```
*   **No Linux / macOS (Bash/Zsh):**
    ```bash
    source venv/bin/activate
    ```

Quando ativado com sucesso, o nome `(venv)` aparecerá no início da linha de comando do seu terminal.

### Passo 2.4: Instalar as Dependências
Com o ambiente virtual ativado, instale todas as bibliotecas requeridas:
```bash
pip install -r requirements.txt
```

### Passo 2.5: Configurar as Variáveis de Ambiente (`.env`)
Na pasta `/backend`, crie um arquivo chamado **`.env`** (com um ponto no início). Este arquivo armazenará dados sigilosos e de conexão local. Insira o seguinte conteúdo e substitua os valores fictícios pelos seus dados reais:

```env
# URL de conexão com o seu banco de dados PostgreSQL local
# Formato: postgresql://[usuario]:[senha]@[host]:[porta]/[nome_do_banco]
DATABASE_URL=postgresql://postgres:sua_senha_do_postgres@localhost:5432/nexo_db

# Chave de API do Google Gemini (usada pela biblioteca google-genai)
# Obtenha em: https://aistudio.google.com/
GOOGLE_API_KEY=sua_chave_do_gemini_aqui

# Chave secreta usada para criptografar os tokens JWT de login
# Pode ser qualquer string de segurança complexa e longa
SECRET_KEY=sua_chave_secreta_jwt_para_seguranca
```

### Passo 2.6: Executar o Servidor Backend
Inicie o servidor de desenvolvimento do FastAPI rodando o Uvicorn:
```bash
uvicorn main:app --reload
```
O parâmetro `--reload` faz com que o servidor reinicie automaticamente sempre que você salvar alterações no código.

*   **URL de desenvolvimento do Backend:** `http://127.0.0.1:8000`
*   **Painel de Documentação Interativa da API (Swagger):** `http://127.0.0.1:8000/docs`
    *   *Dica: Você pode acessar essa URL no navegador para ver e testar todas as rotas e endpoints do sistema.*

---

## 💻 3. Configuração e Inicialização do Frontend (React + TS + Vite)

O frontend é a interface visual pela qual o usuário faz o upload do arquivo, interage com as análises e edita o currículo gerado.

### Passo 3.1: Abrir um NOVO Terminal e navegar até a pasta do Frontend
**Importante:** Deixe o terminal do backend rodando em segundo plano. Abra uma nova janela de terminal e navegue para a pasta `frontend` a partir da raiz do projeto:
```powershell
cd frontend
```

### Passo 3.2: Instalar as Dependências do Node
Rode o instalador do npm para baixar as bibliotecas configuradas no `package.json`:
```bash
npm install
```

### Passo 3.3: Executar o Servidor de Desenvolvimento
Inicie a aplicação utilizando o Vite:
```bash
npm run dev
```

*   **URL do Frontend local:** `http://localhost:5173` (ou a porta exibida no terminal).
*   Abra o seu navegador e acesse a URL exibida para ver a interface funcionando e integrada à API do backend.

---

### Teste de Requisição via cURL (Verificação do Endpoint)
Você pode testar a rota raiz do backend fazendo uma requisição rápida pelo terminal:
```bash
curl http://127.0.0.1:8000/
```
A resposta esperada deve ser:
```json
{"message": "Bem-vindo à API do Nexo.ai!"}
```
