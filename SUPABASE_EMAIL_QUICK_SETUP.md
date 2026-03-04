# ⚡ Email Notifications Quick Setup (5 mins)

## 📋 What You're Setting Up

When you publish a new blog post → **automatically email all subscribers** with:
- ✅ Post title & excerpt
- ✅ Author name
- ✅ Beautiful email template
- ✅ Link to read the story

---

## 🚀 Quick Steps

### Step 1️⃣: Get Resend API Key (1 min)
```
1. Go to https://resend.com
2. Sign up (free)
3. Copy your API Key
```

### Step 2️⃣: Create Supabase Edge Function (2 mins)
```
1. Supabase Dashboard → Edge Functions → Create New Function
2. Name: send-post-notification
3. Copy-paste code from: supabase-edge-function.ts
4. Click Secrets → Add RESEND_API_KEY
5. Deploy ✓
```

### Step 3️⃣: Setup Database Trigger (2 mins)
```
1. Supabase Dashboard → SQL Editor
2. Copy-paste from: setup-email-notifications.sql
3. Replace YOUR_PROJECT_ID with your Edge Function URL
4. Run ✓
```

---

## 🧪 Test It

1. Create a new blog post in `blog_posts` table
2. Wait 5 seconds
3. Check your email inbox
4. Done! 🎉

---

## 📁 Files Created

| File | Purpose |
|------|---------|
| `SUPABASE_EMAIL_SETUP.md` | 📖 Detailed setup guide |
| `supabase-edge-function.ts` | 💾 Edge Function code (copy to Supabase) |
| `setup-email-notifications.sql` | 🗄️ SQL trigger setup (run in Supabase) |
| `SUPABASE_EMAIL_QUICK_SETUP.md` | ⚡ This file |

---

## ❓ FAQ

**Q: Do I need to modify any code in my app?**  
A: No! It works automatically. Your Newsletter component already saves emails to the `subscribers` table.

**Q: How many emails can I send?**  
A: Resend free tier = 100 emails/day. Upgrade to Pro for unlimited.

**Q: What if emails aren't sending?**  
A: Check Edge Function logs in Supabase Dashboard → Edge Functions → send-post-notification → Logs

**Q: Can I customize the email template?**  
A: Yes! Edit the HTML in `supabase-edge-function.ts` lines 57-96

---

## 🔗 Links
- [Resend Docs](https://resend.com/docs)
- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [Full Setup Guide](./SUPABASE_EMAIL_SETUP.md)
