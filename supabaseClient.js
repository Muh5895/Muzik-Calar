import { createClient } from "@supabase/supabase-js";

// .env dosyasından Supabase URL ve Key değerlerini alıyoruz
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Supabase istemcisi oluşturuluyor
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
