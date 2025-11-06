'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
  duration?: number
}

export function Toast({ message, show, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
        >
          <div className="rounded-lg border border-primary/20 bg-primary/10 backdrop-blur-sm p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="flex-1 text-sm font-medium text-foreground">{message}</p>
              <button
                onClick={onClose}
                className="flex-shrink-0 rounded-md p-1 hover:bg-primary/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Hook for easy toast usage
export function useToast() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')

  const showToast = (msg: string) => {
    setMessage(msg)
    setShow(true)
  }

  const hideToast = () => {
    setShow(false)
  }

  return { show, message, showToast, hideToast }
}
