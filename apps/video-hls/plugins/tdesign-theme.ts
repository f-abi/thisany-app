export default defineNuxtPlugin(() => {
  const { cookie } = useRequestHeaders(['cookie'])
  const [, value] =
    cookie
      ?.split('; ')
      .map((s) => s.split('='))
      .find(([k]) => k === 'this-any-theme') ?? []
  if (value) {
    useHead({
      htmlAttrs: {
        'theme-mode': value,
      } as any,
    })
  }
})
