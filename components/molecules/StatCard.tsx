'use client'

import { motion } from 'framer-motion'

interface StatCardProps {
  icon: React.ReactNode
  stat: string
  label: string
  description?: string
  index?: number
}

export function StatCard({ icon, stat, label, description, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="group"
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
          {icon}
        </div>

        {/* Stat */}
        <div className="mb-1 text-3xl font-heading font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
          {stat}
        </div>

        {/* Label */}
        <div className="mb-2 text-sm font-medium text-muted-foreground">{label}</div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground/80 leading-relaxed">{description}</p>
        )}

        {/* Hover Effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </motion.div>
  )
}
