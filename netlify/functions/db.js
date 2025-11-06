const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
// You'll need to set these environment variables in Netlify:
// SUPABASE_URL and SUPABASE_ANON_KEY
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Helper function to check if database is configured
function isDatabaseConfigured() {
  return supabase !== null;
}

// Add entry to waitlist
async function addToWaitlist(name, email) {
  if (!supabase) {
    throw new Error('Database not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  }

  // Get current max position
  const { data: maxData } = await supabase
    .from('waitlist')
    .select('position')
    .order('position', { ascending: false })
    .limit(1);

  const nextPosition = maxData && maxData.length > 0 ? maxData[0].position + 1 : 1;

  // Insert new entry
  const { data, error } = await supabase
    .from('waitlist')
    .insert([
      {
        name,
        email: email.toLowerCase(),
        position: nextPosition
      }
    ])
    .select();

  if (error) {
    if (error.code === '23505') { // Unique constraint violation
      throw new Error('This email is already on the waitlist');
    }
    throw error;
  }

  return data[0];
}

// Get all waitlist entries
async function getAllEntries() {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .order('position', { ascending: true });

  if (error) throw error;
  return data;
}

// Get position by email
async function getPositionByEmail(email) {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    throw error;
  }

  return data;
}

// Delete entry
async function deleteEntry(id) {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { error } = await supabase
    .from('waitlist')
    .delete()
    .eq('id', id);

  if (error) throw error;

  // Reorder positions
  await reorderPositions();
  return true;
}

// Reorder positions after deletion
async function reorderPositions() {
  const entries = await getAllEntries();

  for (let i = 0; i < entries.length; i++) {
    await supabase
      .from('waitlist')
      .update({ position: i + 1 })
      .eq('id', entries[i].id);
  }
}

// Get count
async function getCount() {
  if (!supabase) {
    throw new Error('Database not configured');
  }

  const { count, error } = await supabase
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count;
}

module.exports = {
  addToWaitlist,
  getAllEntries,
  getPositionByEmail,
  deleteEntry,
  getCount,
  isDatabaseConfigured
};
