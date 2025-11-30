from fastapi import HTTPException, status
from .. import schemas, security
from ..entities.colecionador import EColecionador

"""
Conforme diagrama SD02:
- Recebe email e senha da interface (FRM-REALIZARLOGIN)
- Chama E-COLECIONADOR.get_user_by_email(email)
- Valida a senha
- Retorna 401 Unauthorized se senha inválida
- Retorna 200 OK com UserPublic se senha válida
"""

class CRealizarLogin:
    
    @staticmethod
    def loginUser(email: str, senha: str) -> schemas.UserPublic:

        user_in_db = EColecionador.get_user_by_email(email=email)
        
        if not user_in_db or not security.verify_password(senha, user_in_db.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user_public = schemas.UserPublic(
            id=user_in_db.id,
            name=user_in_db.name,
            email=user_in_db.email,
            bio=user_in_db.bio
        )
        
        return user_public
