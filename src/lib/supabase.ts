import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const rawUrl =
  process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() ||
  'https://pnhzkargitcdhadhvsqx.supabase.co';
const rawAnonKey =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBuaHprYXJnaXRjZGhhZGh2c3F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3MzE3NjEsImV4cCI6MjEwODMwNzc2MX0.e0FfL4MIvsgxnmAr_LS4L2SR9ggOOqlqTGND4Qnwh1k';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawAnonKey &&
  rawUrl.startsWith('https://') &&
  !rawUrl.includes('placeholder')
);

const supabaseUrl = rawUrl;
const supabaseAnonKey = rawAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export type Profile = {
  id: string;
  email?: string | null;
  chosen_name: string;
  pronouns: string[];
  pledged_charter: boolean;
  ghost_mode: boolean;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: string;
  updated_at?: string;
};
