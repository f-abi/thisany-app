<script setup lang="ts">
import type { PageInfo } from 'tdesign-vue-next'
useHead({
  title: '影片列表',
})
useSeoMeta({
  description: '影片列表',
})
const route = useRoute()
definePageMeta({
  middleware: [
    'check-type',
    function (to) {
      const page = Number.parseInt(to.params.page as string)
      if (!(Number.isInteger(page) && page >= 1 && page <= 200)) return abortNavigation()
    },
  ],
})
const { data, status, error, refresh } = await useFetch<APP.CategoryListData>('/api/list', {
  params: {
    type: route.params.type,
    no: Number.parseInt(route.params.page as string),
  },
})
</script>

<template>
  <AppContentState :status="status" :error="error" :refresh="refresh">
    <template v-if="data">
      <div
        class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
      >
        <AppVideoList :data="data.list" />
      </div>
      <div class="b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)">
        <t-pagination
          :current="parseInt(route.params.page as string)"
          :page-size="data.pageSize"
          :total="data.total"
          :page-size-options="[]"
          :total-content="false"
          :folded-max-page-btn="3"
          @change="
            async (pageInfo: PageInfo) =>
              await navigateTo(`/list-${route.params.type}/${pageInfo.current}`)
          "
        />
      </div>
    </template>
    <template #pending>
      <div
        class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
      >
        <div class="grid grid-cols-3 w-full gap-1 lg:(grid-cols-6 gap-4) md:(grid-cols-4 gap-4)">
          <div
            v-for="i in 42"
            :key="i"
            class="b-1 b-[--td-bg-color-secondarycontainer] p-1 transition-all md:p-2 md:hover:scale-105"
          >
            <AppSkeleton class="aspect-ratio-2/3" />
            <div class="h-8 w-full flex items-center">
              <AppSkeleton class="h-4 w-full" />
            </div>
            <AppSkeleton class="h-[12px] w-full" />
          </div>
        </div>
      </div>
    </template>
  </AppContentState>
</template>
