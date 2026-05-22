from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# =======================
# Schemas para Usuário
# =======================

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_subscriber: bool
    credits: int
    created_at: datetime

    class Config:
        from_attributes = True

# =======================
# Schemas de Autenticação
# =======================

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse

# =======================
# Schemas para Currículos
# =======================

class ResumeUploadRequest(BaseModel):
    target_job: str
    niche: Optional[str] = None

class ResumeResponse(BaseModel):
    original_text: str
    improved_text: str
