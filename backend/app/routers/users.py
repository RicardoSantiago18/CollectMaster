from fastapi import APIRouter, HTTPException
from typing import List, Optional
from .. import schemas, db_json
from ..controllers.editarperfil import CEditarPerfil
from ..controllers.visuoutro import VisuOutro

router = APIRouter()

# Retorna lista de usuários (com opção de busca simples)
@router.get("/", response_model=List[schemas.UserPublic])
async def read_users(search: Optional[str] = None):
    users = db_json.load_users()
    
    if search:
        search_lower = search.lower()
        # Filtra por nome ou email
        users = [
            u for u in users 
            if search_lower in u.name.lower() or search_lower in u.email.lower()
        ]
        
    return users

# Retorna dados completos do perfil (usuário + coleções)
# IMPORTANTE: Este endpoint deve vir ANTES de /{user_id} para evitar conflito de rotas
@router.get("/{user_id}/profile", response_model=dict)
async def get_user_profile(user_id: int):
    """
    Endpoint HTTP para buscar dados completos do perfil de um usuário.
    Retorna perfil + lista de coleções públicas.
    Conforme diagrama SD07.
    
    Passo 1.1: FRM-VISUOUTRO → VISUOUTRO: carregarDadosPerfil(id_outro)
    """
    # Passo 2: Chama o controller VISUOUTRO
    dados_completos = VisuOutro.carregarDadosPerfil(id_outro=user_id)
    
    return dados_completos

# Retorna um usuário específico pelo ID
@router.get("/{user_id}", response_model=schemas.UserPublic)
async def read_user(user_id: int):
    """
    Endpoint HTTP para buscar um usuário pelo ID.
    Retorna apenas dados públicos do usuário.
    """
    users = db_json.load_users()
    user = next((u for u in users if u.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return user

@router.put("/{user_id}", response_model=schemas.UserPublic)
async def update_user(user_id: int, user_data: schemas.UserUpdate):
    """
    Endpoint HTTP para atualização de usuário.
    Recebe requisição HTTP PUT e chama o controller C-EDITARPERFIL.
    Conforme diagrama SD03.
    """
    # Chama o controller C-EDITARPERFIL conforme diagrama SD03
    # Passo 2.1: updateUser(id, dados)
    user_public = CEditarPerfil.updateUser(user_id=user_id, dados=user_data)
    
    return user_public