<script setup lang="ts">
useHead({
  title: '影片播发',
})
const { type, id, pid, episodes } = useRoute().params
const { data, status, error, refresh } = await useFetch<APP.MoviePlayer>('/api/player', {
  params: {
    id,
    type,
    pid,
    episodes,
  },
})
const tab = ref(pid as string)
async function handleEnded() {
  if (data.value && data.value.page < data.value.playlist[data.value.select].list.length - 1) {
    await navigateTo(`/detail-${type}/${id}/${pid}/${data.value.page + 2}`)
  }
}
</script>

<template>
  <AppContentState :status="status" :error="error" :refresh="refresh">
    <template v-if="data">
      <div
        class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
      >
        <div class="grid grid-cols-1 h-full w-[80%] w-full">
          <ClientOnly>
            <AppVideoPlayer
              :title="`${data.title} ${data.playlist[data.select].list[data.page] ?? ''}`"
              :src="data.url"
              @ended="handleEnded"
            />
            <template #placeholder>
              <AppSkeleton class="aspect-ratio-16/9" />
            </template>
          </ClientOnly>
        </div>
      </div>
      <div class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] md:(mb)">
        <TTabs v-model="tab">
          <TTabPanel v-for="item in data.playlist" :key="item.i" :value="item.i" :label="item.t">
            <div class="grid grid-cols-4 gap-2 px-2 py-2 md:(px py)">
              <NuxtLink
                v-for="(p, pIndex) in item.list"
                :key="pIndex"
                :to="`/detail-${type}/${id}/${item.i}/${pIndex + 1}`"
                class="h-10 flex items-center justify-center b b-[--td-border-level-2-color] rounded-[--td-radius-default] transition-all hover:(b-[--td-brand-color-hover] text-[--td-brand-color-hover])"
                :class="{
                  'b-[--td-brand-color-hover] text-[--td-brand-color-hover]':
                    item.i === pid && data.page === pIndex,
                }"
              >
                <span class="overflow-hidden text-ellipsis whitespace-nowrap">
                  {{ p }}
                </span>
              </NuxtLink>
            </div>
          </TTabPanel>
        </TTabs>
      </div>
    </template>
  </AppContentState>
</template>
