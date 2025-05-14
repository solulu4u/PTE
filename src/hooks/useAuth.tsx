import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, User } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = localStorage.getItem('pte_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Placeholder for Supabase login
      const fakeUser: User = {
        id: 1,
        username: email.split('@')[0],
        email,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        user_role: 'student',
        subscription_status: 'free',
        subscription_end_date: null,
      };
      
      setUser(fakeUser);
      localStorage.setItem('pte_user', JSON.stringify(fakeUser));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      // Placeholder for Supabase registration
      const fakeUser: User = {
        id: 1,
        username,
        email,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
        user_role: 'student',
        subscription_status: 'free',
        subscription_end_date: null,
      };
      
      setUser(fakeUser);
      localStorage.setItem('pte_user', JSON.stringify(fakeUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Placeholder for Supabase logout
      setUser(null);
      localStorage.removeItem('pte_user');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};