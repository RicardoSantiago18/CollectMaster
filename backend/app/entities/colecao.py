from typing import Optional, List
from .. import schemas, db_json


class EColecao:
    
    """
    Conforme diagrama SD04:
    - Recebe dados da interface (FRM-CRIARCOLEC)
    - Cria a coleção em E-COLEÇÃO (create_collection_in_db)
    - Retorna a coleção criada
    """
    @staticmethod
    def create_collection_in_db(collection: schemas.CollectionInDB) -> schemas.CollectionInDB:
        return db_json.create_collection_in_db(collection)
    

    """
    Conforme diagrama SD05:
    - Recebe id_colecao da interface (FRM-VISUCOLEC)
    - Busca a coleção em E-COLEÇÃO (buscar)
    - Retorna a coleção encontrada
    """
    @staticmethod
    def buscar(id_colecao: int) -> Optional[schemas.CollectionInDB]:
        
        collections = db_json.load_collections()
        for collection in collections:
            if collection.id == id_colecao:
                return collection
        return None
    


    """
    Conforme diagrama SD05:
    - Recebe dadosItem e id_colecao da interface (FRM-ADDITEM)
    - Cria o item em E-ITEM (dadosItem)
    - Busca a coleção em E-COLEÇÃO (buscar)
    - Adiciona o item à coleção em E-COLEÇÃO (adicionar)
    - Retorna o item adicionado
    """
    @staticmethod
    def adicionar(novo_item: schemas.ItemInDB) -> schemas.ItemInDB:
        return novo_item
    

    """
        Conforme diagrama SD06:
        - Atualizar a lista interna de itens da coleção
        - Preparar a remoção definitiva do item
        - Chamar E-ITEM para destruir o item
        """
    @staticmethod
    def removerItem(id_item: int) -> bool:
        items = db_json.load_items()

        item_to_remove = None
        for item in items:
            if item.id == id_item:
                item_to_remove = item
                break
        
        if not item_to_remove:
            return False
        
        from ..entities.item import EItem
        success = EItem.removerItem(id_item=id_item)
        
        return success
    

    """
    Conforme diagrama SD07:
    - Recebe id_alvo da interface (FRM-VISUCOLEC)
    - Busca as coleções em E-COLEÇÃO (buscarColecao)
    - Retorna a lista de coleções encontradas
    """
    @staticmethod
    def buscarColecao(id_alvo: int) -> List[schemas.CollectionPublic]:
        collections = db_json.get_collections_by_owner_id(owner_id=id_alvo)
        
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

