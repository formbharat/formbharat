export type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'dropdown' | 'radio' | 'checkbox' | 'file' | 'section' | 'heading' | 'image' | 'payment' | 'phone_otp'

export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'is_empty' | 'is_not_empty'

export interface FieldCondition {
  fieldId: string
  operator: ConditionOperator
  value: string
}

export interface FormField {
  id: string
  type: FieldType
  label: string
  placeholder?: string
  required: boolean
  options?: string[]
  description?: string
  condition?: FieldCondition
  // Payment field
  paymentAmount?: number      // amount in INR (₹)
  paymentCurrency?: string    // 'INR'
  paymentDescription?: string // e.g. "Workshop registration fee"
}

export interface FormData {
  title: string
  description?: string
  fields: FormField[]
}

export interface FormResponse {
  [fieldId: string]: string | string[]
}
