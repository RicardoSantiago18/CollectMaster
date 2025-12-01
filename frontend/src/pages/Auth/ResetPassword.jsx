import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';


const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verifica se o token está presente na URL
    if (!token) {
      setError('Token inválido ou ausente. Por favor, solicite um novo link de recuperação.');
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validações
    if (!formData.password) {
      setError('Por favor, informe a nova senha');
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (!token) {
      setError('Token inválido ou ausente');
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(token, formData.password);
      
      if (result.success) {
        setSuccess(true);
        // Redireciona para login após 2 segundos
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(result.error || 'Erro ao redefinir senha');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#2F4F4F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative' }}>
        {/* Botão Voltar */}
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/login')}
          sx={{
            position: 'absolute',
            top: -60,
            left: 0,
            borderColor: '#D4AF37',
            color: '#D4AF37',
            '&:hover': {
              borderColor: '#e5c55a',
              bgcolor: 'rgba(212, 175, 55, 0.1)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Voltar
        </Button>

        <Card 
          elevation={8} 
          sx={{ 
            borderRadius: 3, 
            overflow: 'hidden',
            bgcolor: '#F5F5DC',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  color: '#2F4F4F',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  '&::before': {
                    content: '"🔑"',
                    fontSize: '2.5rem',
                    filter: 'drop-shadow(0 0 8px #D4AF37)',
                  }
                }}
              >
                Redefinir Senha
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ color: '#2F4F4F', mt: 2 }}
              >
                Digite sua nova senha
              </Typography>
            </Box>

            {/* Alert de erro */}
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  bgcolor: '#ffebee',
                  color: '#c62828',
                  '& .MuiAlert-icon': {
                    color: '#c62828',
                  }
                }}
              >
                {error}
              </Alert>
            )}

            {/* Alert de sucesso */}
            {success && (
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3,
                  bgcolor: '#e8f5e9',
                  color: '#2e7d32',
                  '& .MuiAlert-icon': {
                    color: '#2e7d32',
                  }
                }}
              >
                Senha alterada com sucesso! Redirecionando para o login...
              </Alert>
            )}

            {/* Formulário */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#2F4F4F' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: '#2F4F4F' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#2F4F4F',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D4AF37',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#D4AF37',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#000000',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!error}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#2F4F4F' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: '#2F4F4F' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      bgcolor: '#ffffff',
                      '& fieldset': {
                        borderColor: '#2F4F4F',
                      },
                      '&:hover fieldset': {
                        borderColor: '#D4AF37',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#D4AF37',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: '#000000',
                    },
                    '& .MuiInputLabel-root': {
                      color: '#2F4F4F',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#D4AF37',
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !token || success}
                sx={{
                  py: 1.5,
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#e5c55a',
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                  },
                  '&:disabled': {
                    bgcolor: '#cccccc',
                    color: '#666666',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </Box>

            {/* Link para Login */}
            <Box textAlign="center" mt={3}>
              <Typography variant="body2" sx={{ color: '#2F4F4F' }}>
                Lembrou sua senha?{' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  sx={{
                    fontWeight: '600',
                    color: '#D4AF37',
                    textDecoration: 'none',
                    '&:hover': { 
                      textDecoration: 'underline',
                      color: '#e5c55a',
                    },
                  }}
                >
                  Fazer login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ResetPassword;

