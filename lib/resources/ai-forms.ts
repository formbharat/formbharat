import type { Pillar } from './types'

export const aiForms: Pillar = {
  slug: 'ai-form-generation',
  title: 'AI Form Generation',
  description: 'Learn how to use AI to build forms in seconds, automate field selection, and generate multilingual forms for Indian audiences.',
  icon: 'Sparkles',
  color: 'orange',
  tagline: 'Build forms in 10 seconds with AI',
  articles: [
    {
      slug: 'how-ai-form-generators-work',
      title: 'How AI Form Generators Work: A Complete Guide for Indian Businesses',
      description: 'Understand the technology behind AI form builders and how they can save your business hours every week.',
      readTime: '6 min read',
      publishDate: '2026-04-22',
      tags: ['AI', 'Form Builder', 'Productivity', 'SMB'],
      intro: 'AI form generators have changed how businesses create data collection forms. Instead of manually dragging fields and writing labels, you simply describe what you need in plain English — and the AI builds it instantly. Here\'s how it works and why it matters for Indian SMBs.',
      sections: [
        {
          heading: 'What is an AI Form Generator?',
          body: 'An AI form generator is a tool that takes a natural language description of the form you need and automatically creates a structured form with the right fields, labels, and validation rules. For example, you type "customer feedback form for my restaurant with food quality and service ratings" and the AI produces a ready-to-publish form in seconds.',
        },
        {
          heading: 'How the Technology Works',
          body: 'Modern AI form generators are powered by large language models (LLMs) like Meta\'s Llama or Anthropic\'s Claude. When you describe your form, the AI:\n1. Understands the context and purpose\n2. Identifies required fields (name, email, ratings, comments, etc.)\n3. Assigns appropriate field types (text, dropdown, radio buttons, etc.)\n4. Generates labels and placeholder text\n5. Returns a structured form JSON that the builder renders instantly.',
          list: [
            'Natural language understanding to parse your description',
            'Domain knowledge of common form patterns (feedback, registration, orders)',
            'Indian context awareness — understands local business needs',
            'JSON output that maps directly to form fields',
          ],
        },
        {
          heading: 'Why It Matters for Indian SMBs',
          body: 'Most small business owners in India don\'t have time to design forms from scratch. They need something that works immediately. AI form generation removes the learning curve entirely — if you can describe what you need in English or Hinglish, you can have a professional form ready in under 30 seconds.',
        },
        {
          heading: 'Limitations to Know',
          body: 'AI form generators are excellent for standard business forms but work best when given clear, specific descriptions. Very complex conditional logic or highly regulated forms (medical, legal) may still require manual review. Always verify the generated form matches your exact requirements before publishing.',
        },
      ],
      faq: [
        {
          q: 'Is AI form generation accurate?',
          a: 'Yes, for most standard business forms (feedback, registration, job applications, orders) the AI produces highly relevant fields. The more specific your description, the better the output.',
        },
        {
          q: 'Can I edit the AI-generated form?',
          a: 'Absolutely. The AI-generated form is a starting point — you can add, remove, or reorder fields using the drag-and-drop builder after generation.',
        },
        {
          q: 'Does it work in Hindi?',
          a: 'You can describe your form in English or Hinglish. Native Hindi and regional language generation is on our roadmap.',
        },
        {
          q: 'How many AI forms can I generate for free?',
          a: 'Guest users get 3 free generations. Registered users (free) get unlimited generations.',
        },
      ],
      cta: {
        heading: 'Try AI Form Generation Free',
        body: 'Describe your form and watch AI build it in 10 seconds. No credit card needed.',
      },
    },
    {
      slug: 'ai-form-prompts-for-indian-businesses',
      title: '50 AI Form Prompts for Indian Businesses (Copy-Paste Ready)',
      description: 'Ready-to-use AI prompts for generating forms across retail, education, events, services, and more Indian business categories.',
      readTime: '8 min read',
      publishDate: '2026-04-22',
      tags: ['AI Prompts', 'Templates', 'Indian Business', 'Form Ideas'],
      intro: 'The quality of your AI-generated form depends heavily on how well you describe it. These 50 copy-paste prompts are crafted specifically for Indian business contexts — from kirana stores to coaching institutes to event planners.',
      sections: [
        {
          heading: 'Retail & E-commerce',
          body: 'These prompts work for physical stores, online sellers, and product businesses.',
          list: [
            'Customer feedback form for my saree shop with product quality, staff behaviour, and overall rating',
            'Product order form for handmade pickle business with flavour selection, quantity, and delivery address',
            'Return and exchange request form for clothing store with order ID, reason, and photo upload',
            'New customer registration form for electronics store with name, phone, email, and purchase preferences',
            'Wholesale inquiry form for my FMCG distribution business with company name, location, and product categories',
          ],
        },
        {
          heading: 'Education & Coaching',
          body: 'Perfect for schools, tuition centres, coaching institutes, and online courses.',
          list: [
            'Student enrollment form for Class 10 maths tuition with student name, parent contact, board, and weak subjects',
            'Parent feedback form for school with teacher performance, infrastructure, and suggestions fields',
            'Online course registration for Python programming with qualification, experience level, and payment mode',
            'Scholarship application form with academic records, family income, and essay fields',
            'Workshop registration for digital marketing with profession, company, and learning goals',
          ],
        },
        {
          heading: 'Events & Hospitality',
          body: 'For event organisers, caterers, wedding planners, and venue managers.',
          list: [
            'Wedding catering inquiry form with date, guest count, cuisine preferences, and budget range',
            'Corporate event registration with company name, number of attendees, dietary preferences, and session choices',
            'Venue booking inquiry for conference hall with event type, expected attendance, and AV requirements',
            'Post-event feedback survey with ratings for food, venue, organisation, and overall experience',
            'Speaker proposal form for tech conference with bio, topic, abstract, and past speaking experience',
          ],
        },
        {
          heading: 'Healthcare & Wellness',
          body: 'For clinics, gyms, yoga studios, and wellness practitioners.',
          list: [
            'New patient registration for dental clinic with medical history, insurance details, and chief complaint',
            'Gym membership inquiry with fitness goals, current activity level, preferred timing, and contact details',
            'Yoga class registration with experience level, health conditions, and preferred batch',
            'Health screening form for corporate camp with employee ID, medical history, and current medications',
          ],
        },
        {
          heading: 'Professional Services',
          body: 'For consultants, agencies, freelancers, and B2B service providers.',
          list: [
            'Client onboarding form for CA firm with business type, turnover, compliance requirements, and documents',
            'Project inquiry form for web development agency with project type, budget, timeline, and tech stack preference',
            'Job application form for software engineer position with experience, skills, notice period, and expected CTC',
            'Vendor registration form for supply chain with company details, GST number, product categories, and certifications',
          ],
        },
      ],
      faq: [
        {
          q: 'How specific should my prompt be?',
          a: 'The more specific, the better. Include the type of business, purpose of the form, and key fields you need. "Customer feedback form for restaurant" works, but "Customer feedback form for South Indian restaurant with food taste, service speed, cleanliness, and staff behaviour ratings" generates a much more relevant form.',
        },
        {
          q: 'Can I mix English and Hindi in my prompt?',
          a: 'Yes. Hinglish prompts like "meri kirana dukaan ke liye customer feedback form" work well with the AI.',
        },
      ],
      cta: {
        heading: 'Generate Your Form Now',
        body: 'Copy any prompt above, paste it into the AI generator, and get your form in 10 seconds.',
      },
    },
    {
      slug: 'ai-vs-manual-form-building',
      title: 'AI vs Manual Form Building: Which is Better for Your Business?',
      description: 'A practical comparison of AI-generated forms vs manually built forms — when to use each approach for Indian SMBs.',
      readTime: '5 min read',
      publishDate: '2026-04-22',
      tags: ['AI', 'Form Builder', 'Comparison', 'Best Practices'],
      intro: 'Should you use AI to generate your form or build it manually? The answer depends on your use case, time constraints, and how specific your requirements are. This guide helps you decide.',
      sections: [
        {
          heading: 'When to Use AI Form Generation',
          body: 'AI form generation is ideal for most standard business forms. Choose AI when:',
          list: [
            'You need a form ready in the next 5 minutes',
            'You\'re not sure what fields to include for your use case',
            'You\'re building a standard form (feedback, registration, inquiry, job application)',
            'You want to start with a solid base and customize from there',
            'You\'re exploring what a form for a new use case might look like',
          ],
        },
        {
          heading: 'When to Build Manually',
          body: 'Manual building gives you precise control. Choose manual when:',
          list: [
            'Your form has complex conditional logic (show/hide fields based on answers)',
            'You need very specific field configurations or validation rules',
            'You\'re replicating an existing paper form exactly',
            'The form is for a highly regulated context (legal, medical, government)',
            'You need to match your company\'s exact terminology and branding',
          ],
        },
        {
          heading: 'The Best Approach: AI + Manual',
          body: 'For most Indian SMBs, the best workflow is: generate with AI first, then refine manually. This combines the speed of AI with the precision of manual editing. You\'ll have a working form in 10 seconds, and spend 2-3 minutes fine-tuning rather than 20 minutes building from scratch.',
        },
        {
          heading: 'Time Comparison',
          body: 'On average, building a 10-field form takes 15-20 minutes manually. With AI generation and manual refinement, the same form takes 3-5 minutes. For a business creating 5 forms per month, that\'s 1-2 hours saved.',
        },
      ],
      faq: [
        {
          q: 'Are AI-generated forms as good as manually built ones?',
          a: 'For standard forms, yes — often better, because AI applies best practices automatically. For complex or highly customised forms, AI provides a strong starting point that you refine manually.',
        },
        {
          q: 'Can I switch between AI and manual modes?',
          a: 'Yes. You generate the form with AI, and it opens directly in the drag-and-drop builder where you can make any changes.',
        },
      ],
      cta: {
        heading: 'Try the AI Generator',
        body: 'Generate a form in 10 seconds and see the difference yourself.',
      },
    },
  ],
}
