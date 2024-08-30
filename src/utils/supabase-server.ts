import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

import { CONFIG } from 'src/config-global'

export function createClient() {
  const cookieStore = cookies()

  return createServerClient(
    CONFIG.supabase.url,
    CONFIG.supabase.key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}