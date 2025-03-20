import { headers, traktApi } from '$/lib/trakt'
import type { ListWithImages } from '$/types/trakt/List'
import type { Profile } from '$/types/trakt/User'
import type { LayoutServerLoad } from './$types'

export const load = (async ({ cookies }) => {
  const accessToken = cookies.get('access_token')
  if (!accessToken) {
    return {}
  }

  const req = await fetch(traktApi`/users/me`, {
    headers: headers(accessToken),
  })
  const profile: Profile | null = await req.json()

  const watchlistReq = await fetch(
    traktApi`/users/me/watchlist?extended=images`,
    { headers: headers(accessToken) }
  )
  const watchlist: ListWithImages = await watchlistReq.json()

  return {
    user: {
      profile,
      watchlist,
    },
  }
}) satisfies LayoutServerLoad
