// Shared in-memory OTP store
// Both send-verification and verify-otp routes import from here
// In production, replace with Redis (Upstash) for multi-instance support

interface OTPEntry {
  otp: string
  expiresAt: number
  description?: string
}

export const otpStore = new Map<string, OTPEntry>()

// Clean up expired OTPs every 10 minutes
setInterval(() => {
  const now = Date.now()
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email)
    }
  }
}, 10 * 60 * 1000)
