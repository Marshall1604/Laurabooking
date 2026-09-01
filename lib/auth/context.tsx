'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { type AuthUser, DEMO_USERS } from './index';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (provider: string, emailOrToken?: string) => Promise<boolean>;
  logout: () => void;
  quickLogin: (type: 'vip' | 'member' | 'admin') => void;
  updateProfile: (data: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for persisted session
    try {
      const savedUser = localStorage.getItem('aurelis_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Default to VIP demo user for a rich luxury preview experience
        setUser(DEMO_USERS.vip);
      }
    } catch {
      setUser(DEMO_USERS.vip);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (provider: string, emailOrToken?: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate auth latency
    await new Promise((r) => setTimeout(r, 600));

    let loggedUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: emailOrToken || 'guest@aurelis.vip',
      fullName: emailOrToken ? emailOrToken.split('@')[0] : 'Discreet Member',
      role: 'member',
      membershipTier: 'Single Access Pass',
      preferredLocale: 'en',
      memberSince: '2026',
    };

    if (emailOrToken?.includes('admin')) {
      loggedUser = DEMO_USERS.admin;
    } else if (emailOrToken?.includes('vip') || provider === 'google') {
      loggedUser = DEMO_USERS.vip;
    }

    setUser(loggedUser);
    localStorage.setItem('aurelis_auth_user', JSON.stringify(loggedUser));
    setIsLoading(false);
    return true;
  };

  const quickLogin = (type: 'vip' | 'member' | 'admin') => {
    const selected = DEMO_USERS[type];
    setUser(selected);
    localStorage.setItem('aurelis_auth_user', JSON.stringify(selected));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aurelis_auth_user');
  };

  const updateProfile = (data: Partial<AuthUser>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('aurelis_auth_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, quickLogin, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
