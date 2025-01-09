<script setup lang="tsx">
import {
  CatIcon,
  CenterFocusStrongIcon,
  Film1Icon,
  MovieClapperIcon,
  VideoCamera2Icon,
} from 'tdesign-icons-vue-next'
const route = useRoute()
const { colorMode, changeTheme } = useTheme()
const menuDrawerVisible = ref<boolean>(false)
const pageType = ref((route.params.type as string) ?? 'index')
const menu = [
  {
    title: '首页',
    path: '/',
    icon: () => <CenterFocusStrongIcon />,
    type: 'index',
  },
  {
    title: '电影',
    path: '/list-mv/1',
    icon: () => <VideoCamera2Icon />,
    type: 'mv',
  },
  {
    title: '剧集',
    path: '/list-tv/1',
    icon: () => <Film1Icon />,
    type: 'tv',
  },
  {
    title: '动漫',
    path: '/list-ac/1',
    icon: () => <CatIcon />,
    type: 'ac',
  },
]

watch(
  () => route.path,
  async () => {
    await nextTick()
    pageType.value = (route.params.type as string) ?? 'index'
    menuDrawerVisible.value = false
  },
)

const searchValue = ref<string>('')
const { data, refresh, status } = useAsyncData<Array<APP.MovieAsyncSearch>>(
  'search',
  () =>
    $fetch('/api/search', {
      method: 'POST',
      params: { name: searchValue.value },
    }),
  {
    immediate: false,
  },
)

async function handleEnter() {
  await navigateTo(`/search/${searchValue.value}/1`)
}

watch(searchValue, () => {
  refresh()
})
</script>

<template>
  <TLayout>
    <ClientOnly>
      <TDrawer
        v-model:visible="menuDrawerVisible"
        size="232px"
        attach="#teleports"
        placement="left"
        :footer="false"
        :header="false"
        prevent-scroll-through
        @touchmove.prevent
      >
        <TMenu :value="pageType" width="200px">
          <template #logo>
            <NuxtLink
              to="/"
              class="flex items-center flex-row text-[--td-text-color-primary] hover:(text-[--td-brand-color]) transition-all duration-300"
            >
              <MovieClapperIcon size="28" class="mx-2" />
              <div class="pr-8 text-6 fw-600">ThisAny</div>
            </NuxtLink>
          </template>
          <TMenuItem v-for="i in menu" :key="i.path" :icon="i.icon" :value="i.type">
            {{ i.title }}
            <NuxtLink :to="i.path" class="pos-absolute left-0 top-0 h-full w-full" />
          </TMenuItem>
        </TMenu>
      </TDrawer>
    </ClientOnly>
    <THeader class="!pos-sticky !top-0 !z-999 !b-b !b-[--td-component-border]">
      <div class="mx-auto h-full max-w-screen-xl flex items-center justify-between px-2 md:px">
        <div class="flex flex-1 items-center">
          <div class="hidden w-full items-center md:flex">
            <NuxtLink
              to="/"
              class="flex items-center flex-row text-[--td-text-color-primary] hover:(text-[--td-brand-color]) transition-all duration-300"
            >
              <MovieClapperIcon size="28" class="mx-2" />
              <div class="pr-8 text-6 fw-600">ThisAny</div>
            </NuxtLink>
            <TPopup
              trigger="focus"
              destroy-on-close
              placement="bottom"
              :overlay-inner-style="(triggerElem) => ({ width: `${triggerElem.offsetWidth}px` })"
            >
              <TInput
                v-model="searchValue"
                clearable
                placeholder="请输入影片名称"
                class="max-w-md"
                @enter="handleEnter"
              >
                <template #prefix-icon>
                  <SearchIcon />
                </template>
              </TInput>
              <template #content>
                <TLoading
                  :loading="status === 'pending' || status === 'idle'"
                  size="small"
                  show-overlay
                >
                  <TList class="max-h-500px min-h-120px">
                    <template v-if="data && data?.length > 0">
                      <TListItem v-for="item in data" :key="item.id" class="!p-0">
                        <NuxtLink
                          :to="`/detail-${item.dir}/${item.id}`"
                          class="mt-1 w-full md:hover:bg-[--td-bg-color-secondarycontainer]"
                        >
                          <div class="w-full flex flex-row justify-between">
                            <div
                              class="h-[120px] w-[80px] bg-[--td-bg-color-secondarycontainer] p-1"
                            >
                              <TImage
                                class="h-[112px] w-[72px]"
                                lazy
                                fit="cover"
                                error="加载失败"
                                :src="item.image"
                                :alt="item.title"
                              />
                            </div>
                            <div
                              class="min-h-[120px] w-[292px] flex flex-col justify-between text-[12px] text-[--td-text-color-secondary]"
                            >
                              <div class="flex flex-col">
                                <div class="text-4 text-[--td-text-color-primary]">
                                  {{ item.title }}
                                </div>
                                <div>
                                  {{ item.ename }}
                                </div>
                              </div>
                              <div>
                                <div class="text-[--td-text-color-primary]">
                                  {{ item.year }}
                                </div>
                                <div>{{ item.type }}</div>
                              </div>
                            </div>
                          </div>
                        </NuxtLink>
                      </TListItem>
                    </template>
                    <template v-else>
                      <TListItem class="!p-0">
                        <div
                          v-if="status !== 'pending'"
                          class="h-[120px] w-full center text-[--td-text-color-primary]"
                        >
                          暂无数据
                        </div>
                      </TListItem>
                    </template>
                  </TList>
                </TLoading>
              </template>
            </TPopup>
          </div>
          <div class="w-full flex items-center md:hidden">
            <TButton variant="text" @click="menuDrawerVisible = true">
              <template #icon>
                <MenuIcon />
              </template>
              菜单
            </TButton>
          </div>
        </div>
        <div class="flex items-center">
          <div class="md:hidden">
            <TButton variant="text">
              <template #icon>
                <SearchIcon />
              </template>
            </TButton>
            <TButton variant="text">
              <template #icon>
                <TimeIcon />
              </template>
            </TButton>
          </div>
          <div class="hidden md:block">
            <TButton variant="text">
              <template #icon>
                <TimeIcon />
              </template>
              观看历史
            </TButton>
          </div>
          <div class="ml-2">
            <ColorScheme>
              <template #placeholder>
                <TRadioGroup variant="default-filled">
                  <TRadioButton value="default">
                    <SunnyIcon class="!block" />
                  </TRadioButton>
                  <TRadioButton value="default">
                    <MoonIcon class="!block" />
                  </TRadioButton>
                </TRadioGroup>
              </template>
              <TRadioGroup :value="colorMode.value" variant="default-filled" @click="changeTheme">
                <TRadioButton value="light">
                  <SunnyIcon class="!block" />
                </TRadioButton>
                <TRadioButton value="dark">
                  <MoonIcon class="!block" />
                </TRadioButton>
              </TRadioGroup>
            </ColorScheme>
          </div>
        </div>
      </div>
    </THeader>
    <TLayout class="!mx-auto !w-full !max-w-screen-xl !flex !flex-col">
      <section class="flex items-start justify-between">
        <section class="pos-sticky top-[calc(var(--td-comp-size-xxxl)+1rem)] hidden pl md:block">
          <TMenu :value="pageType" width="10rem" class="b b-[--td-component-border]">
            <TMenuItem v-for="i in menu" :key="i.path" :icon="i.icon" :value="i.type">
              {{ i.title }}
              <NuxtLink :to="i.path" class="pos-absolute left-0 top-0 h-full w-full" />
            </TMenuItem>
          </TMenu>
        </section>
        <main
          class="min-h-[calc(100vh-var(--td-comp-size-xxxl))] w-full px-2 py-2 md:(max-w-[calc(100%-11rem)] px py)"
        >
          <slot />
          <TFooter>
            本站所有内容均来自互联网分享站点所提供的公开引用资源，未提供资源上传、存储服务
          </TFooter>
        </main>
      </section>
    </TLayout>
  </TLayout>
</template>
