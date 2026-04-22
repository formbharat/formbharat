import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma'
import { otpStore } from '@/lib/otp-store'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, otp } = body

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 })
    }

    // Get stored OTP
    const stored = otpStore.get(email.toLowerCase())

    if (!stored) {
      return NextResponse.json({ error: 'No OTP found. Please request a new one.' }, { status: 400 })
    }

    // Check expiry
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email.toLowerCase())
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 })
    }

    // Verify OTP
    if (stored.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    // OTP is valid - clear it
    otpStore.delete(email.toLowerCase())

    // Check if user exists in Supabase
    const { data: existingAuth } = await supabase.auth.admin.listUsers()
    const existingUser = existingAuth.users.find(u => u.email === email.toLowerCase())

    let userId: string
    let token: string
    let isNewUser = false

    if (existingUser) {
      userId = existingUser.id
    } else {
      // Create new user in Supabase (auto-confirmed since they verified via our OTP)
      const { data, error } = await supabase.auth.admin.createUser({
        email: email.toLowerCase(),
        email_confirm: true,
      })

      if (error) throw error
      if (!data.user) throw new Error('Failed to create user')

      userId = data.user.id
      isNewUser = true

      // Create user in our database
      await prisma.user.upsert({
        where: { email: email.toLowerCase() },
        update: {},
        create: {
          id: userId,
          email: email.toLowerCase(),
        },
      })
    }

    // Generate a magic link server-side (does NOT send email) to get a hashed_token
    // The client will exchange this for a real Supabase session JWT via verifyOtp
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email.toLowerCase(),
    })

    if (linkError) throw linkError

    const hashedToken = linkData.properties.hashed_token

    return NextResponse.json({
      success: true,
      hashed_token: hashedToken,
      user: {
        id: userId,
        email: email.toLowerCase(),
        isNewUser,
        needsPassword: isNewUser,
      },
    })
  } catch (error: any) {
    console.error('OTP verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    )
  }
}
