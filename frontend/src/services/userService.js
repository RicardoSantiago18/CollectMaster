const API_URL = 'http://localhost:8000/api';

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Erro ao buscar usuários:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar usuários:', error);
    return [];
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Erro ao buscar usuário:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao buscar usuário:', error);
    return null;
  }
};

export const searchUsers = async (searchQuery) => {
  try {
    // A API no backend deve esperar o parâmetro ?search=...
    const response = await fetch(`${API_URL}/users?search=${encodeURIComponent(searchQuery)}`);
    if (response.ok) {
      return await response.json();
    }
    console.error('Erro ao buscar usuários:', await response.json());
    return [];
  } catch (error) {
    console.error('Erro de conexão ao buscar usuários:', error);
    return [];
  }
};

/**
 * Atualiza um usuário no sistema.
 * Conforme diagrama SD03, este método corresponde a updateUser(id, dados)
 * chamado pelo controller C-EDITARPERFIL.
 * 
 * Fluxo:
 * - Passo 2.1: FRM-EDITARPERFIL → C-EDITARPERFIL: updateUser(id, dados)
 * - Passo 2.1.1: PUT api/user/{id}()
 * - Passo 6.2: Retorna 400 Bad Request se email em uso
 * - Passo 8: Retorna 200 OK com UserPublic se sucesso
 * 
 * @param {number} userId - ID do usuário a ser atualizado
 * @param {object} userData - Objeto com os dados a serem atualizados (nome, email, bio)
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    // Passo 8: 200 OK com UserPublic
    if (response.ok) {
      const userPublic = await response.json();
      return { success: true, data: userPublic };
    } 
    // Passo 6.2: 400 Bad Request (email em uso)
    else if (response.status === 400) {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Email já está em uso' };
    }
    // Outros erros
    else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao atualizar perfil' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};