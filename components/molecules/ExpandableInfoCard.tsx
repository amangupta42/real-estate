'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExpandableInfoCardProps {
  icon: React.ReactNode
  title: string
  preview: string
  content: React.ReactNode
  references?: number[]
  index?: number
}

export function ExpandableInfoCard({
  icon,
  title,
  preview,
  content,
  references,
  index = 0,
}: ExpandableInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
      className="group"
    >
      <div className="overflow-hidden rounded-xl border border-border/50 bg-background transition-all duration-300 hover:border-primary/30 hover:shadow-card">
        {/* Header - Always Visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-6 text-left transition-colors duration-200"
          aria-expanded={isExpanded}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className={cn(
                'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300',
                isExpanded
                  ? 'bg-primary/20 scale-105'
                  : 'bg-primary/10 group-hover:scale-105 group-hover:bg-primary/15'
              )}
            >
              {icon}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between gap-4">
                <h3
                  className={cn(
                    'text-lg font-heading font-semibold transition-colors duration-200',
                    isExpanded ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  )}
                >
                  {title}
                </h3>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 flex-shrink-0 transition-colors',
                      isExpanded ? 'text-primary' : 'text-muted-foreground'
                    )}
                  />
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{preview}</p>
            </div>
          </div>
        </button>

        {/* Expandable Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/50 px-6 pb-6 pt-4">
                <div className="prose prose-slate max-w-none text-sm text-muted-foreground">
                  {content}
                </div>
                {references && references.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground/60">
                    <span className="font-medium">References:</span>
                    <span>
                      {references.map((ref, idx) => (
                        <span key={ref}>
                          [
                          <a
                            href={`#ref-${ref}`}
                            className="text-primary hover:underline"
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                          >
                            {ref}
                          </a>
                          ]{idx < references.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
