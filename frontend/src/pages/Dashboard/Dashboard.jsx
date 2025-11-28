import React from 'react';
import {
  Box, Container,
  Card, CardActionArea, CardContent, CardActions, CardMedia, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Button, FormControlLabel, Checkbox, Slide, Grid, Typography
} from '@mui/material';
import { 
  Add as AddIcon, PhotoCamera,
} from '@mui/icons-material';

import { Link as LinkIcon } from '@mui/icons-material';

import { useDashboard } from '../../hooks/useDashboard';
import CollectionCard from '../../components/CollectionCard/CollectionCard';

// Componente de transição para o modal (animação de slide para cima)
const ModalTransition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Componente visual do Dashboard que exibe as coleções do usuário
// Recebe todas as props do hook useDashboard
const DashboardView = ({
  user, collections,
  openCreateModal, formData, editingCollection, 
  handleOpenCreateModal, handleCloseCreateModal, handleSubmitCollection, 
  handleInputChange, handleEditCollection,
  handleDeleteCollection
}) => {
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: '#ffffff',
      '& fieldset': { borderColor: '#2F4F4F' },
      '&:hover fieldset': { borderColor: '#D4AF37' },
      '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
    },
    '& .MuiOutlinedInput-input': {
      color: '#000000',
      '&:-webkit-autofill': {
        WebkitTextFillColor: '#000000',
        WebkitBoxShadow: '0 0 0 1000px #ffffff inset',
      },
      '&:-webkit-autofill:focus': {
        WebkitTextFillColor: '#000000',
        WebkitBoxShadow: '0 0 0 1000px #ffffff inset',
      },
    },
    '& .MuiInputLabel-root': { color: '#2F4F4F' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#D4AF37' },
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#F5F5DC', fontWeight: 'bold' }}>
          Suas Coleções
        </Typography>

        {/* Grid de Coleções */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 3 }}>
          
          {/* Card de CRIAR NOVA */}
          <Card sx={{ 
              border: '2px dashed #D4AF37', bgcolor: 'transparent', 
              minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
            <CardActionArea onClick={handleOpenCreateModal} sx={{ height: '100%', textAlign: 'center' }}>
              <AddIcon sx={{ fontSize: 60, color: '#D4AF37' }} />
              <Typography variant="h6" sx={{ color: '#F5F5DC', mt: 2 }}>
                Criar Coleção
              </Typography>
            </CardActionArea>
          </Card>

          {/* Lista de Coleções Existentes */}
          {collections.map((collection) => (
              <CollectionCard 
                key={collection.id} 
                collection={collection}
                onEdit={handleEditCollection} // <--- CONECTADO!
                onDelete={handleDeleteCollection}
              />
            ))}
        </Box>
      </Container>

      {/* --- O MODAL --- */}
<Dialog
        open={openCreateModal}
        onClose={handleCloseCreateModal}
        TransitionComponent={ModalTransition}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, bgcolor: '#F5F5DC' } }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: '#2F4F4F', pt: 3 }}>
          {editingCollection ? 'Editar Coleção' : 'Nova Coleção'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1, px: 1 }}>
            {/* Nome */}
            <TextField
              label="Nome da Coleção"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
              variant="outlined"
              sx={inputStyles}
            />

            {/* Descrição */}
            <TextField
              label="Descrição"
              name="description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
              sx={inputStyles}
            />
            
            {/* URL da Imagem (Substituindo o botão de arquivo antigo) */}
            <TextField
              label="URL da Imagem (opcional)"
              name="imageUrl"
              fullWidth
              value={formData.imageUrl}
              onChange={handleInputChange}
              variant="outlined"
              placeholder="https://exemplo.com/minha-foto.jpg"
              InputProps={{
                startAdornment: <LinkIcon sx={{ color: '#2F4F4F', mr: 1, opacity: 0.7 }} />,
              }}
              sx={inputStyles}
            />

            {/* Checkbox Pública */}
            <FormControlLabel
              control={
                <Checkbox 
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  name="isPublic"
                  sx={{ color: '#2F4F4F', '&.Mui-checked': { color: '#D4AF37' } }}
                />
              }
              label={<Typography sx={{ color: '#2F4F4F' }}>Coleção Pública</Typography>}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button onClick={handleCloseCreateModal} variant="outlined" sx={{ color: '#2F4F4F', borderColor: '#2F4F4F' }}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitCollection} 
            variant="contained" 
            disabled={!formData.name}
            sx={{ bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', '&:hover': { bgcolor: '#e5c55a' } }}
          >
            {editingCollection ? 'Salvar Alterações' : 'Criar Coleção'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Componente principal do Dashboard que conecta a lógica com a visualização
const Dashboard = () => {
  const logic = useDashboard();
  return <DashboardView {...logic} />;
};

export default Dashboard;
