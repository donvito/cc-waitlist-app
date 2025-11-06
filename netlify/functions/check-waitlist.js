const validator = require('validator');
const db = require('./db');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, error: 'Method not allowed' })
    };
  }

  try {
    // Get email from query parameters
    const email = event.queryStringParameters?.email;

    if (!email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: 'Email parameter is required'
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

    const entry = await db.getPositionByEmail(email.trim());

    if (entry) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          onWaitlist: true,
          data: entry
        })
      };
    } else {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          onWaitlist: false,
          data: null
        })
      };
    }
  } catch (error) {
    console.error('Error checking waitlist:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Failed to check waitlist'
      })
    };
  }
};
