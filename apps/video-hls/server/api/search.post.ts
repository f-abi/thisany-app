import { FETCH_HEADERS, IMAGE_SERVICE, IMAGE_CDN, GYING_API } from '~/constants/gying'

export default defineEventHandler((event) => {
  const query = getQuery<{
    name: string
  }>(event)
  if (!query.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  return $fetch(`${GYING_API}/res/s/${encodeURIComponent(query.name)}`, {
    method: 'POST',
    headers: {
      ...FETCH_HEADERS,
      Referer: `${GYING_API}`,
    },
    onResponse({ response }) {
      response._data = response._data.map((_: APP.MovieAsyncSearch) => ({
        ..._,
        image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${_.dir}/${_.id}.webp&w=320&h=480&fit=cover`,
      }))
    },
  })
})
