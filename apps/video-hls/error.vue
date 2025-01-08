<script setup lang="ts">
import type { NuxtError } from '#app'
defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout>
    <div
      class="min-h-[calc(100vh-var(--td-comp-size-xxxl)-2rem)] w-full flex flex-col items-center justify-center bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
    >
      <div class="h-[32px] flex items-center text-[32px]">
        {{ error?.statusCode }}
      </div>
      <div class="m-1 fw-600">
        {{ error?.message }}
      </div>
      <NuxtLink
        to="/"
        class="[transition-timing-function:linear] b-b b-[--td-text-color-primary] text-[12px] fw-600 line-height-snug transition-all duration-200 hover:(b-[--td-brand-color-hover] text-[--td-brand-color-hover])"
      >
        返回首页
      </NuxtLink>
    </div>
  </NuxtLayout>
</template>
