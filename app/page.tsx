'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Shield, TrendingUp, Users, Smartphone, BarChart3, Globe, ArrowRight, MessageSquare, PartyPopper, Briefcase, Target, ShoppingCart, Ticket, ClipboardList, Sparkles } from 'lucide-react'
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

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 md:mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                🔓 Open Source • Free Forever
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Forms Made Simple for{' '}
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Indian Businesses
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Create beautiful forms in minutes — or let AI build one in 10 seconds. Collect responses via web or WhatsApp. Built for Indian SMBs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Create Your First Form
                  <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </Link>
              <Link href="#ai-generator" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                  <Sparkles className="mr-2 h-4 w-4 text-orange-500" />
                  Try AI Generator
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-6 justify-center text-xs md:text-sm text-gray-600 px-4">
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>100% Open Source</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>

          {/* AI Generate CTA */}
          <div id="ai-generator" className="mt-8 md:mt-16 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-12 border border-gray-200 shadow-sm relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-30"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
                    <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      NEW: AI-Powered Form Generation
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
                    Describe your form, AI creates it in{' '}
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                      10 seconds
                    </span>
                  </h2>
                  
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    No more dragging fields or thinking about structure. Just tell us what you need, and our AI builds a professional form instantly.
                  </p>
                </div>

                {/* Inline Input */}
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                    <textarea
                      value={aiDescription}
                      onChange={(e) => setAIDescription(e.target.value)}
                      placeholder="E.g., Customer feedback form for my restaurant with food quality and service ratings"
                      className="w-full min-h-[100px] md:min-h-[120px] text-base md:text-lg p-4 border-2 border-gray-200 rounded-lg focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none resize-none"
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">
                        {aiDescription.length}/500 characters
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                        <span>No credit card • 3 free generations</span>
                      </div>
                    </div>
                  </div>

                  {/* Example Suggestions */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 text-center">Try these examples:</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {[
                        'Customer feedback form for my restaurant',
                        'Event registration for tech conference',
                        'Job application for software engineer',
                        'Product order form for handmade jewelry',
                        'Student enrollment for online courses',
                      ].map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setAIDescription(example)}
                          className="text-xs md:text-sm px-3 md:px-4 py-2 bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-600 hover:text-orange-700 rounded-full transition-all"
                        >
                          {example}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
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
                      // If already logged in, go straight to builder
                      const token = localStorage.getItem('token')
                      if (token) {
                        localStorage.setItem('ai_generated_form_description', aiDescription)
                        window.location.href = '/builder?ai=generated&new=true&generate=true'
                        return
                      }
                      // Guest: show auth modal
                      setShowAuthModal(true)
                    }}
                    disabled={!aiDescription.trim() || aiDescription.length < 10}
                    size="lg"
                    className="w-full text-base md:text-lg h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Form - Free
                  </Button>
                </div>
                
                <div className="pt-4 flex flex-wrap gap-4 justify-center text-xs md:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Powered by AWS Bedrock</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    <span>5-10 seconds generation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Fully customizable</span>
                  </div>
                </div>
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
