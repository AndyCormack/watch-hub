export function traktApi(strings: TemplateStringsArray) {
  return import.meta.env.VITE_TRAKT_API_BASE_URL + strings.join('')
}
