import React, { useState, useEffect, useCallback } from 'react'
import { set, unset } from 'sanity'
import { Stack, Card, Flex, Text, TextInput, Grid, Box } from '@sanity/ui'
import { type ObjectInputProps } from 'sanity'
import { convertArea, formatNumber, isWithinTolerance } from '../../lib/helpers'

interface MeasurementValue {
  squareMeters?: number
  squareFeet?: number
  acres?: number
  hectares?: number
  gunthas?: number
}

export function MeasurementInput(props: ObjectInputProps) {
  const { value, onChange, elementProps } = props
  const measurementValue = value as MeasurementValue | undefined

  const [squareMeters, setSquareMeters] = useState<string>(
    measurementValue?.squareMeters?.toString() || ''
  )
  const [manualEdit, setManualEdit] = useState(false)

  // Convert and update all units when square meters changes
  const updateAllUnits = useCallback(
    (sqm: number) => {
      if (isNaN(sqm) || sqm <= 0) {
        onChange(unset())
        return
      }

      const converted = convertArea(sqm)

      onChange(
        set({
          squareMeters: converted.squareMeters,
          squareFeet: converted.squareFeet,
          acres: converted.acres,
          hectares: converted.hectares,
          gunthas: converted.gunthas,
        })
      )
    },
    [onChange]
  )

  // Handle square meters input change
  const handleSquareMetersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setSquareMeters(inputValue)

    const numValue = parseFloat(inputValue)
    if (!isNaN(numValue) && numValue > 0) {
      updateAllUnits(numValue)
    } else if (inputValue === '') {
      onChange(unset())
    }
  }

  // Handle manual edit of other units
  const handleManualUnitChange = (
    unit: 'squareFeet' | 'acres' | 'hectares' | 'gunthas',
    inputValue: string
  ) => {
    setManualEdit(true)
    const numValue = parseFloat(inputValue)

    if (isNaN(numValue) || numValue <= 0) {
      return
    }

    // Convert back to square meters based on the unit
    let sqm: number
    switch (unit) {
      case 'squareFeet':
        sqm = numValue / 10.7639
        break
      case 'acres':
        sqm = numValue / 0.000247105
        break
      case 'hectares':
        sqm = numValue / 0.0001
        break
      case 'gunthas':
        sqm = numValue / 0.00988422
        break
    }

    setSquareMeters(sqm.toFixed(2))
    updateAllUnits(sqm)

    setTimeout(() => setManualEdit(false), 2000)
  }

  const converted = measurementValue?.squareMeters
    ? convertArea(measurementValue.squareMeters)
    : null

  return (
    <Stack space={3} {...elementProps}>
      {/* Primary Input: Square Meters */}
      <Card padding={3} radius={2} shadow={1} tone="primary">
        <Stack space={3}>
          <Text size={1} weight="semibold">
            Primary Measurement
          </Text>
          <Flex gap={2} align="center">
            <Box flex={1}>
              <TextInput
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter area in square meters"
                value={squareMeters}
                onChange={handleSquareMetersChange}
                fontSize={3}
              />
            </Box>
            <Text size={2} weight="medium" style={{ minWidth: '100px' }}>
              sq. meters
            </Text>
          </Flex>
        </Stack>
      </Card>

      {/* Auto-calculated Conversions */}
      {converted && (
        <Stack space={2}>
          <Text size={1} weight="semibold" muted>
            Auto-calculated conversions:
          </Text>

          <Grid columns={2} gap={2}>
            {/* Square Feet */}
            <Card padding={3} radius={2} tone="transparent" border>
              <Stack space={2}>
                <Text size={1} muted>
                  Square Feet
                </Text>
                <Flex align="center" gap={2}>
                  <TextInput
                    type="number"
                    value={converted.squareFeet.toFixed(2)}
                    onChange={(e) => handleManualUnitChange('squareFeet', e.target.value)}
                    fontSize={2}
                  />
                  <Text size={1} muted>
                    sq. ft
                  </Text>
                </Flex>
              </Stack>
            </Card>

            {/* Acres */}
            <Card padding={3} radius={2} tone="transparent" border>
              <Stack space={2}>
                <Text size={1} muted>
                  Acres
                </Text>
                <Flex align="center" gap={2}>
                  <TextInput
                    type="number"
                    value={converted.acres.toFixed(4)}
                    onChange={(e) => handleManualUnitChange('acres', e.target.value)}
                    fontSize={2}
                  />
                  <Text size={1} muted>
                    acres
                  </Text>
                </Flex>
              </Stack>
            </Card>

            {/* Hectares */}
            <Card padding={3} radius={2} tone="transparent" border>
              <Stack space={2}>
                <Text size={1} muted>
                  Hectares
                </Text>
                <Flex align="center" gap={2}>
                  <TextInput
                    type="number"
                    value={converted.hectares.toFixed(4)}
                    onChange={(e) => handleManualUnitChange('hectares', e.target.value)}
                    fontSize={2}
                  />
                  <Text size={1} muted>
                    ha
                  </Text>
                </Flex>
              </Stack>
            </Card>

            {/* Gunthas (Maharashtra unit) */}
            <Card padding={3} radius={2} tone="transparent" border>
              <Stack space={2}>
                <Text size={1} muted>
                  Gunthas
                </Text>
                <Flex align="center" gap={2}>
                  <TextInput
                    type="number"
                    value={converted.gunthas.toFixed(2)}
                    onChange={(e) => handleManualUnitChange('gunthas', e.target.value)}
                    fontSize={2}
                  />
                  <Text size={1} muted>
                    gunthas
                  </Text>
                </Flex>
              </Stack>
            </Card>
          </Grid>

          {/* Summary Display */}
          <Card padding={3} radius={2} tone="positive" border>
            <Text size={1} align="center">
              📏 <strong>{formatNumber(converted.squareMeters, 2)}</strong> sq.m ={' '}
              <strong>{formatNumber(converted.squareFeet, 0)}</strong> sq.ft ={' '}
              <strong>{formatNumber(converted.acres, 2)}</strong> acres ={' '}
              <strong>{formatNumber(converted.gunthas, 2)}</strong> gunthas
            </Text>
          </Card>

          {manualEdit && (
            <Card padding={2} radius={2} tone="caution">
              <Text size={1} align="center">
                ⚠️ Manual edit detected - all units recalculated from input
              </Text>
            </Card>
          )}
        </Stack>
      )}

      {!converted && (
        <Card padding={3} radius={2} tone="transparent" border>
          <Text size={1} muted align="center">
            Enter square meters to see conversions
          </Text>
        </Card>
      )}
    </Stack>
  )
}
