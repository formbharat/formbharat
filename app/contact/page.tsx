import type { Metadata } from 'next'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Contact FormBharat - Support & Help Center',
  description: 'Get in touch with FormBharat team. Email us at hello@formbharat.com, chat with support, or browse our help center. We respond within 24 hours.',
  keywords: ['contact FormBharat', 'form builder support', 'help center', 'customer support India', 'form builder help'],
  alternates: {
    canonical: 'https://formbharat.com/contact',
  },
  openGraph: {
    title: 'Contact FormBharat - We are here to help',
    description: 'Get support via email, chat, or browse our help center. Quick responses guaranteed.',
    url: 'https://formbharat.com/contact',
    type: 'website',
  },
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, HelpCircle } from 'lucide-react'
import LiveChatButton from '@/components/LiveChatButton'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              FormBharat
            </span>
          </Link>
          <div className="hidden md:flex gap-4 items-center">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 text-sm">Templates</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link>
            <Link href="/contact" className="text-gray-900 font-medium text-sm">Contact</Link>
            <Link href="/auth/login">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link href="/builder">
              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500">Start Free</Button>
            </Link>
          </div>
          <Link href="/builder" className="md:hidden">
            <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500">Start Free</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Get in <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Options & Form */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Email Us</CardTitle>
                <CardDescription>
                  Drop us an email anytime
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <a href="mailto:hello@formbharat.com" className="text-orange-600 hover:underline">
                  hello@formbharat.com
                </a>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle>Chat Support</CardTitle>
                <CardDescription>
                  Available Mon-Fri, 9am-6pm IST
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <LiveChatButton variant="outline" className="w-full" />
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Help Center</CardTitle>
                <CardDescription>
                  Find answers to common questions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/help">
                  <Button variant="outline" className="w-full">
                    Browse Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="text-xl md:text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-sm md:text-base">
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 md:p-6 pt-0">
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Input placeholder="What's this about?" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us more..." 
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is FormBharat really free?',
                a: 'Yes! Early access users get all features completely free. No credit card required.'
              },
              {
                q: 'How many forms can I create?',
                a: 'Unlimited! Create as many forms as you need during early access.'
              },
              {
                q: 'Can I use my own domain?',
                a: 'Yes, custom domains are available for all users.'
              },
              {
                q: 'Do you support WhatsApp integration?',
                a: 'WhatsApp integration is coming soon! Sign up to be notified when it\'s ready.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We support UPI, Razorpay, and all major payment methods used in India.'
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.q}</CardTitle>
                  <CardDescription>{faq.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
