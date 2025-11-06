# Netlify Blobs Setup

This application uses Netlify Blobs for storage. To use it in deploy previews and production, you need to configure environment variables.

## Required Environment Variables

Add these variables in your Netlify dashboard:

1. **SITE_ID**
   - Your Netlify Site ID
   - Found in: Site Settings → General → Site details → Site ID

2. **NETLIFY_BLOBS_TOKEN**
   - A Netlify Personal Access Token
   - How to create one:
     1. Go to https://app.netlify.com/user/applications
     2. Click "New access token"
     3. Give it a name (e.g., "Blobs Access")
     4. Copy the token (you won't see it again!)

## How to Add Environment Variables in Netlify

1. Go to your site dashboard: https://app.netlify.com/sites/YOUR-SITE-NAME/settings
2. Navigate to: **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add both variables:
   - Variable: `SITE_ID`, Value: `your-site-id`
   - Variable: `NETLIFY_BLOBS_TOKEN`, Value: `your-access-token`
5. Make sure to set them for **all contexts** (Production, Deploy Previews, Branch deploys)

## Important Notes

- After adding environment variables, you need to **redeploy** your site for changes to take effect
- For deploy previews, make sure the variables are enabled for "Deploy Previews" context
- Keep your access token secret - never commit it to your repository

## Quick Access Links

- **Get Site ID**: Site Settings → General → Site details
- **Create Access Token**: https://app.netlify.com/user/applications
- **Add Environment Variables**: Site Settings → Environment variables

## Verification

After setup, test by submitting the waitlist form. You should see entries being stored successfully.
