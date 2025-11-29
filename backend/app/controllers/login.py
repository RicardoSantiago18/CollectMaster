"""
Controller C-VISUALIZARCOLEC
Responsável pela lógica de controle do caso de uso de login.
Implementa o método loginUser() conforme diagrama SD02.
"""
from fastapi import HTTPException, status
from .. import schemas, security
from ..entities.colecionador import EColecionador


class CVisualizarColec:
    """
    Controller de login/visualização de colecionador.
    Recebe requisições da interface e delega para a entidade E-COLECIONADOR.
    """
    
    @staticmethod
    def loginUser(email: str, senha: str) -> schemas.UserPublic:
        """
        Processa o login de um usuário.
        
        Conforme diagrama SD02:
        - Recebe email e senha da interface (FRM-REALIZARLOGIN)
        - Chama E-COLECIONADOR.get_user_by_email(email)
        - Valida a senha
        - Retorna 401 Unauthorized se senha inválida
        - Retorna 200 OK com UserPublic se senha válida
        
        Args:
            email: Email do usuário
            senha: Senha em texto plano
            
        Returns:
            UserPublic: Dados públicos do usuário autenticado
            
        Raises:
            HTTPException: 401 se email ou senha inválidos
        """
        # Passo 3 do diagrama: chama E-COLECIONADOR.get_user_by_email(email)
        user_in_db = EColecionador.get_user_by_email(email=email)
        
        # Passo 4: E-COLECIONADOR retorna UserInDB (ou None)
        # Caso 1 - Senha inválida (Passo 5)
        if not user_in_db or not security.verify_password(senha, user_in_db.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Email ou senha incorretos",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        # Caso 2 - Senha válida (Passo 8)
        # Retorna 200 OK com UserPublic
        user_public = schemas.UserPublic(
            id=user_in_db.id,
            name=user_in_db.name,
            email=user_in_db.email,
            bio=user_in_db.bio
        )
        
        return user_public

