# controllers/usuario_controller.py

from sqlalchemy.orm import Session
from fastapi import HTTPException
from server.models.usuario import Usuario
from server.dependencies import get_db

def criar_usuario(db: Session, usuario_create):
    db_usuario = Usuario(**usuario_create.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def login_usuario(db: Session, login: str, senha: str):
    usuario = db.query(Usuario).filter(Usuario.login == login, Usuario.senha == senha).first()
    if usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario
