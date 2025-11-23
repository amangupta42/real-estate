import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { formatAmountToPaise, generateReceiptId, type BookingDetails } from '@/lib/razorpay'

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(request: NextRequest) {
  try {
    const bookingDetails: BookingDetails = await request.json()

    // Validate required fields
    if (
      !bookingDetails.projectId ||
      !bookingDetails.projectName ||
      !bookingDetails.customerName ||
      !bookingDetails.customerEmail ||
      !bookingDetails.customerPhone ||
      !bookingDetails.amount
    ) {
      return NextResponse.json({ error: 'Missing required booking details' }, { status: 400 })
    }

    // Create Razorpay order
    const options = {
      amount: formatAmountToPaise(bookingDetails.amount),
      currency: 'INR',
      receipt: generateReceiptId(),
      notes: {
        project_id: bookingDetails.projectId,
        project_name: bookingDetails.projectName,
        customer_name: bookingDetails.customerName,
        customer_email: bookingDetails.customerEmail,
        customer_phone: bookingDetails.customerPhone,
        plot_number: bookingDetails.plotNumber || 'Not specified',
        booking_type: bookingDetails.bookingType,
      },
    }

    const order = await razorpay.orders.create(options)

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    })
  } catch (error: any) {
    console.error('Create order error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 })
  }
}
