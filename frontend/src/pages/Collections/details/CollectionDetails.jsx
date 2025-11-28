import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import CollectionDetailsHeader from './CollectionDetailsHeader';
import CollectionItemsGrid from './CollectionItemsGrid';
import { useCollectionDetails } from '../../../hooks/useCollectionDetails';

// Componente da página de detalhes de uma coleção
// Exibe informações da coleção e permite gerenciar seus itens
const CollectionDetails = () => {
  const navigate = useNavigate();
  
  // Obtém todos os estados e funções do hook useCollectionDetails
  const {
    user,
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    editingItem, // Estado que indica qual item está sendo editado
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem,
    // Funções para editar e excluir itens
    handleEditItem,
    handleDeleteItem
  } = useCollectionDetails();


  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>Carregando...</Typography>
      </Box>
    );
  }

  if (!collection) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" sx={{ color: '#F5F5DC' }}>Coleção não encontrada</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* CONTEÚDO */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/dashboard')} sx={{ color: '#F5F5DC', mb: 3, '&:hover': { bgcolor: 'rgba(212, 175, 55, 0.1)' } }}>
          Voltar
        </Button>

        <CollectionDetailsHeader collection={collection} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#F5F5DC', mb: 1 }}>
              Itens da Coleção
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
              {items.length} {items.length === 1 ? 'item encontrado' : 'itens encontrados'}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenItemModal}
            sx={{ bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', px: 3, '&:hover': { bgcolor: '#e5c55a', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}
          >
            Adicionar Item
          </Button>
        </Box>

        {/* AQUI ESTÁ A MÁGICA: Passamos as funções reais para o Grid */}
        <CollectionItemsGrid
          items={items}
          onEdit={handleEditItem}     // <--- Conectado!
          onDelete={handleDeleteItem} // <--- Conectado!
        />
      </Container>

      {/* MODAL */}
      <Dialog 
        open={openItemModal} 
        onClose={handleCloseItemModal}
        PaperProps={{ sx: { bgcolor: '#F5F5DC', borderRadius: 3 } }}
        maxWidth="sm"
        fullWidth
      >
        {/* Título Dinâmico: "Novo Item" ou "Editar Item" */}
        <DialogTitle sx={{ color: '#2F4F4F', fontWeight: 'bold', textAlign: 'center', pt: 3, fontSize: '1.5rem' }}>
          {editingItem ? 'Editar Item' : 'Novo Item'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
            <TextField
              label="Nome do Item"
              name="name"
              value={newItemData.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              sx={inputStyles}
            />

            <TextField
              label="URL da Imagem (opcional)"
              name="imageUrl"
              value={newItemData.imageUrl}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              placeholder="https://exemplo.com/foto.jpg"
              InputProps={{
                startAdornment: <LinkIcon sx={{ color: '#2F4F4F', mr: 1, opacity: 0.7 }} />,
              }}
              sx={inputStyles}
            />
            
            <TextField
              label="Descrição"
              name="description"
              value={newItemData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              sx={inputStyles}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Quantidade"
                  name="quantity"
                  type="number"
                  value={newItemData.quantity}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Valor Estimado (R$)"
                  name="estimatedValue"
                  type="number"
                  value={newItemData.estimatedValue}
                  onChange={handleInputChange}
                  fullWidth
                  variant="outlined"
                  sx={inputStyles}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleCloseItemModal} 
            variant="outlined"
            sx={{ color: '#2F4F4F', borderColor: '#2F4F4F', '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' } }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmitItem} 
            variant="contained"
            disabled={!newItemData.name}
            sx={{ 
              bgcolor: '#D4AF37', color: '#2F4F4F', fontWeight: 'bold', 
              '&:hover': { bgcolor: '#e5c55a' },
              '&.Mui-disabled': { bgcolor: 'rgba(212, 175, 55, 0.3)' }
            }}
          >
            {editingItem ? 'Atualizar' : 'Salvar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const inputStyles = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#ffffff',
    '& fieldset': { borderColor: '#2F4F4F' },
    '&:hover fieldset': { borderColor: '#D4AF37' },
    '&.Mui-focused fieldset': { borderColor: '#D4AF37' },
  },
  '& .MuiOutlinedInput-input': {
    color: '#1a1a1a',
  },
  '& .MuiInputLabel-root': { color: '#2F4F4F' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#D4AF37' },
};

export default CollectionDetails;

