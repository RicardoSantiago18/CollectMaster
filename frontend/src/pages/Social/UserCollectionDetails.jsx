import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useSocialCollectionDetails } from '../../hooks/useSocialCollectionDetails';
import CollectionDetailsHeader from '../Collections/details/CollectionDetailsHeader';
import CollectionItemsGrid from '../Collections/details/CollectionItemsGrid';

const UserCollectionDetails = () => {
  const { userId, collectionId } = useParams();
  const navigate = useNavigate();
  const { viewingUser, collection, items, loading } = useSocialCollectionDetails(userId, collectionId);

  const handleViewItemDetails = (item) => {
    // TODO: Implementar visualização de detalhes do item
    console.log('Ver detalhes do item:', item);
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
        <CollectionItemsGrid
          items={items}
          readOnly={true}
          onViewDetails={handleViewItemDetails}
        />
      </Box>
    </Box>
  );
};

export default UserCollectionDetails;

