export const criarUsuario = async (nome, email, senha) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nome,
        email: email,
        password: senha,
      }),
    });

    if (response.ok) {
      const cadastro = await response.json();
      return { success: true, data: cadastro };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao realizar cadastro' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// Mantém registerUser para compatibilidade (deprecated)
export const registerUser = criarUsuario;


export const loginUser = async (email, senha) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } 
    else if (response.status === 401) {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Email ou senha incorretos' };
    } 
    else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao realizar login' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};


export const forgotPassword = async (email) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao solicitar recuperação de senha' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};


export const resetPassword = async (token, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: token,
        new_password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao redefinir senha' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};