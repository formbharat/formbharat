'use client'

import { FieldType } from '@/lib/types'
import { Type, Mail, Phone, AlignLeft, List, Circle, CheckSquare, Upload, SeparatorHorizontal, AlignCenter, Image as ImageIcon, IndianRupee, ShieldCheck } from 'lucide-react'

interface FieldTypeSelectorProps {
  onSelectType: (type: FieldType) => void
}

const inputFields: { type: FieldType; label: string; icon: any; description: string }[] = [
  { type: 'text', label: 'Text', icon: Type, description: 'Single line input' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'phone', label: 'Phone', icon: Phone, description: 'Phone number' },
  { type: 'textarea', label: 'Long Text', icon: AlignLeft, description: 'Multi-line input' },
  { type: 'dropdown', label: 'Dropdown', icon: List, description: 'Select from list' },
  { type: 'radio', label: 'Multiple Choice', icon: Circle, description: 'Pick one option' },
  { type: 'checkbox', label: 'Checkboxes', icon: CheckSquare, description: 'Pick many options' },
  { type: 'file', label: 'File Upload', icon: Upload, description: 'Upload files/images' },
]

const advancedFields: { type: FieldType; label: string; icon: any; description: string }[] = [
  { type: 'payment', label: 'Payment / UPI', icon: IndianRupee, description: 'Collect payment via Razorpay / UPI' },
  { type: 'phone_otp', label: 'Phone OTP', icon: ShieldCheck, description: 'Verify Indian mobile via OTP (MSG91)' },
]

const layoutFields: { type: FieldType; label: string; icon: any; description: string }[] = [
  { type: 'section', label: 'Section Break', icon: SeparatorHorizontal, description: 'Divider with title' },
  { type: 'heading', label: 'Title & Description', icon: AlignCenter, description: 'Add text block' },
  { type: 'image', label: 'Image', icon: ImageIcon, description: 'Embed an image' },
]

function FieldButton({ type, label, icon: Icon, description, onSelectType }: any) {
  return (
    <button
      onClick={() => onSelectType(type)}
      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition flex-shrink-0">
          <Icon className="h-4 w-4 text-gray-600 group-hover:text-orange-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900">{label}</div>
          <div className="text-xs text-gray-500 mt-0.5">{description}</div>
        </div>
      </div>
    </button>
  )
}

export function FieldTypeSelector({ onSelectType }: FieldTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Input Fields</p>
        <div className="space-y-1.5">
          {inputFields.map((f) => (
            <FieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Layout</p>
        <div className="space-y-1.5">
          {layoutFields.map((f) => (
            <FieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-1">Advanced</p>
        <div className="space-y-1.5">
          {advancedFields.map((f) => (
            <FieldButton key={f.type} {...f} onSelectType={onSelectType} />
          ))}
        </div>
      </div>
    </div>
  )
}
