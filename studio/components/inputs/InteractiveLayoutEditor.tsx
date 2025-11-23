import React, { useState, useRef, useCallback, useEffect } from 'react'
import { set, unset, insert, PatchEvent } from 'sanity'
import {
  Stack,
  Card,
  Flex,
  Text,
  Button,
  TextInput,
  Box,
  Grid,
  Dialog,
  Select,
} from '@sanity/ui'
import { AddIcon, TrashIcon, EditIcon } from '@sanity/icons'
import { type ArrayOfObjectsInputProps } from 'sanity'
import { getStatusColor } from '../../lib/helpers'

interface Plot {
  _key?: string
  plotNumber: string
  size?: string
  status: 'Available' | 'Sold' | 'Reserved'
  price?: string
  x: number
  y: number
}

export function InteractiveLayoutEditor(props: ArrayOfObjectsInputProps) {
  const { value, onChange, schemaType, elementProps } = props
  const plots = (value as Plot[]) || []

  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedPlot, setDraggedPlot] = useState<Plot | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)

  // New plot form state
  const [newPlot, setNewPlot] = useState<Partial<Plot>>({
    plotNumber: '',
    size: '',
    status: 'Available',
    x: 50,
    y: 50,
  })

  const canvasRef = useRef<HTMLDivElement>(null)

  // Handle canvas click to add plot
  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || event.target !== event.currentTarget) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setNewPlot((prev) => ({ ...prev, x, y }))
    setShowAddDialog(true)
  }

  // Handle plot drag start
  const handlePlotDragStart = (plot: Plot) => {
    setDraggedPlot(plot)
    setIsDragging(true)
  }

  // Handle plot drag
  const handlePlotDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedPlot || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100))

    // Update the plot position
    const updatedPlots = plots.map((p) =>
      p._key === draggedPlot._key ? { ...p, x, y } : p
    )
    onChange(PatchEvent.from(set(updatedPlots)))
  }

  // Handle plot drag end
  const handlePlotDragEnd = () => {
    setIsDragging(false)
    setDraggedPlot(null)
  }

  // Add new plot
  const handleAddPlot = () => {
    if (!newPlot.plotNumber || !newPlot.status) return

    const plot: Plot = {
      _key: `plot-${Date.now()}`,
      plotNumber: newPlot.plotNumber,
      size: newPlot.size || '',
      status: newPlot.status as 'Available' | 'Sold' | 'Reserved',
      x: newPlot.x || 50,
      y: newPlot.y || 50,
    }

    onChange(PatchEvent.from(insert([plot], 'after', -1)))
    setShowAddDialog(false)
    setNewPlot({
      plotNumber: '',
      size: '',
      status: 'Available',
      x: 50,
      y: 50,
    })
  }

  // Update plot
  const handleUpdatePlot = () => {
    if (!selectedPlot) return

    const updatedPlots = plots.map((p) =>
      p._key === selectedPlot._key ? selectedPlot : p
    )
    onChange(PatchEvent.from(set(updatedPlots)))
    setShowEditDialog(false)
    setSelectedPlot(null)
  }

  // Delete plot
  const handleDeletePlot = (plotKey: string) => {
    const updatedPlots = plots.filter((p) => p._key !== plotKey)
    onChange(PatchEvent.from(set(updatedPlots)))
    setSelectedPlot(null)
  }

  // Plot click handler
  const handlePlotClick = (plot: Plot, event: React.MouseEvent) => {
    event.stopPropagation()
    setSelectedPlot(plot)
  }

  return (
    <Stack space={4} {...elementProps}>
      {/* Toolbar */}
      <Card padding={3} radius={2} shadow={1}>
        <Flex gap={3} align="center" justify="space-between">
          <Text size={2} weight="semibold">
            Interactive Layout Editor
          </Text>
          <Flex gap={2}>
            <Button
              text="Add Plot"
              icon={AddIcon}
              tone="positive"
              onClick={() => setShowAddDialog(true)}
            />
            <Text size={1} muted>
              {plots.length} plot{plots.length !== 1 ? 's' : ''}
            </Text>
          </Flex>
        </Flex>
      </Card>

      {/* Canvas - Interactive Layout */}
      <Card padding={0} radius={2} shadow={1} style={{ overflow: 'hidden' }}>
        <div
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handlePlotDrag}
          onMouseUp={handlePlotDragEnd}
          onMouseLeave={handlePlotDragEnd}
          style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            backgroundColor: '#f0f0f0',
            backgroundImage:
              'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            cursor: isDragging ? 'grabbing' : 'crosshair',
          }}
        >
          {/* Info overlay */}
          {plots.length === 0 && (
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <Text size={2} muted>
                Click anywhere to add a plot
                <br />
                or use the "Add Plot" button
              </Text>
            </Box>
          )}

          {/* Render plots */}
          {plots.map((plot) => {
            const isSelected = selectedPlot?._key === plot._key
            const statusColor = getStatusColor(plot.status)

            return (
              <div
                key={plot._key}
                onClick={(e) => handlePlotClick(plot, e)}
                onMouseDown={() => handlePlotDragStart(plot)}
                style={{
                  position: 'absolute',
                  left: `${plot.x}%`,
                  top: `${plot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'grab',
                  zIndex: isSelected ? 1000 : 1,
                }}
              >
                <div
                  style={{
                    backgroundColor: statusColor,
                    border: isSelected ? '3px solid #2276fc' : '2px solid white',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: isSelected
                      ? '0 4px 12px rgba(0,0,0,0.3)'
                      : '0 2px 6px rgba(0,0,0,0.2)',
                    minWidth: '80px',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px',
                    }}
                  >
                    Plot {plot.plotNumber}
                  </div>
                  {plot.size && (
                    <div
                      style={{
                        color: 'white',
                        fontSize: '11px',
                        marginTop: '2px',
                      }}
                    >
                      {plot.size}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Selected Plot Info */}
      {selectedPlot && (
        <Card padding={3} radius={2} tone="primary" shadow={1}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={2} weight="semibold">
                Plot {selectedPlot.plotNumber}
              </Text>
              <Flex gap={2}>
                <Button
                  text="Edit"
                  icon={EditIcon}
                  mode="ghost"
                  onClick={() => setShowEditDialog(true)}
                />
                <Button
                  text="Delete"
                  icon={TrashIcon}
                  mode="ghost"
                  tone="critical"
                  onClick={() => handleDeletePlot(selectedPlot._key!)}
                />
              </Flex>
            </Flex>

            <Grid columns={3} gap={3}>
              <Box>
                <Text size={1} muted>
                  Size
                </Text>
                <Text size={2} weight="medium">
                  {selectedPlot.size || 'Not specified'}
                </Text>
              </Box>
              <Box>
                <Text size={1} muted>
                  Status
                </Text>
                <Text size={2} weight="medium">
                  {selectedPlot.status}
                </Text>
              </Box>
              <Box>
                <Text size={1} muted>
                  Position
                </Text>
                <Text size={2} weight="medium">
                  {selectedPlot.x.toFixed(1)}%, {selectedPlot.y.toFixed(1)}%
                </Text>
              </Box>
            </Grid>
          </Stack>
        </Card>
      )}

      {/* Plot List */}
      <Card padding={3} radius={2}>
        <Stack space={3}>
          <Text size={1} weight="semibold">
            All Plots ({plots.length})
          </Text>
          {plots.length === 0 ? (
            <Text size={1} muted>
              No plots added yet
            </Text>
          ) : (
            <Grid columns={3} gap={2}>
              {plots.map((plot) => {
                const statusColor = getStatusColor(plot.status)
                return (
                  <Card
                    key={plot._key}
                    padding={2}
                    radius={2}
                    tone="transparent"
                    border
                    style={{
                      borderLeft: `4px solid ${statusColor}`,
                      cursor: 'pointer',
                    }}
                    onClick={(e) => handlePlotClick(plot, e as any)}
                  >
                    <Text size={1} weight="semibold">
                      Plot {plot.plotNumber}
                    </Text>
                    <Text size={1} muted>
                      {plot.status} • {plot.size || 'No size'}
                    </Text>
                  </Card>
                )
              })}
            </Grid>
          )}
        </Stack>
      </Card>

      {/* Add Plot Dialog */}
      {showAddDialog && (
        <Dialog
          header="Add New Plot"
          id="add-plot-dialog"
          onClose={() => setShowAddDialog(false)}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Plot Number *
                </Text>
                <TextInput
                  placeholder="e.g., 1, A1, P-101"
                  value={newPlot.plotNumber}
                  onChange={(e) =>
                    setNewPlot({ ...newPlot, plotNumber: e.currentTarget.value })
                  }
                />
              </Stack>

              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Size
                </Text>
                <TextInput
                  placeholder="e.g., 1200 sq.ft, 500 sq.m"
                  value={newPlot.size}
                  onChange={(e) =>
                    setNewPlot({ ...newPlot, size: e.currentTarget.value })
                  }
                />
              </Stack>

              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Status *
                </Text>
                <Select
                  value={newPlot.status}
                  onChange={(e) =>
                    setNewPlot({
                      ...newPlot,
                      status: e.currentTarget.value as 'Available' | 'Sold' | 'Reserved',
                    })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </Select>
              </Stack>

              <Flex gap={2} justify="flex-end">
                <Button text="Cancel" mode="ghost" onClick={() => setShowAddDialog(false)} />
                <Button
                  text="Add Plot"
                  tone="positive"
                  onClick={handleAddPlot}
                  disabled={!newPlot.plotNumber || !newPlot.status}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}

      {/* Edit Plot Dialog */}
      {showEditDialog && selectedPlot && (
        <Dialog
          header="Edit Plot"
          id="edit-plot-dialog"
          onClose={() => setShowEditDialog(false)}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Plot Number *
                </Text>
                <TextInput
                  value={selectedPlot.plotNumber}
                  onChange={(e) =>
                    setSelectedPlot({ ...selectedPlot, plotNumber: e.currentTarget.value })
                  }
                />
              </Stack>

              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Size
                </Text>
                <TextInput
                  placeholder="e.g., 1200 sq.ft, 500 sq.m"
                  value={selectedPlot.size || ''}
                  onChange={(e) =>
                    setSelectedPlot({ ...selectedPlot, size: e.currentTarget.value })
                  }
                />
              </Stack>

              <Stack space={2}>
                <Text size={1} weight="semibold">
                  Status *
                </Text>
                <Select
                  value={selectedPlot.status}
                  onChange={(e) =>
                    setSelectedPlot({
                      ...selectedPlot,
                      status: e.currentTarget.value as 'Available' | 'Sold' | 'Reserved',
                    })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </Select>
              </Stack>

              <Flex gap={2} justify="flex-end">
                <Button
                  text="Cancel"
                  mode="ghost"
                  onClick={() => setShowEditDialog(false)}
                />
                <Button
                  text="Update Plot"
                  tone="positive"
                  onClick={handleUpdatePlot}
                  disabled={!selectedPlot.plotNumber || !selectedPlot.status}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}

      {/* Instructions */}
      <Card padding={3} radius={2} tone="transparent" border>
        <Stack space={2}>
          <Text size={1} weight="semibold">
            💡 Instructions
          </Text>
          <Text size={1} muted>
            • Click anywhere on the canvas to add a new plot
            <br />
            • Drag plots to reposition them
            <br />
            • Click on a plot to view details and edit
            <br />• Color coding: Green = Available, Red = Sold, Yellow = Reserved
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
