# Estrutura do Frontend - Organizada por Diagramas de Sequência

Esta estrutura foi organizada para seguir os diagramas de sequência do projeto, especialmente o **SD01 - REALIZAR CADASTRO**.

## Estrutura de Pastas

```
frontend/src/
├── pages/
│   └── Auth/
│       ├── Register.jsx    # FRM-CADASTRO (Formulário de Cadastro)
│       └── Login.jsx
│
├── hooks/
│   └── useRegisterForm.js  # Lógica do formulário (contém infoCadastro)
│
├── api/
│   ├── auth.js              # Comunicação com backend de autenticação (contém criarUsuario)
│   ├── collections.js       # Comunicação com backend de coleções
│   └── users.js             # Comunicação com backend de usuários
│
└── components/              # Componentes reutilizáveis
```

## Fluxo SD01 - REALIZAR CADASTRO

### Participantes

1. **FRM-CADASTRO**: `pages/Auth/Register.jsx`
2. **C-CADASTRO**: Backend (`backend/app/controllers/cadastro.py`)
3. **E-COLECIONADOR**: Backend (`backend/app/entities/colecionador.py`)

### Fluxo de Chamadas no Frontend

```
1. Colecionador → FRM-CADASTRO: infoCadastro()
   └─ Register.jsx (componente visual)
   └─ useRegisterForm.js (hook com método infoCadastro)

2. FRM-CADASTRO → C-CADASTRO: criarUsuario(nome, email, senha)
   └─ api/auth.js (método criarUsuario)
   └─ Faz POST para /api/auth/register

3. C-CADASTRO → E-COLECIONADOR: criarUsuario()
   └─ (Backend)

4. E-COLECIONADOR → C-CADASTRO: retorna cadastro
   └─ (Backend)

5. C-CADASTRO → FRM-CADASTRO: retorna cadastro
   └─ api/auth.js retorna { success: true, data: cadastro }

6. FRM-CADASTRO → Colecionador: confirmaçãoCadastro
   └─ useRegisterForm.js redireciona para /login
```

## Arquivos Principais

### `pages/Auth/Register.jsx` (FRM-CADASTRO)
- **Responsabilidade**: Interface visual do formulário de cadastro
- **Função**: Recebe dados do colecionador e exibe confirmação

### `hooks/useRegisterForm.js`
- **Responsabilidade**: Lógica do formulário de cadastro
- **Método principal**: `infoCadastro(nome, email, senha)`
- **Funções**: Validação, chamada ao serviço, redirecionamento

### `api/auth.js`
- **Responsabilidade**: Comunicação com o backend de autenticação
- **Método principal**: `criarUsuario(nome, email, senha)`
- **Funções**: Faz requisição HTTP para o endpoint de cadastro

## Convenções de Nomenclatura

- **Formulários**: `FRM-*` (ex: `FRM-CADASTRO` = `Register.jsx`)
- **Métodos**: Seguem o diagrama (ex: `infoCadastro`, `criarUsuario`)
- **Hooks**: `use*Form` para formulários
- **API**: `*.js` para comunicação com backend (ex: `auth.js`, `collections.js`)

