'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, BookOpen, Zap, Users, Settings, FileText, MessageSquare, ArrowRight, ChevronRight } from 'lucide-react'

interface HelpArticle {
  id: string
  title: string
  description: string
  category: string
  content: string
}

const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with FormBharat',
    description: 'Learn how to create your first form in minutes',
    category: 'Getting Started',
    content: 'Step-by-step guide to creating your first form...'
  },
  {
    id: 'create-form',
    title: 'How to Create a Form',
    description: 'Build custom forms with our drag-and-drop builder',
    category: 'Getting Started',
    content: 'Detailed guide on form creation...'
  },
  {
    id: 'use-templates',
    title: 'Using Form Templates',
    description: 'Start quickly with pre-built form templates',
    category: 'Getting Started',
    content: 'Guide to using templates...'
  },
  {
    id: 'collect-responses',
    title: 'Collecting Form Responses',
    description: 'Share your forms and collect responses',
    category: 'Forms',
    content: 'How to share and collect responses...'
  },
  {
    id: 'view-analytics',
    title: 'Understanding Form Analytics',
    description: 'Track and analyze your form performance',
    category: 'Forms',
    content: 'Guide to analytics dashboard...'
  },
  {
    id: 'export-data',
    title: 'Exporting Response Data',
    description: 'Download your form responses as CSV',
    category: 'Forms',
    content: 'How to export data...'
  },
  {
    id: 'whatsapp-share',
    title: 'Sharing Forms via WhatsApp',
    description: 'Share your forms on WhatsApp instantly',
    category: 'Sharing',
    content: 'WhatsApp integration guide...'
  },
  {
    id: 'webhook-setup',
    title: 'Setting Up Webhooks',
    description: 'Integrate forms with external services',
    category: 'Integrations',
    content: 'Webhook configuration guide...'
  },
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    description: 'Get notified when forms are submitted',
    category: 'Integrations',
    content: 'Email notification setup...'
  },
  {
    id: 'multi-step-forms',
    title: 'Creating Multi-Step Forms',
    description: 'Break long forms into multiple pages',
    category: 'Advanced',
    content: 'Multi-step form guide...'
  },
  {
    id: 'account-setup',
    title: 'Account Setup and Management',
    description: 'Manage your FormBharat account',
    category: 'Account',
    content: 'Account management guide...'
  },
  {
    id: 'troubleshooting',
    title: 'Common Issues and Solutions',
    description: 'Troubleshoot common problems',
    category: 'Troubleshooting',
    content: 'Common issues and fixes...'
  },
]

const categories = [
  { name: 'Getting Started', icon: Zap, color: 'orange' },
  { name: 'Forms', icon: FileText, color: 'blue' },
  { name: 'Sharing', icon: MessageSquare, color: 'green' },
  { name: 'Integrations', icon: Settings, color: 'purple' },
  { name: 'Advanced', icon: BookOpen, color: 'pink' },
  { name: 'Account', icon: Users, color: 'yellow' },
  { name: 'Troubleshooting', icon: Search, color: 'red' },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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
              <Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm">Features</Link>
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
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            How can we <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">help you?</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Search our knowledge base or browse categories below
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-3 md:top-4 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 md:py-6 text-base md:text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.name
              return (
                <Card 
                  key={category.name}
                  className={`cursor-pointer hover:shadow-lg transition ${isSelected ? 'ring-2 ring-orange-500' : ''}`}
                  onClick={() => setSelectedCategory(isSelected ? null : category.name)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 bg-${category.color}-100 rounded-2xl flex items-center justify-center`}>
                        <Icon className={`h-8 w-8 text-${category.color}-600`} />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {helpArticles.filter(a => a.category === category.name).length} articles
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          {selectedCategory && (
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedCategory}</h2>
              <Button variant="ghost" onClick={() => setSelectedCategory(null)}>
                Clear filter
              </Button>
            </div>
          )}
          
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No articles found matching your search.</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
                Clear search
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/help/${article.id}`}>
                  <Card className="hover:shadow-lg transition h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Our support team is here to assist you
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500">
                <MessageSquare className="mr-2 h-5 w-5" />
                Contact Support
              </Button>
            </Link>
            <Button size="lg" variant="outline" onClick={() => {
              // This will trigger Tawk.to chat
              if (typeof window !== 'undefined' && (window as any).Tawk_API) {
                (window as any).Tawk_API.maximize()
              }
            }}>
              <MessageSquare className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
