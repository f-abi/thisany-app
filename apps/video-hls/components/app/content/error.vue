<script setup lang="ts">
defineProps<{
  error?: any | undefined
  refresh?: () => Promise<void> | undefined
}>()
</script>

<template>
  <div class="state-box">
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
