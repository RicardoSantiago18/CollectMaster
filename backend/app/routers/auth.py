from fastapi import APIRouter, Depends, HTTPException, status
from .. import schemas, security, db_json
from ..controllers.cadastro import CCadastro

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
    
    user = db_json.get_user_by_email(email=form_data.email)
    
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return user