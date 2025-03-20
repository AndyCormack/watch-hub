import type { Media } from '$/types/trakt/MediaType'

function pad(num: number) {
  return num.toString().padStart(2, '0')
}

export function getTitle(media: Media) {
  switch (media.type) {
    case 'movie':
      return media.movie.title
    case 'show':
      return media.show.title
    case 'season':
      return `${media.show.title} - Season ${media.season.number}`
    case 'episode':
      return `${media.show.title} - S${pad(media.episode.season)}E${pad(media.episode.number)} - ${media.episode.title}`
  }
}

export function getSlug(media: Media) {
  switch (media.type) {
    case 'movie':
      return media.movie.ids.slug
    case 'show':
      return media.show.ids.slug
    case 'season':
      return `${media.show.ids.slug}/seasons/${media.season.number}`
    case 'episode':
      return `${media.show.ids.slug}/seasons/${media.episode.season}/episodes/${media.episode.number}`
  }
}
