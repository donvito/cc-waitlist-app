const { getStore } = require('@netlify/blobs');

// Initialize Netlify Blobs store
// This uses Netlify's built-in blob storage - no external service needed!
const STORE_NAME = 'waitlist';
const BLOB_KEY = 'entries';

// Helper function to get the blob store
function getBlobStore() {
  // Netlify Blobs requires explicit configuration in deploy previews
  // Use environment variables or let Netlify auto-detect in production
  const siteID = process.env.SITE_ID;
  const token = process.env.NETLIFY_BLOBS_TOKEN;

  // If we have explicit config, use it (required for deploy previews)
  if (siteID && token) {
    return getStore({
      name: STORE_NAME,
      siteID: siteID,
      token: token
    });
  }

  // Otherwise try automatic detection (works in production)
  return getStore(STORE_NAME);
}

// Helper function to get all entries from storage
async function getStoredEntries() {
  try {
    const store = getBlobStore();
    const data = await store.get(BLOB_KEY, { type: 'json' });
    return data || [];
  } catch (error) {
    console.error('Error reading from blob store:', error);
    return [];
  }
}

// Helper function to save entries to storage
async function saveEntries(entries) {
  const store = getBlobStore();
  await store.setJSON(BLOB_KEY, entries);
}

// Add entry to waitlist
async function addToWaitlist(name, email) {
  const entries = await getStoredEntries();

  // Check if email already exists
  const emailLower = email.toLowerCase();
  const existing = entries.find(e => e.email.toLowerCase() === emailLower);

  if (existing) {
    throw new Error('This email is already on the waitlist');
  }

  // Get next ID and position
  const maxId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) : 0;
  const nextPosition = entries.length + 1;

  // Create new entry
  const newEntry = {
    id: maxId + 1,
    name,
    email: emailLower,
    position: nextPosition,
    created_at: new Date().toISOString()
  };

  // Add to entries and save
  entries.push(newEntry);
  await saveEntries(entries);

  return newEntry;
}

// Get all waitlist entries
async function getAllEntries() {
  const entries = await getStoredEntries();
  return entries.sort((a, b) => a.position - b.position);
}

// Get position by email
async function getPositionByEmail(email) {
  const entries = await getStoredEntries();
  const emailLower = email.toLowerCase();
  return entries.find(e => e.email.toLowerCase() === emailLower) || null;
}

// Delete entry
async function deleteEntry(id) {
  const entries = await getStoredEntries();
  const index = entries.findIndex(e => e.id === parseInt(id));

  if (index === -1) {
    return false;
  }

  // Remove the entry
  entries.splice(index, 1);

  // Reorder positions
  entries.forEach((entry, idx) => {
    entry.position = idx + 1;
  });

  await saveEntries(entries);
  return true;
}

// Get count
async function getCount() {
  const entries = await getStoredEntries();
  return entries.length;
}

// Helper function to check if database is configured
function isDatabaseConfigured() {
  return true; // Netlify Blobs is always available on Netlify
}

module.exports = {
  addToWaitlist,
  getAllEntries,
  getPositionByEmail,
  deleteEntry,
  getCount,
  isDatabaseConfigured
};
