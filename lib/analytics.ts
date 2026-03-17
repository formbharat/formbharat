// Analytics utilities for form responses

export interface FormAnalytics {
  totalResponses: number
  responseRate: number
  averageCompletionTime: number
  fieldAnalytics: FieldAnalytics[]
  responsesOverTime: TimeSeriesData[]
  topReferrers: string[]
}

export interface FieldAnalytics {
  fieldId: string
  fieldLabel: string
  fieldType: string
  responseCount: number
  uniqueValues: number
  topAnswers?: { value: string; count: number }[]
  completionRate: number
}

export interface TimeSeriesData {
  date: string
  count: number
}

export function calculateFormAnalytics(form: any, responses: any[]): FormAnalytics {
  const totalResponses = responses.length
  const responseRate = form.views ? (totalResponses / form.views) * 100 : 0

  // Calculate responses over time (last 30 days)
  const responsesOverTime = generateTimeSeriesData(responses, 30)

  // Calculate field-level analytics
  const fieldAnalytics = form.fields.map((field: any) => 
    calculateFieldAnalytics(field, responses)
  )

  return {
    totalResponses,
    responseRate,
    averageCompletionTime: 0, // Can be calculated if we track timestamps
    fieldAnalytics,
    responsesOverTime,
    topReferrers: []
  }
}

function calculateFieldAnalytics(field: any, responses: any[]): FieldAnalytics {
  const fieldResponses = responses.map(r => r.data[field.id]).filter(Boolean)
  const responseCount = fieldResponses.length
  const completionRate = responses.length > 0 ? (responseCount / responses.length) * 100 : 0

  // Get unique values
  const uniqueValues = new Set(
    fieldResponses.map(v => Array.isArray(v) ? v.join(',') : String(v))
  ).size

  // Calculate top answers for categorical fields
  let topAnswers: { value: string; count: number }[] = []
  if (['radio', 'dropdown', 'checkbox'].includes(field.type)) {
    const valueCounts = new Map<string, number>()
    
    fieldResponses.forEach(response => {
      const values = Array.isArray(response) ? response : [response]
      values.forEach(val => {
        const key = String(val)
        valueCounts.set(key, (valueCounts.get(key) || 0) + 1)
      })
    })

    topAnswers = Array.from(valueCounts.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  }

  return {
    fieldId: field.id,
    fieldLabel: field.label,
    fieldType: field.type,
    responseCount,
    uniqueValues,
    topAnswers: topAnswers.length > 0 ? topAnswers : undefined,
    completionRate
  }
}

function generateTimeSeriesData(responses: any[], days: number): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const now = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]

    const count = responses.filter(r => {
      const responseDate = new Date(r.createdAt).toISOString().split('T')[0]
      return responseDate === dateStr
    }).length

    data.push({ date: dateStr, count })
  }

  return data
}
