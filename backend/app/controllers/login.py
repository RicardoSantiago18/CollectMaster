"""
Controller C-VISUALIZARCOLEC
Responsável pela lógica de controle dos casos de uso de login e criação de coleções.
Implementa métodos conforme diagramas SD02 e SD04.
"""
from fastapi import HTTPException, status
from .. import schemas, security, db_json
from ..entities.colecionador import EColecionador
from ..entities.colecao import EColecao


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
    
    @staticmethod
    def createCollection(dados: schemas.CollectionCreate) -> schemas.CollectionPublic:
        """
        Processa a criação de uma nova coleção.
        
        Conforme diagrama SD04:
        - Recebe dados da interface (FRM-CRIARCOLEC)
        - Chama E-COLEÇÃO.create_collection_in_db()
        - Retorna a nova coleção criada
        
        Args:
            dados: Objeto CollectionCreate com os dados da nova coleção
            
        Returns:
            CollectionPublic: Objeto da nova coleção criada
        """
        # Passo 6: C-VISUALIZARCOLEC → E-COLEÇÃO: create_collection_in_db()
        all_collections = db_json.load_collections()
        new_id = 1 if not all_collections else all_collections[-1].id + 1
        
        # Usa a imagem enviada OU um placeholder se estiver vazia
        final_image = dados.image_url or f"https://via.placeholder.com/300x200/4F518C/FFFFFF?text={dados.name}"
        
        collection_to_save = schemas.CollectionInDB(
            id=new_id,
            name=dados.name,
            description=dados.description,
            is_public=dados.is_public,
            owner_id=dados.owner_id,
            image_url=final_image,
            value=0.0,
            itemCount=0
        )
        
        # Passo 7: E-COLEÇÃO retorna objeto criado
        created_collection = EColecao.create_collection_in_db(collection_to_save)
        
        # Passo 8: Retorna nova coleção (CollectionPublic)
        collection_public = schemas.CollectionPublic(
            id=created_collection.id,
            name=created_collection.name,
            description=created_collection.description,
            is_public=created_collection.is_public,
            owner_id=created_collection.owner_id,
            image_url=created_collection.image_url,
            value=created_collection.value,
            itemCount=created_collection.itemCount
        )
        
        return collection_public

