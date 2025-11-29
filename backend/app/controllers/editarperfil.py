"""
Controller C-EDITARPERFIL
Responsável pela lógica de controle do caso de uso de edição de perfil.
Implementa o método updateUser() conforme diagrama SD03.
"""
from fastapi import HTTPException, status
from .. import schemas
from ..entities.colecionador import EColecionador


class CEditarPerfil:
    """
    Controller de edição de perfil.
    Recebe requisições da interface e delega para a entidade E-COLECIONADOR.
    """
    
    @staticmethod
    def updateUser(user_id: int, dados: schemas.UserUpdate) -> schemas.UserPublic:
        """
        Processa a atualização de um usuário.
        
        Conforme diagrama SD03:
        - Recebe id e dados da interface (FRM-EDITARPERFIL)
        - Chama E-COLECIONADOR.load_users() para validações
        - Se email mudou, verifica se já existe em outro usuário
        - Retorna 400 Bad Request se email em uso
        - Atualiza usuário via E-COLECIONADOR.update_user_in_db()
        - Retorna 200 OK com UserPublic
        
        Args:
            user_id: ID do usuário a ser atualizado
            dados: Objeto com os dados a serem atualizados (nome, email, bio)
            
        Returns:
            UserPublic: Dados públicos do usuário atualizado
            
        Raises:
            HTTPException: 404 se usuário não encontrado
            HTTPException: 400 se email já está em uso
        """
        # Passo 5: Carrega usuários para validações
        users = EColecionador.load_users()
        
        # Verifica se o usuário existe
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
        
        # Passo 6: Fragmento opt - Se o email mudou
        if dados.email and dados.email != user_atual.email:
            # Passo 6.1: Verifica se email já existe em outro usuário
            email_em_uso = EColecionador.verificaEmailEmUso(
                email=dados.email,
                user_id_excluir=user_id
            )
            
            # Passo 6.2: Se email em uso, retorna 400 Bad Request
            if email_em_uso:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email já está em uso por outro usuário"
                )
        
        # Passo 7: Atualiza usuário no banco
        updated_user = EColecionador.update_user_in_db(user_id, dados)
        
        if not updated_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        
        # Passo 8: Retorna 200 OK com UserPublic
        user_public = schemas.UserPublic(
            id=updated_user.id,
            name=updated_user.name,
            email=updated_user.email,
            bio=updated_user.bio
        )
        
        return user_public

