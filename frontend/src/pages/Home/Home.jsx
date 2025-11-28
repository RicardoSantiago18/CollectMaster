import React from 'react'
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  Collections as CollectionsIcon,
  Add as AddIcon,
  Search as SearchIcon,
  BarChart as ChartIcon,
  Group as GroupIcon,
  Security as SecurityIcon,
  Share as ShareIcon,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

// Componente da página inicial (Home)
// Exibe informações sobre a plataforma, recursos e tipos de coleções populares
const Home = () => {
  const theme = useTheme()
  // Verifica se está em dispositivo móvel para ajustar o layout
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const features = [
    {
      Icon: CollectionsIcon,
      title: 'Organize suas Coleções',
      description: 'Categorize e organize itens de forma intuitiva com metadados personalizáveis.',
    },
    {
      Icon: ChartIcon,
      title: 'Acompanhe Valores',
      description: 'Monitore o valor de mercado e histórico de preços dos seus itens.',
    },
    {
      Icon: SearchIcon,
      title: 'Busca Avançada',
      description: 'Encontre rapidamente qualquer item com nosso sistema de busca inteligente.',
    },
    {
      Icon: SecurityIcon,
      title: 'Backup Seguro',
      description: 'Seus dados protegidos com criptografia e backup automático na nuvem.',
    },
    {
      Icon: ShareIcon,
      title: 'Compartilhamento',
      description: 'Compartilhe suas coleções com outros entusiastas de forma controlada.',
    },
    {
      Icon: GroupIcon,
      title: 'Comunidade',
      description: 'Conecte-se com outros colecionadores e troque experiências.',
    }
  ]

  const collectionTypes = [
    {
      title: 'Action Figures',
      items: '1.2K coleções',
    },
    {
      title: 'Moedas Raras',
      items: '856 coleções',
    },
    {
      title: 'Vinil e CDs',
      items: '2.3K coleções',
    },
    {
      title: 'Cartas Pokémon/Magic',
      items: '3.5K coleções',
    },
    {
      title: 'Camisas de Futebol',
      items: '2.1K coleções',
    },
    {
      title: 'Selos',
      items: '1.8K coleções',
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#2F4F4F' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#2F4F4F',
          color: '#F5F5DC',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant={isMobile ? "h2" : "h1"}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.1,
                    color: '#F5F5DC',
                    mb: 2,
                  }}
                >
                  Organize suas coleções como um{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#D4AF37',
                      textShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                    }}
                  >
                    verdadeiro expert
                  </Box>
                </Typography>
                
                <Typography
                  variant="h5"
                  component="p"
                  gutterBottom
                  sx={{
                    color: 'rgba(245, 245, 220, 0.9)',
                    mb: 4,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                  }}
                >
                  A plataforma definitiva para colecionadores organizarem, valorarem e compartilharem suas coleções mais preciosas.
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 4,
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/register"
                    sx={{
                      bgcolor: '#D4AF37',
                      color: '#2F4F4F',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#e5c55a',
                        transform: 'translateY(-2px)',
                        boxShadow: 6,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Começar Agora
                  </Button>
                </Box>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 4, 
                  mt: 4, 
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#D4AF37' }}>
                      10K+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                      Colecionadores
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#D4AF37' }}>
                      50K+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                      Coleções
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ color: '#D4AF37' }}>
                      1M+
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.8)' }}>
                      Itens Catalogados
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <Card
                  elevation={8}
                  sx={{
                    bgcolor: '#F5F5DC',
                    borderRadius: 4,
                    overflow: 'hidden',
                    maxWidth: 500,
                    width: '100%',
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2,
                        py: 4,
                      }}
                    >
                      <Box
                        sx={{
                          width: 120,
                          height: 120,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 64,
                          filter: 'drop-shadow(0 0 20px #D4AF37)',
                        }}
                      >
                        🏆
                      </Box>
                      <Typography 
                        variant="h5" 
                        fontWeight="bold" 
                        textAlign="center"
                        sx={{ color: '#2F4F4F' }}
                      >
                        Sua Coleção em um só lugar
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ bgcolor: '#F5F5DC', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Chip 
              label="RECURSOS" 
              variant="outlined"
              sx={{ 
                mb: 2,
                borderColor: '#D4AF37',
                color: '#2F4F4F',
                fontWeight: 'bold',
              }}
            />
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ color: '#2F4F4F' }}
            >
              Tudo que você precisa para sua coleção
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                color: '#2F4F4F',
                opacity: 0.8,
              }}
            >
              Ferramentas poderosas desenvolvidas especificamente para colecionadores
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
              maxWidth: '1200px',
              mx: 'auto',
              width: '100%',
            }}
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  elevation={2}
                  sx={{
                    width: '100%',
                    height: '360px',
                    bgcolor: '#2F4F4F',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    },
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 4,
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      flexGrow: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 90,
                        height: 90,
                        background: 'rgba(212, 175, 55, 0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        color: '#D4AF37',
                        flexShrink: 0,
                      }}
                    >
                      <feature.Icon sx={{ fontSize: 45 }} />
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      fontWeight="bold"
                      sx={{ 
                        color: '#F5F5DC',
                        fontSize: '1.5rem',
                        mb: 2,
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(245, 245, 220, 0.8)',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        flexGrow: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Collection Types Section */}
      <Box sx={{ bgcolor: '#2F4F4F', py: 12 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Chip 
              label="CATEGORIAS" 
              variant="outlined"
              sx={{ 
                mb: 2,
                borderColor: '#D4AF37',
                color: '#D4AF37',
                fontWeight: 'bold',
              }}
            />
            <Typography 
              variant="h2" 
              component="h2" 
              gutterBottom
              sx={{ color: '#F5F5DC' }}
            >
              Tipos de Coleção Populares
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                color: 'rgba(245, 245, 220, 0.8)',
              }}
            >
              Descubra como outros colecionadores estão usando o CollectMaster
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 4,
              maxWidth: '1200px',
              mx: 'auto',
              width: '100%',
            }}
          >
            {collectionTypes.map((collection, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  sx={{
                    width: '100%',
                    height: '320px',
                    background: `linear-gradient(135deg, #2F4F4F 0%, #1f3535 100%)`,
                    border: '2px solid #D4AF37',
                    color: '#F5F5DC',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 8px 24px rgba(212, 175, 55, 0.4)`,
                      borderColor: '#e5c55a',
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      p: 4,
                      position: 'relative',
                      zIndex: 2,
                      flexGrow: 1,
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      component="h3" 
                      gutterBottom 
                      fontWeight="bold" 
                      sx={{ 
                        color: '#D4AF37',
                        fontSize: '1.75rem',
                        mb: 1.5,
                        lineHeight: 1.3,
                        wordBreak: 'break-word',
                      }}
                    >
                      {collection.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'rgba(245, 245, 220, 0.9)', 
                        mb: 2,
                        fontSize: '1rem',
                      }}
                    >
                      {collection.items}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#F5F5DC', py: { xs: 8, md: 12 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom
            sx={{ color: '#2F4F4F', mb: 2 }}
          >
            Pronto para organizar sua coleção?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              maxWidth: 600, 
              mx: 'auto',
              color: '#2F4F4F',
              opacity: 0.8,
            }}
          >
            Junte-se a milhares de colecionadores que já transformaram sua paixão em organização
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/register"
            sx={{
              px: 6,
              py: 2,
              fontSize: '1.1rem',
              bgcolor: '#D4AF37',
              color: '#2F4F4F',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#e5c55a',
                transform: 'translateY(-2px)',
                boxShadow: 8,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Começar Gratuitamente
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1f3535', color: '#F5F5DC', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                component="div" 
                gutterBottom 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  color: '#D4AF37',
                }}
              >
                🏆 CollectMaster
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(245, 245, 220, 0.8)', mb: 2 }}>
                A plataforma definitiva para colecionadores organizarem e valorarem suas coleções.
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'rgba(212, 175, 55, 0.3)', mt: 4, pt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(245, 245, 220, 0.7)' }}>
              © 2025 CollectMaster. Todos os direitos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default Home