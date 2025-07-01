import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Cria uma nova instância do Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Cria um novo rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10 requisições por 10 segundos
  analytics: true,
  prefix: '@upstash/ratelimit',
})

export async function rateLimit(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success, limit, reset, remaining } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    })
  }

  return NextResponse.next({
    headers: {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    },
  })
} 