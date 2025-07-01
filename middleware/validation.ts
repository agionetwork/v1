import { z } from 'zod'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Schemas de validação
export const transactionSchema = z.object({
  amount: z.number().positive(),
  recipient: z.string().min(32).max(44), // Endereço Solana
  token: z.string().min(1),
})

export const loanSchema = z.object({
  amount: z.number().positive(),
  interestRate: z.number().min(0).max(100),
  duration: z.number().positive(),
  collateral: z.string().min(1),
})

// Middleware de validação
export async function validateRequest(
  request: NextRequest,
  schema: z.ZodSchema
) {
  try {
    const body = await request.json()
    const validatedData = schema.parse(body)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      }
    }
    return {
      success: false,
      error: [{ message: 'Invalid request data' }],
    }
  }
}

// Middleware para validar transações
export async function validateTransaction(request: NextRequest) {
  const result = await validateRequest(request, transactionSchema)
  
  if (!result.success) {
    return new NextResponse(JSON.stringify(result.error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return NextResponse.next()
}

// Middleware para validar empréstimos
export async function validateLoan(request: NextRequest) {
  const result = await validateRequest(request, loanSchema)
  
  if (!result.success) {
    return new NextResponse(JSON.stringify(result.error), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return NextResponse.next()
} 