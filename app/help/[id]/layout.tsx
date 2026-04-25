import type { Metadata } from 'next'

const articleMeta: Record<string, { title: string; description: string }> = {
  'getting-started': {
    title: 'Getting Started with FormBharat',
    description: 'A complete guide to creating your first form on FormBharat. Sign up, build, share, and collect responses in minutes.',
  },
  'create-form': {
    title: 'How to Create a Form',
    description: 'Step-by-step tutorial on creating forms with FormBharat. Learn about fields, validation, and customization.',
  },
  'use-templates': {
    title: 'Using Form Templates',
    description: 'Save time by using ready-made form templates for Indian businesses. Customize and deploy in minutes.',
  },
  'whatsapp-share': {
    title: 'Sharing Forms via WhatsApp',
    description: 'Learn how to share your FormBharat forms through WhatsApp to maximize reach with Indian audiences.',
  },
  'collect-responses': {
    title: 'Collecting Form Responses',
    description: 'Everything you need to know about collecting, managing, and analyzing form responses in FormBharat.',
  },
  'webhook-setup': {
    title: 'Setting Up Webhooks',
    description: 'Integrate FormBharat with your tools using webhooks. Send form data to any endpoint in real-time.',
  },
  'view-analytics': {
    title: 'Viewing Form Analytics',
    description: 'Understand your form performance with FormBharat analytics: views, submissions, conversion rates, and more.',
  },
  'export-data': {
    title: 'Exporting Form Data',
    description: 'Export form responses to CSV, Excel, or JSON. Keep your data backed up and portable.',
  },
  'email-notifications': {
    title: 'Email Notifications',
    description: 'Set up email notifications to be alerted whenever someone submits your form.',
  },
  'multi-step-forms': {
    title: 'Creating Multi-Step Forms',
    description: 'Build multi-step forms to increase completion rates. Split long forms into digestible pages.',
  },
  'account-setup': {
    title: 'Account Setup',
    description: 'Set up and customize your FormBharat account. Manage profile, password, and preferences.',
  },
  'troubleshooting': {
    title: 'Troubleshooting',
    description: 'Common issues and solutions for FormBharat users. Find quick fixes for form creation and submission problems.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const meta = articleMeta[id]

  if (!meta) {
    return {
      title: 'Help Article',
      description: 'FormBharat help center article.',
    }
  }

  const url = `https://formbharat.com/help/${id}`

  return {
    title: `${meta.title} | Help Center`,
    description: meta.description,
    keywords: ['FormBharat', 'form builder India', ...meta.description.split(' ').filter((w) => w.length > 5).slice(0, 5)],
    alternates: { canonical: url },
    openGraph: {
      title: `${meta.title} | FormBharat Help`,
      description: meta.description,
      url,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | FormBharat Help`,
      description: meta.description,
    },
  }
}

export default function HelpArticleLayout({ children }: { children: React.ReactNode }) {
  return children
}
