'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IndianRupee, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import {
  loadRazorpayScript,
  formatCurrency,
  formatAmountToPaise,
  type BookingDetails,
  type RazorpayPaymentResponse,
} from '@/lib/razorpay'
import { trackPaymentInitiated, trackPaymentSuccess } from '@/lib/analytics'

const bookingFormSchema = z.object({
  customerName: z.string().min(2, 'Name must be at least 2 characters'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number (10 digits starting with 6-9)'),
  plotNumber: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingFormSchema>

interface RazorpayBookingFormProps {
  projectId: string
  projectName: string
  tokenAmount?: number
  className?: string
}

export function RazorpayBookingForm({
  projectId,
  projectName,
  tokenAmount = 50000,
  className = '',
}: RazorpayBookingFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  })

  const initiatePayment = async (data: BookingFormData) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay. Please check your internet connection.')
      }

      // Create booking details
      const bookingDetails: BookingDetails = {
        projectId,
        projectName,
        plotNumber: data.plotNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        amount: tokenAmount,
        bookingType: 'token',
      }

      // Track payment initiation
      trackPaymentInitiated(projectName, tokenAmount)

      // Create order on backend
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        throw new Error(errorData.error || 'Failed to create order')
      }

      const orderData = await orderResponse.json()

      // Razorpay checkout options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: formatAmountToPaise(tokenAmount),
        currency: 'INR',
        name: 'Ajit J Gupta and Associates',
        description: `Token booking for ${projectName}`,
        image: '/logo.png',
        order_id: orderData.orderId,
        handler: async function (response: RazorpayPaymentResponse) {
          await handlePaymentSuccess(response, bookingDetails)
        },
        prefill: {
          name: data.customerName,
          email: data.customerEmail,
          contact: data.customerPhone,
        },
        notes: {
          project_id: projectId,
          project_name: projectName,
          plot_number: data.plotNumber || 'Not specified',
        },
        theme: {
          color: '#10b981', // Tailwind green-500
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false)
          },
        },
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      console.error('Payment initiation error:', error)
      setErrorMessage(error.message || 'Failed to initiate payment. Please try again.')
      setPaymentStatus('error')
      setIsLoading(false)
    }
  }

  const handlePaymentSuccess = async (
    response: RazorpayPaymentResponse,
    bookingDetails: BookingDetails
  ) => {
    try {
      // Verify payment on backend
      const verifyResponse = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...response,
          bookingDetails,
        }),
      })

      if (!verifyResponse.ok) {
        throw new Error('Payment verification failed')
      }

      const verifyData = await verifyResponse.json()

      if (verifyData.verified) {
        // Track successful payment
        trackPaymentSuccess(
          bookingDetails.projectName,
          bookingDetails.amount,
          response.razorpay_payment_id
        )

        setPaymentStatus('success')
        reset()
      } else {
        throw new Error('Payment verification failed')
      }
    } catch (error: any) {
      console.error('Payment verification error:', error)
      setErrorMessage('Payment verification failed. Please contact support.')
      setPaymentStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  if (paymentStatus === 'success') {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-green-700">Booking Successful!</h3>
          <p className="text-muted-foreground">
            Thank you for your token payment. Our team will contact you shortly with further
            details.
          </p>
          <Button onClick={() => setPaymentStatus('idle')} variant="outline">
            Book Another Plot
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Book Your Plot</h3>
          <p className="text-sm text-muted-foreground">
            Secure your plot with a token amount of {formatCurrency(tokenAmount)}
          </p>
        </div>

        <form onSubmit={handleSubmit(initiatePayment)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Full Name *</label>
            <Input {...register('customerName')} placeholder="Enter your full name" />
            {errors.customerName && (
              <p className="text-sm text-red-500 mt-1">{errors.customerName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              {...register('customerEmail')}
              placeholder="your.email@example.com"
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-500 mt-1">{errors.customerEmail.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number *</label>
            <Input
              type="tel"
              {...register('customerPhone')}
              placeholder="9876543210"
              maxLength={10}
            />
            {errors.customerPhone && (
              <p className="text-sm text-red-500 mt-1">{errors.customerPhone.message}</p>
            )}
          </div>

          {/* Plot Number (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Preferred Plot Number (Optional)
            </label>
            <Input {...register('plotNumber')} placeholder="e.g., A-101" />
          </div>

          {/* Token Amount Display */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Token Amount:</span>
              <div className="flex items-center gap-1 text-xl font-bold text-primary">
                <IndianRupee className="w-5 h-5" />
                <span>{tokenAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {paymentStatus === 'error' && errorMessage && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <IndianRupee className="w-4 h-4 mr-2" />
                Pay Token Amount
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payment powered by Razorpay. Your payment information is safe and encrypted.
          </p>
        </form>
      </div>
    </Card>
  )
}
