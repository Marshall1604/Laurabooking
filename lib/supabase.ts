import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jtvktlirkjufinxqhicu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_YYw8la-Ccy5ns2v9o-GLpA_mN75nrK9';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
