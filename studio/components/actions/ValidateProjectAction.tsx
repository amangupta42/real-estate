import { useCallback, useState } from 'react'
import { DocumentActionComponent } from 'sanity'
import { CheckmarkCircleIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'

interface ValidationIssue {
  field: string
  message: string
  severity: 'error' | 'warning'
}

export const ValidateProjectAction: DocumentActionComponent = (props) => {
  const { draft, published } = props
  const toast = useToast()
  const [isValidating, setIsValidating] = useState(false)

  const validateProject = useCallback(() => {
    const doc = draft || published
    if (!doc) return []

    const issues: ValidationIssue[] = []

    // Basic Information Validation
    if (!doc.title) {
      issues.push({
        field: 'title',
        message: 'Project title is required',
        severity: 'error',
      })
    }

    if (!doc.slug?.current) {
      issues.push({
        field: 'slug',
        message: 'Project slug is required',
        severity: 'error',
      })
    }

    if (!doc.status) {
      issues.push({
        field: 'status',
        message: 'Project status is required',
        severity: 'error',
      })
    }

    // Location Validation
    if (!doc.indianAddress) {
      issues.push({
        field: 'indianAddress',
        message: 'Indian address is required',
        severity: 'error',
      })
    }

    if (!doc.location) {
      issues.push({
        field: 'location',
        message: 'GPS location is required',
        severity: 'error',
      })
    }

    // Legal Documentation Validation
    if (!doc.legalDocumentation) {
      issues.push({
        field: 'legalDocumentation',
        message: 'Legal documentation is required',
        severity: 'error',
      })
    } else {
      const legal = doc.legalDocumentation

      // RERA validation
      if (legal.reraRegistered && !legal.reraNumber) {
        issues.push({
          field: 'legalDocumentation.reraNumber',
          message: 'RERA number is required when RERA registered',
          severity: 'error',
        })
      }

      // NA Sanction validation
      const naStatuses = [
        'final_na_residential',
        'final_na_commercial',
        'final_na_mixed',
        'na_in_process',
      ]
      if (naStatuses.includes(legal.landUseStatus)) {
        if (!legal.naSanctionNumber) {
          issues.push({
            field: 'legalDocumentation.naSanctionNumber',
            message: 'NA sanction number is required for NA land',
            severity: 'error',
          })
        }
      }
    }

    // Measurements Validation
    if (!doc.totalArea) {
      issues.push({
        field: 'totalArea',
        message: 'Total area is required',
        severity: 'error',
      })
    }

    // Area Breakdown Validation
    if (doc.areaBreakdown && doc.totalArea) {
      const breakdownTotal = doc.areaBreakdown.reduce(
        (sum: number, item: any) => sum + (item.area?.squareMeters || 0),
        0
      )
      const totalArea = doc.totalArea.squareMeters

      const diff = Math.abs(breakdownTotal - totalArea)
      const percentDiff = diff / totalArea

      if (percentDiff > 0.01) {
        issues.push({
          field: 'areaBreakdown',
          message: `Area breakdown (${breakdownTotal.toFixed(2)} sq.m) doesn't match total area (${totalArea.toFixed(2)} sq.m)`,
          severity: 'warning',
        })
      }
    }

    // Media Validation
    if (!doc.heroImage) {
      issues.push({
        field: 'heroImage',
        message: 'Hero image is required',
        severity: 'error',
      })
    }

    // Interactive Layout Validation
    if (doc.interactiveLayoutData && doc.interactiveLayoutData.length > 0) {
      const invalidPlots = doc.interactiveLayoutData.filter(
        (plot: any) =>
          !plot.plotNumber ||
          !plot.status ||
          plot.x === undefined ||
          plot.y === undefined ||
          plot.x < 0 ||
          plot.x > 100 ||
          plot.y < 0 ||
          plot.y > 100
      )

      if (invalidPlots.length > 0) {
        issues.push({
          field: 'interactiveLayoutData',
          message: `${invalidPlots.length} plot(s) have invalid data`,
          severity: 'warning',
        })
      }
    }

    return issues
  }, [draft, published])

  const onHandle = useCallback(() => {
    setIsValidating(true)

    setTimeout(() => {
      const issues = validateProject()

      if (issues.length === 0) {
        toast.push({
          status: 'success',
          title: 'Validation Passed',
          description: '✅ All checks passed! Project is valid.',
        })
      } else {
        const errors = issues.filter((i) => i.severity === 'error')
        const warnings = issues.filter((i) => i.severity === 'warning')

        let description = ''
        if (errors.length > 0) {
          description += `❌ ${errors.length} error(s)\n`
          errors.slice(0, 3).forEach((err) => {
            description += `• ${err.field}: ${err.message}\n`
          })
        }
        if (warnings.length > 0) {
          description += `⚠️ ${warnings.length} warning(s)\n`
          warnings.slice(0, 3).forEach((warn) => {
            description += `• ${warn.field}: ${warn.message}\n`
          })
        }

        toast.push({
          status: errors.length > 0 ? 'error' : 'warning',
          title: 'Validation Issues Found',
          description,
          duration: 8000,
        })

        // Log all issues to console for detailed review
        console.group('🔍 Project Validation Report')
        console.log('Document ID:', draft?._id || published?._id)
        console.log('Total Issues:', issues.length)
        console.table(issues)
        console.groupEnd()
      }

      setIsValidating(false)
    }, 500)
  }, [validateProject, toast])

  // Only show action for project documents
  if (props.type !== 'project') {
    return null
  }

  return {
    label: isValidating ? 'Validating...' : 'Validate Project',
    icon: CheckmarkCircleIcon,
    onHandle,
    disabled: isValidating || (!draft && !published),
    title: 'Run comprehensive validation on this project',
  }
}
