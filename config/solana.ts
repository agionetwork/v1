import { clusterApiUrl } from '@solana/web3.js';

export const SOLANA_CONFIG = {
    RPC_URL: process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl('devnet'),
    PROGRAM_ID: process.env.NEXT_PUBLIC_PROGRAM_ID || 'Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS',
    LOAN_SEED: 'loan',
}; 