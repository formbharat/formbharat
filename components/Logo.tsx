import Link from 'next/link'

const SIZES = {
  sm: { icon: 26, textClass: 'text-base' },
  md: { icon: 32, textClass: 'text-lg' },
  lg: { icon: 40, textClass: 'text-xl' },
}

interface LogoProps {
  iconOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  href?: string | null
  className?: string
  /** Use white wordmark text (for dark backgrounds like Footer) */
  dark?: boolean
}

export function Logo({ iconOnly = false, size = 'md', href = '/', className = '', dark = false }: LogoProps) {
  const { icon: iconSize, textClass } = SIZES[size]

  const content = (
    <span className={`inline-flex items-center gap-2 flex-shrink-0 ${className}`}>
      {/* Icon — plain <img> so SVG renders without next/image restrictions */}
      <img
        src="/logo-icon.svg"
        alt="FormBharat icon"
        width={iconSize}
        height={iconSize}
        style={{ width: iconSize, height: iconSize }}
        className="rounded-[22%] flex-shrink-0"
      />
      {!iconOnly && (
        <span className={`font-bold ${textClass} leading-none`}>
          <span className={dark ? 'text-white' : 'text-gray-900'}>Form</span>
          <span className="text-orange-500">Bharat</span>
        </span>
      )}
    </span>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }
  return content
}
