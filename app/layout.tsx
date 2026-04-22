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
    default: 'FormBharat - Free AI Form Builder for Indian Businesses',
    template: '%s | FormBharat'
  },
  description: 'Create beautiful forms in minutes or let AI build one in 10 seconds — free. Built for Indian businesses with WhatsApp integration, AI form generation, Indian templates, and local support.',
  keywords: [
    'form builder India', 'free form builder', 'AI form generator India', 'AI form builder',
    'online surveys India', 'WhatsApp forms', 'Indian form creator', 'free forms online',
    'create form with AI', 'generate form from description', 'form builder for SMB India',
  ],
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
    title: 'FormBharat - Free AI Form Builder for Indian Businesses',
    description: 'Create beautiful forms in minutes or let AI build one in 10 seconds — free. WhatsApp integration, Indian templates, and local support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FormBharat - Free AI Form Builder for Indian Businesses',
    description: 'Create forms instantly or let AI build one in 10 seconds. Free, WhatsApp-ready, built for India.',
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
    <html lang="en-IN">
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
                'AI form generator — build a form from a text description in 10 seconds',
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

        {/* SiteLinksSearchBox Schema */}
        <Script
          id="sitelinks-search-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://formbharat.com',
              name: 'FormBharat',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://formbharat.com/resources?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
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
