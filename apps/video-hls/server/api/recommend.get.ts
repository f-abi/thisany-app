import { FETCH_HEADERS, IMAGE_SERVICE, IMAGE_CDN, GYING_API, TYPE } from '~/constants/gying'
export default defineEventHandler((event) => {
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
  return $fetch(`${GYING_API}/res/change/${query.type}/${query.page}`, {
    headers: {
      ...FETCH_HEADERS,
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
          image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${query.type}/${data.i[index]}.webp&w=320&h=480&fit=cover`,
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
