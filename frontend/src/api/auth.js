/**
 * API Client para autenticação
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

/**
 * Realiza login do usuário.
 * Conforme diagrama SD02, este método corresponde a loginUser(email, senha)
 * chamado pelo controller C-REALIZARLOGIN.
 * 
 * Fluxo:
 * - Passo 2: FRM-REALIZARLOGIN → C-REALIZARLOGIN: loginUser(email, senha)
 * - Passo 5: Retorna 401 Unauthorized se senha inválida
 * - Passo 8: Retorna 200 OK com UserPublic se senha válida
 * - Passo 10: Salva dados no localStorage
 * 
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
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

    // Caso 2 - Senha válida (Passo 8): 200 OK com UserPublic
    if (response.ok) {
      const userData = await response.json();
      // Passo 10: Salva no localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true, data: userData };
    } 
    // Caso 1 - Senha inválida (Passo 5): 401 Unauthorized
    else if (response.status === 401) {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Email ou senha incorretos' };
    } 
    // Outros erros
    else {
      const errorData = await response.json();
      return { success: false, error: errorData.detail || 'Erro ao realizar login' };
    }
  } catch (error) {
    return { success: false, error: 'Erro de conexão. Tente novamente.' };
  }
};

/**
 * Solicita recuperação de senha.
 * Envia o email do usuário para o backend que gera um token de reset.
 * 
 * @param {string} email - Email do usuário
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
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

/**
 * Confirma a recuperação de senha usando o token.
 * 
 * @param {string} token - Token de recuperação de senha
 * @param {string} password - Nova senha
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
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

