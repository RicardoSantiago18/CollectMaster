"""
Controller C-RECUPERARSENHA
Responsável pela lógica de controle do caso de uso de recuperação de senha.
Implementa métodos conforme diagrama SD08 - ESQUECER SENHA.
"""
import uuid
from typing import Optional
from fastapi import HTTPException, status
from .. import schemas, security, db_json
from ..entities.colecionador import EColecionador


class CRecuperarSenha:
    """
    Controller de recuperação de senha.
    Recebe requisições da interface (FRM-ESQUECERSENHA) e delega para a entidade E-COLECIONADOR.
    Conforme diagrama SD08.
    """
    
    @staticmethod
    def solicitarRecuperacao(email: str) -> dict:
        """
        Processa a solicitação de recuperação de senha.
        
        Conforme diagrama SD08, passo 4.1:
        - FRM-ESQUECERSENHA → C-RECUPERARSENHA: solicitarRecuperacao(email)
        - C-RECUPERARSENHA → E-COLECIONADOR: buscarEmail(email) [passo 4.1.1]
        - E-COLECIONADOR retorna colecionador
        
        Alt fragment:
        - [email não existe]: retorna erro("email não encontrado")
        - [email existe]: 
            - gerarToken() [passo 5]
            - enviarToken() [passo 5.1]
            - sucesso() [passo 5.2]
        
        Args:
            email: Email do usuário que solicitou a recuperação
            
        Returns:
            dict: Mensagem de sucesso ou erro
            
        Raises:
            HTTPException: 404 se o email não for encontrado
        """
        # Passo 4.1.1: C-RECUPERARSENHA → E-COLECIONADOR: buscarEmail(email)
        colecionador = EColecionador.buscarEmail(email=email)
        
        # Alt fragment: [email não existe]
        if not colecionador:
            # Retorna erro conforme diagrama
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="email não encontrado"
            )
        
        # Alt fragment: [email existe]
        # Passo 5: gerarToken()
        token = CRecuperarSenha.gerarToken()
        
        # Salva o token no usuário
        db_json.update_user_reset_token(email=email, token=token)
        
        # Passo 5.1: enviarToken()
        CRecuperarSenha.enviarToken(email=email, token=token)
        
        # Passo 5.2: sucesso()
        return {
            "message": "Verifique seu email"
        }
    
    @staticmethod
    def gerarToken() -> str:
        """
        Gera um token único para recuperação de senha.
        
        Conforme diagrama SD08, passo 5.
        
        Returns:
            str: Token UUID gerado
        """
        return str(uuid.uuid4())
    
    @staticmethod
    def enviarToken(email: str, token: str) -> None:
        """
        Simula o envio do token por email.
        
        Conforme diagrama SD08, passo 5.1.
        Como não temos SMTP configurado, imprime o link no console do servidor.
        
        Args:
            email: Email do destinatário
            token: Token de recuperação gerado
        """
        reset_link = f"http://localhost:5173/reset-password?token={token}"
        print("\n" + "="*60)
        print("🔐 LINK DE REDEFINIÇÃO DE SENHA (MOCK)")
        print("="*60)
        print(f"Email: {email}")
        print(f"Link: {reset_link}")
        print("="*60 + "\n")
    
    @staticmethod
    def confirmar_recuperacao(token: str, nova_senha: str) -> dict:
        """
        Processa a confirmação de recuperação de senha.
        
        - Busca o usuário pelo token
        - Verifica se o token é válido
        - Atualiza a senha (fazendo o hash)
        - Remove o token de reset
        
        Args:
            token: Token de recuperação de senha
            nova_senha: Nova senha em texto plano
            
        Returns:
            dict: Mensagem de sucesso
            
        Raises:
            HTTPException: 400 se o token for inválido ou expirado
        """
        # Busca o usuário pelo token
        user = db_json.get_user_by_reset_token(token=token)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Token inválido ou expirado"
            )
        
        # Gera o hash da nova senha
        hashed_password = security.get_password_hash(nova_senha)
        
        # Atualiza a senha e remove o token
        db_json.update_user_password(
            user_id=user.id,
            new_hashed_password=hashed_password
        )
        
        return {
            "message": "Senha alterada com sucesso"
        }

