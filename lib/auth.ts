import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface User {
  id: string
  email: string
}

export async function verifyAuth(request: NextRequest): Promise<User | null> {
  try {
    const authorization = request.headers.get('authorization')
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return null
    }
    
    const token = authorization.split(' ')[1]
    
    if (!token) {
      return null
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    return {
      id: decoded.userId,
      email: decoded.email
    }
  } catch (error) {
    console.error('Auth verification failed:', error)
    return null
  }
}

export function generateToken(user: { id: string; email: string }): string {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}
