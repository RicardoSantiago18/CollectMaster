# Documentação Técnica Completa - CollectMaster

## 1. Visão Geral da Aplicação

### 1.1. Resumo em Alto Nível

**Objetivo do Sistema:**
O CollectMaster é uma plataforma web para colecionadores gerenciarem suas coleções e itens. Permite criar coleções, adicionar itens, visualizar coleções de outros usuários e gerenciar perfil pessoal.

**Tecnologias do Frontend:**
- React 19.1.1
- React Router DOM 7.9.5
- Vite 7.1.7
- Material-UI (MUI) 7.3.5
- Emotion (estilização)

**Tecnologias do Backend:**
- Python 3
- FastAPI
- Pydantic (validação de dados)
- bcrypt (hash de senhas)
- Uvicorn (servidor ASGI)
- Persistência em arquivos JSON (users.json, collections.json, items.json)

### 1.2. Estrutura de Pastas

**Frontend (`frontend/`):**
```
frontend/
├── src/
│   ├── pages/              # Páginas principais
│   │   ├── Auth/           # Login, Register, ForgotPassword, ResetPassword
│   │   ├── Dashboard/      # Dashboard principal
│   │   ├── Collections/    # Detalhes de coleções
│   │   ├── Profile/        # Edição de perfil
│   │   └── Social/         # Visualização de outros colecionadores
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Header/         # Cabeçalho da aplicação
│   │   └── CollectionCard/ # Card de coleção
│   ├── hooks/              # Hooks customizados
│   │   ├── useRegisterForm.js
│   │   ├── useLoginForm.js
│   │   ├── useDashboard.js
│   │   ├── useCollectionDetails.js
│   │   └── useForgotPassword.js
│   ├── services/           # Comunicação com API
│   │   ├── authService.js
│   │   ├── collectionService.js
│   │   └── userService.js
│   ├── App.jsx             # Componente principal e rotas
│   └── main.jsx            # Ponto de entrada
└── package.json
```

**Backend (`backend/`):**
```
backend/
├── app/
│   ├── main.py             # Aplicação FastAPI principal
│   ├── routers/            # Rotas HTTP
│   │   ├── auth.py         # Autenticação
│   │   ├── collections.py  # Coleções
│   │   ├── items.py        # Itens
│   │   └── users.py        # Usuários
│   ├── controllers/        # Lógica de controle
│   │   ├── cadastro.py     # C-CADASTRO
│   │   ├── login.py        # C-VISUALIZARCOLEC
│   │   ├── editarperfil.py # C-EDITARPERFIL
│   │   ├── recuperar_senha.py # C-RECUPERARSENHA
│   │   └── visuoutro.py    # VISUOUTRO
│   ├── entities/           # Entidades de domínio
│   │   ├── colecionador.py # E-COLECIONADOR
│   │   ├── colecao.py      # E-COLEÇÃO
│   │   └── item.py         # E-ITEM
│   ├── schemas.py          # Modelos Pydantic
│   ├── security.py         # Funções de segurança (hash)
│   └── db_json.py          # Persistência em JSON
├── users.json              # Banco de dados de usuários
├── collections.json        # Banco de dados de coleções
├── items.json              # Banco de dados de itens
└── requirements.txt
```

---

## 2. Backend – Arquitetura e Endpoints

### 2.1. Arquitetura do Backend

**Arquivo Principal:**
- `backend/app/main.py`: Cria a aplicação FastAPI, configura CORS e registra os routers.

**Registro de Rotas:**
As rotas são registradas em `main.py`:
- `/api/auth` → `auth.router`
- `/api/collections` → `collections.router`
- `/api/items` → `items.router`
- `/api/users` → `users.router`

**Camadas:**
1. **Routers** (`routers/`): Recebem requisições HTTP e chamam controllers.
2. **Controllers** (`controllers/`): Orquestram a lógica de negócio e chamam entities.
3. **Entities** (`entities/`): Lógica de domínio e validações.
4. **db_json.py**: Persistência em arquivos JSON.

**Validação e Autenticação:**
- Validação via Pydantic (`schemas.py`).
- Hash de senhas com bcrypt (`security.py`).
- Sem middleware de autenticação JWT; autenticação baseada em localStorage no frontend.

**CORS:**
Configurado em `main.py` para permitir requisições de `http://localhost:5173` e `http://localhost:3000`.

### 2.2. Lista Completa de Endpoints

#### **Autenticação (`/api/auth`)**

**POST `/api/auth/register`**
- **Controller:** `CCadastro.criarUsuario()` (`controllers/cadastro.py`)
- **Service:** `EColecionador.criarUsuario()` (`entities/colecionador.py`)
- **Body:** `{ name: str, email: EmailStr, password: str }`
- **Retorno:** `UserPublic` (201 Created) ou erro 400 (email já cadastrado)

**POST `/api/auth/login`**
- **Controller:** `CVisualizarColec.loginUser()` (`controllers/login.py`)
- **Service:** `EColecionador.get_user_by_email()` (`entities/colecionador.py`)
- **Body:** `{ email: EmailStr, password: str }`
- **Retorno:** `UserPublic` (200 OK) ou erro 401 (credenciais inválidas)

**POST `/api/auth/forgot-password`**
- **Controller:** `CRecuperarSenha.solicitarRecuperacao()` (`controllers/recuperar_senha.py`)
- **Service:** `EColecionador.buscarEmail()` (`entities/colecionador.py`)
- **Body:** `{ email: EmailStr }`
- **Retorno:** `{ message: "Verifique seu email" }` (200 OK) ou erro 404 (email não encontrado)

**POST `/api/auth/reset-password`**
- **Controller:** `CRecuperarSenha.confirmar_recuperacao()` (`controllers/recuperar_senha.py`)
- **Body:** `{ token: str, new_password: str }`
- **Retorno:** `{ message: "Senha alterada com sucesso" }` (200 OK) ou erro 400 (token inválido)

#### **Coleções (`/api/collections`)**

**POST `/api/collections/`**
- **Controller:** `CVisualizarColec.createCollection()` (`controllers/login.py`)
- **Service:** `EColecao.create_collection_in_db()` (`entities/colecao.py`)
- **Body:** `CollectionCreate` (name, description, is_public, owner_id, image_url)
- **Retorno:** `CollectionPublic` (201 Created)

**GET `/api/collections/{user_id}`**
- **Função:** `get_collections_for_user()` (`routers/collections.py`)
- **Service:** `db_json.get_collections_by_owner_id()`
- **Retorno:** `List[CollectionPublic]` (200 OK)

**PUT `/api/collections/{collection_id}`**
- **Função:** `update_collection()` (`routers/collections.py`)
- **Service:** `db_json.update_collection_in_db()`
- **Body:** `CollectionUpdate` (campos opcionais)
- **Retorno:** `CollectionPublic` (200 OK) ou erro 404

**DELETE `/api/collections/{collection_id}`**
- **Função:** `delete_collection()` (`routers/collections.py`)
- **Service:** `db_json.delete_collection_in_db()`
- **Retorno:** 204 No Content ou erro 404

#### **Itens (`/api/items`)**

**POST `/api/items/`**
- **Controller:** `CVisualizarColec.adicionarItem()` (`controllers/login.py`)
- **Service:** `EItem.dadosItem()` → `EColecao.adicionar()` (`entities/item.py`, `entities/colecao.py`)
- **Body:** `ItemCreate` (name, description, quantity, estimated_value, collection_id)
- **Retorno:** `ItemPublic` (201 Created)

**GET `/api/items/collection/{collection_id}`**
- **Função:** `get_items()` (`routers/items.py`)
- **Service:** `db_json.get_items_by_collection_id()`
- **Retorno:** `List[ItemPublic]` (200 OK)

**PUT `/api/items/{item_id}`**
- **Função:** `update_item()` (`routers/items.py`)
- **Service:** `db_json.update_item_in_db()`
- **Body:** `ItemUpdate` (campos opcionais)
- **Retorno:** `ItemPublic` (200 OK) ou erro 404

**DELETE `/api/items/{item_id}`**
- **Controller:** `CVisualizarColec.removerItem()` (`controllers/login.py`)
- **Service:** `EColecao.removerItem()` → `EItem.removerItem()` (`entities/colecao.py`, `entities/item.py`)
- **Retorno:** 204 No Content ou erro 404

#### **Usuários (`/api/users`)**

**GET `/api/users`**
- **Função:** `read_users()` (`routers/users.py`)
- **Service:** `db_json.load_users()`
- **Query:** `?search=string` (opcional, busca por nome ou email)
- **Retorno:** `List[UserPublic]` (200 OK)

**GET `/api/users/{user_id}`**
- **Função:** `read_user()` (`routers/users.py`)
- **Service:** `db_json.load_users()`
- **Retorno:** `UserPublic` (200 OK) ou erro 404

**GET `/api/users/{user_id}/profile`**
- **Controller:** `VisuOutro.carregarDadosPerfil()` (`controllers/visuoutro.py`)
- **Service:** `EColecionador.buscarUsuario()` + `EColecao.buscarColecao()`
- **Retorno:** `{ perfil: UserPublic, colecoes: List[CollectionPublic] }` (200 OK) ou erro 404

**PUT `/api/users/{user_id}`**
- **Controller:** `CEditarPerfil.updateUser()` (`controllers/editarperfil.py`)
- **Service:** `EColecionador.update_user_in_db()` (`entities/colecionador.py`)
- **Body:** `UserUpdate` (name, email, bio - opcionais)
- **Retorno:** `UserPublic` (200 OK) ou erro 400 (email em uso) / 404 (usuário não encontrado)

### 2.3. Fluxo Interno de um Endpoint Típico

**Exemplo: Criar Coleção (POST `/api/collections/`)**

1. Requisição HTTP → `routers/collections.py` → `create_new_collection()`
2. Router → `CVisualizarColec.createCollection()` (`controllers/login.py`)
3. Controller → `EColecao.create_collection_in_db()` (`entities/colecao.py`)
4. Entity → `db_json.create_collection_in_db()` (`db_json.py`)
5. `db_json.py` → Lê `collections.json`, adiciona nova coleção, salva arquivo
6. Resposta: `CollectionPublic` (201 Created)

**Cadeia completa:**
```
HTTP Request → Router → Controller → Entity → db_json → JSON File
                                                      ↓
HTTP Response ← Router ← Controller ← Entity ← db_json
```

---

## 3. Frontend – Arquitetura e Fluxo

### 3.1. Arquitetura do Frontend

**Framework:** React 19.1.1 com Vite

**Roteamento:**
- React Router DOM 7.9.5
- Rotas definidas em `App.jsx`:
  - `/` → Home
  - `/register` → Register
  - `/login` → Login
  - `/forgot-password` → ForgotPassword
  - `/reset-password` → ResetPassword
  - `/dashboard` → Dashboard
  - `/collections/:id` → CollectionDetails
  - `/perfil` → ProfilePage
  - `/social` → Social
  - `/social/user/:id` → SocialUserCollectionsPage
  - `/social/user/:userId/collection/:collectionId` → SocialUserCollectionDetailsPage

**Organização de Componentes:**
- **Pages:** Telas principais da aplicação
- **Components:** Componentes reutilizáveis (Header, CollectionCard)
- **Hooks:** Lógica de formulários e estado
- **Services:** Chamadas HTTP para a API

**Gerenciamento de Estado:**
- Estado local com `useState` e `useEffect`
- Dados do usuário autenticado em `localStorage` (chave `'user'`)
- Sem Context API ou Redux

**Tema:**
- Material-UI com tema customizado em `App.jsx` (cores: #2F4F4F, #D4AF37, #F5F5DC)

### 3.2. Como o Frontend Consome a API

**Arquivos de Serviço:**
- `services/authService.js`: Autenticação (register, login, forgot-password, reset-password)
- `services/collectionService.js`: Coleções e itens
- `services/userService.js`: Usuários e perfis

**Configuração da URL da API:**
- Hardcoded: `http://localhost:8000/api` nos services

**Exemplo de Chamada:**
```javascript
// authService.js
export const criarUsuario = async (nome, email, senha) => {
  const response = await fetch('http://localhost:8000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: nome, email: email, password: senha })
  });
  // ...
}
```

**Tratamento de Respostas:**
- Sucesso: atualiza estado, salva no localStorage, redireciona
- Erro: exibe mensagem de erro, mantém na página

### 3.3. Telas-Chave

#### **Tela de Cadastro (`Register.jsx`)**
- **Componente:** `pages/Auth/Register.jsx`
- **Hook:** `useRegisterForm.js`
- **Fluxo:**
  1. Usuário preenche formulário
  2. `handleSubmit` → `infoCadastro()` (hook)
  3. `infoCadastro()` → `criarUsuario()` (`authService.js`)
  4. POST `/api/auth/register`
  5. Sucesso: redireciona para `/login` com mensagem
  6. Erro: exibe mensagem de erro

#### **Tela de Login (`Login.jsx`)**
- **Componente:** `pages/Auth/Login.jsx`
- **Hook:** `useLoginForm.js`
- **Fluxo:**
  1. Usuário preenche email e senha
  2. `handleSubmit` → `insereEmailESenha()` (hook)
  3. `insereEmailESenha()` → `loginUser()` (`authService.js`)
  4. POST `/api/auth/login`
  5. Sucesso: salva `UserPublic` no localStorage, redireciona para `/dashboard`
  6. Erro: exibe mensagem de erro

#### **Tela de Edição de Perfil (`ProfilePage.jsx`)**
- **Componente:** `pages/Profile/ProfilePage.jsx`
- **Hook:** `useDashboard.js` (para carregar dados)
- **Fluxo:**
  1. Carrega dados do usuário do localStorage
  2. Usuário edita campos
  3. `clicaEmSalvarAlteracoes()` → `updateUser()` (`userService.js`)
  4. PUT `/api/users/{user_id}`
  5. Sucesso: atualiza localStorage, exibe "Perfil Atualizado!!"
  6. Erro: exibe mensagem de erro

#### **Tela de Dashboard (`Dashboard.jsx`)**
- **Componente:** `pages/Dashboard/Dashboard.jsx`
- **Hook:** `useDashboard.js`
- **Fluxo:**
  1. Carrega usuário do localStorage
  2. GET `/api/collections/{user_id}` → lista de coleções
  3. Exibe coleções em grid
  4. Criar coleção: abre modal → `criarColecao()` → POST `/api/collections/`
  5. Editar/Excluir: PUT/DELETE `/api/collections/{id}`

#### **Tela de Detalhes de Coleção (`CollectionDetails.jsx`)**
- **Componente:** `pages/Collections/details/CollectionDetails.jsx`
- **Hook:** `useCollectionDetails.js`
- **Fluxo:**
  1. Carrega coleção pelo ID da URL
  2. GET `/api/items/collection/{collection_id}` → lista de itens
  3. Adicionar item: abre modal → `salvar()` → POST `/api/items/`
  4. Remover item: confirma → `removerItem()` → DELETE `/api/items/{item_id}`
  5. Atualiza lista local após cada operação

#### **Tela de Visualizar Outro Colecionador (`SocialUserCollectionsPage.jsx`)**
- **Componente:** `pages/Social/pages/SocialUserCollectionsPage.jsx`
- **Fluxo:**
  1. `selecionarPerfil()` → `carregarDadosPerfil()` (`userService.js`)
  2. GET `/api/users/{user_id}/profile`
  3. Retorna `{ perfil: UserPublic, colecoes: List[CollectionPublic] }`
  4. Exibe perfil e coleções públicas

#### **Tela de Esqueci a Senha (`ForgotPassword.jsx`)**
- **Componente:** `pages/Auth/ForgotPassword.jsx`
- **Hook:** `useForgotPassword.js`
- **Fluxo:**
  1. Usuário informa email
  2. `enviar()` → `solicitarRecuperacao()` → `forgotPassword()` (`authService.js`)
  3. POST `/api/auth/forgot-password`
  4. Sucesso: exibe "Verifique seu email" (token impresso no console do servidor)
  5. Erro: exibe "email não encontrado"

---

## 4. Fluxos por Caso de Uso (Front + Back Integrados)

### 4.1. Realizar Cadastro

1. **Frontend:** Usuário acessa `/register` e preenche formulário
2. **Frontend:** `Register.jsx` → `useRegisterForm.js` → `infoCadastro()`
3. **Frontend:** `infoCadastro()` → `criarUsuario()` (`authService.js`)
4. **HTTP:** POST `http://localhost:8000/api/auth/register`
   - Body: `{ name: string, email: EmailStr, password: string }`
5. **Backend:** `routers/auth.py` → `register_user()` → `CCadastro.criarUsuario()`
6. **Backend:** Controller → `EColecionador.criarUsuario()`
7. **Backend:** Entity: valida email único, gera hash da senha, cria `UserInDB`, persiste via `db_json.create_user()`
8. **Backend:** Retorna `UserPublic` (201 Created) ou erro 400
9. **Frontend:** Se sucesso, redireciona para `/login` com mensagem; se erro, exibe mensagem

### 4.2. Realizar Login

1. **Frontend:** Usuário acessa `/login` e preenche email e senha
2. **Frontend:** `Login.jsx` → `useLoginForm.js` → `insereEmailESenha()`
3. **Frontend:** `insereEmailESenha()` → `loginUser()` (`authService.js`)
4. **HTTP:** POST `http://localhost:8000/api/auth/login`
   - Body: `{ email: EmailStr, password: string }`
5. **Backend:** `routers/auth.py` → `login_user()` → `CVisualizarColec.loginUser()`
6. **Backend:** Controller → `EColecionador.get_user_by_email()`
7. **Backend:** Entity: busca usuário, `security.verify_password()` valida senha
8. **Backend:** Retorna `UserPublic` (200 OK) ou erro 401
9. **Frontend:** Se sucesso, salva `UserPublic` no localStorage (chave `'user'`) e redireciona para `/dashboard`; se erro, exibe mensagem

### 4.3. Editar Perfil

1. **Frontend:** Usuário acessa `/perfil` e edita campos
2. **Frontend:** `ProfilePage.jsx` → `clicaEmSalvarAlteracoes()` → `updateUser()` (`userService.js`)
3. **HTTP:** PUT `http://localhost:8000/api/users/{user_id}`
   - Body: `{ name?: string, email?: EmailStr, bio?: string }`
4. **Backend:** `routers/users.py` → `update_user()` → `CEditarPerfil.updateUser()`
5. **Backend:** Controller: valida email único (se alterado), `EColecionador.update_user_in_db()`
6. **Backend:** Entity: `db_json.update_user_in_db()` atualiza usuário
7. **Backend:** Retorna `UserPublic` (200 OK) ou erro 400/404
8. **Frontend:** Se sucesso, atualiza localStorage, exibe "Perfil Atualizado!!"; se erro, exibe mensagem

### 4.4. Criar Coleção

1. **Frontend:** Usuário no `/dashboard` clica em "Criar Coleção"
2. **Frontend:** `Dashboard.jsx` → `useDashboard.js` → `criarNovaColecao()` → abre modal
3. **Frontend:** Usuário preenche e confirma → `criarColecao()`
4. **Frontend:** `criarColecao()` → `createCollection()` (`collectionService.js`)
5. **HTTP:** POST `http://localhost:8000/api/collections/`
   - Body: `{ name: string, description?: string, is_public: bool, owner_id: int, image_url?: string }`
6. **Backend:** `routers/collections.py` → `create_new_collection()` → `CVisualizarColec.createCollection()`
7. **Backend:** Controller: gera ID, cria `CollectionInDB`, `EColecao.create_collection_in_db()`
8. **Backend:** Entity: `db_json.create_collection_in_db()` persiste
9. **Backend:** Retorna `CollectionPublic` (201 Created)
10. **Frontend:** Fecha modal, adiciona coleção ao estado, atualiza interface

### 4.5. Adicionar Item à Coleção

1. **Frontend:** Usuário em `/collections/:id` clica em "Adicionar Item"
2. **Frontend:** `CollectionDetails.jsx` → `useCollectionDetails.js` → `abrirModal()`
3. **Frontend:** Usuário preenche e confirma → `salvar()`
4. **Frontend:** `salvar()` → `createItem()` (`collectionService.js`)
5. **HTTP:** POST `http://localhost:8000/api/items/`
   - Body: `{ name: string, description?: string, quantity: int, estimated_value: float, collection_id: int }`
6. **Backend:** `routers/items.py` → `create_new_item()` → `CVisualizarColec.adicionarItem()`
7. **Backend:** Controller: `EItem.dadosItem()` cria item, `EColecao.buscar()` valida coleção, `EColecao.adicionar()` adiciona
8. **Backend:** Entity: `db_json.create_item_in_db()` persiste e atualiza estatísticas da coleção
9. **Backend:** Retorna `ItemPublic` (201 Created)
10. **Frontend:** Fecha modal, adiciona item ao estado, atualiza interface

### 4.6. Remover Item da Coleção

1. **Frontend:** Usuário em `/collections/:id` clica em "Remover" em um item
2. **Frontend:** `CollectionDetails.jsx` → `useCollectionDetails.js` → `removerItem()`
3. **Frontend:** Confirma → `deleteItem()` (`collectionService.js`)
4. **HTTP:** DELETE `http://localhost:8000/api/items/{item_id}`
5. **Backend:** `routers/items.py` → `delete_item()` → `CVisualizarColec.removerItem()`
6. **Backend:** Controller: `EColecao.buscar()` valida coleção, `EColecao.removerItem()` → `EItem.removerItem()`
7. **Backend:** Entity: `db_json.delete_item_in_db()` remove e atualiza estatísticas da coleção
8. **Backend:** Retorna 204 No Content ou erro 404
9. **Frontend:** Remove item do estado, atualiza interface

### 4.7. Visualizar Coleções de Outros Colecionadores

1. **Frontend:** Usuário em `/social` seleciona um colecionador
2. **Frontend:** Navega para `/social/user/:id`
3. **Frontend:** `SocialUserCollectionsPage.jsx` → `selecionarPerfil()` → `carregarDadosPerfil()` (`userService.js`)
4. **HTTP:** GET `http://localhost:8000/api/users/{user_id}/profile`
5. **Backend:** `routers/users.py` → `get_user_profile()` → `VisuOutro.carregarDadosPerfil()`
6. **Backend:** Controller: `EColecionador.buscarUsuario()` + `EColecao.buscarColecao()` (filtra apenas públicas)
7. **Backend:** Retorna `{ perfil: UserPublic, colecoes: List[CollectionPublic] }` (200 OK)
8. **Frontend:** Exibe perfil e coleções públicas

### 4.8. Esqueci Minha Senha / Recuperação de Senha

**Passo 1: Solicitar Recuperação**
1. **Frontend:** Usuário acessa `/forgot-password` e informa email
2. **Frontend:** `ForgotPassword.jsx` → `useForgotPassword.js` → `enviar()` → `solicitarRecuperacao()`
3. **Frontend:** `solicitarRecuperacao()` → `forgotPassword()` (`authService.js`)
4. **HTTP:** POST `http://localhost:8000/api/auth/forgot-password`
   - Body: `{ email: EmailStr }`
5. **Backend:** `routers/auth.py` → `forgot_password()` → `CRecuperarSenha.solicitarRecuperacao()`
6. **Backend:** Controller: `EColecionador.buscarEmail()`, gera token UUID, salva token no usuário, imprime link no console
7. **Backend:** Retorna `{ message: "Verifique seu email" }` (200 OK) ou erro 404
8. **Frontend:** Exibe "Verifique seu email"

**Passo 2: Confirmar Recuperação**
1. **Frontend:** Usuário acessa `/reset-password?token={token}` e informa nova senha
2. **Frontend:** `ResetPassword.jsx` → `resetPassword()` (`authService.js`)
3. **HTTP:** POST `http://localhost:8000/api/auth/reset-password`
   - Body: `{ token: string, new_password: string }`
4. **Backend:** `routers/auth.py` → `reset_password()` → `CRecuperarSenha.confirmar_recuperacao()`
5. **Backend:** Controller: busca usuário pelo token, gera hash da nova senha, atualiza senha e remove token
6. **Backend:** Retorna `{ message: "Senha alterada com sucesso" }` (200 OK) ou erro 400
7. **Frontend:** Redireciona para `/login` com mensagem de sucesso

---

## 5. Relação com o Domínio da Aplicação

### 5.1. Modelos/Entidades Principais

#### **User/Colecionador (`schemas.UserInDB`, `schemas.UserPublic`)**
- **Campos:**
  - `id: int`
  - `name: str`
  - `email: EmailStr`
  - `hashed_password: str` (apenas em `UserInDB`)
  - `bio: Optional[str]`
  - `reset_token: Optional[str]` (apenas em `UserInDB`)
- **Relacionamentos:**
  - Um usuário tem N coleções (`owner_id` em `Collection`)

#### **Coleção (`schemas.CollectionInDB`, `schemas.CollectionPublic`)**
- **Campos:**
  - `id: int`
  - `name: str`
  - `description: Optional[str]`
  - `is_public: bool`
  - `owner_id: int`
  - `image_url: Optional[str]`
  - `value: float` (calculado: soma de `estimated_value * quantity` dos itens)
  - `itemCount: int` (calculado: soma de `quantity` dos itens)
- **Relacionamentos:**
  - Pertence a um usuário (`owner_id`)
  - Uma coleção tem N itens (`collection_id` em `Item`)

#### **Item (`schemas.ItemInDB`, `schemas.ItemPublic`)**
- **Campos:**
  - `id: int`
  - `name: str`
  - `description: Optional[str]`
  - `quantity: int`
  - `estimated_value: float`
  - `collection_id: int`
  - `image_url: Optional[str]`
- **Relacionamentos:**
  - Pertence a uma coleção (`collection_id`)

### 5.2. Reflexão nas Rotas e Interface

**Rotas:**
- `/api/users/{user_id}` → dados do usuário
- `/api/users/{user_id}/profile` → perfil + coleções públicas
- `/api/collections/{user_id}` → coleções do usuário
- `/api/items/collection/{collection_id}` → itens da coleção

**Interface:**
- Dashboard: lista coleções do usuário logado
- CollectionDetails: lista itens de uma coleção
- Social: lista usuários e permite ver coleções públicas de outros

---

## 6. Configuração, Ambiente e Segurança

### 6.1. Configuração

**Arquivos de Configuração:**
- Backend: sem `.env`; URLs hardcoded em `main.py` (CORS)
- Frontend: URLs da API hardcoded nos services (`http://localhost:8000/api`)

**URLs da API no Frontend:**
- `authService.js`: `http://localhost:8000/api/auth/*`
- `collectionService.js`: `const API_URL = 'http://localhost:8000/api'`
- `userService.js`: `const API_URL = 'http://localhost:8000/api'`

**Autenticação/Token:**
- Sem JWT; autenticação baseada em localStorage
- Dados do usuário salvos em `localStorage.setItem('user', JSON.stringify(userData))`
- Logout: `localStorage.removeItem('user')`
- Verificação de autenticação: verifica se existe `localStorage.getItem('user')`

### 6.2. Middlewares de Autenticação/Validação

**Backend:**
- Sem middleware de autenticação JWT
- Validação via Pydantic nos schemas
- CORS configurado em `main.py`

**Frontend:**
- Proteção de rotas: verifica `localStorage.getItem('user')` em `useEffect`; se não existir, redireciona para `/login`

---

## 7. Sugestões e Melhorias

### 7.1. Melhorias na Organização

1. **Variáveis de Ambiente:**
   - Mover URLs da API para `.env` (frontend) e variáveis de ambiente (backend)

2. **Autenticação:**
   - Implementar JWT no backend
   - Middleware de autenticação para rotas protegidas
   - Refresh tokens

3. **Tratamento de Erros:**
   - Centralizar tratamento de erros no frontend
   - Mensagens de erro mais consistentes

4. **Validação:**
   - Validação de formulários no frontend antes de enviar

5. **Persistência:**
   - Migrar de JSON para banco de dados (PostgreSQL, SQLite, etc.)

6. **Nomenclatura:**
   - Padronizar snake_case no backend e camelCase no frontend (já parcialmente feito)

### 7.2. Resumos para Manutenção

**Alterar Fluxo de Login:**
- Frontend: `pages/Auth/Login.jsx`, `hooks/useLoginForm.js`, `services/authService.js`
- Backend: `routers/auth.py` → `login_user()`, `controllers/login.py` → `CVisualizarColec.loginUser()`, `entities/colecionador.py` → `EColecionador.get_user_by_email()`

**Alterar Fluxo de Criação de Coleção:**
- Frontend: `pages/Dashboard/Dashboard.jsx`, `hooks/useDashboard.js`, `services/collectionService.js`
- Backend: `routers/collections.py` → `create_new_collection()`, `controllers/login.py` → `CVisualizarColec.createCollection()`, `entities/colecao.py` → `EColecao.create_collection_in_db()`, `db_json.py` → `create_collection_in_db()`

**Adicionar Novo Endpoint:**
1. Criar schema em `schemas.py`
2. Criar função em `db_json.py` (se necessário)
3. Criar método na entity correspondente
4. Criar método no controller
5. Criar rota no router
6. Registrar router em `main.py`
7. Criar função no service do frontend
8. Usar no hook/componente

---

## Conclusão

O CollectMaster segue uma arquitetura em camadas (Routers → Controllers → Entities → Persistência) no backend e uma estrutura baseada em componentes, hooks e services no frontend. A comunicação é via REST, com autenticação baseada em localStorage. A persistência atual é em arquivos JSON, com possibilidade de migração para banco de dados no futuro.

