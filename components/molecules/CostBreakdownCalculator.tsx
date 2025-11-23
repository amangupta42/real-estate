'use client'

import { useState, useEffect } from 'react'
import { Receipt, IndianRupee, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface CostBreakdownCalculatorProps {
  defaultPlotPrice?: number
  isGSTApplicable?: boolean
  className?: string
}

export function CostBreakdownCalculator({
  defaultPlotPrice = 1000000,
  isGSTApplicable = false,
  className = '',
}: CostBreakdownCalculatorProps) {
  const [plotPrice, setPlotPrice] = useState(defaultPlotPrice)
  const [stampDuty, setStampDuty] = useState(0)
  const [registration, setRegistration] = useState(0)
  const [gst, setGst] = useState(0)
  const [legalFees, setLegalFees] = useState(0)
  const [totalCost, setTotalCost] = useState(0)

  // Maharashtra Stamp Duty Rates (as of 2024)
  const STAMP_DUTY_MALE = 0.07 // 7% for males
  const STAMP_DUTY_FEMALE = 0.06 // 6% for females (discounted)
  const REGISTRATION_FEE = 0.01 // 1%
  const GST_RATE = 0.05 // 5% (if applicable on under-construction)
  const LEGAL_FEES_PERCENT = 0.005 // 0.5% estimated

  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [includeGST, setIncludeGST] = useState(isGSTApplicable)

  useEffect(() => {
    calculateCosts()
  }, [plotPrice, gender, includeGST])

  const calculateCosts = () => {
    const stampDutyRate = gender === 'female' ? STAMP_DUTY_FEMALE : STAMP_DUTY_MALE
    const calculatedStampDuty = plotPrice * stampDutyRate
    const calculatedRegistration = plotPrice * REGISTRATION_FEE
    const calculatedGST = includeGST ? plotPrice * GST_RATE : 0
    const calculatedLegalFees = plotPrice * LEGAL_FEES_PERCENT

    setStampDuty(calculatedStampDuty)
    setRegistration(calculatedRegistration)
    setGst(calculatedGST)
    setLegalFees(calculatedLegalFees)

    const total =
      plotPrice + calculatedStampDuty + calculatedRegistration + calculatedGST + calculatedLegalFees
    setTotalCost(total)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const savingsForFemale = plotPrice * (STAMP_DUTY_MALE - STAMP_DUTY_FEMALE)

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Receipt className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">Total Cost Calculator</h3>
      </div>

      <div className="space-y-6">
        {/* Plot Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Plot Price</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="number"
              value={plotPrice}
              onChange={(e) => setPlotPrice(Number(e.target.value))}
              className="pl-10"
              min={100000}
              step={100000}
            />
          </div>
          <input
            type="range"
            min="500000"
            max="10000000"
            step="100000"
            value={plotPrice}
            onChange={(e) => setPlotPrice(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Buyer Gender (affects stamp duty rate)
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 py-2 px-4 rounded-md border transition-colors ${
                gender === 'male'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-foreground border-input hover:bg-muted'
              }`}
            >
              Male (7%)
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 py-2 px-4 rounded-md border transition-colors ${
                gender === 'female'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-foreground border-input hover:bg-muted'
              }`}
            >
              Female (6%)
            </button>
          </div>
          {gender === 'female' && (
            <div className="mt-2 p-2 bg-green-50 text-green-700 rounded text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>You save {formatCurrency(savingsForFemale)} with female ownership!</span>
            </div>
          )}
        </div>

        {/* GST Toggle */}
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeGST}
              onChange={(e) => setIncludeGST(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium">Include GST (5%)</span>
          </label>
          <p className="text-xs text-muted-foreground mt-1 ml-6">
            GST applicable if under construction or development
          </p>
        </div>

        {/* Cost Breakdown */}
        <div className="border-t pt-6 space-y-3">
          <h4 className="font-semibold text-sm">Cost Breakdown</h4>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Plot Price:</span>
              <span className="font-medium">{formatCurrency(plotPrice)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Stamp Duty ({gender === 'female' ? '6' : '7'}%):
              </span>
              <span className="font-medium">{formatCurrency(stampDuty)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Registration Fee (1%):</span>
              <span className="font-medium">{formatCurrency(registration)}</span>
            </div>

            {includeGST && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (5%):</span>
                <span className="font-medium">{formatCurrency(gst)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Legal Fees (Est. 0.5%):</span>
              <span className="font-medium">{formatCurrency(legalFees)}</span>
            </div>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-3xl font-bold text-primary">{formatCurrency(totalCost)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Additional Costs</p>
              <p className="text-lg font-semibold">{formatCurrency(totalCost - plotPrice)}</p>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">% of Plot Price</p>
              <p className="text-lg font-semibold">
                {(((totalCost - plotPrice) / plotPrice) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900 space-y-1">
              <p className="font-medium">Maharashtra Stamp Duty & Registration (2024)</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>Male buyers: 7% stamp duty</li>
                <li>Female buyers: 6% stamp duty (1% discount)</li>
                <li>Registration: 1% of property value</li>
                <li>GST: 5% (applicable on under-construction properties)</li>
                <li>Legal fees are estimates and may vary</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * Calculations are approximate. Please verify current rates with local authorities.
        </p>
      </div>
    </Card>
  )
}
