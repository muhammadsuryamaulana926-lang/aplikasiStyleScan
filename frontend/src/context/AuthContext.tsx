import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id_pengguna: number;
  nama_pengguna: string;
  email: string;
  foto?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as any);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@user_data');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Gagal memuat sesi user', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (userData: User) => {
    try {
      await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Gagal menyimpan sesi', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user_data');
      setUser(null);
    } catch (error) {
      console.error('Gagal menghapus sesi', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
