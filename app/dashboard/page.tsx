'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Copy, ExternalLink, Eye, Trash2, Plus, BarChart3, FileText, Users, TrendingUp, MoreVertical, Edit, Share2, CopyPlus, LineChart, Settings, LogOut, Sparkles, Wand2, X } from 'lucide-react'
import { AIFormGenerator } from '@/components/AIFormGenerator'
import { getValidToken, clearSession } from '@/lib/getToken'

function DashboardContent() {
  const router = useRouter()
  const { toast } = useToast()
  const [forms, setForms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showAIGenerator, setShowAIGenerator] = useState(false)
  const [showAIBanner, setShowAIBanner] = useState(true)

  useEffect(() => {
    fetchForms()
  }, [])

  const handleLogout = () => {
    clearSession()
    router.push('/')
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    })
  }

  const fetchForms = async () => {
    try {
      const token = await getValidToken()
      if (!token) {
        router.push('/auth/login')
        return
      }

      const response = await fetch('/api/forms', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to fetch forms')
      
      const data = await response.json()
      setForms(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load forms',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const copyFormLink = (formId: string) => {
    const link = `${window.location.origin}/f/${formId}`
    navigator.clipboard.writeText(link)
    toast({
      title: 'Copied!',
      description: 'Form link copied to clipboard',
    })
  }

  const shareOnWhatsApp = (formId: string, formTitle: string) => {
    const link = `${window.location.origin}/f/${formId}`
    const message = `Fill out my form: ${formTitle}\n\n${link}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    toast({
      title: 'Opening WhatsApp',
      description: 'Share your form via WhatsApp',
    })
  }

  const handleAIFormGenerated = async (form: { title: string; description: string; fields: any[] }) => {
    try {
      const token = await getValidToken()
      if (!token) {
        router.push('/auth/login')
        return
      }

      // Save the AI-generated form
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          fields: form.fields,
        }),
      })

      if (!response.ok) throw new Error('Failed to save form')

      const savedForm = await response.json()

      toast({
        title: 'Form created! ✨',
        description: 'Your AI-generated form has been saved. Redirecting to builder...',
      })

      // Redirect to builder to edit the form
      setTimeout(() => {
        router.push(`/builder/${savedForm.id}`)
      }, 1000)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save AI-generated form',
        variant: 'destructive',
      })
    }
  }

  const deleteForm = async (formId: string) => {
    if (!confirm('Are you sure you want to delete this form?')) return

    try {
      const token = await getValidToken()
      const response = await fetch(`/api/forms/${formId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to delete form')

      toast({
        title: 'Success',
        description: 'Form deleted successfully',
      })
      
      fetchForms()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete form',
        variant: 'destructive',
      })
    }
  }

  const totalResponses = forms.reduce((sum, form) => sum + (form._count?.responses || 0), 0)
  const totalForms = forms.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
            <div className="flex gap-2 md:gap-4 items-center">
              <Button 
                size="sm" 
                onClick={() => setShowAIGenerator(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Sparkles className="mr-0 md:mr-2 h-4 w-4" />
                <span className="hidden md:inline">AI Generate</span>
                <span className="md:hidden">AI</span>
              </Button>
              <Link href="/builder">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  <Plus className="mr-0 md:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Create Form</span>
                  <span className="sm:hidden">New</span>
                </Button>
              </Link>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Forms</h1>
          <p className="text-sm md:text-base text-gray-600">Create, manage, and track your forms</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium">Total Forms</CardTitle>
              <FileText className="h-3 md:h-4 w-3 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <div className="text-xl md:text-2xl font-bold">{totalForms}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4 md:p-6">
              <CardTitle className="text-xs md:text-sm font-medium">Responses</CardTitle>
              <Users className="h-3 md:h-4 w-3 md:w-4 text-gray-600" />
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0">
              <div className="text-xl md:text-2xl font-bold">{totalResponses}</div>
            </CardContent>
          </Card>
          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
          <Card className="hidden md:block">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
            </CardContent>
          </Card>
        </div>

        {/* AI Banner — shown when user has forms */}
        {forms.length > 0 && showAIBanner && (
          <div className="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-[1px]">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 px-5 py-4">
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Create forms 10x faster with AI</p>
                  <p className="text-sm text-gray-600">Describe your form in plain English — AI builds it in seconds</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  onClick={() => setShowAIGenerator(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  size="sm"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Try AI Generator
                </Button>
                <button
                  onClick={() => setShowAIBanner(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forms List */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold">Your Forms</h2>
          {forms.length > 0 && (
            <Link href="/builder">
              <Button variant="outline" size="sm" className="hidden sm:flex">
                <Plus className="mr-2 h-4 w-4" />
                New Form
              </Button>
            </Link>
          )}
        </div>

        {loading ? (
          <Card>
            <CardContent className="py-8 md:py-12 text-center">
              <div className="inline-block h-6 md:h-8 w-6 md:w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
              <p className="mt-4 text-sm md:text-base text-gray-600">Loading your forms...</p>
            </CardContent>
          </Card>
        ) : forms.length === 0 ? (
          <div className="space-y-4">
            {/* AI Hero Card */}
            <Card className="border-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white overflow-hidden">
              <CardContent className="py-10 md:py-12 text-center px-6 relative">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wand2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Create your first form with AI</h3>
                  <p className="text-white/80 mb-6 max-w-sm mx-auto text-sm md:text-base">
                    Just describe what you need in plain English — AI creates a complete form in seconds
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => setShowAIGenerator(true)}
                      className="bg-white text-purple-700 hover:bg-white/90 font-semibold"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </Button>
                    <Link href="/builder" className="w-full sm:w-auto">
                      <Button variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/10">
                        <Plus className="mr-2 h-4 w-4" />
                        Start from Scratch
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Secondary options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/templates">
                <Card className="border-dashed hover:border-orange-300 hover:bg-orange-50 transition-colors cursor-pointer h-full">
                  <CardContent className="py-6 text-center">
                    <FileText className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Browse Templates</p>
                    <p className="text-xs text-gray-500 mt-1">12+ industry-specific templates</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/builder">
                <Card className="border-dashed hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer h-full">
                  <CardContent className="py-6 text-center">
                    <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="font-medium text-gray-900">Blank Form</p>
                    <p className="text-xs text-gray-500 mt-1">Build from scratch, your way</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-base md:text-lg line-clamp-2">{form.title}</CardTitle>
                    <div className={`px-2 py-0.5 md:py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      form.published 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {form.published ? 'Published' : 'Draft'}
                    </div>
                  </div>
                  {form.description && (
                    <CardDescription className="line-clamp-2 text-xs md:text-sm">{form.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0">
                  <div className="space-y-3 md:space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4 text-sm">
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Responses</div>
                        <div className="font-semibold text-base md:text-lg">{form._count?.responses || 0}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 text-xs mb-1">Fields</div>
                        <div className="font-semibold text-base md:text-lg">{form.fields?.length || 0}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs md:text-sm"
                          onClick={() => copyFormLink(form.id)}
                        >
                          <Copy className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                          Copy
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 border-green-200 text-xs md:text-sm"
                          onClick={() => shareOnWhatsApp(form.id, form.title)}
                        >
                          <Share2 className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                          <span className="hidden sm:inline">WhatsApp</span>
                          <span className="sm:hidden">Share</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(`/f/${form.id}`, '_blank')}
                        >
                          <ExternalLink className="h-3 md:h-4 w-3 md:w-4" />
                        </Button>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/dashboard/forms/${form.id}/responses`} className="flex-1">
                          <Button 
                            variant="secondary" 
                            size="sm" 
                            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600 text-xs md:text-sm"
                          >
                            <Eye className="mr-1 md:mr-2 h-3 md:h-4 w-3 md:w-4" />
                            Responses
                          </Button>
                        </Link>
                        <Link href={`/builder/${form.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            title="Edit form"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                          >
                            <Edit className="h-3 md:h-4 w-3 md:w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/forms/${form.id}/analytics`}>
                          <Button
                            variant="outline"
                            size="sm"
                            title="View Analytics"
                          >
                            <LineChart className="h-3 md:h-4 w-3 md:w-4" />
                          </Button>
                        </Link>
                        <Link href={`/dashboard/forms/${form.id}/settings`}>
                          <Button
                            variant="outline"
                            size="sm"
                            title="Form Settings"
                          >
                            <Settings className="h-3 md:h-4 w-3 md:w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteForm(form.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          title="Delete form"
                        >
                          <Trash2 className="h-3 md:h-4 w-3 md:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* AI Form Generator Modal */}
      <AIFormGenerator
        open={showAIGenerator}
        onOpenChange={setShowAIGenerator}
        onFormGenerated={handleAIFormGenerated}
      />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
