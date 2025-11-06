'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { InfrastructureDisplay } from '@/components/molecules/InfrastructureDisplay'
import { LegalDocumentsList } from '@/components/molecules/LegalDocumentsList'
import { NearbyLandmarksSection } from '@/components/molecules/NearbyLandmarksSection'
import { GalleryDisplay } from '@/components/molecules/GalleryDisplay'
import { PortableText } from '@portabletext/react'
import type { Project } from '@/types'
import { formatMeasurementDetailed, formatAreaBreakdown, sumMeasurements } from '@/lib/measurements'
import { formatSuitabilityType } from '@/lib/formatters'
import { cn } from '@/lib/utils'

interface ProjectTabsProps {
  project: Pick<
    Project,
    | 'suitabilityDescription'
    | 'suitabilityTypes'
    | 'investmentBenefits'
    | 'developmentRestrictions'
    | 'totalArea'
    | 'areaBreakdown'
    | 'minimumPlotSize'
    | 'expansionOpportunities'
    | 'infrastructure'
    | 'legalDocumentation'
    | 'availableDocuments'
    | 'nearbyLandmarks'
    | 'naturalFeatures'
    | 'vastuFeatures'
    | 'gallery'
    | 'droneVideoUrl'
    | 'virtualTourUrl'
    | 'layoutPlanImage'
  >
}

type TabId = 'overview' | 'measurements' | 'infrastructure' | 'legal' | 'location' | 'gallery'

const tabs: Array<{ id: TabId; label: string }> = [
  { id: 'overview', label: 'Overview' },
  { id: 'measurements', label: 'Measurements' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'legal', label: 'Legal & Docs' },
  { id: 'location', label: 'Location Benefits' },
  { id: 'gallery', label: 'Gallery & Media' },
]

export function ProjectTabs({ project }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const totalPlottedArea = project.areaBreakdown
    ? sumMeasurements(
        project.areaBreakdown.filter((ab) => ab.areaType === 'plotted').map((ab) => ab.area)
      )
    : undefined

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex gap-2 overflow-x-auto pb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Suitability Description */}
            {project.suitabilityDescription && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Property Description</h3>
                  <div className="prose prose-sm max-w-none">
                    <PortableText value={project.suitabilityDescription} />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Suitability Types */}
            {project.suitabilityTypes && project.suitabilityTypes.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Ideal For</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.suitabilityTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {formatSuitabilityType(type)}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Investment Benefits */}
            {project.investmentBenefits && project.investmentBenefits.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Investment Benefits</h3>
                  <ul className="space-y-2">
                    {project.investmentBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Development Restrictions */}
            {project.developmentRestrictions && (
              <Card className="border-amber-200 bg-amber-50/50">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-amber-900">
                    Development Restrictions
                  </h3>
                  <p className="text-sm text-amber-800">{project.developmentRestrictions}</p>
                </CardContent>
              </Card>
            )}

            {/* Expansion Opportunities */}
            {project.expansionOpportunities && project.expansionOpportunities.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Expansion Opportunities</h3>
                  <div className="space-y-4">
                    {project.expansionOpportunities.map((expansion, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg">
                        {expansion.surveyNumber && (
                          <p className="font-medium text-foreground mb-2">
                            Survey No: {expansion.surveyNumber}
                          </p>
                        )}
                        {expansion.description && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {expansion.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 flex-wrap">
                          {expansion.area && (
                            <span className="text-sm font-medium">
                              {formatMeasurementDetailed(expansion.area).squareMeters}
                            </span>
                          )}
                          {expansion.status && (
                            <Badge
                              variant={
                                expansion.status === 'available'
                                  ? 'default'
                                  : expansion.status === 'negotiation'
                                    ? 'secondary'
                                    : 'outline'
                              }
                            >
                              {expansion.status}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Measurements Tab */}
        {activeTab === 'measurements' && (
          <div className="space-y-6">
            {/* Total Area */}
            {project.totalArea && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Total Property Area</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(formatMeasurementDetailed(project.totalArea)).map(
                      ([unit, value]) => (
                        <div key={unit} className="p-4 border border-border rounded-lg text-center">
                          <p className="text-2xl font-bold text-primary mb-1">
                            {value.split(' ')[0]}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {value.split(' ').slice(1).join(' ')}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Area Breakdown */}
            {project.areaBreakdown && project.areaBreakdown.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Area Breakdown</h3>
                  <div className="space-y-3">
                    {project.areaBreakdown.map((breakdown, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-foreground capitalize">
                            {breakdown.areaType?.replace('_', ' ') || 'Area'}
                          </p>
                          {breakdown.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {breakdown.description}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {formatAreaBreakdown(breakdown.area, project.totalArea, {
                              showPercentage: true,
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  {totalPlottedArea && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total Plotted Area</span>
                        <span className="text-primary">
                          {formatAreaBreakdown(totalPlottedArea, project.totalArea, {
                            showPercentage: true,
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Minimum Plot Size */}
            {project.minimumPlotSize && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Minimum Plot Size Available</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(formatMeasurementDetailed(project.minimumPlotSize)).map(
                      ([unit, value]) => (
                        <div
                          key={unit}
                          className="p-3 border border-border rounded-lg text-center bg-muted/30"
                        >
                          <p className="text-lg font-semibold text-foreground mb-1">
                            {value.split(' ')[0]}
                          </p>
                          <p className="text-xs text-muted-foreground uppercase">
                            {value.split(' ').slice(1).join(' ')}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Infrastructure Tab */}
        {activeTab === 'infrastructure' && (
          <InfrastructureDisplay infrastructure={project.infrastructure} />
        )}

        {/* Legal & Documentation Tab */}
        {activeTab === 'legal' && (
          <LegalDocumentsList
            legalDocumentation={project.legalDocumentation}
            availableDocuments={project.availableDocuments}
          />
        )}

        {/* Location Benefits Tab */}
        {activeTab === 'location' && (
          <NearbyLandmarksSection
            landmarks={project.nearbyLandmarks}
            naturalFeatures={project.naturalFeatures}
            vastuFeatures={project.vastuFeatures}
          />
        )}

        {/* Gallery & Media Tab */}
        {activeTab === 'gallery' && (
          <GalleryDisplay
            gallery={project.gallery}
            droneVideoUrl={project.droneVideoUrl}
            virtualTourUrl={project.virtualTourUrl}
            layoutPlanImage={project.layoutPlanImage}
          />
        )}
      </div>
    </div>
  )
}
