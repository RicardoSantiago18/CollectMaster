from typing import Optional, List
from .. import schemas, db_json, security


class EColecionador:
    
    """
    Conforme diagrama SD01:
    - Recebe dados da interface (FRM-CADASTRO)
    - Cria o usuário em E-COLECIONADOR (criarUsuario)
    - Retorna o usuário criado
    """
    @staticmethod
    def criarUsuario(nome: str, email: str, senha: str) -> Optional[schemas.UserInDB]:

        usuario_existente = db_json.get_user_by_email(email=email)
        if usuario_existente:
            return None
        
        hashed_password = security.get_password_hash(senha)
        
        all_users = db_json.load_users()
        new_id = len(all_users) + 1
        
        user_to_save = schemas.UserInDB(
            id=new_id,
            name=nome,
            email=email,
            hashed_password=hashed_password
        )
        
        created_user = db_json.create_user(user_to_save)
        
        return created_user
    
    
    """
    Conforme diagrama SD02:
    - Recebe email da interface (FRM-REALIZARLOGIN)
    - Busca o usuário em E-COLEÇÃO (buscarEmail)
    - Retorna o usuário encontrado
    """
    @staticmethod
    def get_user_by_email(email: str) -> Optional[schemas.UserInDB]:
        return db_json.get_user_by_email(email=email)
    


    """
    Conforme diagrama SD03:
    - Carrega todos os usuários do banco de dados (load_users)
    - Retorna a lista de usuários encontrados
    """
    @staticmethod
    def load_users() -> List[schemas.UserInDB]:
        return db_json.load_users()
    

    """
    Conforme diagrama SD03:
    - Recebe email e user_id_excluir da interface (FRM-EDITARPERFIL)
    - Verifica se o email já está em uso por outro usuário
    - Retorna True se o email já está em uso, False caso contrário
    """
    @staticmethod
    def verificaEmailEmUso(email: str, user_id_excluir: int) -> bool:
    
        users = db_json.load_users()
        for user in users:
            if user.email == email and user.id != user_id_excluir:
                return True
        return False
    
    """
    Conforme diagrama SD03:
    - Atualizar os dados do usuário no banco de dados
    - Retornar o usuário atualizado
    """
    @staticmethod
    def update_user_in_db(user_id: int, user_update: schemas.UserUpdate) -> Optional[schemas.UserInDB]:
        return db_json.update_user_in_db(user_id, user_update)
    

    """
    Conforme diagrama SD07:
    - Recebe id_outro da interface (FRM-VISUOUTRO)
    - Busca o usuário em E-COLEÇÃO (buscarUsuario)
    - Retorna o usuário encontrado
    """
    @staticmethod
    def buscarUsuario(id_outro: int) -> Optional[schemas.UserPublic]:
        
        users = db_json.load_users()
        user = next((u for u in users if u.id == id_outro), None)
        
        if not user:
            return None
        
        return schemas.UserPublic(
            id=user.id,
            name=user.name,
            email=user.email,
            bio=user.bio
        )
    
    
    """
    Conforme diagrama SD08:
    - Recebe email da interface (FRM-VISUOUTRO)
    - Busca o usuário em E-COLEÇÃO (buscarEmail)
    - Retorna o usuário encontrado
    """
    @staticmethod
    def buscarEmail(email: str) -> Optional[schemas.UserInDB]:
        return db_json.get_user_by_email(email=email)

