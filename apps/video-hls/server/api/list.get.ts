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
    no: string
    type: APP.MovieType
  }>(event)
  if (!query.no || !TYPE.includes(query.type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  return $fetch(`${GYING_API}/res/${query.type}?page${query.no}`, {
    method: 'GET',
    headers: {
      ...FETCH_HEADERS,
    },
    onResponse({ response }) {
      try {
        const preData = response._data as GYING.VideoGenresList
        const data = preData.inlist
        response._data = {
          type: query.type,
          pageNo: Number.parseInt(query.no),
          pageSize: 42,
          pageMax: preData.page.pages,
          total: 42 * preData.page.pages,
          list: data.t.map<APP.HomeRecommendData>((title, index) => ({
            title,
            id: data.i[index],
            dir: query.type as APP.MovieType,
            tag: data.a[index],
            pf: data.d[index],
            xle: data.g[index],
            image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${query.type}/${data.i[index]}${IMAGE_FORMAT}`,
          })),
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
