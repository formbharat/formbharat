import type { Pillar } from './types'

export const businessFormsIndia: Pillar = {
  slug: 'business-forms-india',
  title: 'Business Forms for Indian Companies',
  description: 'Essential online forms every Indian business needs. Templates and guides for contact, registration, onboarding, and compliance forms.',
  icon: '🏢',
  color: 'green',
  tagline: 'Forms that work for Indian businesses',
  articles: [
    {
      slug: 'contact-form-guide',
      title: 'How to Create the Perfect Contact Form for Your Indian Business Website',
      description: 'Build contact forms that convert visitors into inquiries. Includes templates for service businesses, e-commerce, and B2B companies in India.',
      readTime: '6 min',
      publishDate: '2024-03-19',
      tags: ['Contact Form', 'Website', 'India', 'Leads'],
      intro: 'The contact form is the most fundamental lead generation tool on any business website. Yet most Indian business websites have contact forms that are either broken, confusing, or collecting the wrong information. This guide helps you build a contact form that actually works.',
      sections: [
        {
          heading: 'What Makes a Great Contact Form for Indian Businesses',
          body: 'A great contact form balances three things: collecting enough information to respond meaningfully, removing enough friction that visitors actually submit, and building enough trust that people share their real contact details.',
          list: [
            'Collect the minimum: Name, phone (WhatsApp preferred), message',
            'Add one qualifying question relevant to your business',
            'Show your response time: "We reply within 4 business hours"',
            'Include your direct WhatsApp number as an alternative',
            'Send an instant auto-reply confirming you received the message',
          ],
        },
        {
          heading: 'Contact Form Fields for Different Indian Business Types',
          body: 'The right fields depend on your business type. A freelance designer needs different information than a manufacturing company or a coaching institute.',
          list: [
            'Service businesses: Name, Phone, Service interested in, Brief requirement',
            'E-commerce: Name, Email, Order number (optional), Nature of query',
            'B2B companies: Name, Business email, Company name, Designation, Requirement',
            'Healthcare/legal: Name, Phone, Nature of concern, Preferred appointment time',
            'Coaching/education: Student name, Class/course, Phone, Parent email (for minor students)',
          ],
        },
        {
          heading: 'Building Trust on Your Contact Form',
          body: 'Indian internet users have experienced spam and misuse of contact details. These trust signals significantly increase form submission rates.',
          list: [
            'Privacy micro-copy: "Your information is private. We never share your details."',
            'Response commitment: "Guaranteed reply within 24 hours"',
            'WhatsApp alternative: "Prefer WhatsApp? Chat directly: +91 XXXXX XXXXX"',
            'Your face and name near the form: Humanizes the contact experience',
            'Reviews/testimonials near the form: Social proof reduces hesitation',
          ],
        },
        {
          heading: 'Contact Form Auto-Reply Best Practices',
          body: 'The auto-reply after form submission is your first impression. A poor auto-reply (generic "We have received your message") creates anxiety. A great auto-reply sets expectations, shows personality, and sometimes includes a quick qualification step.',
          list: [
            'Confirm receipt with submission timestamp',
            'State your exact response time (not vague "we\'ll be in touch")',
            'Include your WhatsApp/phone for urgent matters',
            'Add a relevant resource: case study, pricing guide, or FAQ',
            'Set expectation for next step: "A team member will call you between 10am-7pm"',
          ],
        },
        {
          heading: 'Embedding Contact Forms on Your Website',
          body: 'Where you place your contact form matters as much as how you design it. Placement affects visibility and submission rates significantly.',
          list: [
            'Homepage: Embed below hero section or in the footer',
            'Contact page: Full-page form with all details — primary contact destination',
            'Service pages: Inline form within the service description — highest conversion',
            'Popup trigger: Exit-intent or scroll-triggered popup with short form',
            'Sticky sidebar: For long article pages, keeps contact accessible while reading',
          ],
        },
      ],
      faq: [
        {
          q: 'Should my contact form ask for email or phone number for Indian visitors?',
          a: 'Ask for both, but make phone optional and WhatsApp prominent. Indian business owners strongly prefer phone/WhatsApp communication over email for initial contact. However, having an email allows you to send follow-up information that\'s too long for WhatsApp. The best approach: required phone field + optional email field.',
        },
        {
          q: 'How do I reduce spam on my contact form?',
          a: 'Use honeypot fields (hidden fields visible only to bots), rate limiting (max 3 submissions per IP per hour), and Google reCAPTCHA v3 (invisible to users). Avoid text CAPTCHA — it dramatically reduces genuine submissions. FormBharat includes built-in spam protection that handles 99% of spam without user friction.',
        },
        {
          q: 'My contact form submissions are going to spam. How do I fix this?',
          a: 'This is a common issue with form notification emails. Fix it by: using a custom domain email for notifications (not Gmail), authenticating your domain with SPF and DKIM records, sending from a no-reply@yourdomain.com address, and asking your first few contacts to mark your confirmation email as "Not Spam".',
        },
      ],
      cta: {
        heading: 'Create your contact form in under 2 minutes',
        body: 'FormBharat\'s contact form templates are ready-made for Indian businesses. Embed on any website, connect to WhatsApp.',
      },
    },
    {
      slug: 'event-registration-form',
      title: 'Creating Event Registration Forms for Indian Events: A Complete Guide',
      description: 'Build event registration forms that handle RSVPs, payments, dietary preferences, and more. Templates for corporate events, workshops, and conferences.',
      readTime: '7 min',
      publishDate: '2024-03-26',
      tags: ['Event Registration', 'India', 'Events', 'RSVP'],
      intro: 'From Bengaluru tech meetups to Delhi corporate conferences and Mumbai wedding receptions — Indian event registration has moved online. A well-designed registration form reduces no-shows, helps in logistics planning, and creates a professional first impression. Here\'s how to build one that works.',
      sections: [
        {
          heading: 'Essential Fields for Every Indian Event Registration Form',
          body: 'The core information you need varies by event type, but some fields are universal. Here\'s the essential list, then the event-specific additions.',
          list: [
            'Full name (required)',
            'Mobile number (required — for WhatsApp updates and reminders)',
            'Email address (required — for confirmation and tickets)',
            'Organization/Company (for professional events)',
            'Designation/Role (for networking events — helps attendees introduce themselves)',
            'Number of attendees (for events allowing plus-ones)',
            'T-shirt size (for events with merchandise)',
            'Dietary preference (Vegetarian/Jain/Non-vegetarian/Vegan)',
          ],
        },
        {
          heading: 'Handling Paid Event Registrations',
          body: 'For paid events, your registration form needs to collect payment or serve as a payment gateway redirect. In India, UPI, credit/debit cards, and net banking are the primary payment methods. FormBharat integrates with Razorpay for seamless INR payment collection within the form.',
          list: [
            'Early bird pricing: Use conditional logic to apply different prices based on registration date',
            'Group discounts: Show price calculator for team registrations',
            'GST on event tickets: Collect GST number for B2B event registrations',
            'Confirmation email with payment receipt automatically sent',
            'Webhook to update your CRM/event management tool on payment',
          ],
        },
        {
          heading: 'WhatsApp Integration for Event Logistics',
          body: 'Indian event organizers using WhatsApp groups for attendee communication get better attendance rates. Use your registration form to automatically add confirmed attendees to a WhatsApp broadcast list.',
          list: [
            'Registration confirmation WhatsApp message sent instantly',
            'Location pin and agenda sent 24 hours before event',
            'Day-of reminder 2 hours before event start',
            'Post-event follow-up with recording link or materials',
            'Collect WhatsApp number explicitly (separate from phone for international attendees)',
          ],
        },
        {
          heading: 'Reducing Event No-Shows with Your Registration Form',
          body: 'The average no-show rate for free events in India is 40-60%. For paid events, it drops to 5-15%. These form and follow-up strategies help reduce no-shows for free events.',
          list: [
            'Ask for specific commitment: "Are you attending in-person?" vs passive RSVP',
            'Conditional registration confirmation: Phone OTP for free events (reduces casual RSVPs)',
            'Waitlist option: "Only 50 seats left" creates genuine FOMO',
            'Multiple reminder touchpoints: Email, WhatsApp, and SMS',
            'Request travel plan: "How are you traveling?" makes attendance feel real and planned',
          ],
        },
      ],
      faq: [
        {
          q: 'How do I create a registration form that handles multiple event sessions?',
          a: 'Use checkboxes or a multi-select dropdown for session selection. If different sessions have different capacities, use conditional logic to show a "Session Full" message or waitlist option when a session limit is reached. For conferences with parallel tracks, display a schedule matrix where registrants select their sessions.',
        },
        {
          q: 'Should I collect Aadhaar or PAN number for event registration?',
          a: 'Only collect government ID numbers when legally required (e.g., for certain government events or when age verification is mandatory). For most private events, collecting such sensitive information is unnecessary and may actually deter registrations. If required, clearly state why: "Required for venue security" or "Mandatory for government compliance".',
        },
      ],
      cta: {
        heading: 'Event registration forms ready in minutes',
        body: 'FormBharat\'s event templates include RSVP, payment collection, and automatic WhatsApp reminders.',
      },
    },
    {
      slug: 'job-application-form',
      title: 'Online Job Application Forms for Indian Recruiters: Best Practices',
      description: 'Build job application forms that attract quality candidates and streamline your hiring process. Templates for startups, SMEs, and enterprises in India.',
      readTime: '7 min',
      publishDate: '2024-04-03',
      tags: ['Job Application', 'Recruitment', 'HR', 'India'],
      intro: 'India processes millions of job applications every day. Most companies still rely on email attachments and manual screening — a process that wastes recruiter time and creates a poor candidate experience. Modern job application forms streamline the process for both sides. Here\'s how to build them right.',
      sections: [
        {
          heading: 'Why Indian Companies Should Move to Online Job Application Forms',
          body: 'Email-based applications create three problems: disorganized data (resumes in different formats scattered across email), manual screening (recruiter reads every email), and poor candidate experience (no acknowledgment, no tracking). Online forms solve all three.',
          list: [
            'Structured data: All applications in one place, filterable and searchable',
            'Automated screening: Reject unqualified applications automatically based on requirements',
            'Better candidate experience: Instant acknowledgment and status updates',
            'ATS integration: Connect to HR tools via webhook',
            'Analytics: See application volumes, source tracking, drop-off points',
          ],
        },
        {
          heading: 'Essential Job Application Form Fields',
          body: 'Balance thorough data collection with candidate experience. Long, tedious application forms drive away good candidates (who have options). Keep it to what you genuinely need for initial screening.',
          list: [
            'Personal: Full name, email, phone/WhatsApp',
            'Role: Position applying for, how heard about role',
            'Experience: Total years of experience, current company (optional), current CTC',
            'Qualification: Highest degree, institution (for roles requiring specific education)',
            'Location: Current city, open to relocation (Yes/No)',
            'Availability: Notice period, available from date',
            'Resume: File upload (PDF/DOC, max 2MB)',
            'Portfolio/LinkedIn: URL field (optional, for relevant roles)',
          ],
        },
        {
          heading: 'Pre-Screening with Conditional Logic',
          body: 'Use conditional form logic to pre-screen candidates without human involvement. Set minimum requirements and automatically show a disqualification message (politely) to candidates who don\'t meet them. This alone can save 5-10 hours of recruiter time per open position.',
          list: [
            'Minimum experience: If selected less than required, show "This role requires X years"',
            'Location requirements: If not in required city and not open to relocation, show notice',
            'Salary expectations: CTC range check — if outside budget, flag for review',
            'Skills screening: Checkbox list of required skills, flag if missing key ones',
            'Qualification filter: Show polite notice if degree doesn\'t match requirement',
          ],
        },
        {
          heading: 'Candidate Communication After Application',
          body: 'The biggest complaint Indian candidates have is silence after applying. Set up automated responses that keep candidates informed throughout the process.',
          list: [
            'Instant: "Thank you for applying. We have received your application for [Position]."',
            'Within 48 hours: "Your application is under review. Expected update by [date]."',
            'Shortlisted: "Congratulations! You\'ve been shortlisted. Please schedule an interview: [link]"',
            'Not selected: "We appreciate your interest. We\'ll keep your profile for future roles."',
          ],
        },
      ],
      faq: [
        {
          q: 'Should I collect current CTC in the job application form?',
          a: 'This is debated in India\'s hiring community. Collecting current CTC helps with quick budget alignment but can perpetuate pay gaps. Best practice: ask for "Expected CTC" and "Current CTC (Optional)". Some companies skip CTC questions entirely and discuss compensation during the interview, which often leads to better negotiation outcomes.',
        },
        {
          q: 'How do I handle bulk applications for high-volume roles?',
          a: 'For high-volume roles (100+ applications expected), add more filtering questions upfront: a specific technical question relevant to the role, or a scenario-based question. Candidates who thoughtfully answer these are more engaged. Use FormBharat\'s webhook integration to send applications to a spreadsheet for easy bulk review.',
        },
      ],
      cta: {
        heading: 'Modernize your hiring with online application forms',
        body: 'FormBharat\'s job application templates include auto-screening logic and candidate communication workflows.',
      },
    },
    {
      slug: 'vendor-onboarding-form',
      title: 'Vendor Onboarding Forms: Templates and Best Practices for Indian Businesses',
      description: 'Create vendor registration and onboarding forms that collect KYC, banking details, and compliance documents. Includes GST and MSME considerations.',
      readTime: '6 min',
      publishDate: '2024-04-10',
      tags: ['Vendor', 'Onboarding', 'KYC', 'India', 'Compliance'],
      intro: 'Vendor onboarding in India requires collecting a specific set of business documents and compliance information. From GSTIN verification to MSME certificates and bank account details, a structured vendor registration form streamlines procurement and reduces compliance risk.',
      sections: [
        {
          heading: 'What Every Indian Vendor Registration Form Must Collect',
          body: 'Indian vendor onboarding has specific regulatory and business requirements. Missing any of these fields creates compliance issues or payment delays down the line.',
          list: [
            'Business details: Company name, registered address, type of entity (Pvt Ltd/LLP/Partnership/Proprietorship)',
            'GSTIN: Mandatory for GST-registered vendors; exempt status for those below threshold',
            'PAN: Required for TDS deduction and payment processing',
            'MSME registration: Udyam Registration Number (for eligible vendors) — affects payment timelines',
            'Bank account: Account number, IFSC code, account name, bank name and branch',
            'Contact details: Primary contact name, designation, email, and WhatsApp',
            'Product/service category: What they supply (for internal routing)',
          ],
        },
        {
          heading: 'Document Upload Fields for KYC Compliance',
          body: 'Beyond text fields, Indian vendor forms need to collect compliance documents. Structure your file upload fields to be specific about what\'s required.',
          list: [
            'GST certificate (PDF, max 2MB)',
            'PAN card copy (PDF/JPG, max 1MB)',
            'Cancelled cheque or bank statement (for bank account verification)',
            'MSME certificate (Udyam) if applicable',
            'Certificate of Incorporation (for companies)',
            'Address proof (utility bill or rental agreement)',
          ],
        },
        {
          heading: 'Automating Vendor Onboarding with Form Workflows',
          body: 'Manual vendor onboarding takes 3-7 days in most Indian companies. With automated workflows triggered by your vendor registration form, you can cut this to under 24 hours.',
          list: [
            'Automatic acknowledgment email with reference number',
            'Internal notification to procurement team with vendor details',
            'Document checklist email to vendor: "Please upload the following within 48 hours"',
            'GSTIN verification webhook (connect to GST verification API)',
            'Final approval notification when onboarding is complete',
          ],
        },
        {
          heading: 'Keeping Vendor Information Up to Date',
          body: 'Vendor details change — people leave, bank accounts change, GSTIN gets updated. Build a yearly vendor detail refresh process into your onboarding form workflow.',
          list: [
            'Annual re-verification reminder sent automatically to all vendors',
            'Use unique vendor ID in form link for easy re-submission',
            'Version control: Keep history of previous submissions for audit trail',
            'Notification to accounts payable on any bank detail change',
          ],
        },
      ],
      faq: [
        {
          q: 'Is it legal to collect Aadhaar number in vendor onboarding forms?',
          a: 'Collecting Aadhaar in vendor forms is generally not required or recommended for business-to-business transactions. PAN is the standard business identifier. If you need individual identity proof for proprietorships, collect PAN rather than Aadhaar. Aadhaar collection is regulated under the Aadhaar Act 2016 and should only be done when legally mandated.',
        },
        {
          q: 'How do I verify GSTIN numbers collected in my vendor form?',
          a: 'The GST government portal provides a free GSTIN verification API. You can connect this to your FormBharat form via webhook to automatically validate GSTIN numbers in real-time. This prevents errors and fake GSTINs from entering your vendor database. The verification returns the registered business name, which you can cross-check against what the vendor provided.',
        },
      ],
      cta: {
        heading: 'Automate your vendor onboarding',
        body: 'FormBharat\'s vendor registration templates include document upload, auto-notifications, and compliance field validation.',
      },
    },
  ],
}
