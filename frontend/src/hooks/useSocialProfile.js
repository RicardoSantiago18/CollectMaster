import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarDadosPerfil } from '../api/users';

/**
 * Hook customizado que gerencia a lógica de carregamento de perfil e coleções de outro usuário.
 */
export const useSocialProfile = (userId) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);



  const selecionarPerfil = async (id_outro) => {
    if (!id_outro) return;

    try {
      const dadosCompletos = await carregarDadosPerfil(id_outro);
      
      if (dadosCompletos) {
        setViewingUser(dadosCompletos.perfil);
        setCollections(dadosCompletos.colecoes || []);
      } else {
        navigate('/social');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      navigate('/social');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (userId) {
      selecionarPerfil(parseInt(userId));
    }
  }, [userId]);

  return {
    user,
    viewingUser,
    collections,
    loading,
  };
};

