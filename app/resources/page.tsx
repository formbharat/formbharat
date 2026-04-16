import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { pillars } from '@/lib/resources'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import { PillarIcon } from '@/components/PillarIcon'
import Script from 'next/script'

const colorMap: Record<string, string> = {
  orange: 'bg-orange-50 border-orange-100 hover:border-orange-300',
  blue: 'bg-blue-50 border-blue-100 hover:border-blue-300',
  purple: 'bg-purple-50 border-purple-100 hover:border-purple-300',
  green: 'bg-green-50 border-green-100 hover:border-green-300',
  emerald: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300',
  indigo: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300',
}

const badgeColorMap: Record<string, string> = {
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-green-100 text-green-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  indigo: 'bg-indigo-100 text-indigo-700',
}

const totalArticles = pillars.reduce((sum, p) => sum + p.articles.length, 0)

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Script
        id="resources-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'FormBharat Resources',
            description: 'Free guides, tutorials, and best practices for online forms — tailored for Indian businesses.',
            url: 'https://formbharat.com/resources',
            publisher: { '@type': 'Organization', name: 'FormBharat' },
            numberOfItems: totalArticles,
          }),
        }}
      />

      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-pink-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            Free Resources
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            Learn How to Build Forms<br />That Actually Work
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Practical guides on lead generation, WhatsApp marketing, survey design, and data analytics — written for Indian businesses.
          </p>
          <p className="text-sm text-gray-500">
            {pillars.length} topic categories · {totalArticles} in-depth articles · Free forever
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <Link
                key={pillar.slug}
                href={`/resources/${pillar.slug}`}
                className="group"
              >
                <Card className={`h-full border-2 transition-all duration-200 ${colorMap[pillar.color]} group-hover:shadow-md`}>
                  <CardHeader className="pb-3">
                    <PillarIcon slug={pillar.slug} size="lg" className="mb-3" />
                    <CardTitle className="text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      {pillar.articles.slice(0, 3).map((article) => (
                        <div key={article.slug} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600 leading-snug line-clamp-1">
                            {article.title.split(':')[0]}
                          </span>
                        </div>
                      ))}
                      {pillar.articles.length > 3 && (
                        <p className="text-xs text-gray-400 pl-3">
                          +{pillar.articles.length - 3} more articles
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColorMap[pillar.color]}`}>
                        {pillar.articles.length} articles
                      </span>
                      <span className="flex items-center gap-1 text-sm text-orange-600 font-medium group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.flatMap((p) => p.articles.slice(0, 1)).map((article) => {
              const pillar = pillars.find((p) => p.articles.includes(article))!
              return (
                <Link
                  key={article.slug}
                  href={`/resources/${pillar.slug}/${article.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <PillarIcon slug={pillar.slug} size="md" className="mb-3" />
                  <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {article.readTime} read
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Ready to put it all into practice?
          </h2>
          <p className="text-orange-100 mb-6">
            Build your first form in under 5 minutes. Free forever — no credit card needed.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Start Building Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
