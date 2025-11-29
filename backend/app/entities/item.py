"""
Entidade E-ITEM
Responsável por representar e gerenciar a lógica de domínio de itens.
Implementa métodos conforme diagrama SD05.
"""
from .. import schemas, db_json


class EItem:
    """
    Entidade de domínio para Item.
    Responsável por criar e persistir itens.
    """
    
    @staticmethod
    def dadosItem(dados_item: schemas.ItemCreate) -> schemas.ItemInDB:
        """
        Cria uma nova instância de item.
        
        Conforme diagrama SD05, este método é responsável por:
        - Criar o novo item com base em dadosItem
        - Retornar o novo item criado
        
        Args:
            dados_item: Objeto ItemCreate com os dados do item
            
        Returns:
            ItemInDB: Objeto do novo item criado
        """
        # Gera ID
        all_items = db_json.load_items()
        new_id = 1 if not all_items else all_items[-1].id + 1
        
        # Imagem Placeholder
        image_url = f"https://via.placeholder.com/150?text={dados_item.name}"
        
        # Cria objeto ItemInDB
        item_to_save = schemas.ItemInDB(
            id=new_id,
            image_url=image_url,
            **dados_item.model_dump()
        )
        
        # Persiste no banco de dados
        created_item = db_json.create_item_in_db(item_to_save)
        
        return created_item

