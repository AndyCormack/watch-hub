import { traktApi } from '$/lib/trakt'
import type { Profile } from '$/types/trakt/User'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {}
  }

  const req = await fetch(traktApi`/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': import.meta.env.VITE_TRAKT_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const profile: Profile | null = await req.json()

  return {
    user: {
      profile,
    },
  }
}) satisfies LayoutServerLoad
