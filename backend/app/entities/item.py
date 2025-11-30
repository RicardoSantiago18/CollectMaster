from .. import schemas, db_json


class EItem:
    
    """
        Conforme diagrama SD05, este método é responsável por:
        - Criar o novo item com base em dadosItem
        - Retornar o novo item criado
        """
    @staticmethod
    def dadosItem(dados_item: schemas.ItemCreate) -> schemas.ItemInDB:
        
        all_items = db_json.load_items()
        new_id = 1 if not all_items else all_items[-1].id + 1
        
        image_url = f"https://via.placeholder.com/150?text={dados_item.name}"
        
        item_to_save = schemas.ItemInDB(
            id=new_id,
            image_url=image_url,
            **dados_item.model_dump()
        )
        
        created_item = db_json.create_item_in_db(item_to_save)
        
        return created_item
    
    
    """
    Conforme diagrama SD06:
    - Recebe id_item da interface (FRM-VISUCOLEC)
    - Remove o item do banco de dados (removerItem)
    - Retorna True se o item foi removido com sucesso, False caso contrário
    """
    @staticmethod
    def removerItem(id_item: int) -> bool:
        return db_json.delete_item_in_db(item_id=id_item)

