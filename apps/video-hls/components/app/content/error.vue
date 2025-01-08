<script setup lang="ts">
defineProps<{
  error?: any | undefined
  refresh?: () => Promise<void> | undefined
}>()
</script>

<template>
  <div
    class="min-h-[calc(100vh-var(--td-comp-size-xxxl)-2rem)] w-full flex flex-col items-center justify-center b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
  >
    <DataErrorIcon size="32" />
    <div class="m-1 fw-600">
      {{ error?.data?.message ?? '服务发生错误' }}
    </div>
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/"
        class="[transition-timing-function:linear] b-b b-[--td-text-color-primary] text-[12px] fw-600 line-height-snug transition-all duration-200 hover:(b-[--td-brand-color-hover] text-[--td-brand-color-hover])"
      >
        返回首页
      </NuxtLink>
      <div
        v-if="refresh"
        class="[transition-timing-function:linear] ml-2 cursor-pointer b-b b-[--td-text-color-primary] text-[12px] fw-600 line-height-snug transition-all duration-200 hover:(b-[--td-brand-color-hover] text-[--td-brand-color-hover])"
        @click="refresh"
      >
        重试
      </div>
    </div>
  </div>
</template>
