import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(10),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactSchema.parse(body)

    // console.log('Contact form submission:', validatedData)

    // Send email using Resend
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    try {
      const emailResponse = await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain or replace with your verified domain
        to: 'amanagupta404@gmail.com',
        replyTo: validatedData.email,
        subject: `Contact Form: ${validatedData.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      })

      // console.log('✅ Email sent successfully:', emailResponse)

      return NextResponse.json(
        {
          message: 'Contact form submitted successfully',
          emailId: emailResponse.data?.id,
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

    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process contact form' }, { status: 500 })
  }
}
