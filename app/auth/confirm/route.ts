import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:4',message:'Email confirmation route called',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
  // #endregion
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = '/auth'
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:9',message:'Token params extracted',data:{hasTokenHash:!!token_hash,hasType:!!type,type:type},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
  // #endregion

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createServerClient()
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:19',message:'Before verifyOtp',data:{hasClient:!!supabase},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion

    const { data: verifyData, error } = await supabase.auth.verifyOtp({
      type: type as any,
      token_hash,
    })
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:25',message:'After verifyOtp',data:{hasError:!!error,hasUser:!!verifyData?.user,errorMessage:error?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
    // #endregion

    if (!error && verifyData?.user) {
      // Create profile if it doesn't exist (after email confirmation)
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:32',message:'Creating profile after email confirmation',data:{userId:verifyData.user.id},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: verifyData.user.id,
          role: 'user',
        }, {
          onConflict: 'id'
        })
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:41',message:'Profile creation after confirmation result',data:{hasError:!!profileError,errorMessage:profileError?.message},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      if (profileError) {
        console.error('Profile creation error after email confirmation:', profileError)
      }
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:47',message:'Email verification success',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
      // #endregion
      redirectTo.searchParams.set('verified', 'true')
      return NextResponse.redirect(redirectTo)
    }
  }

  // Return to auth page with error
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d240b8c-3781-4b8a-a243-fe0587445adc',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/auth/confirm/route.ts:37',message:'Email verification failed',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'G'})}).catch(()=>{});
  // #endregion
  redirectTo.pathname = '/auth'
  redirectTo.searchParams.set('error', 'verification_failed')
  return NextResponse.redirect(redirectTo)
}

