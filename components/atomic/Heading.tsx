import { cn } from '@/lib/utils'
import { type VariantProps, cva } from 'class-variance-authority'

const headingVariants = cva('font-serif font-bold text-balance', {
  variants: {
    level: {
      h1: 'text-4xl md:text-5xl lg:text-6xl',
      h2: 'text-3xl md:text-4xl lg:text-5xl',
      h3: 'text-2xl md:text-3xl lg:text-4xl',
      h4: 'text-xl md:text-2xl lg:text-3xl',
      h5: 'text-lg md:text-xl',
      h6: 'text-base md:text-lg',
    },
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    level: 'h2',
    variant: 'default',
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ as, level, variant, className, children, ...props }: HeadingProps) {
  const Component = as || level || 'h2'

  return (
    <Component
      className={cn(headingVariants({ level: level || as, variant }), className)}
      {...props}
    >
      {children}
    </Component>
  )
}
