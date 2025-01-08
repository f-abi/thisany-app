import { FETCH_HEADERS, GYING_API, TYPE } from '~/constants/gying'

export default defineEventHandler((event) => {
  const query = getQuery<{
    id: string
    type: APP.MovieType
    pid: string
    episodes: string
  }>(event)
  if (!query.id || !TYPE.includes(query.type) || !query.pid || !query.episodes) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  return $fetch(`${GYING_API}/py/${query.pid}_${query.episodes}.html`, {
    headers: {
      ...FETCH_HEADERS,
      Referer: `${GYING_API}/${query.type}/${query.id}`,
    },
    onResponse({ response }) {
      try {
        // 提取HTML文本中的 _obj.player
        const detailsMatch = response._data.match(/_obj\.player\s*=\s*(\{.*?\});/s)
        if (detailsMatch) {
          const data = JSON.parse(detailsMatch[1]) as GYING.Player
          if (data.url.length === 0) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              message: '参数错误',
            })
          }
          response._data = data
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
