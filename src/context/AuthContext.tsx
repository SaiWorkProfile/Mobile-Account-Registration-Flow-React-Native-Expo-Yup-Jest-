import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// USER TYPE
export type User = {
  email: string;
  name?: string;
};

// CONTEXT TYPE
interface AuthContextType {
  user: User | null;
  register: (userData: User) => Promise<void>;
  login: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// PROVIDER PROPS
interface AuthProviderProps {
  children: ReactNode;
}

// CREATE CONTEXT
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// PROVIDER
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Load session on app start
  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    const savedUser = await AsyncStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  // Register user
  const register = async (userData: User) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Login with email only (since no backend)
  const login = async (email: string) => {
    const savedUser = await AsyncStorage.getItem('user');
    if (!savedUser) return false;

    const parsedUser: User = JSON.parse(savedUser);

    if (parsedUser.email === email) {
      setUser(parsedUser);
      return true;
    }
    return false;
  };

  // Logout
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// HOOK
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
