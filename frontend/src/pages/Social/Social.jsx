import React, { useState } from 'react';
import {
  Typography, Box, Container,
  TextField, InputAdornment,
} from '@mui/material';
import { 
  Search as SearchIcon, 
} from '@mui/icons-material';
import SocialUserList from './components/SocialUserList';

const Social = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Conteúdo Principal */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold',
              color: '#F5F5DC',
              mb: 1
            }}
          >
            Social
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'rgba(245, 245, 220, 0.8)',
              mb: 3 
            }}
          >
            Conecte-se com outros colecionadores e descubra novas coleções
          </Typography>

          {/* Campo de Busca (Mobile e Desktop) */}
          <TextField
            fullWidth
            placeholder="Buscar usuários por nome..."
            variant="outlined"
            size="medium"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                color: '#F5F5DC',
                bgcolor: 'rgba(245, 245, 220, 0.1)',
                '& fieldset': {
                  borderColor: '#D4AF37',
                },
                '&:hover fieldset': {
                  borderColor: '#e5c55a',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D4AF37',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(245, 245, 220, 0.7)',
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(245, 245, 220, 0.5)',
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#D4AF37' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Lista de Usuários */}
        <SocialUserList searchQuery={searchQuery} />
      </Container>
    </Box>
  );
};

export default Social;

