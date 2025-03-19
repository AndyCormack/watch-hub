import { env } from '$env/dynamic/private'
import { UTApi } from 'uploadthing/server'

export const utapi = new UTApi({
  token: env.UPLOADTHING_TOKEN,
})

export function getUrl(key: string) {
  return `https://${env.UPLOADTHING_APPID}.ufs.sh/f/${key}`
}
