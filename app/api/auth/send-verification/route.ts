import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'
import { checkIPRateLimit, getClientIP } from '@/lib/rate-limit'
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

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Check IP rate limit (3 per day for guest users)
    const clientIP = getClientIP(request)
    const rateLimitResult = checkIPRateLimit(clientIP, 3)

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: `Rate limit exceeded. You can only generate 3 forms per day without signing up. Try again in ${Math.ceil((rateLimitResult.resetAt - Date.now()) / (60 * 60 * 1000))} hours.`,
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { email, method, context, description } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    if (!method || !['magic-link', 'otp'].includes(method)) {
      return NextResponse.json({ error: 'Invalid verification method' }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('User')
      .select('id, email')
      .eq('email', email.toLowerCase())
      .single()

    if (method === 'otp') {
      // Generate and store OTP
      const otp = generateOTP()
      const expiresAt = Date.now() + 10 * 60 * 1000 // 10 minutes

      otpStore.set(email.toLowerCase(), { otp, expiresAt, description })

      // Send OTP email
      await sendEmail({
        to: email,
        subject: 'Your FormBharat verification code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #ea580c;">Your Verification Code</h2>
            <p>Hi there!</p>
            <p>Your verification code for FormBharat is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="font-size: 36px; letter-spacing: 8px; margin: 0; color: #ea580c;">${otp}</h1>
            </div>
            <p>This code will expire in 10 minutes.</p>
            ${description ? `<p style="color: #6b7280; font-style: italic;">You're generating: "${description}"</p>` : ''}
            <p>If you didn't request this code, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              FormBharat - Free & Open Source Form Builder<br>
              Made in India 🇮🇳
            </p>
          </div>
        `,
      })

      return NextResponse.json({
        success: true,
        method: 'otp',
        expiresIn: 600, // seconds
        remainingAttempts: rateLimitResult.remaining,
      })
    } else {
      // Magic link
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          emailRedirectTo: `${origin}/builder?ai=generated&new=true`,
        },
      })

      if (error) {
        console.error('Magic link error:', error)
        // Handle Supabase rate limiting
        if (error.code === 'over_email_send_rate_limit') {
          const match = error.message.match(/after (\d+) seconds/)
          const seconds = match ? match[1] : '60'
          return NextResponse.json(
            { error: `Please wait ${seconds} seconds before requesting another magic link.` },
            { status: 429 }
          )
        }
        return NextResponse.json({ error: 'Failed to send magic link. Please try again.' }, { status: 500 })
      }

      // Store description in a temporary table or cache for retrieval after login
      if (description && !existingUser) {
        // Store in session or database for retrieval
        // For now, we'll rely on sessionStorage on client side
      }

      return NextResponse.json({
        success: true,
        method: 'magic-link',
        remainingAttempts: rateLimitResult.remaining,
      })
    }
  } catch (error: any) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to send verification' },
      { status: 500 }
    )
  }
}

