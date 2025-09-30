import { IMAGE_SERVICE, IMAGE_CDN, GYING_API, IMAGE_FORMAT } from '~/constants/gying'
import { getDynamicHeader } from '~/utils/header'
export default defineEventHandler(async (event) => {
  const query = getQuery<{
    no: string
    name: string
  }>(event)
  if (!query.no || !query.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: '参数错误',
    })
  }
  const headers = await getDynamicHeader()
  return $fetch(`${GYING_API}/res/s/1---${query.no}/${encodeURIComponent(query.name)}`, {
    method: 'GET',
    headers: {
      ...headers,
      Referer: `${GYING_API}`,
    },
    onResponse({ response }) {
      const res = response._data as {
        inlist: {
          daoyan: Array<string>
          bianju: Array<string>
          zhuyan: Array<string>
          pf: any
          title: Array<string>
          name: Array<string>
          ename: Array<string>
          year: Array<string>
          d: Array<string>
          i: Array<string>
        }
        page: {
          pages: number
          curr: number
          set: number
        }
      }

      const list = res.inlist.title.map((title, index) => ({
        title,
        id: res.inlist.i[index],
        type: res.inlist.d[index],
        image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${res.inlist.d[index]}/${res.inlist.i[index]}${IMAGE_FORMAT}`,
        ename: res.inlist.ename[index],
        year: res.inlist.year[index],
      }))

      response._data = {
        pageNo: res.page.curr,
        pageSize: 25,
        total: res.page.pages === 1 ? res.inlist.title.length : res.page.pages * 25,
        pageMax: res.page.pages,
        list,
      }
    },
  })
})
