import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const responses = await prisma.response.findMany({
      where: { formId: id },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(responses)
  } catch (error: any) {
    console.error('Get responses error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await request.json()

    const response = await prisma.response.create({
      data: {
        formId: id,
        data,
      },
    })

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Submit response error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
