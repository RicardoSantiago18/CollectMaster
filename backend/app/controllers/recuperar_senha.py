import uuid
from typing import Optional
from fastapi import HTTPException, status
from .. import schemas, security, db_json
from ..entities.colecionador import EColecionador

"""
Conforme diagrama SD08:
- FRM-ESQUECERSENHA → C-RECUPERARSENHA: solicitarRecuperacao(email)
- C-RECUPERARSENHA → E-COLECIONADOR: buscarEmail(email) [passo 4.1.1]
- E-COLECIONADOR retorna colecionador
        
Alt fragment:
- [email não existe]: retorna erro("email não encontrado")
- [email existe]: 
- gerarToken() [passo 5]
- enviarToken() [passo 5.1]
- sucesso() [passo 5.2]
"""

class CRecuperarSenha:
    
    @staticmethod
    def solicitarRecuperacao(email: str) -> dict:
       
        colecionador = EColecionador.buscarEmail(email=email)
        
        if not colecionador:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="email não encontrado"
            )
        

        token = CRecuperarSenha.gerarToken()

        db_json.update_user_reset_token(email=email, token=token)
        
        CRecuperarSenha.enviarToken(email=email, token=token)
        
        return {
            "message": "Verifique seu email"
        }
    

    "Gera um token único para recuperação de senha"
    @staticmethod
    def gerarToken() -> str:
        return str(uuid.uuid4())
    
    "Simula o envio do token por email"
    @staticmethod
    def enviarToken(email: str, token: str) -> None:
        reset_link = f"http://localhost:5173/reset-password?token={token}"
        print("="*60)
        print(f"Email: {email}")
        print(f"Link: {reset_link}")
        print("="*60 + "\n")
    

    """
    - Busca o usuário pelo token
    - Verifica se o token é válido
    - Atualiza a senha (fazendo o hash)
    - Remove o token de reset
    """
    @staticmethod
    def confirmar_recuperacao(token: str, nova_senha: str) -> dict:
        
        user = db_json.get_user_by_reset_token(token=token)
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Token inválido ou expirado"
            )
        
        hashed_password = security.get_password_hash(nova_senha)
        
        db_json.update_user_password(
            user_id=user.id,
            new_hashed_password=hashed_password
        )
        
        return {
            "message": "Senha alterada com sucesso"
        }

