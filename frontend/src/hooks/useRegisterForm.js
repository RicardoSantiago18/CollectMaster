import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../api/auth';

/**
 * Hook customizado que gerencia toda a lógica do formulário de registro.
 */
export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  /**
   * Atualiza os campos do formulário quando o usuário digita.
   * Limpa erros específicos do campo quando o usuário começa a digitar.
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  /**
   * Valida todos os campos do formulário de registro.
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const infoCadastro = async (nome, email, senha) => {
    const result = await criarUsuario(nome, email, senha);

    if (result.success) {
      navigate('/login', { 
        state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' }
      });
      return { success: true, data: result.data };
    } else {
      setErrors({ submit: result.error });
      return { success: false, error: result.error };
    }
  };

  /**
   * Processa o envio do formulário de registro.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await infoCadastro(
      formData.name,
      formData.email,
      formData.password
    );
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