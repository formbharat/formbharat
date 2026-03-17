import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// PUT - Update form settings
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      emailNotificationsEnabled,
      emailRecipients,
      webhookEnabled,
      webhookUrl,
      multiStepEnabled
    } = await request.json()

    // Verify form ownership
    const form = await prisma.form.findUnique({
      where: { id: params.id },
      select: { userId: true }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    // Update form settings
    const updatedForm = await prisma.form.update({
      where: { id: params.id },
      data: {
        emailNotificationsEnabled: emailNotificationsEnabled || false,
        emailRecipients: emailRecipients || [],
        webhookEnabled: webhookEnabled || false,
        webhookUrl: webhookUrl || null,
        multiStepEnabled: multiStepEnabled || false
      }
    })

    return NextResponse.json({
      message: 'Settings updated successfully',
      settings: {
        emailNotificationsEnabled: updatedForm.emailNotificationsEnabled,
        emailRecipients: updatedForm.emailRecipients,
        webhookEnabled: updatedForm.webhookEnabled,
        webhookUrl: updatedForm.webhookUrl,
        multiStepEnabled: updatedForm.multiStepEnabled
      }
    })
  } catch (error) {
    console.error('Error updating form settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - Get form settings
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
        emailNotificationsEnabled: true,
        emailRecipients: true,
        webhookEnabled: true,
        webhookUrl: true,
        multiStepEnabled: true
      }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json({
      emailNotificationsEnabled: form.emailNotificationsEnabled,
      emailRecipients: form.emailRecipients,
      webhookEnabled: form.webhookEnabled,
      webhookUrl: form.webhookUrl,
      multiStepEnabled: form.multiStepEnabled
    })
  } catch (error) {
    console.error('Error fetching form settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
