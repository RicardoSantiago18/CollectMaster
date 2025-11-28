// ============================================
// MOCKS DE COLEÇÕES POR USUÁRIO - REMOVER APÓS INTEGRAÇÃO
// ============================================
// Este arquivo contém coleções mockadas organizadas por usuário.
// Para remover: delete este arquivo e remova os imports em collectionService.js

export const mockCollectionsByUser = {
  // João Silva - Colecionador de carrinhos
  1: [
    {
      id: 101,
      name: 'Hot Wheels Premium',
      category: 'Carrinhos',
      description: 'Coleção de miniaturas Hot Wheels em edições especiais e limitadas',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 1,
      itemCount: 8,
      value: 245.50,
    },
    {
      id: 102,
      name: 'Carros Clássicos',
      category: 'Carrinhos',
      description: 'Réplicas de carros clássicos dos anos 60 e 70',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 1,
      itemCount: 5,
      value: 180.00,
    },
  ],

  // Maria Santos - Colecionadora de moedas
  2: [
    {
      id: 201,
      name: 'Moedas Brasileiras',
      category: 'Moedas',
      description: 'Coleção de moedas brasileiras históricas e comemorativas',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 2,
      itemCount: 12,
      value: 450.00,
    },
    {
      id: 202,
      name: 'Moedas Estrangeiras',
      category: 'Moedas',
      description: 'Moedas de diversos países ao redor do mundo',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 2,
      itemCount: 15,
      value: 320.75,
    },
    {
      id: 203,
      name: 'Moedas Antigas',
      category: 'Moedas',
      description: 'Moedas antigas e raras de diferentes períodos históricos',
      image: null,
      is_public: false, // Coleção privada
      isPublic: false,
      owner_id: 2,
      itemCount: 8,
      value: 1200.00,
    },
  ],

  // Pedro Oliveira - Colecionador de selos
  3: [
    {
      id: 301,
      name: 'Selos Brasileiros',
      category: 'Selos',
      description: 'Coleção de selos postais brasileiros de diferentes épocas',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 3,
      itemCount: 25,
      value: 380.50,
    },
    {
      id: 302,
      name: 'Selos Temáticos',
      category: 'Selos',
      description: 'Selos com temas específicos: animais, esportes, arte',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 3,
      itemCount: 18,
      value: 275.00,
    },
  ],

  // Ana Costa - Colecionadora de livros
  4: [
    {
      id: 401,
      name: 'Livros Raros',
      category: 'Livros',
      description: 'Coleção de livros raros e edições especiais',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 4,
      itemCount: 10,
      value: 850.00,
    },
    {
      id: 402,
      name: 'Quadrinhos',
      category: 'Livros',
      description: 'Coleção de HQs e graphic novels',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 4,
      itemCount: 30,
      value: 620.00,
    },
  ],

  // Carlos Ferreira - Colecionador de action figures
  5: [
    {
      id: 501,
      name: 'Action Figures Marvel',
      category: 'Action Figures',
      description: 'Figuras de ação dos personagens da Marvel',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 5,
      itemCount: 15,
      value: 1250.00,
    },
    {
      id: 502,
      name: 'Action Figures DC',
      category: 'Action Figures',
      description: 'Figuras de ação dos personagens da DC Comics',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 5,
      itemCount: 12,
      value: 980.00,
    },
  ],

  // Julia Almeida - Colecionadora de vinis
  6: [
    {
      id: 601,
      name: 'Vinil Clássico',
      category: 'Vinil',
      description: 'Discos de vinil de música clássica e jazz',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 6,
      itemCount: 20,
      value: 450.00,
    },
    {
      id: 602,
      name: 'Rock Nacional',
      category: 'Vinil',
      description: 'Discos de rock brasileiro dos anos 80 e 90',
      image: null,
      is_public: true,
      isPublic: true,
      owner_id: 6,
      itemCount: 18,
      value: 380.00,
    },
  ],
};

// Função para obter coleções mockadas de um usuário
export const getMockCollectionsByUserId = (userId) => {
  const userIdNum = parseInt(userId) || userId;
  return mockCollectionsByUser[userIdNum] || [];
};

