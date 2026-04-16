import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources - Guides & Best Practices for Indian Form Builders',
  description: 'Free guides, tutorials, and best practices for online forms. Learn lead generation, WhatsApp marketing, survey design, and more — tailored for Indian businesses.',
  keywords: ['form builder guide', 'online forms India', 'WhatsApp lead generation', 'survey best practices', 'form design', 'business forms India'],
  alternates: {
    canonical: 'https://formbharat.com/resources',
  },
  openGraph: {
    title: 'Resources — Guides & Best Practices for Indian Form Builders | FormBharat',
    description: 'Free guides on lead generation, WhatsApp marketing, survey design, and data analytics — written for Indian businesses.',
    url: 'https://formbharat.com/resources',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | FormBharat',
    description: 'Free guides on forms, lead generation, WhatsApp marketing, and more for Indian businesses.',
  },
}

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children
}
