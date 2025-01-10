<script setup lang="ts">
import { TAG } from '~/constants/gying'
defineProps<{
  data: Array<APP.HomeRecommendData>
}>()
/**
 * 计算标签显示名称
 */
function calcTagText(list: Array<number | string>) {
  return list
    .map((tag, i) => {
      const displayTag =
        i === 0
          ? tag
          : (TAG[tag as number] ?? (typeof tag === 'string' ? (tag?.length > 0 ? tag : '') : ''))
      return displayTag
    })
    .join(' / ')
}
</script>

<template>
  <div class="grid grid-cols-3 gap-1 lg:(grid-cols-6 gap-4) md:(grid-cols-4 gap-4)">
    <NuxtLink v-for="item in data" :key="item.id" :to="`/detail-${item.dir}/${item.id}`">
      <div
        class="b-1 b-[--td-bg-color-secondarycontainer] bg-[--td-bg-color-secondarycontainer] p-1 transition-all md:p-2 md:hover:scale-105"
      >
        <TImage class="aspect-ratio-2/3" lazy fit="cover" :src="item.image" :alt="item.title">
          <template #overlay-content>
            <div class="pos-absolute left-0 top-0 w-full flex items-center justify-start">
              <div
                class="my-2 bg-[rgba(0,0,0,0.25)] px-2 text-[12px] text-[--td-font-white-1] backdrop-blur"
              >
                {{ item.pf ? item.pf.toFixed(1) : '暂无评分' }}
              </div>
            </div>
            <div class="pos-absolute bottom-0 left-0 w-full flex items-center justify-end">
              <div
                class="my-2 bg-[rgba(0,0,0,0.25)] px-2 text-[12px] text-[--td-font-white-1] backdrop-blur"
              >
                {{ item.xle }}
              </div>
            </div>
          </template>
        </TImage>
        <div
          class="overflow-hidden text-ellipsis whitespace-nowrap text-center line-height-loose"
          :title="item.title"
        >
          {{ item.title }}
        </div>
        <div
          class="overflow-hidden text-ellipsis whitespace-nowrap text-center text-[12px] text-[--td-text-color-secondary] line-height-none"
          :title="calcTagText(item.tag)"
        >
          {{ calcTagText(item.tag) }}
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
