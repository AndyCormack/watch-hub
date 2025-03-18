import { headers, traktApi } from '$/lib/trakt'
import type { History } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async ({ cookies, params }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {
      error: 'Unauthorized',
    }
  }

  const req = await fetch(
    traktApi`/users/${params.username}/history?limit=20`,
    { headers: headers(accessToken) }
  )
  if (!req.ok) {
    error(404, 'User not found')
  }

  return {
    history: (await req.json()) as History,
  }
}) satisfies PageServerLoad
