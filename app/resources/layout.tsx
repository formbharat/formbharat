import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - AI Forms, Guides & Best Practices for Indian Businesses',
  description: 'Free guides on AI form generation, lead generation, WhatsApp marketing, survey design, and data analytics — written for Indian businesses.',
  keywords: [
    'AI form generation guide', 'form builder guide India', 'online forms India',
    'WhatsApp lead generation', 'survey best practices', 'form design tips',
    'business forms India', 'AI form prompts', 'generate form with AI India',
  ],
  alternates: {
    canonical: 'https://formbharat.com/resources',
  },
  openGraph: {
    title: 'Resources — AI Forms, Guides & Best Practices | FormBharat',
    description: 'Free guides on AI form generation, lead generation, WhatsApp marketing, and survey design — written for Indian businesses.',
    url: 'https://formbharat.com/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | FormBharat',
    description: 'Free guides on AI forms, lead generation, WhatsApp marketing, and more for Indian businesses.',
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
