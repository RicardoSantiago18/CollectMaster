import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

/**
 * Hook customizado que gerencia toda a lógica do formulário de login.
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
    if (errors.submit) {
      setErrors({});
    }
  };


  const insereEmailESenha = async (email, senha) => {
    const result = await loginUser(email, senha);

    if (result.success) {
      navigate('/dashboard');
      return { success: true, data: result.data };
    } else {
      setErrors({ submit: result.error });
      return { success: false, error: result.error };
    }
  };

  /**
   * Processa o envio do formulário de login.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!formData.email || !formData.password) {
      setErrors({ submit: 'Email e senha são obrigatórios.' });
      return;
    }

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