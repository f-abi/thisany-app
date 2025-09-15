import { IMAGE_SERVICE, IMAGE_CDN, GYING_API, TYPE, IMAGE_FORMAT } from '~/constants/gying'
import { getDynamicHeader } from '~/utils/header'
export default defineEventHandler(async (event) => {
  const query = getQuery<{
    page: string
    type: APP.MovieType
  }>(event)
  if (!['1', '2', '3', '4', '5'].includes(query.page) || !TYPE.includes(query.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  const headers = await getDynamicHeader()
  return $fetch(`${GYING_API}/res/change/${query.type}/${query.page}`, {
    headers: {
      ...headers,
    },
    onResponse({ response }) {
      try {
        const data = response._data as GYING.ChangeRecommend
        response._data = data.t.map<APP.HomeRecommendData>((title, index) => ({
          title,
          id: data.i[index],
          dir: query.type as APP.MovieType,
          tag: data.a[index],
          pf: data.d[index],
          xle: data.g[index],
          image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${query.type}/${data.i[index]}${IMAGE_FORMAT}`,
        }))
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
