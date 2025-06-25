import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const { SUPABASE_DB_API_KEY: key, SUPABASE_DB_URL: url } = process.env;

export const supabase = createClient(url, key);
