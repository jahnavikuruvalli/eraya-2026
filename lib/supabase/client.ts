import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// #region agent log
fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:4',message:'Client env vars check',data:{hasUrl:!!supabaseUrl,hasKey:!!supabaseAnonKey,urlLength:supabaseUrl?.length||0,keyLength:supabaseAnonKey?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

if (!supabaseUrl || !supabaseAnonKey) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:8',message:'Client env vars missing error',data:{missingUrl:!supabaseUrl,missingKey:!supabaseAnonKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  throw new Error('Missing Supabase environment variables')
}

// Client-side Supabase client for browser use
// #region agent log
fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:13',message:'Creating client-side supabase',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
// #region agent log
fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/client.ts:20',message:'Client supabase created',data:{hasClient:!!supabase},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

