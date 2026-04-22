import { NextRequest, NextResponse } from 'next/server'
import { invokeBedrock, calculateCost } from '@/lib/bedrock'
import { createClient } from '@supabase/supabase-js'
import { FieldType } from '@/lib/types'
import { checkIPRateLimit, getClientIP } from '@/lib/rate-limit'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Rate limiting: Unlimited for authenticated users, 3 per IP for guests
const USER_RATE_LIMIT = 999 // Effectively unlimited for verified users
const GUEST_IP_LIMIT = 3
const RATE_WINDOW = 24 * 60 * 60 * 1000 // 24 hours

interface GenerateFormRequest {
  description: string
  language?: 'en' | 'hi'
  formType?: 'feedback' | 'registration' | 'survey' | 'order' | 'contact'
}

interface GeneratedForm {
  title: string
  description: string
  fields: Array<{
    type: FieldType
    label: string
    placeholder: string
    required: boolean
    options?: string[]
  }>
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    // 2. Check rate limit for authenticated users (effectively unlimited after email verification)
    const { data: usageData } = await supabase
      .from('ai_usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('feature', 'generate-form')
      .gte('created_at', new Date(Date.now() - RATE_WINDOW).toISOString())

    if (usageData && usageData.length >= USER_RATE_LIMIT) {
      return NextResponse.json(
        { error: `Rate limit exceeded. You can generate ${USER_RATE_LIMIT} forms per day.` },
        { status: 429 }
      )
    }

    // 3. Parse request
    const body: GenerateFormRequest = await request.json()
    const { description, language = 'en', formType } = body

    if (!description || description.trim().length < 10) {
      return NextResponse.json(
        { error: 'Description must be at least 10 characters' },
        { status: 400 }
      )
    }

    if (description.length > 500) {
      return NextResponse.json(
        { error: 'Description must be less than 500 characters' },
        { status: 400 }
      )
    }

    // 4. Build system prompt
    const systemPrompt = `You are an expert form designer. Generate a professional form based on the user's description.

Rules:
1. Return ONLY valid JSON, no markdown or explanations
2. Generate 5-10 relevant fields
3. Use appropriate field types: text, email, phone, textarea, dropdown, radio, checkbox
4. Make critical fields required (name, email, etc.)
5. Add helpful placeholder text
6. For dropdown/radio/checkbox, provide 3-5 relevant options
7. Title should be professional and clear
8. Description should be 1-2 sentences

${language === 'hi' ? 'Generate all text in Hindi (Devanagari script).' : 'Generate all text in English.'}

JSON Schema:
{
  "title": "string",
  "description": "string",
  "fields": [
    {
      "type": "text" | "email" | "phone" | "textarea" | "dropdown" | "radio" | "checkbox",
      "label": "string",
      "placeholder": "string",
      "required": boolean,
      "options": ["string"] // only for dropdown/radio/checkbox
    }
  ]
}`

    // 5. Build user prompt
    let userPrompt = `Generate a form for: ${description}`
    if (formType) {
      userPrompt += `\n\nForm type: ${formType}`
    }

    // 6. Invoke Bedrock (use Llama 3 70B - no use case approval needed)
    // TODO: Switch to Claude Haiku after submitting use case to AWS
    const { text, usage } = await invokeBedrock({
      model: 'meta.llama3-70b-instruct-v1:0',
      systemPrompt,
      prompt: userPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    })

    // 7. Parse AI response
    let generatedForm: GeneratedForm
    try {
      // Extract JSON from response (AI might wrap it in markdown)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      generatedForm = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Failed to parse AI response:', text)
      return NextResponse.json(
        { error: 'Failed to generate form. Please try rephrasing your description.' },
        { status: 500 }
      )
    }

    // 8. Validate generated form
    if (!generatedForm.title || !generatedForm.fields || generatedForm.fields.length === 0) {
      return NextResponse.json(
        { error: 'Invalid form generated. Please try again.' },
        { status: 500 }
      )
    }

    // 9. Log usage for analytics and billing
    const cost = calculateCost(
      'meta.llama3-70b-instruct-v1:0',
      usage.inputTokens,
      usage.outputTokens
    )

    await supabase.from('ai_usage').insert({
      user_id: user.id,
      feature: 'generate-form',
      tokens_used: usage.inputTokens + usage.outputTokens,
      cost,
      metadata: {
        description,
        language,
        formType,
        fieldCount: generatedForm.fields.length,
      },
    })

    // 10. Return generated form
    return NextResponse.json({
      ...generatedForm,
      metadata: {
        tokensUsed: usage.inputTokens + usage.outputTokens,
        cost: cost.toFixed(4),
        remainingGenerations: USER_RATE_LIMIT - (usageData?.length || 0) - 1,
      },
    })
  } catch (error: any) {
    console.error('AI form generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate form' },
      { status: 500 }
    )
  }
}
