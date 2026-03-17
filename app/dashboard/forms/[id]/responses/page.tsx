'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Download, BarChart3, Calendar, Loader2 } from 'lucide-react'

export default function ResponsesPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFormAndResponses()
  }, [])

  const fetchFormAndResponses = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/login')
        return
      }

      const [formRes, responsesRes] = await Promise.all([
        fetch(`/api/forms/${params.id}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`/api/forms/${params.id}/responses`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ])

      if (!formRes.ok || !responsesRes.ok) {
        throw new Error('Failed to fetch data')
      }

      const formData = await formRes.json()
      const responsesData = await responsesRes.json()

      setForm(formData)
      setResponses(responsesData)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load responses',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    if (responses.length === 0) return

    const headers = form.fields.map((f: any) => f.label)
    const rows = responses.map((r: any) => 
      form.fields.map((f: any) => {
        const value = r.data[f.id]
        return Array.isArray(value) ? value.join(', ') : value || ''
      })
    )

    const csv = [
      headers.join(','),
      ...rows.map((row: any) => row.map((cell: string) => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${form.title.replace(/\s+/g, '_')}_responses.csv`
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: 'Success',
      description: 'Responses exported successfully!',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading responses...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="py-12 text-center">
            <p className="text-gray-600 font-medium">Form not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mb-4">{form.description}</p>
          )}
          <div className="flex items-center justify-between">
            <p className="text-gray-500">
              Total: {responses.length} {responses.length === 1 ? 'response' : 'responses'}
            </p>
            {responses.length > 0 && (
              <Button onClick={exportToCSV} variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export to CSV
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {responses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Responses</CardTitle>
                <BarChart3 className="h-5 w-5 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{responses.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Latest Response</CardTitle>
                <Calendar className="h-5 w-5 text-pink-500" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {new Date(responses[0]?.createdAt).toLocaleDateString()}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(responses[0]?.createdAt).toLocaleTimeString()}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Form Fields</CardTitle>
                <BarChart3 className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{form.fields?.length || 0}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Responses List */}
        {responses.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No responses yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Share your form to start collecting responses. Copy the form link from your dashboard.
              </p>
              <Link href="/dashboard">
                <Button variant="outline">Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {responses.map((response, idx) => (
              <Card key={response.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Response #{responses.length - idx}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(response.createdAt).toLocaleString()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid gap-4">
                    {form.fields.map((field: any) => {
                      const value = response.data[field.id]
                      if (!value && value !== 0 && value !== false) return null

                      return (
                        <div key={field.id} className="border-l-4 border-orange-300 pl-4 py-2">
                          <div className="text-sm font-semibold text-gray-700 mb-1">
                            {field.label}
                          </div>
                          <div className="text-gray-900">
                            {Array.isArray(value) ? value.join(', ') : String(value)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
