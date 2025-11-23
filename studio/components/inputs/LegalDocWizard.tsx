import React, { useState } from 'react'
import { set, unset } from 'sanity'
import {
  Stack,
  Card,
  Flex,
  Text,
  Button,
  TextInput,
  Select,
  Box,
  Grid,
  Badge,
} from '@sanity/ui'
import { ChevronRightIcon, ChevronLeftIcon, CheckmarkIcon } from '@sanity/icons'
import { type ObjectInputProps } from 'sanity'

interface LegalDocumentation {
  landUseStatus?: string
  surveyNumbers?: string[]
  naSanctionNumber?: string
  naSanctionDate?: string
  naSanctionAuthority?: string
  sanadCertificateNumber?: string
  sanadYear?: string
  reraRegistered?: boolean
  reraNumber?: string
  reraRegistrationDate?: string
  reraProjectType?: string
}

const STEPS = [
  {
    id: 'landUse',
    title: 'Land Use Status',
    description: 'Select the current land use classification',
  },
  {
    id: 'survey',
    title: 'Survey Numbers',
    description: 'Enter survey/gat numbers for this property',
  },
  {
    id: 'naSanction',
    title: 'NA Sanction',
    description: 'Non-Agricultural sanction details (if applicable)',
  },
  {
    id: 'sanad',
    title: 'Sanad Certificate',
    description: 'Property ownership certificate details',
  },
  {
    id: 'rera',
    title: 'RERA Registration',
    description: 'Real Estate Regulatory Authority details',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review all information before saving',
  },
]

export function LegalDocWizard(props: ObjectInputProps) {
  const { value, onChange, elementProps } = props
  const legalDoc = (value as LegalDocumentation) || {}

  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<LegalDocumentation>(legalDoc)

  // Update form data
  const updateField = <K extends keyof LegalDocumentation>(
    field: K,
    value: LegalDocumentation[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Save and move to next step
  const handleNext = () => {
    onChange(set(formData))
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Move to previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Check if NA-related fields are needed
  const needsNaSanction = [
    'final_na_residential',
    'final_na_commercial',
    'final_na_mixed',
    'na_in_process',
  ].includes(formData.landUseStatus || '')

  // Progress percentage
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'landUse':
        return (
          <Stack space={4}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Land Use Classification *
              </Text>
              <Select
                value={formData.landUseStatus || ''}
                onChange={(e) => updateField('landUseStatus', e.currentTarget.value)}
              >
                <option value="">Select land use status</option>
                <option value="final_na_residential">
                  Final NA - Residential
                </option>
                <option value="final_na_commercial">
                  Final NA - Commercial
                </option>
                <option value="final_na_mixed">Final NA - Mixed Use</option>
                <option value="na_in_process">NA Conversion in Process</option>
                <option value="agricultural_conversion_potential">
                  Agricultural (Conversion Potential)
                </option>
                <option value="agricultural_no_conversion">
                  Agricultural (No Conversion)
                </option>
              </Select>
            </Stack>

            {formData.landUseStatus && (
              <Card padding={3} radius={2} tone="positive" border>
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    ✓ Land use status selected
                  </Text>
                  <Text size={1}>
                    {needsNaSanction
                      ? 'You will need to provide NA sanction details in the next steps.'
                      : 'NA sanction details are not required for this land use type.'}
                  </Text>
                </Stack>
              </Card>
            )}
          </Stack>
        )

      case 'survey':
        return (
          <Stack space={4}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Survey Numbers (Gat Numbers)
              </Text>
              <Text size={1} muted>
                Enter survey/gat numbers separated by commas (e.g., "123, 124, 125")
              </Text>
              <TextInput
                placeholder="e.g., Gat No. 123, 124, 125"
                value={formData.surveyNumbers?.join(', ') || ''}
                onChange={(e) => {
                  const numbers = e.currentTarget.value
                    .split(',')
                    .map((n) => n.trim())
                    .filter(Boolean)
                  updateField('surveyNumbers', numbers)
                }}
              />
            </Stack>

            {formData.surveyNumbers && formData.surveyNumbers.length > 0 && (
              <Card padding={3} radius={2} tone="transparent" border>
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    Survey Numbers Entered:
                  </Text>
                  <Flex gap={2} wrap="wrap">
                    {formData.surveyNumbers.map((num, idx) => (
                      <Badge key={idx} tone="primary">
                        {num}
                      </Badge>
                    ))}
                  </Flex>
                </Stack>
              </Card>
            )}
          </Stack>
        )

      case 'naSanction':
        if (!needsNaSanction) {
          return (
            <Card padding={4} radius={2} tone="transparent" border>
              <Stack space={2}>
                <Text size={2} weight="semibold" align="center">
                  ✓ NA Sanction Not Required
                </Text>
                <Text size={1} muted align="center">
                  Based on your land use status, NA sanction details are not needed.
                  <br />
                  Click "Next" to continue.
                </Text>
              </Stack>
            </Card>
          )
        }

        return (
          <Stack space={4}>
            <Card padding={3} radius={2} tone="caution" border>
              <Text size={1}>
                <strong>Required:</strong> This property requires NA sanction details based
                on the land use status.
              </Text>
            </Card>

            <Stack space={2}>
              <Text size={1} weight="semibold">
                NA Sanction Number *
              </Text>
              <TextInput
                placeholder="e.g., NA/2024/1234"
                value={formData.naSanctionNumber || ''}
                onChange={(e) => updateField('naSanctionNumber', e.currentTarget.value)}
              />
            </Stack>

            <Stack space={2}>
              <Text size={1} weight="semibold">
                NA Sanction Date *
              </Text>
              <TextInput
                type="date"
                value={formData.naSanctionDate || ''}
                onChange={(e) => updateField('naSanctionDate', e.currentTarget.value)}
              />
            </Stack>

            <Stack space={2}>
              <Text size={1} weight="semibold">
                Sanctioning Authority
              </Text>
              <TextInput
                placeholder="e.g., Nashik Municipal Corporation"
                value={formData.naSanctionAuthority || ''}
                onChange={(e) =>
                  updateField('naSanctionAuthority', e.currentTarget.value)
                }
              />
            </Stack>
          </Stack>
        )

      case 'sanad':
        return (
          <Stack space={4}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Sanad Certificate Number
              </Text>
              <Text size={1} muted>
                Property ownership certificate issued by revenue department
              </Text>
              <TextInput
                placeholder="e.g., SANAD/2020/5678"
                value={formData.sanadCertificateNumber || ''}
                onChange={(e) =>
                  updateField('sanadCertificateNumber', e.currentTarget.value)
                }
              />
            </Stack>

            <Stack space={2}>
              <Text size={1} weight="semibold">
                Sanad Year
              </Text>
              <TextInput
                type="number"
                placeholder="e.g., 2020"
                value={formData.sanadYear || ''}
                onChange={(e) => updateField('sanadYear', e.currentTarget.value)}
              />
            </Stack>
          </Stack>
        )

      case 'rera':
        return (
          <Stack space={4}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                Is this project RERA registered?
              </Text>
              <Flex gap={3}>
                <Button
                  text="Yes"
                  mode={formData.reraRegistered === true ? 'default' : 'ghost'}
                  tone={formData.reraRegistered === true ? 'positive' : 'default'}
                  onClick={() => updateField('reraRegistered', true)}
                />
                <Button
                  text="No"
                  mode={formData.reraRegistered === false ? 'default' : 'ghost'}
                  tone={formData.reraRegistered === false ? 'critical' : 'default'}
                  onClick={() => updateField('reraRegistered', false)}
                />
              </Flex>
            </Stack>

            {formData.reraRegistered && (
              <>
                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    RERA Registration Number *
                  </Text>
                  <TextInput
                    placeholder="e.g., MH12345678901234"
                    value={formData.reraNumber || ''}
                    onChange={(e) => updateField('reraNumber', e.currentTarget.value)}
                  />
                  <Text size={1} muted>
                    Format: State code (2 chars) + Year (4 digits) + Number
                  </Text>
                </Stack>

                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    RERA Registration Date *
                  </Text>
                  <TextInput
                    type="date"
                    value={formData.reraRegistrationDate || ''}
                    onChange={(e) =>
                      updateField('reraRegistrationDate', e.currentTarget.value)
                    }
                  />
                </Stack>

                <Stack space={2}>
                  <Text size={1} weight="semibold">
                    RERA Project Type
                  </Text>
                  <Select
                    value={formData.reraProjectType || ''}
                    onChange={(e) => updateField('reraProjectType', e.currentTarget.value)}
                  >
                    <option value="">Select project type</option>
                    <option value="plotted_development">Plotted Development</option>
                    <option value="building">Building</option>
                    <option value="villa">Villa</option>
                    <option value="mixed">Mixed Development</option>
                  </Select>
                </Stack>
              </>
            )}
          </Stack>
        )

      case 'review':
        return (
          <Stack space={4}>
            <Card padding={3} radius={2} tone="positive" border>
              <Text size={1} weight="semibold" align="center">
                ✓ Review Your Legal Documentation
              </Text>
            </Card>

            <Grid columns={1} gap={3}>
              {/* Land Use Status */}
              <Card padding={3} radius={2} border>
                <Stack space={2}>
                  <Text size={1} muted>
                    Land Use Status
                  </Text>
                  <Text size={2} weight="semibold">
                    {formData.landUseStatus?.replace(/_/g, ' ').toUpperCase() ||
                      'Not provided'}
                  </Text>
                </Stack>
              </Card>

              {/* Survey Numbers */}
              <Card padding={3} radius={2} border>
                <Stack space={2}>
                  <Text size={1} muted>
                    Survey Numbers
                  </Text>
                  {formData.surveyNumbers && formData.surveyNumbers.length > 0 ? (
                    <Flex gap={2} wrap="wrap">
                      {formData.surveyNumbers.map((num, idx) => (
                        <Badge key={idx} tone="primary">
                          {num}
                        </Badge>
                      ))}
                    </Flex>
                  ) : (
                    <Text size={1}>Not provided</Text>
                  )}
                </Stack>
              </Card>

              {/* NA Sanction */}
              {needsNaSanction && (
                <Card padding={3} radius={2} border>
                  <Stack space={2}>
                    <Text size={1} muted>
                      NA Sanction Details
                    </Text>
                    <Grid columns={2} gap={2}>
                      <Box>
                        <Text size={1} muted>
                          Number
                        </Text>
                        <Text size={1} weight="medium">
                          {formData.naSanctionNumber || 'Not provided'}
                        </Text>
                      </Box>
                      <Box>
                        <Text size={1} muted>
                          Date
                        </Text>
                        <Text size={1} weight="medium">
                          {formData.naSanctionDate || 'Not provided'}
                        </Text>
                      </Box>
                    </Grid>
                  </Stack>
                </Card>
              )}

              {/* Sanad Certificate */}
              <Card padding={3} radius={2} border>
                <Stack space={2}>
                  <Text size={1} muted>
                    Sanad Certificate
                  </Text>
                  <Grid columns={2} gap={2}>
                    <Box>
                      <Text size={1} muted>
                        Number
                      </Text>
                      <Text size={1} weight="medium">
                        {formData.sanadCertificateNumber || 'Not provided'}
                      </Text>
                    </Box>
                    <Box>
                      <Text size={1} muted>
                        Year
                      </Text>
                      <Text size={1} weight="medium">
                        {formData.sanadYear || 'Not provided'}
                      </Text>
                    </Box>
                  </Grid>
                </Stack>
              </Card>

              {/* RERA Registration */}
              <Card padding={3} radius={2} border>
                <Stack space={2}>
                  <Text size={1} muted>
                    RERA Registration
                  </Text>
                  {formData.reraRegistered ? (
                    <Grid columns={2} gap={2}>
                      <Box>
                        <Text size={1} muted>
                          RERA Number
                        </Text>
                        <Text size={1} weight="medium">
                          {formData.reraNumber || 'Not provided'}
                        </Text>
                      </Box>
                      <Box>
                        <Text size={1} muted>
                          Registration Date
                        </Text>
                        <Text size={1} weight="medium">
                          {formData.reraRegistrationDate || 'Not provided'}
                        </Text>
                      </Box>
                    </Grid>
                  ) : (
                    <Text size={1}>Not RERA registered</Text>
                  )}
                </Stack>
              </Card>
            </Grid>
          </Stack>
        )

      default:
        return null
    }
  }

  // Validation for current step
  const canProceed = () => {
    switch (STEPS[currentStep].id) {
      case 'landUse':
        return !!formData.landUseStatus
      case 'naSanction':
        if (needsNaSanction) {
          return !!formData.naSanctionNumber && !!formData.naSanctionDate
        }
        return true
      case 'rera':
        if (formData.reraRegistered) {
          return !!formData.reraNumber && !!formData.reraRegistrationDate
        }
        return true
      default:
        return true
    }
  }

  return (
    <Stack space={4} {...elementProps}>
      {/* Progress Bar */}
      <Card padding={3} radius={2} shadow={1}>
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Text size={1} weight="semibold">
              Legal Documentation Wizard
            </Text>
            <Badge tone="primary">
              Step {currentStep + 1} of {STEPS.length}
            </Badge>
          </Flex>

          {/* Progress bar */}
          <Box
            style={{
              height: '6px',
              backgroundColor: '#e0e0e0',
              borderRadius: '3px',
              overflow: 'hidden',
            }}
          >
            <Box
              style={{
                height: '100%',
                width: `${progress}%`,
                backgroundColor: '#2276fc',
                transition: 'width 0.3s ease',
              }}
            />
          </Box>

          {/* Step indicators */}
          <Flex gap={1} wrap="wrap">
            {STEPS.map((step, idx) => (
              <Badge
                key={step.id}
                tone={idx === currentStep ? 'primary' : idx < currentStep ? 'positive' : 'default'}
                mode={idx === currentStep ? 'default' : 'outline'}
              >
                {idx < currentStep && <CheckmarkIcon />} {step.title}
              </Badge>
            ))}
          </Flex>
        </Stack>
      </Card>

      {/* Current Step Content */}
      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Box>
            <Text size={3} weight="bold">
              {STEPS[currentStep].title}
            </Text>
            <Text size={1} muted>
              {STEPS[currentStep].description}
            </Text>
          </Box>

          {renderStepContent()}
        </Stack>
      </Card>

      {/* Navigation */}
      <Card padding={3} radius={2}>
        <Flex gap={3} justify="space-between">
          <Button
            text="Previous"
            icon={ChevronLeftIcon}
            mode="ghost"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          />

          <Flex gap={2}>
            {currentStep === STEPS.length - 1 ? (
              <Button
                text="Save Documentation"
                icon={CheckmarkIcon}
                tone="positive"
                onClick={() => onChange(set(formData))}
              />
            ) : (
              <Button
                text="Next"
                iconRight={ChevronRightIcon}
                tone="primary"
                onClick={handleNext}
                disabled={!canProceed()}
              />
            )}
          </Flex>
        </Flex>
      </Card>
    </Stack>
  )
}
