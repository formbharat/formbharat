import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const isDev = process.env.NODE_ENV === 'development'
    const origin = isDev
      ? (request.headers.get('origin') || 'http://localhost:3000')
      : (process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3000')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      throw error
    }

    return NextResponse.json({ url: data.url })
  } catch (error: any) {
    console.error('Google auth error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to authenticate with Google' },
      { status: 500 }
    )
  }
}
