import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tdfvkgytyaltjdlssuiy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkZnZrZ3l0eWFsdGpkbHNzdWl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3Nzk3MTcsImV4cCI6MjA4MjM1NTcxN30.TP15-jAMDb7tAr4ikQcP9AYBvB7RdvB12lZxvyCMR2E'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
