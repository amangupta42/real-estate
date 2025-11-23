// Razorpay utility functions and types

export interface RazorpayOrderOptions {
  amount: number // in paise (smallest currency unit)
  currency: string
  receipt: string
  notes?: Record<string, string>
}

export interface BookingDetails {
  projectId: string
  projectName: string
  plotNumber?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  amount: number // in rupees
  bookingType: 'token' | 'full' | 'partial'
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

// Format amount to paise (Razorpay requires amount in smallest currency unit)
export const formatAmountToPaise = (amountInRupees: number): number => {
  return Math.round(amountInRupees * 100)
}

// Format amount to rupees
export const formatAmountToRupees = (amountInPaise: number): number => {
  return amountInPaise / 100
}

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// Generate unique receipt ID
export const generateReceiptId = (prefix: string = 'AJGA'): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}_${timestamp}_${random}`
}

// Razorpay checkout options
export interface RazorpayCheckoutOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id: string
  handler: (response: RazorpayPaymentResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: Record<string, string>
  theme: {
    color: string
  }
  modal: {
    ondismiss: () => void
  }
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false)
      return
    }

    // Check if script already loaded
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.body.appendChild(script)
  })
}

// Razorpay window interface
declare global {
  interface Window {
    Razorpay: any
  }
}
