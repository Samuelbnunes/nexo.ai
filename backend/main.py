from fastapi import FastAPI, File, UploadFile, Form, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from database import engine, Base, get_db
import models
import schemas
from utils.pdf_extractor import extract_text_from_pdf
from services.gemini_service import generate_improved_resume
from routers import auth

# Cria as tabelas no banco de dados (se não existirem)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Nexo.ai API", version="1.0.0")

# Configuração de CORS para permitir que o Frontend (React) se comunique
# ATENÇÃO: Com allow_credentials=True, não podemos usar ["*"] — as origens devem ser explícitas.
ALLOWED_ORIGINS = [
    "http://localhost:5173",   # Dev local Vite
    "http://localhost:3000",   # Dev local alternativo
    "https://nexo-ai.vercel.app",  # Produção na Vercel (atualize com a URL real)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar os roteadores
app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Bem-vindo à API do Nexo.ai!"}

@app.post("/api/upload-resume", response_model=schemas.ResumeResponse)
async def upload_resume(
    target_job: str = Form(...),
    niche: str = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint para receber o currículo em PDF, extrair texto e chamar o Gemini.
    """
    # 1. Valida se é PDF
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Apenas arquivos PDF são permitidos no momento.")
    
    # 2. Lê os bytes do arquivo
    file_bytes = await file.read()
    
    # 3. Extrai o texto usando PyMuPDF
    original_text = extract_text_from_pdf(file_bytes)
    
    if not original_text.strip():
        raise HTTPException(status_code=400, detail="Não foi possível extrair texto deste PDF.")

    # 4. Chama o serviço do Gemini
    improved_text = generate_improved_resume(
        resume_text=original_text, 
        target_job=target_job, 
        niche=niche
    )

    # (Opcional: Salvar no banco de dados aqui usando db.add(novo_log))
    # Para salvar no banco faríamos:
    # new_log = models.ResumeLog(target_job=target_job, original_text=original_text, improved_text=improved_text)
    # db.add(new_log)
    # db.commit()

    # 5. Retorna a resposta
    return schemas.ResumeResponse(
        original_text=original_text,
        improved_text=improved_text
    )
