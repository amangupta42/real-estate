import type { InfrastructureDetails } from '@/types'
import { formatConnectionStatus, getUtilityIcon } from '@/lib/formatters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Droplets, Zap, Car, Wrench } from 'lucide-react'

interface InfrastructureDisplayProps {
  infrastructure?: InfrastructureDetails
}

export function InfrastructureDisplay({ infrastructure }: InfrastructureDisplayProps) {
  if (!infrastructure) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Infrastructure details not available
        </CardContent>
      </Card>
    )
  }

  const { waterSupply, electricity, roadAccess, otherUtilities } = infrastructure

  return (
    <div className="space-y-6">
      {/* Water Supply */}
      {waterSupply && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Droplets className="h-5 w-5 text-blue-600" />
              Water Supply
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {waterSupply.source && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Source</p>
                  <p className="text-foreground">{waterSupply.source}</p>
                </div>
              )}
              {waterSupply.pipeSize && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pipeline Size</p>
                  <p className="text-foreground">{waterSupply.pipeSize}</p>
                </div>
              )}
            </div>
            {waterSupply.connectionStatus && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                <Badge
                  className={`${formatConnectionStatus(waterSupply.connectionStatus).color} bg-transparent border`}
                >
                  {formatConnectionStatus(waterSupply.connectionStatus).label}
                </Badge>
              </div>
            )}
            {waterSupply.additionalDetails && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Additional Details</p>
                <p className="text-sm text-foreground">{waterSupply.additionalDetails}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Electricity */}
      {electricity && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-yellow-600" />
              Electricity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {electricity.connectionStatus && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Connection Status</p>
                <Badge
                  className={`${formatConnectionStatus(electricity.connectionStatus).color} bg-transparent border`}
                >
                  {formatConnectionStatus(electricity.connectionStatus).label}
                </Badge>
              </div>
            )}
            {electricity.transformerDetails && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Transformer Details
                </p>
                <p className="text-sm text-foreground">{electricity.transformerDetails}</p>
              </div>
            )}
            {electricity.chargesPaid !== undefined && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">All Charges Paid</p>
                <Badge variant={electricity.chargesPaid ? 'default' : 'secondary'}>
                  {electricity.chargesPaid ? 'Yes ✓' : 'No'}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Road Access */}
      {roadAccess && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Car className="h-5 w-5 text-gray-600" />
              Road Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {roadAccess.mainRoadAccess !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Main Road Access</p>
                  <Badge variant={roadAccess.mainRoadAccess ? 'default' : 'secondary'}>
                    {roadAccess.mainRoadAccess ? 'Yes ✓' : 'No'}
                  </Badge>
                </div>
              )}
              {roadAccess.internalRoads !== undefined && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Internal Roads</p>
                  <Badge variant={roadAccess.internalRoads ? 'default' : 'secondary'}>
                    {roadAccess.internalRoads ? 'Yes ✓' : 'No'}
                  </Badge>
                </div>
              )}
              {roadAccess.roadType && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Road Type</p>
                  <p className="text-foreground capitalize">
                    {roadAccess.roadType.replace('_', ' ')}
                  </p>
                </div>
              )}
              {roadAccess.roadWidth && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Road Width</p>
                  <p className="text-foreground">{roadAccess.roadWidth}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Other Utilities */}
      {otherUtilities && otherUtilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Wrench className="h-5 w-5 text-gray-600" />
              Other Utilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {otherUtilities.map((utility, index) => (
                <div
                  key={index}
                  className="flex items-start justify-between pb-4 border-b last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {utility.utilityType && getUtilityIcon(utility.utilityType as any)}
                      </span>
                      <p className="font-medium text-foreground capitalize">
                        {utility.utilityType?.replace('_', ' ') || 'Utility'}
                      </p>
                    </div>
                    {utility.description && (
                      <p className="text-sm text-muted-foreground">{utility.description}</p>
                    )}
                  </div>
                  {utility.status && (
                    <Badge
                      className={`${formatConnectionStatus(utility.status).color} bg-transparent border ml-4`}
                    >
                      {formatConnectionStatus(utility.status).label}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Infrastructure Summary */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-sm mb-3">Infrastructure Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl mb-1">{getUtilityIcon('water')}</div>
              <p className="text-xs text-muted-foreground">
                {waterSupply?.connectionStatus
                  ? formatConnectionStatus(waterSupply.connectionStatus).label
                  : 'N/A'}
              </p>
            </div>
            <div>
              <div className="text-2xl mb-1">{getUtilityIcon('electricity')}</div>
              <p className="text-xs text-muted-foreground">
                {electricity?.connectionStatus
                  ? formatConnectionStatus(electricity.connectionStatus).label
                  : 'N/A'}
              </p>
            </div>
            <div>
              <div className="text-2xl mb-1">{getUtilityIcon('road')}</div>
              <p className="text-xs text-muted-foreground">
                {roadAccess?.mainRoadAccess ? 'Connected' : 'N/A'}
              </p>
            </div>
            <div>
              <div className="text-2xl mb-1">🔧</div>
              <p className="text-xs text-muted-foreground">
                {otherUtilities && otherUtilities.length > 0
                  ? `${otherUtilities.length} Utilities`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
