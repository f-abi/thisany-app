export const TAG = [
  '美国',
  '大陆',
  '日本',
  '剧情',
  '科幻',
  '动作',
  '喜剧',
  '爱情',
  '冒险',
  '犯罪',
  '悬疑',
  '儿童',
  '歌舞',
  '音乐',
  '奇幻',
  '动画',
  '恐怖',
  '惊悚',
  '丧尸',
  '战争',
  '传记',
  '纪录',
  '西部',
  '灾难',
  '古装',
  '武侠',
  '家庭',
  '短片',
  '校园',
  '文艺',
  '运动',
  '青春',
  '同性',
  '励志',
  '人性',
  '美食',
  '女性',
  '治愈',
  '历史',
  '真人秀',
  '脱口秀',
  '萌系',
  '日常',
  '热血',
  '机战',
  '游戏',
  '情色',
  '搞笑',
  '恋爱',
  '后宫',
  '百合',
  '基腐',
  '致郁',
  '异世界',
  '泡面',
  '战斗',
  '加拿大',
  '香港',
  '台湾',
  '韩国',
  '印度',
  '德国',
  '法国',
  '英国',
  '意大利',
] as const
export const TYPE = ['mv', 'tv', 'ac'] as const
export enum MOVIE_TYPE {
  mv = 'MOVIE',
  tv = 'TVSERIES',
  ac = 'ANIMAT',
}
export const GYING_API = 'https://www.gyg.si'
export const IMAGE_CDN = 'https://s.tutu.pm'
export const IMAGE_SERVICE = 'https://images.weserv.nl/?url='
export const DB_URL = 'https://movie.douban.com/subject/'
export const IM_URL = 'https://www.imdb.com/title/'
export const RT_URL = 'https://www.rottentomatoes.com/'
const BT_AUTH =
  '928fArh-HdvcdLTd6XGRda2NlmzrgndxdhrejCNbxhj50dTs15c6zkKNIRnqAd_yCZ2WAEe3zGA1NWeq8uIbMo62tF-vlBFtkULW8AVfVufFqZb0uC28ODXAWSQJ1b34PK9amXAFonyNVT5EUWb0JHZaJYeH63f3L6O9fXy02lN9LBmC'
const BT_COOKIETIME = 'c34dRCaRUnX6ywZXWzFPAkNmHJNMWZhRq1Ahhu4N3yrobkqKNaP5'
const PHPSESSID = 'gn9p0edqnkkh8fgevkcfm93pbo'
export const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
  Cookie: `BT_auth=${BT_AUTH};BT_cookietime=${BT_COOKIETIME};PHPSESSID=${PHPSESSID}`,
}
