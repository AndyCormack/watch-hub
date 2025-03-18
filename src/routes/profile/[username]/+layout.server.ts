import { headers, traktApi } from '$/lib/trakt'
import type { ProfileExtended } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies, params: { username } }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    error(401, 'Unauthorized')
  }

  const req = await fetch(traktApi`/users/${username}?extended=vip`, {
    headers: headers(accessToken),
  })
  if (!req.ok) {
    error(404, 'User not found')
  }

  const profile: ProfileExtended | null = await req.json()
  if (profile?.deleted) {
    error(404, 'User not found')
  }

  return { profile }
}) satisfies LayoutServerLoad
