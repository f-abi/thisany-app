<script setup lang="ts">
useHead({
  title: '首页-影片推荐',
})
useSeoMeta({
  description: '影片推荐',
})
const data = useState<APP.Home>('indexData')
try {
  await callOnce(async () => {
    data.value = await $fetch<APP.Home>('/api/home')
  })
} catch {
  showError('加载失败 请刷新页面')
}
async function handleChange(index: number) {
  data.value.recommend[index].loading = true
  const type = data.value.recommend[index].type
  const page =
    data.value.recommend[index].pageNo === data.value.recommend[index].pageMax
      ? 1
      : data.value.recommend[index].pageNo + 1
  try {
    data.value.recommend[index].data = await $fetch<Array<APP.HomeRecommendData>>(
      '/api/recommend',
      {
        params: {
          page,
          type,
        },
      },
    )
    data.value.recommend[index].pageNo = page
  } catch {
    MessagePlugin.error('加载失败')
  } finally {
    data.value.recommend[index].loading = false
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="grid mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
    >
      <TSwiper animation="fade" :duration="500" :interval="5000" class="aspect-ratio-9/4">
        <TSwiperItem v-for="item in data.banner" :key="item.id" class="aspect-ratio-9/4">
          <NuxtLink :to="`/detail-${item.dir}/${item.id}`" class="relative h-full w-full">
            <TImage class="aspect-ratio-9/4" fit="cover" :src="item.cover" :alt="item.title" />
            <div
              class="pos-absolute bottom-0 left-0 z-9 hidden w-full bg-[rgba(0,0,0,0.25)] px-2 py-2 text-[--td-font-white-1] backdrop-blur md:block"
            >
              <div class="flex items-center lg:h-12 md:h-9">
                <span class="line-height-none lg:text-8 md:text-6">{{ item.title }}</span>
              </div>
              <div class="hidden text-[12px] lg:block" v-html="item.introduce" />
            </div>
            <div
              class="pos-absolute bottom-0 left-0 z-9 my-2 bg-[rgba(0,0,0,0.25)] px-2 py-2 text-[12px] text-[--td-font-white-1] line-height-none backdrop-blur md:hidden"
            >
              {{ item.title }}
            </div>
          </NuxtLink>
        </TSwiperItem>
      </TSwiper>
    </div>
    <div
      v-for="(recommend, index) in data.recommend"
      :key="recommend.type"
      class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
    >
      <div class="mb-2 flex items-center justify-between md:mb">
        <div class="relative flex">
          <span class="text-6 fw-600">
            {{ recommend.title }}
          </span>
        </div>
        <TButton variant="text" :loading="recommend.loading" @click="handleChange(index)">
          换一换
          <template #icon>
            <RefreshIcon size="14" />
          </template>
        </TButton>
      </div>
      <AppVideoList :data="recommend.data" />
    </div>
  </div>
</template>
