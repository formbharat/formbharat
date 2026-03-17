# Template Testing Guide

**Date:** March 18, 2024  
**Status:** ✅ TEMPLATES FIXED & READY TO TEST

---

## 🔧 FIXES IMPLEMENTED

### 1. FormBuilder Component Fix
**Problem:** FormBuilder wasn't updating when template data was passed as props.

**Solution:** Added `useEffect` to update state when props change.

**File:** `components/form-builder/FormBuilder.tsx`
```typescript
// Update state when props change (template loading)
useEffect(() => {
  if (initialTitle) setTitle(initialTitle)
  if (initialDescription) setDescription(initialDescription)
  if (initialFields && initialFields.length > 0) setFields(initialFields)
}, [initialTitle, initialDescription, initialFields])
```

### 2. Debug Logging Added
**Files:**
- `app/templates/page.tsx` - Logs template selection
- `app/builder/page.tsx` - Logs template loading from localStorage

**Console logs will show:**
- Selected template ID
- Template title
- Number of fields
- Template data being saved/loaded

---

## 📊 TEMPLATE DATA VERIFIED

All 12 templates have **unique, properly structured data**:

1. **Customer Feedback** - 8 fields (feedback-focused)
2. **Event Registration** - 10 fields (event details, dietary preferences)
3. **Job Application** - 12 fields (employment details, experience)
4. **Product Order** - 9 fields (product selection, delivery)
5. **Contact Form** - 5 fields (simple contact)
6. **Survey Form** - 7 fields (demographic, interests)
7. **Lead Generation** - 9 fields (business details, budget)
8. **Support Ticket** - 8 fields (issue tracking)
9. **Workshop Registration** - 8 fields (skill level, learning goals)
10. **Vendor Registration** - 10 fields (business info, GST/PAN)
11. **Volunteer Sign-up** - 8 fields (availability, interests)
12. **Newsletter Sign-up** - 4 fields (minimal signup)

Each template has different:
- Field labels
- Field types
- Placeholder text
- Options for dropdowns/radio/checkbox
- Required vs optional fields

---

## 🧪 HOW TO TEST

### Step 1: Open Templates Page
```
http://localhost:3001/templates
```

### Step 2: Test Each Template
For each template, do the following:

1. **Click "Use Template" button**
2. **Check browser console** (F12 → Console tab)
3. **Verify logs show:**
   - "Selected template ID: [template-id]"
   - "Found template: {id, title, fields...}"
   - "Saving template to localStorage: {...}"

4. **Builder page loads automatically**
5. **Check console again:**
   - "Builder: Checking localStorage for template"
   - "Builder: Parsed template: {id, title, fieldsCount}"
   - "Builder: Template data set to state"

6. **Toast notification appears:**
   - "Template Loaded"
   - Description shows template name

7. **Verify form builder shows:**
   - ✅ Correct template title in "Form Title" field
   - ✅ Correct description (if template has one)
   - ✅ ALL fields from template in "Form Fields" section
   - ✅ Each field shows correct:
     - Label
     - Type
     - Placeholder
     - Required/optional status
     - Options (for dropdown/radio/checkbox)

### Step 3: Test Multiple Templates
Test at least 3 different templates to verify each loads unique data:

**Recommended test sequence:**
1. Customer Feedback (8 fields)
2. Event Registration (10 fields) 
3. Job Application (12 fields)

**What to verify:**
- Different number of fields loads
- Different field labels
- Different field types
- Different options

---

## 🎯 EXPECTED RESULTS

### Customer Feedback Template
**Fields you should see:**
1. Name (text, required)
2. Email (email, required)
3. Phone Number (phone, optional)
4. How satisfied are you... (radio, required)
5. Which aspects did you like? (checkbox, optional)
6. What can we improve? (textarea, optional)
7. Would you recommend us? (radio, required)
8. Additional Comments (textarea, optional)

### Event Registration Template
**Fields you should see:**
1. Full Name (text, required)
2. Email Address (email, required)
3. Mobile Number (phone, required)
4. Organization/Company (text, optional)
5. Ticket Type (dropdown, required)
6. Dietary Preferences (radio, optional)
7. Sessions Interested In (checkbox, optional)
8. Special Requirements (text, optional)
9. How did you hear about this event? (radio, optional)
10. Additional Comments (textarea, optional)

### Job Application Template
**Fields you should see:**
1. Full Name (text, required)
2. Email Address (email, required)
3. Phone Number (phone, required)
4. Current Location (text, required)
5. Position Applied For (dropdown, required)
6. Years of Experience (dropdown, required)
7. Current/Last Employer (text, optional)
8. Expected Salary (LPA) (text, optional)
9. Notice Period (radio, required)
10. LinkedIn Profile (text, optional)
11. Why do you want to join us? (textarea, required)
12. Relevant Skills & Experience (textarea, required)

---

## 🐛 DEBUGGING CHECKLIST

If templates don't work, check:

### Browser Console
- [ ] No JavaScript errors
- [ ] Template selection logs appear
- [ ] LocalStorage save confirmed
- [ ] Builder load logs appear
- [ ] Template data shown in logs

### LocalStorage (F12 → Application → Local Storage)
- [ ] Check if "selected-template" key exists after clicking
- [ ] Verify it contains JSON with template data
- [ ] Confirm it gets removed after builder loads

### Form Builder
- [ ] Title field populated
- [ ] Description field populated (if template has one)
- [ ] Fields section shows template fields
- [ ] Field count matches template
- [ ] Can drag/reorder fields
- [ ] Can edit field properties
- [ ] Can delete fields
- [ ] Can add new fields

---

## 📝 TESTING SCRIPT

**Quick test all templates:**

```javascript
// Run in browser console on /templates page
const templates = [
  'customer-feedback',
  'event-registration', 
  'job-application',
  'product-order',
  'contact-form',
  'survey-form',
  'lead-generation',
  'support-ticket',
  'workshop-registration',
  'vendor-registration',
  'volunteer-signup',
  'newsletter-signup'
]

// Test each template
templates.forEach((id, index) => {
  console.log(`\n=== Testing Template ${index + 1}: ${id} ===`)
  const btn = document.querySelector(`[data-template-id="${id}"]`)
  if (btn) {
    console.log('✅ Template button found')
  } else {
    console.log('❌ Template button NOT found')
  }
})
```

---

## ✅ SUCCESS CRITERIA

Templates are working correctly if:

1. ✅ Each template has "Use Template" button
2. ✅ Clicking button saves template to localStorage
3. ✅ Browser redirects to /builder
4. ✅ Builder loads template data from localStorage
5. ✅ Form title populated
6. ✅ All fields appear in builder
7. ✅ Field count matches template
8. ✅ Fields have correct labels, types, and options
9. ✅ Different templates load different data
10. ✅ Can edit loaded template
11. ✅ Can save edited template as new form
12. ✅ Toast notification confirms template loaded

---

## 🚀 SERVER STATUS

**Running on:** http://localhost:3001  
**Templates page:** http://localhost:3001/templates  
**Builder page:** http://localhost:3001/builder  

**Dev server started:** ✅  
**Compilation status:** Ready  
**Browser preview:** Available at http://127.0.0.1:64053  

---

## 🎉 NEXT STEPS

1. Open browser to http://localhost:3001/templates
2. Test Customer Feedback template first
3. Check console logs
4. Verify all 8 fields load
5. Test Event Registration template next
6. Verify different data (10 fields)
7. Test Job Application template
8. Verify different data (12 fields)
9. Report any issues found

**Templates should now work correctly with unique data for each template!**
