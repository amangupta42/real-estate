'use client'

import { useState, useEffect } from 'react'
import { Calculator, IndianRupee } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface EMICalculatorProps {
  defaultPlotPrice?: number
  className?: string
}

export function EMICalculator({ defaultPlotPrice = 1000000, className = '' }: EMICalculatorProps) {
  const [plotPrice, setPlotPrice] = useState(defaultPlotPrice)
  const [downPayment, setDownPayment] = useState(20) // percentage
  const [interestRate, setInterestRate] = useState(8.5) // annual percentage
  const [tenure, setTenure] = useState(10) // years
  const [emi, setEmi] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    calculateEMI()
  }, [plotPrice, downPayment, interestRate, tenure])

  const calculateEMI = () => {
    const principal = plotPrice - (plotPrice * downPayment) / 100
    const monthlyRate = interestRate / 12 / 100
    const months = tenure * 12

    if (monthlyRate === 0) {
      const calculatedEmi = principal / months
      setEmi(calculatedEmi)
      setTotalAmount(principal)
      setTotalInterest(0)
      return
    }

    const calculatedEmi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)

    const total = calculatedEmi * months
    const interest = total - principal

    setEmi(calculatedEmi)
    setTotalAmount(total)
    setTotalInterest(interest)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const downPaymentAmount = (plotPrice * downPayment) / 100
  const loanAmount = plotPrice - downPaymentAmount

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold">EMI Calculator</h3>
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

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium mb-2">Down Payment ({downPayment}%)</label>
          <Input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            min={0}
            max={100}
            step={5}
          />
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full mt-2"
          />
          <p className="text-sm text-muted-foreground mt-1">{formatCurrency(downPaymentAmount)}</p>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Interest Rate ({interestRate}% p.a.)
          </label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={1}
            max={20}
            step={0.1}
          />
          <input
            type="range"
            min="6"
            max="15"
            step="0.5"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Tenure */}
        <div>
          <label className="block text-sm font-medium mb-2">Loan Tenure ({tenure} years)</label>
          <Input
            type="number"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            min={1}
            max={30}
            step={1}
          />
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Results */}
        <div className="border-t pt-6 space-y-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Monthly EMI</p>
            <p className="text-3xl font-bold text-primary">{formatCurrency(emi)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
              <p className="text-lg font-semibold">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-lg font-semibold">{formatCurrency(totalInterest)}</p>
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">
              Total Payment (Principal + Interest)
            </p>
            <p className="text-xl font-semibold">{formatCurrency(totalAmount)}</p>
          </div>

          {/* Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plot Price:</span>
              <span className="font-medium">{formatCurrency(plotPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Down Payment ({downPayment}%):</span>
              <span className="font-medium">{formatCurrency(downPaymentAmount)}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-muted-foreground">Loan Required:</span>
              <span className="font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          * EMI calculations are approximate. Actual rates may vary based on bank policies.
        </p>
      </div>
    </Card>
  )
}
