# 📦 Mocks de Usuários - Instruções para Remoção

Este diretório contém dados mockados de usuários, coleções e itens para desenvolvimento.

## 🗑️ Como Remover os Mocks

Quando estiver pronto para integrar com dados reais do backend:

### 1. Remover os arquivos de mocks:
```bash
# Delete toda a pasta de mocks de usuários
rm -rf src/mocks/users
```

### 2. Atualizar `src/services/userService.js`:
- Remova a linha: `import { getMockUsers, getMockUserById } from '../mocks/users';`
- Remova ou comente o bloco `if (USE_MOCKS) { ... }`
- Mude `const USE_MOCKS = true;` para `const USE_MOCKS = false;` ou remova completamente

### 3. Atualizar `src/services/collectionService.js`:
- Remova as linhas:
  - `import { getMockCollectionsByUserId } from '../mocks/users/collections';`
  - `import { getMockItemsByCollectionId } from '../mocks/users/items';`
- Remova ou comente os blocos `if (USE_MOCKS) { ... }`
- Mude `const USE_MOCKS = true;` para `const USE_MOCKS = false;` ou remova completamente

### 4. Verificar se não há mais referências:
```bash
# Buscar por referências aos mocks
grep -r "mocks/users" src/
```

## 📝 Estrutura dos Mocks

- `index.js` - Lista de usuários mockados
- `collections.js` - Coleções organizadas por usuário
- `items.js` - Itens organizados por coleção

## ✅ Após Remover

Certifique-se de que:
1. O backend está rodando em `http://localhost:8000/api`
2. As rotas `/users`, `/users/:id`, `/collections/:userId`, `/items/collection/:collectionId` estão funcionando
3. Os dados retornados seguem o mesmo formato dos mocks

