export default function () {
  const colorMode = useColorMode()

  function setColorMode() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }

  // 判断是否支持 startViewTransition API
  function enableTransitions() {
    return (
      'startViewTransition' in document &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    )
  }

  async function changeTheme({ clientX: x, clientY: y }: MouseEvent) {
    const isDark = colorMode.value === 'dark'

    if (!enableTransitions()) {
      setColorMode()
      return
    }

    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y),
      )}px at ${x}px ${y}px)`,
    ]

    await document.startViewTransition(async () => {
      setColorMode()
      await nextTick()
    }).ready

    document.documentElement.animate(
      { clipPath: !isDark ? clipPath.reverse() : clipPath },
      {
        duration: 300,
        easing: 'ease-in',
        pseudoElement: `::view-transition-${!isDark ? 'old' : 'new'}(root)`,
      },
    )
  }

  onMounted(() => {
    const style = document.createElement('style')
    style.textContent = `
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      ::view-transition-old(root),
      .dark::view-transition-new(root) {
        z-index: 1;
      }

      ::view-transition-new(root),
      .dark::view-transition-old(root) {
        z-index: 9999;
      }
    `
    document.head.appendChild(style)
    useHead({
      htmlAttrs: {
        'theme-mode': computed(() => colorMode.value),
      } as any,
    })
  })

  return {
    colorMode,
    changeTheme,
  }
}
