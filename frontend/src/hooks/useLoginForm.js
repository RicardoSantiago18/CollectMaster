import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';

// Hook customizado que gerencia toda a lógica do formulário de login
// Retorna estados e funções para controlar o formulário e autenticação
export const useLoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  // Atualiza os campos do formulário quando o usuário digita
  // Limpa erros quando o usuário começa a digitar novamente
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

  // Processa o envio do formulário de login
  // Valida os campos e tenta autenticar o usuário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpa erros antigos

    if (!formData.email || !formData.password) {
      setErrors({ submit: 'Email e senha são obrigatórios.' });
      return;
    }

    const result = await loginUser(formData.email, formData.password);

    if (result.success) {
      // Sucesso! Redireciona para o Dashboard
      // (Certifique-se de ter uma rota /dashboard em App.jsx)
      navigate('/dashboard'); 
    } else {
      // Erro!
      setErrors({ submit: result.error });
    }
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