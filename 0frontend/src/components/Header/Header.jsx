import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Container,
} from '@mui/material';
import {
  Collections as CollectionsIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import './Header.css';

// Componente Header que exibe a barra de navegação superior
// Adapta-se automaticamente baseado no estado de autenticação e página atual
function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Carrega o usuário do localStorage sempre que a rota muda
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao parsear usuário:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  // Realiza logout removendo o usuário do localStorage e redirecionando para login
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!user;
  const currentPath = location.pathname;
  // Identifica qual página está sendo exibida para ajustar o header
  const isHomePage = currentPath === '/';
  const isLoginPage = currentPath === '/login';
  const isRegisterPage = currentPath === '/register';
  const isPublicPage = isHomePage || isLoginPage || isRegisterPage;
  const isSocialPage = currentPath.startsWith('/social');
  const isDashboardPage = currentPath === '/dashboard' || currentPath.startsWith('/collections');
  const isProfilePage = currentPath === '/perfil';

  // Header Simplificado (para Home, Login e Cadastro)
  if (isPublicPage) {
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#2F4F4F',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, justifyContent: 'space-between' }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#F5F5DC',
                '&::before': {
                  content: '"🏆"',
                  fontSize: '2rem',
                  filter: 'drop-shadow(0 0 8px #D4AF37)',
                },
              }}
            >
              CollectMaster
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#F5F5DC',
                  borderColor: '#D4AF37',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                  },
                }}
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  '&:hover': {
                    bgcolor: '#e5c55a',
                  },
                }}
              >
                Cadastrar
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  // Header Público (para outras páginas quando não autenticado)
  if (!isAuthenticated) {
    return (
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: '#2F4F4F',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 2, justifyContent: 'space-between' }}>
            <Typography
              variant="h4"
              component={RouterLink}
              to="/dashboard"
              sx={{
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#F5F5DC',
                textDecoration: 'none',
                '&::before': {
                  content: '"🏆"',
                  fontSize: '2rem',
                  filter: 'drop-shadow(0 0 8px #D4AF37)',
                },
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              CollectMaster
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#F5F5DC',
                  borderColor: '#D4AF37',
                  '&:hover': {
                    borderColor: '#D4AF37',
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                  },
                }}
              >
                Entrar
              </Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{
                  bgcolor: '#D4AF37',
                  color: '#2F4F4F',
                  '&:hover': {
                    bgcolor: '#e5c55a',
                  },
                }}
              >
                Registrar
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }

  // Header Autenticado
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: '#2F4F4F',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo CollectMaster */}
          <Typography
            variant="h4"
            component={RouterLink}
            to="/dashboard"
            sx={{
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#F5F5DC',
              textDecoration: 'none',
              '&::before': {
                content: '"🏆"',
                fontSize: '2rem',
                filter: 'drop-shadow(0 0 8px #D4AF37)',
              },
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            CollectMaster
          </Typography>

          {/* Espaço vazio */}
          <Box sx={{ flex: 1 }} />

          {/* Botão Suas Coleções */}
          <Button
            variant="outlined"
            startIcon={<CollectionsIcon />}
            component={RouterLink}
            to="/dashboard"
            sx={{
              color: '#F5F5DC',
              borderColor: '#D4AF37',
              px: 2,
              py: 1,
              minWidth: 'auto',
              bgcolor: isDashboardPage ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              '&:hover': {
                borderColor: '#D4AF37',
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              },
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Suas coleções
          </Button>

          {/* Botão Social */}
          <Button
            variant="outlined"
            startIcon={<PeopleIcon />}
            component={RouterLink}
            to="/social"
            sx={{
              color: '#F5F5DC',
              borderColor: '#D4AF37',
              px: 2,
              py: 1,
              minWidth: 'auto',
              ml: 1,
              bgcolor: isSocialPage ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              '&:hover': {
                borderColor: '#D4AF37',
                bgcolor: isSocialPage ? 'rgba(212, 175, 55, 0.3)' : 'rgba(212, 175, 55, 0.1)',
              },
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            Social
          </Button>

          {/* Avatar do Usuário */}
          <Box
            component={RouterLink}
            to="/perfil"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              cursor: 'pointer',
              ml: 1,
              '&:hover': {
                opacity: 0.9,
              },
            }}
          >
            <Avatar
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                bgcolor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : '?'}
            </Avatar>
          </Box>

          {/* Botão de Logout */}
          <IconButton
            onClick={handleLogout}
            sx={{
              color: '#D4AF37',
              ml: 1,
              '&:hover': {
                bgcolor: 'rgba(212, 175, 55, 0.1)',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
