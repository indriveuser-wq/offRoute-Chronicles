# ✅ Email Notifications Setup Checklist

Complete this checklist to enable automatic email notifications for your subscribers.

---

## 📋 Pre-Setup (Have These Ready)

- [ ] Your Supabase project is set up and running
- [ ] You have `subscribers` table in Supabase
- [ ] You have `blog_posts` table in Supabase
- [ ] Access to [resend.com](https://resend.com)

---

## 🎬 Part 1: Create Resend Account (1 min)

- [ ] Go to https://resend.com
- [ ] Click "Sign Up"
- [ ] Complete registration (use your email)
- [ ] Go to Dashboard
- [ ] Copy your **API Key** 
  - Find it in: API Keys section
  - It looks like: `re_xxxxxxxxxxxxxxxxxxxxx`
- [ ] Save the key somewhere safe (you'll need it in Part 2)

---

## 🚀 Part 2: Create Supabase Edge Function (2 mins)

### In Supabase Dashboard:

- [ ] Click **"Edge Functions"** (left sidebar)
- [ ] Click **"Create a new function"**
- [ ] Name: `send-post-notification`
- [ ] Click **"Create function"**

### Copy the Code:

- [ ] Open file: `supabase-edge-function.ts` (in your project)
- [ ] Select all code (Ctrl+A)
- [ ] Copy (Ctrl+C)
- [ ] Go back to Supabase Edge Function editor
- [ ] Delete the example code
- [ ] Paste the code (Ctrl+V)

### Add Secrets:

- [ ] In Edge Function editor, click **"Secrets"** button (top right)
- [ ] Click **"Add secret"**
  - **Name**: `RESEND_API_KEY`
  - **Value**: Paste your Resend API Key
- [ ] Click **"Add secret"**

### Deploy:

- [ ] Click **"Deploy"** button
- [ ] Wait for deployment to complete ✓
- [ ] Copy the **Function URL** that appears
  - It looks like: `https://your-project-id.functions.supabase.co/send-post-notification`
- [ ] Save this URL (you'll need it in Part 3)

---

## 🗄️ Part 3: Setup Database Trigger (2 mins)

### In Supabase Dashboard:

- [ ] Click **"SQL Editor"** (left sidebar)

### Enable HTTP Extension:

- [ ] Paste and run this:
  ```sql
  CREATE EXTENSION IF NOT EXISTS http;
  ```
- [ ] Wait for ✓ success message

### Create Trigger Function:

- [ ] Open file: `setup-email-notifications.sql`
- [ ] Find line with: `'https://YOUR_PROJECT_ID.functions.supabase.co/send-post-notification'`
- [ ] Replace `YOUR_PROJECT_ID` with your actual function URL from Part 2
  - Example: If your function URL is `https://abc123xyz.functions.supabase.co/send-post-notification`
  - Then replace with that full URL
- [ ] Copy the trigger function (first big block of SQL)
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Wait for ✓ success message

### Create the Trigger:

- [ ] Copy the trigger creation SQL (second block)
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Wait for ✓ success message

### Verify Setup:

- [ ] Copy the verification SQL (at the end of file)
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] If you see a result, the trigger is installed ✓

---

## 🧪 Part 4: Test the Setup (1 min)

### Create a Test Post:

- [ ] In Supabase, go to **Table Editor**
- [ ] Click **`blog_posts`** table
- [ ] Click **"Insert row"**
- [ ] Fill in:
  - **title**: "Test Story - New Adventure"
  - **excerpt**: "Testing our email notification system"
  - **content**: "This is a test post"
  - **author**: "Your Name"
  - **category**: "adventure"
  - **image**: Any URL (e.g., https://via.placeholder.com/500x300)
- [ ] Click **"Save"**

### Check if Email Was Sent:

- [ ] Wait 5-10 seconds
- [ ] Check your email inbox (and spam folder!)
- [ ] You should see an email with:
  - Subject: "📍 New Story: Test Story - New Adventure"
  - Body: Beautiful email with post details
- [ ] ✅ If you got the email, it works!

### Check Edge Function Logs (Optional):

- [ ] Go to **Edge Functions** → **send-post-notification**
- [ ] Click **"Logs"** tab
- [ ] You should see execution logs
- [ ] Success message shows how many emails were sent

---

## 🎉 Done!

Your email notification system is now active:

✅ Every new blog post automatically notifies subscribers  
✅ Beautiful email template sent  
✅ Subscriber names included in email  
✅ Link to read the full story

---

## 📝 What Happens Now

When you create a new blog post:
1. You add a post to `blog_posts` table
2. Database trigger fires automatically
3. Edge Function calls Resend API
4. Resend sends emails to all subscribers (from your `subscribers` table)
5. Subscribers receive beautiful email with post details

---

## ❓ Troubleshooting

### "Email didn't arrive"
- [ ] Check spam folder
- [ ] Wait 10-20 seconds (it's not instant)
- [ ] Check Edge Function logs for errors
- [ ] Verify Resend API key is correct
- [ ] Test with your own email first

### "Trigger didn't work"
- [ ] Verify `http` extension is enabled
- [ ] Check Edge Function URL - make sure it's replaced correctly
- [ ] Look at SQL Editor logs for errors

### "Function deployment failed"
- [ ] Make sure code was fully copied
- [ ] Check for syntax errors
- [ ] Verify Resend API key was added to Secrets (exact spelling!)

### "Still stuck?"
- [ ] Read full guide: [SUPABASE_EMAIL_SETUP.md](./SUPABASE_EMAIL_SETUP.md)
- [ ] Check Resend docs: https://resend.com/docs
- [ ] Check Supabase docs: https://supabase.com/docs

---

## 📊 Monitor & Customize

After everything works:

1. **Customize Email**: Edit HTML in `supabase-edge-function.ts` lines 57-96
2. **Test More Emails**: Try with other subscriber emails
3. **Monitor Resend**: See email stats at https://resend.com/dashboard
4. **Track Logs**: Check Supabase Edge Function logs for details

---

## ✨ Features You Have

- ✅ Automatic notifications on post creation
- ✅ Beautiful, branded email template
- ✅ Subscriber name personalization
- ✅ Direct link to read the story
- ✅ Professional footer with unsubscribe option
- ✅ Error handling (emails fail gracefully)
- ✅ Free tier: 100 emails/day with Resend

---

**Happy blogging! 🚀✈️**
