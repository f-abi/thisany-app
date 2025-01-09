<script lang="ts" setup>
import type { PageInfo } from 'tdesign-vue-next'
const { name, page } = useRoute().params
const { data, status, error, refresh } = await useFetch<APP.MovieSearch>('/api/search', {
  params: {
    name,
    no: Number.parseInt(page as string),
  },
})
</script>

<template>
  <AppContentState :status="status" :error="error" :refresh="refresh">
    <template v-if="data">
      <template v-if="data.total > 0">
        <div
          class="b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
        >
          <div class="text-4.5 line-height-4.5 mb-2">
            为您找到&nbsp;{{ data.total }}&nbsp;条与&nbsp;{{
              decodeURIComponent(name as string)
            }}&nbsp;相关的资源
          </div>
          <NuxtLink
            v-for="item in data.list"
            :key="item.id"
            :to="`/detail-${item.type}/${item.id}`"
          >
            <div
              class="b-1 b-[--td-bg-color-secondarycontainer] bg-[--td-bg-color-secondarycontainer] p-1 transition-all md:p-2"
            >
              <TImage class="h-120px w-80px" lazy fit="cover" :src="item.image" :alt="item.title" />
            </div>
          </NuxtLink>
          <TPagination
            :current="parseInt(page as string)"
            :page-size="data.pageSize"
            :total="data.total"
            :page-size-options="[]"
            :total-content="false"
            :folded-max-page-btn="3"
            @change="
              async (pageInfo: PageInfo) => await navigateTo(`/search-${name}/${pageInfo.current}`)
            "
          />
        </div>
      </template>
      <template v-else>
        <div
          class="min-h-[calc(100vh-var(--td-comp-size-xxxl)-2rem)] w-full center flex-col b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
        >
          <TEmpty :title="`未找到与 ${decodeURIComponent(name as string)} 相关的资源`" />
        </div>
      </template>
    </template>
    <template #pending>
      <div
        class="min-h-[calc(100vh-var(--td-comp-size-xxxl)-2rem)] w-full center flex-col b b-[--td-component-border] bg-[--td-bg-color-container] px-2 py-2 md:(mb px py)"
      >
        <div>加载</div>
      </div>
    </template>
  </AppContentState>
</template>
