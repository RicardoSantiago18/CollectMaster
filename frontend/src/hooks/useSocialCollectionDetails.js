import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../api/users';
import { getCollections, getCollectionItems } from '../api/collections';

/**
 * Hook customizado que gerencia a lógica de visualização de detalhes de uma coleção
 * de outro usuário (modo somente leitura).
 */
export const useSocialCollectionDetails = (userId, collectionId) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collection, setCollection] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);


  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !collectionId) return;

      try {

        const fetchedUser = await getUserById(userId);
        if (!fetchedUser) {
          navigate('/social');
          return;
        }
        setViewingUser(fetchedUser);

        const userCollections = await getCollections(userId);
        const foundCollection = userCollections.find(
          (c) => c.id === parseInt(collectionId) || c.id === collectionId
        );

        if (foundCollection) {
          setCollection(foundCollection);
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

