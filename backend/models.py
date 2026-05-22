from sqlalchemy import Boolean, Column, Integer, String, Float, DateTime
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_subscriber = Column(Boolean, default=False)
    credits = Column(Integer, default=5) # 5 créditos iniciais gratuitos, por exemplo
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class ResumeLog(Base):
    __tablename__ = "resume_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True) # Ligação com User, mas simplificada aqui
    target_job = Column(String)
    original_text = Column(String)
    improved_text = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
