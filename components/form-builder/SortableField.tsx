'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { FormField } from '@/lib/types'
import { GripVertical, Trash2, Plus, X } from 'lucide-react'
import { useState } from 'react'

interface SortableFieldProps {
  field: FormField
  onUpdate: (id: string, updates: Partial<FormField>) => void
  onDelete: (id: string) => void
}

export function SortableField({ field, onUpdate, onDelete }: SortableFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id })

  const [newOption, setNewOption] = useState('')

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

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
              <div className="w-32">
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
                      <Input value={option} readOnly className="flex-1" />
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
