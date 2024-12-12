import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://muouktkuoledgcihhjhh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11b3VrdGt1b2xlZGdjaWhoamhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwMjQzMzgsImV4cCI6MjA0OTYwMDMzOH0.PVA7R46l8sYnwPGpaUTxhIwxJyOHfIffOfnKj4YUbdU';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

