import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { 
  Zap, MessageSquare, BarChart3, Webhook, Mail, FileText, 
  Layers, Share2, Download, Settings, Shield, Clock,
  Smartphone, Globe, Users, CheckCircle2, Star, TrendingUp,
  Palette, Lock, Database, Code2, ArrowRight
} from 'lucide-react'

const features = [
  {
    category: 'Form Building',
    icon: FileText,
    color: 'orange',
    items: [
      {
        name: 'Drag & Drop Builder',
        description: 'Intuitive form builder with visual editor. Reorder fields by dragging.',
        icon: Zap,
      },
      {
        name: '8 Field Types',
        description: 'Text, email, phone, textarea, dropdown, radio, checkbox, and file upload.',
        icon: Layers,
      },
      {
        name: '12 Ready Templates',
        description: 'Professional templates for events, jobs, orders, feedback, and more.',
        icon: FileText,
      },
      {
        name: 'Multi-Step Forms',
        description: 'Break long forms into multiple pages for better user experience.',
        icon: Layers,
      },
    ]
  },
  {
    category: 'India-Specific',
    icon: MessageSquare,
    color: 'green',
    items: [
      {
        name: 'WhatsApp Integration',
        description: 'Share forms directly on WhatsApp with one click. Perfect for 500M+ Indian users.',
        icon: MessageSquare,
        highlight: true,
      },
      {
        name: 'Indian Templates',
        description: 'Templates designed for Indian businesses: GST fields, LPA salary, Indian phone format.',
        icon: Globe,
      },
      {
        name: 'Regional Support',
        description: 'Form fields optimized for Indian use cases and business needs.',
        icon: Users,
      },
    ]
  },
  {
    category: 'Analytics & Insights',
    icon: BarChart3,
    color: 'blue',
    items: [
      {
        name: 'Analytics Dashboard',
        description: 'View response trends, completion rates, and field-level analytics with charts.',
        icon: BarChart3,
      },
      {
        name: 'Export to CSV',
        description: 'Download all responses as CSV for Excel, Google Sheets, or any tool.',
        icon: Download,
      },
      {
        name: 'Real-time Updates',
        description: 'See responses appear instantly in your dashboard as they come in.',
        icon: TrendingUp,
      },
      {
        name: 'Response Tracking',
        description: 'Track when forms were submitted, completion time, and user behavior.',
        icon: Clock,
      },
    ]
  },
  {
    category: 'Integrations',
    icon: Webhook,
    color: 'purple',
    items: [
      {
        name: 'Webhooks',
        description: 'Send form data to any URL. Integrate with Zapier, Make, n8n, or custom backends.',
        icon: Webhook,
      },
      {
        name: 'Email Notifications',
        description: 'Get instant email alerts when forms are submitted. Multiple recipients supported.',
        icon: Mail,
      },
      {
        name: 'API Access',
        description: 'REST API for programmatic access to forms and responses.',
        icon: Code2,
      },
    ]
  },
  {
    category: 'Sharing & Distribution',
    icon: Share2,
    color: 'pink',
    items: [
      {
        name: 'Public Links',
        description: 'Share forms with a simple URL. No login required for respondents.',
        icon: Share2,
      },
      {
        name: 'Copy Link',
        description: 'One-click copy to share via email, SMS, or any platform.',
        icon: Share2,
      },
      {
        name: 'Embed Forms',
        description: 'Embed forms on your website with a simple iframe.',
        icon: Code2,
      },
      {
        name: 'Mobile Responsive',
        description: 'All forms work perfectly on desktop, tablet, and mobile devices.',
        icon: Smartphone,
      },
    ]
  },
  {
    category: 'Security & Reliability',
    icon: Shield,
    color: 'red',
    items: [
      {
        name: 'Secure Hosting',
        description: 'HTTPS encryption for all forms. Your data is safe and secure.',
        icon: Shield,
      },
      {
        name: 'Data Privacy',
        description: 'Your responses are private. We never sell or share your data.',
        icon: Lock,
      },
      {
        name: 'Reliable Storage',
        description: 'Powered by Supabase PostgreSQL. Enterprise-grade database.',
        icon: Database,
      },
    ]
  },
]

const comparisonFeatures = [
  { name: 'Unlimited Forms', formBharat: true, typeform: false, googleForms: true, jotform: false },
  { name: 'Unlimited Responses', formBharat: true, typeform: false, googleForms: true, jotform: false },
  { name: 'WhatsApp Sharing', formBharat: true, typeform: false, googleForms: false, jotform: false },
  { name: 'Analytics Dashboard', formBharat: true, typeform: true, googleForms: true, jotform: true },
  { name: 'Multi-Step Forms', formBharat: true, typeform: true, googleForms: false, jotform: true },
  { name: 'Webhook Integration', formBharat: true, typeform: true, googleForms: false, jotform: true },
  { name: 'CSV Export', formBharat: true, typeform: true, googleForms: true, jotform: true },
  { name: 'Custom Branding', formBharat: true, typeform: false, googleForms: false, jotform: false },
  { name: 'File Uploads', formBharat: true, typeform: false, googleForms: true, jotform: true },
  { name: 'Email Notifications', formBharat: true, typeform: true, googleForms: false, jotform: true },
  { name: 'No Credit Card', formBharat: true, typeform: false, googleForms: true, jotform: false },
  { name: 'Indian Templates', formBharat: true, typeform: false, googleForms: false, jotform: false },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">FormBharat</span>
            </Link>
            <div className="hidden md:flex gap-4 items-center">
              <Link href="/features" className="text-gray-900 font-medium text-sm">Features</Link>
              <Link href="/templates" className="text-gray-600 hover:text-gray-900 text-sm">Templates</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</Link>
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
        </div>
      </nav>

      {/* Hero */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Everything you need to create <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              powerful forms
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            FormBharat combines the best features of global form builders with India-specific needs. 
            Build, share via WhatsApp, and analyze — all for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link href="/builder" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-pink-500">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Browse Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {features.map((category, idx) => {
            const CategoryIcon = category.icon
            return (
              <div key={idx} className="mb-12 md:mb-16">
                <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                  <div className={`w-10 md:w-12 h-10 md:h-12 bg-${category.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <CategoryIcon className={`h-5 md:h-6 w-5 md:w-6 text-${category.color}-600`} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">{category.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.items.map((feature, featureIdx) => {
                    const FeatureIcon = feature.icon
                    return (
                      <Card key={featureIdx} className={`${feature.highlight ? 'ring-2 ring-green-500 shadow-lg' : ''}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <FeatureIcon className="h-5 w-5 text-orange-600" />
                                <CardTitle className="text-lg">{feature.name}</CardTitle>
                                {feature.highlight && (
                                  <Star className="h-4 w-4 text-green-600 fill-green-600" />
                                )}
                              </div>
                              <CardDescription>{feature.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How FormBharat Compares</h2>
            <p className="text-xl text-gray-600">
              See how we stack up against popular form builders
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      <div className="flex flex-col items-center">
                        <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent font-bold">FormBharat</span>
                        <span className="text-xs text-green-600 font-normal">FREE</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">
                      <div className="flex flex-col items-center">
                        <span>Typeform</span>
                        <span className="text-xs text-gray-500 font-normal">from $25/mo</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">
                      <div className="flex flex-col items-center">
                        <span>Google Forms</span>
                        <span className="text-xs text-green-600 font-normal">FREE</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">
                      <div className="flex flex-col items-center">
                        <span>JotForm</span>
                        <span className="text-xs text-gray-500 font-normal">from $34/mo</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisonFeatures.map((feature, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{feature.name}</td>
                      <td className="px-6 py-4 text-center">
                        {feature.formBharat ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.typeform ? (
                          <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.googleForms ? (
                          <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {feature.jotform ? (
                          <CheckCircle2 className="h-6 w-6 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              ⭐ FormBharat gives you more features for <strong>FREE</strong> than others charge $25-34/month for
            </p>
          </div>
        </div>
      </section>

      {/* Why FormBharat */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Built for Indian Businesses</h2>
            <p className="text-xl text-gray-600">
              We understand what Indian SMBs need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>WhatsApp First</CardTitle>
                <CardDescription>
                  Share forms where your customers are. One-click WhatsApp sharing for 500M+ Indian users.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Indian Templates</CardTitle>
                <CardDescription>
                  Templates with GST fields, LPA salary ranges, Indian phone formats, and local business needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>100% Free</CardTitle>
                <CardDescription>
                  No hidden costs, no credit card needed, unlimited forms and responses. Free forever for early users.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to build your first form?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of Indian businesses using FormBharat
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Browse Templates
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
              <p className="text-sm">The form builder made for Indian businesses.</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
                <li><Link href="/builder" className="hover:text-white">Form Builder</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
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
