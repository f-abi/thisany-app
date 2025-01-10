import { TYPE } from '~/constants/gying'

export default defineNuxtRouteMiddleware((to) => {
  if (!TYPE.includes(to.params.type as any)) return abortNavigation()
})
