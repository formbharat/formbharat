'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { FormBuilder } from '@/components/form-builder/FormBuilder'
import { useToast } from '@/components/ui/use-toast'
import { FormField } from '@/lib/types'
import { getValidToken } from '@/lib/getToken'

export default function EditFormPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const formId = params.id as string

  const [formData, setFormData] = useState<{ title: string; description: string; fields: FormField[] } | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = await getValidToken()
        if (!token) {
          router.push('/auth/login')
          return
        }
        const res = await fetch(`/api/forms/${formId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error('Form not found')
        const data = await res.json()
        setFormData({ title: data.title, description: data.description || '', fields: data.fields || [] })
      } catch (err: any) {
        toast({ title: 'Error', description: err.message || 'Failed to load form', variant: 'destructive' })
        router.push('/dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchForm()
  }, [formId, router, toast])

  const handleSave = async (data: { title: string; description: string; fields: FormField[] }) => {
    if (isSaving) return
    if (!data.title.trim()) {
      toast({ title: 'Error', description: 'Please enter a form title', variant: 'destructive' })
      return
    }

    const token = await getValidToken()
    if (!token) {
      router.push('/auth/login')
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch(`/api/forms/${formId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to update form')
      }
      toast({ title: 'Saved', description: 'Form updated successfully!' })
      router.push('/dashboard')
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to update form', variant: 'destructive' })
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent mb-4" />
          <p className="text-gray-500 text-sm">Loading form…</p>
        </div>
      </div>
    )
  }

  return (
    <FormBuilder
      onSave={handleSave}
      isSaving={isSaving}
      mode="edit"
      initialTitle={formData?.title}
      initialDescription={formData?.description}
      initialFields={formData?.fields}
    />
  )
}
