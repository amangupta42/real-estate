'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

export interface Citation {
  id: number
  title: string
  source: string
  url?: string
  date?: string
}

interface CitationListProps {
  citations: Citation[]
}

export function CitationList({ citations }: CitationListProps) {
  if (!citations || citations.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="mt-16 border-t border-border/50 pt-12"
    >
      <h2 className="mb-6 text-2xl font-heading font-semibold text-foreground">
        References & Citations
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        All data and statistics presented on this page are sourced from reputable organizations and
        government authorities. Click on any reference to view the original source.
      </p>

      <div className="space-y-3">
        {citations.map((citation, index) => (
          <motion.div
            key={citation.id}
            id={`ref-${citation.id}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group scroll-mt-24 rounded-lg border border-border/50 bg-muted/10 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/20"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary">
                {citation.id}
              </span>
              <div className="flex-1">
                <div className="mb-1 flex items-start justify-between gap-4">
                  <h3 className="font-medium text-foreground leading-snug">{citation.title}</h3>
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="View source"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">{citation.source}</span>
                  {citation.date && (
                    <span className="ml-2 text-muted-foreground/70">• {citation.date}</span>
                  )}
                </p>
                {citation.url && (
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View Source
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-muted/20 p-4">
        <p className="text-xs text-muted-foreground/80">
          <strong className="text-foreground">Disclaimer:</strong> Data and statistics are accurate
          as of the last update date. Market conditions and information may change over time. Please
          verify current information independently before making investment decisions.
        </p>
      </div>
    </motion.section>
  )
}
