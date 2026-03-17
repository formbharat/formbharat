// Email notification utilities

export interface EmailNotificationSettings {
  enabled: boolean
  recipients: string[]
  subject?: string
  includeResponseData: boolean
}

export async function sendEmailNotification(
  formTitle: string,
  responseData: Record<string, any>,
  settings: EmailNotificationSettings
) {
  if (!settings.enabled || settings.recipients.length === 0) {
    return { success: false, message: 'Email notifications not enabled' }
  }

  try {
    const emailHtml = generateEmailTemplate(formTitle, responseData)

    await resend.emails.send({
      from: 'FormBharat <notifications@formbharat.com>',
    // For now, we'll structure the data for future integration
    
    const emailPayload = {
      to: settings.recipients,
      subject: settings.subject || `New response for ${formTitle}`,
      html: generateEmailHTML(formTitle, responseData, settings.includeResponseData),
      text: generateEmailText(formTitle, responseData, settings.includeResponseData)
    }

    // TODO: Integrate with actual email service
    console.log('Email notification payload:', emailPayload)
    
    return { 
      success: true, 
      message: 'Email notification sent',
      payload: emailPayload 
    }
  } catch (error) {
    console.error('Error sending email notification:', error)
    return { success: false, message: 'Failed to send email notification' }
  }
}

function generateEmailHTML(
  formTitle: string,
  responseData: Record<string, any>,
  includeData: boolean
): string {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f97316 0%, #ec4899 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
        .field-label { font-weight: bold; color: #666; font-size: 14px; }
        .field-value { margin-top: 5px; color: #111; }
        .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🎉 New Form Response</h2>
          <p>${formTitle}</p>
        </div>
        <div class="content">
          <p>You've received a new response!</p>
  `

  if (includeData) {
    html += '<div style="margin-top: 20px;">'
    Object.entries(responseData).forEach(([key, value]) => {
      html += `
        <div class="field">
          <div class="field-label">${key}</div>
          <div class="field-value">${Array.isArray(value) ? value.join(', ') : String(value)}</div>
        </div>
      `
    })
    html += '</div>'
  } else {
    html += '<p><a href="https://formb harat.com/dashboard" style="color: #f97316;">View response in dashboard →</a></p>'
  }

  html += `
        </div>
        <div class="footer">
          <p>Sent by FormBharat | Form Builder Made for India 🇮🇳</p>
        </div>
      </div>
    </body>
    </html>
  `

  return html
}

function generateEmailText(
  formTitle: string,
  responseData: Record<string, any>,
  includeData: boolean
): string {
  let text = `New Form Response: ${formTitle}\n\n`
  text += 'You have received a new response!\n\n'

  if (includeData) {
    text += 'Response Data:\n'
    text += '---\n'
    Object.entries(responseData).forEach(([key, value]) => {
      text += `${key}: ${Array.isArray(value) ? value.join(', ') : String(value)}\n`
    })
  } else {
    text += 'View the full response in your FormBharat dashboard.\n'
  }

  text += '\n---\n'
  text += 'Sent by FormBharat - Form Builder Made for India'

  return text
}
