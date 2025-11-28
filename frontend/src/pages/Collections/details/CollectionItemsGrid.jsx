import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import CollectionItemCard from './CollectionItemCard';

const CollectionItemsGrid = ({
  items,
  onEdit,
  onDelete,
}) => {
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
          Adicione itens para começar a organizar sua coleção!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        '& > .MuiGrid-item': {
          display: 'flex',
        },
      }}
    >
      {items.map((item) => (
        <Grid item xs={12} sm={6} lg={4} key={item.id}>
          <CollectionItemCard
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CollectionItemsGrid;

