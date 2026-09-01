import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jtvktlirkjufinxqhicu.supabase.co';
const supabaseAnonKey = 'sb_publishable_YYw8la-Ccy5ns2v9o-GLpA_mN75nrK9';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase tables...');
  
  const tables = ['bookings', 'destinations', 'services', 'venues', 'posts', 'members', 'partners'];
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      console.log(`❌ Table "${table}":`, error.message, `(Code: ${error.code})`);
    } else {
      console.log(`✅ Table "${table}" exists! Records:`, data?.length);
    }
  }
}

testConnection();
