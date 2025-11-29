import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

/**
 * Hook customizado que gerencia toda a lógica do formulário de login.
 * Implementa o fluxo conforme diagrama SD02 - REALIZAR LOGIN.
 * 
 * Conforme diagrama:
 * - FRM-REALIZARLOGIN: Componente Login.jsx (interface)
 * - insereEmailESenha(): Método que recebe dados do colecionador
 * - loginUser(): Chama o serviço que comunica com C-VISUALIZARCOLEC
 * - Exibe erro(): Mostra mensagem de erro em caso de falha
 * - Salva no localStorage(): Salva dados do usuário autenticado
 */
export const useLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  /**
   * Atualiza os campos do formulário quando o usuário digita.
   * Limpa erros quando o usuário começa a digitar novamente.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpa o erro principal se o usuário começar a digitar
    if (errors.submit) {
      setErrors({});
    }
  };

  /**
   * Método insereEmailESenha() conforme diagrama SD02.
   * Passo 1: Recebe email e senha do colecionador.
   * Passo 2: Chama loginUser() que comunica com C-VISUALIZARCOLEC.
   * 
   * @param {string} email - Email do colecionador
   * @param {string} senha - Senha do colecionador
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  const insereEmailESenha = async (email, senha) => {
    // Passo 2 do diagrama: chama loginUser (que comunica com C-VISUALIZARCOLEC)
    const result = await loginUser(email, senha);

    if (result.success) {
      // Passo 9-10: Retorna dados e salva no localStorage
      // O loginUser já salva no localStorage, então apenas redireciona
      navigate('/dashboard');
      return { success: true, data: result.data };
    } else {
      // Passo 6-7: Exibe erro (401 Unauthorized)
      setErrors({ submit: result.error });
      return { success: false, error: result.error };
    }
  };

  /**
   * Processa o envio do formulário de login.
   * Valida os campos e chama insereEmailESenha().
   * 
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpa erros antigos

    // Validação básica
    if (!formData.email || !formData.password) {
      setErrors({ submit: 'Email e senha são obrigatórios.' });
      return;
    }

    // Chama insereEmailESenha conforme diagrama SD02
    await insereEmailESenha(formData.email, formData.password);
  };

  return {
    formData,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  };
};