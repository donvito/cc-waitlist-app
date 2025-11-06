const validator = require('validator');
const db = require('./db');

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { name, email } = JSON.parse(event.body);

    // Validation
    if (!name || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Name and email are required'
        })
      };
    }

    if (!validator.isEmail(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Invalid email address'
        })
      };
    }

    if (name.trim().length < 2) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Name must be at least 2 characters long'
        })
      };
    }

    // Add to waitlist
    const entry = await db.addToWaitlist(name.trim(), email.trim());

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Successfully added to waitlist',
        data: entry
      })
    };
  } catch (error) {
    console.error('Error adding to waitlist:', error);

    if (error.message.includes('already on the waitlist')) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({
          success: false,
          error: error.message
        })
      };
    }

    if (error.message.includes('Database not configured')) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Database not configured. Please contact the administrator.'
        })
      };
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to add to waitlist'
      })
    };
  }
};
