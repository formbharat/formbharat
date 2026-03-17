import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, fields } = await request.json()

    if (!title || !fields || fields.length === 0) {
      return NextResponse.json(
        { error: 'Title and fields are required' },
        { status: 400 }
      )
    }

    const form = await prisma.form.create({
      data: {
        title,
        description: description || '',
        userId: user.id,
        fields,
        published: true,
      },
    })

    return NextResponse.json(form)
  } catch (error: any) {
    console.error('Create form error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const forms = await prisma.form.findMany({
      where: { userId: user.id },
      include: {
        _count: {
          select: { responses: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(forms)
  } catch (error: any) {
    console.error('Get forms error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
