'use client'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Zap, MessageSquare, BarChart3, Webhook, Mail, FileText,
  Layers, Share2, Download, Shield, Clock,
  Smartphone, Globe, Users, CheckCircle2, TrendingUp,
  Lock, Database, Code2, ArrowRight, Check, X, Sparkles, Wand2, Languages
} from 'lucide-react'

const featureGroups = [
  {
    label: 'AI-Powered',
    icon: Sparkles,
    bg: 'bg-orange-50',
    color: 'text-orange-500',
    items: [
      { icon: Sparkles, name: 'AI Form Generator', desc: 'Describe your form in plain English. AI builds a complete form with the right fields in 10 seconds.', highlight: true },
      { icon: Wand2, name: 'Smart Field Suggestions', desc: 'AI recommends relevant fields based on your industry and use case as you build.' },
      { icon: Languages, name: 'Multilingual Generation', desc: 'Generate forms in Hindi, Tamil, Telugu, Marathi, Gujarati and Bengali with one click. (Coming soon)' },
    ],
  },
  {
    label: 'Form Building',
    icon: FileText,
    bg: 'bg-orange-50',
    color: 'text-orange-500',
    items: [
      { icon: Zap, name: 'Drag & Drop Builder', desc: 'Visual editor. Reorder fields instantly by dragging.' },
      { icon: Layers, name: '8 Field Types', desc: 'Text, email, phone, dropdown, radio, checkbox, file upload.' },
      { icon: FileText, name: '12 Ready Templates', desc: 'Events, jobs, orders, feedback — professionally designed.' },
      { icon: Layers, name: 'Multi-Step Forms', desc: 'Break long forms into pages for better completion rates.' },
    ],
  },
  {
    label: 'India-Specific',
    icon: MessageSquare,
    bg: 'bg-green-50',
    color: 'text-green-500',
    items: [
      { icon: MessageSquare, name: 'WhatsApp Sharing', desc: 'One-click share to WhatsApp. Built for 500M+ Indian users.', highlight: true },
      { icon: Globe, name: 'Indian Templates', desc: 'GST fields, LPA salary ranges, Indian phone format.' },
      { icon: Users, name: 'Local Use Cases', desc: 'Forms built around how Indian SMBs actually operate.' },
    ],
  },
  {
    label: 'Analytics',
    icon: BarChart3,
    bg: 'bg-blue-50',
    color: 'text-blue-500',
    items: [
      { icon: BarChart3, name: 'Analytics Dashboard', desc: 'Response trends, completion rates, and field-level data.' },
      { icon: Download, name: 'CSV Export', desc: 'Download responses for Excel, Sheets, or any tool.' },
      { icon: TrendingUp, name: 'Real-time Updates', desc: 'Responses appear in your dashboard the moment they arrive.' },
      { icon: Clock, name: 'Response Tracking', desc: 'Submission timestamps and completion time tracking.' },
    ],
  },
  {
    label: 'Integrations',
    icon: Webhook,
    bg: 'bg-purple-50',
    color: 'text-purple-500',
    items: [
      { icon: Webhook, name: 'Webhooks', desc: 'Send data to Zapier, Make, n8n, or your own backend.' },
      { icon: Mail, name: 'Email Notifications', desc: 'Instant alerts on submission. Multiple recipients.' },
      { icon: Code2, name: 'REST API', desc: 'Programmatic access to forms and all response data.' },
    ],
  },
  {
    label: 'Sharing',
    icon: Share2,
    bg: 'bg-pink-50',
    color: 'text-pink-500',
    items: [
      { icon: Share2, name: 'Public Links', desc: 'One shareable URL. No login needed for respondents.' },
      { icon: Code2, name: 'Embed', desc: 'Drop forms into your website with a simple iframe.' },
      { icon: Smartphone, name: 'Mobile Responsive', desc: 'Works perfectly on every screen size, always.' },
    ],
  },
  {
    label: 'Security',
    icon: Shield,
    bg: 'bg-slate-50',
    color: 'text-slate-500',
    items: [
      { icon: Shield, name: 'HTTPS Encryption', desc: 'All forms served over secure connections.' },
      { icon: Lock, name: 'Data Privacy', desc: 'Your data is yours. We never sell or share it.' },
      { icon: Database, name: 'Reliable Storage', desc: 'Supabase PostgreSQL — enterprise-grade database.' },
    ],
  },
]

const comparison = [
  { name: 'AI Form Generator',      fb: true,  tf: false, gf: false, jf: false },
  { name: 'Unlimited Forms',       fb: true,  tf: false, gf: true,  jf: false },
  { name: 'Unlimited Responses',   fb: true,  tf: false, gf: true,  jf: false },
  { name: 'WhatsApp Sharing',      fb: true,  tf: false, gf: false, jf: false },
  { name: 'Analytics Dashboard',   fb: true,  tf: true,  gf: true,  jf: true  },
  { name: 'Multi-Step Forms',      fb: true,  tf: true,  gf: false, jf: true  },
  { name: 'Webhooks',              fb: true,  tf: true,  gf: false, jf: true  },
  { name: 'CSV Export',            fb: true,  tf: true,  gf: true,  jf: true  },
  { name: 'Custom Branding',       fb: true,  tf: false, gf: false, jf: false },
  { name: 'Email Notifications',   fb: true,  tf: true,  gf: false, jf: true  },
  { name: 'No Credit Card',        fb: true,  tf: false, gf: true,  jf: false },
  { name: 'Indian Templates',      fb: true,  tf: false, gf: false, jf: false },
]

function Tick({ on, primary }: { on: boolean; primary?: boolean }) {
  if (on) return <Check className={`w-4 h-4 mx-auto ${primary ? 'text-orange-500' : 'text-gray-400'}`} strokeWidth={2.5} />
  return <X className="w-4 h-4 mx-auto text-gray-200" strokeWidth={2} />
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-16 md:pt-24 pb-14 md:pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-4">Features</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-5 leading-[1.1]">
            Everything you need,<br />
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              nothing you don't
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-8">
            AI-powered form generation, WhatsApp sharing, and analytics — built for Indian businesses. All features free during early access.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-sm px-8">
                Start building free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8">Browse templates</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-20 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto space-y-16">
          {featureGroups.map((group) => {
            const GroupIcon = group.icon
            return (
              <div key={group.label}>
                <div className="flex items-center gap-2.5 mb-6">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${group.bg}`}>
                    <GroupIcon className={`w-4 h-4 ${group.color}`} />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">{group.label}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    return (
                      <div
                        key={item.name}
                        className={`rounded-xl p-4 flex gap-3 border ${
                          item.highlight
                            ? 'border-green-200 bg-green-50/50'
                            : 'border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200'
                        } transition-all`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                          <ItemIcon className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 mb-0.5">{item.name}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Comparison */}
      <section className="py-16 md:py-20 px-4 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">How we compare</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">FormBharat vs the rest</h2>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-5 py-4 text-left text-gray-500 font-medium w-[40%]">Feature</th>
                    <th className="px-4 py-4 text-center font-semibold">
                      <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">FormBharat</span>
                      <div className="text-[10px] font-normal text-green-500 mt-0.5">FREE</div>
                    </th>
                    <th className="px-4 py-4 text-center text-gray-400 font-medium">
                      Typeform
                      <div className="text-[10px] font-normal text-gray-400 mt-0.5">$25/mo</div>
                    </th>
                    <th className="px-4 py-4 text-center text-gray-400 font-medium">
                      Google
                      <div className="text-[10px] font-normal text-green-500 mt-0.5">FREE</div>
                    </th>
                    <th className="px-4 py-4 text-center text-gray-400 font-medium">
                      JotForm
                      <div className="text-[10px] font-normal text-gray-400 mt-0.5">$34/mo</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comparison.map((row) => (
                    <tr key={row.name} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-3 text-gray-700 font-medium">{row.name}</td>
                      <td className="px-4 py-3"><Tick on={row.fb} primary /></td>
                      <td className="px-4 py-3"><Tick on={row.tf} /></td>
                      <td className="px-4 py-3"><Tick on={row.gf} /></td>
                      <td className="px-4 py-3"><Tick on={row.jf} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to build your first form?</h2>
          <p className="text-gray-500 mb-8">Free during early access. No credit card needed.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/builder">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-sm px-8">
                Start building free <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="px-8">Browse templates</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
