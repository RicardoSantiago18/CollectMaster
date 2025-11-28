import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import SocialUserCard from './SocialUserCard';
import { getAllUsers, searchUsers } from '../../../services/userService';

const SocialUserList = ({ searchQuery = '' }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce do searchQuery (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Buscar usuários
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let allUsers;
        
        if (debouncedSearchQuery.trim()) {
          // Buscar com filtro
          allUsers = await searchUsers(debouncedSearchQuery);
        } else {
          // Buscar todos
          allUsers = await getAllUsers();
        }
        
        setUsers(allUsers || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery]);

  // Filtrar usuários localmente (fallback simples)
  const filteredUsers = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return users;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const name = (user.name || '').toLowerCase();
      // REMOVIDO: Verificação por username
      return name.includes(query);
    });
  }, [users, debouncedSearchQuery]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>
          Carregando usuários...
        </Typography>
      </Box>
    );
  }

  if (filteredUsers.length === 0) {
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
          {debouncedSearchQuery.trim() ? 'Nenhum usuário encontrado' : 'Nenhum usuário encontrado'}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(245, 245, 220, 0.8)',
          }}
        >
          {debouncedSearchQuery.trim()
            ? `Não encontramos usuários com "${debouncedSearchQuery}".`
            : 'Não há outros usuários na plataforma ainda.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        },
        gap: '24px',
        width: '100%',
      }}
    >
      {filteredUsers.map((user) => (
        <SocialUserCard key={user.id} user={user} />
      ))}
    </Box>
  );
};

export default SocialUserList;