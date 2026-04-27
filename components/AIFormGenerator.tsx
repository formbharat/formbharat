'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles, Loader2, RefreshCw, Check } from 'lucide-react'
import { FormField } from '@/lib/types'
import { getValidToken } from '@/lib/getToken'

interface AIFormGeneratorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFormGenerated: (form: { title: string; description: string; fields: FormField[] }) => void
}

interface GeneratedForm {
  title: string
  description: string
  fields: Array<{
    type: string
    label: string
    placeholder: string
    required: boolean
    options?: string[]
  }>
  metadata?: {
    tokensUsed: number
    cost: string
    remainingGenerations: number
  }
}

const EXAMPLE_PROMPTS = [
  'Customer feedback form for my restaurant',
  'Event registration form for a tech conference',
  'Job application form for software engineer position',
  'Product order form for handmade jewelry',
  'Student enrollment form for online courses',
]

export function AIFormGenerator({ open, onOpenChange, onFormGenerated }: AIFormGeneratorProps) {
  const [description, setDescription] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatedForm, setGeneratedForm] = useState<GeneratedForm | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!description.trim() || description.length < 10) {
      setError('Please enter at least 10 characters')
      return
    }

    setGenerating(true)
    setError('')
    setGeneratedForm(null)

    try {
      const token = await getValidToken()
      if (!token) {
        throw new Error('Please log in to use AI features')
      }

      const response = await fetch('/api/ai/generate-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description,
          language: 'en', // TODO: Detect from browser or user preference
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate form')
      }

      const data: GeneratedForm = await response.json()
      setGeneratedForm(data)
    } catch (err: any) {
      setError(err.message || 'Failed to generate form. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const handleUseForm = () => {
    if (!generatedForm) return

    // Convert AI fields to FormField format with IDs
    const fieldsWithIds: FormField[] = generatedForm.fields.map((field, index) => ({
      id: `field-${Date.now()}-${index}`,
      type: field.type as any,
      label: field.label,
      placeholder: field.placeholder,
      required: field.required,
      options: field.options,
    }))

    onFormGenerated({
      title: generatedForm.title,
      description: generatedForm.description,
      fields: fieldsWithIds,
    })

    // Reset and close
    setDescription('')
    setGeneratedForm(null)
    setError('')
    onOpenChange(false)
  }

  const handleRegenerate = () => {
    setGeneratedForm(null)
    handleGenerate()
  }

  const handleReset = () => {
    setDescription('')
    setGeneratedForm(null)
    setError('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-orange-500" />
            AI Form Generator
          </DialogTitle>
          <DialogDescription>
            Describe your form in plain English and let AI create it for you in seconds.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Input Section */}
          {!generatedForm && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  What kind of form do you need?
                </label>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                    setError('')
                  }}
                  placeholder="E.g., Customer feedback form for my restaurant with food quality and service ratings"
                  className="min-h-[120px] text-base"
                  disabled={generating}
                />
                <p className="text-xs text-gray-500 mt-2">
                  {description.length}/500 characters
                </p>
              </div>

              {/* Example Prompts */}
              <div>
                <p className="text-xs font-medium text-gray-600 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setDescription(prompt)}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      disabled={generating}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={generating || !description.trim()}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  {generating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Form
                    </>
                  )}
                </Button>
                {description && (
                  <Button onClick={handleReset} variant="outline">
                    Clear
                  </Button>
                )}
              </div>
            </>
          )}

          {/* Generated Form Preview */}
          {generatedForm && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{generatedForm.title}</h3>
                    {generatedForm.description && (
                      <p className="text-sm text-gray-600 mt-1">{generatedForm.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                    <Check className="h-3 w-3 text-green-500" />
                    {generatedForm.fields.length} fields
                  </div>
                </div>

                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {generatedForm.fields.map((field, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-gray-500 uppercase">{field.type}</span>
                        {field.required && (
                          <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">Required</span>
                        )}
                      </div>
                      <p className="font-medium text-sm text-gray-900">{field.label}</p>
                      {field.placeholder && (
                        <p className="text-xs text-gray-500 mt-1">Placeholder: {field.placeholder}</p>
                      )}
                      {field.options && field.options.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {field.options.map((option, i) => (
                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {generatedForm.metadata && (
                  <div className="mt-3 pt-3 border-t border-orange-200 flex items-center justify-between text-xs text-gray-600">
                    <span>Cost: ${generatedForm.metadata.cost}</span>
                    <span>Remaining today: {generatedForm.metadata.remainingGenerations}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button onClick={handleUseForm} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Check className="mr-2 h-4 w-4" />
                  Use This Form
                </Button>
                <Button onClick={handleRegenerate} variant="outline" disabled={generating}>
                  {generating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Start Over
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {generating && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <div className="relative">
                <Sparkles className="h-12 w-12 text-orange-500 animate-pulse" />
                <div className="absolute inset-0 bg-orange-500 blur-xl opacity-30 animate-pulse"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium text-gray-900">Creating your form...</p>
                <p className="text-sm text-gray-500">This usually takes 5-10 seconds</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
