'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, ChevronDown, ArrowRight, Target, BarChart2, Layers, Building2, MessageCircle, TrendingUp } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { clearSession } from '@/lib/getToken'

const resourcePillars = [
  {
    slug: 'lead-generation',
    icon: Target,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    title: 'Lead Generation',
    desc: 'Capture & qualify leads from Indian markets',
  },
  {
    slug: 'surveys-feedback',
    icon: BarChart2,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Surveys & Feedback',
    desc: 'Measure CSAT, NPS, and employee satisfaction',
  },
  {
    slug: 'form-design',
    icon: Layers,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Form Design',
    desc: 'Multi-step, mobile-first, high-converting forms',
  },
  {
    slug: 'business-forms-india',
    icon: Building2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    title: 'Business Forms',
    desc: 'India-specific forms for SMBs',
  },
  {
    slug: 'whatsapp-forms',
    icon: MessageCircle,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'WhatsApp Forms',
    desc: 'Collect responses via WhatsApp',
  },
  {
    slug: 'form-analytics',
    icon: TrendingUp,
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    title: 'Form Analytics',
    desc: 'Improve completion rates with data',
  },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const megaMenuRef = useRef<HTMLDivElement>(null)
  const resourcesBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node) &&
        resourcesBtnRef.current && !resourcesBtnRef.current.contains(e.target as Node)
      ) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    clearSession()
    setIsLoggedIn(false)
    router.push('/')
  }

  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-3.5">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Logo href="/" size="md" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/features" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Features
            </Link>
            <Link href="/templates" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Templates
            </Link>

            {/* Resources mega menu trigger */}
            <div className="relative">
              <button
                ref={resourcesBtnRef}
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                  resourcesOpen ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Resources
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega menu panel */}
              {resourcesOpen && (
                <div
                  ref={megaMenuRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50"
                >
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {resourcePillars.map((p) => {
                      const Icon = p.icon
                      return (
                        <Link
                          key={p.slug}
                          href={`/resources/${p.slug}`}
                          onClick={() => setResourcesOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 group transition-colors"
                        >
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${p.iconBg}`}>
                            <Icon className={`w-4 h-4 ${p.iconColor}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors leading-tight">
                              {p.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{p.desc}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <p className="text-xs text-gray-400">24 in-depth guides for Indian businesses</p>
                    <Link
                      href="/resources"
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                    >
                      Browse all <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">My Forms</Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-1.5" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link href="/builder">
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 shadow-sm">
                    Start Free →
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link href="/features" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Features
            </Link>
            <Link href="/templates" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Templates
            </Link>

            {/* Mobile resources accordion */}
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg w-full text-left"
            >
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileResourcesOpen && (
              <div className="ml-4 space-y-1 border-l-2 border-orange-100 pl-3">
                {resourcePillars.map((p) => {
                  const Icon = p.icon
                  return (
                    <Link
                      key={p.slug}
                      href={`/resources/${p.slug}`}
                      onClick={() => { setMobileMenuOpen(false); setMobileResourcesOpen(false) }}
                      className="flex items-center gap-2 px-2 py-2 text-sm text-gray-600 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${p.iconBg}`}>
                        <Icon className={`w-3.5 h-3.5 ${p.iconColor}`} />
                      </div>
                      {p.title}
                    </Link>
                  )
                })}
                <Link
                  href="/resources"
                  onClick={() => { setMobileMenuOpen(false); setMobileResourcesOpen(false) }}
                  className="flex items-center gap-1 px-2 py-2 text-sm font-semibold text-orange-600"
                >
                  All guides <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            <Link href="/about" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className="px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>

            <div className="border-t border-gray-100 pt-3 mt-2 flex flex-col gap-2">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">My Forms</Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-center"
                    onClick={() => { handleLogout(); setMobileMenuOpen(false) }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/builder" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Start Free →
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
