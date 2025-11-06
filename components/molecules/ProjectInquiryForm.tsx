'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectName: z.string(),
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface ProjectInquiryFormProps {
  projectName: string
  propertyDetails?: {
    propertyType?: string
    landCategory?: string
    totalArea?: string
    location?: string
    landUseStatus?: string
  }
}

export function ProjectInquiryForm({ projectName, propertyDetails }: ProjectInquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Generate pre-filled message based on property details
  const generateDefaultMessage = () => {
    if (!propertyDetails) {
      return `I am interested in ${projectName}. Please provide more information.`
    }

    const details: string[] = []
    if (propertyDetails.propertyType) details.push(propertyDetails.propertyType)
    if (propertyDetails.landCategory) details.push(propertyDetails.landCategory)
    if (propertyDetails.totalArea) details.push(propertyDetails.totalArea)
    if (propertyDetails.location) details.push(`in ${propertyDetails.location}`)
    if (propertyDetails.landUseStatus) details.push(`(${propertyDetails.landUseStatus})`)

    return `I am interested in property: ${projectName}${details.length > 0 ? ` - ${details.join(', ')}` : ''}. Please provide more information and schedule a site visit.`
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      projectName,
      message: generateDefaultMessage(),
    },
  })

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('Failed to submit inquiry')
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error)
      alert('Failed to submit inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-600" />
        <h3 className="mb-2 text-xl font-heading font-semibold text-emerald-900">
          Thank you for your inquiry!
        </h3>
        <p className="text-emerald-700">
          We'll get back to you within 24 hours to discuss {projectName}.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="+91 98765 43210"
        />
        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
          Message *
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder={`I'm interested in ${projectName}. Please provide more information about...`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      {/* Hidden field for project name */}
      <input type="hidden" {...register('projectName')} />

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Inquiry'}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting this form, you agree to be contacted regarding your inquiry.
      </p>
    </form>
  )
}
