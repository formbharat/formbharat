import { Resend } from 'resend'
import { prisma } from './prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

// Generic email sending function
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[]
  subject: string
  html: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.error('Email not configured: RESEND_API_KEY is missing')
    throw new Error('Email service not configured')
  }

  // Use verified domain sender if configured, else Resend's sandbox sender
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'FormBharat <onboarding@resend.dev>'

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    throw new Error(error.message || 'Failed to send email')
  }
}

export async function sendFormNotification(
  formId: string,
  responseId: string,
  responseData: Record<string, any>
): Promise<void> {
  try {
    const form = await prisma.form.findUnique({
      where: { id: formId },
      select: {
        title: true,
      },
    }) as any

    if (!form?.emailNotificationsEnabled || !form.emailRecipients || form.emailRecipients.length === 0) {
      return
    }

    if (!resend) {
      console.log('Email notifications not configured (missing RESEND_API_KEY)')
      return
    }

    const emailHtml = generateEmailTemplate(form.title, responseId, responseData)

    await resend.emails.send({
      from: 'FormBharat <notifications@formbharat.com>',
      to: form.emailRecipients,
      subject: `New response: ${form.title}`,
      html: emailHtml,
    })
  } catch (error) {
    console.error('Email notification error:', error)
  }
}

function generateEmailTemplate(
  formTitle: string,
  responseId: string,
  data: Record<string, any>
): string {
  const dataRows = Object.entries(data)
    .map(
      ([key, value]) => `
    <tr>
      <td style="padding: 12px; border: 1px solid #e5e7eb; font-weight: 600;">${key}</td>
      <td style="padding: 12px; border: 1px solid #e5e7eb;">${value}</td>
    </tr>
  `
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0;">FormBharat</h1>
    <p style="color: white; margin: 10px 0 0 0;">New Form Response</p>
  </div>
  
  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="color: #1f2937; margin-top: 0;">${formTitle}</h2>
    <p style="color: #6b7280; margin-bottom: 20px;">You received a new response</p>
    
    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
      ${dataRows}
    </table>
    
    <div style="margin-top: 30px; text-align: center;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
         style="display: inline-block; background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        View in Dashboard
      </a>
    </div>
    
    <p style="color: #9ca3af; font-size: 12px; margin-top: 30px; text-align: center;">
      This is an automated notification from FormBharat
    </p>
  </div>
</body>
</html>
  `
}
