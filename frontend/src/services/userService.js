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

/**
 * Carrega dados completos do perfil de outro colecionador.
 */
export const carregarDadosPerfil = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/profile`);
    if (response.ok) {
      // Passo 5: Retorna dados completos (perfil + coleções)
      return await response.json();
    }
    console.error('Erro ao buscar perfil completo:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao buscar perfil completo:', error);
    return null;
  }
};

export const searchUsers = async (searchQuery) => {
  try {
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

    if (response.ok) {
      const userPublic = await response.json();
      return { success: true, data: userPublic };
    } 
    else if (response.status === 400) {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Email já está em uso' };
    }
    else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao atualizar perfil' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};