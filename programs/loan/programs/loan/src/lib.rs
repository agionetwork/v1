use anchor_lang::prelude::*;

declare_id!("6Xg4BBZwci5jxCvXSSMFEySh4zggCP6fheeTVWHPXqu5");

#[program]
pub mod loan {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
