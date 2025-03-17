"use client"

import { useState } from 'react';
import { useSmartContract } from '../../hooks/useSmartContract';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import Image from 'next/image';

// Definindo o tipo para os tokens suportados
interface TokenInfo {
  symbol: string;
  name: string;
  decimals: number;
  logoURI: string;
}

interface SupportedTokens {
  [key: string]: TokenInfo;
}

export function LoanCreationForm() {
  const { createLoan, isLoading, supportedTokens, platformFee } = useSmartContract();
  const { connected } = useWallet();
  
  const [principal, setPrincipal] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [duration, setDuration] = useState<number>(30);
  const [collateralAmount, setCollateralAmount] = useState<number>(0);
  const [collateralToken, setCollateralToken] = useState<string>('SOL');
  const [loanToken, setLoanToken] = useState<string>('USDC');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      return;
    }
    
    await createLoan({
      principal,
      interestRate,
      duration,
      collateralAmount,
      collateralToken,
      loanToken,
    });
  };
  
  // Calcular o valor total a ser pago
  const totalRepayment = principal + (principal * interestRate * duration / 365 / 100);
  
  // Calcular a taxa da plataforma
  const platformFeeAmount = principal * (platformFee / 100);
  
  // Calcular o valor líquido que o tomador recebe
  const netAmount = principal - platformFeeAmount;
  
  // Converter supportedTokens para o tipo correto
  const typedSupportedTokens = supportedTokens as SupportedTokens || {};
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Criar Solicitação de Empréstimo</CardTitle>
        <CardDescription>
          Preencha os detalhes do empréstimo que você deseja solicitar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!connected ? (
          <div className="flex flex-col items-center justify-center p-4">
            <p className="mb-4 text-center">
              Conecte sua carteira para criar uma solicitação de empréstimo.
            </p>
            <WalletMultiButton />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Valor Principal</Label>
              <div className="flex items-center">
                <Input
                  id="principal"
                  type="number"
                  min="0"
                  step="0.01"
                  value={principal || ''}
                  onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                  required
                  className="flex-1"
                />
                <Select value={loanToken} onValueChange={setLoanToken}>
                  <SelectTrigger className="w-24 ml-2">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(typedSupportedTokens).map((token) => (
                      <SelectItem key={token} value={token}>
                        <div className="flex items-center">
                          {typedSupportedTokens[token]?.logoURI && (
                            <div className="w-4 h-4 mr-2 relative">
                              <Image
                                src={typedSupportedTokens[token].logoURI}
                                alt={token}
                                width={16}
                                height={16}
                              />
                            </div>
                          )}
                          {token}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="interestRate">Taxa de Juros (%)</Label>
              <Input
                id="interestRate"
                type="number"
                min="0"
                step="0.1"
                value={interestRate || ''}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duração (dias)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={duration || ''}
                onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="collateral">Valor do Colateral</Label>
              <div className="flex items-center">
                <Input
                  id="collateral"
                  type="number"
                  min="0"
                  step="0.01"
                  value={collateralAmount || ''}
                  onChange={(e) => setCollateralAmount(parseFloat(e.target.value) || 0)}
                  required
                  className="flex-1"
                />
                <Select value={collateralToken} onValueChange={setCollateralToken}>
                  <SelectTrigger className="w-24 ml-2">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(typedSupportedTokens).map((token) => (
                      <SelectItem key={token} value={token}>
                        <div className="flex items-center">
                          {typedSupportedTokens[token]?.logoURI && (
                            <div className="w-4 h-4 mr-2 relative">
                              <Image
                                src={typedSupportedTokens[token].logoURI}
                                alt={token}
                                width={16}
                                height={16}
                              />
                            </div>
                          )}
                          {token}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {principal > 0 && (
              <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm">
                <h4 className="font-medium mb-2">Resumo da Transação</h4>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-muted-foreground">Valor solicitado:</p>
                  <p className="text-right">{principal.toFixed(2)} {loanToken}</p>
                  
                  <p className="text-muted-foreground">Taxa da plataforma ({platformFee}%):</p>
                  <p className="text-right">{platformFeeAmount.toFixed(2)} {loanToken}</p>
                  
                  <p className="text-muted-foreground">Valor líquido:</p>
                  <p className="text-right">{netAmount.toFixed(2)} {loanToken}</p>
                  
                  <p className="text-muted-foreground">Valor a pagar:</p>
                  <p className="text-right font-medium">{totalRepayment.toFixed(2)} {loanToken}</p>
                  
                  <p className="text-muted-foreground">Colateral:</p>
                  <p className="text-right">{collateralAmount.toFixed(2)} {collateralToken}</p>
                </div>
              </div>
            )}
            
            <div className="pt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Criar Solicitação'}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Taxa da plataforma: {platformFee}%</p>
        <p>Processado na Solana</p>
      </CardFooter>
    </Card>
  );
} 