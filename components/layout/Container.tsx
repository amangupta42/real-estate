import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    //set to take full height of the screen justify content center
    <div
      className={cn('mx-auto w-full h-full max-w-7xl  px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  )
}
