import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider } from '@project-serum/anchor';
import { PublicKey, SystemProgram } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { SOLANA_CONFIG } from '@/config/solana';
import { BN } from '@project-serum/anchor';

// Interface temporária até gerarmos o IDL
interface LoanProgram {
    methods: {
        initializeLoan(amount: BN, interestRate: number, duration: number): {
            accounts(accounts: any): { rpc(): Promise<string> };
        };
        repayLoan(): {
            accounts(accounts: any): { rpc(): Promise<string> };
        };
    };
    programId: PublicKey;
}

export const useLoanContract = () => {
    const { connection } = useConnection();
    const wallet = useWallet();

    const getProvider = () => {
        if (!wallet.publicKey || !wallet.signTransaction) return null;
        return new AnchorProvider(connection, wallet as any, {});
    };

    const getProgram = () => {
        const provider = getProvider();
        if (!provider) return null;

        const programId = new PublicKey(SOLANA_CONFIG.PROGRAM_ID);
        return new Program({} as any, programId, provider) as unknown as LoanProgram;
    };

    const createLoan = async (amount: number, interestRate: number, duration: number) => {
        const program = getProgram();
        if (!program || !wallet.publicKey) throw new Error('Wallet not connected');

        const [loanPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(SOLANA_CONFIG.LOAN_SEED), wallet.publicKey.toBuffer()],
            program.programId
        );

        try {
            const tx = await program.methods
                .initializeLoan(
                    new BN(amount),
                    interestRate,
                    duration
                )
                .accounts({
                    borrower: wallet.publicKey,
                    loan: loanPDA,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();

            return tx;
        } catch (error) {
            console.error('Error creating loan:', error);
            throw error;
        }
    };

    const repayLoan = async (loanPDA: PublicKey) => {
        const program = getProgram();
        if (!program || !wallet.publicKey) throw new Error('Wallet not connected');

        try {
            const tx = await program.methods
                .repayLoan()
                .accounts({
                    borrower: wallet.publicKey,
                    loan: loanPDA,
                    borrowerTokenAccount: wallet.publicKey, // Você precisará implementar a lógica correta aqui
                    lenderTokenAccount: wallet.publicKey, // Você precisará implementar a lógica correta aqui
                    tokenProgram: TOKEN_PROGRAM_ID,
                })
                .rpc();

            return tx;
        } catch (error) {
            console.error('Error repaying loan:', error);
            throw error;
        }
    };

    return {
        createLoan,
        repayLoan,
    };
}; 