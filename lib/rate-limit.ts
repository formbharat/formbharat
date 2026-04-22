// Simple in-memory rate limiting for IP addresses
// For production, consider using Redis (Upstash) for distributed rate limiting

interface RateLimitEntry {
  count: number
  resetAt: number
}

const ipLimits = new Map<string, RateLimitEntry>()

// Clean up expired entries every hour
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of ipLimits.entries()) {
    if (now > entry.resetAt) {
      ipLimits.delete(ip)
    }
  }
}, 60 * 60 * 1000) // 1 hour

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

export function checkIPRateLimit(
  ip: string,
  limit: number = 3,
  windowMs: number = 24 * 60 * 60 * 1000 // 24 hours
): RateLimitResult {
  // Disable rate limiting in local development
  if (process.env.NODE_ENV !== 'production') {
    return { allowed: true, remaining: limit, resetAt: Date.now() + windowMs }
  }

  const now = Date.now()
  const entry = ipLimits.get(ip)

  // No entry or expired - create new
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs
    ipLimits.set(ip, { count: 1, resetAt })
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt,
    }
  }

  // Check if limit exceeded
  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    }
  }

  // Increment count
  entry.count++
  ipLimits.set(ip, entry)

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  }
}

export function getClientIP(request: Request): string {
  // Try various headers in order of preference
  const headers = request.headers
  
  // Cloudflare
  const cfConnectingIP = headers.get('cf-connecting-ip')
  if (cfConnectingIP) return cfConnectingIP

  // AWS/Amplify
  const xForwardedFor = headers.get('x-forwarded-for')
  if (xForwardedFor) {
    // X-Forwarded-For can be a comma-separated list, take the first one
    return xForwardedFor.split(',')[0].trim()
  }

  // Vercel
  const xRealIP = headers.get('x-real-ip')
  if (xRealIP) return xRealIP

  // Fallback
  return 'unknown'
}

export function formatResetTime(resetAt: number): string {
  const now = Date.now()
  const diff = resetAt - now
  
  if (diff <= 0) return 'now'
  
  const hours = Math.floor(diff / (60 * 60 * 1000))
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000))
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }
  return `${minutes}m`
}
