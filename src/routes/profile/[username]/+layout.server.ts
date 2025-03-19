import { headers, traktApi } from '$/lib/trakt'
import type { ProfileExtended } from '$/types/trakt/User'
import { error } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types'
import { utapi } from '$/lib/server/uploadthing'
import { env } from '$env/dynamic/private'

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
    // TODO: Check if the file already exists
    const exists = true
    if (exists) {
      const key = 'EUDjoIb1Bmt1un973ehy7iAvrOgHUYsq1lL5CbdZSj2JcXxD'
      coverImage = getUrl(key)
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
