'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react'

const helpArticles: Record<string, any> = {
  'getting-started': {
    title: 'Getting Started with FormBharat',
    category: 'Getting Started',
    lastUpdated: 'March 12, 2024',
    content: `
# Welcome to FormBharat!

FormBharat is India's easiest form builder. Create, share, and manage forms in minutes.

## Quick Start Guide

### Step 1: Sign Up (30 seconds)
1. Click "Start Free" on the homepage
2. Enter your email and password
3. You're in! No credit card required.

### Step 2: Create Your First Form (2 minutes)
1. Click "New Form" in your dashboard
2. Choose a template or start from scratch
3. Add fields by clicking the field types in the sidebar
4. Customize field labels, placeholders, and options
5. Click "Save Form"

### Step 3: Share Your Form (1 minute)
1. Click the WhatsApp button to share via WhatsApp
2. Or copy the form link to share anywhere
3. Your form is live and ready to collect responses!

## What's Next?

- **View Responses**: Check your dashboard to see submissions
- **Analyze Data**: Click Analytics to see charts and insights
- **Export Data**: Download responses as CSV
- **Set Up Integrations**: Add webhooks and email notifications

## Need Help?

- Browse our [Help Center](/help)
- Contact us via [Live Chat](/contact)
- Email us at hello@formbharat.com

Happy form building! 🚀
    `
  },
  'create-form': {
    title: 'How to Create a Form',
    category: 'Getting Started',
    lastUpdated: 'March 12, 2024',
    content: `
# Creating Forms with FormBharat

## The Form Builder

Our drag-and-drop builder makes form creation simple and intuitive.

### Field Types Available

1. **Text Input** - Single-line text
2. **Email Input** - Email validation built-in
3. **Phone Input** - Phone number field
4. **Long Text** - Multi-line textarea
5. **Dropdown** - Select from options
6. **Radio Buttons** - Single choice selection
7. **Checkboxes** - Multiple choice selection
8. **File Upload** - Allow file attachments

### Adding Fields

1. Click any field type in the sidebar
2. Field is added to your form
3. Click the field to edit properties
4. Drag fields to reorder

### Field Properties

- **Label**: The question or field name
- **Placeholder**: Helper text shown in the field
- **Required**: Make the field mandatory
- **Options**: For dropdown, radio, checkbox fields

### Form Settings

- **Title**: Your form's name (required)
- **Description**: Brief explanation of the form
- **Multi-step**: Break long forms into pages

## Best Practices

✅ Keep forms short (5-10 fields ideal)  
✅ Use clear, simple labels  
✅ Add placeholder text for guidance  
✅ Mark only essential fields as required  
✅ Group related fields together  
✅ Test your form before sharing  

## Tips for Better Forms

- **Be specific**: "Your email address" > "Email"
- **Use examples**: "e.g., 5-8 LPA" in salary fields
- **Logical order**: Ask name/email first
- **Mobile-friendly**: All forms work on phones
- **WhatsApp ready**: Share directly to WhatsApp

Ready to create? [Start Building](/builder) 🎨
    `
  },
  'use-templates': {
    title: 'Using Form Templates',
    category: 'Getting Started',
    lastUpdated: 'March 12, 2024',
    content: `
# Using Form Templates

Save time with our professionally designed templates!

## Available Templates (12)

1. **Customer Feedback** - 8 fields
2. **Event Registration** - 10 fields
3. **Job Application** - 12 fields
4. **Product Order** - 9 fields
5. **Contact Form** - 5 fields
6. **Survey Form** - 7 fields
7. **Lead Generation** - 9 fields
8. **Support Ticket** - 8 fields
9. **Workshop Registration** - 8 fields
10. **Vendor Registration** - 10 fields
11. **Volunteer Sign-up** - 8 fields
12. **Newsletter Sign-up** - 4 fields

## How to Use Templates

### Step 1: Browse Templates
Visit the [Templates page](/templates)

### Step 2: Search & Filter
- Use the search bar to find specific templates
- Filter by category (Business, Events, HR, etc.)

### Step 3: Preview Template
- Click on any template card
- See the template title and description
- Check number of fields

### Step 4: Use Template
1. Click "Use Template" button
2. Builder opens with all fields pre-filled
3. Customize as needed
4. Save your form

## Customizing Templates

Templates are starting points. You can:
- ✅ Edit field labels
- ✅ Add or remove fields
- ✅ Change field types
- ✅ Modify options
- ✅ Update title and description
- ✅ Reorder fields

## Template Categories

**Business**: Feedback, Vendor registration, Contact forms  
**Events**: Registration, Workshop signup, Volunteer forms  
**HR**: Job applications, Employee surveys  
**Sales**: Lead generation, Product orders  
**Support**: Ticket forms, Help requests  
**Research**: Surveys, Data collection  
**Marketing**: Newsletter signup, Lead capture  

[Browse All Templates →](/templates)
    `
  },
  'whatsapp-share': {
    title: 'Sharing Forms via WhatsApp',
    category: 'Sharing',
    lastUpdated: 'March 12, 2024',
    content: `
# WhatsApp Integration

FormBharat is built for India. Share forms where your audience is - WhatsApp!

## Why WhatsApp?

- ✅ 500M+ Indians use WhatsApp daily
- ✅ Higher open rates than email
- ✅ Instant delivery
- ✅ Mobile-first experience
- ✅ Perfect for SMBs

## How to Share via WhatsApp

### From Dashboard

1. Go to your Dashboard
2. Find the form you want to share
3. Click the green "WhatsApp" button
4. WhatsApp opens with form link ready
5. Select contacts or groups
6. Send!

### From Public Form

1. Open any form (as a respondent)
2. Click "Share via WhatsApp" under header
3. WhatsApp opens with shareable message
4. Send to your contacts

## What Gets Shared?

The message includes:
- Form title
- Direct link to form
- Professional formatting

Example:
\`\`\`
Fill out my form: Customer Feedback Form

https://formbharat.com/f/abc123
\`\`\`

## Best Practices

### For Form Owners:
- Use clear, descriptive form titles
- Test the form before sharing
- Share in relevant WhatsApp groups
- Follow up with respondents

### For Recipients:
- Forms open instantly in browser
- No login required to respond
- Works on all devices
- Responses submitted securely

## Use Cases

**Event Organizers**: Share RSVP forms in event groups  
**Businesses**: Send feedback forms to customers  
**Schools**: Distribute permission forms to parent groups  
**Restaurants**: Take orders via WhatsApp  
**HR Teams**: Share job application forms  

## Privacy & Security

- ✅ Your form link is public but unique
- ✅ Responses are private to you
- ✅ No data shared with WhatsApp
- ✅ Secure HTTPS connection

Start sharing your forms via WhatsApp today! 📱
    `
  },
  'collect-responses': {
    title: 'Collecting Form Responses',
    category: 'Forms',
    lastUpdated: 'March 12, 2024',
    content: `
# Collecting Form Responses

Your forms are live and ready to collect responses!

## Sharing Your Form

### 1. WhatsApp Share
Click the WhatsApp button to send instantly

### 2. Copy Link
Copy the form URL and share anywhere:
- Social media
- Email
- SMS
- Website embed

### 3. QR Code (Coming Soon)
Print QR codes for physical locations

## Viewing Responses

### Dashboard Overview
- See response count on each form card
- Quick stats at a glance
- Recently submitted responses

### Responses Page
1. Click "View Responses" on any form
2. See all submissions
3. Each response shows:
   - Submission date & time
   - All field values
   - Response ID

### Analytics Page
1. Click "Analytics" icon on form card
2. View detailed insights:
   - Total responses
   - Response rate
   - Field completion rates
   - Top answers
   - Time series chart

## Exporting Data

### CSV Export
1. Go to form Responses page
2. Click "Export to CSV" button
3. Download Excel-compatible file
4. Open in Excel, Google Sheets, etc.

### What's Exported?
- All response data
- Timestamps
- Field labels as headers
- Ready for analysis

## Managing Responses

### Delete Responses
Click delete icon on individual responses

### Filter Responses (Coming Soon)
- By date range
- By field value
- Search responses

## Real-time Updates

Responses appear instantly:
- No refresh needed
- Live updates in dashboard
- Immediate notifications (if enabled)

## Response Limits

**Early Access**: Unlimited responses  
**All Plans**: No caps on form submissions  

[Create Your Form →](/builder)
    `
  },
  'webhook-setup': {
    title: 'Setting Up Webhooks',
    category: 'Integrations',
    lastUpdated: 'March 12, 2024',
    content: `
# Webhook Integration

Connect FormBharat to any external service with webhooks!

## What are Webhooks?

Webhooks send form responses to your server or third-party service automatically when someone submits a form.

## Use Cases

- Send to Zapier for automation
- Connect to your CRM
- Trigger custom workflows
- Sync with databases
- Integrate with Slack, Discord, etc.

## Setting Up Webhooks

### Step 1: Get Your Webhook URL

From your integration service:
- **Zapier**: Create a "Webhook" trigger
- **Make (Integromat)**: Use "Webhooks" module
- **Custom**: Set up your endpoint

### Step 2: Configure in FormBharat

1. Go to Dashboard
2. Click Settings icon on your form
3. Scroll to "Webhook Integration"
4. Toggle "Enable webhook"
5. Paste your webhook URL
6. Click "Save Settings"

## Webhook Payload

When a form is submitted, we POST this JSON:

\`\`\`json
{
  "formId": "abc123",
  "formTitle": "Contact Form",
  "responseId": "xyz789",
  "timestamp": "2024-03-12T10:30:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello!"
  }
}
\`\`\`

## Testing Webhooks

### Use webhook.site:
1. Go to https://webhook.site
2. Copy your unique URL
3. Add to FormBharat settings
4. Submit a test form
5. See the payload on webhook.site

### Check Delivery:
- Webhooks send immediately on submission
- Failed webhooks retry 3 times
- Check your server logs

## Popular Integrations

### Zapier
- Create multi-step workflows
- Connect to 5000+ apps
- No coding required

### Google Sheets
- Auto-populate spreadsheets
- Real-time data sync
- Easy reporting

### Slack
- Get notifications in channels
- Team collaboration
- Instant alerts

### Custom Apps
- Send to your backend
- Process data your way
- Full control

## Security

- ✅ HTTPS only
- ✅ POST method
- ✅ JSON format
- ✅ Retry logic

## Troubleshooting

**Webhook not firing?**
- Check URL is correct
- Ensure endpoint accepts POST
- Verify HTTPS (not HTTP)
- Check server logs

**Getting errors?**
- Response must be 200-299
- Timeout is 30 seconds
- Check payload format

Need help? [Contact Support](/contact) 🔗
    `
  }
}

export default function HelpArticlePage() {
  const params = useParams()
  const article = helpArticles[params.id as string]

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/help">
            <Button>Back to Help Center</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">FormBharat</span>
            </Link>
            <Link href="/help">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Help Center
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-6">
          <span className="text-sm text-orange-600 font-medium">{article.category}</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">{article.title}</h1>
          <p className="text-gray-600">Last updated: {article.lastUpdated}</p>
        </div>

        <Card>
          <CardContent className="p-8 prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>').replace(/### /g, '<h3>').replace(/## /g, '<h2>').replace(/# /g, '<h1>') }} />
          </CardContent>
        </Card>

        {/* Feedback */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Was this article helpful?</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Yes, helpful
            </Button>
            <Button variant="outline">
              <ThumbsDown className="mr-2 h-4 w-4" />
              No, not helpful
            </Button>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-12 bg-gradient-to-br from-orange-50 to-pink-50">
          <CardHeader>
            <CardTitle>Still have questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                    (window as any).Tawk_API.maximize()
                  }
                }}
              >
                Start Live Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
