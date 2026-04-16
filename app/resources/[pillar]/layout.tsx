import type { Metadata } from 'next'
import { getPillar } from '@/lib/resources'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>
}): Promise<Metadata> {
  const { pillar: slug } = await params
  const pillar = getPillar(slug)

  if (!pillar) {
    return { title: 'Resources', robots: { index: false, follow: false } }
  }

  const url = `https://formbharat.com/resources/${slug}`

  return {
    title: `${pillar.title} — Complete Guide`,
    description: pillar.description,
    keywords: pillar.articles.flatMap((a) => a.tags).filter((v, i, arr) => arr.indexOf(v) === i),
    alternates: { canonical: url },
    openGraph: {
      title: `${pillar.title} | FormBharat Resources`,
      description: pillar.description,
      url,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pillar.title} | FormBharat`,
      description: pillar.description,
    },
  }
}

export default function PillarLayout({ children }: { children: React.ReactNode }) {
  return children
}
