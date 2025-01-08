<script setup lang="ts">
const props = defineProps<{
  type: string
  id: string
  check: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const visible = ref<boolean>(false)
const canvasRef = useTemplateRef<HTMLCanvasElement>('CanvasRef')
const clickPositions = ref<{ x: number; y: number }[]>([])
const submitLoading = ref<boolean>(false)

const { data, refresh, status } = useAsyncData(
  () =>
    $fetch<GYING.Captcha>('/api/captcha', {
      params: {
        id: props.id,
        type: props.type,
      },
    }),
  {
    lazy: true,
    immediate: false,
    deep: true,
  },
)

const drawImage = () => {
  if (canvasRef.value && status.value === 'success' && data.value) {
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      const image = new Image()
      image.src = `data:image/${data.value.type};base64,${data.value.img}`
      image.onload = () => {
        ctx.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)
        ctx.drawImage(image, 0, 0, canvasRef.value!.width, canvasRef.value!.height)
      }
      image.onerror = () => {
        MessagePlugin.error('绘制验证码失败，请刷新')
      }
    }
  }
}

const canvasClick = (event: MouseEvent) => {
  if (canvasRef.value) {
    const canvas = canvasRef.value
    const rect = canvas.getBoundingClientRect()
    const x = Math.round(event.clientX - rect.left)
    const y = Math.round(event.clientY - rect.top)
    clickPositions.value.push({ x, y })
    if (clickPositions.value.length === 3) {
      submitLoading.value = true
      $fetch('/api/captcha', {
        method: 'POST',
        params: {
          id: props.id,
          type: props.type,
          do: 'check',
          info: [clickPositions.value.map((_) => `${_.x},${_.y}`).join('-'), 315, 180].join(';'),
        },
      })
        .then(
          () => {
            emit('complete')
          },
          () => {
            MessagePlugin.error('未点中正确区域，请重试！')
            handleLoad()
          },
        )
        .finally(() => {
          submitLoading.value = false
        })
    }
  }
}

const positionClick = (index: number) => {
  if (index === 1) clickPositions.value.pop()
  else clickPositions.value = []
}

async function handleLoad() {
  clickPositions.value = []
  await refresh()
  if (status.value === 'success') {
    drawImage()
    visible.value = true
  } else {
    MessagePlugin.error('获取验证码失败，请重试')
  }
}
</script>

<template>
  <div v-if="check" class="p-2 app-box">
    <div class="center">
      <TButton shape="rectangle" variant="text" :loading="status === 'pending'" @click="handleLoad">
        <template #icon>
          <GesturePressIcon size="18" />
        </template>
        点击验证获取更多资源
      </TButton>
    </div>
    <TDialog
      v-model:visible="visible"
      :footer="false"
      :header="false"
      :close-btn="false"
      :close-on-overlay-click="!submitLoading"
      attach="#teleports"
      :dialog-style="{
        padding: '14px 28px',
      }"
      width="375"
    >
      <template #body>
        <TLoading size="small" :loading="submitLoading" show-overlay>
          <div class="mb-2 w-full flex items-center justify-between">
            <div>
              <template v-if="status === 'success'">
                <GesturePressIcon size="22" />
                <span style="vertical-align: middle">
                  <span>请依次点击</span>
                  <span v-for="(_, __) in data?.text?.split('') ?? []" :key="__">"{{ _ }}"</span>
                </span>
              </template>
            </div>
            <TButton
              variant="dashed"
              theme="default"
              :loading="status === 'pending'"
              @click="handleLoad"
            >
              刷新
            </TButton>
          </div>
          <div class="center">
            <div class="pos-relative h-[180px] w-[315px] cursor-pointer">
              <div v-if="status !== 'success'" class="pos-absolute left-0 top-0 h-full w-full">
                <AppSkeleton class="h-full w-full" />
              </div>
              <canvas ref="CanvasRef" width="315" height="180" @click="canvasClick" />
              <div
                v-for="(_, index) in clickPositions"
                :key="_.x"
                class="pos-absolute"
                :style="{ top: `${_.y - 15}px`, left: `${_.x - 15}px` }"
                @click.stop="positionClick(index)"
              >
                <TAvatar size="30">
                  {{ index + 1 }}
                </TAvatar>
              </div>
            </div>
          </div>
        </TLoading>
      </template>
    </TDialog>
  </div>
</template>
