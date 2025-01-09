<script setup lang="ts">
import type { AsyncDataRequestStatus } from '#app'
defineProps<{
  status: AsyncDataRequestStatus
  error?: any | undefined
  refresh?: () => Promise<void> | undefined
}>()
</script>

<template>
  <div class="flex flex-col">
    <template v-if="status === 'idle'">
      <slot name="idle" />
    </template>
    <template v-else-if="status === 'pending'">
      <slot name="pending" />
    </template>
    <template v-else-if="status === 'success'">
      <slot />
    </template>
    <template v-else-if="status === 'error'">
      <slot name="error">
        <AppContentError :error="error" :refresh="refresh" />
      </slot>
    </template>
  </div>
</template>
