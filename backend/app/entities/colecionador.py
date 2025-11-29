"""
Entidade E-COLECIONADOR
Responsável por representar e gerenciar a lógica de domínio do colecionador.
Implementa métodos conforme diagramas SD01 e SD02.
"""
from typing import Optional
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

