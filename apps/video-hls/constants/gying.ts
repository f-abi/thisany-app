export const TYPE = ['mv', 'tv', 'ac'] as const
export enum MOVIE_TYPE {
  mv = 'MOVIE',
  tv = 'TVSERIES',
  ac = 'ANIMAT',
}
export const GYING_API = 'https://www.gyg.si'
export const IMAGE_CDN = 'https://s.tutu.pm'
export const IMAGE_SERVICE = 'https://images.weserv.nl/?url='
export const DB_URL = 'https://movie.douban.com/subject/'
export const IM_URL = 'https://www.imdb.com/title/'
export const RT_URL = 'https://www.rottentomatoes.com/'
const BT_AUTH =
  '928fArh-HdvcdLTd6XGRda2NlmzrgndxdhrejCNbxhj50dTs15c6zkKNIRnqAd_yCZ2WAEe3zGA1NWeq8uIbMo62tF-vlBFtkULW8AVfVufFqZb0uC28ODXAWSQJ1b34PK9amXAFonyNVT5EUWb0JHZaJYeH63f3L6O9fXy02lN9LBmC'
const BT_COOKIETIME = 'c34dRCaRUnX6ywZXWzFPAkNmHJNMWZhRq1Ahhu4N3yrobkqKNaP5'
const PHPSESSID = 'gn9p0edqnkkh8fgevkcfm93pbo'
export const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  Cookie: `BT_auth=${BT_AUTH};BT_cookietime=${BT_COOKIETIME};PHPSESSID=${PHPSESSID}`,
}
