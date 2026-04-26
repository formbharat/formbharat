import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otp-store'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 })
    }

    const authKey = process.env.MSG91_AUTH_KEY

    if (authKey) {
      // Production: verify via MSG91
      const res = await fetch(
        `https://control.msg91.com/api/v5/otp/verify?otp=${otp}&mobile=91${phone}&authkey=${authKey}`
      )
      const data = await res.json()
      if (data.type !== 'success') {
        return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 })
      }
    } else {
      // Dev mode: verify against local store
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
    }

    return NextResponse.json({ verified: true, phone })
  } catch (error) {
    console.error('OTP verify error:', error)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
