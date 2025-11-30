from fastapi import APIRouter, HTTPException, status
from typing import List
from .. import schemas, db_json
from ..controllers.colecoes import CColecoes

router = APIRouter()

@router.post("/", response_model=schemas.CollectionPublic, status_code=status.HTTP_201_CREATED)
async def create_new_collection(collection_data: schemas.CollectionCreate):
    """
    Endpoint HTTP para criação de coleção.
    Recebe requisição HTTP POST e chama o controller C-COLECOES.
    Conforme diagrama SD04.
    """
    # Passo 5: FRM-CRIARCOLEC → C-COLECOES: createCollection(dados)
    collection_public = CColecoes.createCollection(dados=collection_data)
    
    return collection_public

# NOVO ENDPOINT DE ATUALIZAÇÃO
@router.put("/{collection_id}", response_model=schemas.CollectionPublic)
async def update_collection(collection_id: int, collection_update: schemas.CollectionUpdate):
    updated_col = db_json.update_collection_in_db(collection_id, collection_update)
    if not updated_col:
        raise HTTPException(status_code=404, detail="Coleção não encontrada")
    return updated_col

@router.get("/{user_id}", response_model=List[schemas.CollectionPublic])
async def get_collections_for_user(user_id: int):
    return db_json.get_collections_by_owner_id(user_id)

@router.delete("/{collection_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_collection(collection_id: int):
    success = db_json.delete_collection_in_db(collection_id)
    if not success:
        raise HTTPException(status_code=404, detail="Coleção não encontrada")
    return None