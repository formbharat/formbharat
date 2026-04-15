'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Search, FileText, Users, Calendar, ShoppingCart, Briefcase, MessageSquare, ClipboardList, Award, Phone, Mail } from 'lucide-react'
import { formTemplates } from '@/lib/templates-data'

const iconMap: any = {
  MessageSquare, Calendar, Briefcase, ShoppingCart, Mail, ClipboardList, Users, Phone, Award, FileText
}

export default function TemplatesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const handleUseTemplate = (templateId: string) => {
    const template = formTemplates.find(t => t.id === templateId)
    console.log('Selected template ID:', templateId)
    console.log('Found template:', template)
    if (template) {
      console.log('Saving template to localStorage:', {
        id: template.id,
        title: template.title,
        fieldsCount: template.fields.length
      })
      localStorage.setItem('selected-template', JSON.stringify(template))
      router.push('/builder')
    }
  }

  const categories = ['All', 'Business', 'Events', 'HR', 'Sales', 'Support', 'Research', 'Marketing']

  const filteredTemplates = formTemplates
    .filter(t => selectedCategory === 'All' || t.category === selectedCategory)
    .filter(t => searchQuery === '' || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
              <Link href="/templates" className="text-gray-900 font-medium text-sm">Templates</Link>
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
            Form <span className="bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 mb-6 md:mb-8">
            Start quickly with professionally designed form templates. Customize to your needs.
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8 justify-center">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat)}
                className={selectedCategory === cat ? 'bg-gradient-to-r from-orange-500 to-pink-500' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>1md2g3 gap-md:-6 max-wxl mx-auto

          {/* Templates */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => {
              const Icon = iconMap[template.icon] || FileText
              return (
                <Card key={template.id} className="hover:shadow-lg transition group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                      <Icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">{template.category}</span>
                      <span>{template.fields.length} fields</span>
                    </div>
                    <Button 
                      onClick={() => handleUseTemplate(template.id)}
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No templates found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Start from scratch with our drag-and-drop builder
          </p>
          <Link href="/builder">
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 text-lg px-8">
              Create Custom Form
            </Button>
          </Link>
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
                <li><Link href="/#features" className="hover:text-white">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white">Templates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
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
