'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Loader2, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { createClient } from '@supabase/supabase-js'
import { storeSession } from '@/lib/getToken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface GuestAIGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialDescription?: string
}

type Step = 'auth' | 'verify' | 'generating'

export function GuestAIGenerator({ open, onOpenChange, initialDescription = '' }: GuestAIGeneratorProps) {
  const router = useRouter()
  const { toast } = useToast()
  
  const [step, setStep] = useState<Step>('auth')
  const [description, setDescription] = useState(initialDescription)

  // Sync description whenever the modal opens with a new value
  useEffect(() => {
    if (open && initialDescription) {
      setDescription(initialDescription)
    }
  }, [open, initialDescription])

  const [email, setEmail] = useState('')
  const [verificationMethod, setVerificationMethod] = useState<'magic-link' | 'otp' | null>(null)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDescribeNext = () => {
    if (!description.trim() || description.length < 10) {
      setError('Please enter at least 10 characters')
      return
    }
    setError('')
    setStep('auth')
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      // Store description in localStorage so builder can use it after OAuth redirect (works cross-tab)
      localStorage.setItem('ai_form_description', description)

      // Get the Google OAuth URL from the API
      const response = await fetch('/api/auth/google', { method: 'POST' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to initiate Google login')

      // Redirect to Google OAuth
      window.location.href = data.url
    } catch (err: any) {
      setError(err.message || 'Failed to initiate Google login')
      setLoading(false)
    }
  }

  const handleEmailSubmit = async (method: 'magic-link' | 'otp') => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')
    setVerificationMethod(method)

    try {
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          method,
          context: 'ai-form-generation',
          description, // Include for later
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send verification')
      }

      if (method === 'magic-link') {
        // Store description in localStorage so it survives the magic link opening in a new tab
        localStorage.setItem('ai_form_description', description)
        toast({
          title: 'Check your email! 📧',
          description: 'We sent you a magic link. Click it to continue.',
        })
        setStep('verify')
      } else {
        toast({
          title: 'OTP sent! 🔐',
          description: 'Check your email for the 6-digit code.',
        })
        setStep('verify')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send verification')
    } finally {
      setLoading(false)
    }
  }

  const handleOTPVerify = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid code')
      }

      const { hashed_token, user } = await response.json()

      // Exchange hashed_token for a real Supabase session JWT
      const { data: sessionData, error: sessionError } = await supabase.auth.verifyOtp({
        token_hash: hashed_token,
        type: 'magiclink',
      })

      if (sessionError || !sessionData.session) {
        throw new Error('Failed to create session. Please try again.')
      }

      const accessToken = sessionData.session.access_token
      storeSession(accessToken, sessionData.session.refresh_token)

      // Generate AI form (email users need password setup later)
      await generateAIForm(accessToken, user.needsPassword || false)
    } catch (err: any) {
      setError(err.message || 'Verification failed')
      setLoading(false)
    }
  }

  const generateAIForm = async (token: string, isEmailUser: boolean) => {
    setStep('generating')
    setLoading(true)

    try {
      const response = await fetch('/api/ai/generate-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate form')
      }

      const generated = await response.json()

      // Store generated form in localStorage
      localStorage.setItem('ai_generated_form', JSON.stringify(generated))

      if (typeof window !== 'undefined' && (window as any).gtag) {
        ;(window as any).gtag('event', 'ai_form_generated', {
          event_category: 'ai',
          event_label: description.slice(0, 100),
          value: 1,
        })
      }

      // Mark if user needs password setup (email users only, not Google)
      if (isEmailUser) {
        localStorage.setItem('needs_password', 'true')
      }

      // Redirect to builder
      router.push('/builder?ai=generated&new=true')

      // Close modal
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message || 'Failed to generate form')
      setStep('auth') // Go back to allow retry
      setLoading(false)
    }
  }

  const handleReset = () => {
    setEmail('')
    setOtp('')
    setError('')
    setVerificationMethod(null)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            AI Form Generator
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            {step === 'auth' && 'Sign in to generate your form'}
            {step === 'verify' && 'Enter the code sent to your email'}
            {step === 'generating' && 'Creating your form...'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Step 1: Authentication */}
          {step === 'auth' && (
            <>
              <div className="bg-orange-50 border border-orange-100 rounded-lg p-4">
                <p className="text-xs font-medium text-orange-700 uppercase tracking-wide mb-1">Your form idea</p>
                <p className="text-sm text-gray-700 italic">"{description}"</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  variant="outline"
                  className="w-full h-12 text-sm font-medium border-gray-300 hover:bg-gray-50"
                  size="lg"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-gray-400">or continue with email</span>
                  </div>
                </div>

                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className="h-12 text-base"
                />

                {/* Magic link temporarily disabled (Supabase free plan 2 emails/hr limit)
                <Button
                  onClick={() => handleEmailSubmit('magic-link')}
                  disabled={loading || !email}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-4 w-4" />
                  )}
                  Magic Link
                </Button>
                */}
                <Button
                  onClick={() => handleEmailSubmit('otp')}
                  disabled={loading || !email}
                  size="lg"
                  className="w-full h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-sm font-semibold"
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-4 w-4" />
                  )}
                  Send Verification Code
                </Button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button onClick={handleReset} variant="ghost" className="w-full text-gray-500 hover:text-gray-700">
                ← Cancel
              </Button>
            </>
          )}

          {/* Step 3: Verify Email (OTP only) */}
          {step === 'verify' && verificationMethod === 'otp' && (
            <>
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-orange-50 border-2 border-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-orange-500" />
                </div>
                <p className="text-sm text-gray-600">
                  We sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>

              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6)
                  setOtp(value)
                  setError('')
                }}
                className="h-14 text-center text-2xl tracking-widest"
                maxLength={6}
                autoFocus
              />

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleOTPVerify}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 font-semibold"
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Generate Form'
                )}
              </Button>

              <Button
                onClick={() => handleEmailSubmit('otp')}
                variant="ghost"
                className="w-full"
                disabled={loading}
              >
                Resend code
              </Button>
            </>
          )}

          {/* Step 3: Verify Email (Magic Link) */}
          {step === 'verify' && verificationMethod === 'magic-link' && (
            <div className="text-center space-y-4 py-8">
              <div className="w-20 h-20 bg-orange-50 border-2 border-orange-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Mail className="h-10 w-10 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Check your email!</h3>
                <p className="text-sm text-gray-600">
                  We sent a magic link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Click the link to continue generating your form.
                </p>
              </div>
              <Button
                onClick={() => handleEmailSubmit('magic-link')}
                variant="outline"
                disabled={loading}
              >
                Resend link
              </Button>
            </div>
          )}

          {/* Step 4: Generating */}
          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 animate-pulse"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium text-lg text-gray-900">Creating your form...</p>
                <p className="text-sm text-gray-500">This usually takes 5-10 seconds</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
