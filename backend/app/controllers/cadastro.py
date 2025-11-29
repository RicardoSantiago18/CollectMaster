"""
Controller C-CADASTRO
Responsável pela lógica de controle do caso de uso de cadastro.
Implementa o método criarUsuario() conforme diagrama SD01.
"""
from fastapi import HTTPException, status
from .. import schemas
from ..entities.colecionador import EColecionador


class CCadastro:
    """
    Controller de cadastro.
    Recebe requisições da interface e delega para a entidade E-COLECIONADOR.
    """
    
    @staticmethod
    def criarUsuario(nome: str, email: str, senha: str) -> schemas.UserPublic:
        """
        Processa a criação de um novo usuário.
        
        Conforme diagrama SD01:
        - Recebe nome, email, senha da interface (FRM-CADASTRO)
        - Delega para E-COLECIONADOR.criarUsuario()
        - Retorna o resultado para a interface
        
        Args:
            nome: Nome completo do usuário
            email: Email do usuário
            senha: Senha em texto plano
            
        Returns:
            UserPublic: Dados públicos do usuário criado
            
        Raises:
            HTTPException: Se o email já estiver cadastrado
        """
        # Delega para a entidade E-COLECIONADOR
        cadastro = EColecionador.criarUsuario(nome=nome, email=email, senha=senha)
        
        # Verifica se o cadastro foi realizado com sucesso
        if not cadastro:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email já cadastrado",
            )
        
        # Converte para UserPublic (remove informações sensíveis)
        user_public = schemas.UserPublic(
            id=cadastro.id,
            name=cadastro.name,
            email=cadastro.email,
            bio=cadastro.bio
        )
        
        return user_public

