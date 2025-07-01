use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("5RWvthGiq4HQbATBQypgM81J4ioQg37UwPqyigjP7vJZ");

#[program]
pub mod loan_program {
    use super::*;

    pub fn initialize_loan(
        ctx: Context<InitializeLoan>,
        amount: u64,
        interest_rate: u8,
        duration: i64,
    ) -> Result<()> {
        let loan = &mut ctx.accounts.loan;
        loan.borrower = ctx.accounts.borrower.key();
        loan.amount = amount;
        loan.interest_rate = interest_rate;
        loan.duration = duration;
        loan.status = LoanStatus::Active;
        loan.created_at = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn repay_loan(ctx: Context<RepayLoan>) -> Result<()> {
        let loan = &mut ctx.accounts.loan;
        require!(loan.status == LoanStatus::Active, LoanError::LoanNotActive);
        
        // Transferir tokens do mutuário para o credor
        let transfer_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.borrower_token_account.to_account_info(),
                to: ctx.accounts.lender_token_account.to_account_info(),
                authority: ctx.accounts.borrower.to_account_info(),
            },
        );
        
        token::transfer(transfer_ctx, loan.amount)?;
        
        loan.status = LoanStatus::Repaid;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeLoan<'info> {
    #[account(mut)]
    pub borrower: Signer<'info>,
    
    #[account(
        init,
        payer = borrower,
        space = 8 + Loan::LEN
    )]
    pub loan: Account<'info, Loan>,
    
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RepayLoan<'info> {
    #[account(mut)]
    pub borrower: Signer<'info>,
    
    #[account(mut)]
    pub loan: Account<'info, Loan>,
    
    #[account(mut)]
    pub borrower_token_account: Account<'info, TokenAccount>,
    
    #[account(mut)]
    pub lender_token_account: Account<'info, TokenAccount>,
    
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct Loan {
    pub borrower: Pubkey,
    pub amount: u64,
    pub interest_rate: u8,
    pub duration: i64,
    pub status: LoanStatus,
    pub created_at: i64,
}

impl Loan {
    pub const LEN: usize = 32 + 8 + 1 + 8 + 1 + 8;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum LoanStatus {
    Active,
    Repaid,
    Defaulted,
}

#[error_code]
pub enum LoanError {
    #[msg("Loan is not active")]
    LoanNotActive,
} 