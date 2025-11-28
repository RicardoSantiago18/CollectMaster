import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  CardActions,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

// Componente que exibe um card de coleção
// Mostra informações da coleção e permite visualizar, editar ou excluir
function CollectionCard({ collection, onEdit, onDelete }) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  // Navega para a página de detalhes da coleção
  const handleViewDetails = () => {
    navigate(`/collections/${collection.id}`)
  }

  const displayImage = collection.image_url || collection.image || `https://via.placeholder.com/300x200/2F4F4F/F5F5DC?text=${encodeURIComponent(collection.name)}`;

  return (
    <Card sx={{ 
      width: '100%',
      height: '480px',      // Altura fixa do cartão
      minHeight: '480px',
      maxHeight: '480px',
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: '#F5F5DC',
      borderRadius: 2,
      transition: 'all 0.3s ease',
      border: '1px solid rgba(212, 175, 55, 0.3)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      boxSizing: 'border-box',
      overflow: 'hidden', // Garante que nada vaze do card
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 24px rgba(212, 175, 55, 0.3)',
        borderColor: '#D4AF37',
      }
    }}>
      <CardMedia
        component="img"
        image={displayImage}
        alt={collection.name}
        sx={{ 
          height: 180,       // FIXO: Altura exata
          minHeight: 180,    // FIXO: Não diminui
          maxHeight: 180,    // FIXO: Não aumenta
          objectFit: 'cover',
          flexShrink: 0      // FIXO: Não deixa o flexbox esmagar a imagem
        }}
      />
      
      <CardContent sx={{ 
        flexGrow: 1, 
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        textAlign: 'center',
        overflow: 'hidden' // Importante para o texto não empurrar layout
      }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontSize: '1.2rem',
            lineHeight: 1.2,
            fontWeight: 'bold',
            color: '#2F4F4F',
            // Limita a 2 linhas para não ocupar muito espaço
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.4rem', // Reserva espaço para 2 linhas
          }}
        >
          {collection.name}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
          <Chip 
            label={collection.category || (collection.is_public ? 'Pública' : 'Privada')} 
            variant="outlined"
            size="small"
            sx={{ 
              fontSize: '0.75rem',
              height: 24,
              borderColor: '#D4AF37',
              color: '#2F4F4F',
              bgcolor: 'rgba(212, 175, 55, 0.1)',
            }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limita descrição a 2 linhas
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: '0.85rem',
            lineHeight: 1.4,
            flexGrow: 1,
            color: 'rgba(47, 79, 79, 0.8)',
          }}
        >
          {collection.description || 'Sem descrição'}
        </Typography>

        {/* Stats */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          pt: 1.5,
          mt: 'auto', // Empurra para o fundo do CardContent
          borderTop: 1, 
          borderColor: 'rgba(47, 79, 79, 0.2)',
          gap: 1
        }}>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography variant="caption" display="block" sx={{ fontSize: '0.7rem', color: 'rgba(47, 79, 79, 0.7)' }}>
              Itens
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem', color: '#2F4F4F' }}>
              {collection.itemCount ?? 0}
            </Typography>
          </Box>
          <Box textAlign="center" sx={{ flex: 1 }}>
            <Typography variant="caption" display="block" sx={{ fontSize: '0.7rem', color: 'rgba(47, 79, 79, 0.7)' }}>
              Valor
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ fontSize: '1rem', color: '#D4AF37' }}>
              {collection.value && collection.value > 0 
                ? `R$ ${collection.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'R$ 0,00'
              }
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Ações: FlexShrink 0 garante que esta área nunca suma */}
      <CardActions sx={{ 
        p: 2,
        gap: 1,
        bgcolor: 'rgba(47, 79, 79, 0.05)',
        flexDirection: 'column',
        flexShrink: 0 // <--- ISSO PROTEGE OS BOTÕES
      }}>
        <Button 
          startIcon={<ViewIcon />} 
          variant="contained" 
          size="small"
          fullWidth
          onClick={handleViewDetails}
          sx={{ 
            bgcolor: '#D4AF37',
            color: '#2F4F4F',
            fontWeight: 'bold',
            fontSize: '0.85rem',
            '&:hover': { bgcolor: '#e5c55a' }
          }}
        >
          Ver Detalhes
        </Button>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Button 
            startIcon={<EditIcon />} 
            variant="outlined" 
            size="small"
            fullWidth
            onClick={() => onEdit && onEdit(collection)}
            sx={{ 
              fontSize: '0.85rem',
              borderColor: '#2F4F4F',
              color: '#2F4F4F',
              '&:hover': { borderColor: '#D4AF37', bgcolor: 'rgba(212, 175, 55, 0.1)' }
            }}
          >
            Editar
          </Button>
          <Button 
            startIcon={<DeleteIcon />} 
            variant="outlined" 
            size="small"
            fullWidth
            // ADICIONE O CLICK AQUI:
            onClick={() => onDelete && onDelete(collection)}
            sx={{ 
              fontSize: '0.85rem',
              borderColor: '#d32f2f',
              color: '#d32f2f',
              '&:hover': { borderColor: '#c62828', bgcolor: 'rgba(211, 47, 47, 0.1)' }
            }}
          >
            Excluir
          </Button>
        </Box>
      </CardActions>
    </Card>
  )
}

export default CollectionCard