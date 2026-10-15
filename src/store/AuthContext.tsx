import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { MOCK_CUSTOMERS } from '../data/mockCustomers';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  loginAsDemo: (role: UserRole, specificEmail?: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('bodycraft_tn_user');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        localStorage.removeItem('bodycraft_tn_user');
        return null;
      }
    }
    return null;
  });

  const login = (email: string, role: UserRole = 'CUSTOMER') => {
    const found = MOCK_CUSTOMERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      localStorage.setItem('bodycraft_tn_user', JSON.stringify(found));
      return true;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      phone: '+91 98400 12345',
      role: role,
      customerType: 'Transport Operator',
      district: 'Karur',
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('bodycraft_tn_user', JSON.stringify(newUser));
    return true;
  };

  const loginAsDemo = (role: UserRole, specificEmail?: string) => {
    if (specificEmail) {
      const match = MOCK_CUSTOMERS.find(u => u.email === specificEmail);
      if (match) {
        setUser(match);
        localStorage.setItem('bodycraft_tn_user', JSON.stringify(match));
        return;
      }
    }
    if (role === 'ADMIN') {
      const admin = MOCK_CUSTOMERS.find(u => u.role === 'ADMIN') || MOCK_CUSTOMERS[4];
      setUser(admin);
      localStorage.setItem('bodycraft_tn_user', JSON.stringify(admin));
    } else if (role === 'WORKSHOP_OWNER') {
      const workshop = MOCK_CUSTOMERS.find(u => u.role === 'WORKSHOP_OWNER') || MOCK_CUSTOMERS[2];
      setUser(workshop);
      localStorage.setItem('bodycraft_tn_user', JSON.stringify(workshop));
    } else {
      const customer = MOCK_CUSTOMERS[0];
      setUser(customer);
      localStorage.setItem('bodycraft_tn_user', JSON.stringify(customer));
    }
  };

  const switchRole = (role: UserRole) => {
    loginAsDemo(role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bodycraft_tn_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsDemo, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
