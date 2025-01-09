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
        <div class="b b-[--td-component-border] bg-[--td-bg-color-container] px-2 pb-2 md:(px pb)">
          <div class="text-[16px] line-height-tight fw-500 my">
            为您找到 <span class="mx-1">{{ data.total }}</span
            >条与
            <span class="text-[--td-brand-color] mx-1">{{
              decodeURIComponent(name as string)
            }}</span>
            相关的资源
          </div>
          <div class="grid grid-cols-1 w-full gap-1 md:(grid-cols-2 gap-4) mb">
            <div
              v-for="item in data.list"
              :key="item.id"
              class="transition-all hover:(bg-[--td-bg-color-component])"
            >
              <NuxtLink
                :to="`/detail-${item.type}/${item.id}`"
                class="flex items-center justify-between h-full"
              >
                <div
                  class="w-[30%] aspect-[2/3] b-1 b-[--td-bg-color-secondarycontainer] bg-[--td-bg-color-secondarycontainer] p-1"
                >
                  <TImage
                    class="w-full h-full"
                    lazy
                    fit="cover"
                    :src="item.image"
                    :alt="item.title"
                  />
                </div>
                <div
                  class="py-1 w-[calc(70%-.5rem)] md:(w-[calc(70%-1rem)]) flex flex-col h-full justify-between res"
                >
                  <div class="res__t" v-html="item.title" />
                  <div class="res__c" v-html="item.content" />
                </div>
              </NuxtLink>
            </div>
          </div>
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
        <div class="state-box">
          <TEmpty :title="`未找到与 ${decodeURIComponent(name as string)} 相关的资源`" />
        </div>
      </template>
    </template>
    <template #pending>
      <div class="state-box">
        <TLoading />
      </div>
    </template>
  </AppContentState>
</template>

<style lang="css">
.res em {
  color: var(--td-brand-color);
  font-style: normal;
}
.res .res__t {
  font-size: 16px;
  font-weight: 500;
  line-height: 1.25;
}
.res .res__c {
  color: var(--td-text-color-secondary);
  line-height: 22px;
}
.res .res__t,
.res .res__t p,
.res .res__c p {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

@media (min-width: 768px) and (max-width: 968px) {
  .res .res__t,
  .res .res__t p,
  .res .res__c p {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    line-clamp: 1;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>
