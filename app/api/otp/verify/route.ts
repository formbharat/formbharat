import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otp-store'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp, idToken } = await request.json()

    const isFirebaseConfigured = !!(
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.FIREBASE_PROJECT_ID
    )

    if (isFirebaseConfigured) {
      // Production: verify Firebase ID token (client-side auth already confirmed)
      if (!idToken) {
        return NextResponse.json({ error: 'Firebase ID token is required' }, { status: 400 })
      }
      const { adminAuth } = await import('@/lib/firebase-admin')
      const decoded = await adminAuth.verifyIdToken(idToken)
      const verifiedPhone = decoded.phone_number
      if (!verifiedPhone) {
        return NextResponse.json({ error: 'Could not verify phone number' }, { status: 400 })
      }
      // Strip +91 prefix for display consistency
      const localPhone = verifiedPhone.replace(/^\+91/, '')
      return NextResponse.json({ verified: true, phone: localPhone })
    }

    // Dev mode: verify against local otpStore
    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 })
    }
    const entry = otpStore.get(`phone:${phone}`)
    if (!entry) {
      return NextResponse.json({ error: 'OTP not found. Please request a new one.' }, { status: 400 })
    }
    if (Date.now() > entry.expiresAt) {
      otpStore.delete(`phone:${phone}`)
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 })
    }
    if (entry.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }
    otpStore.delete(`phone:${phone}`)
    return NextResponse.json({ verified: true, phone })
  } catch (error) {
    console.error('OTP verify error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
