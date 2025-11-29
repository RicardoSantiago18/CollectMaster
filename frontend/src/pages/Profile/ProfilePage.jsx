/**
 * FRM-EDITARPERFIL - Formulário/Tela de Edição de Perfil
 * Conforme diagrama SD03 - EDITAR PERFIL
 * 
 * Este componente representa a interface de edição de perfil (FRM-EDITARPERFIL).
 * Permite ao colecionador alterar nome, email ou bio e salvar as alterações.
 */
import React, { useState, useEffect } from 'react';
import {
  Typography, Avatar, Box,
  Card, Button, TextField,
  Divider, Chip, Alert, Snackbar
} from '@mui/material';
import { 
  Edit as EditIcon,
} from '@mui/icons-material';
import { useDashboard } from '../../hooks/useDashboard';
import { updateUser } from '../../services/userService';

const ProfilePage = () => {
  const { user, collections } = useDashboard();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });
  
  const [feedback, setFeedback] = useState({ open: false, message: '', type: 'success' });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  /**
   * Método que corresponde a "Altera nome, email ou bio()" do diagrama SD03.
   * Passo 1: Colecionador altera os campos do perfil na interface.
   * 
   * @param {string} field - Campo a ser alterado (name, email, bio)
   * @returns {Function} Função que atualiza o campo no estado
   */
  const alteraNomeEmailOuBio = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  /**
   * Método que corresponde a "clica em Salvar Alterações()" do diagrama SD03.
   * Passo 2: Colecionador dispara a ação de salvar.
   * 
   * Passo 2.1: Chama updateUser(id, dados)
   * Passo 5.1: Atualiza estado local
   * Passo 5.1.1: atualizaLocalStorage(user)
   * Passo 5.1.1.1: Exibe "Perfil Atualizado!!"
   */
  const clicaEmSalvarAlteracoes = async () => {
    if (!user) return;

    // Passo 2.1: FRM-EDITARPERFIL → C-EDITARPERFIL: updateUser(id, dados)
    const result = await updateUser(user.id, {
      name: formData.name,
      email: formData.email,
      bio: formData.bio
    });

    if (result.success) {
      // Passo 5.1: Atualiza estado local
      setFormData({
        name: result.data.name || '',
        email: result.data.email || '',
        bio: result.data.bio || ''
      });
      
      // Passo 5.1.1: atualizaLocalStorage(user)
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const newUser = { ...currentUser, ...result.data };
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Passo 5.1.1.1: Exibe "Perfil Atualizado!!"
      setFeedback({ open: true, message: 'Perfil Atualizado!!', type: 'success' });
    } else {
      // Exibe erro se houver falha
      setFeedback({ open: true, message: result.error || 'Erro ao atualizar perfil.', type: 'error' });
    }
  };

  // Mantém handleInputChange para compatibilidade
  const handleInputChange = alteraNomeEmailOuBio;
  
  // Mantém handleSave para compatibilidade
  const handleSave = clicaEmSalvarAlteracoes;

  const handleCloseFeedback = () => setFeedback({ ...feedback, open: false });

  const totalItems = collections.reduce((sum, col) => sum + (col.itemCount || 0), 0);
  const mostRecentCollection = collections.length > 0 ? collections[collections.length - 1] : null;
  const accountCreationDate = user?.createdAt || new Date().toLocaleDateString('pt-BR');

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      <Box
        sx={{
          maxWidth: '1200px',
          margin: '0 auto',
          px: 4,
          py: 5,
        }}
      >
        <Snackbar open={feedback.open} autoHideDuration={4000} onClose={handleCloseFeedback} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseFeedback} severity={feedback.type} sx={{ width: '100%' }}>
            {feedback.message}
          </Alert>
        </Snackbar>

        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#F5F5DC', mb: 1 }}>
            Meu Perfil
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
            Gerencie suas informações pessoais e preferências
          </Typography>
        </Box>

        {/* GRID ALTERADO: Agora com 2 colunas (repeat(2, 1fr)) */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', width: '100%' }}>
          
          {/* Card 1: Informações Pessoais */}
          <Card sx={{ bgcolor: '#2F4F4F', border: '2px solid #D4AF37', borderRadius: 2, p: 3, height: '100%', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
              Informações Pessoais
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', fontSize: '2rem', mb: 1.5, border: '2px solid #D4AF37', boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)' }}>
                {user?.name ? user.name[0].toUpperCase() : '?'}
              </Avatar>
              <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 0.5, fontWeight: 'bold', textAlign: 'left' }}>
                {formData.name || user?.name || 'Usuário'}
              </Typography>
              <Chip label="Colecionador" sx={{ bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', fontSize: '0.7rem', mb: 1.5 }} size="small" />
            </Box>

            <Divider sx={{ borderColor: '#D4AF37', mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  label="Nome completo"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={inputStyles}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={inputStyles}
                />
                <TextField
                  label="Bio"
                  value={formData.bio}
                  onChange={handleInputChange('bio')}
                  multiline
                  rows={4} // Aumentei um pouco as linhas já que temos mais espaço vertical
                  inputProps={{ maxLength: 120 }}
                  helperText={`${formData.bio.length}/120 caracteres`}
                  fullWidth
                  size="small"
                  variant="outlined"
                  sx={{
                    ...inputStyles,
                    '& .MuiFormHelperText-root': { color: 'rgba(245, 245, 220, 0.6)', fontSize: '0.7rem' },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  fullWidth
                  onClick={handleSave}
                  sx={{
                    bgcolor: '#D4AF37',
                    color: '#2F4F4F',
                    fontWeight: 'bold',
                    mt: 0.5,
                    py: 1,
                    '&:hover': { bgcolor: '#e5c55a', transform: 'translateY(-2px)', boxShadow: 4 },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Salvar Alterações
                </Button>
              </Box>
            </Card>

          {/* Card 2: Estatísticas */}
          <Card sx={{ bgcolor: '#2F4F4F', border: '2px solid #D4AF37', borderRadius: 2, p: 3, height: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" sx={{ color: '#F5F5DC', mb: 2, fontWeight: 'bold', textAlign: 'left' }}>
              Estatísticas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flexGrow: 1, justifyContent: 'center' }}>
                <Box>
                  <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
                    {collections.length}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                    Coleções Totais
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37', opacity: 0.3 }} />
                <Box>
                  <Typography variant="h3" sx={{ color: '#D4AF37', fontWeight: 'bold', mb: 0.5 }}>
                    {totalItems}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                    Itens Catalogados
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37', opacity: 0.3 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.6)', mb: 0.5 }}>
                    Sua coleção mais recente
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#F5F5DC', fontWeight: 500 }}>
                    {mostRecentCollection?.name || 'Nenhuma coleção ainda'}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D4AF37', opacity: 0.3 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.6)', mb: 0.5 }}>
                    Membro desde
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#F5F5DC', fontWeight: 500 }}>
                    {accountCreationDate}
                  </Typography>
                </Box>
              </Box>
            </Card>

            {/* Card 3 (Atividade Recente) foi REMOVIDO */}
        </Box>
      </Box>
    </Box>
  );
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#F5F5DC',
    '& fieldset': { borderColor: '#D4AF37' },
    '&:hover fieldset': { borderColor: '#e5c55a' },
    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
  },
  '& .MuiOutlinedInput-input': {
    color: '#1a1a1a',
    fontWeight: 500,
    padding: '12.5px 14px',
  },
  '& .MuiInputLabel-root': { color: '#D4AF37' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#D4AF37' },
};

export default ProfilePage;