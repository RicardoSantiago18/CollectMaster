"""
Controller VISUOUTRO
Responsável pela lógica de controle do caso de uso de visualização de outros colecionadores.
Implementa métodos conforme diagrama SD07.
"""
from fastapi import HTTPException, status
from typing import Dict, Any
from .. import schemas
from ..entities.colecionador import EColecionador
from ..entities.colecao import EColecao


class VisuOutro:
    """
    Controller de visualização de outros colecionadores.
    Recebe requisições da interface e delega para as entidades E-COLECIONADOR e E-COLEÇÃO.
    """
    
    @staticmethod
    def carregarDadosPerfil(id_outro: int) -> Dict[str, Any]:
        """
        Carrega os dados completos do perfil de outro colecionador.
        
        Conforme diagrama SD07:
        - Recebe id_outro da interface (FRM-VISUOUTRO)
        - Busca dados do usuário em E-COLECIONADOR (buscarUsuario)
        - Busca coleções do usuário em E-COLEÇÃO (buscarColecao)
        - Consolida as informações e retorna dados completos
        
        Args:
            id_outro: ID do colecionador alvo
            
        Returns:
            Dict com estrutura:
            {
                "perfil": UserPublic,
                "colecoes": List[CollectionPublic]
            }
            
        Raises:
            HTTPException: 404 se usuário não encontrado
        """
        # Passo 3: VISUOUTRO → E-COLECIONADOR: buscarUsuario(id_outro)
        perfil = EColecionador.buscarUsuario(id_outro=id_outro)
        
        if not perfil:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Usuário não encontrado"
            )
        
        # Passo 4: VISUOUTRO → E-COLEÇÃO: buscarColecao(id_alvo)
        # id_alvo normalmente é o mesmo id_outro
        colecoes = EColecao.buscarColecao(id_alvo=id_outro)
        
        # Passo 5: VISUOUTRO consolida as informações recebidas
        dados_completos = {
            "perfil": perfil,
            "colecoes": colecoes
        }
        
        return dados_completos

