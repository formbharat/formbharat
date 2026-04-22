import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Features - AI Form Builder with WhatsApp & Indian Templates',
  description: 'Discover all features: AI form generator, drag-and-drop builder, WhatsApp integration, multi-step forms, Indian templates, real-time analytics, webhooks, and more. All free.',
  keywords: [
    'AI form generator', 'AI form builder India', 'form builder features', 'WhatsApp forms',
    'drag and drop form builder', 'multi-step forms India', 'form analytics India',
    'webhook integration', 'generate form with AI', 'free form builder features',
  ],
  alternates: {
    canonical: 'https://formbharat.com/features',
  },
  openGraph: {
    title: 'Features - AI-Powered Form Builder for Indian Businesses | FormBharat',
    description: 'AI form generator, WhatsApp integration, Indian templates, multi-step forms, real-time analytics, and webhooks — all free.',
    url: 'https://formbharat.com/features',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features — AI Form Builder | FormBharat',
    description: 'AI form generator, WhatsApp forms, Indian templates, multi-step forms, analytics — all free.',
  },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children
}
