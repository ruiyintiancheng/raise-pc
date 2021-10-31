import axios from 'axios'
// const baseUrl = 'https://www.raise-wisdom.com:8040'
// const baseUrl = 'http://192.168.3.104:8040'
const baseUrl = process.env.BASE_API
export function openUnionPays(token, url) {
  return axios
    .create({
      baseURL: baseUrl,
      timeout: 1000,
      headers: {
        token,
        platform: 'pc'
      }
    })
    .get(url)
}
