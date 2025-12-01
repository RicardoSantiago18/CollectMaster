import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carregarDadosPerfil } from '../services/userService';

/**
 * Hook customizado que gerencia a lógica de carregamento de perfil e coleções de outro usuário.
 * Implementa o fluxo conforme diagrama SD07 - VISUALIZAR OUTRO PERFIL.
 * 
 * Conforme diagrama:
 * - FRM-VISUOUTRO: Componente UserProfile.jsx (interface)
 * - selecionarPerfil(): Método que carrega perfil e coleções
 * 
 * @param {number|string} userId - ID do usuário a visualizar
 * @returns {object} Objeto com estados e dados do perfil
 */
export const useSocialProfile = (userId) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [collections, setCollections] = useState([]);
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

  /**
   * Método selecionarPerfil() conforme diagrama SD07.
   * Passo 1: Colecionador seleciona o perfil de outro usuário.
   * 
   * @param {number} id_outro - ID do colecionador alvo
   * @returns {Promise<void>}
   */
  const selecionarPerfil = async (id_outro) => {
    if (!id_outro) return;

    try {
      // Passo 1.1: FRM-VISUOUTRO → VISUOUTRO: carregarDadosPerfil(id_outro)
      const dadosCompletos = await carregarDadosPerfil(id_outro);
      
      if (dadosCompletos) {
        // Passo 5: VISUOUTRO retorna dados completos (perfil + coleções)
        // Passo 6: FRM-VISUOUTRO atualiza a interface
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

  // Carrega o perfil quando o userId muda
  useEffect(() => {
    if (userId) {
      selecionarPerfil(parseInt(userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    user,
    viewingUser,
    collections,
    loading,
  };
};

