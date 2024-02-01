import type { AuthTokenResponse } from '$/types/trakt/Auth'
import { redirect, error, type Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { traktApi } from '$/lib/trakt'

export const load = (async ({ url, cookies }) => {
  if (!url.searchParams.has('code')) {
    error(401, 'Missing authorisation code')
  }

  const body = {
    code: url.searchParams.get('code') as string,
    client_id: import.meta.env.VITE_TRAKT_CLIENT_ID,
    client_secret: import.meta.env.VITE_TRAKT_CLIENT_SECRET,
    redirect_uri: 'http://localhost:5173/auth',
    grant_type: 'authorization_code',
  }

  try {
    const data = await fetch(traktApi`/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const res: AuthTokenResponse = await data.json()

    cookies.set('access_token', res.access_token, { path: '/' })
    cookies.set('refresh_token', res.refresh_token, { path: '/' })
  } catch (error) {
    console.error(error)

    return {
      error: `Failed to authenticate ${(error as Error).message}`,
    }
  }

  redirect(302, '/')
}) satisfies PageServerLoad

export const actions = {
  logout: async (event) => {
    event.cookies.delete('access_token', { path: '/' })
    event.cookies.delete('refresh_token', { path: '/' })

    redirect(302, '/')
  },
} satisfies Actions
