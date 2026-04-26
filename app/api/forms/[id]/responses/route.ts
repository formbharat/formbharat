import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendWebhook } from '@/lib/webhook'
import { sendFormNotification } from '@/lib/email'

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

    // Enforce scheduling and response limits (cast because new fields pending migration)
    const scheduleCheck = await (prisma as any).form.findUnique({
      where: { id },
      select: { opensAt: true, closesAt: true, maxResponses: true, _count: { select: { responses: true } } },
    })
    if (scheduleCheck) {
      const now = new Date()
      if (scheduleCheck.opensAt && now < new Date(scheduleCheck.opensAt)) {
        return NextResponse.json({ error: 'This form is not open yet.' }, { status: 403 })
      }
      if (scheduleCheck.closesAt && now > new Date(scheduleCheck.closesAt)) {
        return NextResponse.json({ error: 'This form has closed.' }, { status: 403 })
      }
      if (scheduleCheck.maxResponses && scheduleCheck._count.responses >= scheduleCheck.maxResponses) {
        return NextResponse.json({ error: 'This form has reached its maximum number of responses.' }, { status: 403 })
      }
    }

    // Create response with tracking data
    const startedAt = data._startedAt ? new Date(data._startedAt) : null
    const completedAt = new Date()
    const completionTime = startedAt 
      ? Math.floor((completedAt.getTime() - startedAt.getTime()) / 1000)
      : null

    // Remove meta fields from data
    const { _startedAt, _currentPage, ...responseData } = data

    const response = await prisma.response.create({
      data: {
        formId: id,
        data: responseData,
        ...(startedAt && { startedAt } as any),
        ...(completedAt && { completedAt } as any),
        ...(completionTime && { completionTime } as any),
        ...(data._currentPage && { currentPage: data._currentPage } as any),
      } as any,
    })

    // Trigger async integrations (don't await to avoid blocking response)
    Promise.all([
      sendWebhook(id, response.id, responseData),
      sendFormNotification(id, response.id, responseData),
    ]).catch(error => console.error('Integration error:', error))

    return NextResponse.json(response)
  } catch (error: any) {
    console.error('Submit response error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
