// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  sourcemap: {
    server: true,
    client: true,
  },
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'zh-Hans-CN',
      },
      // 禁止移动端缩放
      viewport:
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover',
      // 小米字体
      link: [
        {
          rel: 'stylesheet',
          href: 'https://font.sec.miui.com/font/css?family=MiSans:300,400,500,600,700:Chinese_Simplify,Latin&display=swap',
        },
      ],
    },
  },
  // TS支持
  typescript: {
    // 启用类型检查
    typeCheck: true,
    // 严格类型检查
    strict: true,
  },
  modules: [
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@tdesign-vue-next/nuxt',
  ],
  plugins: ['@/plugins/tdesign-theme.ts'],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    storage: 'cookie',
    storageKey: 'this-any-theme',
  },
  tdesign: {
    // 解析单个图标组件
    resolveIcons: true,
  },
  css: [
    // css-reset https://unocss.dev/guide/style-reset
    '@unocss/reset/tailwind.css',
    // global variable
    '~/assets/css/variable.css',
  ],
  devServer: {
    // 本地开发服务器所有地址
    host: '0.0.0.0',
  },
  runtimeConfig: {
    // 如果配置了ENV会覆盖这里 (? 渲染时也会在html中script插入 不太好)
  },
})
