from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas, security, db_json
from ..controllers.cadastro import CCadastro
from ..controllers.realizarLogin import CRealizarLogin
from ..controllers.recuperar_senha import CRecuperarSenha

router = APIRouter()


@router.post("/register", response_model=schemas.UserPublic, status_code=status.HTTP_201_CREATED)
async def register_user(user: schemas.UserCreate):
    "Endpoint HTTP para cadastro de usuário."
    cadastro = CCadastro.criarUsuario(
        nome=user.name,
        email=user.email,
        senha=user.password
    )
    
    return cadastro


@router.post("/login", response_model=schemas.UserPublic)
async def login_user(form_data: schemas.LoginRequest):
    "Endpoint HTTP para login de usuário."
    user_public = CRealizarLogin.loginUser(
        email=form_data.email,
        senha=form_data.password
    )
    
    return user_public


@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(request: schemas.PasswordResetRequest):
    "Endpoint HTTP para solicitar recuperação de senha."
    result = CRecuperarSenha.solicitarRecuperacao(email=request.email)
    return result


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(request: schemas.PasswordResetConfirm):
    "Endpoint HTTP para confirmar recuperação de senha."
    result = CRecuperarSenha.confirmar_recuperacao(
        token=request.token,
        nova_senha=request.new_password
    )
    return result