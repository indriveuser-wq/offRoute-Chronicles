# Email Notifications Setup for Supabase

Send automatic email notifications to subscribers when new stories/posts are published.

---

## 🚀 Step 1: Set Up Resend Account (2 minutes)

1. Go to https://resend.com
2. Sign up (free, 100 emails/day)
3. Copy your **API Key** from dashboard
4. Save it somewhere safe

---

## 🔧 Step 2: Configure Supabase Edge Function

### A. Create Edge Function

In Supabase dashboard:
1. Click **"Edge Functions"** (left sidebar)
2. Click **"Create a new function"**
3. Name it: `send-post-notification`
4. Click **"Create function"**

### B. Add the Code

Replace the generated code with:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  try {
    const { post_id, title, excerpt, author } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all subscribers
    const { data: subscribers, error: subError } = await supabase
      .from("subscribers")
      .select("email, name");

    if (subError) throw subError;

    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: "No subscribers" }), {
        status: 200,
      });
    }

    // Send emails via Resend
    const emailPromises = subscribers.map((subscriber) =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'offRoute Chronicles <noreply@offroute.com>',
          to: subscriber.email,
          subject: `📍 New Story: ${title}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #c17f59;">📍 New Story Published!</h2>
              <p>Hi ${subscriber.name || "Traveler"},</p>
              <p>A new story has been published on offRoute Chronicles:</p>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #333;">${title}</h3>
                <p style="color: #666;">${excerpt}</p>
                <p style="font-size: 14px; color: #999;">By ${author}</p>
              </div>
              <p>
                <a href="https://yoursite.com/stories" style="background-color: #c17f59; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
                  Read the Story
                </a>
              </p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
              <p style="font-size: 12px; color: #999;">
                You're receiving this because you subscribed to offRoute Chronicles.<br>
                <a href="https://yoursite.com/unsubscribe" style="color: #c17f59;">Unsubscribe</a>
              </p>
            </div>
          `,
        }),
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const sent = results.filter((r) => r.status === "fulfilled").length;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Emails sent to ${sent} subscribers`,
        sent,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

### C. Add Resend API Key to Secrets

In the Edge Function editor:
1. Click **"Secrets"** button (top right)
2. Add secret:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API Key
3. Click **"Add secret"**

### D. Deploy the Function
- Click **"Deploy"**
- The function URL will appear (save it!)

---

## 🗄️ Step 3: Create Database Trigger

In Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Create trigger function
CREATE OR REPLACE FUNCTION notify_subscribers_of_new_post()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function via HTTP
  SELECT
    net.http_post(
      url := 'https://your-project-id.functions.supabase.co/send-post-notification',
      body := jsonb_build_object(
        'post_id', NEW.id,
        'title', NEW.title,
        'excerpt', NEW.excerpt,
        'author', NEW.author
      ),
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.jwt_token', 't')
      )
    ) INTO NEW;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  -- Log error but don't fail the insert
  RAISE WARNING 'Failed to notify subscribers: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on blog_posts
DROP TRIGGER IF EXISTS trigger_notify_subscribers ON blog_posts;
CREATE TRIGGER trigger_notify_subscribers
  AFTER INSERT ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION notify_subscribers_of_new_post();
```

### Replace in the SQL:
- `'https://your-project-id.functions.supabase.co/send-post-notification'` → Use your actual Edge Function URL

Find your function URL:
- Supabase → Edge Functions → `send-post-notification` → Copy the URL

---

## ✅ Step 4: Enable pgsql Extension (Required)

Run this in SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS http;
```

---

## 🧪 Test It

1. Add a new blog post in Supabase
2. Check Edge Function logs: **Edge Functions** → **send-post-notification** → **Logs**
3. Check your email (check spam folder too)

---

## 📝 Update Newsletter Component (Optional)

To show users they're subscribed:

```javascript
// src/Components/travel/Newsletter.js - Already done, but you can customize the success message:

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email) return;
  
  setIsSubmitting(true);
  await base44.entities.Subscriber.create({ email });
  setIsSuccess(true);
  // Show success message
  setEmail('');
  setIsSubmitting(false);
  
  setTimeout(() => setIsSuccess(false), 3000);
};
```

---

## 🔒 Important Notes

- **Update your URL**: Replace `https://yoursite.com` in the email template with your actual domain
- **Public vs Private**: Keep the Edge Function public (default)
- **Rate Limits**: Resend's free tier: 100 emails/day. Upgrade for more.
- **Unsubscribe**: Implement an unsubscribe feature later if needed

---

## 🐛 Troubleshooting

### Emails not sending?
1. Check Edge Function logs (Supabase dashboard)
2. Verify Resend API key is added to secrets
3. Check RESEND_API_KEY spelling matches exactly

### Trigger not firing?
1. Verify `http` extension is enabled
2. Check SQL trigger syntax in Supabase Webhooks (not triggers)
3. Try inserting a test post manually

### Permission Denied?
1. Go to SQL Editor → double-check `http` extension is enabled
2. Make sure you're using Service Role Key in the trigger (it uses internal auth)

---

## 📊 Monitor Emails

In Supabase, you can add an `email_logs` table to track:

```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscriber_email TEXT NOT NULL,
  post_id UUID REFERENCES blog_posts(id),
  status TEXT,
  sent_at TIMESTAMP DEFAULT NOW()
);
```

Then update the Edge Function to log each send.

