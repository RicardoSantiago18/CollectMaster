import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Container,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import CollectionCard from '../../components/CollectionCard/CollectionCard'

// Componente que exibe e gerencia a lista de coleções
// Permite criar novas coleções através de um diálogo
function Collections({ collections, setCollections }) {

  const [openDialog, setOpenDialog] = useState(false)
  // Estado que armazena os dados da nova coleção sendo criada
  const [newCollection, setNewCollection] = useState({
    name: '',
    category: '',
    description: '',
    value: 0
  })

  // Lista de categorias disponíveis para as coleções
  const categories = [
    'Brinquedos',
    'Numismática',
    'Música',
    'Arte',
    'Livros',
    'Selos',
    'Cartões',
    'Outros'
  ]

  // Adiciona uma nova coleção à lista e fecha o diálogo
  const handleAddCollection = () => {
    const collection = {
      id: collections.length + 1,
      ...newCollection,
      itemCount: 0,
      image: `https://via.placeholder.com/300x200/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${encodeURIComponent(newCollection.name)}`,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setCollections([...collections, collection])
    setOpenDialog(false)
    setNewCollection({ name: '', category: '', description: '', value: 0 })
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#2F4F4F',
      py: 4,
    }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 6,
        }}>
          <Box>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                color: '#F5F5DC',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              📚 Coleções
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(245, 245, 220, 0.8)',
              }}
            >
              Gerencie todas as suas coleções
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
            size="large"
            sx={{
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: '#e5c55a',
                transform: 'translateY(-2px)',
                boxShadow: 4,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Nova Coleção
          </Button>
        </Box>

        {/* Collections Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </Box>
      </Container>

      {/* Add Collection Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#F5F5DC',
          }
        }}
      >
        <DialogTitle sx={{ color: '#2F4F4F', fontWeight: 'bold' }}>
          Adicionar Nova Coleção
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2.5} mt={1}>
            <TextField
              label="Nome da Coleção"
              value={newCollection.name}
              onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#2F4F4F',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D4AF37',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#2F4F4F',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4AF37',
                },
              }}
            />
            <TextField
              select
              label="Categoria"
              value={newCollection.category}
              onChange={(e) => setNewCollection({ ...newCollection, category: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#2F4F4F',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D4AF37',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#2F4F4F',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4AF37',
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Descrição"
              value={newCollection.description}
              onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#2F4F4F',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D4AF37',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#2F4F4F',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4AF37',
                },
              }}
            />
            <TextField
              label="Valor Inicial"
              type="number"
              value={newCollection.value}
              onChange={(e) => setNewCollection({ ...newCollection, value: parseFloat(e.target.value) || 0 })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#2F4F4F',
                  },
                  '&:hover fieldset': {
                    borderColor: '#D4AF37',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#D4AF37',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#2F4F4F',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#D4AF37',
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{
              color: '#2F4F4F',
              '&:hover': {
                bgcolor: 'rgba(47, 79, 79, 0.1)',
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleAddCollection} 
            variant="contained"
            disabled={!newCollection.name || !newCollection.category}
            sx={{
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#e5c55a',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(212, 175, 55, 0.3)',
                color: 'rgba(47, 79, 79, 0.5)',
              }
            }}
          >
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Collections