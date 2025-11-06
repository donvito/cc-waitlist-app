# Waitlist App

A modern, full-stack waitlist application built with React, Vite, and Netlify Functions. Perfect for collecting early sign-ups and managing user waitlists.

## Features

- **User Registration**: Simple form for users to join the waitlist
- **Position Tracking**: Users receive their position in the queue
- **Admin Dashboard**: View and manage all waitlist entries
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Serverless Architecture**: Built with Netlify Functions for scalability
- **Real-time Stats**: View total entries and manage the waitlist

## Tech Stack

### Frontend
- React 19
- Vite
- CSS3 with custom properties

### Backend
- Netlify Functions (Serverless)
- Netlify Blobs (Built-in storage - no external database needed!)
- Node.js

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn
- A Netlify account (free tier available)

**That's it!** No external database setup required - Netlify Blobs is built-in!

## Why Netlify Blobs?

This app uses **Netlify Blobs** for data storage, which means:
- ✅ **No external database signup** required
- ✅ **Zero configuration** - works automatically on Netlify
- ✅ **Free tier included** with your Netlify account
- ✅ **Automatic scaling** - no database management
- ✅ **Fast deployment** - just push and deploy!

### Alternative Database Options

If you need more advanced features or want to use a different database, you can easily modify `netlify/functions/db.js` to use:
- **Supabase** - PostgreSQL (free tier)
- **Neon** - Serverless PostgreSQL (free tier)
- **MongoDB Atlas** - NoSQL database (free tier)
- **PlanetScale** - MySQL (free tier)
- **Airtable** - Spreadsheet-based API (free tier)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cc-waitlist-app
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
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

**Good news!** No manual configuration needed. Netlify Blobs works automatically when deployed to Netlify.

The following environment variables are automatically provided by Netlify:
- `SITE_ID` - Your Netlify site ID
- `NETLIFY_ACCESS_TOKEN` - Authentication token for Netlify services

These are injected automatically during deployment - you don't need to set them manually!

## Development

Run the development server:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Netlify Functions: http://localhost:8888/.netlify/functions/

The app will automatically proxy API requests to the Netlify Functions.

## Building for Production

Build the client:

```bash
npm run build
```

This creates an optimized production build in `client/dist`.

## Deployment to Netlify

### Method 1: Netlify CLI

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

That's it! No environment variables to configure.

### Method 2: Netlify UI (Recommended)

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Netlify will automatically detect the `netlify.toml` configuration file which includes:
   - Build command: `cd client && npm install && npm run build`
   - Publish directory: `client/dist`
   - Functions directory: `netlify/functions`
6. Click "Deploy site"!

No environment variables needed - it just works!

## API Endpoints

All endpoints are serverless functions:

### POST `/api/add-to-waitlist`
Add a new entry to the waitlist.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully added to waitlist",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "position": 1,
    "created_at": "2025-11-06T12:00:00Z"
  }
}
```

### GET `/api/get-waitlist`
Get all waitlist entries.

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### GET `/api/check-waitlist?email=john@example.com`
Check if an email is on the waitlist.

### DELETE `/api/delete-entry?id=1`
Delete a waitlist entry (admin function).

### GET `/api/get-stats`
Get waitlist statistics.

## Project Structure

```
cc-waitlist-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── WaitlistForm.jsx
│   │   │   ├── WaitlistForm.css
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── AdminDashboard.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   └── package.json
├── netlify/
│   └── functions/          # Serverless functions
│       ├── db.js           # Database utilities
│       ├── add-to-waitlist.js
│       ├── get-waitlist.js
│       ├── check-waitlist.js
│       ├── delete-entry.js
│       └── get-stats.js
├── netlify.toml            # Netlify configuration
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

## Security Considerations

1. **Data Storage**: Data is stored securely in Netlify Blobs with automatic encryption
2. **Rate Limiting**: Consider adding rate limiting to prevent spam signups
3. **Email Validation**: Built-in email validation on both frontend and backend
4. **Admin Protection**: Add authentication to protect the admin dashboard in production
5. **CORS**: Properly configured for secure API access

## Future Enhancements

- [ ] Email notifications when users join
- [ ] Export waitlist to CSV
- [ ] Email uniqueness check before form submission
- [ ] Analytics dashboard
- [ ] Referral system
- [ ] Authentication for admin dashboard
- [ ] Waitlist approval workflow

## Troubleshooting

### Functions not working locally

For local development with Netlify Functions:
- Use `netlify dev` instead of `npm run dev`
- Install Netlify CLI: `npm install -g netlify-cli`
- The functions will be available at `http://localhost:8888/.netlify/functions/`

### Data not persisting

- Netlify Blobs only works when deployed to Netlify
- For local development, data will reset between restarts (this is normal)
- Once deployed, data persists automatically

### Build errors

- Clear node_modules: `rm -rf node_modules client/node_modules && npm run install:all`
- Check Node.js version: `node --version` (should be 18+)
- Ensure you've run `npm install` in both root and client directories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and questions, please open an issue on GitHub.
