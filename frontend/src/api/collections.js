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

/**
 * Cria uma nova coleção no sistema.
 * Conforme diagrama SD04, este método corresponde a createCollection(dados)
 * chamado pelo controller C-COLECOES.
 * 
 * Fluxo:
 * - Passo 3.1: FRM-CRIARCOLEC → C-COLECOES: createCollection(dados)
 * - Passo 8: Retorna nova coleção criada
 * 
 * @param {object} collectionData - Objeto com os dados da coleção
 * @returns {Promise<object|null>} Nova coleção criada ou null em caso de erro
 */
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

    // Passo 8: Retorna nova coleção
    if (response.ok) {
      return await response.json();
    }
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

/**
 * Cria um novo item em uma coleção.
 * Conforme diagrama SD05, este método corresponde a adicionarItem(dadosItem, id_colecao)
 * chamado pelo controller C-COLECOES.
 * 
 * Fluxo:
 * - Passo 4: FRM-ADDITEM → C-COLECOES: adicionarItem(dadosItem, id_colecao)
 * - Passo 8: Retorna item adicionado
 * 
 * @param {object} itemData - Objeto com os dados do item e collectionId
 * @returns {Promise<object|null>} Item criado ou null em caso de erro
 */
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

    // Passo 8: Retorna item adicionado
    if (response.ok) {
      return await response.json();
    }
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

/**
 * Remove um item do sistema.
 * Conforme diagrama SD06, este método corresponde a removerItem(id_item, id_colecao)
 * chamado pelo controller C-COLECOES.
 * 
 * Fluxo:
 * - Passo 3: FRM-REMOVERITEM → C-COLECOES: removerItem(id_item, id_colecao)
 * - Passo 8: Retorna confirmação de remoção
 * 
 * @param {number} itemId - ID do item a ser removido
 * @returns {Promise<boolean>} True se a exclusão foi bem-sucedida, false caso contrário
 */
export const deleteItem = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/items/${itemId}`, {
      method: 'DELETE',
    });
    
    // Passo 8: Retorna confirmação de remoção
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

