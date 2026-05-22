from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import database
import models
import schemas
from utils.security import get_password_hash, verify_password, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(
    prefix="/api/auth",
    tags=["Autenticação"]
)

@router.post("/register", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """Cria um novo usuário com senha criptografada"""
    
    # 1. Verifica se o e-mail já existe
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="E-mail já está em uso")
    
    # 2. Faz o hash da senha e cria o usuário
    hashed_password = get_password_hash(user.password)
    new_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        # Créditos iniciais já estão configurados no model (5 créditos)
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=schemas.LoginResponse)
def login(user_credentials: schemas.UserCreate, db: Session = Depends(database.get_db)):
    """Faz login retornando o Token e as informações básicas de perfil"""
    
    # 1. Busca usuário pelo email
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    
    # 2. Checa se o usuário existe e a senha bate
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    # 3. Cria o token de acesso
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    # 4. Retorna a resposta completa (Token + Dados do Usuário)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user
    }
