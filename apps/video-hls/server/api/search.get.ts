import * as cheerio from 'cheerio'
import { FETCH_HEADERS, IMAGE_SERVICE, IMAGE_CDN, GYING_API } from '~/constants/gying'
export default defineEventHandler((event) => {
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
  return $fetch(`${GYING_API}/s/1---${query.no}/${encodeURIComponent(query.name)}`, {
    method: 'GET',
    headers: {
      ...FETCH_HEADERS,
      Referer: `${GYING_API}`,
    },
    onResponse({ response }) {
      const html = response._data
      const $ = cheerio.load(html)
      const breadcrumbsText = $('.breadcrumbs').text()
      const match = breadcrumbsText.match(/为您找到(\d+)条/)
      const total = match ? Number.parseInt(match[1], 10) : 0
      const results = $('.sr_lists li')
        .map((_, li) => {
          const title = $(li).find('h3').html()?.trim() || ''
          const type = $(li).find('a').attr('href')?.split('/')[1] || ''
          const id = $(li).find('a').attr('href')?.split('/').pop() || ''
          const content = $(li).find('.int').html()?.trim() || ''
          const image = `${IMAGE_SERVICE}${IMAGE_CDN}/img/${type}/${id}.webp&w=320&h=480&fit=cover`
          return { title, content, type, id, image }
        })
        .get()
      response._data = {
        pageNo: Number.parseInt(query.no),
        pageSize: 25,
        pageMax: Math.ceil(total / 25) > 10 ? 10 : Math.ceil(total / 25),
        total,
        list: results,
      }
    },
  })
})
