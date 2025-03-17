import { headers } from '$/lib/trakt'
import type { ProfileExtended } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'

const baseUrl = import.meta.env.VITE_TRAKT_API_BASE_URL

export const load = (async ({ cookies, params: { username } }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {}
  }

  const req = await fetch(`${baseUrl}/users/${username}?extended=vip`, {
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
