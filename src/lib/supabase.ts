import { createClient } from '@supabase/supabase-js';

// since it's dummy, it is okay to put here
const supabaseUrl = 'https://wgspuwgeexbypwzrxleg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indnc3B1d2dlZXhieXB3enJ4bGVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NjMxOTMsImV4cCI6MjA1NTMzOTE5M30.Xlxnr9wwPRZvILFdU2J9I4ozbDnUanHFMShEJkSwKq8'; // from Supabase Project Settings → API

export const supabase = createClient(supabaseUrl, supabaseKey);
