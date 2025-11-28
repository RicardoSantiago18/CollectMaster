// ============================================
// MOCKS DE USUÁRIOS - REMOVER APÓS INTEGRAÇÃO
// ============================================
// Este arquivo contém dados mockados de usuários para desenvolvimento.
// Para remover: delete este arquivo e remova os imports em userService.js

export const mockUsers = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@email.com',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
  },
  {
    id: 3,
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@email.com',
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
  },
  {
    id: 5,
    name: 'Carlos Ferreira',
    email: 'carlos.ferreira@email.com',
  },
  {
    id: 6,
    name: 'Julia Almeida',
    email: 'julia.almeida@email.com',
  },
];

// Função para obter todos os usuários mockados
export const getMockUsers = () => {
  return [...mockUsers];
};

// Função para obter um usuário mockado por ID
export const getMockUserById = (userId) => {
  return mockUsers.find((user) => user.id === parseInt(userId) || user.id === userId) || null;
};

