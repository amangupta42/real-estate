import React, { useMemo } from 'react'
import { type ArrayOfObjectsInputProps, type ObjectItem } from 'sanity'
import { Stack, Card, Flex, Text, Box, Grid, Badge } from '@sanity/ui'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { calculateTotalArea, formatNumber, generateChartColor } from '../../lib/helpers'

interface AreaBreakdownItem {
  _key?: string
  areaType?: string
  area?: {
    squareMeters?: number
  }
  description?: string
}

const AREA_TYPE_LABELS: Record<string, string> = {
  plotted: 'Plotted Area',
  amenity: 'Amenity Plot',
  roads: 'Roads',
  open_space: 'Open Space',
  green_belt: 'Green Belt',
  commercial: 'Commercial Area',
  other: 'Other',
}

const AREA_TYPE_ICONS: Record<string, string> = {
  plotted: '🏘️',
  amenity: '🏞️',
  roads: '🛣️',
  open_space: '🌳',
  green_belt: '🌿',
  commercial: '🏢',
  other: '📍',
}

export function AreaBreakdownVisualizer(props: ArrayOfObjectsInputProps) {
  const { value, renderDefault } = props
  const breakdownItems = (value as AreaBreakdownItem[]) || []

  // Calculate totals and prepare chart data
  const chartData = useMemo(() => {
    return breakdownItems
      .filter((item) => item.areaType && item.area?.squareMeters)
      .map((item, index) => ({
        name: AREA_TYPE_LABELS[item.areaType!] || item.areaType,
        value: item.area!.squareMeters!,
        icon: AREA_TYPE_ICONS[item.areaType!] || '📍',
        color: generateChartColor(index),
      }))
  }, [breakdownItems])

  const totalArea = useMemo(() => calculateTotalArea(breakdownItems), [breakdownItems])

  const hasData = chartData.length > 0

  return (
    <Stack space={4}>
      {/* Visualization Section */}
      {hasData && (
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              📊 Area Distribution Visualization
            </Text>

            <Grid columns={2} gap={4}>
              {/* Pie Chart */}
              <Box>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(1)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `${formatNumber(value, 2)} sq.m`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Legend & Stats */}
              <Stack space={3}>
                <Card padding={3} radius={2} tone="positive" border>
                  <Stack space={2}>
                    <Text size={1} muted>
                      Total Area
                    </Text>
                    <Text size={4} weight="bold">
                      {formatNumber(totalArea, 2)} sq.m
                    </Text>
                    <Text size={1} muted>
                      {formatNumber(totalArea * 10.7639, 0)} sq.ft
                    </Text>
                  </Stack>
                </Card>

                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    Area Breakdown
                  </Text>
                  {chartData.map((item, index) => {
                    const percentage = (item.value / totalArea) * 100
                    return (
                      <Card key={index} padding={2} radius={2} border>
                        <Flex align="center" justify="space-between">
                          <Flex align="center" gap={2}>
                            <Box
                              style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: item.color,
                                borderRadius: '2px',
                              }}
                            />
                            <Text size={1}>
                              {item.icon} {item.name}
                            </Text>
                          </Flex>
                          <Flex align="center" gap={2}>
                            <Text size={1} weight="medium">
                              {formatNumber(item.value, 0)} sq.m
                            </Text>
                            <Badge tone="primary">{percentage.toFixed(1)}%</Badge>
                          </Flex>
                        </Flex>
                      </Card>
                    )
                  })}
                </Stack>
              </Stack>
            </Grid>
          </Stack>
        </Card>
      )}

      {/* Info Card when no data */}
      {!hasData && (
        <Card padding={3} radius={2} tone="transparent" border>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              📊 Area Breakdown Visualization
            </Text>
            <Text size={1} muted>
              Add area breakdown items below to see the visualization and distribution chart.
            </Text>
          </Stack>
        </Card>
      )}

      {/* Default Sanity Input (Array) */}
      <Box>{renderDefault(props)}</Box>
    </Stack>
  )
}
