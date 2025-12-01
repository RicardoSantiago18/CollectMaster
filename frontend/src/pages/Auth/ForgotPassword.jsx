import React from 'react';
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
} from '@mui/material';
import {
  Email,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/useForgotPassword';


const ForgotPasswordView = ({
  formData,
  errors,
  success,
  loading,
  handleChange,
  handleSubmit,
  exibirMsg,
}) => {
  const navigate = useNavigate();

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
                    content: '"🔐"',
                    fontSize: '2.5rem',
                    filter: 'drop-shadow(0 0 8px #D4AF37)',
                  }
                }}
              >
                Recuperar Senha
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ color: '#2F4F4F', mt: 2 }}
              >
                Digite seu email para receber um link de redefinição de senha
              </Typography>
            </Box>

            {/* Alert de erro - exibirMsg("email não encontrado") */}
            {errors.submit && (
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
                {errors.submit}
              </Alert>
            )}

            {/* Alert de sucesso - exibirMsg("Verifique seu email") */}
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
                Verifique seu email. O link de recuperação foi enviado (verifique o console do backend).
              </Alert>
            )}

            {/* Formulário */}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.submit && !success}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#2F4F4F' }} />
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
                disabled={loading}
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
                {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
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


const ForgotPassword = () => {
  const logic = useForgotPassword();
  
  return <ForgotPasswordView {...logic} />;
};

export default ForgotPassword;
