import { useState } from 'react';
import { forgotPassword } from '../api/auth';

/**
 * Hook customizado que gerencia toda a lógica do formulário de recuperação de senha.
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
    if (errors.submit) {
      setErrors({});
    }
    setSuccess(false);
  };


  const preencherEmail = (email) => {
    setFormData({ email });
  };


  const enviar = async () => {
    setErrors({});
    setSuccess(false);
    setLoading(true);

    if (!formData.email) {
      setErrors({ submit: 'Por favor, informe seu email' });
      setLoading(false);
      return;
    }

    const result = await solicitarRecuperacao(formData.email);

    if (result.success) {
      setSuccess(true);
      setFormData({ email: '' });
    } else {
      setErrors({ submit: result.error || 'email não encontrado' });
    }

    setLoading(false);
  };


  const solicitarRecuperacao = async (email) => {
    const result = await forgotPassword(email);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error };
    }
  }


  const exibirMsg = (mensagem, tipo = 'error') => {
    if (tipo === 'success') {
      setSuccess(true);
      setErrors({});
    } else {
      setErrors({ submit: mensagem });
      setSuccess(false);
    }
  };

 
  s
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

