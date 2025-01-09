import { TYPE } from '#shared/constants/gying'

export default defineNuxtRouteMiddleware((to) => {
  if (!TYPE.includes(to.params.type as any)) return abortNavigation()
})
