from fastapi import HTTPException, status
from typing import Dict, Any
from .. import schemas
from ..entities.colecionador import EColecionador
from ..entities.colecao import EColecao

"""
Conforme diagrama SD07:
- Recebe id_outro da interface (FRM-VISUOUTRO)
- Busca dados do usuário em E-COLECIONADOR (buscarUsuario)
- Busca coleções do usuário em E-COLEÇÃO (buscarColecao)
- Consolida as informações e retorna dados completos
"""

class VisuOutro:
    
    @staticmethod
    def carregarDadosPerfil(id_outro: int) -> Dict[str, Any]:
        
        perfil = EColecionador.buscarUsuario(id_outro=id_outro)
        
        if not perfil:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        
        colecoes = EColecao.buscarColecao(id_alvo=id_outro)
        
        dados_completos = {
            "perfil": perfil,
            "colecoes": colecoes
        }
        
        return dados_completos
