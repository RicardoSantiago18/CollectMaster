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
  Divider,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Lock,
  Google,
  Facebook,
  ArrowBack,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Importa o hook que gerencia a lógica do formulário de registro
import { useRegisterForm } from '../../hooks/useRegisterForm.js';

// Componente visual do formulário de registro
// Recebe todas as props do hook useRegisterForm
const RegisterView = ({
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
      <Container maxWidth="sm" sx={{ position: 'relative' }}>
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
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
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
              Crie sua conta
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ color: 'rgba(47, 79, 79, 0.8)' }}
            >
              Junte-se a milhares de colecionadores
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
                label="Nome completo"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#2F4F4F' }} />
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

              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2.5 }}>
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

                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#2F4F4F' }} />
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
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#e5c55a',
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Criar Conta
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Container>
  </Box>
  );
};


// Componente principal de Registro que conecta a lógica com a visualização
const Register = () => {
  const logic = useRegisterForm();
  
  return <RegisterView {...logic} />;
};

export default Register;