"""
Entidade E-COLEÇÃO
Responsável por representar e gerenciar a lógica de domínio de coleções.
Implementa métodos conforme diagramas SD04 e SD05.
"""
from typing import Optional
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

