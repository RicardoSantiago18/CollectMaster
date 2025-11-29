import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Avatar
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { carregarDadosPerfil } from '../../../services/userService';
import SocialCollectionCard from '../components/SocialCollectionCard';

/**
 * FRM-VISUOUTRO - Interface de Visualização de Outro Colecionador
 * Conforme diagrama SD07 - VISUALIZAR COLEÇÕES DE OUTROS COLECIONADORES
 * 
 * Este componente representa a interface de visualização de outro colecionador (FRM-VISUOUTRO).
 * Permite ao colecionador visualizar o perfil e as coleções de outro usuário.
 */
const SocialUserCollectionsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  /**
   * Método selecionarPerfil() conforme diagrama SD07.
   * Passo 1: Colecionador seleciona o perfil de outro usuário.
   * 
   * @param {number} id_outro - ID do colecionador alvo
   * @returns {Promise<void>}
   */
  const selecionarPerfil = async (id_outro) => {
    if (!id_outro) return;

    try {
      // Passo 1.1: FRM-VISUOUTRO → VISUOUTRO: carregarDadosPerfil(id_outro)
      const dadosCompletos = await carregarDadosPerfil(id_outro);
      
      if (dadosCompletos) {
        // Passo 5: VISUOUTRO retorna dados completos (perfil + coleções)
        // Passo 6: FRM-VISUOUTRO atualiza a interface
        setViewingUser(dadosCompletos.perfil);
        setCollections(dadosCompletos.colecoes || []);
      } else {
        navigate('/social');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      navigate('/social');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      selecionarPerfil(parseInt(id));
    }
  }, [id, navigate]);


  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (!viewingUser) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Usuário não encontrado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        {/* Botão Voltar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/social')}
          sx={{
            color: '#F5F5DC',
            mb: 3,
            '&:hover': {
              bgcolor: 'rgba(212, 175, 55, 0.1)',
            },
          }}
        >
          Voltar
        </Button>

        {/* Header do Usuário */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            mb: 4,
            p: 3,
            bgcolor: '#F5F5DC',
            borderRadius: 2,
            border: '2px solid #D4AF37',
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              fontSize: '2.5rem',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
            }}
          >
            {viewingUser?.name ? viewingUser.name[0].toUpperCase() : '?'}
          </Avatar>
          <Box>
            <Typography
              variant="h3"
              sx={{
                color: '#2F4F4F',
                fontWeight: 'bold',
              }}
            >
              {viewingUser?.name || 'Usuário'}
            </Typography>
          </Box>
        </Box>

        {/* Título das Coleções */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#F5F5DC',
              mb: 1,
            }}
          >
            Coleções Públicas
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245, 245, 220, 0.8)',
            }}
          >
            {collections.length} {collections.length === 1 ? 'coleção pública' : 'coleções públicas'}
          </Typography>
        </Box>

        {/* Grid de Coleções */}
        {collections.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
              borderRadius: 3,
              border: '2px dashed #D4AF37',
              bgcolor: 'rgba(255, 251, 217, 0.1)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: '#F5F5DC',
                fontWeight: 'bold',
                mb: 1,
              }}
              gutterBottom
            >
              Nenhuma coleção pública
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(245, 245, 220, 0.8)',
              }}
            >
              Este usuário ainda não possui coleções públicas.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {collections.map((collection) => (
              <SocialCollectionCard key={collection.id} collection={collection} userId={id} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SocialUserCollectionsPage;

