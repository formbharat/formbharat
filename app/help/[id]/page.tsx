import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowLeft, ThumbsUp, ThumbsDown, MessageSquare, ArrowRight } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LiveChatButton from '@/components/LiveChatButton'
import Script from 'next/script'

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

// Related resources for internal linking
const relatedResources = [
  { href: '/resources/ai-form-generation', label: 'AI Form Generation Guide', desc: 'Build forms in 10 seconds with AI' },
  { href: '/resources/lead-generation', label: 'Lead Generation with Forms', desc: 'Capture and convert more leads' },
  { href: '/resources/whatsapp-forms', label: 'WhatsApp Forms Guide', desc: 'Share forms where your audience is' },
  { href: '/resources/form-design', label: 'Form Design & Optimization', desc: 'Design forms people actually complete' },
  { href: '/resources/form-analytics', label: 'Form Analytics Guide', desc: 'Measure, analyse, and improve' },
]

const articleRelatedMap: Record<string, string[]> = {
  'getting-started': ['ai-form-generation', 'lead-generation'],
  'create-form': ['ai-form-generation', 'form-design'],
  'use-templates': ['form-design', 'lead-generation'],
  'whatsapp-share': ['whatsapp-forms', 'lead-generation'],
  'collect-responses': ['form-analytics', 'lead-generation'],
  'webhook-setup': ['form-analytics', 'lead-generation'],
  'view-analytics': ['form-analytics', 'form-design'],
  'export-data': ['form-analytics', 'surveys-feedback'],
  'email-notifications': ['form-analytics', 'lead-generation'],
  'multi-step-forms': ['form-design', 'lead-generation'],
  'account-setup': ['ai-form-generation', 'form-design'],
  'troubleshooting': ['form-design', 'form-analytics'],
}

export async function generateStaticParams() {
  return Object.keys(helpArticles).map((id) => ({ id }))
}

// Proper markdown → HTML renderer (fixes broken unclosed-tag rendering)
function renderMarkdown(content: string): string {
  const lines = content.split('\n')
  const out: string[] = []
  let inUl = false
  let inOl = false
  let inCode = false

  const closeList = () => {
    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }

  const inline = (t: string) =>
    t
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-orange-600">$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-orange-600 underline hover:text-orange-700">$1</a>')

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()

    if (line.startsWith('```')) {
      closeList()
      if (!inCode) {
        inCode = true
        out.push(`<pre class="bg-gray-900 text-green-400 rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono"><code>`)
      } else {
        inCode = false
        out.push('</code></pre>')
      }
      continue
    }
    if (inCode) { out.push(line.replace(/</g, '&lt;').replace(/>/g, '&gt;')); continue }

    const trimmed = line.trim()
    if (!trimmed) { closeList(); continue }

    if (trimmed.startsWith('### ')) {
      closeList()
      out.push(`<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-3">${inline(trimmed.slice(4))}</h3>`)
    } else if (trimmed.startsWith('## ')) {
      closeList()
      out.push(`<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-4 border-b border-gray-100 pb-2">${inline(trimmed.slice(3))}</h2>`)
    } else if (trimmed.startsWith('# ')) {
      closeList()
      out.push(`<h1 class="text-3xl font-bold text-gray-900 mb-6">${inline(trimmed.slice(2))}</h1>`)
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (inUl) { out.push('</ul>'); inUl = false }
      if (!inOl) { out.push('<ol class="list-decimal pl-6 my-3 space-y-1.5 text-gray-700">'); inOl = true }
      out.push(`<li>${inline(trimmed.replace(/^\d+\.\s/, ''))}</li>`)
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('\u2705')) {
      if (inOl) { out.push('</ol>'); inOl = false }
      if (!inUl) { out.push('<ul class="list-none pl-2 my-3 space-y-1.5 text-gray-700">'); inUl = true }
      const item = trimmed.replace(/^[-*\u2705]\s*/, '')
      const prefix = trimmed.startsWith('\u2705') ? '\u2705 ' : '\u2022 '
      out.push(`<li class="flex gap-2"><span class="flex-shrink-0 mt-0.5">${prefix}</span><span>${inline(item)}</span></li>`)
    } else if (trimmed.startsWith('---')) {
      closeList()
      out.push('<hr class="my-6 border-gray-200" />')
    } else {
      closeList()
      out.push(`<p class="my-3 text-gray-700 leading-relaxed">${inline(trimmed)}</p>`)
    }
  }
  closeList()
  if (inCode) out.push('</code></pre>')
  return out.join('\n')
}

export default async function HelpArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = helpArticles[id]

  if (!article) notFound()

  const url = `https://formbharat.com/help/${id}`
  const relatedSlugs = articleRelatedMap[id] ?? []
  const relatedLinks = relatedResources.filter((r) =>
    relatedSlugs.some((s) => r.href.includes(s))
  )

  return (
    <div className="min-h-screen bg-white">
      <Script
        id={`help-schema-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: article.title,
            description: `Learn ${article.title.toLowerCase()} on FormBharat — India’s free AI form builder.`,
            url,
            author: { '@type': 'Organization', name: 'FormBharat', url: 'https://formbharat.com' },
            publisher: { '@type': 'Organization', name: 'FormBharat', url: 'https://formbharat.com' },
            dateModified: article.lastUpdated,
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formbharat.com' },
                { '@type': 'ListItem', position: 2, name: 'Help Center', item: 'https://formbharat.com/help' },
                { '@type': 'ListItem', position: 3, name: article.title, item: url },
              ],
            },
          }),
        }}
      />

      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-2 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/help" className="hover:text-orange-600 transition-colors">Help Center</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{article.title}</span>
        </div>
      </div>

      {/* Article */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <span className="text-sm text-orange-600 font-medium">{article.category}</span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-2 mb-3 text-gray-900">{article.title}</h1>
          <p className="text-sm text-gray-500">Last updated: {article.lastUpdated}</p>
        </div>

        <Card>
          <CardContent className="p-6 sm:p-8">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
            />
          </CardContent>
        </Card>

        {/* Related Resources — internal linking */}
        {relatedLinks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Related Guides</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedLinks.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{r.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 flex-shrink-0 mt-0.5 transition-colors" />
                </Link>
              ))}
            </div>
          </div>
        )}

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
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </Link>
              <LiveChatButton className="flex-1">Start Live Chat</LiveChatButton>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
