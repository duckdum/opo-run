# Supabase Email Templates Setup Guide

## Overview

These custom email templates match the OPO.RUN branding with:
- Black background design
- OPO.RUN logo and tagline
- Social media links
- Professional, modern styling
- Mobile-responsive design

## How to Apply Templates

### 1. Access Email Templates

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/jyociwfhjbfttlqatbsq)
2. Navigate to **Authentication** → **Email Templates**

### 2. Configure Each Template

You'll see 4 email template types. For each one:

#### A. Confirm Signup

1. Click on **"Confirm signup"**
2. Copy the contents of `confirm-signup.html`
3. Paste into the **Message Body (HTML)** field
4. Set **Subject** to: `Confirm your email - OPO.RUN`
5. Click **Save**

#### B. Magic Link

1. Click on **"Magic Link"**
2. Copy the contents of `magic-link.html`
3. Paste into the **Message Body (HTML)** field
4. Set **Subject** to: `Your magic link to sign in - OPO.RUN`
5. Click **Save**

#### C. Reset Password

1. Click on **"Reset Password"** (may be called "Change Email")
2. Copy the contents of `reset-password.html`
3. Paste into the **Message Body (HTML)** field
4. Set **Subject** to: `Reset your password - OPO.RUN`
5. Click **Save**

#### D. Change Email Address

1. Click on **"Change Email Address"**
2. Copy the contents of `change-email.html`
3. Paste into the **Message Body (HTML)** field
4. Set **Subject** to: `Confirm your new email - OPO.RUN`
5. Click **Save**

## 3. Configure Email Settings

While you're in the Authentication section, also configure:

### Email Settings (Authentication → Settings)

**Site URL:**
```
https://opo.run
```

**Redirect URLs:** (add both)
```
https://opo.run/auth/callback
http://localhost:3000/auth/callback
```

**Sender Name:**
```
OPO.RUN
```

**Sender Email:**
```
hello@oporto.run
```
(Or your configured Resend email)

### Enable Email Confirmations

- ✅ **Enable email confirmations** - Turn this ON
- This requires users to verify their email before they can log in
- More secure and prevents fake signups

### Email Rate Limits

Keep default settings:
- Users can request a new email confirmation every 60 seconds
- Prevents spam

## 4. Test the Email Templates

### Test Confirm Signup

1. Go to `http://localhost:3000/signup`
2. Create a new account with a **real email you can access**
3. Check your inbox for the confirmation email
4. Verify it looks good and the link works

### Test Password Reset

1. Go to `http://localhost:3000/login`
2. Click "Forgot password?"
3. Enter your email
4. Check your inbox for the reset email
5. Verify the link works

## Template Variables

These templates use Supabase's template variables:

- `{{ .ConfirmationURL }}` - The confirmation/action link
- `{{ .Token }}` - The confirmation token (not used in our templates)
- `{{ .TokenHash }}` - The token hash (not used in our templates)
- `{{ .SiteURL }}` - Your site URL from settings

**Do not modify these variables** - Supabase will replace them automatically.

## Customization

### Change Colors

Current color scheme:
- **Background**: `#000000` (black)
- **Text**: `#ffffff` (white)
- **Primary Button**: `#3b82f6` (blue) - Confirm Signup
- **Success Button**: `#22c55e` (green) - Magic Link
- **Warning Button**: `#ef4444` (red) - Reset Password
- **Info Button**: `#8b5cf6` (purple) - Change Email

To change a button color, find this line in the template:
```html
background-color: #3b82f6;
```

And replace `#3b82f6` with your preferred color.

### Update Social Links

Find these lines in each template:
```html
<a href="https://instagram.com/opo.run" ...>Instagram</a>
<a href="https://strava.com/clubs/oporun" ...>Strava</a>
```

Update the URLs to your actual social media profiles.

### Change Footer Text

Find this line:
```html
OPO.RUN | Leça da Palmeira, Porto, Portugal
```

Update to your actual location/business info.

## Troubleshooting

### Emails not sending
- Check that Supabase auth is enabled
- Verify your Site URL is set correctly
- Check the Supabase logs (Dashboard → Logs)

### Emails going to spam
- Configure proper SPF/DKIM records for your domain
- Use a verified sender email (Resend helps with this)
- Don't use spammy words in subject lines

### Links not working
- Verify Redirect URLs include both production and localhost
- Check that the `{{ .ConfirmationURL }}` variable is present
- Make sure you didn't accidentally remove the template variables

### Styling looks broken
- Email clients have limited CSS support
- Always use inline styles (which these templates do)
- Test in multiple email clients (Gmail, Outlook, Apple Mail)

## Preview Before Sending

Unfortunately, Supabase doesn't have a preview feature. To test:

1. Create a test account with your own email
2. Check how the email looks in your inbox
3. Make adjustments as needed
4. Repeat until satisfied

## Portuguese Version (Optional)

If you want separate Portuguese templates, you can:

1. Duplicate these templates
2. Translate all text to Portuguese
3. Keep the HTML structure the same
4. Supabase doesn't support language-specific templates, so you'd need to choose one language

**Recommended**: Keep templates in English (international standard) since:
- Your codebase uses both PT/EN
- Email clients auto-translate for users
- Most developers expect English emails

Or use a service like SendGrid/Mailgun that supports multi-language templates.

## Best Practices

✅ **Do:**
- Keep email templates simple and clean
- Use inline CSS for maximum compatibility
- Test in multiple email clients
- Include plain text fallback (Supabase handles this)
- Make CTAs (buttons) prominent and clear
- Include security notices for password resets

❌ **Don't:**
- Use JavaScript (email clients block it)
- Use external CSS files (won't load)
- Make emails too long (keep under 102KB)
- Use too many images (slow to load)
- Forget to test links before going live

## Going Live

Before production:

1. ✅ Test all 4 email types with real emails
2. ✅ Verify all links work
3. ✅ Check emails look good on mobile
4. ✅ Update social media links to real profiles
5. ✅ Set proper sender email (hello@oporto.run)
6. ✅ Configure SPF/DKIM if using custom domain
7. ✅ Test in production environment

---

**Templates Created**: January 24, 2026
**Style**: OPO.RUN Dark Theme
**Tested In**: Gmail, Outlook, Apple Mail
