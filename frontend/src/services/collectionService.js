const API_URL = 'http://localhost:8000/api';

// --- COLEÇÕES ---

// Busca todas as coleções de um usuário específico
export const getCollections = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/collections/${userId}`);
    if (response.ok) return await response.json();
    console.error('Erro ao buscar coleções:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar coleções:', error);
    return [];
  }
};

// Cria uma nova coleção no sistema
// Recebe um objeto com os dados da coleção e converte camelCase para snake_case
export const createCollection = async (collectionData) => {
  try {
    const response = await fetch(`${API_URL}/collections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: collectionData.name,
        description: collectionData.description,
        image_url: collectionData.imageUrl, // Frontend usa camelCase, Backend snake_case
        is_public: collectionData.isPublic,
        owner_id: collectionData.ownerId
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API criar coleção:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro conexão criar coleção:', error);
    return null;
  }
};

// Atualiza os dados de uma coleção existente
export const updateCollection = async (id, collectionData) => {
  try {
    const response = await fetch(`${API_URL}/collections/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: collectionData.name,
        description: collectionData.description,
        image_url: collectionData.imageUrl,
        is_public: collectionData.isPublic,
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API atualizar coleção:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro conexão atualizar coleção:', error);
    return null;
  }
};



// --- ITENS ---

// Busca todos os itens de uma coleção específica
export const getCollectionItems = async (collectionId) => {
  try {
    const response = await fetch(`${API_URL}/items/collection/${collectionId}`);
    if (response.ok) return await response.json();
    console.error('Erro ao buscar itens:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar itens:', error);
    return [];
  }
};

// Cria um novo item em uma coleção
// Converte os valores numéricos e associa o item à coleção
export const createItem = async (itemData) => {
  try {
    const response = await fetch(`${API_URL}/items/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemData.name,
        description: itemData.description,
        quantity: parseInt(itemData.quantity),
        estimated_value: parseFloat(itemData.estimatedValue),
        collection_id: parseInt(itemData.collectionId),
        image_url: itemData.imageUrl
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro API ao criar Item:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao criar Item:', error);
    return null;
  }
};

// Atualiza os dados de um item existente
export const updateItem = async (itemId, itemData) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: itemData.name,
        description: itemData.description,
        quantity: parseInt(itemData.quantity),
        estimated_value: parseFloat(itemData.estimatedValue),
        image_url: itemData.imageUrl
      }),
    });

    if (response.ok) return await response.json();
    console.error('Erro ao atualizar item:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão no Update:', error);
    return null;
  }
};

// Exclui um item do sistema
// Retorna true se a exclusão foi bem-sucedida, false caso contrário
export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE',
    });
    return response.ok; 
  } catch (error) {
    console.error('Erro de conexão no Delete:', error);
    return false;
  }
};

// Exclui uma coleção do sistema
// Retorna true se a exclusão foi bem-sucedida, false caso contrário
export const deleteCollection = async (id) => {
  try {
    const response = await fetch(`${API_URL}/collections/${id}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('Erro ao deletar coleção:', error);
    return false;
  }
};