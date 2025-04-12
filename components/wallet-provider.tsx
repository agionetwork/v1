"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  // Verificar se o usuário já está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        
        if (data.isAuthenticated) {
          setIsConnected(true);
          setAddress(data.user?.address || null);
        }
      } catch (error) {
        console.error("Failed to check authentication status:", error);
      }
    };
    
    checkAuth();
  }, []);

  const connect = async () => {
    try {
      // Redirecionar para a página de login do Civic
      window.location.href = '/api/auth/login';
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  const disconnect = async () => {
    try {
      // Redirecionar para a página de logout do Civic
      window.location.href = '/api/auth/logout';
    } catch (error) {
      console.error("Failed to disconnect wallet:", error);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
} 