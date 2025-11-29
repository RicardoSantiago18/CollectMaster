# Estrutura do Backend - Organizada por Diagramas de Sequência

Esta estrutura foi organizada para seguir os diagramas de sequência do projeto, especialmente o **SD01 - REALIZAR CADASTRO**.

## Estrutura de Pastas

```
backend/app/
├── entities/           # Entidades de domínio (E-*)
│   ├── __init__.py
│   └── colecionador.py # E-COLECIONADOR
│
├── controllers/        # Controllers (C-*)
│   ├── __init__.py
│   └── cadastro.py     # C-CADASTRO
│
├── routers/            # Rotas HTTP (FastAPI)
│   ├── auth.py         # Endpoints de autenticação
│   ├── collections.py
│   ├── items.py
│   └── users.py
│
├── schemas.py          # Modelos Pydantic
├── security.py         # Funções de segurança (hash, verificação)
├── db_json.py          # Persistência em JSON
└── main.py             # Aplicação FastAPI principal
```

## Fluxo SD01 - REALIZAR CADASTRO

### Participantes

1. **FRM-CADASTRO**: Interface de cadastro (frontend)
2. **C-CADASTRO**: Controller de cadastro (`controllers/cadastro.py`)
3. **E-COLECIONADOR**: Entidade de domínio (`entities/colecionador.py`)

### Fluxo de Chamadas

```
1. Colecionador → FRM-CADASTRO: infoCadastro()
   └─ frontend/src/hooks/useRegisterForm.js (método infoCadastro)

2. FRM-CADASTRO → C-CADASTRO: criarUsuario(nome, email, senha)
   └─ frontend/src/services/authService.js (método criarUsuario)
   └─ backend/app/routers/auth.py (endpoint /register)
   └─ backend/app/controllers/cadastro.py (CCadastro.criarUsuario)

3. C-CADASTRO → E-COLECIONADOR: criarUsuario()
   └─ backend/app/entities/colecionador.py (EColecionador.criarUsuario)

4. E-COLECIONADOR → C-CADASTRO: retorna cadastro
   └─ Retorna UserInDB

5. C-CADASTRO → FRM-CADASTRO: retorna cadastro
   └─ Retorna UserPublic

6. FRM-CADASTRO → Colecionador: confirmaçãoCadastro
   └─ Redireciona para /login com mensagem de sucesso
```

## Arquivos Principais

### `entities/colecionador.py` (E-COLECIONADOR)
- **Responsabilidade**: Lógica de domínio do colecionador
- **Método principal**: `criarUsuario(nome, email, senha)`
- **Funções**: Validação, hash de senha, persistência

### `controllers/cadastro.py` (C-CADASTRO)
- **Responsabilidade**: Lógica de controle do caso de uso
- **Método principal**: `criarUsuario(nome, email, senha)`
- **Funções**: Recebe requisições, delega para entidade, retorna resposta

### `routers/auth.py`
- **Responsabilidade**: Endpoints HTTP
- **Função**: Recebe requisições HTTP e chama o controller

## Convenções de Nomenclatura

- **Entidades**: `E-*` (ex: `EColecionador`)
- **Controllers**: `C-*` (ex: `CCadastro`)
- **Métodos**: Seguem o diagrama (ex: `criarUsuario`, `infoCadastro`)

