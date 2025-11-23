// Analytics tracking utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }
}

// Google Analytics Events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Specific tracking functions for common events

export const trackFormSubmission = (formName: string) => {
  trackEvent('form_submission', 'Lead Generation', formName)

  // Track Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
}

export const trackProjectView = (projectName: string) => {
  trackEvent('view_item', 'Projects', projectName)

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: projectName,
      content_category: 'Project',
    })
  }
}

export const trackProjectInquiry = (projectName: string, projectPrice?: number) => {
  trackEvent('inquiry', 'Projects', projectName, projectPrice)

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact', {
      content_name: projectName,
      value: projectPrice,
      currency: 'INR',
    })
  }
}

export const trackPhoneClick = () => {
  trackEvent('phone_click', 'Contact', 'Header Phone')
}

export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'Contact', 'WhatsApp Button')

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Contact')
  }
}

export const trackEMICalculation = (plotPrice: number, emi: number) => {
  trackEvent('emi_calculation', 'Tools', 'EMI Calculator', plotPrice)
}

export const trackCostCalculation = (plotPrice: number, totalCost: number) => {
  trackEvent('cost_calculation', 'Tools', 'Cost Calculator', plotPrice)
}

export const trackDownload = (documentType: string, projectName?: string) => {
  trackEvent('download', 'Documents', `${documentType} - ${projectName || 'General'}`)
}

export const trackVideoPlay = (testimonialName: string) => {
  trackEvent('video_play', 'Testimonials', testimonialName)
}

export const trackPaymentInitiated = (projectName: string, amount: number) => {
  trackEvent('begin_checkout', 'Payment', projectName, amount)

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_name: projectName,
      value: amount,
      currency: 'INR',
    })
  }
}

export const trackPaymentSuccess = (projectName: string, amount: number, paymentId: string) => {
  trackEvent('purchase', 'Payment', projectName, amount)

  // Google Ads Conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with actual conversion ID
      value: amount,
      currency: 'INR',
      transaction_id: paymentId,
    })
  }

  // Facebook Pixel Purchase
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      content_name: projectName,
      value: amount,
      currency: 'INR',
    })
  }
}

export const trackSiteVisitBooking = (projectName: string) => {
  trackEvent('site_visit_booking', 'Lead Generation', projectName)

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Schedule')
  }
}

export const trackLanguageChange = (language: string) => {
  trackEvent('language_change', 'User Preference', language)
}

export const trackSearchQuery = (query: string) => {
  trackEvent('search', 'Search', query)
}

export const trackFilterUsage = (filterType: string, filterValue: string) => {
  trackEvent('filter_usage', 'Projects', `${filterType}: ${filterValue}`)
}

export const trackComparisonView = (projectNames: string[]) => {
  trackEvent('comparison_view', 'Projects', projectNames.join(' vs '))
}

export const trackNewsletterSignup = (email: string) => {
  trackEvent('newsletter_signup', 'Lead Generation', 'Newsletter')

  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'CompleteRegistration')
  }
}
