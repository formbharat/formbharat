import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service - FormBharat User Agreement',
  description: 'FormBharat Terms of Service. Read our user agreement, acceptable use policy, and service terms. By using FormBharat, you agree to these terms.',
  keywords: ['FormBharat terms', 'terms of service', 'user agreement', 'acceptable use policy', 'service terms'],
  alternates: {
    canonical: 'https://formbharat.com/terms',
  },
  robots: {
    index: true,
    follow: true,
  },
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function TermsPage() {
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
            <div className="flex gap-4 items-center">
              <Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/templates" className="text-gray-600 hover:text-gray-900">Templates</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500">Start Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last Updated:</strong> March 12, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using FormBharat ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              FormBharat is an online form builder platform that allows users to create, customize, and share forms. The Service enables you to collect responses, analyze data, and integrate with other services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Registration</h3>
            <p className="text-gray-700 mb-4">
              You must create an account to use certain features. You agree to provide accurate information and keep your account credentials secure.
            </p>
            
            <h3 className="text-xl font-semibold mb-3">3.2 Account Security</h3>
            <p className="text-gray-700 mb-4">
              You are responsible for all activities under your account. Notify us immediately of any unauthorized access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
            <p className="text-gray-700 mb-4">You agree NOT to use the Service to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Violate any laws or regulations</li>
              <li>Collect sensitive personal information without consent</li>
              <li>Send spam or unsolicited messages</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Harass, abuse, or harm others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Content Ownership</h2>
            <h3 className="text-xl font-semibold mb-3">5.1 Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of all content you create using the Service. You grant us a license to host, store, and display your content as necessary to provide the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.2 Our Content</h3>
            <p className="text-gray-700 mb-4">
              All FormBharat branding, templates, and platform features are owned by us and protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Data and Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your use of the Service is governed by our <Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link>. You are responsible for complying with data protection laws when collecting information through forms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. Service Availability</h2>
            <p className="text-gray-700 mb-4">
              We strive to provide reliable service but do not guarantee uninterrupted access. We may modify, suspend, or discontinue features at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. Pricing and Payments</h2>
            <p className="text-gray-700 mb-4">
              FormBharat offers free and paid plans. Pricing is subject to change with notice. Paid subscriptions are billed according to the plan you choose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may suspend or terminate your account if you violate these Terms. You may delete your account at any time from your dashboard settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">10. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              FormBharat is provided "as is" without warranties. We are not liable for indirect damages, data loss, or business interruption arising from your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">11. Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify FormBharat against claims arising from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms are governed by the laws of India. Disputes will be resolved in courts of competent jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">14. Contact</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, contact us at:
            </p>
            <p className="text-gray-700">
              Email: legal@formbharat.com<br />
              Or visit our <Link href="/contact" className="text-orange-600 hover:text-orange-700">Contact Page</Link>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
