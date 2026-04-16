import type { Pillar } from './types'

export const formDesign: Pillar = {
  slug: 'form-design',
  title: 'Form Design & Conversion Optimization',
  description: 'Design online forms that people actually complete. Proven UX principles and conversion optimization strategies for Indian audiences.',
  icon: '🎨',
  color: 'purple',
  tagline: 'Beautiful forms get more responses',
  articles: [
    {
      slug: 'multi-step-forms-guide',
      title: 'Multi-Step Forms: The Complete Guide to Building Conversational Forms',
      description: 'Learn why multi-step forms convert 2x better than single-page forms and how to build them. Includes best practices, logic, and real examples.',
      readTime: '8 min',
      publishDate: '2024-03-16',
      tags: ['Multi-Step Forms', 'UX', 'Conversion', 'Form Design'],
      intro: 'Multi-step forms consistently outperform traditional single-page forms by 50-300% in completion rate. The reason is psychological: breaking a complex form into small steps reduces perceived effort and creates a commitment escalation that keeps users engaged. This guide covers everything you need to build effective multi-step forms with FormBharat.',
      sections: [
        {
          heading: 'Why Multi-Step Forms Work: The Psychology Behind Them',
          body: 'Three psychological principles make multi-step forms superior: the Sunk Cost Effect (users who complete step 1 feel invested and continue), Chunking (breaking information into groups reduces cognitive load), and Commitment Escalation (small commitments build toward bigger ones). Understanding these helps you structure your steps strategically.',
          list: [
            'Sunk Cost Effect: After filling 2 steps, users feel they\'ve invested time — they keep going',
            'Chunking: 3 questions per page feels manageable; 12 questions on one page feels overwhelming',
            'Progress bar: Seeing "Step 2 of 4" motivates completion (Zeigarnik effect)',
            'Question ordering: Start easy, end with contact details — commitment builds gradually',
            'Mobile UX: Fewer fields per screen means less scrolling on mobile devices',
          ],
        },
        {
          heading: 'When to Use Multi-Step Forms (And When Not To)',
          body: 'Multi-step forms are not always the right choice. Use them when forms have 6+ fields, when you want to qualify leads progressively, or when user experience matters more than speed of completion. For very short forms (2-3 fields), single-step performs better.',
          list: [
            'Use multi-step: Lead generation with qualification (6+ fields)',
            'Use multi-step: Job applications and vendor registrations',
            'Use multi-step: Complex surveys with conditional branching',
            'Use multi-step: Checkout forms and booking flows',
            'Skip multi-step: Simple newsletter signups (name + email)',
            'Skip multi-step: Quick CSAT surveys (1-3 questions)',
            'Skip multi-step: Contact forms where speed is more important than qualification',
          ],
        },
        {
          heading: 'Structuring Your Multi-Step Form: The 4-Step Framework',
          body: 'The most effective multi-step forms follow a specific psychological arc. Start by building rapport (easy questions about their needs), then qualify (questions that help you understand their situation), collect contact details (after they\'re engaged), and close with a confirmation that sets expectations.',
          list: [
            'Step 1 — Engage: Ask about their goal or need (easy, low commitment)',
            'Step 2 — Qualify: Ask about timeline, budget, or context (medium commitment)',
            'Step 3 — Connect: Collect name, phone, email (high commitment — but earned)',
            'Step 4 — Confirm: Show a custom thank-you with next steps',
          ],
        },
        {
          heading: 'Progress Indicators and Navigation in Multi-Step Forms',
          body: 'A visible progress indicator increases completion rates by 20-28%. Users need to know how far they\'ve come and how much is left. FormBharat\'s multi-step forms include a built-in progress bar and step indicators.',
          list: [
            'Show a progress bar at the top of each step',
            'Label steps: "Step 2 of 4" is clearer than an unlabeled bar',
            'Allow backward navigation — users need to review and edit previous answers',
            'Save progress for longer forms (critical for forms on slow connections)',
            'Don\'t use "Next" — use action-oriented button copy: "See pricing" or "Continue to contact"',
          ],
        },
        {
          heading: 'Adding Conditional Logic to Multi-Step Forms',
          body: 'Conditional logic (also called skip logic or branching) makes your multi-step form smarter by showing different questions based on previous answers. This is what separates good multi-step forms from great ones. A real estate form that shows apartment questions to buyers and land questions to investors creates a far more relevant experience.',
          list: [
            'Show/hide fields based on a previous answer',
            'Skip entire steps based on a qualifying answer',
            'Route different user types to different form paths',
            'Show different thank-you pages based on lead score',
            'Calculate a score or recommendation based on responses',
          ],
        },
        {
          heading: 'Measuring Multi-Step Form Performance',
          body: 'The biggest advantage of multi-step forms over single-page forms is visibility into where users drop off. FormBharat\'s analytics shows completion rates at each step — so you can see exactly which question is causing abandonment and fix it.',
          list: [
            'Completion rate per step: Identifies the "leaky bucket" in your form',
            'Overall completion rate: Target 40-60% for qualification forms, 70%+ for short surveys',
            'Average time per step: High time on a step indicates a confusing question',
            'Device split: High mobile drop-off suggests form isn\'t mobile-optimized',
            'A/B test question order: Small changes in sequence can have big impact on completion',
          ],
        },
      ],
      faq: [
        {
          q: 'How many steps should a multi-step form have?',
          a: 'For lead generation forms, 3-4 steps is the sweet spot. For complex onboarding or application forms, up to 6-7 steps is acceptable. Beyond 7 steps, completion rates drop significantly. If you need more than 7 steps, consider breaking the form into multiple separate sessions with email/SMS completion prompts.',
        },
        {
          q: 'Do multi-step forms affect SEO?',
          a: 'Multi-step forms themselves don\'t directly affect SEO, but they improve user engagement metrics (time on page, lower bounce rate) which are positive SEO signals. More importantly, higher completion rates mean more leads and conversions. The page hosting the form should still have strong SEO-optimized content around it.',
        },
        {
          q: 'Can I save and resume a multi-step form?',
          a: 'FormBharat supports session-based form saving, which means if a user navigates away and returns in the same browser session, their progress is preserved. For longer forms where you want to allow completion across different sessions, enable the "Email form link" option which sends users a unique link to resume where they left off.',
        },
      ],
      cta: {
        heading: 'Build your first multi-step form today',
        body: 'FormBharat\'s drag-and-drop builder makes multi-step forms with conditional logic easy to create — no coding required.',
      },
    },
    {
      slug: 'mobile-friendly-forms',
      title: 'How to Create Mobile-Friendly Forms: The India Guide',
      description: 'Over 65% of Indian internet users are mobile-first. Learn how to design forms that work perfectly on every smartphone.',
      readTime: '6 min',
      publishDate: '2024-03-24',
      tags: ['Mobile', 'Form Design', 'UX', 'India'],
      intro: 'India has over 700 million smartphone users. For the majority of them, a ₹8,000-₹15,000 Android device is their primary — and often only — internet device. If your form doesn\'t work flawlessly on a mid-range Android, you are losing more than half your potential respondents. Here is how to design truly mobile-first forms.',
      sections: [
        {
          heading: 'The Mobile Reality in India: What You\'re Designing For',
          body: 'Before designing a mobile form, understand your audience\'s devices and connectivity. Indian mobile users are diverse — from iPhone 15 Pro users in Bengaluru to Redmi Note 7 users in Tier-3 cities. Design for the lowest common denominator.',
          list: [
            'Median Indian Android screen: 360-390px wide',
            'Average mobile connection: 4G with speeds of 15-20 Mbps (but with frequent drops)',
            'Popular browsers: Chrome (68%), Samsung Internet (15%), Chrome Lite/Data Saver mode',
            'Battery-conscious users: Many browse with battery saver on, which disables JavaScript heavy features',
            'One-handed usage is the norm: Right thumb reach determines comfortable tap zones',
          ],
        },
        {
          heading: 'Touch Target Size and Spacing Rules',
          body: 'The most common mobile form problem: touch targets too small to tap accurately. Apple\'s Human Interface Guidelines and Google\'s Material Design both recommend minimum 44×44px touch targets. For forms on mid-range Android devices, going slightly larger (48×56px) improves accuracy for users with larger thumbs.',
          list: [
            'Minimum button height: 48px (ideal 56px for primary CTA)',
            'Input field height: Minimum 44px — users need room to see what they\'re typing',
            'Spacing between form elements: Minimum 16px to prevent accidental taps',
            'Checkbox/radio size: At least 24×24px with 16px spacing around label',
            'Submit button: Full-width on mobile for easy one-thumb tap',
          ],
        },
        {
          heading: 'Keyboard Optimization: Use the Right Input Type',
          body: 'One of the most overlooked mobile form optimizations is using the correct HTML input type. The right type triggers the right keyboard, reducing friction dramatically. FormBharat automatically applies the correct input types.',
          list: [
            'Phone numbers: type="tel" — triggers numeric keypad',
            'Email: type="email" — triggers keyboard with @ and .com keys',
            'Numbers: type="number" — triggers numeric keypad with decimal',
            'Date: type="date" — triggers native date picker (no manual typing)',
            'PIN/OTP: type="number" with inputmode="numeric" — best for OTP fields',
          ],
        },
        {
          heading: 'Form Length and Scrolling on Mobile',
          body: 'Mobile users are far less tolerant of long scrolling forms than desktop users. The thumb fatigue from scrolling through a long form is a real conversion barrier. Follow these rules to keep mobile forms concise.',
          list: [
            'Show no more than 2-3 form fields in the initial viewport without scrolling',
            'Use multi-step forms for anything with 5+ fields',
            'Avoid horizontal scrolling entirely — it breaks the experience',
            'Test every form by actually filling it on a 360px screen',
            'Place submit button at the bottom but also add a floating CTA for long forms',
          ],
        },
        {
          heading: 'Low Bandwidth Optimization for Tier-2 and Tier-3 India',
          body: 'Tier-2 and Tier-3 city users often have slower, less reliable connections. Forms that depend on heavy JavaScript, large images, or CDN-hosted assets fail for these users.',
          list: [
            'Forms should load in under 2 seconds on a 3G connection',
            'Avoid heavy background images in embedded forms',
            'Use system fonts where possible to reduce font loading time',
            'Test with Chrome\'s "Slow 3G" throttling in DevTools',
            'FormBharat forms are optimized for low-bandwidth — average load time 0.8s',
          ],
        },
      ],
      faq: [
        {
          q: 'Should I build a separate mobile version of my form?',
          a: 'No — build one responsive form that adapts to any screen size. Maintaining two versions doubles your work and creates inconsistencies. FormBharat forms are responsive by default and automatically adapt layout, field sizes, and spacing based on screen width.',
        },
        {
          q: 'How do I test my form on mobile without owning every device?',
          a: 'Use Chrome DevTools\' device emulation (F12 → Device icon → Select device). Test on at least: iPhone SE (375px), Samsung Galaxy A series (360px), and a large Android like OnePlus (412px). For the most accurate test, physically hand your phone to a non-technical colleague and watch where they struggle.',
        },
        {
          q: 'Does autocomplete work on mobile forms in India?',
          a: 'Yes, but with nuances. Name, email, and phone fields support autocomplete on modern Android and iOS. For Indian phone numbers, enable autocomplete with appropriate autocomplete attributes. However, many Indian users disable or don\'t use password managers, so don\'t rely on autocomplete for critical fields.',
        },
      ],
      cta: {
        heading: 'Create mobile-first forms instantly',
        body: 'All FormBharat forms are mobile-optimized by default. Test on any device and deploy in minutes.',
      },
    },
    {
      slug: 'reduce-form-abandonment',
      title: 'How to Reduce Form Abandonment: 12 Proven Strategies',
      description: 'Stop losing potential customers halfway through your forms. Proven techniques to reduce drop-off rates and recover abandoned forms.',
      readTime: '7 min',
      publishDate: '2024-04-02',
      tags: ['Form Abandonment', 'Conversion', 'UX', 'Optimization'],
      intro: 'The average online form abandonment rate is 68%. That means for every 3 people who start your form, only 1 completes it. For Indian businesses with paid traffic, this is money left on the table. Here are 12 proven strategies to plug the leaks in your form funnel.',
      sections: [
        {
          heading: 'Why People Abandon Forms: The Top 7 Reasons',
          body: 'Understanding why people leave your form is the first step to fixing it. These are the most common abandonment triggers, ranked by frequency.',
          list: [
            '1. Too many fields — "I don\'t have time for this"',
            '2. Unexpected required fields — "Why do you need my company\'s GST number?"',
            '3. Privacy concerns — "What will you do with my phone number?"',
            '4. Technical issues — Form not loading, errors, slow page speed',
            '5. Forced account creation — "I just want to contact you, not create an account"',
            '6. Non-mobile-friendly — Painful to fill on smartphone',
            '7. Distraction — Phone rang, boss walked in, session expired',
          ],
        },
        {
          heading: 'Strategy 1-4: Reducing Friction Before the Form',
          body: 'The best abandonment reduction starts before users even begin filling the form. Set the right expectations with clear copy, social proof, and a trust-building introduction.',
          list: [
            'Strategy 1: Show field count upfront — "Takes 90 seconds — just 5 questions"',
            'Strategy 2: Add a privacy micro-copy below email field: "No spam, ever"',
            'Strategy 3: Display social proof near the form: "Trusted by 5,000+ Indian businesses"',
            'Strategy 4: Remove navigation links from the form page to eliminate distraction',
          ],
        },
        {
          heading: 'Strategy 5-8: Improving the Form Experience',
          body: 'Once users start filling, the experience must be smooth and frictionless. These strategies address the in-form experience.',
          list: [
            'Strategy 5: Show inline validation — don\'t wait until submit to show errors',
            'Strategy 6: Make only truly necessary fields required (mark optional fields clearly)',
            'Strategy 7: Allow saving progress for long forms — email link to resume',
            'Strategy 8: Use smart defaults and autofill for known information',
          ],
        },
        {
          heading: 'Strategy 9-12: Recovering Abandoned Forms',
          body: 'Even with the best form design, some users will abandon. These recovery strategies bring them back.',
          list: [
            'Strategy 9: Exit-intent popup — "Wait! Need help filling the form?" with support contact',
            'Strategy 10: Partial submission save — save data entered so far and follow up',
            'Strategy 11: Retargeting — show ads to users who abandoned your form',
            'Strategy 12: WhatsApp recovery — if you have their number from a previous visit, follow up',
          ],
        },
      ],
      faq: [
        {
          q: 'What is the average form completion rate I should aim for?',
          a: 'Targets vary by form type: lead generation forms 15-25%, contact forms 40-60%, checkout forms 60-80%, event registration 50-70%, surveys 20-40%. The most important metric is relative improvement over your current rate — any increase in completion directly impacts revenue.',
        },
        {
          q: 'Should I remove the "Reset" or "Clear" button from my forms?',
          a: 'Yes, absolutely remove the Reset/Clear button. Research shows users rarely use it intentionally but frequently click it by mistake, losing all their entered data. This is one of the easiest single-change improvements you can make — removing Reset buttons typically increases completion rates by 3-8%.',
        },
      ],
      cta: {
        heading: 'Build forms people actually complete',
        body: 'FormBharat\'s form analytics shows exactly where users drop off. Identify and fix abandonment in minutes.',
      },
    },
    {
      slug: 'form-fields-best-practices',
      title: 'Form Fields Best Practices: A Complete Guide to Every Field Type',
      description: 'The definitive guide to using form fields correctly. When to use dropdowns vs radio buttons, how to handle phone numbers in India, and more.',
      readTime: '6 min',
      publishDate: '2024-04-08',
      tags: ['Form Fields', 'UX', 'Design', 'Best Practices'],
      intro: 'Form field choice is one of the most consequential design decisions you make. The wrong field type creates friction; the right one feels invisible. This guide covers every major form field type and when to use each one.',
      sections: [
        {
          heading: 'Text Fields: When to Use Them and When to Replace Them',
          body: 'Text fields are the most flexible but the most error-prone field type. For structured data (phone, pincode, dates), always replace text fields with specialized inputs. For truly open-ended responses, text fields (or textarea for longer answers) are the right choice.',
          list: [
            'Use for: Name, company name, address, open-ended answers',
            'Replace with dropdown for: State, country, known options with 5+ choices',
            'Replace with tel type for: Phone numbers',
            'Replace with email type for: Email addresses',
            'Replace with date picker for: Dates',
          ],
        },
        {
          heading: 'Dropdowns vs Radio Buttons: The Decision Framework',
          body: 'The rule: use radio buttons when options are 2-5, use a dropdown when options are 6+. But there are nuances. Radio buttons show all options at once (helping users who don\'t know all options), while dropdowns save space on mobile.',
          list: [
            '2-4 options, important choice: Radio buttons (all visible)',
            '5-7 options, moderate importance: Either works — test both',
            '8+ options: Dropdown (search-enabled for very long lists)',
            'Yes/No questions: Toggle or radio buttons, never dropdown',
            'Indian states: Searchable dropdown (28 states + 8 UTs = dropdown territory)',
          ],
        },
        {
          heading: 'Phone Number Fields: The India-Specific Guide',
          body: 'Phone numbers in India have unique characteristics. Mobile numbers are 10 digits. Some users prefix with +91 or 0. Business landlines have 2-4 digit STD codes. Here is how to handle all scenarios gracefully.',
          list: [
            'Use type="tel" for proper mobile keyboard',
            'Add a +91 prefix selector or default placeholder "+91"',
            'Validate: Indian mobile numbers start with 6, 7, 8, or 9',
            'Accept both formats: 9876543210 and +919876543210',
            'Optionally add OTP verification for high-value form submissions',
          ],
        },
        {
          heading: 'Checkboxes vs Multi-Select: Choosing the Right Multiple-Choice Field',
          body: 'When users can select multiple options, you have two main choices: checkboxes (for 2-8 options) and multi-select dropdowns (for 8+ options). Checkboxes are almost always better on mobile — multi-select dropdowns are notoriously difficult to use on touchscreens.',
          list: [
            'Use checkboxes for: Up to 8 options on mobile',
            'Use multi-select dropdown for: 10+ options on desktop',
            'Use tag input for: Truly open-ended multi-select (interests, skills, etc.)',
            'Consider image checkboxes for: Visual choices (form templates, product variants)',
          ],
        },
      ],
      faq: [
        {
          q: 'Should form fields be left-aligned or centered?',
          a: 'Left-aligned labels and fields are easier to read and fill because they follow natural reading direction. Centered forms look elegant in design mockups but perform worse in usability studies. Use full-width fields in a single column on mobile, and single-column layout even on desktop for most forms.',
        },
        {
          q: 'How should I handle Indian names in form fields?',
          a: 'Use a single "Full Name" field rather than separate First Name and Last Name fields for Indian audiences. Indian naming conventions are highly diverse — many south Indian names don\'t follow a first/last structure. A single name field respects this diversity and reduces friction. Avoid limiting characters (some names are long).',
        },
      ],
      cta: {
        heading: 'FormBharat supports all field types',
        body: 'From simple text to conditional multi-step flows — build any form you need with our drag-and-drop builder.',
      },
    },
  ],
}
