/*
 * @Author: lk
 * @Date: 2019-02-01 17:37:24
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-05-20 09:13:51
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (!time) {
    return ''
  } else if (typeof time === 'object') {
    date = time
  } else {
    // if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time.replace(/-/g, '/'))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => { // NOSONAR
    let value = formatObj[key]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || '0'
  })
  return time_str
}

export function getDateStr(AddDayCount) {
  var dd = new Date()

  dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期

  var y = dd.getFullYear()

  var m = (dd.getMonth() + 1) < 10 ? '0' + (dd.getMonth() + 1) : (dd.getMonth() + 1)// 获取当前月份的日期，不足10补0

  var d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate()// 获取当前几号，不足10补0

  return y + '-' + m + '-' + d
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

export function param(json) {
  if (!json) return ''
  return cleanArray(Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
            encodeURIComponent(json[key])
  })).join('&')
}

export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function scrollTo(element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptionsOptions = [
  {
    text: '今天',
    onClick(picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * 深克隆
 * @param {对象} source
 */
export function deepClone(source) { // NOSONAR
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {} // NOSONAR
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 路径转驼峰
 * @param {字符} str
 */
export function tranformStr(str) {
  var strArr = str.split('/')
  for (var i = 1; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1)
  }
  return strArr.join('')
}

/**
 * 参数验证
 * @param {对象} source
 */
export function validateInputs(source, isStr) { // NOSONAR
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {} // NOSONAR
  validateInputsEach(source, targetObj, isStr)
  return targetObj
}

function validateInputsEach(source, targetObj, isStr) {
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = validateInputs(source[keys])
    } else {
      if (source[keys] !== null) {
        targetObj[keys] = (source[keys] + '').replace(/(^\s*)|(\s*$)/g, '')
        if (targetObj[keys] === '' && !isStr) {
          targetObj[keys] = null
        }
      } else {
        targetObj[keys] = source[keys]
      }
    }
  })
}

/**
 * 所有公共路由的组件 新添加许在此配置
 */
const repeatCompnents = {
  publicReportPublicReport: 'publicReportPublicReport',
  publicReportEast: 'publicReportEast',
  'exampleTabIndex': 'exampleTabIndex',
  'errorPage404': 'errorPage404'
}

/**
 * 是否是公共路由组件
 * @param {字符} str
 */
export function isRepeatComponent(str) {
  if (repeatCompnents[tranformStr(str)]) return true
  return false
}

export function getPageParam(path) {
  let pageParam = ''
  if (path.lastIndexOf('/') + 1 === path.length) {
    const newPath = path.substr(0, path.length - 1)
    pageParam = newPath.substr(newPath.lastIndexOf('/') + 1)
  } else {
    pageParam = path.substr(path.lastIndexOf('/') + 1)
  }
  return pageParam
}

/**
 * 随机数
 * @param {位数} n
 */
export function randomCode(n) {
  // 验证码可能包含的字符
  var s = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  var ret = '' // 用于保存生成的验证码
  // 利用循环,随机产生生成验证码的每一个字符
  for (var i = 0; i < n; i++) {
    var index = Math.floor(Math.random() * 62) // 随机产生一个0~62之间的数字
    ret += s.charAt(index)// 将随机产生的数字当作字符串的位置下标,在字符串s中取出该字符，并加入到ret中
  }
  return ret // 返回产生的验证码
}

export function IsPC() {
  var userAgentInfo = navigator.userAgent
  var Agents = ['Android', 'iPhone',
    'SymbianOS', 'Windows Phone',
    'iPad', 'iPod']
  var flag = true
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false
      break
    }
  }
  return flag
}

export function getFlatForm() {
  var userAgentInfo = navigator.userAgent
  // var Agents = ['Android', 'iPhone',
  //   'SymbianOS', 'Windows Phone',
  //   'iPad', 'iPod']
  var iosAgents = ['iPhone', 'Windows Phone', 'iPad']
  var androidAgents = ['Android']
  for (let v = 0; v < iosAgents.length; v++) {
    if (userAgentInfo.indexOf(iosAgents[v]) > 0) {
      return 'ios'
    }
  }
  for (let v = 0; v < androidAgents.length; v++) {
    if (userAgentInfo.indexOf(androidAgents[v]) > 0) {
      return 'android'
    }
  }
  return 'pc'
}

/**
 * 数字转星期
 * @param {*} num
 */
export function toChinesWeek(num) {
  num = Number(num)
  let result = ''
  switch (num) {
    case 1:
      result = '一'
      break
    case 2:
      result = '二'
      break
    case 3:
      result = '三'
      break
    case 4:
      result = '四'
      break
    case 5:
      result = '五'
      break
    case 6:
      result = '六'
      break
    case 7:
      result = '日'
  }
  return result
}
