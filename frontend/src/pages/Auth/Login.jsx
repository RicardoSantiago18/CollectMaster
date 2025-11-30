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
  Grid,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

/**
 * FRM-REALIZARLOGIN - Formulário/Tela de Login
 * Conforme diagrama SD02 - REALIZAR LOGIN
 * 
 * Este componente representa a interface de login (FRM-REALIZARLOGIN).
 * Recebe email e senha do colecionador através do método insereEmailESenha()
 * e exibe erro em caso de falha ou salva dados no localStorage em caso de sucesso.
 */
import { useLoginForm } from '../../hooks/useLoginForm';

// Componente visual do formulário de login (FRM-REALIZARLOGIN)
// Recebe todas as props do hook useLoginForm
const LoginView = ({
  formData,
  errors,
  showPassword,
  handleChange,
  handleSubmit,
  setShowPassword,
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
          onClick={() => navigate('/')}
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
                  content: '"🏆"',
                  fontSize: '2.5rem',
                  filter: 'drop-shadow(0 0 8px #D4AF37)',
                }
              }}
            >
              CollectMaster
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              gutterBottom 
              fontWeight="600"
              sx={{ color: '#2F4F4F', mt: 2 }}
            >
              Bem-vindo de volta!
            </Typography>
          </Box>

          {/* Alert de erro */}
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
                error={!!errors.email}
                helperText={errors.email}
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

              <TextField
                fullWidth
                label="Senha"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
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
            </Box>
            
            <Link
                component={RouterLink}
                to="/forgot-password"
                variant="body2"
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  mb: 3,
                  color: '#2F4F4F',
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'underline',
                    color: '#D4AF37',
                  }
                }}
              >
                Esqueceu a senha?
              </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
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
                transition: 'all 0.3s ease',
              }}
            >
              Entrar
            </Button>
          </Box>

          {/* Link para Cadastro */}
          <Box textAlign="center" mt={3}>
            <Typography variant="body2" sx={{ color: '#2F4F4F' }}>
              Não tem uma conta?{' '}
              <Link
                component={RouterLink}
                to="/register"
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
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  </Box>
  );
};

/**
 * Componente principal de Login (FRM-REALIZARLOGIN)
 * Conecta a lógica do hook useLoginForm com a visualização LoginView.
 * 
 * Fluxo conforme diagrama SD02:
 * 1. Colecionador → FRM-REALIZARLOGIN: insereEmailESenha()
 * 2. FRM-REALIZARLOGIN → C-REALIZARLOGIN: loginUser(email, senha)
 * 3. C-REALIZARLOGIN → E-COLECIONADOR: get_user_by_email(email)
 * 4. E-COLECIONADOR → C-REALIZARLOGIN: retorna UserInDB
 * 5-7. Se senha inválida: 401 Unauthorized → Exibe erro
 * 8-10. Se senha válida: 200 OK → Retorna dados → Salva no localStorage
 */
const Login = () => {
  const logic = useLoginForm();
  
  return <LoginView {...logic} />;
};

export default Login;