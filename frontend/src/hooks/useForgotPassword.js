import { useState } from 'react';
import { forgotPassword } from '../services/authService';

/**
 * Hook customizado que gerencia toda a lógica do formulário de recuperação de senha.
 * Implementa o fluxo conforme diagrama SD08 - ESQUECER SENHA.
 * 
 * Conforme diagrama:
 * - FRM-ESQUECERSENHA: Componente ForgotPassword.jsx (interface)
 * - preencherEmail(email): Método que recebe email do colecionador (passo 3)
 * - enviar(): Método que envia a solicitação (passo 4)
 * - solicitarRecuperacao(email): Chama o serviço que comunica com C-RECUPERARSENHA (passo 4.1)
 * - exibirMsg(): Mostra mensagem de sucesso ou erro (passo 5.2.1 ou erro)
 */
export const useForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setSuccess(false);
  };

  /**
   * Método preencherEmail() conforme diagrama SD08, passo 3.
   * Colecionador → FRM-ESQUECERSENHA: preencherEmail(email)
   * 
   * @param {string} email - Email do colecionador
   */
  const preencherEmail = (email) => {
    setFormData({ email });
  };

  /**
   * Método enviar() conforme diagrama SD08, passo 4.
   * Colecionador → FRM-ESQUECERSENHA: enviar()
   * 
   * Este método é chamado quando o usuário submete o formulário.
   */
  const enviar = async () => {
    setErrors({});
    setSuccess(false);
    setLoading(true);

    // Validação básica
    if (!formData.email) {
      setErrors({ submit: 'Por favor, informe seu email' });
      setLoading(false);
      return;
    }

    // Passo 4.1: FRM-ESQUECERSENHA → C-RECUPERARSENHA: solicitarRecuperacao(email)
    const result = await solicitarRecuperacao(formData.email);

    if (result.success) {
      // Passo 5.2.1: exibirMsg("Verifique seu email")
      setSuccess(true);
      setFormData({ email: '' });
    } else {
      // Exibe erro: exibirMsg("email não encontrado")
      setErrors({ submit: result.error || 'email não encontrado' });
    }

    setLoading(false);
  };

  /**
   * Método solicitarRecuperacao() conforme diagrama SD08, passo 4.1.
   * FRM-ESQUECERSENHA → C-RECUPERARSENHA: solicitarRecuperacao(email)
   * 
   * @param {string} email - Email do colecionador
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  const solicitarRecuperacao = async (email) => {
    const result = await forgotPassword(email);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  };

  /**
   * Método exibirMsg() conforme diagrama SD08.
   * Exibe mensagem de sucesso ou erro para o colecionador.
   * 
   * @param {string} mensagem - Mensagem a ser exibida
   * @param {string} tipo - Tipo da mensagem ('success' ou 'error')
   */
  const exibirMsg = (mensagem, tipo = 'error') => {
    if (tipo === 'success') {
      setSuccess(true);
      setErrors({});
    } else {
      setErrors({ submit: mensagem });
      setSuccess(false);
    }
  };

  /**
   * Processa o envio do formulário de recuperação de senha.
   * Valida os campos e chama enviar().
   * 
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await enviar();
  };

  return {
    formData,
    errors,
    success,
    loading,
    handleChange,
    handleSubmit,
    preencherEmail,
    enviar,
    exibirMsg,
  };
};

