import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Carrega as variáveis do .env
load_dotenv()

# Obtém a URL do banco (com fallback para um banco em memória se falhar por algum motivo)
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./sql_app.db")

# Cria a engine de conexão
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Sessão do banco
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para criar os modelos
Base = declarative_base()

# Dependência para injetar a sessão do banco de dados nas rotas
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
