import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Zap, Shield, TrendingUp, Users, Smartphone, BarChart3, Globe, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              FormBharat
            </span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 transition">Features</Link>
            <Link href="/templates" className="text-gray-600 hover:text-gray-900 transition">Templates</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900 transition">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition">Contact</Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/builder">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                Start Free
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6">
              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium">
                🎉 Early Access - Free for Everyone!
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Forms Made Simple for{' '}
              <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                Indian Businesses
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Create beautiful forms in minutes. Collect responses via web or WhatsApp. Built for Indian SMBs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/builder">
                <Button size="lg" className="text-lg px-8 h-14 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Create Your First Form
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  See How It Works
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Early access free</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span>Made in India 🇮🇳</span>
              </div>
            </div>
          </div>

          {/* Hero Image/Demo Placeholder */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-8 border border-orange-100">
              <div className="bg-white rounded-xl shadow-2xl p-6 aspect-video flex items-center justify-center">
                <p className="text-gray-400 text-lg">Form Builder Demo Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Free Early Access</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">7+</div>
              <div className="text-gray-600">Field Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">∞</div>
              <div className="text-gray-600">Unlimited Forms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">🇮🇳</div>
              <div className="text-gray-600">Built for India</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600">
              Powerful features designed specifically for Indian small businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Perfect for Every Business</h2>
            <p className="text-xl text-gray-600">
              From customer feedback to event registrations - we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of Indian businesses creating beautiful forms
            </p>
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
                Create Your First Form - It's Free!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
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
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="https://github.com" className="hover:text-white">GitHub</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 FormBharat. Made with ❤️ in India 🇮🇳</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
