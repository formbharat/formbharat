'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Settings, Bell, Webhook, Zap } from 'lucide-react'

export default function FormSettingsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Notification settings
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [emailRecipients, setEmailRecipients] = useState('')
  
  // Webhook settings
  const [webhookEnabled, setWebhookEnabled] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState('')

  // Multi-step settings
  const [multiStepEnabled, setMultiStepEnabled] = useState(false)

  useEffect(() => {
    fetchForm()
  }, [])

  const fetchForm = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/forms/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const data = await response.json()
      setForm(data)
      
      // Load settings
      setEmailEnabled(data.emailNotificationsEnabled || false)
      setEmailRecipients(data.emailRecipients?.join(', ') || '')
      setWebhookEnabled(data.webhookEnabled || false)
      setWebhookUrl(data.webhookUrl || '')
      setMultiStepEnabled(data.multiStepEnabled || false)
    } catch (error) {
      console.error('Error fetching form:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/forms/${params.id}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailNotificationsEnabled: emailEnabled,
          emailRecipients: emailRecipients.split(',').map(e => e.trim()).filter(Boolean),
          webhookEnabled,
          webhookUrl: webhookUrl.trim() || null,
          multiStepEnabled
        }),
      })

      if (!response.ok) throw new Error('Failed to save settings')

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading...</div>
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{form?.title} - Settings</h1>
          <p className="text-gray-600">Configure notifications, integrations, and advanced features</p>
        </div>

        <div className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>Get notified when someone submits this form</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-enabled">Enable email notifications</Label>
                <Switch
                  id="email-enabled"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
              
              {emailEnabled && (
                <div>
                  <Label htmlFor="email-recipients">Recipients (comma separated)</Label>
                  <Input
                    id="email-recipients"
                    placeholder="email1@example.com, email2@example.com"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Multiple emails can be added, separated by commas
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Webhook Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Webhook className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Webhook Integration</CardTitle>
                  <CardDescription>Send form responses to external services</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-enabled">Enable webhook</Label>
                <Switch
                  id="webhook-enabled"
                  checked={webhookEnabled}
                  onCheckedChange={setWebhookEnabled}
                />
              </div>
              
              {webhookEnabled && (
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    placeholder="https://your-server.com/webhook"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    We'll POST form responses to this URL in JSON format
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Multi-Step Forms */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Multi-Step Form</CardTitle>
                  <CardDescription>Break your form into multiple pages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="multistep-enabled">Enable multi-step form</Label>
                <Switch
                  id="multistep-enabled"
                  checked={multiStepEnabled}
                  onCheckedChange={setMultiStepEnabled}
                />
              </div>
              
              {multiStepEnabled && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Multi-step forms automatically group fields into pages of 3-4 fields each. 
                    Users can navigate with Next/Previous buttons.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Cancel
            </Button>
            <Button 
              onClick={saveSettings}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
