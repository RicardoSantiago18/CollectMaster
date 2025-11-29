from fastapi import APIRouter, HTTPException, status
from typing import List
from .. import schemas, db_json
from ..controllers.login import CVisualizarColec

router = APIRouter()

@router.post("/", response_model=schemas.ItemPublic, status_code=status.HTTP_201_CREATED)
async def create_new_item(item_data: schemas.ItemCreate):
    """
    Endpoint HTTP para criação de item.
    Recebe requisição HTTP POST e chama o controller C-VISUALIZARCOLEC.
    Conforme diagrama SD05.
    """
    # Passo 4: FRM-ADDITEM → C-VISUALIZARCOLEC: adicionarItem(dadosItem, id_colecao)
    item_public = CVisualizarColec.adicionarItem(
        dados_item=item_data,
        id_colecao=item_data.collection_id
    )
    
    return item_public

@router.get("/collection/{collection_id}", response_model=List[schemas.ItemPublic])
async def get_items(collection_id: int):
    return db_json.get_items_by_collection_id(collection_id)

@router.put("/{item_id}", response_model=schemas.ItemPublic)
async def update_item(item_id: int, item_update: schemas.ItemUpdate):
    updated_item = db_json.update_item_in_db(item_id, item_update)
    if not updated_item:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return updated_item

@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item(item_id: int):
    success = db_json.delete_item_in_db(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return None