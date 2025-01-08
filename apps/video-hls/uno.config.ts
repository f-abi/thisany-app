import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    center: 'flex items-center justify-center',
    'app-box': 'b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)',
  },
  theme: {
    fontSize: {
      root: ['14px', '1.4'],
    },
  },
  presets: [presetUno(), presetAttributify(), presetIcons(), presetTypography()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
