import {
  FETCH_HEADERS,
  IMAGE_SERVICE,
  IMAGE_CDN,
  GYING_API,
  TYPE,
  IMAGE_FORMAT,
} from '~/constants/gying'
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
  return $fetch(`${GYING_API}/${query.type}/${query.id}`, {
    headers: {
      ...FETCH_HEADERS,
      Referer: `${GYING_API}/${query.type}`,
    },
    onResponse({ response }) {
      try {
        // 提取HTML文本中的 _obj.d
        const detailsMatch = response._data.match(/_obj\.d\s*=\s*(\{.*?\});/s)
        if (detailsMatch) {
          const data = JSON.parse(detailsMatch[1]) as GYING.Video
          response._data = {
            ...data,
            status: data.status
              ? data.status.replace(/<em>/g, '<span>').replace(/<\/em>/g, '</span>')
              : undefined,
            image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${query.type}/${query.id}${IMAGE_FORMAT}`,
          } as APP.Movie
        } else {
          throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: '获取数据失败',
          })
        }
      } catch {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: '获取数据错误',
        })
      }
    },
  })
})
