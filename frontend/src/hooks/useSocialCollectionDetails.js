import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/users';
import { getCollections, getCollectionItems } from '../api/collections';

/**
 * Hook customizado que gerencia a lógica de visualização de detalhes de uma coleção
 * de outro usuário (modo somente leitura).
 * 
 * @param {number|string} userId - ID do usuário dono da coleção
 * @param {number|string} collectionId - ID da coleção a visualizar
 * @returns {object} Objeto com estados e dados da coleção
 */
export const useSocialCollectionDetails = (userId, collectionId) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Verifica autenticação do usuário logado
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // Carrega dados da coleção e itens
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !collectionId) return;

      try {
        // Buscar dados do usuário
        const fetchedUser = await getUserById(userId);
        if (!fetchedUser) {
          navigate('/social');
          return;
        }
        setViewingUser(fetchedUser);

        // Buscar coleções do usuário
        const userCollections = await getCollections(userId);
        const foundCollection = userCollections.find(
          (c) => c.id === parseInt(collectionId) || c.id === collectionId
        );

        if (foundCollection) {
          setCollection(foundCollection);
          // Buscar itens da coleção
          const itemsData = await getCollectionItems(collectionId);
          setItems(itemsData || []);
        } else {
          navigate(`/social/user/${userId}`);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        navigate(`/social/user/${userId}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId && collectionId) {
      fetchData();
    }
  }, [userId, collectionId, navigate]);

  return {
    user,
    viewingUser,
    collection,
    items,
    loading,
  };
};

