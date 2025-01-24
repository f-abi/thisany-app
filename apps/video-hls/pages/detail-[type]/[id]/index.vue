<script setup lang="tsx">
import { DB_URL, IM_URL, RT_URL } from '~/constants/gying'
const { type, id } = useRoute().params
definePageMeta({
  middleware: [
    'check-type',
    function (to) {
      if (to.params.id.length !== 4) return abortNavigation()
    },
  ],
})
const tab = ref('')
const { data, status, error, refresh } = await useFetch<APP.Movie>('/api/details', {
  params: { type, id },
})
useHead({
  title: data.value?.title,
})
useSeoMeta({
  description: () => `影片：${data.value?.title}-简介：${data.value?.introduce}`,
})
const introduceRef = useTemplateRef<HTMLElement>('IntroduceRef')
const introduceExpand = ref<boolean>(false)
const { height: introduceContentHeight } = useElementSize(introduceRef)
const {
  data: play,
  status: playStatus,
  error: playError,
  refresh: playRefresh,
} = await useFetch<APP.MovieResource>('/api/resource', {
  params: { type, id },
})
if (playStatus.value === 'success' && play.value && play.value.playList.length > 0) {
  tab.value = play.value.playList[0].i
}
</script>

<template>
  <AppContentState :status="status" :error="error" :refresh="refresh">
    <template v-if="data">
      <div class="mb-2 app-box">
        <div class="mb-1 flex justify-between">
          <div class="grid w-[38%] lg:w-[20%] sm:w-[28%] xl:w-[17%]">
            <div>
              <TImage
                class="aspect-ratio-2/3 b b-[--td-bg-color-secondarycontainer] bg-[--td-bg-color-secondarycontainer] p-1"
                lazy
                fit="cover"
                :src="data.image"
                :alt="data.title"
              />
            </div>
          </div>
          <div class="w-[62%] flex flex-col justify-between pl-2 lg:w-[80%] sm:w-[72%] xl:w-[83%]">
            <div class="flex flex-col">
              <p class="pt-1 text-[18px] fw-500">
                <span class="line-height-tight">{{ data.title }}</span>
                <span class="text-[--td-text-color-secondary]">({{ data.year }})</span>
              </p>
              <p
                v-if="data.name && data.name.length > 0"
                class="text-[--td-text-color-secondary] fw-500 line-height-tight"
              >
                {{ data.name }}
              </p>
            </div>
            <div>
              <p v-if="data.diqu" class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-[--td-text-color-secondary]">地区：</span>
                <template v-for="(item, index) in data.diqu" :key="index">
                  <span>{{ item }}</span>
                  <span v-if="index < data.diqu.length - 1">&nbsp;/&nbsp;</span>
                </template>
              </p>
              <p v-if="data.leixing" class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-[--td-text-color-secondary]">类型：</span>
                <template v-for="(item, index) in data.leixing" :key="index">
                  <span>{{ item }}</span>
                  <span v-if="index < data.leixing.length - 1">&nbsp;/&nbsp;</span>
                </template>
              </p>
              <p v-if="data.daoyan" class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-[--td-text-color-secondary]">导演：</span>
                <template v-for="(item, index) in data.daoyan" :key="index">
                  <span>{{ item }}</span>
                  <span v-if="index < data.daoyan.length - 1">&nbsp;/&nbsp;</span>
                </template>
              </p>
              <p v-if="data.bianju" class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-[--td-text-color-secondary]">编剧：</span>
                <template v-for="(item, index) in data.bianju" :key="index">
                  <span>{{ item }}</span>
                  <span v-if="index < data.bianju.length - 1">&nbsp;/&nbsp;</span>
                </template>
              </p>
              <p v-if="data.zhuyan" class="overflow-hidden text-ellipsis whitespace-nowrap">
                <span class="text-[--td-text-color-secondary]">主演：</span>
                <template v-for="(item, index) in data.zhuyan" :key="index">
                  <span>{{ item }}</span>
                  <span v-if="index < data.zhuyan.length - 1">&nbsp;/&nbsp;</span>
                </template>
              </p>
              <div class="hidden sm:block">
                <div v-if="data.stime" class="overflow-hidden text-ellipsis whitespace-nowrap">
                  <span class="text-[--td-text-color-secondary]">{{
                    data.dir === 'mv' ? '上映：' : '首播：'
                  }}</span>
                  <span>{{ data.stime }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap">
                    <span class="text-[--td-text-color-secondary]">片长：</span>
                    <span>{{ data.times ?? '暂无信息' }}</span>
                  </div>
                  <div class="flex flex-row fw-500">
                    <template v-if="data.pf">
                      <NuxtLink
                        v-if="data.pf.db"
                        :to="DB_URL + data.pf.db.id"
                        class="mr-2 text-[--td-success-color]"
                        target="_blank"
                        rel="noopener"
                      >
                        <span>豆瓣</span>
                        <span v-if="data.pf.db.s">&nbsp;{{ data.pf.db.s }}</span>
                      </NuxtLink>
                      <NuxtLink
                        v-if="data.pf.im"
                        :to="IM_URL + data.pf.im.id"
                        class="mr-2 text-[--td-warning-color]"
                        target="_blank"
                        rel="noopener"
                      >
                        <span>IM</span>
                        <span v-if="data.pf.im.s">&nbsp;{{ data.pf.im.s }}</span>
                      </NuxtLink>
                      <NuxtLink
                        v-if="data.pf.ro"
                        :to="RT_URL + (data.dir === 'mv' ? 'm/' : 'tv/') + data.pf.ro.id"
                        class="text-[--td-error-color]"
                        target="_blank"
                        rel="noopener"
                      >
                        <span>RT</span>
                        <span v-if="data.pf.ro.x1">&nbsp;{{ data.pf.ro.x1 }}%</span>
                      </NuxtLink>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm:hidden">
          <div v-if="data.stime" class="overflow-hidden text-ellipsis whitespace-nowrap">
            <span class="text-[--td-text-color-secondary]">{{
              data.dir === 'mv' ? '上映：' : '首播：'
            }}</span>
            <span>{{ data.stime }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap">
              <span class="text-[--td-text-color-secondary]">片长：</span>
              <span>{{ data.times ?? '暂无信息' }}</span>
            </div>
            <div class="flex flex-row fw-500">
              <template v-if="data.pf">
                <NuxtLink
                  v-if="data.pf.db"
                  :to="DB_URL + data.pf.db.id"
                  class="mr-2 text-[--td-success-color]"
                  target="_blank"
                  rel="noopener"
                >
                  <span>豆瓣</span>
                  <span v-if="data.pf.db.s">&nbsp;{{ data.pf.db.s }}</span>
                </NuxtLink>
                <NuxtLink
                  v-if="data.pf.im"
                  :to="IM_URL + data.pf.im.id"
                  class="mr-2 text-[--td-warning-color]"
                  target="_blank"
                  rel="noopener"
                >
                  <span>IM</span>
                  <span v-if="data.pf.im.s">&nbsp;{{ data.pf.im.s }}</span>
                </NuxtLink>
                <NuxtLink
                  v-if="data.pf.ro"
                  :to="RT_URL + (data.dir === 'mv' ? 'm/' : 'tv/') + data.pf.ro.id"
                  class="text-[--td-error-color]"
                  target="_blank"
                  rel="noopener"
                >
                  <span>RT</span>
                  <span v-if="data.pf.ro.x1">&nbsp;{{ data.pf.ro.x1 }}%</span>
                </NuxtLink>
              </template>
            </div>
          </div>
        </div>
        <div v-if="data.introduce">
          <div
            class="max-h-[44px] overflow-hidden transition-all"
            :class="{ 'max-h-[999px]': introduceExpand }"
          >
            <div ref="IntroduceRef" class="break-all text-[--td-text-color-secondary]">
              <span>简介：</span>
              <span v-html="data.introduce" />
            </div>
          </div>
          <div v-if="introduceContentHeight > 44" class="w-full flex items-center justify-center">
            <t-button size="small" variant="text" @click="introduceExpand = !introduceExpand">
              <template #icon>
                <ArrowDownIcon
                  class="rotate-0 transition-all"
                  :class="{ 'rotate-180': introduceExpand }"
                />
              </template>
              {{ introduceExpand ? '收起' : '更多简介' }}
            </t-button>
          </div>
        </div>
      </div>
      <div
        v-if="data.xle"
        class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] md:(mb)"
      >
        <TTabs value="1" theme="card">
          <TTabPanel v-for="i in data.xle.t.length" :key="i" :value="data.xle.s[i - 1]">
            <template #label>
              <NuxtLink :to="`/detail-${data.dir}/${data.xle.u[i - 1]}`">
                {{ data.xle.t[i - 1] }}
              </NuxtLink>
            </template>
          </TTabPanel>
        </TTabs>
      </div>
      <TTag
        v-if="data.status"
        theme="primary"
        variant="outline"
        size="large"
        class="!mb-2 !w-full !rounded-none !bg-[--td-bg-color-container] md:!mb"
      >
        <span v-html="data.status" />
      </TTag>
      <AppContentState :status="playStatus">
        <div
          v-if="play && play.playList && play.playList.length > 0"
          class="mb-2 b b-[--td-component-border] bg-[--td-bg-color-container] md:(mb)"
        >
          <TTabs v-model="tab">
            <TTabPanel v-for="item in play.playList" :key="item.i" :value="item.i" :label="item.t">
              <div class="grid grid-cols-4 gap-2 px-2 py-2 md:(px py)">
                <NuxtLink
                  v-for="(p, pIndex) in item.list"
                  :key="pIndex"
                  :to="`/detail-${type}/${id}/${item.i}/${pIndex + 1}`"
                  class="h-10 flex items-center justify-center b b-[--td-border-level-2-color] rounded-[--td-radius-default] transition-all hover:(b-[--td-brand-color-hover] text-[--td-brand-color-hover])"
                  :class="{
                    'b-[--td-brand-color-hover] text-[--td-brand-color-hover]': false,
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
        <TCollapse v-if="play && play.panList && play.panList.length > 0">
          <TCollapsePanel v-for="(item, index) in play.panList" :key="index" :value="index">
            <template #header>
              {{ item.name }}
            </template>
            <template #default>
              <div v-for="p in item.data" :key="p.url" class="flex flex-col py-2">
                <NuxtLink
                  class="overflow-hidden text-ellipsis whitespace-nowrap text-[--td-brand-color]"
                  :to="p.url"
                  target="_blank"
                  rel="noopener"
                >
                  {{ p.name }}
                </NuxtLink>
                <div class="flex items-center justify-between text-[12px]">
                  <div>
                    <span class="mr-2">{{ p.user }}</span>
                    <span>{{ p.time }}</span>
                  </div>
                  <div>
                    <div v-if="p.password" class="flex items-center">
                      <span class="mr-2">提取密码：{{ p.password }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </TCollapsePanel>
        </TCollapse>
        <ClientOnly>
          <AppCaptcha
            :id="data.id"
            :check="play!.isCaptcha"
            :type="data.dir"
            @complete="playRefresh"
          />
        </ClientOnly>
        <template #pending>
          <div class="app-box">
            <TSkeleton animation="gradient" />
          </div>
        </template>
        <template #error>
          <AppContentError :error="playError" :refresh="playRefresh" class="min-h-40" />
        </template>
      </AppContentState>
    </template>
    <template #pending>
      <div v-for="_ in 4" :key="_" class="mb-2 app-box">
        <TSkeleton animation="gradient" />
      </div>
    </template>
  </AppContentState>
</template>
