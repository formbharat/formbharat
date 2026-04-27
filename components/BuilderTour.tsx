'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowRight, ChevronLeft } from 'lucide-react'

const STEP_SETTLE_MS = 380

interface TourStep {
  id: string
  title: string
  body: string
  side: 'top' | 'bottom' | 'left' | 'right'
}

const STEPS: TourStep[] = [
  {
    id: 'add-fields',
    title: 'Add Fields',
    body: 'Click any field type to add it to your form. You can mix text, dropdowns, file uploads, payment fields, and more.',
    side: 'right',
  },
  {
    id: 'form-details',
    title: 'Form Details',
    body: 'Start with a clear title. A short description helps respondents understand what the form is for.',
    side: 'bottom',
  },
  {
    id: 'form-canvas',
    title: 'Your Canvas',
    body: 'Fields appear here in order. Click a field card to edit its label, placeholder, and options. Drag to reorder.',
    side: 'bottom',
  },
  {
    id: 'preview-btn',
    title: 'Preview',
    body: 'See exactly how your form will look to respondents before you share it — no surprises.',
    side: 'bottom',
  },
  {
    id: 'save-btn',
    title: 'Save & Share',
    body: 'Save your form to unlock a public link, QR code, and one-click WhatsApp sharing — all built in.',
    side: 'bottom',
  },
]

const TW = 272 // tooltip width
const GAP = 14  // gap between target and tooltip

interface Rect { top: number; left: number; width: number; height: number }

function tooltipStyle(r: Rect, side: TourStep['side']): React.CSSProperties {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const clampX = (x: number) => Math.min(Math.max(8, x), vw - TW - 8)
  const base: React.CSSProperties = { position: 'fixed', width: TW, zIndex: 9999 }
  switch (side) {
    case 'right':
      return { ...base, top: r.top + r.height / 2 - 110, left: Math.min(r.left + r.width + GAP, vw - TW - 8) }
    case 'left':
      return { ...base, top: r.top + r.height / 2 - 110, left: Math.max(8, r.left - TW - GAP) }
    case 'bottom':
      return { ...base, top: r.top + r.height + GAP, left: clampX(r.left + r.width / 2 - TW / 2) }
    case 'top':
      return { ...base, top: Math.max(8, r.top - GAP - 210), left: clampX(r.left + r.width / 2 - TW / 2) }
  }
}

interface BuilderTourProps {
  active: boolean
  onClose: () => void
}

export function BuilderTour({ active, onClose }: BuilderTourProps) {
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState<Rect | null>(null)

  const measure = useCallback((idx: number) => {
    setRect(null)
    const el = document.querySelector<HTMLElement>(`[data-tour="${STEPS[idx].id}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    setTimeout(() => {
      const r = el.getBoundingClientRect()
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
    }, STEP_SETTLE_MS)
  }, [])

  useEffect(() => {
    if (!active) return
    setStep(0)
  }, [active])

  useEffect(() => {
    if (!active) return
    measure(step)
  }, [step, active, measure])

  useEffect(() => {
    if (!active) return
    const onResize = () => measure(step)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [active, step, measure])

  if (!active) return null

  const current = STEPS[step]

  const next = () => {
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else onClose()
  }
  const prev = () => { if (step > 0) setStep(s => s - 1) }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(15,15,15,0.5)' }}
        onClick={onClose}
      />

      {/* Spotlight ring */}
      {rect && (
        <div
          style={{
            position: 'fixed',
            zIndex: 9991,
            top: rect.top - 6,
            left: rect.left - 6,
            width: rect.width + 12,
            height: rect.height + 12,
            borderRadius: 14,
            boxShadow: '0 0 0 3px #f97316, 0 0 0 6px rgba(249,115,22,0.18)',
            pointerEvents: 'none',
            transition: 'all 0.25s ease',
          }}
        />
      )}

      {/* Tooltip */}
      {rect && (
        <div
          style={tooltipStyle(rect, current.side)}
          className="rounded-2xl bg-white border border-gray-100 shadow-2xl p-5 transition-opacity duration-200"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[9px] font-semibold text-orange-500 uppercase tracking-[0.14em] mb-1">
                Step {step + 1} of {STEPS.length}
              </p>
              <h3 className="text-sm font-semibold text-gray-900">{current.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="ml-3 text-gray-300 hover:text-gray-500 transition-colors mt-0.5 flex-shrink-0"
              aria-label="Skip tour"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <p className="text-xs text-gray-500 leading-relaxed mb-4">{current.body}</p>

          {/* Progress */}
          <div className="flex items-center gap-1 mb-4">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === step ? 20 : 6,
                  background: i <= step ? '#f97316' : '#e5e7eb',
                }}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center">
            {step > 0 && (
              <button
                onClick={prev}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Back
              </button>
            )}
            <button
              onClick={next}
              className="ml-auto flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
            >
              {step < STEPS.length - 1 ? 'Next' : 'Done'}
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </>,
    document.body
  )
}
