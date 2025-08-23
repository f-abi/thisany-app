export const calcPlayList = (data: Array<GYING.Play>): Array<GYING.Play> => {
  const res = data.map((item) => {
    const result: string[] = []
    item.list.forEach((props) => {
      if (Array.isArray(props)) {
        const [words, range] = props as unknown as [string[], number | [number, number]]
        const prefix = words[0] ?? '第'
        const suffix = words[1] ?? '集'
        if (Array.isArray(range)) {
          // 如果是范围 [start, end]
          const [start, end] = range
          for (let i = start; i <= end; i++) {
            result.push(`${prefix}${i}${suffix}`)
          }
        } else result.push(`${prefix}${range}${suffix}`)
      } else result.push(props)
    })
    return {
      ...item,
      list: result,
    }
  })
  return res
}
