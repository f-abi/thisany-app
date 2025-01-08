import { FETCH_HEADERS, IMAGE_SERVICE, IMAGE_CDN, GYING_API } from '#shared/constants/gying'
export default defineEventHandler(() =>
  $fetch(GYING_API, {
    headers: {
      ...FETCH_HEADERS,
    },
    onResponse({ response }) {
      // 提取HTML文本中的 _obj.banner
      const bannerMatch = response._data.match(/_obj\.banner\s*=\s*(\{.*?\});/s)
      // 提取HTML文本中的 _obj.inlist
      const recommend = response._data.match(/_obj\.inlist\s*=\s*(\[\{.*?\}\]);/s)
      if (bannerMatch && recommend) {
        try {
          const bannerRaw = JSON.parse(bannerMatch[1]) as GYING.Banner
          const recommendRaw = JSON.parse(recommend[1]) as Array<GYING.Recommend>
          response._data = {
            banner: bannerRaw.t.map<APP.HomeBanner>((title, index) => ({
              title,
              id: bannerRaw.i[index],
              dir: bannerRaw.y[index],
              diqu: bannerRaw.d[index],
              introduce: bannerRaw.j[index],
              cover: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${bannerRaw.y[index]}/i_${bannerRaw.i[index]}.webp`,
              image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${bannerRaw.y[index]}/${bannerRaw.i[index]}.webp`,
            })),
            recommend: recommendRaw.map<APP.HomeRecommend>((_) => ({
              title: _.ht,
              data: _.t.map<APP.HomeRecommendData>((title, index) => ({
                title,
                id: _.i[index],
                dir: _.ty,
                tag: _.a[index],
                pf: _.d[index],
                xle: _.g[index],
                image: `${IMAGE_SERVICE}${IMAGE_CDN}/img/${_.ty}/${_.i[index]}.webp&w=320&h=480&fit=cover`,
              })),
              type: _.ty,
              pageNo: 1,
              pageMax: 5,
              loading: false,
            })),
          }
        } catch {
          throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request',
            message: '获取数据错误',
          })
        }
      } else {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
          message: '获取数据失败',
        })
      }
    },
  }),
)
