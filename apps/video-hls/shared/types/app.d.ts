declare namespace APP {
  /** 影片类型 */
  type MovieType = GYING.VideoGenres
  /** 主页内容 */
  interface Home {
    /** 横幅 */
    banner: Array<HomeBanner>
    /** 推荐 */
    recommend: Array<HomeRecommend>
  }
  /** 主页横幅 */
  interface HomeBanner {
    /** 标题 */
    title: string
    /** ID */
    id: string
    /** 类型 */
    dir: MovieType
    /** 地区 */
    diqu: string
    /** 简介 */
    introduce: string
    /** 图片 */
    image: string
    /** 封面 */
    cover: string
  }
  /** 主页推荐 */
  interface HomeRecommend {
    /** 推荐板块标题 */
    title: string
    /** 推荐数据 */
    data: Array<HomeRecommendData>
    /** 推荐类型 */
    type: MovieType
    /** 当前页 */
    pageNo: number
    /** 最大页 */
    pageMax: number
    loading: boolean
  }
  /** 主页推荐明细 */
  interface HomeRecommendData {
    /** 标题 */
    title: string
    /** ID */
    id: string
    /** 类型 */
    dir: MovieType
    /** 标签 */
    tag: Array<number | string>
    /** 综合评分 */
    pf: number
    /** 清晰度 / 集数 */
    xle: string
    /** 图片 */
    image: string
  }

  /** 分类列表 */
  interface CategoryListData {
    pageNo: number
    pageSize: 42
    pageMax: number
    total: number
    type: MovieType
    list: Array<HomeRecommendData>
  }

  /** 视频明细 */
  type Movie = GYING.Video & {
    /** 图片 */
    image: string
  }
  /** 视频播放列表 */
  type MoviePlayList = Array<GYING.Play>
  /** 视频下载 */
  interface Download {
    /** 名称 */
    name: string
    /** 提取密码 */
    password: string
    /** 上传时间 */
    time: string
    /** 网盘下载地址 */
    url: string
    /** 上传用户 */
    user: string
  }
  /** 视频下载数据 */
  interface MoviePanList {
    /** 网盘名称 */
    name: string
    /** 数据 */
    data: Array<Download>
  }
  /** 视频源 */
  interface MovieResource {
    panList: Array<MoviePanList>
    playList: MoviePlayList
    isCaptcha: boolean
  }
  /** 视频播放数据 */
  type MoviePlayer = GYING.Player
  /** 搜索视频 */
  interface MovieAsyncSearch {
    title: string
    id: string
    q: string
    year: number
    type: string
    dir: string
    ename: string
    image: string
  }
  /** 搜索数据 */
  interface MovieSearch {
    pageNo: number
    pageSize: number
    pageMax: number
    total: number
    list: Array<MovieSearchList>
  }
  /** 搜索列表 */
  interface MovieSearchList {
    title: string
    type: string
    id: string
    image: string
    ename: string
    year: number
  }
}
