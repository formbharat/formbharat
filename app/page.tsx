'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Shield, TrendingUp, Users, Smartphone, BarChart3, Globe, ArrowRight, Menu, X } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                FormBharat
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition text-sm lg:text-base">Features</Link>
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition text-sm lg:text-base">Templates</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition text-sm lg:text-base">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition text-sm lg:text-base">Contact</Link>
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/builder">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Start Free
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t pt-4">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition py-2" onClick={() => setMobileMenuOpen(false)}>Templates</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Start Free
                </Button>
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 md:mb-6">
              <span className="bg-orange-100 text-orange-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                🎉 Early Access - Free for Everyone!
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 leading-tight px-2">
              Forms Made Simple for{' '}
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Indian Businesses
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Create beautiful forms in minutes. Collect responses via web or WhatsApp. Built for Indian SMBs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-8 md:mb-12 px-4">
              <Link href="/builder" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Create Your First Form
                  <ArrowRight className="ml-2 h-4 md:h-5 w-4 md:w-5" />
                </Button>
              </Link>
              <Link href="#features" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 h-12 md:h-14">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 md:gap-6 justify-center text-xs md:text-sm text-gray-600 px-4">
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>Early access free</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="h-4 md:h-5 w-4 md:w-5 text-green-500 flex-shrink-0" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo Placeholder */}
          <div className="mt-8 md:mt-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl md:rounded-2xl p-4 md:p-8 border border-orange-100">
              <div className="bg-white rounded-lg md:rounded-xl shadow-2xl p-4 md:p-6 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-sm md:text-lg">Form Builder Demo Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">100%</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Free Early Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 md:mb-2">7+</div>
              <div className="text-xs md:text-sm lg:text-base text-gray-600">Field Types</div>
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
            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Drag & Drop Builder</CardTitle>
                <CardDescription>
                  Create forms in minutes with our intuitive visual builder. No coding needed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>WhatsApp Integration</CardTitle>
                <CardDescription>
                  Share forms and collect responses via WhatsApp - the #1 platform in India.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Smart Analytics</CardTitle>
                <CardDescription>
                  Understand your responses with charts, trends, and actionable insights.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  Your data is encrypted and secure. GDPR compliant with Indian data hosting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Custom Branding</CardTitle>
                <CardDescription>
                  Add your logo, colors, and domain to make forms truly yours.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-orange-200 transition">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
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
              { title: 'Customer Feedback', emoji: '💬', desc: 'NPS surveys, reviews, complaints' },
              { title: 'Event Registration', emoji: '🎉', desc: 'Webinars, conferences, meetups' },
              { title: 'Job Applications', emoji: '💼', desc: 'Hiring, internships, freelance' },
              { title: 'Lead Generation', emoji: '🎯', desc: 'Contact forms, quotes, demos' },
              { title: 'Order Forms', emoji: '🛒', desc: 'Product orders, bookings, services' },
              { title: 'Surveys & Polls', emoji: '📊', desc: 'Market research, voting, opinions' },
              { title: 'Support Tickets', emoji: '🎫', desc: 'Help desk, bug reports, requests' },
              { title: 'Registrations', emoji: '📝', desc: 'Course signup, membership, subscriptions' },
            ].map((useCase, i) => (
              <Card key={i} className="text-center hover:shadow-lg transition">
                <CardHeader>
                  <div className="text-4xl mb-3">{useCase.emoji}</div>
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription className="text-sm">{useCase.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">F</span>
                </div>
                <span className="text-white font-bold text-lg">FormBharat</span>
              </div>
              <p className="text-sm">
                The form builder made for Indian businesses. Simple, powerful, and free.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
                <li><Link href="/features" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 md:mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-xs md:text-sm">
            <p>© 2024 FormBharat. Made with ❤️ in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
