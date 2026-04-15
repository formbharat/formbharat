# Email Templates Setup Guide - FormBharat

## Part 1: Customizing Supabase Auth Emails

### Overview
Supabase allows you to customize the email templates for authentication. Let's make them professional and branded for FormBharat.

### Step 1: Access Email Templates in Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Email Templates**
4. You'll see templates for:
   - Confirm Signup
   - Magic Link
   - Change Email Address
   - Reset Password

### Step 2: Customize Each Template

#### A. Confirm Signup Email Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin-bottom: 16px;
    }
    .brand-name {
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #f97316 0%, #ec4899 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 14px;
      color: #9ca3af;
      margin: 8px 0;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 24px 0;
    }
    .info-box {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .info-text {
      font-size: 14px;
      color: #78350f;
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">F</div>
      <h1 class="brand-name">FormBharat</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Welcome to FormBharat! 🎉</h2>
      <p class="text">
        Hi there! Thanks for signing up. We're excited to have you on board.
      </p>
      <p class="text">
        To get started, please confirm your email address by clicking the button below:
      </p>

      <div class="button-container">
        <a href="{{ .ConfirmationURL }}" class="button">Confirm Email Address</a>
      </div>

      <div class="info-box">
        <p class="info-text">
          <strong>This link will expire in 24 hours.</strong> If you didn't create an account with FormBharat, you can safely ignore this email.
        </p>
      </div>

      <div class="divider"></div>

      <p class="text">
        Once confirmed, you'll be able to:
      </p>
      <ul style="color: #6b7280; font-size: 15px; line-height: 1.8;">
        <li>Create unlimited forms with drag & drop builder</li>
        <li>Share forms via WhatsApp & Email</li>
        <li>Track responses with real-time analytics</li>
        <li>Customize with your brand colors & logo</li>
      </ul>

      <p class="text" style="margin-top: 24px;">
        Need help? Reply to this email or visit our <a href="https://formbharat.com/help" style="color: #f97316;">Help Center</a>.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        <strong>FormBharat</strong> - Beautiful forms for Indian businesses
      </p>
      <p class="footer-text">
        Made with ❤️ in India 🇮🇳
      </p>
      <p class="footer-text" style="margin-top: 16px;">
        <a href="https://formbharat.com" style="color: #f97316; text-decoration: none;">Visit Website</a> •
        <a href="https://formbharat.com/help" style="color: #f97316; text-decoration: none;">Help Center</a> •
        <a href="https://formbharat.com/privacy" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

#### B. Reset Password Email Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      padding: 40px 20px;
      text-align: center;
    }
    .logo {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin-bottom: 16px;
    }
    .brand-name {
      font-size: 28px;
      font-weight: bold;
      color: white;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #111827;
      margin: 0 0 16px 0;
    }
    .text {
      font-size: 16px;
      color: #6b7280;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .button {
      display: inline-block;
      padding: 16px 32px;
      background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer-text {
      font-size: 14px;
      color: #9ca3af;
      margin: 8px 0;
    }
    .warning-box {
      background-color: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .warning-text {
      font-size: 14px;
      color: #991b1b;
      margin: 0;
    }
    .security-tips {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 20px;
      border-radius: 12px;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">F</div>
      <h1 class="brand-name">FormBharat</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 class="title">Reset Your Password 🔐</h2>
      <p class="text">
        We received a request to reset your password for your FormBharat account.
      </p>
      <p class="text">
        Click the button below to choose a new password:
      </p>

      <div class="button-container">
        <a href="{{ .ConfirmationURL }}" class="button">Reset Password</a>
      </div>

      <div class="warning-box">
        <p class="warning-text">
          <strong>⏰ This link expires in 1 hour.</strong> For security reasons, you'll need to request a new link after that.
        </p>
      </div>

      <div class="security-tips">
        <p style="font-weight: 600; color: #166534; margin: 0 0 12px 0; font-size: 15px;">
          🛡️ Security Tips:
        </p>
        <ul style="color: #166534; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
          <li>Choose a strong password (at least 12 characters)</li>
          <li>Use a mix of letters, numbers, and symbols</li>
          <li>Don't reuse passwords from other websites</li>
        </ul>
      </div>

      <p class="text" style="margin-top: 24px;">
        <strong>Didn't request this?</strong> If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
      </p>

      <p class="text">
        If you're having trouble, contact our support team at <a href="mailto:support@formbharat.com" style="color: #8b5cf6;">support@formbharat.com</a>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="footer-text">
        <strong>FormBharat</strong> - Beautiful forms for Indian businesses
      </p>
      <p class="footer-text">
        Made with ❤️ in India 🇮🇳
      </p>
      <p class="footer-text" style="margin-top: 16px;">
        <a href="https://formbharat.com" style="color: #8b5cf6; text-decoration: none;">Visit Website</a> •
        <a href="https://formbharat.com/help" style="color: #8b5cf6; text-decoration: none;">Help Center</a> •
        <a href="https://formbharat.com/privacy" style="color: #9ca3af; text-decoration: none;">Privacy Policy</a>
      </p>
    </div>
  </div>
</body>
</html>
```

### Step 3: Apply Templates in Supabase

1. Copy the HTML template for each email type
2. In Supabase Dashboard → Authentication → Email Templates
3. Select the template you want to edit
4. Paste the HTML code
5. Click **Save**
6. Test by triggering the action (signup/password reset)

### Important Notes

- Replace `{{ .ConfirmationURL }}` placeholders - Supabase will inject the actual URLs
- Update email addresses (support@formbharat.com) to your actual support email
- Update website URLs to your actual domain
- Test emails thoroughly before going live

### Testing Your Templates

1. **Signup Email**: Create a new test account
2. **Password Reset**: Use "Forgot Password" feature
3. Check spam folder if emails don't arrive
4. Test on multiple email clients (Gmail, Outlook, Apple Mail)

---

## Next Steps

After setting up auth emails, proceed to Part 2 for implementing transactional emails for form notifications and other features.
