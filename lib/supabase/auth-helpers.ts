import { createServerClient } from './server'

// Check if user is authenticated and has admin role
export async function isAdmin(): Promise<boolean> {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:4',message:'isAdmin called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
  // #endregion
  try {
    const supabase = createServerClient()
    
    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:10',message:'Session check result',data:{hasSession:!!session,hasError:!!sessionError,errorMessage:sessionError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    
    if (sessionError || !session) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:14',message:'No session found',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      return false
    }

    // Check if user has admin role
    let { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:22',message:'Profile check result',data:{hasProfile:!!profile,hasError:!!profileError,role:profile?.role,errorMessage:profileError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion

    // If profile doesn't exist, create it (fallback for users who signed up before profile creation was added)
    if (profileError && profileError.code === 'PGRST116' || !profile) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:30',message:'Profile missing - creating fallback profile',data:{userId:session.user.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .upsert({
          id: session.user.id,
          role: 'user',
        }, {
          onConflict: 'id'
        })
        .select('role')
        .single()
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:38',message:'Fallback profile creation result',data:{hasProfile:!!newProfile,hasError:!!createError,errorMessage:createError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      if (createError || !newProfile) {
        return false
      }
      profile = newProfile
    } else if (profileError) {
      return false
    }

    const isAdminResult = profile.role === 'admin'
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:30',message:'isAdmin result',data:{isAdmin:isAdminResult,role:profile.role},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    return isAdminResult
  } catch (error: any) {
    console.error('Admin check error:', error)
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/supabase/auth-helpers.ts:34',message:'isAdmin exception',data:{errorMessage:error?.message,errorName:error?.name},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'F'})}).catch(()=>{});
    // #endregion
    return false
  }
}

// Get current user session
export async function getSession() {
  const supabase = createServerClient()
  return await supabase.auth.getSession()
}

