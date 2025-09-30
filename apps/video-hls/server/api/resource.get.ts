import { TYPE, GYING_API } from '~/constants/gying'
import { calcPlayList } from '~/utils'
import { getDynamicHeader } from '~/utils/header'

export default defineEventHandler(async (event) => {
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

  let headers = await getDynamicHeader()

  const vrg = await $fetch<string>(`${GYING_API}/${query.type}/${query.id}`, {
    method: 'GET',
    headers: {
      ...headers,
      Referer: `${GYING_API}`,
    },
    onResponse({ response }) {
      const cookies = response.headers.getSetCookie()
      const cookieStrings = cookies
        .map((cookie) => {
          const match = cookie.match(/^([^=]+)=([^;]+)/)
          return match ? `${match[1]}=${match[2]}` : ''
        })
        .filter(Boolean)
      response._data = cookieStrings.join(';')
    },
  })

  headers = {
    ...headers,
    Cookie: `${headers['Cookie']};${vrg}`,
  }

  return $fetch(`${GYING_API}/res/downurl/${query.type}/${query.id}`, {
    method: 'GET',
    headers: {
      ...headers,
      Referer: `${GYING_API}/${query.type}/${query.id}`,
    },
    onResponse({ response }) {
      try {
        const data = response._data as GYING.Downurl
        const playList = data.playlist ? calcPlayList(data.playlist) : []
        const panList: APP.MovieResource['panList'] = data.panlist
          ? data.panlist.tname.map((name) => ({ name, data: [] }))
          : []
        if (panList.length > 0 && data.panlist) {
          const { type, name, p, time, url, user } = data.panlist
          type.forEach((panIndex, i) => {
            const panData = {
              name: name[i],
              password: p[i] ?? '',
              time: time[i],
              url: url[i],
              user: user[i],
            }
            panList[panIndex].data.push(panData)
          })
        }
        response._data = {
          playList,
          panList,
          isCaptcha: !!data.file?.js,
        } as APP.MovieResource
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
