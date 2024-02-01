import { traktApi } from '$/lib/trakt'
import type { History } from '$/types/trakt/User'
import type { PageServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {
      error: 'Unauthorized',
    }
  }

  const req = await fetch(traktApi`/users/me/history?limit=20`, {
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': '2',
      'trakt-api-key': import.meta.env.VITE_TRAKT_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const res: History = await req.json()

  return {
    history: res,
  }
}) satisfies PageServerLoad
