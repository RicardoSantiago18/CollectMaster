import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
} from '@mui/material';
import {
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SocialCollectionCard({ collection, userId }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/social/user/${userId}/collection/${collection.id}`);
  };

  const displayImage = collection.image_url || collection.image || `https://via.placeholder.com/300x200/2F4F4F/F5F5DC?text=Sem+Foto`;

  return (
    <Card sx={{ 
      width: '100%',
      height: '480px',
      minHeight: '480px',
      maxHeight: '480px',
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#F5F5DC',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
        borderColor: '#D4AF37',
      }
    }}>
      <CardMedia
        component="img"
        image={displayImage}
        alt={collection.name}
        sx={{ 
          height: 180,
          minHeight: 180,
          maxHeight: 180,
          objectFit: 'cover',
          flexShrink: 0
        }}
      />
      
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 2, // REDUZIDO de 2.5 para 2
        display: 'flex',
        flexDirection: 'column',
        gap: 1, // REDUZIDO de 1.5 para 1
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontSize: '1.2rem', // Leve ajuste
            lineHeight: 1.3,
            fontWeight: 'bold',
            color: '#2F4F4F',
            minHeight: '2.4rem', // REDUZIDO de 3rem
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {collection.name}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Chip 
            label={collection.category || 'Sem Categoria'} 
            variant="outlined"
            size="small" // Mudado para small para economizar espaço
            sx={{ 
              fontSize: '0.75rem',
              height: 24, // Altura fixa menor
              borderColor: '#D4AF37',
              color: collection.category ? '#2F4F4F' : 'rgba(47, 79, 79, 0.6)',
              bgcolor: collection.category ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
            }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.85rem',
            lineHeight: 1.4,
            flexGrow: 1,
            color: 'rgba(47, 79, 79, 0.8)',
            minHeight: '2.4rem', // REDUZIDO de 2.7rem
          }}
        >
          {collection.description || 'Sem descrição'}
        </Typography>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          py: 1, // REDUZIDO de 1.5
          mt: 'auto',
          borderTop: 1, 
          borderBottom: 1, 
          borderColor: 'rgba(47, 79, 79, 0.2)',
          gap: 1
        }}>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              display="block"
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(47, 79, 79, 0.7)',
                mb: 0.2, // Espaçamento menor
              }}
            >
              Itens
            </Typography>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                fontSize: '1rem', // Leve ajuste
                color: '#2F4F4F',
              }}
            >
              {collection.itemCount ?? 0}
            </Typography>
          </Box>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography 
              variant="caption" 
              display="block"
              sx={{ 
                fontSize: '0.75rem',
                color: 'rgba(47, 79, 79, 0.7)',
                mb: 0.2,
              }}
            >
              Valor
            </Typography>
            <Typography 
              variant="h6" 
              fontWeight="bold" 
              sx={{ 
                fontSize: '1rem',
                color: '#D4AF37',
              }}
            >
              {collection.value && collection.value > 0 
                ? `R$ ${collection.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'R$ 0,00'
              }
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ 
        p: 2,
        gap: 1,
        bgcolor: 'rgba(47, 79, 79, 0.05)',
        flexShrink: 0
      }}>
        <Button 
          startIcon={<ViewIcon />} 
          variant="contained" 
          size="small"
          fullWidth
          onClick={handleViewDetails}
          sx={{ 
            bgcolor: '#D4AF37',
            color: '#2F4F4F',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            '&:hover': {
              bgcolor: '#e5c55a',
            }
          }}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
}

export default SocialCollectionCard;