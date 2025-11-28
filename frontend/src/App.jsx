import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'; 
import Dashboard from './pages/Dashboard/Dashboard';
import Social from './pages/Social/Social';
import ProfilePage from './pages/Profile/ProfilePage';
import CollectionDetails from './pages/Collections/details/CollectionDetails';
import SocialUserCollectionsPage from './pages/Social/pages/SocialUserCollectionsPage';
import SocialUserCollectionDetailsPage from './pages/Social/pages/SocialUserCollectionDetailsPage';
import Header from './components/Header/Header';

// Configura o tema visual da aplicação com cores personalizadas
const theme = createTheme({
  palette: {
    primary: {
      main: '#2F4F4F', // Verde Escuro Profundo
      light: '#3d6b6b',
      dark: '#1f3535',
    },
    secondary: {
      main: '#D4AF37', // Amarelo Ouro/Dourado
      light: '#e5c55a',
      dark: '#b8941f',
    },
    background: {
      default: '#2F4F4F', // Verde Escuro Profundo
      paper: '#F5F5DC', // Creme Suave para cards
    },
    text: {
      primary: '#F5F5DC', // Creme Suave para texto principal
      secondary: 'rgba(245, 245, 220, 0.7)', // Creme com opacidade
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      color: '#F5F5DC',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      color: '#F5F5DC',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#F5F5DC',
    },
  },
  shape: {
    borderRadius: 12,
  },
})

// Componente principal da aplicação que configura o tema e define as rotas
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      {/* Define todas as rotas da aplicação */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/social" element={<Social />} />
        <Route path="/social/user/:id" element={<SocialUserCollectionsPage />} />
        <Route path="/social/user/:userId/collection/:collectionId" element={<SocialUserCollectionDetailsPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/collections/:id" element={<CollectionDetails />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App