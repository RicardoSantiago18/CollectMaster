// Registra um novo usuário no sistema
// Retorna um objeto com success: true/false e data ou error
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      // Retorna os dados do usuário em caso de sucesso
      return { success: true, data: await response.json() };
    } else {
      // Retorna a mensagem de erro em caso de falha
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao realizar cadastro' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// Realiza login do usuário e salva os dados no localStorage
// Retorna um objeto com success: true/false e data ou error
export const loginUser = async (email, password) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (response.ok) {
      const userData = await response.json();
      // Salva o usuário no localStorage para "lembrar" dele
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Email ou senha incorretos' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};