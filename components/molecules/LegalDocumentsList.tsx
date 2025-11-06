import type { LegalDocumentation, AvailableDocument } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  formatLandUseStatus,
  formatSurveyNumbers,
  formatDocumentType,
  formatDate,
  getLandUseBadgeColor,
} from '@/lib/formatters'
import {
  FileCheck,
  FileText,
  Shield,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Mail,
} from 'lucide-react'
import Link from 'next/link'

interface LegalDocumentsListProps {
  legalDocumentation: LegalDocumentation
  availableDocuments?: AvailableDocument[]
}

export function LegalDocumentsList({
  legalDocumentation,
  availableDocuments,
}: LegalDocumentsListProps) {
  const badgeColors = getLandUseBadgeColor(legalDocumentation.landUseStatus)

  return (
    <div className="space-y-6">
      {/* Land Use Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Land Use Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Classification</p>
            <Badge className={`${badgeColors.bg} ${badgeColors.text} border ${badgeColors.border}`}>
              {formatLandUseStatus(legalDocumentation.landUseStatus)}
            </Badge>
          </div>

          {legalDocumentation.conversionPotential && (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm font-medium text-amber-900 mb-1 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Conversion Potential
              </p>
              <p className="text-sm text-amber-800">{legalDocumentation.conversionPotential}</p>
            </div>
          )}

          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Survey Numbers</p>
            <p className="text-foreground font-mono text-sm">
              {formatSurveyNumbers(legalDocumentation.surveyNumbers)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* NA Sanction Details */}
      {legalDocumentation.naSanctionDetails &&
        (legalDocumentation.naSanctionDetails.sanctionedBy ||
          legalDocumentation.naSanctionDetails.letterNumber) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5 text-green-600" />
                NA Sanction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {legalDocumentation.naSanctionDetails.sanctionedBy && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Sanctioned By</p>
                    <p className="text-foreground">
                      {legalDocumentation.naSanctionDetails.sanctionedBy}
                    </p>
                  </div>
                )}
                {legalDocumentation.naSanctionDetails.letterNumber && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Letter Number</p>
                    <p className="text-foreground font-mono">
                      {legalDocumentation.naSanctionDetails.letterNumber}
                    </p>
                  </div>
                )}
              </div>
              {legalDocumentation.naSanctionDetails.sanctionDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Sanction Date</p>
                  <p className="text-foreground">
                    {formatDate(legalDocumentation.naSanctionDetails.sanctionDate, {
                      format: 'long',
                    })}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Sanad Details */}
      {legalDocumentation.sanadDetails &&
        (legalDocumentation.sanadDetails.issuedBy || legalDocumentation.sanadDetails.issueDate) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                Sanad Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {legalDocumentation.sanadDetails.issuedBy && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Issued By</p>
                    <p className="text-foreground">{legalDocumentation.sanadDetails.issuedBy}</p>
                  </div>
                )}
                {legalDocumentation.sanadDetails.issueDate && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Issue Date</p>
                    <p className="text-foreground">
                      {formatDate(legalDocumentation.sanadDetails.issueDate, { format: 'long' })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

      {/* RERA Registration */}
      {legalDocumentation.reraRegistered && (
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-blue-900">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />
              RERA Registered
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {legalDocumentation.reraNumber && (
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">RERA Number</p>
                <p className="text-blue-800 font-mono text-lg">{legalDocumentation.reraNumber}</p>
              </div>
            )}
            {legalDocumentation.reraWebsiteUrl && (
              <Button asChild variant="outline" size="sm" className="border-blue-300 text-blue-800">
                <a
                  href={legalDocumentation.reraWebsiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  View on RERA Website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Government Dues Status */}
      {legalDocumentation.governmentDuesClearedStatus !== undefined && (
        <Card>
          <CardContent className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {legalDocumentation.governmentDuesClearedStatus ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600" />
              )}
              <p className="font-medium text-foreground">Government Dues Cleared</p>
            </div>
            <Badge
              variant={legalDocumentation.governmentDuesClearedStatus ? 'default' : 'secondary'}
            >
              {legalDocumentation.governmentDuesClearedStatus ? 'Yes ✓' : 'Pending'}
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Available Documents */}
      {availableDocuments && availableDocuments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-gray-600" />
              Available Documents
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              The following documents are available upon request. Contact us to access them.
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-medium text-foreground">{doc.documentName}</h4>
                      </div>
                      <Badge variant="outline" className="text-xs mb-2">
                        {formatDocumentType(doc.documentType)}
                      </Badge>
                      {doc.description && (
                        <p className="text-sm text-muted-foreground mt-2">{doc.description}</p>
                      )}
                      {doc.issueDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Issued: {formatDate(doc.issueDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Request Documents CTA */}
            <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Need access to these documents?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Contact us to request copies of the documents listed above.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/contact" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Request Documents
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legal Disclaimer */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="py-4">
          <p className="text-xs text-muted-foreground">
            <strong>Legal Note:</strong> All documents and certifications mentioned are subject to
            verification. Please consult with legal advisors before making any investment decisions.
            Document copies will be provided upon request during the purchase process.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
