import type { Pillar } from './types'

export const formAnalytics: Pillar = {
  slug: 'form-analytics',
  title: 'Form Analytics & Data Management',
  description: 'Measure, analyse, and improve your forms. Learn to track completion rates, export data, and integrate with your tools for maximum impact.',
  icon: '📈',
  color: 'indigo',
  tagline: 'Data-driven forms perform better',
  articles: [
    {
      slug: 'form-completion-rate',
      title: 'How to Improve Your Form Completion Rate: A Data-Driven Guide',
      description: 'Learn how to diagnose low form completion rates and systematically improve them. Includes benchmarks, analytics setup, and optimization strategies.',
      readTime: '8 min',
      publishDate: '2024-03-23',
      tags: ['Form Analytics', 'Completion Rate', 'Optimization', 'Conversion'],
      intro: 'Your form completion rate is the percentage of visitors who start filling your form and successfully submit it. The industry average is 20-30% — meaning 7 out of 10 people who start your form never finish it. Improving this number is one of the highest-leverage activities in digital marketing. Here is a systematic approach.',
      sections: [
        {
          heading: 'Understanding Your Form Completion Funnel',
          body: 'Before you can improve completion rate, you need to measure it accurately. Most businesses only see the total submissions, not the drop-off at each stage. FormBharat\'s analytics shows you exactly where people abandon.',
          list: [
            'Form view rate: % of page visitors who even see the form',
            'Form start rate: % of form viewers who click the first field',
            'Step completion rates: % completing each step (for multi-step forms)',
            'Form submission rate: % of starters who successfully submit',
            'Error rate: % of submissions that trigger validation errors',
          ],
        },
        {
          heading: 'Industry Benchmarks for Form Completion Rates',
          body: 'Context matters when evaluating your form performance. A 15% completion rate might be excellent for a long B2B qualification form but terrible for a simple newsletter signup. Use these benchmarks to set realistic goals.',
          list: [
            'Newsletter/email signup: 25-45% (very short, low commitment)',
            'Contact forms: 40-65% (moderate length, high intent visitors)',
            'Lead generation forms: 15-30% (depends on form length and traffic quality)',
            'Job applications: 20-40% (varies by role level and industry)',
            'Event registration (free): 55-75% (high intent, specific visitors)',
            'Survey/feedback: 20-40% (depends on relationship and incentive)',
            'Checkout/order forms: 60-80% (highest intent possible)',
          ],
        },
        {
          heading: 'The 5 Most Common Completion Rate Killers',
          body: 'If your completion rate is below benchmark, it is almost certainly caused by one of these five issues. Start with the most common (too many fields) and work down the list.',
          list: [
            '1. Too many fields: Audit your form. Remove every field that is "nice to have" and keep only "need to have"',
            '2. Required fields that feel intrusive: "Why do you need my date of birth?" — Make sensitive fields optional',
            '3. Error messages after submission: Show inline validation as users type, not after submit',
            '4. Confusing question wording: Read each question out loud. If it sounds awkward, rewrite it',
            '5. Poor mobile experience: Complete your own form on a ₹8,000 Android. Fix everything that frustrates you',
          ],
        },
        {
          heading: 'The Conversion Rate Optimization Cycle for Forms',
          body: 'Improving form completion is an ongoing process, not a one-time fix. Follow this 4-step cycle every month.',
          list: [
            'Step 1 — Measure: Check completion rate and step-by-step drop-off in FormBharat analytics',
            'Step 2 — Diagnose: Identify the biggest drop-off point (which field or step)',
            'Step 3 — Hypothesize: Form a specific hypothesis ("Removing the company size field will increase step 2 completion")',
            'Step 4 — Test: A/B test the change with at least 100 submissions in each variant',
          ],
        },
        {
          heading: 'Using Heatmaps and Session Recordings for Form Analysis',
          body: 'FormBharat analytics shows aggregate completion data. For deeper diagnosis, combine with tools like Microsoft Clarity (free) or Hotjar to see exactly how individual users interact with your form — where they pause, where they scroll back, where they give up.',
          list: [
            'Heatmap: See which fields get the most focus and which are ignored',
            'Session recording: Watch real users fill your form (anonymized)',
            'Scroll depth: See how far down the page users scroll before giving up',
            'Click map: Identify if users are trying to click something that isn\'t clickable',
            'Rage clicks: Areas where users click multiple times in frustration',
          ],
        },
        {
          heading: 'Quick Wins: Changes That Improve Completion in Under 30 Minutes',
          body: 'Not all improvements require a long A/B test cycle. These are reliably positive changes based on thousands of form optimization experiments.',
          list: [
            'Change "Submit" to action-oriented button copy (specific to your form)',
            'Remove reset/clear button if present',
            'Add a clear privacy statement below contact fields',
            'Make optional fields obviously optional (label them "(optional)")',
            'Add expected response time: "We\'ll get back to you within 2 hours"',
            'Show number of submissions as social proof: "Join 2,400 businesses"',
          ],
        },
      ],
      faq: [
        {
          q: 'How do I track form completion rate in Google Analytics?',
          a: 'Set up a Google Analytics goal triggered by the thank-you page URL or by the form submission event. In GA4, use "Event" tracking for form_submit events. FormBharat supports Google Analytics event tracking natively — enable it in form settings and all submissions are tracked automatically without code. This lets you see completion rate segmented by traffic source, device, and location.',
        },
        {
          q: 'My form completion rate dropped suddenly. What could cause this?',
          a: 'Sudden drops are usually caused by: a technical issue (form not loading or submitting), a recent form change that broke something, a change in traffic source (lower-quality traffic), or a seasonal factor. Check FormBharat\'s form status page first. Then check if any form changes were made recently. Finally, check your Analytics traffic sources for composition changes.',
        },
        {
          q: 'Does making fields optional really improve completion rate significantly?',
          a: 'Yes, significantly. Research across thousands of forms shows that changing a required field to optional (while keeping it on the form) reduces abandonment at that field by 15-25%. The field still collects data from users who are happy to provide it, but removes the barrier for those who are not. Most forms have at least 2-3 fields that are genuinely optional and incorrectly marked as required.',
        },
      ],
      cta: {
        heading: 'See exactly where your form loses people',
        body: 'FormBharat\'s built-in analytics shows step-by-step completion data. Identify and fix drop-off points instantly.',
      },
    },
    {
      slug: 'form-data-export',
      title: 'How to Export and Analyse Form Data: A Complete Guide',
      description: 'Export form responses to CSV, Excel, or connect to Google Sheets. Learn how to analyse form data to make better business decisions.',
      readTime: '6 min',
      publishDate: '2024-03-29',
      tags: ['Data Export', 'CSV', 'Google Sheets', 'Analytics', 'Forms'],
      intro: 'Form data is only valuable if you can access, analyse, and act on it. Leaving responses buried in your form tool without exporting or connecting them to your workflow is like collecting gold and keeping it locked in a vault. This guide covers every way to extract maximum value from your FormBharat data.',
      sections: [
        {
          heading: 'Export Options: CSV, Excel, and Google Sheets',
          body: 'FormBharat supports multiple export formats to fit your workflow. Choose based on what you plan to do with the data.',
          list: [
            'CSV export: Universal format, works with any tool — best for one-time data pulls',
            'Excel (XLSX): Preserves formatting, formulas work immediately — best for non-technical teams',
            'Google Sheets sync: Real-time sync, collaborative editing — best for ongoing data analysis',
            'JSON export: Raw data format — best for developers building on top of form data',
            'Zapier/webhook: Automatic real-time export to 5,000+ apps — best for automated workflows',
          ],
        },
        {
          heading: 'Setting Up Google Sheets Real-Time Sync',
          body: 'The most powerful data integration for Indian businesses is real-time Google Sheets sync. Every form submission instantly appears as a new row in your spreadsheet, allowing your entire team to monitor responses without logging into FormBharat.',
          list: [
            'Connect once: FormBharat → Integrations → Google Sheets → Authenticate',
            'Map form fields to spreadsheet columns',
            'New submissions appear in real-time (within 5 seconds)',
            'Set up Google Sheets notifications for new rows',
            'Share the spreadsheet with sales team for immediate follow-up',
          ],
        },
        {
          heading: 'Analysing Form Responses in Excel/Google Sheets',
          body: 'Once your data is exported, basic Excel/Sheets analysis turns raw responses into actionable insights. You do not need to be a data analyst to do this.',
          list: [
            'COUNTIF for categorical fields: Count how many said "B2B" vs "B2C"',
            'AVERAGE for numeric fields: Average budget, rating, or score',
            'Pivot tables: Cross-tabulate any two fields (e.g., industry vs budget)',
            'Conditional formatting: Highlight responses that meet specific criteria',
            'Charts: Visualize rating distributions and response trends over time',
          ],
        },
        {
          heading: 'Data Cleaning Best Practices for Indian Form Data',
          body: 'Indian form data has specific quirks that need cleaning before analysis. Phone numbers come in multiple formats, names may include honorifics, and cities are often spelled inconsistently.',
          list: [
            'Phone numbers: Standardize to 10-digit format without +91 or leading 0',
            'Email: Convert to lowercase, trim spaces',
            'City names: Bengaluru/Bangalore, Mumbai/Bombay — standardize to one form',
            'Names: Remove Dr./Mr./Mrs. prefixes if not needed for analysis',
            'Duplicate submissions: Use phone/email to detect and flag duplicates',
          ],
        },
      ],
      faq: [
        {
          q: 'How far back can I export form data from FormBharat?',
          a: 'FormBharat stores all form submissions indefinitely on paid plans. Free plan data is retained for 6 months. You can export all historical data at any time, filtered by date range if needed. For compliance purposes, FormBharat also maintains an audit trail of all data access and exports.',
        },
        {
          q: 'Can I automatically send form data to my CRM?',
          a: 'Yes. FormBharat integrates with popular CRMs including Zoho CRM, HubSpot, and Salesforce via direct integration or Zapier. When a form is submitted, the contact and form data are automatically created or updated in your CRM. This eliminates manual data entry and ensures every lead is immediately in your pipeline.',
        },
        {
          q: 'How do I handle GDPR and personal data in exported form data?',
          a: 'For Indian businesses, the Personal Data Protection Bill guidelines apply. Best practices: only collect data you actually use, anonymize data before sharing it with third parties, set up automatic deletion of old form data after your retention period, and always store exported data in password-protected files. FormBharat allows you to configure data retention periods and delete individual respondent data on request.',
        },
      ],
      cta: {
        heading: 'Connect your forms to your workflow',
        body: 'FormBharat integrates with Google Sheets, CRMs, and 5,000+ tools. Real-time data, zero manual work.',
      },
    },
    {
      slug: 'webhook-integration-guide',
      title: 'Setting Up Webhooks: Integrate Your Forms with Any Tool',
      description: 'Step-by-step guide to setting up form webhooks. Connect FormBharat to your CRM, Slack, WhatsApp, and more with webhooks and Zapier.',
      readTime: '7 min',
      publishDate: '2024-04-06',
      tags: ['Webhooks', 'Integrations', 'Automation', 'API', 'Forms'],
      intro: 'Webhooks are the superpower of online forms. Instead of manually checking for new submissions, a webhook automatically sends form data to any app you choose — in real-time, every time. This guide takes you from zero to fully automated in under an hour.',
      sections: [
        {
          heading: 'What is a Webhook? The Non-Technical Explanation',
          body: 'Think of a webhook as a WhatsApp notification for your apps. When someone submits your form, FormBharat sends a message (containing the form data) to a URL you specify. The app at that URL receives the data and acts on it — adding a CRM contact, posting a Slack message, or updating a spreadsheet. It happens instantly and automatically.',
          list: [
            'Traditional polling: Your app checks FormBharat every hour for new submissions (slow)',
            'Webhook: FormBharat instantly notifies your app the moment a submission occurs (fast)',
            'Analogy: Email notification vs constantly refreshing your inbox',
            'Speed: Webhooks deliver data in under 2 seconds vs polling delays of minutes',
            'Reliability: Webhooks include retry logic — if your endpoint is down, data is not lost',
          ],
        },
        {
          heading: 'Setting Up Your First FormBharat Webhook',
          body: 'FormBharat\'s webhook setup takes under 5 minutes. You need a webhook destination URL — this comes from whatever tool you want to connect.',
          list: [
            'Step 1: In FormBharat, open your form → Settings → Integrations → Webhooks',
            'Step 2: Get your webhook URL from the destination app (Zapier, Make, Slack, custom endpoint)',
            'Step 3: Paste the URL in FormBharat webhook settings',
            'Step 4: Choose which events trigger the webhook (new submission, submission edited, etc.)',
            'Step 5: Click "Test Webhook" to send sample data and verify it works',
            'Step 6: Submit a real test submission and confirm data arrives at destination',
          ],
        },
        {
          heading: 'Popular Webhook Use Cases for Indian Businesses',
          body: 'Here are the most common webhook automations set up by Indian FormBharat users.',
          list: [
            'WhatsApp notification: Form submission → WhatsApp message to sales team via Interakt/WATI',
            'CRM auto-create: New lead form → Contact created in Zoho CRM/HubSpot',
            'Slack alert: Form submission → #sales-leads channel with formatted submission details',
            'Google Sheets row: New submission → New row in designated Google Sheet',
            'Email sequence: New subscriber form → Welcome email sequence in Mailchimp',
            'SMS notification: Form submission → SMS to owner number via Twilio/MSG91',
          ],
        },
        {
          heading: 'Using Zapier with FormBharat: No-Code Integrations',
          body: 'Zapier connects FormBharat to 5,000+ apps without any coding. Create "Zaps" that trigger on new FormBharat submissions and perform actions in other apps.',
          list: [
            'Connect FormBharat Trigger: "New Form Submission" to your chosen Zapier action',
            'Popular actions: Add Zoho/HubSpot contact, create Trello card, add Airtable record',
            'Multi-step Zaps: One submission can trigger multiple actions simultaneously',
            'Filters: Only trigger Zap if specific conditions are met (e.g., budget > ₹1L)',
            'Formatter: Transform form data (phone number formatting, date conversion) before sending',
          ],
        },
        {
          heading: 'Building Custom Webhook Endpoints for Developers',
          body: 'If you have a developer, building a custom webhook endpoint gives you complete control over what happens with form data.',
          list: [
            'Receive POST request with JSON payload from FormBharat',
            'Parse and validate incoming data',
            'Store in your database, trigger business logic, or call other APIs',
            'Return 200 OK within 30 seconds to prevent FormBharat retry',
            'Implement webhook signature verification for security',
          ],
        },
      ],
      faq: [
        {
          q: 'What happens if my webhook endpoint is down when a form is submitted?',
          a: 'FormBharat implements automatic retry logic for failed webhooks. If your endpoint returns an error or times out, FormBharat will retry delivery 5 times over 24 hours with exponential backoff. If all retries fail, the webhook event is logged in FormBharat\'s webhook history so you can manually replay it once your endpoint is back online.',
        },
        {
          q: 'Is there a limit to how many webhooks I can set up per form?',
          a: 'FormBharat allows up to 5 webhook endpoints per form on the free plan and unlimited webhooks on paid plans. You can point multiple webhooks to the same or different endpoints. For high-volume forms, consider using a single webhook to a middleware (like Zapier or Make) that fans out to multiple destinations.',
        },
        {
          q: 'How do I secure my webhook endpoint?',
          a: 'FormBharat signs all webhook payloads with an HMAC-SHA256 signature using your webhook secret key. Verify this signature in your endpoint code before processing the data. This ensures data actually comes from FormBharat and prevents malicious actors from sending fake form submissions to your endpoint.',
        },
      ],
      cta: {
        heading: 'Automate your form workflows',
        body: 'Set up FormBharat webhooks in 5 minutes. Connect to WhatsApp, CRM, Slack, and 5,000+ tools.',
      },
    },
    {
      slug: 'google-analytics-forms',
      title: 'Tracking Form Submissions in Google Analytics 4 (GA4)',
      description: 'Set up GA4 to track form views, starts, and completions. Measure ROI from your forms and optimize based on traffic source data.',
      readTime: '6 min',
      publishDate: '2024-04-14',
      tags: ['Google Analytics', 'GA4', 'Form Tracking', 'Analytics', 'SEO'],
      intro: 'Without Google Analytics tracking, your form is a black box. You know how many submissions you get, but not where they came from, which traffic sources convert best, or what users do before and after submitting. GA4 form tracking changes this — and it takes under 30 minutes to set up.',
      sections: [
        {
          heading: 'Why GA4 Form Tracking is Critical for Indian Businesses',
          body: 'Most Indian businesses spend money on Google Ads, Facebook Ads, SEO, and WhatsApp marketing but cannot tell which channels are actually generating form submissions. GA4 form tracking answers this definitively, allowing you to invest more in what works and cut what does not.',
          list: [
            'Know which ad campaign drives the most form submissions',
            'Compare mobile vs desktop form completion rates by source',
            'Identify which landing pages lead to the most form submissions',
            'Calculate true cost per lead by channel (Google Ads, Facebook, Organic)',
            'Understand the user journey: how many pages do visitors view before submitting?',
          ],
        },
        {
          heading: 'Setting Up GA4 Form Tracking with FormBharat',
          body: 'FormBharat natively sends form events to Google Analytics 4 when your GA4 Measurement ID is configured. No code required.',
          list: [
            'Step 1: Add your GA4 Measurement ID in FormBharat Settings → Analytics',
            'Step 2: FormBharat automatically fires these events: form_view, form_start, form_submit',
            'Step 3: In GA4, go to Events to confirm events are being received',
            'Step 4: Mark form_submit as a Conversion in GA4',
            'Step 5: Set up a Custom Dimension for form_id to track individual forms',
          ],
        },
        {
          heading: 'Key GA4 Reports for Form Performance',
          body: 'Once tracking is set up, these GA4 reports give you the most actionable insights for form optimization.',
          list: [
            'Conversions by source/medium: Which channels drive form submissions?',
            'Funnel exploration: Visualize the path from landing to form completion',
            'Device category: Mobile vs desktop completion rates',
            'Geographic report: Which cities/states are top form submitters?',
            'User journey: What pages do users visit before and after the form?',
          ],
        },
        {
          heading: 'Connecting Google Analytics to Google Ads for Form ROI',
          body: 'If you run Google Ads, linking GA4 to Google Ads and importing form submission conversions lets you see true cost per lead in your Ads dashboard — and enables smart bidding strategies that optimize for actual leads, not just clicks.',
          list: [
            'Link GA4 to Google Ads (done in Google Ads → Tools → Linked accounts)',
            'Import GA4 conversions (form_submit) into Google Ads',
            'Set bid strategy to "Maximize Conversions" or "Target CPA"',
            'Google\'s algorithm optimizes to show ads to people most likely to submit your form',
            'Monitor Cost Per Conversion (not Cost Per Click) as your primary KPI',
          ],
        },
      ],
      faq: [
        {
          q: 'Does Google Analytics track form submissions on embedded FormBharat forms?',
          a: 'Yes. FormBharat embeds communicate with the parent page to fire GA4 events when forms are embedded using the standard embed code. Ensure your FormBharat GA4 Measurement ID matches the GA4 property on your website. For iFrame embeds, events are sent from the FormBharat domain, which may require cross-domain measurement configuration in GA4.',
        },
        {
          q: 'How do I track forms hosted on FormBharat\'s domain (not my website)?',
          a: 'Forms hosted at formshare.io or your custom subdomain are tracked automatically when you add your GA4 Measurement ID in FormBharat settings. GA4 will show these as a separate data stream from your website. Use UTM parameters in the form links you share to track which specific campaigns or channels are driving traffic to the form.',
        },
      ],
      cta: {
        heading: 'Track every submission with built-in analytics',
        body: 'FormBharat includes Google Analytics integration. Understand your form ROI in minutes.',
      },
    },
  ],
}
