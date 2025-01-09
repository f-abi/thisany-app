<script setup lang="ts">
import Player, { Events, Plugin } from 'xgplayer'
import HlsPlugin from 'xgplayer-hls'
import 'xgplayer/dist/index.min.css'
import { PLAY_TIME_RECORDING_KEY } from '#shared/constants/app'
const props = defineProps<{
  title: string
  src: string
}>()
const emit = defineEmits<{
  /** 播放结束 */
  ended: []
}>()
const { POSITIONS } = Plugin
class TitlePlugin extends Plugin {
  static override get pluginName() {
    return 'TitlePlugin'
  }
  static override get defaultConfig() {
    return {
      position: POSITIONS.ROOT_TOP,
    }
  }
  constructor(args: any) {
    super(args)
  }
  override render() {
    return `<div class="h-full w-full flex items-center text-white md:text-[16px] fw-600">${props.title}</div>`
  }
}
// 播放器实例
let player: Player | null
// 播放记录器
const timeRecording = useLocalStorage<Record<string, number>>(PLAY_TIME_RECORDING_KEY, {})
onMounted(() => {
  player = new Player({
    id: 'thisany',
    lang: 'zh-cn',
    pip: true, // 画中画
    autoplay: true, // 自动播放
    isLive: false, // live流
    url: props.src, // hls 流地址
    startTime: timeRecording.value[`${props.src}`] ?? 0, // 播放开始时间
    fluid: true, // 是否启用流式布局，启用流式布局时根据width、height计算播放器宽高比，若width和height不是Number类型，默认使用16:9比例
    download: false, // 显示下载按钮
    commonStyle: {
      // 播放完成部分进度条底色
      playedColor: '#366ef4',
      // 缓存部分进度条底色
      cachedColor: '#b5c7ff',
      // 进度条滑块样式
      sliderBtnStyle: {
        background: '#618dff',
      },
      // 音量颜色
      volumeColor: '#366ef4',
    },
    plugins: [HlsPlugin, TitlePlugin], // 插件
  })
  player.on(Events.TIME_UPDATE, (data: { currentTime: number }) => {
    timeRecording.value[`${player!.config.url}`] = data.currentTime
  })
  player.on(Events.ENDED, () => {
    timeRecording.value[`${player!.config.url}`] = 0
    emit('ended')
  })
})
onBeforeUnmount(() => {
  player!.destroy()
  player = null
})
</script>

<template>
  <div id="thisany" />
</template>
