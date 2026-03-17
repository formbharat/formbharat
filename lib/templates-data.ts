import { FormField } from './types'

export interface Template {
  id: string
  title: string
  description: string
  category: string
  icon: string
  fields: FormField[]
}

export const formTemplates: Template[] = [
  {
    id: 'customer-feedback',
    title: 'Customer Feedback Form',
    description: 'Collect valuable feedback from your customers',
    category: 'Business',
    icon: 'MessageSquare',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: false },
      { id: '4', type: 'radio', label: 'How satisfied are you with our service?', required: true, options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
      { id: '5', type: 'checkbox', label: 'Which aspects did you like?', required: false, options: ['Product Quality', 'Customer Service', 'Pricing', 'Delivery Speed', 'Website Experience'] },
      { id: '6', type: 'textarea', label: 'What can we improve?', placeholder: 'Share your suggestions...', required: false },
      { id: '7', type: 'radio', label: 'Would you recommend us to others?', required: true, options: ['Definitely', 'Probably', 'Not Sure', 'Probably Not', 'Definitely Not'] },
      { id: '8', type: 'textarea', label: 'Additional Comments', placeholder: 'Any other feedback...', required: false }
    ]
  },
  {
    id: 'event-registration',
    title: 'Event Registration',
    description: 'Manage event attendees and registrations',
    category: 'Events',
    icon: 'Calendar',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'Enter your full name', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'text', label: 'Organization/Company', placeholder: 'Your organization name', required: false },
      { id: '5', type: 'dropdown', label: 'Ticket Type', required: true, options: ['Early Bird', 'Regular', 'VIP', 'Student'] },
      { id: '6', type: 'radio', label: 'Dietary Preferences', required: false, options: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'No Preference'] },
      { id: '7', type: 'checkbox', label: 'Sessions Interested In', required: false, options: ['Keynote', 'Workshop A', 'Workshop B', 'Panel Discussion', 'Networking'] },
      { id: '8', type: 'text', label: 'Special Requirements', placeholder: 'Any accessibility needs?', required: false },
      { id: '9', type: 'radio', label: 'How did you hear about this event?', required: false, options: ['Social Media', 'Email', 'Friend', 'Website', 'Other'] },
      { id: '10', type: 'textarea', label: 'Additional Comments', placeholder: 'Any questions or comments?', required: false }
    ]
  },
  {
    id: 'job-application',
    title: 'Job Application Form',
    description: 'Streamline your hiring process',
    category: 'HR',
    icon: 'Briefcase',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'text', label: 'Current Location', placeholder: 'City, State', required: true },
      { id: '5', type: 'dropdown', label: 'Position Applied For', required: true, options: ['Software Engineer', 'Product Manager', 'Designer', 'Marketing Manager', 'Sales Executive', 'HR Manager'] },
      { id: '6', type: 'dropdown', label: 'Years of Experience', required: true, options: ['0-1 years', '1-3 years', '3-5 years', '5-10 years', '10+ years'] },
      { id: '7', type: 'text', label: 'Current/Last Employer', placeholder: 'Company name', required: false },
      { id: '8', type: 'text', label: 'Expected Salary (LPA)', placeholder: 'e.g., 5-8 LPA', required: false },
      { id: '9', type: 'radio', label: 'Notice Period', required: true, options: ['Immediate', '15 days', '1 month', '2 months', '3 months'] },
      { id: '10', type: 'text', label: 'LinkedIn Profile', placeholder: 'https://linkedin.com/in/yourprofile', required: false },
      { id: '11', type: 'textarea', label: 'Why do you want to join us?', placeholder: 'Tell us about your motivation...', required: true },
      { id: '12', type: 'textarea', label: 'Relevant Skills & Experience', placeholder: 'Briefly describe your key skills...', required: true }
    ]
  },
  {
    id: 'product-order',
    title: 'Product Order Form',
    description: 'Take product orders from customers',
    category: 'Sales',
    icon: 'ShoppingCart',
    fields: [
      { id: '1', type: 'text', label: 'Customer Name', placeholder: 'Full name', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'dropdown', label: 'Product', required: true, options: ['Product A', 'Product B', 'Product C', 'Product D'] },
      { id: '5', type: 'dropdown', label: 'Quantity', required: true, options: ['1', '2', '3', '4', '5', '10+'] },
      { id: '6', type: 'radio', label: 'Size (if applicable)', required: false, options: ['Small', 'Medium', 'Large', 'XL'] },
      { id: '7', type: 'textarea', label: 'Delivery Address', placeholder: 'Full address with pincode', required: true },
      { id: '8', type: 'radio', label: 'Payment Method', required: true, options: ['UPI', 'Cash on Delivery', 'Card', 'Net Banking'] },
      { id: '9', type: 'textarea', label: 'Special Instructions', placeholder: 'Any specific requirements?', required: false }
    ]
  },
  {
    id: 'contact-form',
    title: 'Contact Form',
    description: 'Let customers reach out to you easily',
    category: 'Business',
    icon: 'Mail',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: false },
      { id: '4', type: 'dropdown', label: 'Subject', required: true, options: ['General Inquiry', 'Support', 'Sales', 'Partnership', 'Other'] },
      { id: '5', type: 'textarea', label: 'Message', placeholder: 'Your message...', required: true }
    ]
  },
  {
    id: 'survey-form',
    title: 'Survey Form',
    description: 'Conduct surveys and gather insights',
    category: 'Research',
    icon: 'ClipboardList',
    fields: [
      { id: '1', type: 'text', label: 'Name (Optional)', placeholder: 'Your name', required: false },
      { id: '2', type: 'email', label: 'Email (Optional)', placeholder: 'your@email.com', required: false },
      { id: '3', type: 'radio', label: 'Age Group', required: true, options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
      { id: '4', type: 'radio', label: 'Gender', required: false, options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
      { id: '5', type: 'dropdown', label: 'Location', required: false, options: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Other'] },
      { id: '6', type: 'checkbox', label: 'What are your interests?', required: false, options: ['Technology', 'Sports', 'Music', 'Travel', 'Food', 'Fashion', 'Health'] },
      { id: '7', type: 'textarea', label: 'Additional Feedback', placeholder: 'Share your thoughts...', required: false }
    ]
  },
  {
    id: 'lead-generation',
    title: 'Lead Generation Form',
    description: 'Capture and qualify potential leads',
    category: 'Sales',
    icon: 'Users',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'Your name', required: true },
      { id: '2', type: 'email', label: 'Business Email', placeholder: 'your@company.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'text', label: 'Company Name', placeholder: 'Your company', required: true },
      { id: '5', type: 'dropdown', label: 'Company Size', required: true, options: ['1-10', '11-50', '51-200', '201-500', '500+'] },
      { id: '6', type: 'dropdown', label: 'Industry', required: true, options: ['Technology', 'Retail', 'Healthcare', 'Education', 'Manufacturing', 'Other'] },
      { id: '7', type: 'radio', label: 'Budget Range', required: false, options: ['Under ₹1L', '₹1L - ₹5L', '₹5L - ₹10L', '₹10L+'] },
      { id: '8', type: 'radio', label: 'Timeline to Purchase', required: false, options: ['Immediate', 'Within 1 month', '1-3 months', '3-6 months', 'Just exploring'] },
      { id: '9', type: 'textarea', label: 'What are you looking for?', placeholder: 'Describe your requirements...', required: true }
    ]
  },
  {
    id: 'support-ticket',
    title: 'Support Ticket Form',
    description: 'Handle customer support requests',
    category: 'Support',
    icon: 'Phone',
    fields: [
      { id: '1', type: 'text', label: 'Name', placeholder: 'Your name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: false },
      { id: '4', type: 'dropdown', label: 'Issue Category', required: true, options: ['Technical Issue', 'Billing', 'Account', 'Product Query', 'Other'] },
      { id: '5', type: 'dropdown', label: 'Priority', required: true, options: ['Low', 'Medium', 'High', 'Critical'] },
      { id: '6', type: 'text', label: 'Order/Ticket Number', placeholder: 'If applicable', required: false },
      { id: '7', type: 'textarea', label: 'Issue Description', placeholder: 'Describe the issue in detail...', required: true },
      { id: '8', type: 'textarea', label: 'Steps to Reproduce', placeholder: 'How can we reproduce this issue?', required: false }
    ]
  },
  {
    id: 'workshop-registration',
    title: 'Workshop Registration',
    description: 'Register participants for workshops',
    category: 'Events',
    icon: 'Award',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Mobile Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'dropdown', label: 'Workshop Track', required: true, options: ['Beginner', 'Intermediate', 'Advanced'] },
      { id: '5', type: 'radio', label: 'Previous Experience', required: true, options: ['None', 'Some', 'Moderate', 'Expert'] },
      { id: '6', type: 'text', label: 'College/Organization', placeholder: 'Your institution', required: false },
      { id: '7', type: 'checkbox', label: 'What do you want to learn?', required: false, options: ['Fundamentals', 'Practical Projects', 'Best Practices', 'Industry Trends', 'Tools & Technologies'] },
      { id: '8', type: 'textarea', label: 'Why do you want to attend?', placeholder: 'Share your motivation...', required: false }
    ]
  },
  {
    id: 'vendor-registration',
    title: 'Vendor Registration Form',
    description: 'Onboard new vendors and suppliers',
    category: 'Business',
    icon: 'Briefcase',
    fields: [
      { id: '1', type: 'text', label: 'Company Name', placeholder: 'Your company name', required: true },
      { id: '2', type: 'text', label: 'Contact Person', placeholder: 'Name of contact person', required: true },
      { id: '3', type: 'email', label: 'Business Email', placeholder: 'contact@company.com', required: true },
      { id: '4', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '5', type: 'textarea', label: 'Business Address', placeholder: 'Complete address with pincode', required: true },
      { id: '6', type: 'dropdown', label: 'Business Type', required: true, options: ['Manufacturer', 'Distributor', 'Wholesaler', 'Retailer', 'Service Provider'] },
      { id: '7', type: 'checkbox', label: 'Products/Services Offered', required: true, options: ['Electronics', 'Clothing', 'Food & Beverages', 'Services', 'Raw Materials', 'Other'] },
      { id: '8', type: 'text', label: 'GST Number', placeholder: 'GST registration number', required: true },
      { id: '9', type: 'text', label: 'PAN Number', placeholder: 'PAN card number', required: true },
      { id: '10', type: 'radio', label: 'Years in Business', required: true, options: ['Less than 1 year', '1-3 years', '3-5 years', '5-10 years', '10+ years'] }
    ]
  },
  {
    id: 'volunteer-signup',
    title: 'Volunteer Sign-up Form',
    description: 'Recruit volunteers for events and causes',
    category: 'Events',
    icon: 'Users',
    fields: [
      { id: '1', type: 'text', label: 'Full Name', placeholder: 'Your full name', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'phone', label: 'Phone Number', placeholder: '+91 XXXXX XXXXX', required: true },
      { id: '4', type: 'radio', label: 'Age Group', required: true, options: ['Under 18', '18-25', '26-35', '36-50', '50+'] },
      { id: '5', type: 'dropdown', label: 'Availability', required: true, options: ['Weekdays', 'Weekends', 'Both', 'Flexible'] },
      { id: '6', type: 'checkbox', label: 'Areas of Interest', required: true, options: ['Event Management', 'Teaching', 'Administration', 'Technical Support', 'Marketing', 'Other'] },
      { id: '7', type: 'textarea', label: 'Why do you want to volunteer?', placeholder: 'Share your motivation...', required: true },
      { id: '8', type: 'text', label: 'Relevant Skills/Experience', placeholder: 'Any skills you bring...', required: false }
    ]
  },
  {
    id: 'newsletter-signup',
    title: 'Newsletter Sign-up',
    description: 'Build your email subscriber list',
    category: 'Marketing',
    icon: 'Mail',
    fields: [
      { id: '1', type: 'text', label: 'First Name', placeholder: 'Your first name', required: true },
      { id: '2', type: 'email', label: 'Email Address', placeholder: 'your@email.com', required: true },
      { id: '3', type: 'checkbox', label: 'Interests', required: false, options: ['Product Updates', 'Industry News', 'Tips & Tutorials', 'Special Offers', 'Events'] },
      { id: '4', type: 'radio', label: 'How often would you like to hear from us?', required: false, options: ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'] }
    ]
  }
]
