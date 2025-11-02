'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ProjectStatus } from '@/types'
import { Search, X } from 'lucide-react'

interface ProjectFilterProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  status: ProjectStatus | 'All'
}

const statusOptions: Array<ProjectStatus | 'All'> = ['All', 'Ongoing', 'Completed', 'Upcoming']

export function ProjectFilter({ onFilterChange }: ProjectFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: 'All',
  })

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleStatusChange = (status: ProjectStatus | 'All') => {
    const newFilters = { ...filters, status }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const newFilters: FilterState = { search: '', status: 'All' }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters = filters.search !== '' || filters.status !== 'All'

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search projects by name or location..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Status:</span>
        {statusOptions.map((status) => (
          <Badge
            key={status}
            variant={filters.status === status ? 'default' : 'outline'}
            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </Badge>
        ))}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
          <X className="mr-1 h-3 w-3" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
