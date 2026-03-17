export type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'dropdown' | 'radio' | 'checkbox' | 'file'

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
}

export interface FormData {
  title: string
  description?: string
  fields: FormField[]
}

export interface FormResponse {
  [fieldId: string]: string | string[]
}
