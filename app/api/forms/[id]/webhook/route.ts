import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

// GET - Get webhook settings for a form
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
        title: true
      }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    return NextResponse.json({
      title: form.title
    })
  } catch (error) {
    console.error('Error fetching webhook settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT - Update webhook settings for a form
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

    const { title } = await request.json()

    const form = await prisma.form.findUnique({
      where: { id: id },
      select: { userId: true }
    })

    if (!form || form.userId !== user.id) {
      return NextResponse.json({ error: 'Form not found' }, { status: 404 })
    }

    const updatedForm = await prisma.form.update({
      where: { id: id },
      data: {
        title
      }
    })

    return NextResponse.json({
      title: updatedForm.title
    })
  } catch (error) {
    console.error('Error updating webhook settings:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
