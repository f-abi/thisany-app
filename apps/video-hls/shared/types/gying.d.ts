declare namespace GYING {
  /** 影片类型 */
  type VideoGenres = 'mv' | 'tv' | 'ac'
  /** 横幅 */
  interface Banner {
    /** 标题 */
    t: Array<string>
    /** 影片ID */
    i: Array<string>
    /** 类型 */
    y: Array<VideoGenres>
    /** 简介 */
    j: Array<string>
    /** 地区 */
    d: Array<string>
    /** 类型文本 */
    c: Array<string>
  }
  /** 推荐 */
  interface Recommend {
    /** 标题 */
    t: Array<string>
    /** Tag */
    a: Array<Array<number | string>>
    /** 清晰度 / 集数 */
    g: Array<string>
    // z: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    /** ? */
    z: number[]
    /** 评分 */
    d: number[]
    /** 影片ID */
    i: Array<string>
    /** 影片类型 */
    ty: VideoGenres
    /** ? */
    h2: number
    /** ? */
    cg: number
    /** 模块标题 */
    ht: string
  }
  /** 换一换 */
  interface ChangeRecommend {
    /** Tag */
    a: Array<Array<number | string>>
    /** 评分 */
    d: number[]
    /** 清晰度 / 集数 */
    g: Array<string>
    /** 影片ID */
    i: Array<string>
    /** ? */
    r: number[]
    /** 标题 */
    t: Array<string>
    /** ? */
    z: number[]
  }
  /** 分类影片列表 */
  interface VideoGenresList {
    page: {
      pages: number
    }
    inlist: ChangeRecommend
  }
  /** 影片 */
  interface Video {
    /** 标题 */
    title: string
    /** 名称 */
    name?: string
    /** 影片ID */
    id: string
    /** 简介 */
    introduce: string
    /** 影片类型 */
    dir: VideoGenres
    /** 类型文本 */
    dname: string
    /** 年份 */
    year: number
    /** 更新状态 */
    status?: string | undefined
    /** 导演 */
    daoyan?: Array<string>
    /** 编剧 */
    bianju?: Array<string>
    /** 主演 */
    zhuyan?: Array<string>
    /** 类型 */
    leixing?: Array<string>
    /** 地区 */
    diqu?: Array<string>
    /** 首播时间 */
    stime?: string
    /** 片长 */
    times?: string
    /** 总剧集 */
    xle?: VideoXle
    /** 评分 */
    pf?: VideoPf
  }
  /** 剧集 */
  interface VideoXle {
    /** 选中 */
    s: Array<string>
    /** ID */
    u: Array<string>
    /** 名称 */
    t: Array<string>
  }
  /** 评分 */
  interface VideoPf {
    /** 豆瓣 */
    db?: Pf
    /** IM */
    im?: Pf
    /** RT */
    ro?: Pf
  }
  /** 评分明细 */
  interface Pf {
    /** ID */
    id: string
    /** 评分 */
    s: string
    /** 百分比 */
    x1?: number
  }
  /** 网盘下载列表 */
  interface Pan {
    /** id */
    id: Array<string>
    /** 名称 */
    name: Array<string>
    /** ? */
    e: Array<number>
    /** 提取密码 */
    p: Array<string>
    /** 上传时间 */
    time: Array<string>
    /** 网盘类型名称 */
    tname: Array<string>
    /** 网盘类型ID */
    type: Array<number>
    /** 网盘地址 */
    url: Array<string>
    /** 上传用户 */
    user: Array<string>
  }
  /** 播放列表 */
  interface Play {
    /** 播放ID */
    i: string
    /** 来源 */
    t: string
    /** ? */
    m: string
    /** 集数列表 */
    list: Array<string>
  }
  interface Downurl {
    code: number
    panlist?: Pan
    playlist?: Array<Play>
    file?: DownurlFile
  }

  interface DownurlFile {
    css: string
    js: string
  }

  interface Player {
    /** 影片名称 */
    title: string
    /** 影片ID */
    bid: string
    /** 影片类型 */
    dir: string
    /** 选中播放列表集数的INDEX */
    page: number
    /** m3u8地址 */
    url: string
    /** 选中播放列表tab类型 */
    select: number
    /** 播放列表 */
    playlist: Array<Play>
  }

  interface Captcha {
    img: string
    text: string
    type: string
  }
}
