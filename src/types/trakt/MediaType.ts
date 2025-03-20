export type Media = {
  rank: number
  id: number
  /** @format date-time */
  listed_at: string
  notes: string | null
  type: 'movie' | 'show' | 'season' | 'episode'
} & (Movie | Show | Season | Episode)

export type MediaWithImages = Omit<
  Media,
  'movie' | 'show' | 'season' | 'episode'
> &
  (
    | (Movie & { movie: MediaImages })
    | (Show & { show: Show['show'] & MediaImages })
    | (Season & { show: Show['show'] & MediaImages } & {
        season: Season['season'] & {
          images: { poster: string[]; thumb: string[] }
        }
      })
    | (Episode & { show: Show['show'] & MediaImages } & {
        episode: Episode['episode'] & {
          images: { screenshot: string[] }
        }
      })
  )

export type MediaImages = {
  images: {
    banner: string[]
    clearart: string[]
    fanart: string[]
    logo: string[]
    poster: string[]
    thumb: string[]
  }
}

export type Movie = {
  type: 'movie'
  movie: {
    title: string
    year: number
    ids: {
      slug: string
      trakt: number
      imdb: `tt${number}`
      tmdb: number
    }
  }
}

export type Show = {
  type: 'show'
  show: {
    title: string
    year: number
    ids: {
      slug: string
      trakt: number
      tvdb: number
      imdb: `tt${number}`
      tmdb: number
    }
  }
}

export type Season = {
  type: 'season'
  season: {
    number: number
    ids: {
      tvdb: number
      tmdb: number
    }
  }
  show: Show['show']
}

export type Episode = {
  type: 'episode'
  episode: {
    season: number
    number: number
    title: string
    ids: {
      trakt: number
      tvdb: number
      imdb: `tt${number}`
      tmdb: number
    }
  }
  show: Show['show']
}
