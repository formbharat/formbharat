'use client'

import { useState, useEffect } from 'react'
import { DndContext, DragEndEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { nanoid } from 'nanoid'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { FormField, FieldType } from '@/lib/types'
import { SortableField } from './SortableField'
import { FieldTypeSelector } from './FieldTypeSelector'
import { Save, Eye, Plus, FileText, Palette, Settings, ChevronLeft, LayoutGrid, Home, HelpCircle, BookTemplate } from 'lucide-react'
import Link from 'next/link'

interface FormBuilderProps {
  initialTitle?: string
  initialDescription?: string
  initialFields?: FormField[]
  onSave?: (data: { title: string; description: string; fields: FormField[] }) => void
  onPreview?: () => void
}

export function FormBuilder({ 
  initialTitle = '', 
  initialDescription = '',
  initialFields = [],
  onSave,
  onPreview
}: FormBuilderProps) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [fields, setFields] = useState<FormField[]>(initialFields)

  // Update state when props change (template loading)
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle)
    if (initialDescription) setDescription(initialDescription)
    if (initialFields && initialFields.length > 0) setFields(initialFields)
  }, [initialTitle, initialDescription, initialFields])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: nanoid(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: '',
      required: false,
      options: type === 'dropdown' || type === 'radio' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
    }
    setFields([...fields, newField])
  }

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(field => field.id === id ? { ...field, ...updates } : field))
  }

  const deleteField = (id: string) => {
    setFields(fields.filter(field => field.id !== id))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setFields((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = () => {
    if (onSave) {
      onSave({ title, description, fields })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            {/* Left Section - Logo & Navigation */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                  FormBharat
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-2">
                <div className="h-6 w-px bg-gray-300" />
                <h1 className="text-lg font-semibold text-gray-700">Form Builder</h1>
              </div>
            </div>

            {/* Middle Section - Quick Nav (Desktop) */}
            <nav className="hidden lg:flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <BookTemplate className="mr-2 h-4 w-4" />
                  Templates
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  My Forms
                </Button>
              </Link>
              <Link href="/help">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </Link>
            </nav>

            {/* Right Section - Action Buttons */}
            <div className="flex gap-2">
              {onPreview && (
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Eye className="mr-0 sm:mr-2 h-4 w-4" />
                  <span className="hidden sm:inline">Preview</span>
                </Button>
              )}
              <Button 
                onClick={handleSave} 
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
              >
                <Save className="mr-0 sm:mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Save Form</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="lg:hidden flex items-center gap-2 mt-3 pt-3 border-t overflow-x-auto">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                <Home className="mr-1 h-4 w-4" />
                <span className="text-xs">Home</span>
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                <BookTemplate className="mr-1 h-4 w-4" />
                <span className="text-xs">Templates</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                <LayoutGrid className="mr-1 h-4 w-4" />
                <span className="text-xs">My Forms</span>
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 flex-shrink-0">
                <HelpCircle className="mr-1 h-4 w-4" />
                <span className="text-xs">Help</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <ChevronLeft className="h-4 w-4 rotate-180" />
          <span className="text-gray-900 font-medium">Form Builder</span>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-6">
          {/* Sidebar - Field Types */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="p-4">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-orange-500" />
                Add Fields
              </h2>
              <FieldTypeSelector onSelectType={addField} />
            </Card>
          </div>

          {/* Canvas */}
          <div className="space-y-6">
            {/* Form Settings */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold">Form Details</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">
                    Form Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Customer Feedback Form"
                    className="text-lg font-medium"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">
                    Description
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add a description to help people understand your form..."
                    rows={3}
                    className="resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Form Fields */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <h2 className="text-lg font-semibold">Form Fields</h2>
                </div>
                <span className="text-sm text-gray-500">{fields.length} field{fields.length !== 1 ? 's' : ''}</span>
              </div>

              {fields.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">No fields yet</h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Start building your form by adding fields from the sidebar
                  </p>
                  <div className="text-xs text-gray-400">
                    💡 Tip: Drag fields to reorder them
                  </div>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={fields.map(f => f.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {fields.map((field) => (
                        <SortableField
                          key={field.id}
                          field={field}
                          onUpdate={updateField}
                          onDelete={deleteField}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </Card>

            {/* Quick Tips */}
            <Card className="p-4 bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <span>💡</span>
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Drag fields to reorder them</li>
                <li>• Mark important fields as required</li>
                <li>• Add placeholder text to guide users</li>
                <li>• Save early and save often!</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
