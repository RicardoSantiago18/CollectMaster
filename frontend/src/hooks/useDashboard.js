import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../services/collectionService'; 

/**
 * Hook customizado que gerencia toda a lógica do Dashboard.
 * Implementa o fluxo conforme diagrama SD04 - CRIAR COLEÇÃO.
 * 
 * Conforme diagrama:
 * - FRM-CRIARCOLEC: Componente Dashboard.jsx (interface)
 * - criarNovaColecao(): Método que aciona a criação
 * - abrirModal(): Abre o modal de criação
 * - preencherInfo(): Preenche os campos do formulário
 * - criarColecao(): Confirma a criação
 * - fecharModal(): Fecha o modal após sucesso
 * - atualizarColecoes(): Atualiza o estado com a nova coleção
 * - exibirColecao(): Exibe a nova coleção na interface
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  
  // Estados do Modal e Formulário
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null); // Se não for null, estamos editando
  
  // Um estado único para o formulário facilita
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    isPublic: true
  });

  // Verifica se há usuário autenticado, redireciona para login se não houver
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // Busca as coleções do usuário quando o usuário é carregado
  useEffect(() => {
    if (user) { 
      const fetchCollections = async () => {
        const userCollections = await getCollections(user.id); 
        setCollections(userCollections);
      };
      fetchCollections();
    }
  }, [user]);

  /**
   * Método criarNovaColecao() conforme diagrama SD04.
   * Passo 1: Colecionador inicia a criação de uma nova coleção.
   * 
   * @returns {void}
   */
  const criarNovaColecao = () => {
    // Passo 1.1: FRM-CRIARCOLEC abre o modal
    abrirModal();
  };

  /**
   * Método abrirModal() conforme diagrama SD04.
   * Passo 1.1: Abre o modal ou tela de criação.
   * 
   * @returns {void}
   */
  const abrirModal = () => {
    setEditingCollection(null); // Garante modo criação
    setFormData({ name: '', description: '', imageUrl: '', isPublic: true });
    setOpenCreateModal(true);
  };

  // Mantém handleOpenCreateModal para compatibilidade
  const handleOpenCreateModal = criarNovaColecao;

  // Abre o modal preenchido com os dados da coleção para edição
  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description || '',
      imageUrl: collection.image_url || '', // Backend manda snake_case
      isPublic: collection.is_public ?? true
    });
    setOpenCreateModal(true);
  };

  /**
   * Método fecharModal() conforme diagrama SD04.
   * Passo 3.2: Fecha o modal após criação bem-sucedida.
   * 
   * @returns {void}
   */
  const fecharModal = () => {
    setOpenCreateModal(false);
    setEditingCollection(null);
  };

  // Mantém handleCloseCreateModal para compatibilidade
  const handleCloseCreateModal = fecharModal;

  /**
   * Método preencherInfo() conforme diagrama SD04.
   * Passo 2: Colecionador preenche os campos do formulário.
   * 
   * @param {Event} e - Evento de mudança no input
   * @returns {void}
   */
  const preencherInfo = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Mantém handleInputChange para compatibilidade
  const handleInputChange = preencherInfo;

  /**
   * Método criarColecao() conforme diagrama SD04.
   * Passo 3: Colecionador confirma a criação.
   * 
   * Passo 3.1: Chama createCollection(dados)
   * Passo 3.2: Fecha o modal
   * Passo 4: Atualiza coleções
   * Passo 5: Exibe coleção
   * 
   * @returns {Promise<void>}
   */
  const criarColecao = async () => {
    if (!formData.name.trim()) return;
    if (!user) return;
    
    let result;

    if (editingCollection) {
        // MODO EDIÇÃO: atualiza coleção existente
        result = await updateCollection(editingCollection.id, formData);
        if (result) {
            atualizarColecoes(result, true); // true = modo edição
        }
    } else {
        // MODO CRIAÇÃO: cria nova coleção
        // Passo 3.1: FRM-CRIARCOLEC → C-COLECOES: createCollection(dados)
        result = await createCollection({
            ...formData,
            ownerId: user.id
        });
        if (result) {
            // Passo 8: C-COLECOES retorna nova coleção
            // Passo 3.2: FRM-CRIARCOLEC fecha o modal
            fecharModal();
            // Passo 4: FRM-CRIARCOLEC atualiza coleções
            atualizarColecoes(result, false); // false = modo criação
            // Passo 5: Exibe coleção (já está na lista atualizada)
        }
    }

    if (!result) {
        alert("Erro ao salvar coleção.");
    }
  };

  /**
   * Método atualizarColecoes() conforme diagrama SD04.
   * Passo 4: Atualiza o estado da lista de coleções.
   * 
   * @param {object} novaColecao - Nova coleção criada
   * @param {boolean} isEdit - Se true, atualiza coleção existente; se false, adiciona nova
   * @returns {void}
   */
  const atualizarColecoes = (novaColecao, isEdit = false) => {
    if (isEdit) {
      setCollections(prev => prev.map(col => col.id === novaColecao.id ? novaColecao : col));
    } else {
      setCollections(prev => [...prev, novaColecao]);
    }
  };

  // Mantém handleSubmitCollection para compatibilidade
  const handleSubmitCollection = criarColecao;

  // Exclui uma coleção após confirmação do usuário
  const handleDeleteCollection = async (collection) => {
    if (window.confirm(`Tem certeza que deseja excluir a coleção "${collection.name}"? Todos os itens dela também serão apagados.`)) {
      const success = await deleteCollection(collection.id);
      if (success) {
        // Remove da lista localmente para atualizar a tela sem recarregar
        setCollections(prev => prev.filter(c => c.id !== collection.id));
      } else {
        alert("Erro ao excluir a coleção.");
      }
    }
  };

  return {
    user,
    collections,
    openCreateModal,
    formData, // Exportamos o objeto inteiro
    editingCollection,
    handleOpenCreateModal,
    handleEditCollection, // Exportamos o novo handler
    handleCloseCreateModal,
    handleSubmitCollection,
    handleInputChange, // Handler genérico para inputs
    handleDeleteCollection
  };
};
