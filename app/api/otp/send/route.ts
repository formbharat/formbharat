import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otp-store'

// Production: Firebase Phone Auth sends OTP entirely client-side (no server call needed).
// This endpoint is only used in dev mode (no Firebase env vars configured).

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Enter a valid 10-digit Indian mobile number' },
        { status: 400 }
      )
    }

    const isFirebaseConfigured = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.FIREBASE_PROJECT_ID
    )

    if (isFirebaseConfigured) {
      // Firebase handles sending client-side; this route should not be called in production
      return NextResponse.json({ success: true, mode: 'firebase' })
    }

    // Dev mode: generate OTP locally, log to server console
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    otpStore.set(`phone:${phone}`, { otp, expiresAt: Date.now() + 10 * 60 * 1000 })
    console.log(`\n[DEV MODE] OTP for +91-${phone}: ${otp}\n`)

    return NextResponse.json({ success: true, mode: 'dev' })
  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
