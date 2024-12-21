import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://vpwlbpvzpmbtnsfsygee.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwd2xicHZ6cG1idG5zZnN5Z2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NjMwOTIsImV4cCI6MjA1MDMzOTA5Mn0.vP0OXvIh35yJdeqVOB4seC2F3a3GKkQRMsXmsCCL1AA';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

