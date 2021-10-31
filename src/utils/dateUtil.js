// 中文星期
const CN_WEEK = ['日', '一', '二', '三', '四', '五', '六']
// 星期偏离度 周日开始 = 0，周一开始 = 1
const WEEK_START = 1
const CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九']

function formatNum(num) {
  return num < 10 ? '0' + num : num
}
/**
 * 获取一个月星期分布
 * @param {*} yearCN_
 * @param {*} month
 */
function getWeek(year, month) {
  year = parseInt(year)
  month = parseInt(month)

  const firstDate = new Date(year, month - 1, 1)
  const lastDate = new Date(year, month, 0)

  const lastDay = lastDate.getDate()

  const week = firstDate.getDay()
  const week_d = parseInt((week - WEEK_START + 7) % 7)
  const weeks = []

  for (let i = 1; i <= lastDay; i++) {
    const w = parseInt((i - 1 + week_d) / 7)
    const d = (i - 1 + week) % 7

    if (!weeks[w]) {
      weeks[w] = {
        name: `第${CN_NUM[w]}周`,
        data: []
      }
    }
    weeks[w].data.push({
      time: `${year}-${formatNum(month)}-${formatNum(i)}`,
      day: i,
      week: `周${CN_WEEK[d]}`
    })
  }
  weeks.forEach(w => {
    // 一周开始时间
    w.first = w.data[0].time
    // 一周结束时间
    w.last = w.data[w.data.length - 1].time
  })
  return weeks
}

/**
 * 获取星期几
 * @param {*} time 日期字符串, 如 '2020-07-03'
 */
function getDay(time) {
  const date = new Date(time.replace(/-/g, '/'))
  return CN_WEEK[date.getDay()]
}

/**
 * 获取日期是当月第几周 从0开始
 * @param {*} time 日期字符串， null代表当前日期
 */
function queryWeek(time) {
  const date = time ? new Date(time.replace(/-/g, '/')) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const d = date.getDate()

  const firstDate = new Date(year, month - 1, 1)
  const lastDate = new Date(year, month, 0)
  const lastDay = lastDate.getDate()

  const week = firstDate.getDay()
  const week_d = parseInt((week - WEEK_START + 7) % 7)

  for (let i = 1; i <= lastDay; i++) {
    const w = parseInt((i - 1 + week_d) / 7)
    if (i === d) {
      return w
    }
  }
}
/**
 * 获取一个月有多少天
 * @param {*} time 日期字符串， null代表当前日期
 */
function queryDays(time) {
  const date = time ? new Date(time.replace(/-/g, '/')) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const lastDate = new Date(year, month, 0)
  const lastDay = lastDate.getDate()
  return lastDay
}

/**
 * 获取日期是当年第几月 从1开始
 * @param {*} time 日期字符串， null代表当前日期
 */
function queryMonth(time) {
  const date = time ? new Date(time) : new Date()
  const month = date.getMonth() + 1
  return month
}

/**
 * 获取日期信息
 * @param {*} time 日期字符串， null代表当前日期
 */
function dateInfo(time) {
  const date = time ? new Date(time.replace(/-/g, '/')) : new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const week = queryWeek(time)
  const day = date.getDate()
  // 从周日 --> 周六
  const week_cn = CN_WEEK[date.getDay()]
  const week_num = date.getDay()

  const yyyy = year
  const MM = month < 10 ? '0' + month : month
  const WW = week + 1
  const dd = day < 10 ? '0' + day : day

  const format = `${yyyy}-${MM}-${dd}`
  return { year, month, week, day, format, week_cn, week_num,
    yyyy, MM, WW, dd
  }
}

/**
 * 获取格式化日期
 * @param {*} time 日期字符串， null代表当前日期
 * @param {*} fmt 格式
 */
function dateFormat(time, fmt) {
  let date = new Date()
  if (time) {
    date = new Date(time.replace(/-/g, '/'))
  }

  let ret
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'M+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'm+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
  // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    }
  }
  return fmt
}
/**
 * 自定义一天时间下拉列表
 * @param {*} time 时间对象
 */
function selectTimeRange(time) {
  const step = time.step || 10 // 时间间隔
  const start = time.start || '00:00' // 起始时间
  const end = time.end || '24:00' // 终止时间
  const sdt = time.sdt || 0 // 起始时间偏移分钟
  const edt = time.edt || 0 // 结束时间偏移分钟
  const options = [] // 返回结果

  let index = 0
  for (let i = getMin(start) + sdt; i <= getMin(end) - edt; i += step) {
    const h = parseInt(i / 60)
    const m = parseInt(i % 60)
    const hour = (h < 10 ? '0' : '') + h
    const min = (m < 10 ? '0' : '') + m

    if (!options[index]) {
      options.push({
        label: h + '时',
        value: hour + '',
        children: []
      })
    }
    options[index].children.push({
      label: m + '分',
      value: hour + ':' + min
    })

    if (m + step === 60) {
      index++
    }
  }
  return options

  function getMin(t) {
    const arr = t.split(':')
    return parseInt(arr[0]) * 60 + parseInt(arr[1])
  }
}

export {
  getDay,
  getWeek,
  queryWeek,
  queryMonth,
  queryDays,
  dateInfo,
  dateFormat,
  selectTimeRange
}
