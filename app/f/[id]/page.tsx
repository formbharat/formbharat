'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { FormField } from '@/lib/types'
import { shouldShowField } from '@/lib/conditional-logic'
import { Loader2, CheckCircle2, Share2, IndianRupee, ShieldCheck } from 'lucide-react'

export default function PublicFormPage() {
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [paymentStatus, setPaymentStatus] = useState<Record<string, { paid: boolean; paymentId?: string; orderId?: string }>>({})
  const [otpStatus, setOtpStatus] = useState<Record<string, { verified: boolean; phone?: string }>>({})
  const [otpState, setOtpState] = useState<Record<string, { phone: string; sent: boolean; otp: string; sending: boolean; verifying: boolean; error: string }>>({})

  // Multi-step form state
  const [currentPage, setCurrentPage] = useState(0)
  const [startTime] = useState(new Date())
  const [fieldsPerPage] = useState(4)

  useEffect(() => {
    fetchForm()
  }, [])

  useEffect(() => {
    if (!form) return
    const hasPayment = (form.fields as FormField[]).some((f) => f.type === 'payment')
    if (!hasPayment) return
    if (document.querySelector('script[src*="razorpay"]')) return
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    document.body.appendChild(script)
  }, [form])

  const fetchForm = async () => {
    try {
      const response = await fetch(`/api/forms/${params.id}`)
      if (!response.ok) throw new Error('Form not found')
      const data = await response.json()
      setForm(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load form',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async (field: FormField) => {
    if (!field.paymentAmount) {
      toast({ title: 'Payment not configured', description: 'Amount is not set for this field.', variant: 'destructive' })
      return
    }
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: field.paymentAmount,
          currency: field.paymentCurrency || 'INR',
          formId: form.id,
          fieldId: field.id,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast({ title: 'Payment error', description: data.error, variant: 'destructive' })
        return
      }
      const { orderId, amount, currency, keyId } = data
      const rzp = new (window as any).Razorpay({
        key: keyId,
        amount,
        currency,
        order_id: orderId,
        name: form.title,
        description: field.paymentDescription || field.label,
        theme: { color: '#f97316' },
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          if (verifyRes.ok) {
            const { paymentId } = await verifyRes.json()
            setPaymentStatus((prev) => ({ ...prev, [field.id]: { paid: true, paymentId, orderId } }))
            handleFieldChange(field.id, JSON.stringify({ paid: true, paymentId, orderId }))
            toast({ title: 'Payment successful!', description: `Payment ID: ${paymentId}` })
          } else {
            toast({ title: 'Payment verification failed', description: 'Please try again.', variant: 'destructive' })
          }
        },
        modal: { ondismiss: () => toast({ title: 'Payment cancelled' }) },
      })
      rzp.open()
    } catch {
      toast({ title: 'Payment failed', description: 'Please try again.', variant: 'destructive' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const fields = form.fields as FormField[]
    
    // For multi-step, only validate current page fields
    if (form.multiStepEnabled) {
      const pages = getPages(fields)
      const currentPageFields = pages[currentPage] || []
      const requiredFields = currentPageFields.filter(
        f => f.required && shouldShowField(f, fields, formData)
      )
      
      for (const field of requiredFields) {
        if (!formData[field.id] || (Array.isArray(formData[field.id]) && formData[field.id].length === 0)) {
          toast({
            title: 'Validation Error',
            description: `${field.label} is required`,
            variant: 'destructive',
          })
          return
        }
      }
      
      // If not last page, go to next page
      if (currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1)
        return
      }
    } else {
      // Single page validation — skip hidden fields
      const requiredFields = fields.filter(f => f.required && shouldShowField(f, fields, formData))
      for (const field of requiredFields) {
        if (!formData[field.id] || (Array.isArray(formData[field.id]) && formData[field.id].length === 0)) {
          toast({
            title: 'Validation Error',
            description: `${field.label} is required`,
            variant: 'destructive',
          })
          return
        }
      }
    }

    // Block submission if any visible phone_otp field is unverified
    const visibleOtpFields = (fields as FormField[]).filter(
      (f) => f.type === 'phone_otp' && shouldShowField(f, fields, formData)
    )
    for (const of_ of visibleOtpFields) {
      if (!otpStatus[of_.id]?.verified) {
        toast({
          title: 'Phone verification required',
          description: `Please verify your mobile number for "${of_.label}" before submitting.`,
          variant: 'destructive',
        })
        return
      }
    }

    // Block submission if any visible payment field is unpaid
    const visiblePaymentFields = (fields as FormField[]).filter(
      (f) => f.type === 'payment' && shouldShowField(f, fields, formData)
    )
    for (const pf of visiblePaymentFields) {
      if (!paymentStatus[pf.id]?.paid) {
        toast({
          title: 'Payment required',
          description: `Please complete the payment for "${pf.label}" before submitting.`,
          variant: 'destructive',
        })
        return
      }
    }

    setSubmitting(true)
    try {
      const submissionData = {
        ...formData,
        _startedAt: startTime.toISOString(),
        _currentPage: currentPage,
      }
      
      const response = await fetch(`/api/forms/${params.id}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        const msg = errData?.error || 'Submission failed'
        setFormError(msg)
        return
      }

      if (form.redirectUrl) {
        window.location.href = form.redirectUrl
        return
      }

      setSubmitted(true)
      toast({
        title: 'Success',
        description: 'Form submitted successfully!',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit form',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const getScheduleStatus = (): string | null => {
    if (!form) return null
    const now = new Date()
    if (form.opensAt && now < new Date(form.opensAt)) return `This form opens on ${new Date(form.opensAt).toLocaleString()}.`
    if (form.closesAt && now > new Date(form.closesAt)) return 'This form has closed and is no longer accepting responses.'
    return null
  }

  const getPages = (fields: FormField[]) => {
    const pages: FormField[][] = []
    for (let i = 0; i < fields.length; i += fieldsPerPage) {
      pages.push(fields.slice(i, i + fieldsPerPage))
    }
    return pages
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  const getVisibleFields = (fields: FormField[]) =>
    fields.filter((f) => shouldShowField(f, fields, formData))

  const handleShareWhatsApp = () => {
    const link = window.location.href
    const message = `Check out this form: ${form.title}\n\n${link}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )
      
      case 'file':
        return (
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                handleFieldChange(field.id, file.name)
              }
            }}
            required={field.required}
            className="cursor-pointer"
          />
        )
      
      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            required={field.required}
          />
        )
      
      case 'dropdown':
        return (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleFieldChange(field.id, value)}
            required={field.required}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={`${field.id}-${idx}`}
                  name={field.id}
                  value={option}
                  checked={formData[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="h-4 w-4"
                  required={field.required}
                />
                <label htmlFor={`${field.id}-${idx}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${field.id}-${idx}`}
                  value={option}
                  checked={(formData[field.id] || []).includes(option)}
                  onChange={(e) => {
                    const current = formData[field.id] || []
                    const updated = e.target.checked
                      ? [...current, option]
                      : current.filter((v: string) => v !== option)
                    handleFieldChange(field.id, updated)
                  }}
                  className="h-4 w-4"
                />
                <label htmlFor={`${field.id}-${idx}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      
      case 'section':
        return (
          <div className="border-t-2 border-gray-200 pt-4 -mt-2">
            {field.label && <h3 className="font-semibold text-gray-800">{field.label}</h3>}
            {field.description && <p className="text-sm text-gray-500 mt-1">{field.description}</p>}
          </div>
        )
      
      case 'heading':
        return (
          <div className="py-1">
            {field.label && <p className="font-semibold text-gray-800">{field.label}</p>}
            {field.description && <p className="text-sm text-gray-500 mt-1">{field.description}</p>}
          </div>
        )
      
      case 'image':
        return field.placeholder ? (
          <div className="space-y-1">
            <img src={field.placeholder} alt={field.label} className="max-w-full rounded-lg border border-gray-100" />
            {field.label && <p className="text-xs text-gray-400 text-center">{field.label}</p>}
          </div>
        ) : null
      
      case 'phone_otp': {
        const status = otpStatus[field.id]
        const state = otpState[field.id] || { phone: '', sent: false, otp: '', sending: false, verifying: false, error: '' }
        const setState = (updates: Partial<typeof state>) =>
          setOtpState((prev) => ({ ...prev, [field.id]: { ...state, ...updates } }))

        if (status?.verified) {
          return (
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
              <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-blue-700">Mobile verified</p>
                <p className="text-xs text-gray-500">+91-{status.phone}</p>
              </div>
            </div>
          )
        }

        return (
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
            {field.description && <p className="text-xs text-gray-500">{field.description}</p>}
            {!state.sent ? (
              <div className="flex gap-2">
                <div className="flex items-center border border-gray-200 rounded-lg bg-white px-3 text-sm text-gray-500 flex-shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={state.phone}
                  onChange={(e) => setState({ phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                  placeholder="10-digit mobile number"
                  className="flex-1 h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:border-orange-400 focus:ring-1 focus:ring-orange-100 outline-none"
                />
                <button
                  type="button"
                  disabled={state.phone.length !== 10 || state.sending}
                  onClick={async () => {
                    setState({ sending: true, error: '' })
                    const res = await fetch('/api/otp/send', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ phone: state.phone }),
                    })
                    const data = await res.json()
                    if (res.ok) {
                      setState({ sent: true, sending: false })
                    } else {
                      setState({ sending: false, error: data.error })
                    }
                  }}
                  className="h-10 px-4 text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white rounded-lg disabled:opacity-40 transition-colors flex-shrink-0"
                >
                  {state.sending ? 'Sending…' : 'Send OTP'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">OTP sent to +91-{state.phone} · <button type="button" className="text-orange-600 underline" onClick={() => setState({ sent: false, otp: '', error: '' })}>Change number</button></p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={state.otp}
                    onChange={(e) => setState({ otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    placeholder="Enter 6-digit OTP"
                    className="flex-1 h-10 px-3 text-sm border border-gray-200 rounded-lg bg-white focus:border-orange-400 outline-none tracking-widest font-mono"
                  />
                  <button
                    type="button"
                    disabled={state.otp.length !== 6 || state.verifying}
                    onClick={async () => {
                      setState({ verifying: true, error: '' })
                      const res = await fetch('/api/otp/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ phone: state.phone, otp: state.otp }),
                      })
                      const data = await res.json()
                      if (res.ok) {
                        setOtpStatus((prev) => ({ ...prev, [field.id]: { verified: true, phone: state.phone } }))
                        handleFieldChange(field.id, `+91${state.phone}`)
                        toast({ title: 'Mobile verified!', description: `+91-${state.phone} verified successfully.` })
                      } else {
                        setState({ verifying: false, error: data.error })
                      }
                    }}
                    className="h-10 px-4 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 transition-colors"
                  >
                    {state.verifying ? 'Verifying…' : 'Verify'}
                  </button>
                </div>
              </div>
            )}
            {state.error && <p className="text-xs text-red-500">{state.error}</p>}
            <p className="text-xs text-gray-400">Powered by MSG91 · Valid for 10 minutes</p>
          </div>
        )
      }

      case 'payment': {
        const status = paymentStatus[field.id]
        return (
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            {field.paymentDescription && (
              <p className="text-sm text-gray-600 mb-3">{field.paymentDescription}</p>
            )}
            {status?.paid ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-700">Payment successful</p>
                  <p className="text-xs text-gray-500">ID: {status.paymentId}</p>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handlePayment(field)}
                className="w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm transition-colors"
              >
                <IndianRupee className="h-4 w-4" />
                Pay ₹{field.paymentAmount?.toLocaleString('en-IN')} via UPI / Card
              </button>
            )}
            <p className="mt-2 text-xs text-gray-400 text-center">Secured by Razorpay</p>
          </div>
        )
      }

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <CardTitle className="text-2xl">Form Not Found</CardTitle>
            <CardDescription>The form you're looking for doesn't exist or has been removed.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/">
              <Button variant="outline">Go to Homepage</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-2xl">Thank You!</CardTitle>
            <CardDescription className="text-base">
              {form?.successMessage || 'Your response has been submitted successfully. We appreciate your time!'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-sm text-gray-500">
              Powered by <Link href="/" className="text-orange-600 hover:underline font-medium">FormBharat</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (formError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⏸️</span>
            </div>
            <CardTitle className="text-xl">Form Unavailable</CardTitle>
            <CardDescription>{formError}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/"><Button variant="outline" size="sm">Go to Homepage</Button></Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-2xl mx-auto">
        {/* Branding Header */}
        <div className="text-center mb-6 md:mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 md:mb-4 hover:opacity-80 transition">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">F</span>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              FormBharat
            </span>
          </Link>
          <button
            onClick={handleShareWhatsApp}
            className="mt-2 text-xs md:text-sm text-green-600 hover:text-green-700 flex items-center gap-1 mx-auto"
          >
            <Share2 className="h-3 md:h-4 w-3 md:w-4" />
            Share via WhatsApp
          </button>
        </div>

        {/* Schedule status banner */}
        {getScheduleStatus() && (
          <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-700 text-center">
            {getScheduleStatus()}
          </div>
        )}

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50 border-b p-4 md:p-6">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold">{form.title}</CardTitle>
            {form.description && (
              <CardDescription className="text-sm md:text-base mt-2">{form.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-6 md:pt-8">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {form.multiStepEnabled && (() => {
                const pages = getPages(form.fields as FormField[])
                const totalPages = pages.length
                
                return (
                  <>
                    {/* Progress Bar */}
                    <div className="mb-6 md:mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs md:text-sm font-medium text-gray-600">
                          Page {currentPage + 1} of {totalPages}
                        </span>
                        <span className="text-xs md:text-sm text-gray-500">
                          {Math.round(((currentPage + 1) / totalPages) * 100)}% Complete
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300"
                          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Current Page Fields */}
                    {pages[currentPage]?.filter((field) => shouldShowField(field, form.fields as FormField[], formData)).map((field) => {
                      const isLayout = field.type === 'section' || field.type === 'heading' || field.type === 'image'
                      return (
                        <div key={field.id} className="space-y-2">
                          {!isLayout && (
                            <Label className="text-sm md:text-base font-medium">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                          )}
                          {renderField(field)}
                        </div>
                      )
                    })}

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 md:gap-3 pt-4">
                      {currentPage > 0 && (
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="flex-1 text-sm md:text-base h-10 md:h-11"
                        >
                          Previous
                        </Button>
                      )}
                      <Button 
                        type="submit" 
                        disabled={submitting} 
                        className="flex-1 text-sm md:text-base h-10 md:h-11 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 md:h-5 w-4 md:w-5 animate-spin" />
                            Submitting...
                          </>
                        ) : currentPage < totalPages - 1 ? (
                          'Next'
                        ) : (
                          'Submit Response'
                        )}
                      </Button>
                    </div>
                  </>
                )
              })()}

              {!form.multiStepEnabled && (
                <>
                  {(form.fields as FormField[]).filter((field) => shouldShowField(field, form.fields as FormField[], formData)).map((field, index) => {
                    const isLayout = field.type === 'section' || field.type === 'heading' || field.type === 'image'
                    const inputIndex = index + 1
                    return (
                      <div key={field.id} className="space-y-2">
                        {!isLayout && (
                          <Label className="text-sm md:text-base font-medium">
                            {inputIndex}. {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </Label>
                        )}
                        {renderField(field)}
                      </div>
                    )
                  })}
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      disabled={submitting} 
                      className="w-full h-11 md:h-12 text-base md:text-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 md:h-5 w-4 md:w-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        'Submit Response'
                      )}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 md:mt-8 text-xs md:text-sm text-gray-500">
          <p>
            Powered by{' '}
            <Link href="/" className="text-orange-600 hover:underline font-medium">
              FormBharat
            </Link>
            {' '}• Made in India 🇮🇳
          </p>
        </div>
      </div>
    </div>
  )
}
