import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

const SocialCollectionItemCard = ({ item, onViewDetails }) => {
  
  // 1. CORREÇÃO DE DADOS (Backend vs Frontend)
  const displayImage = item.image_url || item.image;
  const displayValue = item.estimated_value ?? item.estimatedValue ?? 0;

  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '420px',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F5F5DC',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        border: '1px solid rgba(212, 175, 55, 0.3)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
          borderColor: '#D4AF37',
        },
      }}
    >
      {/* Imagem do Item */}
      <Box
        sx={{
          width: '100%',
          height: 180,       
          minHeight: 180,    
          maxHeight: 180,    
          bgcolor: 'rgba(212, 175, 55, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0      
        }}
      >
        {displayImage ? (
          <CardMedia
            component="img"
            image={displayImage}
            alt={item.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4AF37',
            }}
          >
            <ImageIcon sx={{ fontSize: 60, mb: 1, opacity: 0.5 }} />
            <Typography variant="caption" sx={{ color: '#2F4F4F', opacity: 0.6 }}>
              Sem foto
            </Typography>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          flexGrow: 1,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflow: 'hidden'
        }}
      >
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          sx={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#2F4F4F',
            minHeight: '2.4rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.name}
        </Typography>

        {item.description && (
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.85rem',
              lineHeight: 1.4,
              color: 'rgba(47, 79, 79, 0.8)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1,
              minHeight: '2.4rem',
            }}
          >
            {item.description}
          </Typography>
        )}

        {/* Informações do Item */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            py: 1,
            mt: 'auto',
            borderTop: 1,
            borderBottom: 1,
            borderColor: 'rgba(47, 79, 79, 0.2)',
            gap: 1,
          }}
        >
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
              Quantidade
            </Typography>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontSize: '1rem',
                color: '#2F4F4F',
              }}
            >
              {item.quantity ?? 1}
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
              R${' '}
              {/* 2. USO DA VARIÁVEL NORMALIZADA */}
              {displayValue.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          gap: 1,
          bgcolor: 'rgba(47, 79, 79, 0.05)',
          flexShrink: 0
        }}
      >
        <Button
          startIcon={<ViewIcon />}
          variant="contained"
          size="small"
          fullWidth
          onClick={() => onViewDetails?.(item)}
          sx={{
            bgcolor: '#D4AF37',
            color: '#2F4F4F',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            '&:hover': {
              bgcolor: '#e5c55a',
            },
          }}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default SocialCollectionItemCard;