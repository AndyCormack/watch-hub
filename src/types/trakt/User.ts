export type Profile = {
  username: string
  private: boolean
  deleted: boolean
  name: string
  vip: boolean
  vip_ep: boolean
  ids: {
    slug: string
  }
}

export type ProfileExtended = Profile & {
  vip_og: boolean
  vip_years: number
  vip_cover_image: string
}

export type HistoryItem = {
  id: number
  watched_at: string
  action: string
  type: 'movie' | 'episode'

  movie?: {
    title: string
    year: number
    ids: {
      trakt: number
      slug: string
      imdb: string
      tmdb: number
    }
  }

  episode?: {
    season: number
    number: number
    title: string
    ids: {
      trakt: number
      tvdb: number
      imdb: string
      tmdb: number
      tvrage: number
    }
  }

  show?: {
    title: string
    year: number
    ids: {
      trakt: number
      slug: string
      tvdb: number
      imdb: string
      tmdb: number
      tvrage: number
    }
  }
}

export type History = HistoryItem[]
