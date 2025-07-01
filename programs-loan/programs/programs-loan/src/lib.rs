use anchor_lang::prelude::*;

declare_id!("BoVUo9ew5o7rHDYN3UNbwdTEe6kZWxPHxBBYqBVTnR8H");

#[program]
pub mod programs_loan {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
