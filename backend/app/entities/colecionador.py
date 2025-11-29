"""
Entidade E-COLECIONADOR
Responsável por representar e gerenciar a lógica de domínio do colecionador.
Implementa métodos conforme diagramas SD01, SD02, SD03 e SD07.
"""
from typing import Optional, List
from .. import schemas, db_json, security


class EColecionador:
    """
    Entidade de domínio para Colecionador.
    Responsável por criar, buscar e gerenciar colecionadores.
    """
    
    @staticmethod
    def criarUsuario(nome: str, email: str, senha: str) -> Optional[schemas.UserInDB]:
        """
        Cria um novo usuário (colecionador) no sistema.
        
        Conforme diagrama SD01, este método é responsável por:
        - Validar se o email já existe
        - Gerar hash da senha
        - Criar o objeto de domínio
        - Persistir no banco de dados
        
        Args:
            nome: Nome completo do colecionador
            email: Email do colecionador
            senha: Senha em texto plano
            
        Returns:
            UserInDB: Objeto do usuário criado, ou None se email já existe
        """
        # Verifica se email já existe
        usuario_existente = db_json.get_user_by_email(email=email)
        if usuario_existente:
            return None
        
        # Gera hash da senha
        hashed_password = security.get_password_hash(senha)
        
        # Gera novo ID
        all_users = db_json.load_users()
        new_id = len(all_users) + 1
        
        # Cria objeto UserInDB (entidade de domínio)
        user_to_save = schemas.UserInDB(
            id=new_id,
            name=nome,
            email=email,
            hashed_password=hashed_password
        )
        
        # Persiste no banco de dados
        created_user = db_json.create_user(user_to_save)
        
        return created_user
    
    @staticmethod
    def get_user_by_email(email: str) -> Optional[schemas.UserInDB]:
        """
        Busca um usuário (colecionador) pelo email.
        
        Conforme diagrama SD02, este método é responsável por:
        - Buscar o usuário no banco de dados pelo email
        - Retornar os dados do usuário incluindo senha persistida (hash)
        
        Args:
            email: Email do colecionador a ser buscado
            
        Returns:
            UserInDB: Objeto do usuário encontrado, ou None se não existir
        """
        return db_json.get_user_by_email(email=email)
    
    @staticmethod
    def load_users() -> List[schemas.UserInDB]:
        """
        Carrega todos os usuários do banco de dados.
        
        Conforme diagrama SD03, este método é responsável por:
        - Carregar a lista de usuários para validações
        
        Returns:
            List[UserInDB]: Lista de todos os usuários
        """
        return db_json.load_users()
    
    @staticmethod
    def verificaEmailEmUso(email: str, user_id_excluir: int) -> bool:
        """
        Verifica se um email já está em uso por outro usuário.
        
        Conforme diagrama SD03, este método é responsável por:
        - Verificar se o email já está em uso por outro registro
        - Exclui o próprio usuário da verificação (para permitir manter o mesmo email)
        
        Args:
            email: Email a ser verificado
            user_id_excluir: ID do usuário que está sendo editado (para excluir da verificação)
            
        Returns:
            bool: True se o email já está em uso por outro usuário, False caso contrário
        """
        users = db_json.load_users()
        for user in users:
            if user.email == email and user.id != user_id_excluir:
                return True
        return False
    
    @staticmethod
    def update_user_in_db(user_id: int, user_update: schemas.UserUpdate) -> Optional[schemas.UserInDB]:
        """
        Atualiza um usuário no banco de dados.
        
        Conforme diagrama SD03, este método é responsável por:
        - Atualizar os dados do usuário no banco de dados
        - Retornar o usuário atualizado
        
        Args:
            user_id: ID do usuário a ser atualizado
            user_update: Objeto com os dados a serem atualizados
            
        Returns:
            UserInDB: Usuário atualizado, ou None se não encontrado
        """
        return db_json.update_user_in_db(user_id, user_update)
    
    @staticmethod
    def buscarUsuario(id_outro: int) -> Optional[schemas.UserPublic]:
        """
        Busca um usuário (colecionador) pelo ID.
        
        Conforme diagrama SD07, este método é responsável por:
        - Buscar os dados básicos do colecionador alvo (nome, bio, avatar etc.)
        - Retornar apenas dados públicos (sem informações sensíveis)
        
        Args:
            id_outro: ID do colecionador a ser buscado
            
        Returns:
            UserPublic: Objeto com dados públicos do colecionador, ou None se não existir
        """
        users = db_json.load_users()
        user = next((u for u in users if u.id == id_outro), None)
        
        if not user:
            return None
        
        # Retorna apenas dados públicos
        return schemas.UserPublic(
            id=user.id,
            name=user.name,
            email=user.email,
            bio=user.bio
        )

