import { headers, traktApi } from '$/lib/trakt'
import type { ProfileExtended } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { getUrl, utapi } from '$/lib/server/uploadthing'
import { env } from '$env/dynamic/private'
import { api } from '$/convex/_generated/api'
import { ConvexHttpClient } from 'convex/browser'

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

  let coverImage: string | null = null
  if (profile?.vip_cover_image) {
    const client = new ConvexHttpClient(env.CONVEX_URL)

    const dbUser = await client.query(api.user.get, {
      slug: profile.ids.slug,
    })

    // TODO: Check if the file already exists
    const exists =
      dbUser?.cover?.key && dbUser?.cover?.traktUrl === profile.vip_cover_image
    if (exists) {
      coverImage = getUrl(dbUser.cover!.key)
    } else {
      // const upload = await utapi.uploadFilesFromUrl(profile.vip_cover_image)
      // if (!upload.error) {
      //   utapi.renameFiles({
      //     fileKey: upload.data.key,
      //     newName: `${profile.ids.slug}/cover`,
      //   })
      // }
      // TODO: Store the uploadthing key and Trakt API URL in the database
    }
  }

  return {
    profile,
    coverImage,
  }
}) satisfies LayoutServerLoad
