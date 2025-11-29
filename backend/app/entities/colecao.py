"""
Entidade E-COLEÇÃO
Responsável por representar e gerenciar a lógica de domínio de coleções.
Implementa métodos conforme diagramas SD04, SD05, SD06 e SD07.
"""
from typing import Optional, List
from .. import schemas, db_json


class EColecao:
    """
    Entidade de domínio para Coleção.
    Responsável por criar, buscar e gerenciar coleções.
    """
    
    @staticmethod
    def create_collection_in_db(collection: schemas.CollectionInDB) -> schemas.CollectionInDB:
        """
        Cria uma nova coleção no banco de dados.
        
        Conforme diagrama SD04, este método é responsável por:
        - Persistir a coleção no banco de dados
        - Retornar o objeto de coleção criado (com id e demais campos)
        
        Args:
            collection: Objeto CollectionInDB com os dados da coleção
            
        Returns:
            CollectionInDB: Objeto da coleção criada no banco
        """
        return db_json.create_collection_in_db(collection)
    
    @staticmethod
    def buscar(id_colecao: int) -> Optional[schemas.CollectionInDB]:
        """
        Busca uma coleção pelo ID.
        
        Conforme diagrama SD05, este método é responsável por:
        - Recuperar a coleção correspondente ao id informado
        
        Args:
            id_colecao: ID da coleção a ser buscada
            
        Returns:
            CollectionInDB: Coleção encontrada, ou None se não existir
        """
        collections = db_json.load_collections()
        for collection in collections:
            if collection.id == id_colecao:
                return collection
        return None
    
    @staticmethod
    def adicionar(novo_item: schemas.ItemInDB) -> schemas.ItemInDB:
        """
        Adiciona um novo item à coleção.
        
        Conforme diagrama SD05, este método é responsável por:
        - Atualizar a coleção com o novo item
        - Persistir essa mudança no banco
        
        Args:
            novo_item: Objeto ItemInDB do novo item a ser adicionado
            
        Returns:
            ItemInDB: Item adicionado (já persistido)
        """
        # O item já foi criado e persistido em E-ITEM
        # Aqui apenas atualizamos as estatísticas da coleção
        # A função create_item_in_db já faz isso automaticamente
        return novo_item
    
    @staticmethod
    def removerItem(id_item: int) -> bool:
        """
        Remove um item da coleção.
        
        Conforme diagrama SD06, este método é responsável por:
        - Atualizar a lista interna de itens da coleção
        - Preparar a remoção definitiva do item
        - Chamar E-ITEM para destruir o item
        
        Args:
            id_item: ID do item a ser removido
            
        Returns:
            bool: True se o item foi removido com sucesso, False caso contrário
        """
        # Busca o item para obter o collection_id
        items = db_json.load_items()
        item_to_remove = None
        for item in items:
            if item.id == id_item:
                item_to_remove = item
                break
        
        if not item_to_remove:
            return False
        
        # Passo 6: E-COLEÇÃO → E-ITEM: removerItem() <<destroy>>
        from ..entities.item import EItem
        success = EItem.removerItem(id_item=id_item)
        
        # As estatísticas da coleção são atualizadas automaticamente em delete_item_in_db
        return success
    
    @staticmethod
    def buscarColecao(id_alvo: int) -> List[schemas.CollectionPublic]:
        """
        Busca as coleções de um colecionador pelo ID do dono.
        
        Conforme diagrama SD07, este método é responsável por:
        - Buscar todas as coleções do colecionador alvo (id_alvo)
        - Retornar lista de coleções públicas
        
        Args:
            id_alvo: ID do colecionador (owner_id) cujas coleções serão buscadas
            
        Returns:
            List[CollectionPublic]: Lista de coleções do colecionador (apenas públicas)
        """
        collections = db_json.get_collections_by_owner_id(owner_id=id_alvo)
        
        # Converte para CollectionPublic e filtra apenas públicas
        collections_public = []
        for col in collections:
            if col.is_public:
                collections_public.append(schemas.CollectionPublic(
                    id=col.id,
                    name=col.name,
                    description=col.description,
                    is_public=col.is_public,
                    owner_id=col.owner_id,
                    image_url=col.image_url,
                    value=col.value,
                    itemCount=col.itemCount
                ))
        
        return collections_public

