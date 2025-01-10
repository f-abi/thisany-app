import { FETCH_HEADERS, GYING_API, TYPE } from '~/constants/gying'
export default defineEventHandler((event) => {
  const query = getQuery<{
    id: string
    type: APP.MovieType
  }>(event)
  if (!query.id || !TYPE.includes(query.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  return $fetch(`${GYING_API}/res/captcha/1`, {
    method: 'POST',
    headers: {
      ...FETCH_HEADERS,
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: `${GYING_API}/${query.type}/${query.id}`,
    },
    body: new URLSearchParams({
      webp: '1',
    }).toString(),
  })
})
