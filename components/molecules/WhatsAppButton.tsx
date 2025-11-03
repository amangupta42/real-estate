'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppButton({
  phoneNumber = '919371410666', // Replace with actual number
  message = 'Hello! I am interested in your land development projects.',
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Hide button when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsExpanded(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="relative">
            {/* Expanded tooltip */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-lg bg-background px-4 py-2 text-sm shadow-lg border border-border"
                >
                  Chat with us on WhatsApp
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              className={cn(
                'flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110',
                'bg-[#25D366] text-white hover:bg-[#20BA5A]'
              )}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-6 w-6" />
            </a>

            {/* Pulse animation */}
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-75" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
