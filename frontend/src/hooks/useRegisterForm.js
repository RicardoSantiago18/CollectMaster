import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';

// Hook customizado que gerencia toda a lógica do formulário de registro
// Retorna estados e funções para controlar o formulário e criação de conta
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

  // Atualiza os campos do formulário quando o usuário digita
  // Limpa erros específicos do campo quando o usuário começa a digitar
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Limpa erro do campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  // Valida todos os campos do formulário de registro
  // Verifica nome, email, senha e confirmação de senha
  // Retorna true se todos os campos são válidos, false caso contrário
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

  // Processa o envio do formulário de registro
  // Valida os campos e cria a conta do usuário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await registerUser(
      formData.name,
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate('/login', { 
        state: { message: 'Cadastro realizado com sucesso! Faça login para continuar.' }
      });
    } else {
      setErrors({ submit: result.error });
    }
  };

  // Exportamos tudo que o componente visual precisa
  return {
    formData,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  };
};