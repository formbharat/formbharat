'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Users, Target, Zap, ArrowRight, MapPin, Github, MessageCircle, Flag, Lock } from 'lucide-react'

const missionCards = [
  { icon: Flag, bg: 'bg-orange-50', color: 'text-orange-500', label: 'India-first design' },
  { icon: MessageCircle, bg: 'bg-green-50', color: 'text-green-500', label: 'WhatsApp native' },
  { icon: Zap, bg: 'bg-amber-50', color: 'text-amber-500', label: 'Built for speed' },
  { icon: Lock, bg: 'bg-blue-50', color: 'text-blue-500', label: 'Open source' },
]

const values = [
  {
    icon: Target, bg: 'bg-orange-50', color: 'text-orange-500',
    title: 'India First',
    desc: 'WhatsApp-native, UPI-ready, and designed for how India actually works — not adapted from a Western product.',
  },
  {
    icon: Heart, bg: 'bg-pink-50', color: 'text-pink-500',
    title: 'Always Free',
    desc: 'No hidden costs. Early access users get premium features free forever. No credit card needed.',
  },
  {
    icon: Users, bg: 'bg-blue-50', color: 'text-blue-500',
    title: 'Community Driven',
    desc: 'Every feature we ship is driven by feedback from real Indian businesses, not investor checklists.',
  },
  {
    icon: Zap, bg: 'bg-amber-50', color: 'text-amber-500',
    title: 'Fast & Simple',
    desc: 'Create a form in under 2 minutes. No training, no docs, no friction.',
  },
]

const stats = [
  { value: '10,000+', label: 'Target businesses, Year 1' },
  { value: '2 min', label: 'Avg. form creation time' },
  { value: '100%', label: 'Free during early access' },
  { value: 'India', label: 'Built & hosted locally' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5" />
            Made in India
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            Built for the way<br />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              India does business
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            FormBharat is a free, open-source form builder designed specifically for Indian businesses — from kirana stores to funded startups.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Our Mission</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Powerful tools<br />shouldn't cost a fortune
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Every Indian business — whether it's a 2-person team in Surat or a 200-person company in Bengaluru — deserves access to the same quality tools as Fortune 500s.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From collecting customer feedback to managing event registrations, FormBharat handles it all. Free, forever.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {missionCards.map(({ icon: Icon, bg, color, label }) => (
              <div key={label} className={`${bg} rounded-2xl p-5 flex flex-col gap-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 px-4 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">What we stand for</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map(({ icon: Icon, bg, color, title, desc }) => (
              <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-4 hover:border-orange-100 hover:shadow-sm transition-all">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                  <Icon className={`w-[18px] h-[18px] ${color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">The story</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">Why we built FormBharat</h2>
          <div className="space-y-5 text-gray-500 leading-relaxed text-[15px]">
            <p>
              As developers building products in India, we kept running into the same wall. The tools that exist — Typeform, Google Forms, JotForm — were either too expensive, too generic, or simply didn't understand how India operates.
            </p>
            <p>
              No UPI payment fields. No WhatsApp delivery. No regional language support. Pricing in dollars, built for Western teams.
            </p>
            <p>
              So we built FormBharat — a tool that understands the Indian market, speaks the language of Indian businesses, and costs nothing to get started.
            </p>
          </div>
          <blockquote className="border-l-2 border-orange-300 pl-5 mt-8 text-gray-700 text-base italic leading-relaxed">
            "Our goal is to empower 10,000+ Indian businesses in our first year. We're just getting started."
          </blockquote>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">The FormBharat Team</p>
              <p className="text-xs text-gray-400">Bengaluru, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Join us on this journey</h2>
          <p className="text-gray-500 mb-8">Be part of India's form building revolution. Free, forever.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-sm px-8">
                Create your first form <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/open-source">
              <Button size="lg" variant="outline" className="px-8">
                <Github className="w-4 h-4 mr-2" /> View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
