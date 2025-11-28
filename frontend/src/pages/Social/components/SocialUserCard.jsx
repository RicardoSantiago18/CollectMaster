import React from 'react';
import { Card, CardContent, Avatar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SocialUserCard = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/social/user/${user.id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        bgcolor: '#2F4F4F',
        border: '2px solid #D4AF37',
        borderRadius: 2,
        p: 3,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
          borderColor: '#e5c55a',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', width: '100%' }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: '#D4AF37',
            color: '#2F4F4F',
            fontWeight: 'bold',
            fontSize: '2rem',
            mb: 2,
            mx: 'auto',
            border: '2px solid #D4AF37',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
          }}
        >
          {user?.name ? user.name[0].toUpperCase() : '?'}
        </Avatar>
        <Typography
          variant="h6"
          sx={{
            color: '#F5F5DC',
            fontWeight: 'bold',
          }}
        >
          {user?.name || 'Usuário'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SocialUserCard;

