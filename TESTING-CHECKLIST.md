# FormBharat - Testing Checklist

**Last Updated:** March 12, 2024

---

## ⚠️ CRITICAL: Database Setup Required First

Before testing anything, you MUST set up the database:

1. Go to: https://supabase.com/dashboard/project/hrqbiqpvzlslldfbczts/sql/new
2. Copy and paste the entire contents of `setup-database.sql`
3. Click "Run" to execute the SQL
4. Verify tables are created: User, Form, Response

**Without this, signup/login/form saving will NOT work.**

---

## 🧪 Testing Checklist

### 1. **Landing Page** (`/`)
- [ ] Page loads without errors
- [ ] Navigation links work (Features, Templates, Pricing, About, Login)
- [ ] "Start Free" button redirects to `/builder`
- [ ] All sections visible: Hero, Stats, Features, Use Cases, CTA, Footer
- [ ] Orange/pink gradients display correctly
- [ ] Mobile responsive (test on smaller screen)
- [ ] Footer links work

### 2. **About Page** (`/about`)
- [ ] Page loads with mission, values, and story
- [ ] 4 value cards display with icons
- [ ] Navigation works
- [ ] CTA button redirects to `/builder`
- [ ] Footer present

### 3. **Templates Page** (`/templates`)
- [ ] Page loads with 12 template cards
- [ ] Search bar visible (UI only, no functionality)
- [ ] Category filter buttons visible
- [ ] "Use Template" buttons redirect to `/builder`
- [ ] Template cards show: icon, title, description, category, field count

### 4. **Contact Page** (`/contact`)
- [ ] Page loads with contact options
- [ ] 3 contact method cards visible
- [ ] Contact form present (fields: Name, Email, Subject, Message)
- [ ] 5 FAQ items visible
- [ ] Submit button present (backend not implemented)

### 5. **Signup Flow** (`/auth/signup`)
- [ ] Page loads with branding
- [ ] Form fields: Email, Password
- [ ] Validation: Password must be 6+ characters
- [ ] Submit creates account (if DB is set up)
- [ ] Redirects to `/dashboard` on success
- [ ] "Login" link goes to `/auth/login`
- [ ] Terms notice visible

### 6. **Login Flow** (`/auth/login`)
- [ ] Page loads with branding
- [ ] Form fields: Email, Password
- [ ] Submit logs in user (if account exists)
- [ ] Redirects to `/dashboard` on success
- [ ] "Sign up" link goes to `/auth/signup`
- [ ] "Back to home" link works

### 7. **Form Builder** (`/builder`)
- [ ] Page loads with sidebar and canvas
- [ ] Branding header present
- [ ] 7 field type buttons in sidebar (Text, Email, Phone, Long Text, Dropdown, Radio, Checkboxes)
- [ ] Clicking field type adds it to canvas
- [ ] Form title and description inputs work
- [ ] Drag and drop to reorder fields works
- [ ] Edit field labels, placeholders, options
- [ ] Delete field button works
- [ ] "Save Form" button triggers auth dialog (if not logged in)
- [ ] Empty state shows when no fields added
- [ ] Quick Tips card visible at bottom

### 8. **Dashboard** (`/dashboard`)
- [ ] Page loads (requires login)
- [ ] 3 stats cards show: Total Forms, Total Responses, Response Rate
- [ ] Form cards display if forms exist
- [ ] Each form card shows: title, description, status, response count, field count
- [ ] "Copy Link" button copies form URL
- [ ] "Open in new tab" button works
- [ ] "View Responses" button goes to responses page
- [ ] "Delete" button deletes form (with confirmation)
- [ ] "Create Form" button goes to `/builder`
- [ ] Empty state shows if no forms

### 9. **Public Form Submission** (`/f/[formId]`)
- [ ] Form loads with branding
- [ ] Form title and description display
- [ ] All form fields render correctly
- [ ] Required fields marked with red asterisk
- [ ] Field types work: text input, textarea, dropdown, radio, checkboxes
- [ ] Validation works (required fields)
- [ ] Submit button works
- [ ] Success page shows with animated checkmark
- [ ] Loading state during submit
- [ ] "Powered by FormBharat" footer visible

### 10. **Response Viewing** (`/dashboard/forms/[id]/responses`)
- [ ] Page loads (requires login)
- [ ] 3 stats cards display
- [ ] Response count accurate
- [ ] "Export to CSV" button downloads CSV file
- [ ] Each response card shows all field answers
- [ ] Timestamp on each response
- [ ] Empty state if no responses
- [ ] "Back to Dashboard" button works
- [ ] Branding header present

---

## 🐛 Known Issues / Limitations

### Current Limitations:
1. **No password reset** - Users can't recover passwords yet
2. **No email verification** - Accounts are created instantly
3. **Templates not functional** - Template data not yet implemented
4. **Search not functional** - Templates page search is UI only
5. **Contact form not connected** - No backend for contact submissions
6. **No file upload field** - Not yet implemented
7. **No multi-step forms** - Single page forms only
8. **No conditional logic** - All fields always visible
9. **No WhatsApp integration** - Planned for Phase 2
10. **No analytics charts** - Only basic stats shown

### Areas for Future Improvement:
- Add form duplication feature
- Add form analytics (response rate over time, field-by-field breakdown)
- Add team collaboration (share forms with team members)
- Add custom domains for form URLs
- Add form themes (custom colors, fonts)
- Add answer piping (reference previous answers)
- Add calculations (for pricing forms, quizzes)
- Add webhook integration
- Add Zapier/Make integration
- Add email notifications on new responses

---

## 📱 Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🎯 Complete User Journey Test

**End-to-End Flow:**

1. [ ] Visit landing page → Click "Start Free"
2. [ ] Signup for account
3. [ ] Redirected to builder
4. [ ] Create form with 5 fields (text, email, phone, dropdown, textarea)
5. [ ] Save form (should redirect to dashboard)
6. [ ] Copy form link from dashboard
7. [ ] Open form link in incognito/private window
8. [ ] Fill and submit form
9. [ ] Back to dashboard
10. [ ] Click "View Responses"
11. [ ] Verify response appears
12. [ ] Export to CSV
13. [ ] Verify CSV downloads with correct data

**If all above steps work, MVP is functional! 🎉**

---

## 🚀 Performance Checks

- [ ] Pages load in under 3 seconds
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Images/assets load correctly
- [ ] Animations are smooth
- [ ] Forms are responsive on mobile

---

## 📝 Notes

- Dev server runs on `http://localhost:3000`
- Database must be set up first (see top of checklist)
- Test with real data to verify everything works
- Report any bugs or issues immediately

**Once all critical tests pass, you're ready to share with early users!**
