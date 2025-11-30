from fastapi import HTTPException, status
from .. import schemas, db_json
from ..entities.colecao import EColecao
from ..entities.item import EItem


class CColecoes:
    
    """
    Conforme diagrama SD04:
    - Recebe dados da interface (FRM-CRIARCOLEC)
    - Chama E-COLEÇÃO.create_collection_in_db()
    - Retorna a nova coleção criada
    """
    @staticmethod
    def createCollection(dados: schemas.CollectionCreate) -> schemas.CollectionPublic:

        all_collections = db_json.load_collections()
        new_id = 1 if not all_collections else all_collections[-1].id + 1
        
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
        
        created_collection = EColecao.create_collection_in_db(collection_to_save)
        
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
    

    """
    Conforme diagrama SD05:
    - Recebe dadosItem e id_colecao da interface (FRM-ADDITEM)
    - Cria o item em E-ITEM (dadosItem)
    - Busca a coleção em E-COLEÇÃO (buscar)
    - Adiciona o item à coleção em E-COLEÇÃO (adicionar)
    - Retorna o item adicionado
    """
    @staticmethod
    def adicionarItem(dados_item: schemas.ItemCreate, id_colecao: int) -> schemas.ItemPublic:
        
        novo_item = EItem.dadosItem(dados_item=dados_item)

        colecao = EColecao.buscar(id_colecao=id_colecao)
        
        if not colecao:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Coleção não encontrada"
            )
        
        item_adicionado = EColecao.adicionar(novo_item=novo_item)
        
        item_public = schemas.ItemPublic(
            id=item_adicionado.id,
            name=item_adicionado.name,
            description=item_adicionado.description,
            quantity=item_adicionado.quantity,
            estimated_value=item_adicionado.estimated_value,
            collection_id=item_adicionado.collection_id,
            image_url=item_adicionado.image_url
        )
        
        return item_public
    
    
    """
    Conforme diagrama SD06:
    - Recebe id_item e id_colecao da interface (FRM-REMOVERITEM)
    - Busca a coleção em E-COLEÇÃO (buscar)
    - Remove o item da coleção em E-COLEÇÃO (removerItem)
    - E-COLEÇÃO chama E-ITEM para destruir o item
    - Retorna confirmação de remoção
    """
    @staticmethod
    def removerItem(id_item: int, id_colecao: int) -> bool:

        colecao = EColecao.buscar(id_colecao=id_colecao)
        
        if not colecao:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Coleção não encontrada"
            )
        
        success = EColecao.removerItem(id_item=id_item)
        
        return success
