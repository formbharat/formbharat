'use client'

import { Button } from '@/components/ui/button'
import { FieldType } from '@/lib/types'
import { Type, Mail, Phone, AlignLeft, List, Circle, CheckSquare, Upload } from 'lucide-react'

interface FieldTypeSelectorProps {
  onSelectType: (type: FieldType) => void
}

const fieldTypes: { type: FieldType; label: string; icon: any; description: string }[] = [
  { type: 'text', label: 'Text', icon: Type, description: 'Single line input' },
  { type: 'email', label: 'Email', icon: Mail, description: 'Email address' },
  { type: 'phone', label: 'Phone', icon: Phone, description: 'Phone number' },
  { type: 'textarea', label: 'Long Text', icon: AlignLeft, description: 'Multi-line input' },
  { type: 'dropdown', label: 'Dropdown', icon: List, description: 'Select from list' },
  { type: 'radio', label: 'Radio Buttons', icon: Circle, description: 'Single choice' },
  { type: 'checkbox', label: 'Checkboxes', icon: CheckSquare, description: 'Multiple choice' },
  { type: 'file', label: 'File Upload', icon: Upload, description: 'Upload files/images' },
]

export function FieldTypeSelector({ onSelectType }: FieldTypeSelectorProps) {
  return (
    <div className="space-y-2">
      {fieldTypes.map(({ type, label, icon: Icon, description }) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all group"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition">
              <Icon className="h-4 w-4 text-gray-600 group-hover:text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{description}</div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
