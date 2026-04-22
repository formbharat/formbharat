import { Target, BarChart2, Layers, Building2, MessageCircle, TrendingUp, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface PillarMeta {
  icon: LucideIcon
  iconBg: string
  iconColor: string
}

const pillarIconMap: Record<string, PillarMeta> = {
  'ai-form-generation':   { icon: Sparkles,      iconBg: 'bg-orange-100',  iconColor: 'text-orange-500'  },
  'lead-generation':      { icon: Target,        iconBg: 'bg-orange-100',  iconColor: 'text-orange-600'  },
  'surveys-feedback':     { icon: BarChart2,      iconBg: 'bg-blue-100',    iconColor: 'text-blue-600'    },
  'form-design':          { icon: Layers,         iconBg: 'bg-purple-100',  iconColor: 'text-purple-600'  },
  'business-forms-india': { icon: Building2,      iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' },
  'whatsapp-forms':       { icon: MessageCircle,  iconBg: 'bg-green-100',   iconColor: 'text-green-600'   },
  'form-analytics':       { icon: TrendingUp,     iconBg: 'bg-pink-100',    iconColor: 'text-pink-600'    },
}

const containerSize = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12', xl: 'w-16 h-16' }
const iconSize      = { sm: 'w-4 h-4', md: 'w-5 h-5',  lg: 'w-6 h-6',   xl: 'w-8 h-8'   }
const roundSize     = { sm: 'rounded-lg', md: 'rounded-xl', lg: 'rounded-xl', xl: 'rounded-2xl' }

interface Props {
  slug: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function PillarIcon({ slug, size = 'md', className = '' }: Props) {
  const meta = pillarIconMap[slug]
  if (!meta) return null
  const Icon = meta.icon
  return (
    <div className={`${containerSize[size]} ${roundSize[size]} flex items-center justify-center flex-shrink-0 ${meta.iconBg} ${className}`}>
      <Icon className={`${iconSize[size]} ${meta.iconColor}`} />
    </div>
  )
}
