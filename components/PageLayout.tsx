import { ReactNode } from 'react'

type PageSectionProps = {
  children: ReactNode
  className?: string
  as?: 'section' | 'article'
}

type PageContainerProps = {
  children: ReactNode
  className?: string
  size?: 'narrow' | 'wide'
}

type PageIntroProps = {
  eyebrow: string
  title: string
  description?: string
}

function cx(...classes: Array<string | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function PageSection({
  children,
  className,
  as: Tag = 'section',
}: PageSectionProps) {
  return (
    <Tag className={cx('px-4 pb-14 pt-24 sm:px-6 sm:pb-16 lg:pt-28', className)}>
      {children}
    </Tag>
  )
}

export function PageContainer({
  children,
  className,
  size = 'wide',
}: PageContainerProps) {
  return (
    <div
      className={cx(
        'mx-auto w-full',
        size === 'narrow' ? 'max-w-3xl' : 'max-w-6xl',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <header className="max-w-3xl text-left">
      <p className="text-sm font-medium uppercase tracking-[0.08em] text-teal">
        {eyebrow}
      </p>
      <h1 className="mt-3 font-playfair text-4xl font-normal leading-tight text-teal-dark sm:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {description}
        </p>
      ) : null}
    </header>
  )
}
