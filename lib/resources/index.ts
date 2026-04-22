import { aiForms } from './ai-forms'
import { leadGeneration } from './lead-generation'
import { surveysFeedback } from './surveys-feedback'
import { formDesign } from './form-design'
import { businessFormsIndia } from './business-forms-india'
import { whatsappForms } from './whatsapp-forms'
import { formAnalytics } from './form-analytics'
import type { Pillar, Article } from './types'

export type { Pillar, Article }

export const pillars: Pillar[] = [
  aiForms,
  leadGeneration,
  surveysFeedback,
  formDesign,
  businessFormsIndia,
  whatsappForms,
  formAnalytics,
]

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug)
}

export function getArticle(pillarSlug: string, articleSlug: string): Article | undefined {
  const pillar = getPillar(pillarSlug)
  return pillar?.articles.find((a) => a.slug === articleSlug)
}

export function getAllArticles(): Array<{ pillar: Pillar; article: Article }> {
  return pillars.flatMap((pillar) =>
    pillar.articles.map((article) => ({ pillar, article }))
  )
}
