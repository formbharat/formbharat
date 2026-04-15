# Google Authentication Setup Guide

## Overview
Google OAuth has been implemented for both login and signup pages. Follow these steps to configure it in Supabase.

## Steps to Enable Google Authentication

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen if not done already
6. Select **Web application** as application type
7. Add authorized redirect URIs:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
8. Copy your **Client ID** and **Client Secret**

### 2. Configure Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Navigate to **Authentication** → **Providers**
3. Find **Google** and enable it
4. Enter your Google **Client ID** and **Client Secret**
5. Save changes

### 3. Update Environment Variables (Optional)

If using a custom domain, add to `.env`:
```bash
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 4. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/auth/login` or `/auth/signup`
3. Click "Sign in with Google" or "Sign up with Google"
4. Complete the Google OAuth flow
5. You should be redirected to the dashboard

## Features Implemented

✅ **Google Sign In** - One-click authentication for login
✅ **Google Sign Up** - One-click account creation
✅ **Callback Handler** - Automatic session management
✅ **User Sync** - Syncs Google user data to database
✅ **Professional UI** - Beautiful Google button with official branding
✅ **OR Divider** - Clean separation between email and Google auth

## Files Created/Modified

- `app/api/auth/google/route.ts` - Google OAuth endpoint
- `app/api/auth/sync-user/route.ts` - User synchronization
- `app/auth/callback/page.tsx` - OAuth callback handler
- `app/auth/login/page.tsx` - Added Google sign-in button
- `app/auth/signup/page.tsx` - Added Google sign-up button

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Verify the redirect URI in Google Cloud Console matches your Supabase URL exactly
- Make sure to include `/auth/v1/callback` at the end

### Error: "Invalid credentials"
- Double-check your Client ID and Client Secret in Supabase settings
- Ensure Google Provider is enabled in Supabase

### User not syncing to database
- Check browser console for errors
- Verify the `/api/auth/sync-user` endpoint is accessible
- Check Supabase logs for authentication events

## Security Notes

- Client ID and Secret are stored in Supabase (not in your codebase)
- OAuth flow uses PKCE for enhanced security
- Tokens are stored securely in localStorage
- All API calls use Bearer token authentication

## Next Steps

After setup, users can:
1. Sign in with their Google account
2. Access dashboard immediately
3. All forms and responses are linked to their account
4. Logout and sign back in seamlessly

---

For more information, see [Supabase Auth Documentation](https://supabase.com/docs/guides/auth/social-login/auth-google)
