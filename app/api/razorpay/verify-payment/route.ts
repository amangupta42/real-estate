import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { Resend } from 'resend'
import type { RazorpayPaymentResponse, BookingDetails } from '@/lib/razorpay'
import { formatCurrency } from '@/lib/razorpay'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } =
      body as RazorpayPaymentResponse & { bookingDetails: BookingDetails }

    // Verify payment signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    const isValid = generatedSignature === razorpay_signature

    if (!isValid) {
      return NextResponse.json(
        { verified: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Payment verified successfully
    // Send confirmation emails
    try {
      // Email to admin
      await resend.emails.send({
        from: 'Bookings <bookings@ajitjgupta.com>',
        to: process.env.CONTACT_EMAIL || 'info@ajitjgupta.com',
        subject: `New Plot Booking - ${bookingDetails.projectName}`,
        html: `
          <h2>New Plot Booking Received</h2>
          <h3>Booking Details:</h3>
          <ul>
            <li><strong>Project:</strong> ${bookingDetails.projectName}</li>
            <li><strong>Plot Number:</strong> ${bookingDetails.plotNumber || 'Not specified'}</li>
            <li><strong>Amount Paid:</strong> ${formatCurrency(bookingDetails.amount)}</li>
            <li><strong>Booking Type:</strong> ${bookingDetails.bookingType}</li>
          </ul>
          <h3>Customer Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${bookingDetails.customerName}</li>
            <li><strong>Email:</strong> ${bookingDetails.customerEmail}</li>
            <li><strong>Phone:</strong> ${bookingDetails.customerPhone}</li>
          </ul>
          <h3>Payment Details:</h3>
          <ul>
            <li><strong>Payment ID:</strong> ${razorpay_payment_id}</li>
            <li><strong>Order ID:</strong> ${razorpay_order_id}</li>
          </ul>
        `,
      })

      // Email to customer
      await resend.emails.send({
        from: 'Ajit J Gupta and Associates <bookings@ajitjgupta.com>',
        to: bookingDetails.customerEmail,
        subject: 'Booking Confirmation - Ajit J Gupta and Associates',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #10b981;">Thank You for Your Booking!</h2>

            <p>Dear ${bookingDetails.customerName},</p>

            <p>We have successfully received your token payment for ${bookingDetails.projectName}. Your plot is now reserved.</p>

            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Booking Summary:</h3>
              <table style="width: 100%;">
                <tr>
                  <td><strong>Project:</strong></td>
                  <td>${bookingDetails.projectName}</td>
                </tr>
                ${
                  bookingDetails.plotNumber
                    ? `
                <tr>
                  <td><strong>Plot Number:</strong></td>
                  <td>${bookingDetails.plotNumber}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                  <td><strong>Amount Paid:</strong></td>
                  <td>${formatCurrency(bookingDetails.amount)}</td>
                </tr>
                <tr>
                  <td><strong>Payment ID:</strong></td>
                  <td>${razorpay_payment_id}</td>
                </tr>
              </table>
            </div>

            <h3>Next Steps:</h3>
            <ol>
              <li>Our sales team will contact you within 24 hours</li>
              <li>We'll schedule a site visit at your convenience</li>
              <li>Complete documentation and payment process will be explained</li>
            </ol>

            <p>If you have any questions, feel free to contact us:</p>
            <p>
              📞 Phone: +91 98765 43210<br>
              📧 Email: info@ajitjgupta.com<br>
              🌐 Website: https://ajitjgupta.com
            </p>

            <p style="margin-top: 30px;">Best regards,<br><strong>Ajit J Gupta and Associates</strong></p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="font-size: 12px; color: #6b7280;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the payment verification if email fails
    }

    // TODO: Save booking to database if you have one
    // await saveBookingToDatabase({ ...bookingDetails, paymentId: razorpay_payment_id });

    return NextResponse.json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    })
  } catch (error: any) {
    console.error('Payment verification error:', error)
    return NextResponse.json(
      { verified: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    )
  }
}
