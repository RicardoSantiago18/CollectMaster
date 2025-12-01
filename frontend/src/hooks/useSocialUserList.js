import { useState, useEffect, useMemo } from 'react';
import { getAllUsers, searchUsers } from '../api/users';

/**
 * Hook customizado que gerencia a lógica de busca e listagem de usuários para a página Social.
 */
export const useSocialUserList = (searchQuery = '') => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Buscar usuários
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        let allUsers;
        
        if (debouncedSearchQuery.trim()) {
          allUsers = await searchUsers(debouncedSearchQuery);
        } else {
          allUsers = await getAllUsers();
        }
        
        setUsers(allUsers || []);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery]);


  const filteredUsers = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return users;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();
    return users.filter((user) => {
      const name = (user.name || '').toLowerCase();
      return name.includes(query);
    });
  }, [users, debouncedSearchQuery]);

  return {
    users: filteredUsers,
    loading,
    searchQuery: debouncedSearchQuery,
  };
};

