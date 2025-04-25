import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lnjbjcngqlwepdhocalz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuamJqY25ncWx3ZXBkaG9jYWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxODE1NzksImV4cCI6MjA1OTc1NzU3OX0.wEbRNGU2HDSzzlLX2wXM1XlMGarOALSJKw2ztMW6jvk'; // keep secret
export const supabase = createClient(supabaseUrl, supabaseKey);
