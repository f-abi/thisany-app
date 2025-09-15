import { GYING_API, TYPE } from '~/constants/gying'
import { calcPlayList } from '~/utils'
import { getDynamicHeader } from '~/utils/header'
export default defineEventHandler(async (event) => {
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
  const headers = await getDynamicHeader()
  return $fetch(`${GYING_API}/py/${query.pid}_${query.episodes}.html`, {
    headers: {
      ...headers,
      Referer: `${GYING_API}/${query.type}/${query.id}`,
    },
    onResponse({ response }) {
      try {
        // 提取HTML文本中的 _obj.player
        const detailsMatch = response._data.match(/_obj\.player\s*=\s*(\{.*?\});/s)
        if (detailsMatch) {
          const data = JSON.parse(detailsMatch[1]) as GYING.Player
          const playlist = data.playlist ? calcPlayList(data.playlist) : []
          if (data.url.length === 0) {
            throw createError({
              statusCode: 400,
              statusMessage: 'Bad Request',
              message: '参数错误',
            })
          }
          response._data = {
            ...data,
            playlist,
          }
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
