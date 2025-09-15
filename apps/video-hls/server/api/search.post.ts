import { IMAGE_SERVICE, IMAGE_CDN, GYING_API, IMAGE_FORMAT } from '~/constants/gying'
import { getDynamicHeader } from '~/utils/header'

export default defineEventHandler(async (event) => {
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
  const headers = await getDynamicHeader()
  return $fetch(`${GYING_API}/res/s/${encodeURIComponent(query.name)}`, {
    method: 'POST',
    headers: {
      ...headers,
      Referer: `${GYING_API}`,
    },
    onResponse({ response }) {
      response._data = response._data.map((_: APP.MovieAsyncSearch) => ({
        ..._,
        image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${_.dir}/${_.id}${IMAGE_FORMAT}`,
      }))
    },
  })
})
