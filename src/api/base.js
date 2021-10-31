/*
 * @Author: lk
 * @Date: 2019-02-01 17:35:14
 * @Last Modified by: lk
 * @Last Modified time: 2021-10-20 16:01:43
 */

import request from '@/utils/request'
import { validateParams } from '@/utils/validate'
import { validateInputs } from '@/utils/index'

export function getMenu() {
  return request({
    url: '/function/getmenu',
    method: 'post'
  })
}

export function baseRequest(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(query ? validateInputs(query) : query)
  })
}
export function baseUpdate(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(query ? validateInputs(query, true) : query)
  })
}
export function baseSearch(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(validateParams(query))
  })
}

export function baseUpload(url, query) {
  return request({
    url: url,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: query
  })
}

export function baseDownLoad(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(validateInputs(query)),
    responseType: 'blob'
  })
}

export function baseDownLoads(url, query) {
  return request({
    url: url,
    method: 'post',
    data: JSON.stringify(query ? validateInputs(query) : query),
    responseType: 'blob'
  })
}
