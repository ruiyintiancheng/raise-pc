/*
 * @Author: lk
 * @Date: 2019-02-27 14:31:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-07-13 17:45:56
 * @Description:  websocket
 */
import { getToken } from './auth'
import store from '@/store'
let socket
export function openWebSocket(successCallback) {
  var ip = store.getters.ip + ':' + store.getters.port
  var token = getToken()
  if (!token || !store.getters.ip || !store.getters.port) {
    return
  }
  if (!window.WebSocket) {
    window.WebSocket = window.MozWebSocket
  }
  if (window.WebSocket) {
    var path = 'ws://' + ip + '/websocket/?token=' + token + '&date=' + new Date().getTime()
    console.log('开始连接 websocket')
    socket = new WebSocket(path)
    socket.onmessage = function(event) {
      console.log('消息传送', event)
      successCallback && successCallback(event.data)
    }
    socket.onopen = function(event) {
      console.log('websocket open')
      keepAlive()
    }
    socket.onclose = function(event) {
      console.log('websocket closed')
      cancelKeepAlive()
    }
    socket.onerror = function(event) {
      console.log('websocket error')
      // openWebSocket(successCallback)
    }
  }
}

export function closeWebSocket() {
  console.log('手动关闭webSocket')
  socket.close()
}

var timerId = 0
function keepAlive() {
  var timeout = 15000
  socket.send('HB')
  timerId = setTimeout(keepAlive, timeout)
}
function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId)
  }
}
