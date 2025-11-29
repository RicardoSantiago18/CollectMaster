import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { criarUsuario } from '../services/authService';

/**
 * Hook customizado que gerencia toda a lógica do formulário de registro.
 * Implementa o fluxo conforme diagrama SD01 - REALIZAR CADASTRO.
 * 
 * Conforme diagrama:
 * - FRM-CADASTRO: Componente Register.jsx (interface)
 * - infoCadastro(): Método que recebe dados do colecionador
 * - criarUsuario(): Chama o serviço que comunica com C-CADASTRO
 * - confirmaçãoCadastro: Retorna confirmação ao colecionador
 * 
 * Retorna estados e funções para controlar o formulário e criação de conta.
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
    // Limpa erro do campo
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  /**
   * Valida todos os campos do formulário de registro.
   * Verifica nome, email, senha e confirmação de senha.
   * 
   * @returns {boolean} true se todos os campos são válidos, false caso contrário
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

  /**
   * Método infoCadastro() conforme diagrama SD01.
   * Passo 1: Recebe dados do colecionador (nome, email, senha).
   * Passo 2: Chama criarUsuario() que comunica com C-CADASTRO.
   * Passo 6: Retorna confirmaçãoCadastro ao colecionador.
   * 
   * @param {string} nome - Nome completo do colecionador
   * @param {string} email - Email do colecionador
   * @param {string} senha - Senha do colecionador
   * @returns {Promise<{success: boolean, data?: object, error?: string}>}
   */
  const infoCadastro = async (nome, email, senha) => {
    // Passo 2 do diagrama: chama criarUsuario (que comunica com C-CADASTRO)
    const result = await criarUsuario(nome, email, senha);

    if (result.success) {
      // Passo 6 do diagrama: confirmaçãoCadastro
      // Redireciona para login com mensagem de sucesso
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
   * Valida os campos e chama infoCadastro().
   * 
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação antes de enviar
    if (!validateForm()) {
      return;
    }

    // Chama infoCadastro conforme diagrama SD01
    await infoCadastro(
      formData.name,
      formData.email,
      formData.password
    );
  };

  // Exporta tudo que o componente visual precisa
  return {
    formData,
    errors,
    showPassword,
    handleChange,
    handleSubmit,
    setShowPassword,
  };
};