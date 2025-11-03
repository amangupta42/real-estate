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

    // TODO: Send email using Resend
    // For now, just log the data
    console.log('Project inquiry submission:', validatedData)

    // Uncomment and configure when ready to use Resend:
    const { Resend } = require('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: 'sales@realestate.com',
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

    // Send confirmation email to customer
    await resend.emails.send({
      from: 'noreply@yourdomain.com',
      to: validatedData.email,
      subject: `Thank you for your interest in ${validatedData.projectName}`,
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${validatedData.name},</p>
        <p>We have received your inquiry about ${validatedData.projectName}. Our team will get back to you within 24 hours.</p>
        <p>Best regards,<br>RealEstate Team</p>
      `,
    })

    return NextResponse.json({ message: 'Inquiry submitted successfully' }, { status: 200 })
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
