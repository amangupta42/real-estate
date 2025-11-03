'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity'
import type { TeamMember } from '@/types'

interface TeamMemberCardProps {
  member: TeamMember
  index: number
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const imageUrl = member.photo
    ? urlFor(member.photo).width(400).height(400).url()
    : '/placeholder-avatar.jpg'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Card className="h-full text-center overflow-hidden group">
        <CardContent className="p-0">
          {/* Photo */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={member.photo?.alt || member.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Info */}
          <div className="p-6 space-y-2">
            <h3 className="text-lg font-heading font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-primary font-medium">{member.role}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
