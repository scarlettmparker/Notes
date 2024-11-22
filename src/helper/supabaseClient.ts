import { createClient } from "@supabase/supabase-js";

export const GITHUB_CALLBACK = import.meta.env.VITE_GITHUB_CALLBACK;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(
    SUPABASE_URL, SUPABASE_KEY
);

export default null;