import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ympuwiyerfjjelrwdkmo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcHV3aXllcmZqamVscndka21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1Nzg4NDcsImV4cCI6MjA0MDE1NDg0N30.MH7CEXfVelApPbAX83TVB-xYOAS0tUTQ7785qAvAE7A",
  {
    auth: {
      flowType: "pkce",
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
  }
);

export default supabase;
