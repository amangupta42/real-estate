import { NextResponse } from 'next/server'
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  projectName: z.string(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = inquirySchema.parse(body)

    console.log('Project inquiry submission:', validatedData)

    // Send email using Resend
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
      // Send notification to company
      const companyEmailResponse = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain or replace with your verified domain
        to: 'amanagupta404@gmail.com',
        replyTo: validatedData.email,
        subject: `Project Inquiry: ${validatedData.projectName}`,
        html: `
          <h2>New Project Inquiry</h2>
          <p><strong>Project:</strong> ${validatedData.projectName}</p>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      })

      console.log('✅ Company notification sent:', companyEmailResponse)

      // Send confirmation email to customer
      const customerEmailResponse = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain or replace with your verified domain
        to: validatedData.email,
        subject: `Thank you for your interest in ${validatedData.projectName}`,
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Dear ${validatedData.name},</p>
          <p>We have received your inquiry about ${validatedData.projectName}. Our team will get back to you within 24 hours.</p>
          <p>Best regards,<br>Ajit J Gupta and Associates</p>
        `,
      })

      console.log('✅ Customer confirmation sent:', customerEmailResponse)

      return NextResponse.json(
        {
          message: 'Inquiry submitted successfully',
          emailIds: {
            company: companyEmailResponse.data?.id,
            customer: customerEmailResponse.data?.id,
          },
        },
        { status: 200 }
      )
    } catch (emailError: any) {
      console.error('❌ Resend email error:', {
        message: emailError.message,
        statusCode: emailError.statusCode,
        name: emailError.name,
        fullError: emailError,
      })

      // Still return success to user but log the email failure
      return NextResponse.json(
        {
          message: 'Form submitted but email delivery failed. Please contact us directly.',
          error: emailError.message,
        },
        { status: 200 }
      )
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Project inquiry error:', error)
    return NextResponse.json({ error: 'Failed to process inquiry' }, { status: 500 })
  }
}
