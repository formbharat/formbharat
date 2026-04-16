import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getPillar, pillars } from '@/lib/resources'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, ArrowLeft, Clock, ChevronRight } from 'lucide-react'
import { PillarIcon } from '@/components/PillarIcon'
import Script from 'next/script'

const textColorMap: Record<string, string> = {
  orange: 'text-orange-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  green: 'text-green-600',
  emerald: 'text-emerald-600',
  indigo: 'text-indigo-600',
}

const bgLightMap: Record<string, string> = {
  orange: 'bg-orange-50',
  blue: 'bg-blue-50',
  purple: 'bg-purple-50',
  green: 'bg-green-50',
  emerald: 'bg-emerald-50',
  indigo: 'bg-indigo-50',
}

export async function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }))
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>
}) {
  const { pillar: slug } = await params
  const pillar = getPillar(slug)
  if (!pillar) notFound()

  const url = `https://formbharat.com/resources/${slug}`

  return (
    <div className="min-h-screen bg-white">
      <Script
        id="pillar-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: pillar.title,
            description: pillar.description,
            url,
            publisher: { '@type': 'Organization', name: 'FormBharat' },
            hasPart: pillar.articles.map((a) => ({
              '@type': 'Article',
              headline: a.title,
              url: `${url}/${a.slug}`,
              description: a.description,
            })),
          }),
        }}
      />

      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/resources" className="hover:text-orange-600 transition-colors">Resources</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-800 font-medium">{pillar.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className={`py-14 px-4 sm:px-6 ${bgLightMap[pillar.color]}`}>
        <div className="max-w-3xl mx-auto">
          <PillarIcon slug={pillar.slug} size="xl" className="mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {pillar.title}
          </h1>
          <p className="text-lg text-gray-600 mb-3 leading-relaxed">
            {pillar.description}
          </p>
          <p className="text-sm text-gray-400">
            {pillar.articles.length} articles · Updated regularly
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">All Articles</h2>
          <div className="space-y-4">
            {pillar.articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/resources/${pillar.slug}/${article.slug}`}
                className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-gray-400">#{i + 1}</span>
                      <div className="flex gap-1 flex-wrap">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${bgLightMap[pillar.color]} ${textColorMap[pillar.color]}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className={`text-base sm:text-lg font-semibold text-gray-900 leading-snug mb-2 group-hover:${textColorMap[pillar.color]} transition-colors`}>
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <ArrowRight className={`w-5 h-5 text-gray-300 group-hover:${textColorMap[pillar.color]} transition-colors`} />
                    <span className="flex items-center gap-1 text-xs text-gray-400 whitespace-nowrap">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all resources
            </Link>
          </div>
        </div>
      </section>

      {/* Other Topics */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Explore Other Topics</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {pillars
              .filter((p) => p.slug !== pillar.slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  href={`/resources/${p.slug}`}
                  className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-xl p-4 text-center hover:border-orange-300 hover:shadow-sm transition-all group"
                >
                  <PillarIcon slug={p.slug} size="md" />
                  <span className="text-xs font-medium text-gray-700 leading-tight group-hover:text-orange-600 transition-colors">
                    {p.title.split(':')[0].split(' ').slice(0, 3).join(' ')}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">{pillar.tagline}</h2>
          <p className="text-orange-100 mb-6">
            Apply what you&apos;ve learned. Build your next form with FormBharat — free forever.
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-orange-600 font-semibold px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors"
          >
            Build a Form Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
