from fastapi import HTTPException, status
from .. import schemas
from ..entities.colecionador import EColecionador

"""
Conforme diagrama SD03:
- Recebe id e dados da interface (FRM-EDITARPERFIL)
- Chama E-COLECIONADOR.load_users() para validações
- Se email mudou, verifica se já existe em outro usuário
- Retorna 400 Bad Request se email em uso
- Atualiza usuário via E-COLECIONADOR.update_user_in_db()
- Retorna 200 OK com UserPublic
"""

class CEditarPerfil:
    
    @staticmethod
    def updateUser(user_id: int, dados: schemas.UserUpdate) -> schemas.UserPublic:
        
        users = EColecionador.load_users()
        
        user_atual = None
        for user in users:
            if user.id == user_id:
                user_atual = user
                break
        
        if not user_atual:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        
        if dados.email and dados.email != user_atual.email:
            email_em_uso = EColecionador.verificaEmailEmUso(
                email=dados.email,
                user_id_excluir=user_id
            )
            
            if email_em_uso:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email já está em uso por outro usuário"
                )
        
        updated_user = EColecionador.update_user_in_db(user_id, dados)
        
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        
        user_public = schemas.UserPublic(
            id=updated_user.id,
            name=updated_user.name,
            email=updated_user.email,
            bio=updated_user.bio
        )
        
        return user_public
