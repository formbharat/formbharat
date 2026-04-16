import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getArticle, getPillar, pillars } from '@/lib/resources'
import { ArrowRight, ArrowLeft, Clock, Calendar, ChevronRight, CheckCircle2, BookOpen, List } from 'lucide-react'
import Script from 'next/script'

function toAnchor(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

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

const borderColorMap: Record<string, string> = {
  orange: 'border-orange-200',
  blue: 'border-blue-200',
  purple: 'border-purple-200',
  green: 'border-green-200',
  emerald: 'border-emerald-200',
  indigo: 'border-indigo-200',
}

const activeBgMap: Record<string, string> = {
  orange: 'bg-orange-50 text-orange-700 font-semibold',
  blue: 'bg-blue-50 text-blue-700 font-semibold',
  purple: 'bg-purple-50 text-purple-700 font-semibold',
  green: 'bg-green-50 text-green-700 font-semibold',
  emerald: 'bg-emerald-50 text-emerald-700 font-semibold',
  indigo: 'bg-indigo-50 text-indigo-700 font-semibold',
}

export async function generateStaticParams() {
  return pillars.flatMap((p) =>
    p.articles.map((a) => ({ pillar: p.slug, article: a.slug }))
  )
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ pillar: string; article: string }>
}) {
  const { pillar: pillarSlug, article: articleSlug } = await params
  const pillar = getPillar(pillarSlug)
  const article = getArticle(pillarSlug, articleSlug)
  if (!pillar || !article) notFound()

  const articleIndex = pillar.articles.findIndex((a) => a.slug === articleSlug)
  const prevArticle = articleIndex > 0 ? pillar.articles[articleIndex - 1] : null
  const nextArticle = articleIndex < pillar.articles.length - 1 ? pillar.articles[articleIndex + 1] : null
  const url = `https://formbharat.com/resources/${pillarSlug}/${articleSlug}`

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: { '@type': 'Organization', name: 'FormBharat' },
    publisher: { '@type': 'Organization', name: 'FormBharat', url: 'https://formbharat.com' },
    url,
    keywords: article.tags.join(', '),
  }

  const faqSchema = article.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://formbharat.com' },
      { '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://formbharat.com/resources' },
      { '@type': 'ListItem', position: 3, name: pillar.title, item: `https://formbharat.com/resources/${pillarSlug}` },
      { '@type': 'ListItem', position: 4, name: article.title, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-white">
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Header />

      {/* Breadcrumb bar */}
      <div className="border-b border-gray-100 bg-gray-50 sticky top-[57px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 flex-wrap" aria-label="Breadcrumb">
            <Link href="/resources" className="hover:text-orange-600 transition-colors">Resources</Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <Link href={`/resources/${pillarSlug}`} className="hover:text-orange-600 transition-colors">
              {pillar.title}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-gray-800 font-medium truncate max-w-[200px] sm:max-w-none">
              {article.title.split(':')[0]}
            </span>
          </nav>
        </div>
      </div>

      {/* 3-Column layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* ── LEFT SIDEBAR: Pillar nav ── */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-28 space-y-6">

            {/* Back to resources hub */}
            <Link
              href="/resources"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Resources
            </Link>

            {/* Current pillar articles */}
            <div>
              <Link
                href={`/resources/${pillarSlug}`}
                className="flex items-center gap-2 mb-3 group"
              >
                <span className="text-xl">{pillar.icon}</span>
                <span className={`text-sm font-bold ${textColorMap[pillar.color]} leading-tight`}>
                  {pillar.title}
                </span>
              </Link>
              <nav className="space-y-0.5" aria-label="Articles in this topic">
                {pillar.articles.map((a) => {
                  const isActive = a.slug === articleSlug
                  return (
                    <Link
                      key={a.slug}
                      href={`/resources/${pillarSlug}/${a.slug}`}
                      className={`block text-sm px-3 py-2 rounded-lg transition-colors leading-snug ${
                        isActive
                          ? activeBgMap[pillar.color]
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      {a.title.split(':')[0]}
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Other pillars */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Other Topics
              </p>
              <nav className="space-y-1" aria-label="Other resource topics">
                {pillars
                  .filter((p) => p.slug !== pillarSlug)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      href={`/resources/${p.slug}`}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span>{p.icon}</span>
                      <span className="leading-tight truncate">{p.title.split(' ').slice(0, 3).join(' ')}</span>
                    </Link>
                  ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0">

          {/* Article header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs font-medium px-2.5 py-1 rounded-full ${bgLightMap[pillar.color]} ${textColorMap[pillar.color]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-5">
              {article.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-b border-gray-100 pb-5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />{article.readTime} read
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(article.publishDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span>By FormBharat</span>
            </div>
          </header>

          {/* Mobile TOC */}
          <details className="xl:hidden mb-8 border border-gray-200 rounded-xl overflow-hidden">
            <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer bg-gray-50 text-sm font-semibold text-gray-700 select-none">
              <List className="w-4 h-4" /> Table of Contents
            </summary>
            <nav className="px-4 py-3 space-y-1.5 bg-white">
              {article.sections.map((s) => (
                <a
                  key={s.heading}
                  href={`#${toAnchor(s.heading)}`}
                  className="block text-sm text-gray-600 hover:text-orange-600 transition-colors py-0.5"
                >
                  {s.heading}
                </a>
              ))}
              {article.faq.length > 0 && (
                <a href="#faq" className="block text-sm text-gray-600 hover:text-orange-600 transition-colors py-0.5">
                  Frequently Asked Questions
                </a>
              )}
            </nav>
          </details>

          {/* Intro */}
          <p className="text-gray-700 text-lg leading-relaxed mb-10">
            {article.intro}
          </p>

          {/* Content sections with anchor IDs */}
          <div className="space-y-10">
            {article.sections.map((section) => (
              <section key={section.heading} id={toAnchor(section.heading)} className="scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 leading-snug">
                  {section.heading}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {section.body}
                </p>
                {section.list && section.list.length > 0 && (
                  <ul className="space-y-2.5">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${textColorMap[pillar.color]}`} />
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* CTA Box */}
          <div className={`my-12 rounded-xl border-2 ${borderColorMap[pillar.color]} ${bgLightMap[pillar.color]} p-6`}>
            <h3 className={`text-lg font-bold mb-2 ${textColorMap[pillar.color]}`}>
              {article.cta.heading}
            </h3>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{article.cta.body}</p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQ */}
          {article.faq.length > 0 && (
            <section id="faq" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {article.faq.map((item, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 mb-2 leading-snug">{item.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prev / Next */}
          <nav className="border-t border-gray-100 pt-8 grid grid-cols-2 gap-4" aria-label="Article navigation">
            {prevArticle ? (
              <Link
                href={`/resources/${pillarSlug}/${prevArticle.slug}`}
                className="group flex flex-col gap-1 p-4 border border-gray-200 rounded-xl hover:border-orange-300 transition-all"
              >
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 leading-snug line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                href={`/resources/${pillarSlug}/${nextArticle.slug}`}
                className="group flex flex-col items-end gap-1 p-4 border border-gray-200 rounded-xl hover:border-orange-300 transition-all text-right"
              >
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 leading-snug line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        </main>

        {/* ── RIGHT SIDEBAR: Table of Contents ── */}
        <aside className="hidden xl:block w-52 flex-shrink-0">
          <div className="sticky top-28">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> On this page
            </p>
            <nav className="space-y-1" aria-label="Table of contents">
              {article.sections.map((s) => (
                <a
                  key={s.heading}
                  href={`#${toAnchor(s.heading)}`}
                  className="block text-sm text-gray-500 hover:text-orange-600 py-1 leading-snug transition-colors border-l-2 border-transparent hover:border-orange-400 pl-3"
                >
                  {s.heading}
                </a>
              ))}
              {article.faq.length > 0 && (
                <a
                  href="#faq"
                  className="block text-sm text-gray-500 hover:text-orange-600 py-1 leading-snug transition-colors border-l-2 border-transparent hover:border-orange-400 pl-3"
                >
                  FAQ
                </a>
              )}
            </nav>

            <div className="mt-8 p-4 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl border border-orange-100">
              <p className="text-xs font-semibold text-gray-700 mb-2">Try it free</p>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Build forms that put this guide into practice.
              </p>
              <Link
                href="/builder"
                className="block text-center text-xs font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Building →
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Articles */}
      <section className="py-12 px-4 sm:px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-5">More in {pillar.title}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillar.articles
              .filter((a) => a.slug !== articleSlug)
              .slice(0, 3)
              .map((related) => (
                <Link
                  key={related.slug}
                  href={`/resources/${pillarSlug}/${related.slug}`}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-orange-300 hover:shadow-sm transition-all"
                >
                  <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {related.title}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" /> {related.readTime} read
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
