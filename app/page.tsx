'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Shield, TrendingUp, Smartphone, BarChart3, Globe, MessageSquare, PartyPopper, Briefcase, Target, ShoppingCart, Ticket, ClipboardList, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useToast } from '@/components/ui/use-toast'
import { GuestAIGenerator } from '@/components/GuestAIGenerator'

export default function Home() {
  const { toast } = useToast()
  const [aiDescription, setAIDescription] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Banner */}
      <section className="bg-white border-b border-gray-100 px-4 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="container mx-auto">

          {/* Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
              <Sparkles className="h-3 w-3" />
              AI-Powered · Open Source · Free Forever
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-5">
              Build any form in
              <br />
              <span className="text-orange-500">10 seconds.</span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg md:text-xl max-w-lg mx-auto leading-relaxed">
              Describe what you need in plain English — AI creates a complete, professional form instantly.
            </p>
          </div>

          {/* AI Input Card */}
          <div className="max-w-xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 shadow-sm">

              {/* Card label */}
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-700">AI Form Generator</span>
                <span className="ml-auto text-xs font-medium text-orange-600 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">Free</span>
              </div>

              {/* Textarea */}
              <textarea
                value={aiDescription}
                onChange={(e) => setAIDescription(e.target.value)}
                placeholder="E.g., Customer feedback form for my restaurant with food quality and service ratings..."
                className="w-full min-h-[96px] text-sm md:text-base p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:bg-white outline-none resize-none transition-all"
                maxLength={500}
              />

              {/* Example chips */}
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {[
                  ['Restaurant feedback', 'Customer feedback form for my restaurant with food quality and service ratings'],
                  ['Event registration', 'Event registration form for a tech conference'],
                  ['Job application', 'Job application form for software engineer position'],
                  ['Order form', 'Product order form for handmade jewelry business'],
                  ['Student enrollment', 'Student enrollment form for online courses'],
                ].map(([label, full], index) => (
                  <button
                    key={index}
                    onClick={() => setAIDescription(full)}
                    className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 text-gray-500 border border-gray-200 rounded-full transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* CTA */}
              <Button
                onClick={() => {
                  if (!aiDescription.trim() || aiDescription.length < 10) {
                    toast({
                      title: 'Please describe your form',
                      description: 'Enter at least 10 characters to generate a form',
                      variant: 'destructive',
                    })
                    return
                  }
                  const token = localStorage.getItem('token')
                  if (token) {
                    localStorage.setItem('ai_generated_form_description', aiDescription)
                    window.location.href = '/builder?ai=generated&new=true&generate=true'
                    return
                  }
                  setShowAuthModal(true)
                }}
                disabled={!aiDescription.trim() || aiDescription.length < 10}
                className="w-full h-11 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-xl"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Form — It's Free
              </Button>

              <p className="mt-3 text-center text-xs text-gray-400">
                Powered by AWS Bedrock · No credit card · 5–10 seconds
              </p>
            </div>

            {/* Secondary links */}
            <div className="mt-5 flex items-center justify-center gap-3 text-sm text-gray-400">
              <Link href="/builder" className="hover:text-gray-600 transition-colors">
                Start from scratch
              </Link>
              <span>·</span>
              <Link href="/templates" className="hover:text-gray-600 transition-colors">
                Browse templates
              </Link>
              <span>·</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Auth Modal for AI Generation */}
      <GuestAIGenerator 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        initialDescription={aiDescription}
      />

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">100%</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Free Early Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-1 md:mb-2">10s</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">AI Form Generation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">∞</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Unlimited Forms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">🇮🇳</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Built for India</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Everything You Need</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-4">
              Powerful features designed specifically for Indian small businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* AI Feature — highlighted */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-pink-50 hover:border-orange-300 transition h-full md:col-span-2 lg:col-span-1">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-2 mx-auto">
                  ✨ NEW
                </div>
                <CardTitle>AI Form Generator</CardTitle>
                <CardDescription>
                  Describe your form in plain English. AI builds a complete, professional form in 10 seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Zap className="h-8 w-8 text-orange-600" />
                  </div>
                </div>
                <CardTitle>Drag &amp; Drop Builder</CardTitle>
                <CardDescription>
                  Create forms in minutes with our intuitive visual builder. No coding needed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center">
                    <Smartphone className="h-8 w-8 text-pink-600" />
                  </div>
                </div>
                <CardTitle>WhatsApp Integration</CardTitle>
                <CardDescription>
                  Share forms and collect responses via WhatsApp - the #1 platform in India.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Understand your responses with charts, trends, and actionable insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is encrypted and secure. GDPR compliant with Indian data hosting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle>Custom Branding</CardTitle>
                <CardDescription>
                  Add your logo, colors, and domain to make forms truly yours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition h-full">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
                <CardTitle>Real-time Updates</CardTitle>
                <CardDescription>
                  Get instant notifications when someone submits your form.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-4">Perfect for Every Business</h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 px-4">
              From customer feedback to event registrations - we've got you covered
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {[
              { title: 'Customer Feedback', icon: MessageSquare, desc: 'NPS surveys, reviews, complaints', color: 'bg-gray-100' },
              { title: 'Event Registration', icon: PartyPopper, desc: 'Webinars, conferences, meetups', color: 'bg-orange-100' },
              { title: 'Job Applications', icon: Briefcase, desc: 'Hiring, internships, freelance', color: 'bg-amber-100' },
              { title: 'Lead Generation', icon: Target, desc: 'Contact forms, quotes, demos', color: 'bg-red-100' },
              { title: 'Order Forms', icon: ShoppingCart, desc: 'Product orders, bookings, services', color: 'bg-gray-100' },
              { title: 'Surveys & Polls', icon: BarChart3, desc: 'Market research, voting, opinions', color: 'bg-blue-100' },
              { title: 'Support Tickets', icon: Ticket, desc: 'Help desk, bug reports, requests', color: 'bg-yellow-100' },
              { title: 'Registrations', icon: ClipboardList, desc: 'Course signup, membership, subscriptions', color: 'bg-orange-100' },
            ].map((useCase, i) => {
              const IconComponent = useCase.icon
              return (
                <Card key={i} className="text-center hover:shadow-lg transition">
                  <CardHeader>
                    <div className="flex justify-center mb-3">
                      <div className={`w-16 h-16 ${useCase.color} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="h-8 w-8 text-gray-700" />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{useCase.title}</CardTitle>
                    <CardDescription className="text-sm">{useCase.desc}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl md:rounded-2xl p-6 md:p-12 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Ready to Get Started?</h2>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90">
              Join thousands of Indian businesses creating beautiful forms
            </p>
            <Link href="/builder" className="inline-block w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                Create Your First Form - It's Free!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
