from fastapi import HTTPException, status
from .. import schemas
from ..entities.colecionador import EColecionador

"""
Conforme diagrama SD01:
    - Recebe nome, email, senha da interface (FRM-CADASTRO)
    - Delega para E-COLECIONADOR.criarUsuario()
    - Retorna o resultado para a interface
    - Se o email já estiver cadastrado, retorna 400 Bad Request
"""

class CCadastro:
    
    @staticmethod
    def criarUsuario(nome: str, email: str, senha: str) -> schemas.UserPublic:
        cadastro = EColecionador.criarUsuario(nome=nome, email=email, senha=senha)
        
        if not cadastro:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já cadastrado",
            )
        
        
        user_public = schemas.UserPublic(
            id=cadastro.id,
            name=cadastro.name,
            email=cadastro.email,
            bio=cadastro.bio
        )
        
        return user_public
