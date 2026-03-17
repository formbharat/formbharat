import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET - Get webhook settings for a form
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const form = await prisma.form.findUnique({
      where: { id: params.id },
      select: { 
        userId: true,
        webhookUrl: true,
        webhookEnabled: true 
      }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json({
      webhookUrl: form.webhookUrl,
      webhookEnabled: form.webhookEnabled
    })
  } catch (error) {
    console.error('Error fetching webhook settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update webhook settings for a form
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { webhookUrl, webhookEnabled } = await request.json()

    const form = await prisma.form.findUnique({
      where: { id: params.id },
      select: { userId: true }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    const updatedForm = await prisma.form.update({
      where: { id: params.id },
      data: {
        webhookUrl: webhookUrl || null,
        webhookEnabled: webhookEnabled || false
      }
    })

    return NextResponse.json({
      webhookUrl: updatedForm.webhookUrl,
      webhookEnabled: updatedForm.webhookEnabled
    })
  } catch (error) {
    console.error('Error updating webhook settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to send webhook
export async function sendWebhook(webhookUrl: string, payload: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FormBharat-Webhook/1.0'
      },
      body: JSON.stringify(payload)
    })

    return response.ok
  } catch (error) {
    console.error('Error sending webhook:', error)
    return false
  }
}
