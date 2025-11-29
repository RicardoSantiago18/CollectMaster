"""
Entidade E-COLEÇÃO
Responsável por representar e gerenciar a lógica de domínio de coleções.
Implementa métodos conforme diagrama SD04.
"""
from .. import schemas, db_json


class EColecao:
    """
    Entidade de domínio para Coleção.
    Responsável por criar e persistir coleções.
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

