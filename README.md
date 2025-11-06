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
- Supabase (PostgreSQL database)
- Node.js

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn
- A Netlify account
- A Supabase account (free tier available)

## Database Setup

### Option 1: Supabase (Recommended)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to the SQL Editor and run this SQL:

```sql
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_waitlist_position ON waitlist(position);
CREATE INDEX idx_waitlist_email ON waitlist(email);
```

4. Get your project credentials:
   - Go to Project Settings > API
   - Copy the `URL` (your SUPABASE_URL)
   - Copy the `anon/public` key (your SUPABASE_ANON_KEY)

### Option 2: Other PostgreSQL Databases

You can also use:
- Neon (https://neon.tech)
- Railway (https://railway.app)
- Heroku Postgres
- Any PostgreSQL database

Just update the `netlify/functions/db.js` file to use your database connection.

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

### Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important**: Never commit the `.env` file to version control. It's already in `.gitignore`.

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

4. Set environment variables:
```bash
netlify env:set SUPABASE_URL "your_supabase_url"
netlify env:set SUPABASE_ANON_KEY "your_supabase_key"
```

5. Deploy:
```bash
netlify deploy --prod
```

### Method 2: Netlify UI

1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com)
3. Click "Add new site" > "Import an existing project"
4. Connect your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `client/dist`
   - Functions directory: `netlify/functions`
6. Add environment variables in Site settings > Environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
7. Deploy!

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

1. **Database Security**: Use Supabase Row Level Security (RLS) policies
2. **Rate Limiting**: Consider adding rate limiting to prevent spam
3. **Email Validation**: Built-in email validation on both frontend and backend
4. **Admin Protection**: Add authentication to protect the admin dashboard in production

## Future Enhancements

- [ ] Email notifications when users join
- [ ] Export waitlist to CSV
- [ ] Email uniqueness check before form submission
- [ ] Analytics dashboard
- [ ] Referral system
- [ ] Authentication for admin dashboard
- [ ] Waitlist approval workflow

## Troubleshooting

### Database not configured error

Make sure you've set the environment variables:
- Check `.env` file exists
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in Netlify

### Functions not working locally

- Make sure you're using `netlify dev` instead of `npm run dev` if you want to test functions locally
- Install Netlify CLI: `npm install -g netlify-cli`

### Build errors

- Clear node_modules: `rm -rf node_modules client/node_modules && npm run install:all`
- Check Node.js version: `node --version` (should be 18+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for any purpose.

## Support

For issues and questions, please open an issue on GitHub.
