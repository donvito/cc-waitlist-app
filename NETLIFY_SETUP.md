# Netlify Forms Setup

This application uses **Netlify Forms** for handling waitlist submissions - a built-in feature that requires zero configuration!

## How It Works

Netlify Forms automatically detects forms in your site during the build process. When users submit the form, submissions are stored and accessible in your Netlify Dashboard.

## Setup (Automatic)

**No setup required!** Netlify Forms works out of the box:

1. ✅ The form includes `data-netlify="true"` attribute
2. ✅ Netlify automatically detects the form during build
3. ✅ Submissions are automatically stored
4. ✅ No environment variables needed
5. ✅ No API endpoints needed
6. ✅ No external database needed

## Viewing Submissions

To view waitlist submissions:

1. Go to your Netlify site dashboard: https://app.netlify.com
2. Select your site
3. Navigate to **Forms** in the sidebar
4. Click on the **waitlist** form to view all submissions

## Setting Up Notifications (Optional)

Get notified when someone joins your waitlist:

1. In your Netlify site dashboard, go to **Forms**
2. Click on **Form notifications**
3. Choose notification type:
   - **Email notifications**: Get submissions sent to your inbox
   - **Webhook notifications**: Send submissions to external services (Slack, Discord, etc.)

## Spam Protection (Optional)

Netlify Forms includes built-in spam filtering. To enable additional protection:

1. Go to **Forms** → **Form settings**
2. Enable **reCAPTCHA 2** or **Akismet** spam filtering
3. Follow the instructions to configure your preferred spam filter

## Export Submissions

You can export form submissions as CSV:

1. Go to **Forms** → Select your form
2. Click **Export submissions**
3. Choose date range and download as CSV

## No Cost for Small Projects

Netlify Forms includes:
- **100 submissions/month** on the free tier
- Unlimited forms
- Spam filtering
- Email/webhook notifications

For higher volume, check [Netlify's pricing](https://www.netlify.com/pricing/).

## Troubleshooting

If forms aren't working:

1. **Enable form detection**: Go to **Forms** → **Enable form detection**
2. **Redeploy your site**: Forms are detected during the build process
3. **Check the form**: Make sure it has `data-netlify="true"` attribute
4. **View build logs**: Check if Netlify detected your form during deployment

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Form Submissions](https://docs.netlify.com/forms/submissions/)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)
