import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    fullName: 'Admin User',
    email: 'admin@durian.com',
    role: 'admin',
    phoneNumber: '+62123456789',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'employee',
    fullName: 'Sample Employee',
    email: 'employee@durian.com',
    role: 'employee',
    phoneNumber: '+62987654321',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('durianAppUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    
    // Simulate API call with some delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user (this would be an API call in a real app)
    const foundUser = MOCK_USERS.find(u => u.username === username);
    
    if (!foundUser || password !== 'password') {
      setLoading(false);
      throw new Error('Invalid credentials');
    }
    
    // Store user in local storage
    localStorage.setItem('durianAppUser', JSON.stringify(foundUser));
    setUser(foundUser);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('durianAppUser');
    setUser(null);
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    
    // Simulate API call with some delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would be an API call to register the user
    const newUser: User = {
      id: String(Date.now()),
      username: userData.username || '',
      fullName: userData.fullName || '',
      email: userData.email || '',
      role: 'employee', // Default role for registration
      createdAt: new Date().toISOString(),
      phoneNumber: userData.phoneNumber,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150',
    };

    // In a real app, we would post this to an API
    console.log('Registered new user:', newUser);
    
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
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