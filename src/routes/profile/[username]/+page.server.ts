import { headers } from '$/lib/trakt'
import { traktApi } from '$/lib/trakt'
import type { Profile } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

const baseUrl = import.meta.env.VITE_TRAKT_API_BASE_URL

export const load = (async ({ cookies, params: { username } }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {}
  }

  const req = await fetch(`${baseUrl}/users/${username}`, {
    headers: headers(accessToken),
  })
  try {
    const profile: Profile | null = await req.json()
    return { profile }
  } catch (err) {
    error(500, err as Error)
  }

  return {
    profile: null,
  }
}) satisfies PageServerLoad
