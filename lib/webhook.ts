import { prisma } from './prisma'

export interface WebhookPayload {
  formId: string
  responseId: string
  formTitle: string
  data: Record<string, any>
  timestamp: string
}

export async function sendWebhook(
  formId: string,
  responseId: string,
  data: Record<string, any>
): Promise<void> {
  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        webhookUrl: true,
        webhookEnabled: true,
        webhookSecret: true,
        title: true,
      },
    })

    if (!form?.webhookEnabled || !form?.webhookUrl) {
      return
    }

    const payload: WebhookPayload = {
      formId,
      responseId,
      formTitle: form.title,
      data,
      timestamp: new Date().toISOString(),
    }

    // Log webhook attempt
    const log = await prisma.webhookLog.create({
      data: {
        formId,
        status: 'pending',
        payload,
        attempts: 0,
      },
    })

    // Send webhook with retry logic
    await deliverWebhook(log.id, form.webhookUrl, payload, form.webhookSecret)
  } catch (error) {
    console.error('Webhook error:', error)
  }
}

async function deliverWebhook(
  logId: string,
  url: string,
  payload: WebhookPayload,
  secret?: string | null,
  attempt: number = 1
): Promise<void> {
  const maxAttempts = 3

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'FormBharat-Webhook/1.0',
    }

    if (secret) {
      headers['X-Webhook-Secret'] = secret
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    const responseData = await response.text()

    if (response.ok) {
      // Success
      await prisma.webhookLog.update({
        where: { id: logId },
        data: {
          status: 'success',
          response: { status: response.status, body: responseData },
          attempts: attempt,
        },
      })
    } else {
      throw new Error(`HTTP ${response.status}: ${responseData}`)
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error'

    if (attempt < maxAttempts) {
      // Retry after delay
      const delay = Math.pow(2, attempt) * 1000 // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay))
      await deliverWebhook(logId, url, payload, secret, attempt + 1)
    } else {
      // Final failure
      await prisma.webhookLog.update({
        where: { id: logId },
        data: {
          status: 'failed',
          error: errorMessage,
          attempts: attempt,
        },
      })
    }
  }
}

export async function retryWebhook(logId: string): Promise<boolean> {
  try {
    const log = await prisma.webhookLog.findUnique({
      where: { id: logId },
      include: { form: true },
    })

    if (!log || !log.form.webhookUrl) {
      return false
    }

    await deliverWebhook(
      logId,
      log.form.webhookUrl,
      log.payload as WebhookPayload,
      log.form.webhookSecret,
      log.attempts + 1
    )

    return true
  } catch (error) {
    console.error('Retry webhook error:', error)
    return false
  }
}
