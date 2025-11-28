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
      return await response.json();
    }
    console.error('Erro ao atualizar usuário:', await response.json());
    return null;
  } catch (error) {
    console.error('Erro de conexão ao atualizar usuário:', error);
    return null;
  }
};