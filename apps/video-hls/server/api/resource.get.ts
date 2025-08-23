import { FETCH_HEADERS, TYPE, GYING_API } from '~/constants/gying'

const calcList = (data: Array<GYING.Play>): Array<GYING.Play> => {
  const res = data.map((item) => {
    const result: string[] = []
    item.list.forEach((props) => {
      if (Array.isArray(props)) {
        const [words, range] = props as unknown as [string[], number | [number, number]]
        const prefix = words[0] ?? '第'
        const suffix = words[1] ?? '集'
        if (Array.isArray(range)) {
          // 如果是范围 [start, end]
          const [start, end] = range
          for (let i = start; i <= end; i++) {
            result.push(`${prefix}${i}${suffix}`)
          }
        } else result.push(`${prefix}${range}${suffix}`)
      } else result.push(props)
    })
    return {
      ...item,
      list: result,
    }
  })
  return res
}

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
  return $fetch(`${GYING_API}/res/downurl/${query.type}/${query.id}`, {
    method: 'GET',
    headers: {
      ...FETCH_HEADERS,
      Referer: `${GYING_API}/${query.type}/${query.id}`,
    },
    onResponse({ response }) {
      try {
        const data = response._data as GYING.Downurl
        const playList = data.playlist ? calcList(data.playlist) : []
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
