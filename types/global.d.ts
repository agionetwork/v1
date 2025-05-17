// Definindo os tipos para o objeto window
interface Window {
  // Propriedades para detectar Phantom
  solana?: {
    connect: () => Promise<{ publicKey: string }>;
    disconnect: () => Promise<void>;
    signTransaction: (transaction: any) => Promise<any>;
    signAllTransactions: (transactions: any[]) => Promise<any[]>;
    isPhantom?: boolean;
  };
  
  // Propriedades para detectar Solflare
  solflare?: {
    connect: () => Promise<{ publicKey: string }>;
    disconnect: () => Promise<void>;
    signTransaction: (transaction: any) => Promise<any>;
    signAllTransactions: (transactions: any[]) => Promise<any[]>;
    isSolflare?: boolean;
  };
  
  // Propriedades para detectar Backpack
  backpack?: {
    connect: () => Promise<{ publicKey: string }>;
    disconnect: () => Promise<void>;
    signTransaction: (transaction: any) => Promise<any>;
    signAllTransactions: (transactions: any[]) => Promise<any[]>;
    isBackpack?: boolean;
  };
} 