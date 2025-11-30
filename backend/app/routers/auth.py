from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas, security, db_json
from ..controllers.cadastro import CCadastro
from ..controllers.login import CVisualizarColec
from ..controllers.recuperar_senha import CRecuperarSenha

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

@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(request: schemas.PasswordResetRequest):
    """
    Endpoint HTTP para solicitar recuperação de senha.
    Recebe requisição HTTP e chama o controller C-RECUPERARSENHA.
    Conforme diagrama SD08, passo 4.1.
    """
    result = CRecuperarSenha.solicitarRecuperacao(email=request.email)
    return result

@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(request: schemas.PasswordResetConfirm):
    """
    Endpoint HTTP para confirmar recuperação de senha.
    Recebe requisição HTTP e chama o controller C-RECUPERARSENHA.
    """
    result = CRecuperarSenha.confirmar_recuperacao(
        token=request.token,
        nova_senha=request.new_password
    )
    return result