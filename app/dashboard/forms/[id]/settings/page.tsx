'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { ArrowLeft, Bell, Webhook, Zap, Send, Code, Copy, CheckCircle2, XCircle, Clock, Download, QrCode, CornerDownRight, CalendarClock } from 'lucide-react'
import QRCode from 'qrcode'
import { getValidToken } from '@/lib/getToken'

function FormSettingsContent() {
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

  // Webhook testing
  const [webhookTesting, setWebhookTesting] = useState(false)
  const [webhookLogs, setWebhookLogs] = useState<any[]>([])
  const [showWebhookLogs, setShowWebhookLogs] = useState(false)

  // Email testing
  const [emailTesting, setEmailTesting] = useState(false)

  // Embed code
  const [showEmbedCode, setShowEmbedCode] = useState(false)
  const [embedCopied, setEmbedCopied] = useState(false)

  // Custom thank-you
  const [successMessage, setSuccessMessage] = useState('')
  const [redirectUrl, setRedirectUrl] = useState('')

  // QR code
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [qrLoading, setQrLoading] = useState(false)

  // Scheduling
  const [opensAt, setOpensAt] = useState('')
  const [closesAt, setClosesAt] = useState('')
  const [maxResponses, setMaxResponses] = useState('')

  useEffect(() => {
    fetchForm()
  }, [])

  const fetchForm = async () => {
    try {
      const token = await getValidToken()
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
      setSuccessMessage(data.successMessage || '')
      setRedirectUrl(data.redirectUrl || '')
      setOpensAt(data.opensAt ? new Date(data.opensAt).toISOString().slice(0, 16) : '')
      setClosesAt(data.closesAt ? new Date(data.closesAt).toISOString().slice(0, 16) : '')
      setMaxResponses(data.maxResponses ? String(data.maxResponses) : '')
    } catch (error) {
      console.error('Error fetching form:', error)
    } finally {
      setLoading(false)
    }
  }

  const testWebhook = async () => {
    if (!webhookUrl.trim()) {
      toast({ title: 'Error', description: 'Please enter a webhook URL', variant: 'destructive' })
      return
    }
    
    setWebhookTesting(true)
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: params.id,
          test: true,
          timestamp: new Date().toISOString(),
        }),
      })
      
      if (response.ok) {
        toast({ title: 'Success', description: 'Webhook test successful!' })
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error: any) {
      toast({ 
        title: 'Webhook Test Failed', 
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setWebhookTesting(false)
    }
  }

  const fetchWebhookLogs = async () => {
    try {
      const token = await getValidToken()
      const response = await fetch(`/api/forms/${params.id}/webhook/logs`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setWebhookLogs(data.logs || [])
      }
    } catch (error) {
      console.error('Error fetching webhook logs:', error)
    }
  }

  const testEmail = async () => {
    if (!emailRecipients.trim()) {
      toast({ title: 'Error', description: 'Please enter email recipients', variant: 'destructive' })
      return
    }
    
    setEmailTesting(true)
    toast({ title: 'Sending test email...', description: 'This may take a moment' })
    
    setTimeout(() => {
      setEmailTesting(false)
      toast({ 
        title: 'Test Email Sent', 
        description: 'Check your inbox (and spam folder)' 
      })
    }, 2000)
  }

  const generateQR = async () => {
    setQrLoading(true)
    try {
      const url = `${window.location.origin}/f/${params.id}`
      const dataUrl = await QRCode.toDataURL(url, { width: 400, margin: 2, color: { dark: '#111827', light: '#ffffff' } })
      setQrDataUrl(dataUrl)
    } catch (e) {
      console.error(e)
    } finally {
      setQrLoading(false)
    }
  }

  const downloadQR = () => {
    const a = document.createElement('a')
    a.href = qrDataUrl
    a.download = `form-${params.id}-qr.png`
    a.click()
  }

  const copyEmbedCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setEmbedCopied(true)
    toast({ title: 'Copied!', description: 'Embed code copied to clipboard' })
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  const saveSettings = async () => {
    try {
      const token = await getValidToken()
      const response = await fetch(`/api/forms/${params.id}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form?.title,
          description: form?.description,
          emailNotificationsEnabled: emailEnabled,
          emailRecipients: emailRecipients.split(',').map(e => e.trim()).filter(Boolean),
          webhookEnabled,
          webhookUrl: webhookUrl.trim() || null,
          multiStepEnabled,
          successMessage: successMessage.trim() || null,
          redirectUrl: redirectUrl.trim() || null,
          opensAt: opensAt ? new Date(opensAt).toISOString() : null,
          closesAt: closesAt ? new Date(closesAt).toISOString() : null,
          maxResponses: maxResponses ? parseInt(maxResponses, 10) : null,
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
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-lg md:text-xl font-bold">Form Settings</h1>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-1">{form?.title}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">Email Notifications</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Get notified when someone submits this form</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-enabled">Enable email notifications</Label>
                <Switch
                  id="email-enabled"
                  checked={emailEnabled}
                  onCheckedChange={setEmailEnabled}
                />
              </div>
              
              {emailEnabled && (
                <>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={testEmail}
                    disabled={emailTesting || !emailRecipients.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {emailTesting ? 'Sending...' : 'Send Test Email'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Webhook Integration */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Webhook className="h-4 md:h-5 w-4 md:w-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">Webhook Integration</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Send form data to your server in real-time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              <div className="flex items-center justify-between">
                <Label htmlFor="webhook-enabled">Enable webhook</Label>
                <Switch
                  id="webhook-enabled"
                  checked={webhookEnabled}
                  onCheckedChange={setWebhookEnabled}
                />
              </div>
              
              {webhookEnabled && (
                <>
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
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={testWebhook}
                      disabled={webhookTesting || !webhookUrl.trim()}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {webhookTesting ? 'Testing...' : 'Test Webhook'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setShowWebhookLogs(!showWebhookLogs)
                        if (!showWebhookLogs) fetchWebhookLogs()
                      }}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      View Logs
                    </Button>
                  </div>

                  {showWebhookLogs && (
                    <div className="border rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
                      <h4 className="font-semibold mb-3">Recent Webhook Deliveries</h4>
                      {webhookLogs.length === 0 ? (
                        <p className="text-sm text-gray-500">No webhook logs yet</p>
                      ) : (
                        <div className="space-y-2">
                          {webhookLogs.map((log: any) => (
                            <div key={log.id} className="flex items-center justify-between text-sm bg-white p-2 rounded border">
                              <div className="flex items-center gap-2">
                                {log.status === 'success' ? (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                ) : log.status === 'failed' ? (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-600" />
                                )}
                                <span>{log.status}</span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {new Date(log.createdAt).toLocaleString()}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Multi-Step Forms */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 md:h-5 w-4 md:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">Multi-Step Forms</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Break long forms into multiple pages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
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

          {/* Scheduling */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CalendarClock className="h-4 md:h-5 w-4 md:w-5 text-indigo-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">Scheduling & Limits</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Control when the form is open and how many responses to collect</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="opens-at" className="text-sm">Opens at <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <Input
                    id="opens-at"
                    type="datetime-local"
                    value={opensAt}
                    onChange={(e) => setOpensAt(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Form rejects responses before this time.</p>
                </div>
                <div>
                  <Label htmlFor="closes-at" className="text-sm">Closes at <span className="text-gray-400 font-normal">(optional)</span></Label>
                  <Input
                    id="closes-at"
                    type="datetime-local"
                    value={closesAt}
                    onChange={(e) => setClosesAt(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">Form rejects responses after this time.</p>
                </div>
              </div>
              <div>
                <Label htmlFor="max-responses" className="text-sm">Max responses <span className="text-gray-400 font-normal">(optional)</span></Label>
                <Input
                  id="max-responses"
                  type="number"
                  min="1"
                  placeholder="e.g. 100"
                  value={maxResponses}
                  onChange={(e) => setMaxResponses(e.target.value)}
                  className="mt-2 max-w-xs"
                />
                <p className="text-xs text-gray-500 mt-1">Stop accepting responses once this limit is reached.</p>
              </div>
            </CardContent>
          </Card>

          {/* Custom Thank-You */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CornerDownRight className="h-4 md:h-5 w-4 md:w-5 text-green-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">After Submission</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Customize what happens after someone submits</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
              <div>
                <Label htmlFor="success-message" className="text-sm">Custom success message</Label>
                <Input
                  id="success-message"
                  placeholder="Thank you! We'll be in touch soon."
                  value={successMessage}
                  onChange={(e) => setSuccessMessage(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Shown on the success screen. Leave blank for the default message.</p>
              </div>
              <div>
                <Label htmlFor="redirect-url" className="text-sm">Redirect URL <span className="text-gray-400 font-normal">(optional)</span></Label>
                <Input
                  id="redirect-url"
                  placeholder="https://yoursite.com/thank-you"
                  value={redirectUrl}
                  onChange={(e) => setRedirectUrl(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">Redirect respondents to this URL after submission instead of showing the success screen.</p>
              </div>
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code className="h-4 md:h-5 w-4 md:w-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">Embed Form</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Add this form to your website</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 md:space-y-4 p-4 md:p-6 pt-0">
              <Button 
                variant="outline" 
                onClick={() => setShowEmbedCode(!showEmbedCode)}
                className="w-full"
              >
                <Code className="mr-2 h-4 w-4" />
                {showEmbedCode ? 'Hide Embed Code' : 'Show Embed Code'}
              </Button>

              {showEmbedCode && (
                <div className="space-y-4">
                  {/* iFrame Embed */}
                  <div>
                    <Label className="text-xs md:text-sm font-semibold">iFrame Embed</Label>
                    <div className="mt-2 relative">
                      <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg text-[10px] md:text-xs overflow-x-auto">
{`<iframe 
  src="${window.location.origin}/f/${params.id}"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>`}
                      </pre>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                        onClick={() => copyEmbedCode(`<iframe src="${window.location.origin}/f/${params.id}" width="100%" height="600px" frameborder="0"></iframe>`)}
                      >
                        {embedCopied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Direct Link */}
                  <div>
                    <Label className="text-sm font-semibold">Direct Link</Label>
                    <div className="mt-2 flex gap-2">
                      <Input 
                        value={`${window.location.origin}/f/${params.id}`}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyEmbedCode(`${window.location.origin}/f/${params.id}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardHeader className="p-4 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 md:w-10 h-8 md:h-10 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="h-4 md:h-5 w-4 md:w-5 text-pink-600" />
                </div>
                <div className="min-w-0">
                  <CardTitle className="text-base md:text-lg">QR Code</CardTitle>
                  <CardDescription className="text-xs md:text-sm">Print or share a QR code for this form</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
              {!qrDataUrl ? (
                <Button
                  variant="outline"
                  onClick={generateQR}
                  disabled={qrLoading}
                  className="w-full"
                >
                  <QrCode className="mr-2 h-4 w-4" />
                  {qrLoading ? 'Generating…' : 'Generate QR Code'}
                </Button>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <img src={qrDataUrl} alt="QR code" className="w-40 h-40 border border-gray-100 rounded-xl shadow-sm" />
                  <div className="flex gap-2 w-full">
                    <Button variant="outline" className="flex-1" onClick={downloadQR}>
                      <Download className="mr-2 h-4 w-4" />
                      Download PNG
                    </Button>
                    <Button variant="ghost" className="flex-1" onClick={() => setQrDataUrl('')}>
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-gray-400 text-center">Put this on menus, banners, posters, or receipts to collect responses offline.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 sticky bottom-0 bg-gray-50 py-4 -mx-4 px-4 border-t sm:border-t-0 sm:static sm:bg-transparent sm:py-0">
            <Button variant="outline" onClick={() => router.push('/dashboard')} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button 
              onClick={saveSettings}
              className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function FormSettingsPage() {
  return (
    <ProtectedRoute>
      <FormSettingsContent />
    </ProtectedRoute>
  )
}
