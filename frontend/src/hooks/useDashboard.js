import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections, createCollection, updateCollection, deleteCollection } from '../api/collections'; 

/**
 * Hook customizado que gerencia toda a lógica do Dashboard.
 */
export const useDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [collections, setCollections] = useState([]);
  
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    isPublic: true
  });


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);


  useEffect(() => {
    if (user) { 
      const fetchCollections = async () => {
        const userCollections = await getCollections(user.id); 
        setCollections(userCollections);
      };
      fetchCollections();
    }
  }, [user]);



  const criarNovaColecao = () => {
    abrirModal();
  };


  const abrirModal = () => {
    setEditingCollection(null);
    setFormData({ name: '', description: '', imageUrl: '', isPublic: true });
    setOpenCreateModal(true);
  };


  const handleOpenCreateModal = criarNovaColecao;

  
  const handleEditCollection = (collection) => {
    setEditingCollection(collection);
    setFormData({
      name: collection.name,
      description: collection.description || '',
      imageUrl: collection.image_url || '',
      isPublic: collection.is_public ?? true
    });
    setOpenCreateModal(true);
  };


  const fecharModal = () => {
    setOpenCreateModal(false);
    setEditingCollection(null);
  };

  
  const handleCloseCreateModal = fecharModal;

  
  const preencherInfo = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
    }));
  };

 
  const handleInputChange = preencherInfo;


  const criarColecao = async () => {
    if (!formData.name.trim()) return;
    if (!user) return;
    
    let result;

    if (editingCollection) {
        result = await updateCollection(editingCollection.id, formData);
        if (result) {
            atualizarColecoes(result, true);
        }
    } else {
        result = await createCollection({
            ...formData,
            ownerId: user.id
        });
        if (result) {
            fecharModal();
            atualizarColecoes(result, false);
        }
    }

    if (!result) {
        alert("Erro ao salvar coleção.");
    }
  };


  const atualizarColecoes = (novaColecao, isEdit = false) => {
    if (isEdit) {
      setCollections(prev => prev.map(col => col.id === novaColecao.id ? novaColecao : col));
    } else {
      setCollections(prev => [...prev, novaColecao]);
    }
  };

  const handleSubmitCollection = criarColecao;


  const handleDeleteCollection = async (collection) => {
    if (window.confirm(`Tem certeza que deseja excluir a coleção "${collection.name}"? Todos os itens dela também serão apagados.`)) {
      const success = await deleteCollection(collection.id);
      if (success) {
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
    formData,
    editingCollection,
    handleOpenCreateModal,
    handleEditCollection,
    handleCloseCreateModal,
    handleSubmitCollection,
    handleInputChange,
    handleDeleteCollection
  };
};
