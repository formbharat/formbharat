import { NextRequest, NextResponse } from 'next/server'
import { otpStore } from '@/lib/otp-store'

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json()

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: 'Enter a valid 10-digit Indian mobile number' },
        { status: 400 }
      )
    }

    const authKey = process.env.MSG91_AUTH_KEY
    const templateId = process.env.MSG91_OTP_TEMPLATE_ID

    if (authKey && templateId) {
      // Production: MSG91 OTP API (manages OTP generation, storage & expiry)
      const res = await fetch('https://control.msg91.com/api/v5/otp', {
        method: 'POST',
        headers: {
          authkey: authKey,
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({
          template_id: templateId,
          mobile: `91${phone}`,
          otp_expiry: 10,
          otp_length: 6,
        }),
      })
      const data = await res.json()
      if (data.type !== 'success') {
        console.error('MSG91 error:', data)
        return NextResponse.json({ error: 'Failed to send OTP. Please try again.' }, { status: 502 })
      }
    } else {
      // Dev mode: generate OTP, store in shared store, log to server console
      const otp = Math.floor(100000 + Math.random() * 900000).toString()
      otpStore.set(`phone:${phone}`, { otp, expiresAt: Date.now() + 10 * 60 * 1000 })
      console.log(`\n[DEV MODE] OTP for +91-${phone}: ${otp}\n`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
