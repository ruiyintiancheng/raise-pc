<template>
<div class="bgcf">
  <lunbo :banners="banners"></lunbo>
  <div class="shouye inside-container">
    <vision></vision>
  </div>
  <course-video :videoUrl="videoUrl" v-if="bannerVisable"></course-video>
  <div class="shouye inside-container">
    <about></about>
    <!-- <app-download></app-download> -->
  </div>
  <partner></partner> 
</div>
</template>

<script>
import lunbo from './components/lunbo'
import vision from './components/vision'
import about from './components/about'
import courseVideo from './components/courseVideo'
import partner from './components/partner'
import appDownload from './components/appDownload'
// import hx from './components/hxzy'
// import tdjs from './components/tdjs'
// import partner from './components/partner'
import { baseRequest } from '@/api/base'
export default {
  components: {
    lunbo,
    vision,
    about,
    partner,
    appDownload,
    courseVideo
    // zhuzhang
    // hx,
    // tdjs,
    // partner
  },
  data() {
    return {
      // bool: true
      banners: [],
      videoUrl: '',
      bannerVisable: true

    }
  },
  created() {
    this.wechatLogin().then(_ => {
      // this.$router.push({ name: 'targetTool' })
    })
    this.getBanner()
  },
  methods: {
    // // 通过v-if刷新子页面
    // updateChildren() {
    //   this.bool = false
    //   // 获取更新后的DOM的Vue方法
    //   this.$nextTick(() => {
    //     this.bool = true
    //   })
    //   // 强制更新组件
    //   this.$forceUpdate()
    // }
    getBanner() {
      baseRequest('/user/rwBannerInfo/select').then(response => {
        this.banners = []
        let baseUrl = ''
        if (process.env.BASE_API.startsWith('https://www.raise-wisdom.com')) {
        // 生产
          baseUrl = 'https://www.raise-wisdom.com/'
        } else {
        // 测试
          baseUrl = 'http://www.fascte.cn:9201/'
        }
        const videoUrl = response.data.item.listVideo.length ? response.data.item.listVideo[0].url : ''
        this.videoUrl = videoUrl ? baseUrl + videoUrl.split('ROOT')[1] : ''
        console.log(this.videoUrl)
        for (const iterator of response.data.item.listImage) {
          iterator.urlNew = baseUrl + iterator.url.split('ROOT')[1]
          this.banners.push(iterator)
        }
        this.bannerVisable = false
        this.$nextTick(_ => {
          this.bannerVisable = true
        })
      })
    },
    wechatLogin() {
      return new Promise((resolve, reject) => {
        const state = this.$route.query.state
        const code = this.$route.query.code
        if (state && code && state === localStorage.getItem('state')) {
          if (state.includes('aibindingwci')) {
            baseRequest('/user/userLogin/bindWeChat', { 'code': code }).then(response => {
              if (response.code === 2) {
                if (response.data) {
                  for (const iterator in response.data) {
                    this.$Message.warning(response.data[iterator])
                    break
                  }
                }
              } else {
                this.$Message.success('微信绑定成功')
                this.$router.push({ name: 'mymy' })
              }
              // const token = response.data.item.token
              // if (token) {
              //   this.$store.dispatch('user/SaveToken', token).then(_ => {
              //     this.$router.push('/')
              //   })
              // }
            })
          } else {
            baseRequest('/user/userLogin/loginWeChat', { 'code': code }).then(response => {
              const unionId = response.data.item.unionId
              const token = response.data.item.token
              if (token) {
                localStorage.setItem('state', '')
                this.$store.dispatch('LoginByUsername', token).then(() => {
                  // this.$store.dispatch('GetUserInfo').then(_ => {
                  //   resolve()
                  // })
                  location.href = location.origin
                })
              } else {
                this.$router.push({ path: '/bindWechat', query: { unionId: unionId }})
              }
            })
          }
        } else {
          resolve()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bgcf{background-color: #ffffff}
.shouye{margin:0 auto;background-color: #ffffff;height:100%;
.fenge{border-top:2px dashed #dddddd;margin:100px 0}
}
</style>