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
import { Loader2, CheckCircle2, Share2 } from 'lucide-react'

export default function PublicFormPage() {
  const params = useParams()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})
  
  // Multi-step form state
  const [currentPage, setCurrentPage] = useState(0)
  const [startTime] = useState(new Date())
  const [fieldsPerPage] = useState(4)

  useEffect(() => {
    fetchForm()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const fields = form.fields as FormField[]
    
    // For multi-step, only validate current page fields
    if (form.multiStepEnabled) {
      const pages = getPages(fields)
      const currentPageFields = pages[currentPage] || []
      const requiredFields = currentPageFields.filter(f => f.required)
      
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
      // Single page validation
      const requiredFields = fields.filter(f => f.required)
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

      if (!response.ok) throw new Error('Submission failed')

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
              Your response has been submitted successfully. We appreciate your time!
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
                    {pages[currentPage]?.map((field, index) => (
                      <div key={field.id} className="space-y-2">
                        <Label className="text-sm md:text-base font-medium">
                          {currentPage * fieldsPerPage + index + 1}. {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </Label>
                        {renderField(field)}
                      </div>
                    ))}

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
                  {(form.fields as FormField[]).map((field, index) => (
                    <div key={field.id} className="space-y-2">
                      <Label className="text-sm md:text-base font-medium">
                        {index + 1}. {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </Label>
                      {renderField(field)}
                    </div>
                  ))}
                  
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
