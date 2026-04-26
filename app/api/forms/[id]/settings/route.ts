import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// PUT - Update form settings
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const {
      title,
      description,
      emailNotificationsEnabled,
      emailRecipients,
      webhookEnabled,
      webhookUrl,
      multiStepEnabled,
      successMessage,
      redirectUrl,
      opensAt,
      closesAt,
      maxResponses,
    } = await request.json()

    // Verify form ownership
    const form = await prisma.form.findUnique({
      where: { id: id },
      select: { userId: true }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    // Update form settings
    const updatedForm = await prisma.form.update({
      where: { id: id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(emailNotificationsEnabled !== undefined && { emailNotificationsEnabled }),
        ...(emailRecipients !== undefined && { emailRecipients }),
        ...(webhookEnabled !== undefined && { webhookEnabled }),
        ...(webhookUrl !== undefined && { webhookUrl }),
        ...(multiStepEnabled !== undefined && { multiStepEnabled }),
        ...(successMessage !== undefined && { successMessage }),
        ...(redirectUrl !== undefined && { redirectUrl }),
        ...(opensAt !== undefined && { opensAt: opensAt ? new Date(opensAt) : null }),
        ...(closesAt !== undefined && { closesAt: closesAt ? new Date(closesAt) : null }),
        ...(maxResponses !== undefined && { maxResponses: maxResponses ? Number(maxResponses) : null }),
      }
    })

    return NextResponse.json({
      message: 'Settings updated successfully',
      form: updatedForm
    })
  } catch (error) {
    console.error('Error updating form settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET - Get form settings
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const form = await prisma.form.findUnique({
      where: { id: id },
      select: {
        userId: true,
        title: true,
        description: true
      }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json({
      title: form.title,
      description: form.description
    })
  } catch (error) {
    console.error('Error fetching form settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
