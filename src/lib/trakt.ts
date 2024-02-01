export function traktApi(strings: TemplateStringsArray) {
  return import.meta.env.VITE_TRAKT_API_BASE_URL + strings.join('')
}

export function headers(accessToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': import.meta.env.VITE_TRAKT_CLIENT_ID,
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  return headers
}
