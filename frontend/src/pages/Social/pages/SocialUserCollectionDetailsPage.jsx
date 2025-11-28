import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { getUserById } from '../../../services/userService';
import { getCollections, getCollectionItems } from '../../../services/collectionService';
import CollectionDetailsHeader from '../../Collections/details/CollectionDetailsHeader';
import SocialCollectionItemsGrid from '../components/SocialCollectionItemsGrid';

const SocialUserCollectionDetailsPage = () => {
  const { userId, collectionId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !collectionId) return;

      try {
        // Buscar dados do usuário
        const fetchedUser = await getUserById(userId);
        if (!fetchedUser) {
          navigate('/social');
          return;
        }
        setViewingUser(fetchedUser);

        // Buscar coleções do usuário
        const userCollections = await getCollections(userId);
        const foundCollection = userCollections.find(
          (c) => c.id === parseInt(collectionId) || c.id === collectionId
        );

        if (foundCollection) {
          setCollection(foundCollection);
          // Buscar itens (os serviços já retornam mocks se USE_MOCKS = true)
          const itemsData = await getCollectionItems(collectionId);
          setItems(itemsData || []);
        } else {
          navigate(`/social/user/${userId}`);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        navigate(`/social/user/${userId}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId && collectionId) {
      fetchData();
    }
  }, [userId, collectionId, navigate]);


  const handleViewItemDetails = (item) => {
    // TODO: Implementar visualização de detalhes do item
    console.log('Ver detalhes do item:', item);
  };

  const handleEditItem = (item) => {
    // Não permitir edição em coleções de outros usuários
    console.log('Edição não permitida em coleções de outros usuários');
  };

  const handleDeleteItem = (item) => {
    // Não permitir exclusão em coleções de outros usuários
    console.log('Exclusão não permitida em coleções de outros usuários');
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (!collection || !viewingUser) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Coleção não encontrada
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Conteúdo Principal */}
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '0 auto',
          px: { xs: 2, sm: 3, md: 4 },
          py: 5,
        }}
      >
        {/* Botão Voltar */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(`/social/user/${userId}`)}
          sx={{
            color: '#F5F5DC',
            mb: 3,
            '&:hover': {
              bgcolor: 'rgba(212, 175, 55, 0.1)',
            },
          }}
        >
          Voltar para {viewingUser?.name || 'Usuário'}
        </Button>

        {/* Header da Coleção */}
        <CollectionDetailsHeader collection={collection} items={items} />

        {/* Título da Seção de Itens */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
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
            Itens da Coleção
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(245, 245, 220, 0.8)',
            }}
          >
            {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
          </Typography>
        </Box>

        {/* Grid de Itens */}
        <SocialCollectionItemsGrid
          items={items}
          onViewDetails={handleViewItemDetails}
        />
      </Box>
    </Box>
  );
};

export default SocialUserCollectionDetailsPage;

