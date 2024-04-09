# app.py

from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from server.models.usuario import Usuario
from server.controllers.usuario_controller import criar_usuario, login_usuario
from server.dependencies import get_db
from pydantic import BaseModel

app = FastAPI()

# Modelo Pydantic para entrada de dados de cadastro de usuário
class UsuarioCreate(BaseModel):
    email: str
    nome_usuario: str
    login: str
    senha: str
    tipo_usuario: str
    data_nascimento: date
    foto_perfil: bytes
    bio: str

# Rota para criar um novo usuário
@app.post("/usuarios/")
def criar_novo_usuario(usuario_create: UsuarioCreate, db: Session = Depends(get_db)):
    return criar_usuario(db, usuario_create)

# Rota para login de usuário
@app.post("/login/")
def fazer_login(login: str, senha: str, db: Session = Depends(get_db)):
    return login_usuario(db, login, senha)
