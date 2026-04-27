import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function getTokenExp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.exp === 'number' ? payload.exp : null
  } catch {
    return null
  }
}

/**
 * Returns a valid Supabase access token, refreshing it silently if it's expired
 * or about to expire (within 60 s). Returns null if the user is not authenticated
 * or if the refresh token is also gone.
 */
export async function getValidToken(): Promise<string | null> {
  const token = localStorage.getItem('token')
  if (!token) return null

  const exp = getTokenExp(token)
  const nowSeconds = Math.floor(Date.now() / 1000)

  // Still valid for more than 60 seconds — use as-is
  if (exp && exp > nowSeconds + 60) return token

  // Token expired (or no exp claim) — try to refresh
  const refreshToken = localStorage.getItem('refresh_token')
  if (!refreshToken) {
    localStorage.removeItem('token')
    return null
  }

  try {
    const { data, error } = await supabase.auth.refreshSession({ refresh_token: refreshToken })
    if (error || !data.session) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      return null
    }

    localStorage.setItem('token', data.session.access_token)
    localStorage.setItem('refresh_token', data.session.refresh_token)
    return data.session.access_token
  } catch {
    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    return null
  }
}

/** Store both tokens after a successful login / OTP flow */
export function storeSession(accessToken: string, refreshToken: string) {
  localStorage.setItem('token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

/** Clear both tokens on logout */
export function clearSession() {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}
