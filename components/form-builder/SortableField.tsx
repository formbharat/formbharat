'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormField, ConditionOperator } from '@/lib/types'
import { Textarea } from '@/components/ui/textarea'
import { GripVertical, Trash2, Plus, X, Image as ImageIcon, AlignCenter, SeparatorHorizontal, Upload, Loader2, Link as LinkIcon, IndianRupee } from 'lucide-react'
import { useState, useRef } from 'react'

const OPERATORS: { value: ConditionOperator; label: string; needsValue: boolean }[] = [
  { value: 'equals',       label: 'equals',         needsValue: true  },
  { value: 'not_equals',   label: 'does not equal', needsValue: true  },
  { value: 'contains',     label: 'contains',       needsValue: true  },
  { value: 'is_empty',     label: 'is empty',       needsValue: false },
  { value: 'is_not_empty', label: 'is not empty',   needsValue: false },
]

interface SortableFieldProps {
  field: FormField
  allFields: FormField[]
  onUpdate: (id: string, updates: Partial<FormField>) => void
  onDelete: (id: string) => void
}

export function SortableField({ field, allFields, onUpdate, onDelete }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id })

  const [newOption, setNewOption] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (file: File) => {
    setUploadError('')
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File must be under 5 MB')
      return
    }
    setUploading(true)
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename: file.name, contentType: file.type, sizeBytes: file.size }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to get upload URL')
      await fetch(data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      })
      onUpdate(field.id, { placeholder: data.publicUrl })
    } catch (err: any) {
      setUploadError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const isLayoutField = field.type === 'section' || field.type === 'heading' || field.type === 'image'
  const hasOptions = field.type === 'dropdown' || field.type === 'radio' || field.type === 'checkbox'

  const addOption = () => {
    if (newOption.trim() && field.options) {
      onUpdate(field.id, { options: [...field.options, newOption.trim()] })
      setNewOption('')
    }
  }

  const removeOption = (index: number) => {
    if (field.options) {
      onUpdate(field.id, { options: field.options.filter((_, i) => i !== index) })
    }
  }

  if (field.type === 'section') {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-dashed border-gray-300 bg-gray-50/50">
          <div className="flex gap-3">
            <div {...attributes} {...listeners} className="flex items-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <SeparatorHorizontal className="h-3.5 w-3.5" /> Section Break
              </div>
              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Section title (e.g. Personal Information)"
              />
              <Textarea
                value={field.description || ''}
                onChange={(e) => onUpdate(field.id, { description: e.target.value })}
                placeholder="Optional section description"
                rows={2}
                className="resize-none text-sm"
              />
            </div>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (field.type === 'heading') {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-dashed border-blue-200 bg-blue-50/30">
          <div className="flex gap-3">
            <div {...attributes} {...listeners} className="flex items-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 uppercase tracking-wider">
                <AlignCenter className="h-3.5 w-3.5" /> Title & Description
              </div>
              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Title text"
                className="font-semibold"
              />
              <Textarea
                value={field.description || ''}
                onChange={(e) => onUpdate(field.id, { description: e.target.value })}
                placeholder="Description text (optional)"
                rows={2}
                className="resize-none text-sm"
              />
            </div>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (field.type === 'image') {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-dashed border-purple-200 bg-purple-50/30">
          <div className="flex gap-3">
            <div {...attributes} {...listeners} className="flex items-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-purple-500 uppercase tracking-wider">
                <ImageIcon className="h-3.5 w-3.5" /> Image
              </div>

              {/* Upload area */}
              {!field.placeholder ? (
                <div
                  className="border-2 border-dashed border-purple-200 rounded-lg p-6 text-center cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => !uploading && fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault()
                    const file = e.dataTransfer.files[0]
                    if (file) handleImageUpload(file)
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file)
                    }}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="h-7 w-7 text-purple-400 animate-spin" />
                      <p className="text-xs text-purple-500">Uploading…</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-7 w-7 text-purple-300" />
                      <p className="text-xs font-medium text-gray-600">Click or drag an image here</p>
                      <p className="text-xs text-gray-400">JPEG, PNG, GIF, WebP · max 5 MB</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={field.placeholder}
                    alt={field.label}
                    className="max-h-40 w-full rounded-lg object-cover border border-purple-100"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                  <button
                    onClick={() => onUpdate(field.id, { placeholder: '' })}
                    className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                </div>
              )}

              {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}

              {/* URL fallback toggle */}
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
              >
                <LinkIcon className="h-3 w-3" />
                {showUrlInput ? 'Hide URL input' : 'Or paste an image URL'}
              </button>
              {showUrlInput && (
                <Input
                  value={field.placeholder || ''}
                  onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="text-sm"
                />
              )}

              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Caption (optional)"
                className="text-sm"
              />
            </div>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (field.type === 'phone_otp') {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-blue-200 bg-blue-50/30">
          <div className="flex gap-3">
            <div {...attributes} {...listeners} className="flex items-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                <span>📱 Phone OTP Verification</span>
              </div>
              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Field label (e.g. Verify your mobile number)"
              />
              <Input
                value={field.description || ''}
                onChange={(e) => onUpdate(field.id, { description: e.target.value })}
                placeholder="Helper text (optional)"
                className="text-sm"
              />
              <p className="text-xs text-gray-500">Respondents must verify their Indian mobile (+91) before submitting. Powered by MSG91.</p>
            </div>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  if (field.type === 'payment') {
    return (
      <div ref={setNodeRef} style={style}>
        <Card className="p-4 border-green-200 bg-green-50/30">
          <div className="flex gap-3">
            <div {...attributes} {...listeners} className="flex items-center cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-green-600 uppercase tracking-wider">
                <IndianRupee className="h-3.5 w-3.5" /> Payment / UPI
              </div>
              <Input
                value={field.label}
                onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                placeholder="Payment field label (e.g. Workshop Registration Fee)"
              />
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium text-gray-700 w-8">₹</span>
                <Input
                  type="number"
                  min={1}
                  value={field.paymentAmount ?? ''}
                  onChange={(e) => onUpdate(field.id, { paymentAmount: Number(e.target.value) })}
                  placeholder="Amount in INR (e.g. 499)"
                  className="flex-1"
                />
              </div>
              <Input
                value={field.paymentDescription || ''}
                onChange={(e) => onUpdate(field.id, { paymentDescription: e.target.value })}
                placeholder="Payment description shown to respondent (optional)"
                className="text-sm"
              />
              <p className="text-xs text-gray-500">Powered by Razorpay · Accepts UPI, cards, netbanking</p>
            </div>
            <div className="flex items-start">
              <Button variant="ghost" size="icon" onClick={() => onDelete(field.id)} className="text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="p-4">
        <div className="flex gap-4">
          <div
            {...attributes}
            {...listeners}
            className="flex items-center cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label className="text-xs text-muted-foreground">Field Label</Label>
                <Input
                  value={field.label}
                  onChange={(e) => onUpdate(field.id, { label: e.target.value })}
                  placeholder="Field label"
                  className="mt-1"
                />
              </div>
              <div className="w-24 flex-shrink-0">
                <Label className="text-xs text-muted-foreground">Type</Label>
                <div className="mt-1 text-sm font-medium capitalize">{field.type}</div>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground">Placeholder (Optional)</Label>
              <Input
                value={field.placeholder || ''}
                onChange={(e) => onUpdate(field.id, { placeholder: e.target.value })}
                placeholder="Enter placeholder text"
                className="mt-1"
              />
            </div>

            {hasOptions && (
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Options</Label>
                <div className="space-y-2">
                  {field.options?.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          if (field.options) {
                            const updated = [...field.options]
                            updated[index] = e.target.value
                            onUpdate(field.id, { options: updated })
                          }
                        }}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <Input
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="Add new option"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addOption()
                        }
                      }}
                    />
                    <Button onClick={addOption} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Switch
                checked={field.required}
                onCheckedChange={(checked) => onUpdate(field.id, { required: checked })}
              />
              <Label>Required field</Label>
            </div>

            {/* Conditional Logic */}
            {(() => {
              const triggerFields = allFields.filter(
                (f) => f.id !== field.id && !['section', 'heading', 'image'].includes(f.type) && f.label
              )
              const conditionEnabled = !!field.condition?.fieldId
              const triggerField = triggerFields.find((f) => f.id === field.condition?.fieldId)
              const choiceOptions = triggerField?.options ?? []
              const operator = field.condition?.operator ?? 'equals'
              const needsValue = OPERATORS.find((o) => o.value === operator)?.needsValue ?? true
              return (
                <div className="border-t border-dashed border-gray-200 pt-3 mt-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Switch
                      checked={conditionEnabled}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          const first = triggerFields[0]
                          onUpdate(field.id, { condition: { fieldId: first?.id ?? '', operator: 'equals', value: '' } })
                        } else {
                          onUpdate(field.id, { condition: undefined })
                        }
                      }}
                    />
                    <Label className="text-xs text-gray-500 cursor-pointer">Show conditionally</Label>
                  </div>
                  {conditionEnabled && triggerFields.length > 0 && (
                    <div className="space-y-2 pl-1">
                      <p className="text-xs text-gray-400">Show this field when</p>
                      <div className="grid grid-cols-1 gap-2">
                        {/* Trigger field */}
                        <select
                          className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs bg-white"
                          value={field.condition?.fieldId ?? ''}
                          onChange={(e) => onUpdate(field.id, { condition: { ...field.condition!, fieldId: e.target.value, value: '' } })}
                        >
                          {triggerFields.map((f) => (
                            <option key={f.id} value={f.id}>{f.label || f.type}</option>
                          ))}
                        </select>
                        {/* Operator */}
                        <select
                          className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs bg-white"
                          value={operator}
                          onChange={(e) => onUpdate(field.id, { condition: { ...field.condition!, operator: e.target.value as ConditionOperator, value: '' } })}
                        >
                          {OPERATORS.map((o) => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                        {/* Value */}
                        {needsValue && (
                          choiceOptions.length > 0 ? (
                            <select
                              className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-xs bg-white"
                              value={field.condition?.value ?? ''}
                              onChange={(e) => onUpdate(field.id, { condition: { ...field.condition!, value: e.target.value } })}
                            >
                              <option value="">Select value…</option>
                              {choiceOptions.map((opt) => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <Input
                              className="text-xs h-7"
                              placeholder="Value…"
                              value={field.condition?.value ?? ''}
                              onChange={(e) => onUpdate(field.id, { condition: { ...field.condition!, value: e.target.value } })}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {conditionEnabled && triggerFields.length === 0 && (
                    <p className="text-xs text-gray-400 pl-1">Add other fields first to set conditions.</p>
                  )}
                </div>
              )
            })()}
          </div>

          <div className="flex items-start">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(field.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
