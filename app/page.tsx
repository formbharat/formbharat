'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Sparkles, CheckCircle2, ArrowRight, ChevronDown,
  MessageSquare, IndianRupee, ShieldCheck, Zap, Share2, Star
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useToast } from '@/components/ui/use-toast'
import { GuestAIGenerator } from '@/components/GuestAIGenerator'
import AnimatedSection from '@/components/AnimatedSection'

// ─── AI typing demo ───────────────────────────────────────────────────────────
const DEMO_SCENARIOS = [
  {
    prompt: 'Customer feedback form for my restaurant...',
    title: 'Restaurant Feedback',
    fields: [
      { label: 'Full Name', hint: 'Short text' },
      { label: 'Overall Rating', hint: 'Rating 1–5 ★' },
      { label: 'Food Quality', hint: 'Rating 1–5 ★' },
      { label: 'Comments', hint: 'Long text' },
    ],
  },
  {
    prompt: 'Job application form for a software engineer...',
    title: 'Job Application',
    fields: [
      { label: 'Full Name', hint: 'Short text' },
      { label: 'Email Address', hint: 'Email' },
      { label: 'Years of Experience', hint: 'Number' },
      { label: 'Resume Upload', hint: 'File upload' },
    ],
  },
  {
    prompt: 'Event registration for a weekend workshop...',
    title: 'Workshop Registration',
    fields: [
      { label: 'Participant Name', hint: 'Short text' },
      { label: 'Phone Number', hint: 'Phone (India)' },
      { label: 'T-Shirt Size', hint: 'Dropdown' },
      { label: 'Payment', hint: 'UPI / Card' },
    ],
  },
]

function useFormDemo() {
  const [scenario, setScenario] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'generating' | 'fields' | 'pause'>('typing')
  const [chars, setChars] = useState(0)
  const [visible, setVisible] = useState(0)

  const current = DEMO_SCENARIOS[scenario]

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    if (phase === 'typing') {
      if (chars < current.prompt.length) t = setTimeout(() => setChars(c => c + 1), 48)
      else t = setTimeout(() => setPhase('generating'), 700)
    } else if (phase === 'generating') {
      t = setTimeout(() => { setPhase('fields'); setVisible(0) }, 1600)
    } else if (phase === 'fields') {
      if (visible < current.fields.length) t = setTimeout(() => setVisible(v => v + 1), 350)
      else t = setTimeout(() => setPhase('pause'), 400)
    } else {
      t = setTimeout(() => {
        setScenario(s => (s + 1) % DEMO_SCENARIOS.length)
        setPhase('typing'); setChars(0); setVisible(0)
      }, 3200)
    }
    return () => clearTimeout(t)
  }, [phase, chars, visible, current])

  return { phase, text: current.prompt.slice(0, chars), visible, title: current.title, fields: current.fields }
}

// ─── FAQ item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full text-left py-4 flex items-center justify-between gap-4 text-sm md:text-base font-medium text-gray-800 hover:text-orange-600 transition-colors"
        onClick={onToggle}
      >
        {q}
        <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-orange-500' : 'text-gray-400'}`} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0', paddingBottom: open ? '1rem' : '0' }}
      >
        <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const { toast } = useToast()
  const [aiDescription, setAIDescription] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const demo = useFormDemo()

  const faqItems = [
    {
      q: 'Is FormBharat really free?',
      a: 'Yes — 100% free during early access. Unlimited forms, unlimited responses, all features included. Early access users will be grandfathered into a generous free tier when we introduce paid plans.',
    },
    {
      q: 'How does the AI form generator work?',
      a: 'Describe your form in plain English — e.g. "customer feedback form for a restaurant with star ratings". Our AI understands your intent and generates all fields, labels, and structure in under 10 seconds.',
    },
    {
      q: 'Do I need coding skills?',
      a: 'Not at all. If you can type, you can build a form. FormBharat is designed for everyone — from kirana store owners to startup founders.',
    },
    {
      q: 'How do respondents fill out my form?',
      a: 'Every form gets a unique public link. Share it via WhatsApp, email, or embed it on your website. No login needed for respondents.',
    },
    {
      q: 'Can I collect UPI / card payments?',
      a: 'Yes. Add a Payment field to your form and respondents can pay via UPI, cards, or net banking through Razorpay — integrated directly into the form submission.',
    },
    {
      q: 'Where is my data stored?',
      a: 'All data is stored on Supabase PostgreSQL. We never sell or share your data. Export everything as CSV at any time.',
    },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── HERO ── */}
      <section className="bg-orange-50 px-4 pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="container mx-auto">

          {/* Badge */}
          <div className="flex justify-center mb-7">
            <span className="inline-flex items-center gap-1.5 bg-white border border-orange-200 text-orange-600 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm">
              <Sparkles className="h-3 w-3" />
              AI-Powered · Open Source · Made for India
            </span>
          </div>

          {/* Headline */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mb-4">
              Create any form{' '}
              <span className="text-orange-500">in seconds</span>
              {' '}with AI
            </h1>
            <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Describe what you need — AI builds a complete, professional form instantly.
            </p>
          </div>

          {/* Input Card */}
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">

              {/* Textarea area */}
              <div className="px-5 pt-5 pb-3">
                <textarea
                  value={aiDescription}
                  onChange={(e) => setAIDescription(e.target.value)}
                  placeholder="Describe your form... e.g. Customer feedback form for a restaurant with ratings for food and service"
                  className="w-full min-h-[88px] text-sm md:text-[15px] bg-transparent text-gray-900 placeholder-gray-400 outline-none resize-none leading-relaxed"
                  maxLength={500}
                />
              </div>

              {/* Chips tray */}
              <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 font-medium">Try:</span>
                {[
                  ['Feedback form', 'Customer feedback form for a restaurant with ratings for food and service'],
                  ['Event registration', 'Event registration form for a tech conference'],
                  ['Job application', 'Job application form for a software engineer position'],
                  ['Order form', 'Product order form for a handmade jewelry business'],
                ].map(([label, full], index) => (
                  <button
                    key={index}
                    onClick={() => setAIDescription(full)}
                    className="text-xs px-2.5 py-1 bg-white border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-300 rounded-full transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Button area */}
              <div className="px-5 py-4">
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
                  className="w-full h-11 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors rounded-xl"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Form — It&apos;s Free
                </Button>
              </div>
            </div>

            {/* Sub-line */}
            <p className="mt-4 text-center text-xs text-gray-400">
              No credit card required · Free forever · Made in India 🇮🇳
            </p>
          </div>

        </div>
      </section>

      {/* ── PAIN ── */}
      <section className="py-16 px-4 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-10">
            <p className="text-sm text-gray-400 font-medium">The problem with every form tool you&apos;ve tried</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                tool: 'Typeform', price: '$25/month',
                problem: 'Starts free, then gates responses behind a paywall. No UPI, no WhatsApp, no Indian context.',
                bg: 'bg-red-50', border: 'border-red-100', tag: 'text-red-400',
              },
              {
                tool: 'Google Forms', price: 'Free',
                problem: 'No conditional logic, no payments, no branding. Fine for a school survey, not for a business.',
                bg: 'bg-yellow-50', border: 'border-yellow-100', tag: 'text-yellow-500',
              },
              {
                tool: 'JotForm', price: '$34/month',
                problem: 'Powerful but complex and expensive. Not designed for how India operates.',
                bg: 'bg-slate-50', border: 'border-slate-100', tag: 'text-slate-400',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100} className="h-full">
                <div className={`rounded-2xl border p-5 flex flex-col h-full ${item.bg} ${item.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">{item.tool}</span>
                    <span className={`text-xs font-medium ${item.tag}`}>{item.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1 mb-4">{item.problem}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-auto">
                    <span className="w-3 h-3 rounded-full bg-red-200 flex items-center justify-center text-red-400 font-bold text-[9px]">✕</span>
                    Not built for India
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDIA-FIRST ── */}
      <section className="py-20 md:py-28 px-4 bg-orange-50">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">So we built FormBharat</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              The only form builder that<br className="hidden md:block" /> truly understands India
            </h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm md:text-base">
              Not adapted from a Western product. Built from scratch for how India actually works.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100',
                badge: 'WhatsApp native', title: 'WhatsApp Sharing',
                desc: 'Share forms directly to WhatsApp with one click. India has 500M+ WhatsApp users — meet them where they are.',
                detail: 'Every public form gets a WhatsApp share button built in.',
              },
              {
                icon: IndianRupee, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100',
                badge: 'UPI + Cards', title: 'Razorpay Payments',
                desc: 'Add a payment field and collect fees via UPI, cards, and net banking — as part of the form submission flow.',
                detail: 'Perfect for order forms, event fees, and service bookings.',
              },
              {
                icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100',
                badge: '10K free/month', title: 'Phone OTP Verification',
                desc: "Verify respondents' Indian mobile numbers with Firebase OTP before submission. Stop fake entries cold.",
                detail: 'Powered by Firebase Authentication.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <AnimatedSection key={i} delay={i * 120}>
                  <div className={`bg-white rounded-2xl p-6 border ${item.border} hover:shadow-md transition-all duration-300 h-full`}>
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className={`text-xs font-semibold ${item.color} ${item.bg} px-2.5 py-1 rounded-full border ${item.border}`}>
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                    <p className="text-xs text-gray-400">{item.detail}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Simple by design</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">From idea to live form in 3 steps</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-orange-200" />
            {[
              { num: '1', icon: Sparkles, title: 'Describe', desc: 'Tell the AI what kind of form you need in plain English. No technical knowledge required.' },
              { num: '2', icon: Zap, title: 'Generate', desc: 'AI builds your complete form with the right fields and structure in under 10 seconds.' },
              { num: '3', icon: Share2, title: 'Share & Collect', desc: 'Share via WhatsApp, embed on your site, or use the link. Responses arrive in real-time.' },
            ].map((step, i) => {
              const Icon = step.icon
              return (
                <AnimatedSection key={i} delay={i * 150}>
                  <div className="relative bg-white rounded-2xl p-6 border border-gray-100 text-center hover:border-orange-200 hover:shadow-sm transition-all duration-300">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                      {step.num}
                    </div>
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-4 mt-2">
                      <Icon className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── AI DEMO ── */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">See it in action</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Watch AI build your form live</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm md:text-base">
              This animation runs in real-time — exactly how it works when you use it.
            </p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="bg-gray-950 rounded-2xl p-5 font-mono text-sm min-h-[220px]">
                <div className="flex gap-1.5 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <p className="text-gray-500 text-xs mb-2">$ describe your form</p>
                <p className="text-green-400 leading-relaxed min-h-[3rem]">
                  {demo.text}
                  {demo.phase === 'typing' && <span className="animate-cursor">▊</span>}
                </p>
                {demo.phase !== 'typing' && (
                  <div className="mt-4 flex items-center gap-2 text-orange-400 text-xs">
                    <Sparkles className={`h-3 w-3 ${demo.phase === 'generating' ? 'animate-spin' : ''}`} />
                    {demo.phase === 'generating' ? 'Generating your form...' : '✓ Form generated in 2s'}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 min-h-[220px] shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-xs font-medium text-gray-600">{demo.title}</span>
                  {(demo.phase === 'fields' || demo.phase === 'pause') && (
                    <span className="ml-auto text-xs text-green-600 font-medium">✓ Ready</span>
                  )}
                </div>
                <div className="space-y-2.5">
                  {demo.fields.slice(0, demo.visible).map((f, i) => (
                    <div key={i} className="animate-fade-in-up">
                      <p className="text-[10px] text-gray-400 mb-1 uppercase tracking-wide">{f.label}</p>
                      <div className="h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center px-3">
                        <span className="text-[10px] text-gray-300">{f.hint}</span>
                      </div>
                    </div>
                  ))}
                  {demo.phase === 'generating' && (
                    <div className="space-y-2">
                      {[1, 2, 3].map(n => (
                        <div key={n} className="h-7 rounded-lg bg-gray-100 animate-pulse" style={{ animationDelay: `${n * 100}ms` }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection className="mt-8 text-center">
            <Button
              onClick={() => {
                setAIDescription('Customer feedback form for a restaurant with food and service ratings')
                document.getElementById('hero-input')?.focus()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 rounded-xl"
            >
              Try it yourself — it&apos;s free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>


      {/* ── PRICING ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Pricing</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Honest pricing. Always.</h2>
            <p className="text-gray-500 mt-3 text-sm md:text-base">No surprise bills. No credit card. Early access users get everything free, forever.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="max-w-sm mx-auto bg-white rounded-2xl border-2 border-orange-200 p-8 shadow-sm text-center">
              <div className="inline-flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5">
                <Sparkles className="h-3 w-3" />
                Early Access — Free Forever
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-1">₹0</div>
              <p className="text-gray-400 text-sm mb-7">per month, always</p>
              <div className="text-left space-y-3 mb-8">
                {[
                  'Unlimited forms & responses',
                  'AI Form Generator',
                  'WhatsApp sharing + QR code',
                  'Razorpay payment fields',
                  'Phone OTP verification',
                  'Conditional logic',
                  'Analytics dashboard',
                  'CSV export',
                  'Embed on your website',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
              <Link href="/builder">
                <Button className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl">
                  Start building free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-xs text-gray-400 mt-3">No credit card · Ready in 30 seconds</p>
            </div>
          </AnimatedSection>
          <AnimatedSection>
            <p className="text-center text-xs text-gray-400 mt-5 max-w-sm mx-auto">
              Team plans coming in the future. Free users will be grandfathered into a generous permanent free tier.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <AnimatedSection className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Early users</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved by Indian businesses</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote: 'Finally a form tool that just works in India. Set up our restaurant feedback form in 2 minutes using AI. Customers love filling it via WhatsApp.',
                name: 'Priya Sharma', role: 'Restaurant Owner, Pune', initials: 'PS', color: 'bg-orange-100 text-orange-700',
              },
              {
                quote: 'We use it for event registrations. Conditional logic is powerful — attendees only see fields relevant to them. Switched from Typeform, saving ₹2,000/month.',
                name: 'Rahul Verma', role: 'Event Organizer, Delhi', initials: 'RV', color: 'bg-blue-100 text-blue-700',
              },
              {
                quote: 'The UPI payment field is a game-changer. We collect booking fees directly in the form. No separate payment link needed.',
                name: 'Ananya Patel', role: 'Studio Owner, Bengaluru', initials: 'AP', color: 'bg-purple-100 text-purple-700',
              },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-orange-100 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-5">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${t.color}`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 md:py-28 px-4 bg-gray-50">
        <div className="container mx-auto max-w-2xl">
          <AnimatedSection className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Questions? We&apos;ve got answers.</h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="bg-white rounded-2xl border border-gray-100 px-6">
              {faqItems.map((item, i) => (
                <FAQItem
                  key={i}
                  q={item.q}
                  a={item.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 md:py-28 px-4 bg-orange-500">
        <div className="container mx-auto max-w-2xl text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your first form is one sentence away.
            </h2>
            <p className="text-orange-100 text-base md:text-lg mb-8 max-w-md mx-auto">
              Free forever. No credit card. Made in India.
            </p>
            <Link href="/builder">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-8 h-12 rounded-xl shadow-md">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <GuestAIGenerator
        open={showAuthModal}
        onOpenChange={setShowAuthModal}
        initialDescription={aiDescription}
      />

      <Footer />
    </div>
  )
}
