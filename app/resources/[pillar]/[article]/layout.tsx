import type { Metadata } from 'next'
import { getArticle, getPillar } from '@/lib/resources'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; article: string }>
}): Promise<Metadata> {
  const { pillar: pillarSlug, article: articleSlug } = await params
  const article = getArticle(pillarSlug, articleSlug)
  const pillar = getPillar(pillarSlug)

  if (!article || !pillar) {
    return { title: 'Article', robots: { index: false, follow: false } }
  }

  const url = `https://formbharat.com/resources/${pillarSlug}/${articleSlug}`

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      title: `${article.title} | FormBharat Resources`,
      description: article.description,
      url,
      type: 'article',
      publishedTime: article.publishDate,
      authors: ['FormBharat'],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
    },
  }
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return children
}
