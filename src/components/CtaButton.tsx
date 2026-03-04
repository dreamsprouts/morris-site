import { Link } from 'react-router-dom'

interface CtaButtonProps {
  to: string
  label: string
  variant?: 'primary' | 'outline'
}

export function CtaButton({ to, label, variant = 'primary' }: CtaButtonProps) {
  const base =
    'inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded transition-colors'
  const styles =
    variant === 'primary'
      ? 'bg-aisumicha text-shironeri hover:bg-aisumicha/90'
      : 'border border-aisumicha text-aisumicha hover:bg-aisumicha/10'

  return (
    <Link to={to} className={`${base} ${styles}`}>
      {label}
    </Link>
  )
}
