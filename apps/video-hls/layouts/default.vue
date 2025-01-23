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
const isLocked = useScrollLock(window)
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
const scrollbarWidth = ref<number>(0)
const searchScreen = ref<boolean>(false)
const searchValue = ref<string>('')
const searchInput = useTemplateRef<HTMLInputElement>('SearchInput')
const openSearchScreen = () => {
  searchScreen.value = true
  searchInput.value?.focus()
  scrollbarWidth.value = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth.value > 0) {
    document.body.style.paddingRight = `${scrollbarWidth.value}px`
  }
  isLocked.value = true
}
const closeSearchScreen = () => {
  searchScreen.value = false
  isLocked.value = false
  scrollbarWidth.value = 0
  document.body.style.paddingRight = ''
}
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
watch(
  () => route.path,
  async () => {
    await nextTick()
    pageType.value = (route.params.type as string) ?? 'index'
    menuDrawerVisible.value = false
    closeSearchScreen()
  },
)
watch(searchValue, (newValue) => {
  if (newValue.length > 0) {
    refresh()
  }
})
</script>

<template>
  <TLayout>
    <ClientOnly>
      <Teleport to="#teleports">
        <div
          class="pos-fixed top-0 w-full pr-[--app-scroll-width] left-0 h-full z-999 backdrop-blur-[4px] backdrop-saturate-[180%] bg-opacity-50 bg-black transition-opacity duration-300 ease-in-out"
          :class="{
            'opacity-100 pointer-events-auto': searchScreen,
            'opacity-0 pointer-events-none': !searchScreen,
          }"
          :style="{ '--app-scroll-width': scrollbarWidth + 'px' }"
          @click="closeSearchScreen"
        >
          <div
            class="mx-auto w-full max-w-screen-xl flex items-center justify-end"
            @click.stop.prevent
          >
            <div class="w-full px-2 py-2 md:(max-w-[calc(100%-11rem)] px py)">
              <div
                class="bg-[--td-bg-color-container] b b-[--td-component-border] rounded-xl overflow-hidden"
              >
                <TInput
                  ref="SearchInput"
                  v-model="searchValue"
                  class="p-4"
                  clearable
                  placeholder="请输入影片名称"
                  type="search"
                  inputmode="search"
                  @enter="searchInput?.blur()"
                >
                  <template #prefix-icon>
                    <SearchIcon />
                  </template>
                </TInput>
                <template v-if="searchValue.length > 0">
                  <div class="w-full pb-2 px-4 b-b b-[--td-component-border]">
                    <NuxtLink
                      :to="`/search-${searchValue}/1`"
                      class="p-2 rounded-2 flex items-center justify-between text-[--td-text-color-secondary] hover:bg-[--td-bg-color-secondarycontainer]"
                    >
                      <div class="center flex-row">
                        <SearchIcon size="16" />
                        <div
                          class="ml-2 text-[--td-text-color-primary] text-[1rem] overflow-hidden text-ellipsis whitespace-nowrap w-50vw"
                        >
                          {{ searchValue }}
                        </div>
                      </div>
                      <div>搜索全站</div>
                    </NuxtLink>
                  </div>
                  <TList class="max-h-60vh">
                    <template v-if="status === 'pending' || status === 'idle'">
                      <TListItem class="!mx-4 !my-2 !p-0">
                        <div class="py-4 center w-full">
                          <TLoading size="24px" />
                        </div>
                      </TListItem>
                    </template>
                    <template v-else>
                      <template v-if="data">
                        <template v-if="data.length > 0">
                          <TListItem v-for="item in data" :key="item.id" class="!mx-4 !my-2 !p-0">
                            <NuxtLink
                              :to="`/detail-${item.dir}/${item.id}`"
                              class="w-full p-2 rounded-2 flex flex-row hover:bg-[--td-bg-color-secondarycontainer]"
                            >
                              <TImage
                                class="h-[120px] w-[80px] mr-2"
                                lazy
                                fit="cover"
                                :src="item.image"
                                :alt="item.title"
                              />
                              <div
                                class="min-h-[120px] flex flex-col justify-between text-[12px] text-[--td-text-color-secondary] line-height-tight"
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
                            </NuxtLink>
                          </TListItem>
                        </template>
                        <template v-else>
                          <TListItem class="!mx-4 !my-2 !p-0">
                            <div class="py-4 center w-full">
                              <TEmpty title="暂无匹配资源，搜全站试试吧～" />
                            </div>
                          </TListItem>
                        </template>
                      </template>
                    </template>
                  </TList>
                </template>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
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
            <TInput
              v-model="searchValue"
              placeholder="请输入影片名称"
              class="max-w-md"
              @click="openSearchScreen"
            >
              <template #prefix-icon>
                <SearchIcon />
              </template>
            </TInput>
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
            <TButton variant="text" @click="openSearchScreen">
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
            <p>
              <NuxtLink to="https://beian.miit.gov.cn/">闽ICP备2023007468号-1</NuxtLink>
            </p>
            <p>本站所有内容均来自互联网分享站点所提供的公开引用资源，未提供资源上传、存储服务</p>
          </TFooter>
        </main>
      </section>
    </TLayout>
  </TLayout>
</template>
