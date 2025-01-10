import { FETCH_HEADERS, GYING_API, TYPE } from '#shared/constants/gying'
export default defineEventHandler((event) => {
  const query = getQuery<{
    id: string
    type: APP.MovieType
    do: string
    info: string
  }>(event)
  if (!query.id || !TYPE.includes(query.type) || !query.do || !query.info) {
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
      do: query.do,
      info: query.info,
    }).toString(),
    onResponse({ response }) {
      if (response._data?.code !== 200) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: '验证失败',
        })
      }
    },
  })
})
