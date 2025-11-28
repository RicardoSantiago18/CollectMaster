import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Card,
  CardMedia,
  Grid,
} from '@mui/material';
import { Collections as CollectionsIcon } from '@mui/icons-material';

const CollectionDetailsHeader = ({ collection }) => {
  return (
    <Card
      sx={{
        bgcolor: '#F5F5DC',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 4,
        border: '1px solid #D4AF37',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Grid container>
        {/* Imagem da Coleção */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              width: '100%',
              height: { xs: 250, md: 300 },
              bgcolor: 'rgba(212, 175, 55, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            {collection.image ? (
              <CardMedia
                component="img"
                image={collection.image}
                alt={collection.name}
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
                <CollectionsIcon sx={{ fontSize: 80, mb: 2, opacity: 0.7 }} />
                <Typography variant="body2" sx={{ color: '#2F4F4F', opacity: 0.6 }}>
                  Sem foto
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Informações da Coleção */}
        <Grid item xs={12} md={8}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#2F4F4F',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
              }}
            >
              {collection.name}
            </Typography>

            {collection.category && (
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={collection.category}
                  variant="outlined"
                  sx={{
                    borderColor: '#D4AF37',
                    color: '#2F4F4F',
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    height: 36,
                  }}
                />
              </Box>
            )}

            {collection.description && (
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(47, 79, 79, 0.8)',
                  mb: 3,
                  lineHeight: 1.7,
                  fontSize: '1rem',
                }}
              >
                {collection.description}
              </Typography>
            )}

            {/* Estatísticas */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    bgcolor: 'rgba(47, 79, 79, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      color: '#2F4F4F',
                      fontSize: { xs: '1.5rem', sm: '2rem' },
                      mb: 0.5,
                    }}
                  >
                    {collection.itemCount ?? 0}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(47, 79, 79, 0.7)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    Itens
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    bgcolor: 'rgba(212, 175, 55, 0.1)',
                    borderRadius: 2,
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                  }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{
                      color: '#D4AF37',
                      fontSize: { xs: '1.2rem', sm: '1.5rem' },
                      mb: 0.5,
                    }}
                  >
                    R${' '}
                    {collection.value && collection.value > 0
                      ? collection.value.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      : '0,00'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(47, 79, 79, 0.7)',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    Valor Total
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CollectionDetailsHeader;

