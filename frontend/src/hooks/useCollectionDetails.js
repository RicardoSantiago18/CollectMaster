import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getCollections, 
  getCollectionItems, 
  createItem, 
  updateItem, 
  deleteItem 
} from '../api/collections';


export const useCollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [openItemModal, setOpenItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemData, setNewItemData] = useState({
    name: '',
    description: '',
    quantity: 1,
    estimatedValue: '',
    imageUrl: '' 
  });

  // Carrega os dados da coleção e seus itens quando o componente é montado
  // Verifica autenticação e busca a coleção pelo ID da URL
  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      try {
        const allCollections = await getCollections(parsedUser.id);
        const found = allCollections.find(c => c.id == id);
        
        if (found) {
          setCollection(found);
          const realItems = await getCollectionItems(id);
          setItems(realItems);
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  // --- HANDLERS ---


  const infoItem = (nome, description = '', quantity = 1, estimatedValue = '', imageUrl = '') => {
    setNewItemData({ 
      name: nome, 
      description, 
      quantity, 
      estimatedValue, 
      imageUrl
    });
  };


  const abrirModal = () => {
    setEditingItem(null); 
    setNewItemData({ 
      name: '', 
      description: '', 
      quantity: 1, 
      estimatedValue: '', 
      imageUrl: ''
    });
    setOpenItemModal(true);
  };

  const handleOpenItemModal = abrirModal;

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItemData({
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      estimatedValue: item.estimated_value 
    });
    setOpenItemModal(true);
  };
  
  const handleCloseItemModal = () => {
    setOpenItemModal(false);
    setEditingItem(null);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData(prev => ({ ...prev, [name]: value }));
  };


  const salvar = async () => {
    if (!newItemData.name) return;

    let result;

    if (editingItem) {
      result = await updateItem(editingItem.id, newItemData);
      
      if (result) {
        atualizarLista(result, true);
      }
    } else {
      result = await createItem({
        ...newItemData,
        collectionId: id
      });
      
      if (result) {
        atualizarLista(result, false);
      }
    }

    if (result) {
      handleCloseItemModal();
      setCollection(prev => {
         return prev; 
      });
    } else {
      alert("Erro ao salvar item.");
    }
  };


  const atualizarLista = (novoItem, isEdit = false) => {
    if (isEdit) {
      setItems(prevItems => prevItems.map(item => 
        item.id === novoItem.id ? novoItem : item
      ));
    } else {
      setItems(prevItems => [...prevItems, novoItem]);
    }
  };


  const handleSubmitItem = salvar;


  const removerItem = async (itemOrId) => {
    const item = typeof itemOrId === 'object' ? itemOrId : items.find(i => i.id === itemOrId);
    if (!item) return;
    
    const idItem = item.id || itemOrId;
    
    const confirmado = await confirmar(item);
    
    if (confirmado) {
      const success = await deleteItem(idItem);
      
      if (success) {
        atualizarListaRemocao(idItem);
      } else {
        alert("Erro ao excluir item.");
      }
    }
  };


  const confirmar = async (item) => {
    return window.confirm(`Tem certeza que deseja excluir "${item.name}"?`);
  };


  const atualizarListaRemocao = (idItemRemovido) => {
    setItems(prevItems => prevItems.filter(i => i.id !== idItemRemovido));
  };


  const handleDeleteItem = removerItem;

  return {
    user,
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    editingItem,
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem,
    handleEditItem,
    handleDeleteItem
  };
};