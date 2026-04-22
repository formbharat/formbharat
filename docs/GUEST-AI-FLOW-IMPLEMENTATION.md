# Guest AI Form Generation Flow - Implementation Status

**Date:** April 22, 2026  
**Status:** 70% Complete - Core pieces implemented, integration in progress

---

## ✅ Completed Components

### 1. Rate Limiting System (`lib/rate-limit.ts`)
- ✅ In-memory IP-based rate limiting
- ✅ 3 generations per IP per day for guests
- ✅ Unlimited for authenticated users
- ✅ Auto-cleanup of expired entries
- ✅ Helper functions for IP extraction and time formatting

### 2. Guest AI Generator Modal (`components/GuestAIGenerator.tsx`)
- ✅ Multi-step flow: Describe → Auth → Verify → Generate
- ✅ Email + Google OAuth options
- ✅ Magic link OR OTP verification (user choice)
- ✅ Beautiful UI with purple gradient theme
- ✅ Example prompts for inspiration
- ✅ Loading states and error handling
- ✅ Session storage for form description

### 3. Auth API Routes
- ✅ `/api/auth/send-verification` - Sends OTP or magic link
  - IP rate limiting (3 per day)
  - Email validation
  - OTP generation and storage
  - Branded email templates
- ✅ `/api/auth/verify-otp` - Verifies OTP and creates/logs in user
  - OTP validation
  - User creation in Supabase + Prisma
  - JWT token generation
  - Returns `needsPassword` flag for new users
- ✅ `/api/auth/set-password` - Sets password after form customization
  - Password validation (min 8 chars)
  - Updates Supabase auth

### 4. AI Generation API Updates (`app/api/ai/generate-form/route.ts`)
- ✅ Changed rate limit to unlimited for authenticated users
- ✅ Removed duplicate IP check (handled in send-verification)
- ✅ Updated to use Llama 3 70B model

### 5. Homepage Integration (`app/page.tsx`)
- ✅ Replaced placeholder image with AI Generate CTA
- ✅ Beautiful gradient section with decorative elements
- ✅ "Try AI Generator - Free" button
- ✅ Shows "3 free generations" messaging
- ✅ Guest AI Generator modal integration

### 6. Email Utility (`lib/email.ts`)
- ✅ Added generic `sendEmail` function for auth emails

---

## 🚧 In Progress / Remaining

### 7. Builder Page Updates (`app/builder/page.tsx`)
**Status:** Partially complete

**Completed:**
- ✅ Added AI form detection from URL params (`?ai=generated&new=true`)
- ✅ Load AI-generated form from sessionStorage
- ✅ Added state for password dialog
- ✅ Added `isNewForm` and `savedFormId` tracking

**TODO:**
- ⏳ Add password setup modal UI
- ⏳ Show password modal after first save (for email users only)
- ⏳ Change button text logic:
  - New form: "Save Form"
  - Editing existing: "Save Changes"
  - After save: Redirect to dashboard (not show "Update")
- ⏳ Handle Google OAuth users (skip password setup)

### 8. Password Setup Modal
**Status:** Not started

**Requirements:**
- Show after user saves AI-generated form
- Only for email users (not Google OAuth)
- Fields: Password + Confirm Password
- Validation: Min 8 chars, passwords match
- On success: Redirect to dashboard
- Skippable? No - required for account security

### 9. Builder Save Button Logic
**Status:** Not started

**Current issue:** Shows "Update Form" after save (confusing)

**Solution:**
```typescript
const buttonText = isNewForm ? 'Save Form' : 'Save Changes'
const onSaveSuccess = () => {
  if (isNewForm && needsPassword) {
    setShowPasswordDialog(true)
  } else {
    router.push('/dashboard')
  }
}
```

---

## 📋 Complete User Journey (As Designed)

### Guest User Flow

1. **Homepage** → Click "Try AI Generator - Free"
2. **Modal Step 1** → Describe form ("Restaurant feedback form")
3. **Modal Step 2** → Choose auth method:
   - **Option A:** Google OAuth → Instant login
   - **Option B:** Email + Magic Link → Check email, click link
   - **Option C:** Email + OTP → Enter 6-digit code
4. **After Auth** → AI generates form (5-10 seconds)
5. **Builder Page** → Form loaded, user customizes
6. **Click "Save Form"** → Form saved to database
7. **Password Modal** (email users only) → Set password
8. **Dashboard** → See saved form, can edit/share

### Logged-In User Flow (Existing)

1. **Dashboard** → Click "AI Generate"
2. **Modal** → Describe form
3. **Generate** → Preview
4. **Use This Form** → Opens in builder
5. **Customize** → Edit fields
6. **Save Changes** → Back to dashboard

---

## 🔧 Technical Details

### Rate Limiting Strategy

| User Type | Limit | Tracking Method |
|-----------|-------|-----------------|
| Guest (no email) | 3 per IP per day | IP address (in-memory) |
| Email verified | Unlimited | User ID (database) |
| Google OAuth | Unlimited | User ID (database) |

### Authentication Flow

```
Guest → Email/Google → Verification → JWT Token → API Access
```

### Data Flow

```
Description (client) 
  → sessionStorage 
  → Auth API 
  → AI Generation API 
  → sessionStorage 
  → Builder (load) 
  → Save API 
  → Database
```

### Session Storage Keys

- `ai_form_description` - Stored during OAuth redirect
- `ai_generated_form` - Generated form data before builder load

---

## 🐛 Known Issues / Edge Cases

### 1. OTP Store (In-Memory)
**Issue:** OTPs stored in memory will be lost on server restart  
**Impact:** Low (10-minute expiry anyway)  
**Solution:** Use Redis (Upstash) in production

### 2. Magic Link Redirect
**Issue:** Description not passed through Supabase magic link  
**Current:** Relies on sessionStorage (works for same browser)  
**Better:** Store in database with temporary token

### 3. IP Rate Limiting
**Issue:** Office networks share IP (multiple users blocked)  
**Mitigation:** 3 per IP is lenient, email verification removes limit

### 4. Password Setup Skipping
**Issue:** User might close browser before setting password  
**Solution:** Show password setup on next login if not set

---

## 🎯 Next Steps (Priority Order)

1. **Complete Builder Page** (30 min)
   - Add password modal UI
   - Fix button text logic
   - Handle save → password → dashboard flow

2. **Test End-to-End** (20 min)
   - Guest flow with OTP
   - Guest flow with magic link
   - Google OAuth flow
   - Password setup
   - Form save and dashboard redirect

3. **Handle Edge Cases** (20 min)
   - User closes browser before password setup
   - OTP expiry
   - Invalid email
   - Network errors

4. **Production Readiness** (30 min)
   - Add Redis for OTP storage (Upstash)
   - Add proper error logging (Sentry)
   - Add analytics events (form_generated, user_signup)
   - Update PRD with actual flow

---

## 📝 Code Snippets Needed

### Password Setup Modal (Add to builder/page.tsx)

```tsx
{/* Password Setup Dialog */}
<Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
        <Lock className="h-5 w-5" />
        Secure Your Account
      </DialogTitle>
      <DialogDescription>
        Set a password to access your dashboard and manage your forms.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4 mt-4">
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
        />
      </div>
      <div>
        <Label>Confirm Password</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password"
        />
      </div>
      <Button
        onClick={handleSetPassword}
        disabled={!password || password !== confirmPassword || password.length < 8}
        className="w-full"
      >
        Set Password & Continue
      </Button>
    </div>
  </DialogContent>
</Dialog>
```

### Handle Set Password Function

```typescript
const handleSetPassword = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('/api/auth/set-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    })

    if (!response.ok) throw new Error('Failed to set password')

    toast({
      title: 'Password set! 🎉',
      description: 'Your account is now secure.',
    })

    setShowPasswordDialog(false)
    router.push('/dashboard')
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to set password. Please try again.',
      variant: 'destructive',
    })
  }
}
```

---

## 🚀 Deployment Checklist

- [ ] Enable Bedrock Llama 3 model in AWS
- [ ] Add IAM permissions for Bedrock
- [ ] Set `REGION_AWS` in Amplify env vars
- [ ] Configure Resend API for emails
- [ ] Test email delivery (OTP + magic link)
- [ ] Test Google OAuth redirect
- [ ] Monitor IP rate limiting effectiveness
- [ ] Set up Redis for OTP storage (optional but recommended)

---

**Status:** Ready for final integration and testing  
**ETA:** 1-2 hours to complete remaining pieces  
**Blocker:** None - all dependencies in place
