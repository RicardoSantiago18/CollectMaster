import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../services/collectionService'; 

// Hook customizado que gerencia toda a lógica do Dashboard
// Retorna estados e funções para gerenciar coleções, modais e formulários
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

  // Abre o modal para criar uma nova coleção (limpa o formulário)
  const handleOpenCreateModal = () => {
    setEditingCollection(null); // Garante modo criação
    setFormData({ name: '', description: '', imageUrl: '', isPublic: true });
    setOpenCreateModal(true);
  };

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

  // Fecha o modal e limpa o estado de edição
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setEditingCollection(null);
  };

  // Atualiza os campos do formulário quando o usuário digita
  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Salva ou atualiza uma coleção (criação ou edição)
  const handleSubmitCollection = async () => {
    if (!formData.name.trim()) return;
    if (!user) return;
    
    let result;

    if (editingCollection) {
        // MODO EDIÇÃO: atualiza coleção existente
        result = await updateCollection(editingCollection.id, formData);
        if (result) {
            setCollections(prev => prev.map(col => col.id === editingCollection.id ? result : col));
        }
    } else {
        // MODO CRIAÇÃO: cria nova coleção
        result = await createCollection({
            ...formData,
            ownerId: user.id
        });
        if (result) {
            setCollections([...collections, result]);
        }
    }

    if (result) {
        handleCloseCreateModal();
    } else {
        alert("Erro ao salvar coleção.");
    }
  };

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