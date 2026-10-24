export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// The Vercel Supabase integration provisions the publishable key; fall back to
// the legacy anon key for projects that only have that one.
export const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;
