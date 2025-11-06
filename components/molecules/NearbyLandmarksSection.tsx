import type { NearbyLandmark, VastuFeatures } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatLandmarkCategory, formatDistance, getLandmarkIcon } from '@/lib/formatters'
import { MapPin, Star, Info } from 'lucide-react'

interface NearbyLandmarksSectionProps {
  landmarks?: NearbyLandmark[]
  naturalFeatures?: string[]
  vastuFeatures?: VastuFeatures
}

export function NearbyLandmarksSection({
  landmarks,
  naturalFeatures,
  vastuFeatures,
}: NearbyLandmarksSectionProps) {
  const hasContent =
    (landmarks && landmarks.length > 0) ||
    (naturalFeatures && naturalFeatures.length > 0) ||
    vastuFeatures

  if (!hasContent) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Location benefits information not available
        </CardContent>
      </Card>
    )
  }

  // Group landmarks by category
  const groupedLandmarks = landmarks?.reduce(
    (acc, landmark) => {
      const category = landmark.category
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(landmark)
      return acc
    },
    {} as Record<string, NearbyLandmark[]>
  )

  // Separate high significance landmarks
  const highSignificanceLandmarks = landmarks?.filter((l) => l.significance === 'high')

  return (
    <div className="space-y-6">
      {/* Key Landmarks (High Significance) */}
      {highSignificanceLandmarks && highSignificanceLandmarks.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-primary" />
              Key Landmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {highSignificanceLandmarks.map((landmark, index) => (
                <div key={index} className="p-3 rounded-lg bg-background border border-primary/20">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">
                      {getLandmarkIcon(landmark.category)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">{landmark.name}</h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {formatLandmarkCategory(landmark.category)}
                        </Badge>
                        <span className="text-sm font-medium text-primary">
                          {formatDistance(landmark.distance)}
                        </span>
                      </div>
                      {landmark.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {landmark.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Landmarks by Category */}
      {groupedLandmarks && Object.keys(groupedLandmarks).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              Nearby Landmarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(groupedLandmarks).map(([category, categoryLandmarks]) => (
                <div key={category}>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <span className="text-lg">{getLandmarkIcon(category as any)}</span>
                    {formatLandmarkCategory(category as any)}
                  </h4>
                  <div className="space-y-2 pl-7">
                    {categoryLandmarks.map((landmark, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between gap-4 pb-2 border-b last:border-0"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{landmark.name}</p>
                          {landmark.description && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {landmark.description}
                            </p>
                          )}
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="text-sm font-medium text-primary">
                            {formatDistance(landmark.distance)}
                          </p>
                          {landmark.significance && landmark.significance !== 'medium' && (
                            <Badge variant="outline" className="text-xs mt-1">
                              {landmark.significance === 'high' ? '⭐ Key' : 'Reference'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Natural Features */}
      {naturalFeatures && naturalFeatures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">🌳 Natural Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {naturalFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <span className="text-lg">🌿</span>
                  <p className="text-sm text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Vastu Features */}
      {vastuFeatures && (
        <Card className="bg-amber-50/50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-amber-900">
              🕉️ Vastu & Cultural Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {vastuFeatures.vastuCompliant !== undefined && (
              <div className="flex items-center gap-2">
                <Badge
                  variant={vastuFeatures.vastuCompliant ? 'default' : 'secondary'}
                  className={vastuFeatures.vastuCompliant ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {vastuFeatures.vastuCompliant ? '✓ Vastu Compliant' : 'Not Vastu Compliant'}
                </Badge>
              </div>
            )}

            {vastuFeatures.directionFeatures && vastuFeatures.directionFeatures.length > 0 && (
              <div>
                <p className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Direction-Based Features
                </p>
                <div className="space-y-2">
                  {vastuFeatures.directionFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm text-amber-800">
                      <span className="text-amber-600">•</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Location Benefits Summary */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-semibold text-sm mb-3">Location Benefits Summary</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="text-2xl mb-1">📍</div>
              <p className="text-2xl font-bold text-foreground mb-1">{landmarks?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Nearby Landmarks</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="text-2xl mb-1">🌿</div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {naturalFeatures?.length || 0}
              </p>
              <p className="text-xs text-muted-foreground">Natural Features</p>
            </div>
            <div className="p-3 rounded-lg bg-background border border-border">
              <div className="text-2xl mb-1">⭐</div>
              <p className="text-2xl font-bold text-foreground mb-1">
                {highSignificanceLandmarks?.length || 0}
              </p>
              <p className="text-xs text-muted-foreground">Key Attractions</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
