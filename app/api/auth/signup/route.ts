import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (authData.user) {
      try {
        await prisma.user.create({
          data: {
            id: authData.user.id,
            email: authData.user.email!,
            name: email.split('@')[0],
          },
        })
      } catch (dbError: any) {
        console.error('Database error saving user:', dbError)
        // User created in Supabase Auth but not in our DB
        // This is OK for now - we can still proceed
        return NextResponse.json({
          user: authData.user,
          session: authData.session,
          warning: 'User created in auth but database sync pending',
        })
      }
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Database error saving new user' },
      { status: 500 }
    )
  }
}
