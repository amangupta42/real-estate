import React from 'react'
import { Card, Flex, Stack, Text, Badge, Box, Grid } from '@sanity/ui'
import { type PreviewProps } from 'sanity'
import { getPropertyTypeIcon, formatIndianAddress } from '../../lib/helpers'

interface ProjectPreviewProps extends PreviewProps {
  title?: string
  status?: string
  propertyType?: string
  landCategory?: string
  totalArea?: {
    squareMeters?: number
    acres?: number
  }
  indianAddress?: {
    village?: string
    taluka?: string
    district?: string
    state?: string
  }
  legalDocumentation?: {
    landUseStatus?: string
    reraRegistered?: boolean
  }
}

export function EnhancedProjectPreview(props: ProjectPreviewProps) {
  const {
    title,
    status,
    propertyType,
    landCategory,
    totalArea,
    indianAddress,
    legalDocumentation,
  } = props

  const statusTone =
    {
      Ongoing: 'primary',
      Completed: 'positive',
      Upcoming: 'caution',
    }[status || ''] || 'default'

  const propertyIcon = getPropertyTypeIcon(propertyType || '')

  return (
    <Card padding={3} radius={2} border>
      <Stack space={3}>
        {/* Title & Status */}
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={2}>
            <Text size={2}>{propertyIcon}</Text>
            <Text size={2} weight="semibold">
              {title || 'Untitled Project'}
            </Text>
          </Flex>
          {status && (
            <Badge tone={statusTone as any} mode="outline">
              {status}
            </Badge>
          )}
        </Flex>

        {/* Quick Info Grid */}
        <Grid columns={3} gap={2}>
          {/* Property Type */}
          {propertyType && (
            <Box>
              <Text size={1} muted>
                Type
              </Text>
              <Text size={1} weight="medium">
                {propertyType.replace(/_/g, ' ')}
              </Text>
            </Box>
          )}

          {/* Total Area */}
          {totalArea?.squareMeters && (
            <Box>
              <Text size={1} muted>
                Area
              </Text>
              <Text size={1} weight="medium">
                {totalArea.acres
                  ? `${totalArea.acres.toFixed(2)} acres`
                  : `${totalArea.squareMeters.toFixed(0)} sq.m`}
              </Text>
            </Box>
          )}

          {/* Land Category */}
          {landCategory && (
            <Box>
              <Text size={1} muted>
                Category
              </Text>
              <Text size={1} weight="medium">
                {landCategory.replace(/_/g, ' ')}
              </Text>
            </Box>
          )}
        </Grid>

        {/* Location */}
        {indianAddress && (
          <Box>
            <Text size={1} muted>
              📍 Location
            </Text>
            <Text size={1}>{formatIndianAddress(indianAddress)}</Text>
          </Box>
        )}

        {/* Legal Status Badges */}
        <Flex gap={2} wrap="wrap">
          {legalDocumentation?.landUseStatus && (
            <Badge tone="default" mode="outline">
              {legalDocumentation.landUseStatus.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          )}
          {legalDocumentation?.reraRegistered && (
            <Badge tone="positive" mode="outline">
              ✓ RERA Registered
            </Badge>
          )}
        </Flex>
      </Stack>
    </Card>
  )
}
