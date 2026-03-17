'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, Users, Clock, BarChart3, PieChart } from 'lucide-react'
import { calculateFormAnalytics, FormAnalytics } from '@/lib/analytics'

export default function AnalyticsPage() {
  const params = useParams()
  const [form, setForm] = useState<any>(null)
  const [responses, setResponses] = useState<any[]>([])
  const [analytics, setAnalytics] = useState<FormAnalytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch form
      const formResponse = await fetch(`/api/forms/${params.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const formData = await formResponse.json()
      setForm(formData)

      // Fetch responses
      const responsesResponse = await fetch(`/api/forms/${params.id}/responses`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      const responsesData = await responsesResponse.json()
      setResponses(responsesData)

      // Calculate analytics
      const analyticsData = calculateFormAnalytics(formData, responsesData)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading analytics...</div>
      </div>
    )
  }

  if (!form || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>No data available</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-1 md:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="hidden md:inline text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 line-clamp-1">{form.title} - Analytics</h1>
          <p className="text-sm md:text-base text-gray-600">Detailed insights and statistics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Responses</CardTitle>
              <Users className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.totalResponses}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics.responseRate.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg. Time</CardTitle>
              <Clock className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">--</div>
              <p className="text-xs text-gray-500">Coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Form Fields</CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{form.fields.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Responses Over Time */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Responses Over Time (Last 30 Days)</CardTitle>
            <CardDescription>Daily response trend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-1">
              {analytics.responsesOverTime.map((data, index) => {
                const maxCount = Math.max(...analytics.responsesOverTime.map(d => d.count), 1)
                const height = (data.count / maxCount) * 100
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-orange-500 to-pink-500 rounded-t transition-all hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: data.count > 0 ? '4px' : '0px' }}
                      title={`${data.date}: ${data.count} responses`}
                    />
                    <div className="text-xs text-gray-400 mt-2 rotate-45 origin-left">
                      {new Date(data.date).getDate()}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Field Analytics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Field-by-Field Analysis</h2>
          
          {analytics.fieldAnalytics.map((fieldData) => (
            <Card key={fieldData.fieldId}>
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-base md:text-lg">{fieldData.fieldLabel}</CardTitle>
                <CardDescription>
                  {fieldData.fieldType} • {fieldData.responseCount} responses • {fieldData.completionRate.toFixed(1)}% completion rate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Responses</div>
                      <div className="text-2xl font-bold">{fieldData.responseCount}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Unique Values</div>
                      <div className="text-2xl font-bold">{fieldData.uniqueValues}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Completion</div>
                      <div className="text-2xl font-bold">{fieldData.completionRate.toFixed(0)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Type</div>
                      <div className="text-lg font-semibold capitalize">{fieldData.fieldType}</div>
                    </div>
                  </div>

                  {/* Top Answers */}
                  {fieldData.topAnswers && fieldData.topAnswers.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Top Answers</h4>
                      <div className="space-y-2">
                        {fieldData.topAnswers.map((answer, index) => {
                          const percentage = (answer.count / fieldData.responseCount) * 100
                          return (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">{answer.value}</span>
                                <span className="text-gray-600">{answer.count} ({percentage.toFixed(1)}%)</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
