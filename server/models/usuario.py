# models/usuario.py

from sqlalchemy import Column, String, Date, Binary
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Usuario(Base):
    __tablename__ = "Usuario"

    email = Column(String, primary_key=True)
    nome_usuario = Column(String)
    login = Column(String)
    senha = Column(String)
    tipo_usuario = Column(String)
    data_nascimento = Column(Date)
    foto_perfil = Column(Binary)
    bio = Column(String)
