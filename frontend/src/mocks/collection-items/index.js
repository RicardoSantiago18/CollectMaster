// Mocks específicos para diferentes tipos de coleções
const collectionMocks = {
  carrinhos: [
    {
      id: 1,
      name: 'Hot Wheels Mustang 67',
      description: 'Miniatura clássica em escala 1:64, edição limitada',
      quantity: 1,
      estimatedValue: 25.0,
    },
    {
      id: 2,
      name: 'Miniatura Camaro SS',
      description: 'Modelo colecionável em vermelho metálico',
      quantity: 1,
      estimatedValue: 32.0,
    },
    {
      id: 3,
      name: 'Fusca Colecionável Azul',
      description: 'Réplica detalhada do clássico brasileiro',
      quantity: 1,
      estimatedValue: 18.0,
    },
    {
      id: 4,
      name: 'Lamborghini Aventador',
      description: 'Miniatura premium em amarelo',
      quantity: 1,
      estimatedValue: 45.0,
    },
    {
      id: 5,
      name: 'Porsche 911 Turbo',
      description: 'Edição especial em prata',
      quantity: 1,
      estimatedValue: 38.0,
    },
  ],
  carros: [
    {
      id: 1,
      name: 'Ferrari F40',
      description: 'Modelo em escala 1:18, edição premium',
      quantity: 1,
      estimatedValue: 120.0,
    },
    {
      id: 2,
      name: 'McLaren P1',
      description: 'Miniatura detalhada em laranja',
      quantity: 1,
      estimatedValue: 95.0,
    },
    {
      id: 3,
      name: 'Bugatti Chiron',
      description: 'Réplica em escala 1:24',
      quantity: 1,
      estimatedValue: 150.0,
    },
  ],
  moedas: [
    {
      id: 1,
      name: 'Moeda de Prata 1 Real',
      description: 'Moeda comemorativa de 1994',
      quantity: 1,
      estimatedValue: 50.0,
    },
    {
      id: 2,
      name: 'Moeda de Ouro 10 Reais',
      description: 'Edição limitada do Banco Central',
      quantity: 1,
      estimatedValue: 200.0,
    },
    {
      id: 3,
      name: 'Moeda Antiga 500 Réis',
      description: 'Moeda histórica do período imperial',
      quantity: 1,
      estimatedValue: 75.0,
    },
  ],
  selos: [
    {
      id: 1,
      name: 'Selo Olímpico Rio 2016',
      description: 'Selo comemorativo dos Jogos Olímpicos',
      quantity: 1,
      estimatedValue: 15.0,
    },
    {
      id: 2,
      name: 'Selo Histórico Brasil',
      description: 'Selo raro da década de 1960',
      quantity: 1,
      estimatedValue: 30.0,
    },
    {
      id: 3,
      name: 'Selo Internacional',
      description: 'Selo de correio internacional',
      quantity: 1,
      estimatedValue: 12.0,
    },
  ],
  cartas: [
    {
      id: 1,
      name: 'Charizard Base Set',
      description: 'Carta rara de Pokémon, primeira edição',
      quantity: 1,
      estimatedValue: 500.0,
    },
    {
      id: 2,
      name: 'Pikachu Amarelo',
      description: 'Carta promocional especial',
      quantity: 1,
      estimatedValue: 80.0,
    },
    {
      id: 3,
      name: 'Black Lotus',
      description: 'Carta lendária de Magic: The Gathering',
      quantity: 1,
      estimatedValue: 1500.0,
    },
  ],
  livros: [
    {
      id: 1,
      name: 'O Senhor dos Anéis - Primeira Edição',
      description: 'Livro raro em capa dura, edição original',
      quantity: 1,
      estimatedValue: 300.0,
    },
    {
      id: 2,
      name: 'Dom Casmurro - Edição Antiga',
      description: 'Clássico brasileiro, edição histórica',
      quantity: 1,
      estimatedValue: 150.0,
    },
    {
      id: 3,
      name: 'Harry Potter - Primeira Edição',
      description: 'Livro autografado pelo autor',
      quantity: 1,
      estimatedValue: 800.0,
    },
  ],
  action: [
    {
      id: 1,
      name: 'Action Figure Batman',
      description: 'Boneco colecionável em escala 1:6',
      quantity: 1,
      estimatedValue: 200.0,
    },
    {
      id: 2,
      name: 'Superman Premium',
      description: 'Figura detalhada com acessórios',
      quantity: 1,
      estimatedValue: 180.0,
    },
    {
      id: 3,
      name: 'Spider-Man Articulado',
      description: 'Action figure com múltiplos pontos de articulação',
      quantity: 1,
      estimatedValue: 120.0,
    },
  ],
};

// Função para gerar itens genéricos
const generateGenericItems = (collectionName, count = 5) => {
  const items = [];
  for (let i = 1; i <= count; i++) {
    items.push({
      id: i,
      name: `Item ${i}`,
      description: `Descrição curta do item ${i} da coleção ${collectionName}`,
      quantity: Math.floor(Math.random() * 3) + 1,
      estimatedValue: Math.floor(Math.random() * 100) + 10,
    });
  }
  return items;
};

// Função para normalizar o nome da coleção para busca
const normalizeCollectionName = (name) => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

// Função principal para obter itens de uma coleção
export const getCollectionItems = (
  collectionId,
  collectionName
) => {
  const normalizedName = normalizeCollectionName(collectionName);

  // Verificar se existe mock específico
  for (const [key, items] of Object.entries(collectionMocks)) {
    if (normalizedName.includes(key)) {
      return items.map((item) => ({
        ...item,
        id: `${collectionId}-${item.id}`,
      }));
    }
  }

  // Se não encontrou mock específico, gerar itens genéricos
  return generateGenericItems(collectionName, 5).map((item) => ({
    ...item,
    id: `${collectionId}-${item.id}`,
  }));
};

