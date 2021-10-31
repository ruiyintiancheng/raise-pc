/*
 * @Author: lk
 * @Date: 2019-02-01 17:37:07
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-10-17 15:54:04
 */
import { baseDownLoad } from '@/api/base'

export function download(url, param, callback, failCallback) {
  baseDownLoad(url, param).then(response => {
    if (!response) {
      return
    }
    let name = response['headers']['content-disposition'].split('filename=')[1]
    name = decodeURI(name)
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(new Blob([response.data]))
    if ('download' in document.createElement('a')) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', name)

      document.body.appendChild(link)
      link.click()
    } else {
      navigator.msSaveBlob(blob, name)
    }
    callback && callback()
  }).catch(() => {
    failCallback && failCallback()
  })
}

export function downloadFile(url, param) {
  return new Promise((resolve, reject) => {
    baseDownLoad(url, param).then(response => {
      if (!response) {
        return
      }
      let name = response['headers']['content-disposition'].split('filename=')[1]
      name = decodeURI(name)
      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(new Blob([response.data]))
      if ('download' in document.createElement('a')) {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', name)

        document.body.appendChild(link)
        link.click()
      } else {
        navigator.msSaveBlob(blob, name)
      }
      resolve()
    }).catch(() => {
      reject()
    })
  })
}

export function downloadIamge(imgsrc, name) { // 下载图片地址和图片名
  console.log(imgsrc)
  const image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = function() {
    console.log('start')
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    const url = canvas.toDataURL('image/png') // 得到图片的base64编码数据
    const a = document.createElement('a') // 生成一个a元素
    const event = new MouseEvent('click') // 创建一个单击事件
    console.log(a)
    a.download = name || 'photo' // 设置图片名称
    a.href = url // 将生成的URL设置为a.href属性
    a.dispatchEvent(event) // 触发a的单击事件
  }
  image.src = imgsrc
}
