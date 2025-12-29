import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// #region agent log
if (typeof window === 'undefined') {
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/server.ts:6',message:'Env vars check',data:{hasUrl:!!supabaseUrl,hasKey:!!supabaseAnonKey,urlLength:supabaseUrl?.length||0,keyLength:supabaseAnonKey?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
}
// #endregion

if (!supabaseUrl || !supabaseAnonKey) {
  // #region agent log
  if (typeof window === 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/server.ts:10',message:'Env vars missing error',data:{missingUrl:!supabaseUrl,missingKey:!supabaseAnonKey},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion
  throw new Error('Missing Supabase environment variables')
}

// Server-side Supabase client
// Use this in API routes and server components
export function createServerClient() {
  // #region agent log
  if (typeof window === 'undefined') {
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/server.ts:18',message:'createServerClient called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }
  // #endregion
  try {
    const client = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
    // #region agent log
    if (typeof window === 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/server.ts:26',message:'createServerClient success',data:{clientCreated:!!client},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    }
    // #endregion
    return client
  } catch (error: any) {
    // #region agent log
    if (typeof window === 'undefined') {
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/server.ts:30',message:'createServerClient error',data:{errorMessage:error?.message,errorName:error?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    }
    // #endregion
    throw error
  }
}

// Client-side Supabase client (for use in client components)
// Note: For client-side auth, you may want to use @supabase/ssr instead
export function createClientClient() {
  return createClient(supabaseUrl, supabaseAnonKey)
}

