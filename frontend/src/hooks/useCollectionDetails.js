import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getCollections, 
  getCollectionItems, 
  createItem, 
  updateItem, 
  deleteItem 
} from '../services/collectionService';

// Hook customizado que gerencia toda a lógica da página de detalhes de uma coleção
// Retorna estados e funções para gerenciar a coleção, seus itens e modais
export const useCollectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados do Modal
  const [openItemModal, setOpenItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Guarda o item sendo editado
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
        // Garante comparação correta (string vs number)
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

  // Abre o modal para criar um novo item (limpa o formulário)
  const handleOpenItemModal = () => {
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

  // Abre o modal preenchido com os dados do item para edição
  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItemData({
      name: item.name,
      description: item.description || '',
      quantity: item.quantity,
      // O backend manda 'estimated_value', mas o form usa 'estimatedValue'
      estimatedValue: item.estimated_value 
    });
    setOpenItemModal(true);
  };
  
  // Fecha o modal e limpa o estado de edição
  const handleCloseItemModal = () => {
    setOpenItemModal(false);
    setEditingItem(null);
  };

  // Atualiza os campos do formulário quando o usuário digita
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItemData(prev => ({ ...prev, [name]: value }));
  };

  // Salva ou atualiza um item (criação ou edição)
  // Detecta automaticamente se está criando ou editando baseado no editingItem
  const handleSubmitItem = async () => {
    if (!newItemData.name) return;

    let result;

    if (editingItem) {
      // MODO UPDATE: atualiza item existente
      result = await updateItem(editingItem.id, newItemData);
      
      if (result) {
        // Atualiza a lista local substituindo o item antigo
        setItems(prevItems => prevItems.map(item => 
          item.id === editingItem.id ? result : item
        ));
      }
    } else {
      // MODO CREATE: cria novo item
      result = await createItem({
        ...newItemData,
        collectionId: id
      });
      
      if (result) {
        setItems([...items, result]);
      }
    }

    if (result) {
      handleCloseItemModal();
      // Atualiza totais (opcional: refetch da coleção para garantir sincronia)
      // Se quiser atualizar o card de cima imediatamente:
      setCollection(prev => {
         // Recalculo simples local para feedback visual rápido
         // (Idealmente buscaria do backend novamente)
         return prev; 
      });
    } else {
      alert("Erro ao salvar item.");
    }
  };

  // Exclui um item após confirmação do usuário
  const handleDeleteItem = async (item) => {
    if (window.confirm(`Tem certeza que deseja excluir "${item.name}"?`)) {
      const success = await deleteItem(item.id);
      if (success) {
        setItems(prevItems => prevItems.filter(i => i.id !== item.id));
      } else {
        alert("Erro ao excluir item.");
      }
    }
  };

  return {
    user,
    collection,
    items,
    loading,
    openItemModal,
    newItemData,
    editingItem, // NOVO
    handleOpenItemModal,
    handleCloseItemModal,
    handleInputChange,
    handleSubmitItem,
    handleEditItem,   // NOVO
    handleDeleteItem  // NOVO
  };
};