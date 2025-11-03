'use client'

import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/types'

const statusOptions: Array<'All' | Project['status']> = ['All', 'Ongoing', 'Completed', 'Upcoming']
const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'size', label: 'By Size' },
  { value: 'alphabetical', label: 'A to Z' },
]

interface ProjectFilterProps {
  onFilterChange: (filters: {
    status: 'All' | Project['status']
    search: string
    sort: string
  }) => void
}

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [status, setStatus] = useState<'All' | Project['status']>('All')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('latest')

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ status, search, sort })
    }, 300) // Debounce search

    return () => clearTimeout(timer)
  }, [status, search, sort, onFilterChange])

  return (
    <div className="space-y-6 pb-8">
      {/* Status Filters */}
      <div>
        <h3 className="mb-4 text-sm font-heading font-semibold text-foreground uppercase tracking-wider">
          Status
        </h3>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => setStatus(option)}
              className="transition-all duration-200"
            >
              <Badge
                variant={status === option ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm"
              >
                {option}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Search and Sort */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border/50 bg-background px-10 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-border/50 bg-background px-4 py-3 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
