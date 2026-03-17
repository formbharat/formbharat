'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormBuilder } from '@/components/form-builder/FormBuilder'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { FormField } from '@/lib/types'

export default function BuilderPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showAuthDialog, setShowAuthDialog] = useState(false)
  const [formData, setFormData] = useState<{ title: string; description: string; fields: FormField[] } | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(true)
  const [templateData, setTemplateData] = useState<{ title: string; description: string; fields: FormField[] } | null>(null)

  useEffect(() => {
    const savedTemplate = localStorage.getItem('selected-template')
    console.log('Builder: Checking localStorage for template')
    console.log('Saved template data:', savedTemplate)
    
    if (savedTemplate) {
      try {
        const template = JSON.parse(savedTemplate)
        console.log('Builder: Parsed template:', {
          id: template.id,
          title: template.title,
          fieldsCount: template.fields?.length
        })
        
        setTemplateData({
          title: template.title,
          description: template.description,
          fields: template.fields
        })
        localStorage.removeItem('selected-template')
        
        console.log('Builder: Template data set to state')
        
        toast({
          title: 'Template Loaded',
          description: `"${template.title}" template has been loaded. Customize and save it!`,
        })
      } catch (error) {
        console.error('Error loading template:', error)
      }
    } else {
      console.log('Builder: No template found in localStorage')
    }
  }, [toast])

  const handleSave = (data: { title: string; description: string; fields: FormField[] }) => {
    if (!data.title.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a form title',
        variant: 'destructive',
      })
      return
    }

    if (data.fields.length === 0) {
      toast({
        title: 'Error',
        description: 'Please add at least one field to your form',
        variant: 'destructive',
      })
      return
    }

    setFormData(data)
    setShowAuthDialog(true)
  }

  const handleAuth = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter email and password',
        variant: 'destructive',
      })
      return
    }

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed')
      }

      if (formData) {
        const saveResponse = await fetch('/api/forms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })

        if (!saveResponse.ok) {
          throw new Error('Failed to save form')
        }

        const savedForm = await saveResponse.json()
        
        toast({
          title: 'Success',
          description: 'Form saved successfully!',
        })

        router.push(`/dashboard`)
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <>
      <FormBuilder 
        onSave={handleSave}
        initialTitle={templateData?.title}
        initialDescription={templateData?.description}
        initialFields={templateData?.fields}
      />
      
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isSignUp ? 'Sign up to save your form' : 'Login to save your form'}</DialogTitle>
            <DialogDescription>
              {isSignUp 
                ? 'Create an account to save and manage your forms'
                : 'Login to your account to save this form'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <Button onClick={handleAuth} className="w-full">
              {isSignUp ? 'Sign Up & Save Form' : 'Login & Save Form'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full"
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
