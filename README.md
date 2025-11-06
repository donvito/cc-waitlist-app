# Waitlist App

A modern, serverless waitlist application built with React, Vite, and Netlify Forms. Perfect for collecting early sign-ups with zero backend configuration!

## Features

- **User Registration**: Simple form for users to join the waitlist
- **Serverless**: Built with Netlify Forms - no backend code needed!
- **Zero Configuration**: No database setup, no API keys, no environment variables
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Built-in Dashboard**: View submissions in Netlify's admin panel
- **Spam Protection**: Built-in spam filtering with optional reCAPTCHA
- **Email Notifications**: Optional email notifications for new submissions

## Tech Stack

### Frontend
- React 19
- Vite
- CSS3 with custom properties

### Backend
- **Netlify Forms** - Built-in serverless form handling
- No database required!
- No API endpoints required!
- No server required!

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn
- A Netlify account (free tier available)

**That's it!** No database setup, no API configuration - Netlify Forms handles everything!

## Why Netlify Forms?

This app uses **Netlify Forms** for handling submissions, which means:
- ✅ **Zero configuration** - works automatically on Netlify
- ✅ **No backend code** - no API endpoints to maintain
- ✅ **No database setup** - Netlify stores submissions
- ✅ **100 free submissions/month** on Netlify's free tier
- ✅ **Built-in spam protection** - with optional reCAPTCHA
- ✅ **Email/webhook notifications** - get notified of new submissions
- ✅ **Export to CSV** - download your submissions anytime
- ✅ **Instant deployment** - just push and deploy!

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cc-waitlist-app
```

2. Install dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install:all
```

## Configuration

**Good news!** No configuration needed. Netlify Forms works automatically when you deploy to Netlify.

Just make sure your form has the `data-netlify="true"` attribute (already included!).

## Development

Run the development server:

```bash
npm run dev
```

This will start the Vite dev server at http://localhost:5173

**Note**: Form submissions won't work in local development. Deploy to Netlify to test form functionality.

## Building for Production

Build the client:

```bash
npm run build
```

This creates an optimized production build in `client/dist`.

## Deployment to Netlify

### Method 1: Netlify UI (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Netlify will automatically detect the configuration
6. Click "Deploy site"!
7. **Enable form detection**: Go to **Forms** in your site dashboard and enable form detection

That's it! Your waitlist is now live.

### Method 2: Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize your site:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

## Viewing Submissions

To view waitlist submissions:

1. Go to your Netlify site dashboard: https://app.netlify.com
2. Select your site
3. Navigate to **Forms** in the sidebar
4. Click on the **waitlist** form to view all submissions

You can also:
- Export submissions as CSV
- Set up email notifications
- Enable spam filtering
- View submission analytics

For detailed setup instructions, see [NETLIFY_SETUP.md](NETLIFY_SETUP.md).

## Project Structure

```
cc-waitlist-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── WaitlistForm.jsx
│   │   │   ├── WaitlistForm.css
│   │   │   ├── AdminDashboard.jsx (removed - use Netlify dashboard)
│   │   │   └── AdminDashboard.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── netlify.toml            # Netlify configuration
├── NETLIFY_SETUP.md        # Detailed Netlify Forms setup guide
├── package.json
└── README.md
```

## Customization

### Styling

The app uses CSS custom properties for easy theming. Edit `client/src/index.css`:

```css
:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --success-color: #10b981;
  --error-color: #ef4444;
  /* ... */
}
```

### Branding

Update the header in `client/src/App.jsx`:

```jsx
<header className="header">
  <h1>Your Brand Name</h1>
  <p className="subtitle">Your tagline here</p>
</header>
```

### Form Fields

To add more fields to the form, edit `client/src/components/WaitlistForm.jsx`:

1. Add the field to the hidden form (for Netlify detection)
2. Add the field to the visible form
3. Add to the form state
4. Update the handleChange function

## Setting Up Notifications (Optional)

Get notified when someone joins your waitlist:

1. In your Netlify site dashboard, go to **Forms**
2. Click on **Form notifications**
3. Choose notification type:
   - **Email notifications**: Get submissions sent to your inbox
   - **Webhook notifications**: Send to Slack, Discord, Zapier, etc.

## Spam Protection (Optional)

Enable spam filtering:

1. Go to **Forms** → **Form settings**
2. Enable **Netlify spam filtering** (always on)
3. Optionally enable **reCAPTCHA 2** or **Akismet**

## Cost & Limits

Netlify Forms free tier includes:
- 100 submissions/month
- Unlimited forms
- Spam filtering
- Email/webhook notifications
- CSV export

For higher volume, check [Netlify's pricing](https://www.netlify.com/pricing/).

## Troubleshooting

### Forms not working after deployment

1. **Enable form detection**: Go to **Forms** in Netlify dashboard → **Enable form detection**
2. **Redeploy your site**: Forms are detected during the build process
3. **Check build logs**: Verify Netlify detected your form

### Form submissions not appearing

1. Check if form detection is enabled
2. Verify the form has `data-netlify="true"` attribute
3. Ensure the hidden form-name input exists
4. Check spam folder in Netlify dashboard

### Local development

Form submissions won't work locally - you need to deploy to Netlify to test the form. For local testing:
- Deploy to a test site on Netlify
- Use deploy previews for testing changes

## Migrating from Netlify Blobs

This app previously used Netlify Blobs with custom API endpoints. We've migrated to Netlify Forms for:
- **Simpler architecture** - no backend code to maintain
- **Zero configuration** - no environment variables needed
- **Better UX** - built-in spam protection and notifications
- **Easier management** - use Netlify's dashboard instead of custom admin panel

## Future Enhancements

- [ ] Add more form fields (company, phone, etc.)
- [ ] Integrate with email marketing tools (Mailchimp, ConvertKit)
- [ ] Custom thank you page
- [ ] Add reCAPTCHA for spam protection
- [ ] Webhook integration for real-time notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Form Submissions Guide](https://docs.netlify.com/forms/submissions/)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)

## Support

For issues and questions, please open an issue on GitHub.
