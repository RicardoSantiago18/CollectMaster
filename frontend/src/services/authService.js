/**
 * Serviço de autenticação
 * Implementa comunicação com o backend para operações de autenticação
 */

/**
 * Cria um novo usuário no sistema.
 * Conforme diagrama SD01, este método corresponde a criarUsuario(nome, email, senha)
 * chamado pelo controller C-CADASTRO.
 * 
 * @param {string} nome - Nome completo do usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha em texto plano
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
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
      // Retorna os dados do cadastro em caso de sucesso
      const cadastro = await response.json();
      return { success: true, data: cadastro };
    } else {
      // Retorna a mensagem de erro em caso de falha
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao realizar cadastro' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

// Mantém registerUser para compatibilidade (deprecated)
export const registerUser = criarUsuario;

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