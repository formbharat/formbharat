import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import TawkToChat from "@/components/TawkToChat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://formbharat.com'),
  title: {
    default: 'FormBharat - Free Form Builder for Indian Businesses',
    template: '%s | FormBharat'
  },
  description: 'Create beautiful forms, surveys, and quizzes for free. Built for Indian businesses with WhatsApp integration, Indian templates, and local support.',
  keywords: ['form builder India', 'free forms', 'online surveys', 'WhatsApp forms', 'Indian form creator'],
  authors: [{ name: 'FormBharat' }],
  creator: 'FormBharat',
  publisher: 'FormBharat',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://formbharat.com',
    siteName: 'FormBharat',
    title: 'FormBharat - Free Form Builder for Indian Businesses',
    description: 'Create beautiful forms, surveys, and quizzes for free. Built for Indian businesses with WhatsApp integration, Indian templates, and local support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormBharat - Free Form Builder for Indian Businesses',
    description: 'Create beautiful forms, surveys, and quizzes for free. Built for Indian businesses with WhatsApp integration, Indian templates, and local support.',
    creator: '@formbharat'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://formbharat.com',
    languages: {
      'en-IN': 'https://formbharat.com',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Organization Schema */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'FormBharat',
              url: 'https://formbharat.com',
              logo: 'https://formbharat.com/logo.png',
              description: 'Free form builder for Indian businesses with WhatsApp integration, Indian templates, and local support.',
              sameAs: [
                'https://twitter.com/formbharat',
                'https://linkedin.com/company/formbharat',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@formbharat.com',
                contactType: 'customer support',
                areaServed: 'IN',
                availableLanguage: 'English',
              },
            }),
          }}
        />

        {/* WebApplication Schema */}
        <Script
          id="webapp-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'FormBharat',
              url: 'https://formbharat.com',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'INR',
                description: 'Free for early access users',
              },
              featureList: [
                'Drag and drop form builder',
                'WhatsApp integration',
                'Indian templates',
                'Multi-step forms',
                'Analytics dashboard',
                'CSV export',
                'Webhook integration',
                'Email notifications',
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '100',
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XVR0TV1G8V"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XVR0TV1G8V');
          `}
        </Script>

        {children}
        <Toaster />
        <TawkToChat />
      </body>
    </html>
  )
}
