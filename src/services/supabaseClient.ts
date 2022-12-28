import { createClient } from '@supabase/supabase-js'

if (!process.env.GATSBY_SUPABASE_URL) {
    throw new Error('GATSBY_SUPABASE_URL is not defined')
}

if (!process.env.GATSBY_SUPABASE_ANON_KEY) {
    throw new Error('GATSBY_SUPABASE_ANON_KEY is not defined')
}

const supabaseUrl = process.env.GATSBY_SUPABASE_URL
const supabaseAnonKey = process.env.GATSBY_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)