from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas, security, db_json
from ..controllers.cadastro import CCadastro
from ..controllers.login import CVisualizarColec

router = APIRouter()

@router.post("/register", response_model=schemas.UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(user: schemas.UserCreate):
    """
    Endpoint HTTP para cadastro de usuário.
    Recebe requisição HTTP e chama o controller C-CADASTRO.
    """
    # Chama o controller C-CADASTRO conforme diagrama SD01
    cadastro = CCadastro.criarUsuario(
        nome=user.name,
        email=user.email,
        senha=user.password
    )
    
    return cadastro

@router.post("/login", response_model=schemas.UserPublic)
async def login_user(form_data: schemas.LoginRequest):
    """
    Endpoint HTTP para login de usuário.
    Recebe requisição HTTP e chama o controller C-VISUALIZARCOLEC.
    Conforme diagrama SD02.
    """
    # Chama o controller C-VISUALIZARCOLEC conforme diagrama SD02
    user_public = CVisualizarColec.loginUser(
        email=form_data.email,
        senha=form_data.password
    )
    
    return user_public