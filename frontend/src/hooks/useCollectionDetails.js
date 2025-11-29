import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getCollections, 
  getCollectionItems, 
  createItem, 
  updateItem, 
  deleteItem 
} from '../services/collectionService';

/**
 * Hook customizado que gerencia toda a lógica da página de detalhes de uma coleção.
 * Implementa o fluxo conforme diagrama SD05 - ADICIONAR ITEM.
 * 
 * Conforme diagrama:
 * - FRM-ADDITEM: Componente CollectionDetails.jsx (interface)
 * - infoItem(): Método que recebe dados do item
 * - abrirModal(): Abre o modal de cadastro
 * - salvar(): Confirma a adição do item
 * - atualizarLista(): Atualiza a lista de itens exibida
 */
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

  /**
   * Método infoItem() conforme diagrama SD05.
   * Passo 1: Colecionador informa os dados do item (nome, ano, valor).
   * 
   * Nota: No diagrama menciona "ano", mas no código temos "description", "quantity", "estimatedValue"
   * 
   * @param {string} nome - Nome do item
   * @param {string} description - Descrição do item
   * @param {number} quantity - Quantidade
   * @param {number} estimatedValue - Valor estimado
   * @param {string} imageUrl - URL da imagem
   * @returns {void}
   */
  const infoItem = (nome, description = '', quantity = 1, estimatedValue = '', imageUrl = '') => {
    setNewItemData({ 
      name: nome, 
      description, 
      quantity, 
      estimatedValue, 
      imageUrl
    });
  };

  /**
   * Método abrirModal() conforme diagrama SD05.
   * Passo 1.1: A interface de adição de item abre o modal de cadastro.
   * 
   * @returns {void}
   */
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

  // Mantém handleOpenItemModal para compatibilidade
  const handleOpenItemModal = abrirModal;

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

  /**
   * Atualiza os campos do formulário quando o usuário digita.
   * Este método é usado internamente para atualizar o estado conforme o usuário preenche o formulário.
   * 
   * @param {Event} e - Evento de mudança no input
   * @returns {void}
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Atualiza o estado conforme o usuário digita (parte do infoItem)
    setNewItemData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Método salvar() conforme diagrama SD05.
   * Passo 3: Após preencher os dados, o Colecionador confirma a adição.
   * 
   * Passo 4: Chama adicionarItem(dadosItem, id_colecao)
   * Passo 9: Atualiza a lista de itens
   * 
   * @returns {Promise<void>}
   */
  const salvar = async () => {
    if (!newItemData.name) return;

    let result;

    if (editingItem) {
      // MODO UPDATE: atualiza item existente (não faz parte do diagrama SD05)
      result = await updateItem(editingItem.id, newItemData);
      
      if (result) {
        // Atualiza a lista local substituindo o item antigo
        atualizarLista(result, true); // true = modo edição
      }
    } else {
      // MODO CREATE: cria novo item
      // Passo 4: FRM-ADDITEM → C-VISUALIZARCOLEC: adicionarItem(dadosItem, id_colecao)
      result = await createItem({
        ...newItemData,
        collectionId: id
      });
      
      if (result) {
        // Passo 8: C-VISUALIZARCOLEC retorna item adicionado
        // Passo 9: FRM-ADDITEM atualiza a lista
        atualizarLista(result, false); // false = modo criação
      }
    }

    if (result) {
      handleCloseItemModal();
      // Atualiza totais (opcional: refetch da coleção para garantir sincronia)
      setCollection(prev => {
         // Recalculo simples local para feedback visual rápido
         // (Idealmente buscaria do backend novamente)
         return prev; 
      });
    } else {
      alert("Erro ao salvar item.");
    }
  };

  /**
   * Método atualizarLista() conforme diagrama SD05.
   * Passo 9: FRM-ADDITEM atualiza a interface do usuário.
   * 
   * @param {object} novoItem - Novo item adicionado
   * @param {boolean} isEdit - Se true, atualiza item existente; se false, adiciona novo
   * @returns {void}
   */
  const atualizarLista = (novoItem, isEdit = false) => {
    if (isEdit) {
      setItems(prevItems => prevItems.map(item => 
        item.id === novoItem.id ? novoItem : item
      ));
    } else {
      setItems(prevItems => [...prevItems, novoItem]);
    }
  };

  // Mantém handleSubmitItem para compatibilidade
  const handleSubmitItem = salvar;

  /**
   * Método removerItem() conforme diagrama SD06.
   * Passo 1: Colecionador inicia a remoção de um item.
   * 
   * @param {object|number} itemOrId - Item completo ou ID do item a ser removido
   * @returns {Promise<void>}
   */
  const removerItem = async (itemOrId) => {
    // Normaliza: aceita objeto item ou apenas o id
    const item = typeof itemOrId === 'object' ? itemOrId : items.find(i => i.id === itemOrId);
    if (!item) return;
    
    const idItem = item.id || itemOrId;
    
    // Passo 2: FRM-REMOVERITEM pede confirmação ao usuário
    const confirmado = await confirmar(item);
    
    if (confirmado) {
      // Passo 3: FRM-REMOVERITEM → C-VISUALIZARCOLEC: removerItem(id_item, id_colecao)
      const success = await deleteItem(idItem);
      
      if (success) {
        // Passo 8: C-VISUALIZARCOLEC retorna confirmação
        // Passo 9: FRM-REMOVERITEM atualiza a interface
        atualizarListaRemocao(idItem);
      } else {
        alert("Erro ao excluir item.");
      }
    }
  };

  /**
   * Método confirmar() conforme diagrama SD06.
   * Passo 2: A interface pede confirmação ao usuário.
   * 
   * @param {object} item - Item a ser removido
   * @returns {Promise<boolean>} True se confirmado, False caso contrário
   */
  const confirmar = async (item) => {
    return window.confirm(`Tem certeza que deseja excluir "${item.name}"?`);
  };

  /**
   * Método atualizarLista() conforme diagrama SD06.
   * Passo 9: FRM-REMOVERITEM atualiza a interface.
   * 
   * @param {number} idItemRemovido - ID do item que foi removido
   * @returns {void}
   */
  const atualizarListaRemocao = (idItemRemovido) => {
    setItems(prevItems => prevItems.filter(i => i.id !== idItemRemovido));
  };

  // Mantém handleDeleteItem para compatibilidade
  const handleDeleteItem = removerItem;

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