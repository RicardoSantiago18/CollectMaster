import React from 'react';
import { Box, Typography } from '@mui/material';
import SocialCollectionItemCard from './SocialCollectionItemCard';

const SocialCollectionItemsGrid = ({ items, onViewDetails }) => {
  if (items.length === 0) {
    return (
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
          Nenhum item ainda
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(245, 245, 220, 0.8)',
          }}
        >
          Esta coleção ainda não possui itens.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        },
        gap: '24px',
        width: '100%',
      }}
    >
      {items.map((item) => (
        <Box key={item.id} sx={{ display: 'flex' }}>
          <SocialCollectionItemCard item={item} onViewDetails={onViewDetails} />
        </Box>
      ))}
    </Box>
  );
};

export default SocialCollectionItemsGrid;

