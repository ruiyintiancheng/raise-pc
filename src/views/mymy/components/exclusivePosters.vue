<template>
  <div class="bt-hb" v-loading="loading"  :style="{minHeight:tableHight + 'px'}">
    <div class="title1 clearfix">
      <h4 class="h4_left">您的专属海报</h4>
      <!-- <img
        class="image-right"
        @click="openInfo"
        src="../../../assets/icons/icon-ques.svg"
        alt
      /> -->
    </div>
    <div class="demo-list clearfix" v-if="exsit">
    
    <el-carousel :autoplay="false" :loop="true" type="" height="200px" arrow="always" @change="changeHandle" indicator-position="none">
        <el-carousel-item v-for="(item,index) in imageList" :key="index">
            <!-- <div class="demo-box" > -->
              <img :src="item.demo" alt="">
            <!-- </div> -->
        </el-carousel-item>
    </el-carousel>
    </div>
    <div class="title2">
      <span class="title2-item">推荐产品</span>
    </div>
    <div class="box-select">
      <el-select v-model="value" 
          @change="changeOption(value)">
          <el-option label="官网"
          value="000"></el-option>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.productName"
          :value="item.productCode"
        ></el-option>
      </el-select>
      <el-button type="primary" size="small" style="margin-left:20px;border-radius:8px" class="button-set" @click="getqr()">生成</el-button>
    </div>
    <vue-qr v-show="false"  :logoSrc="config.imagePath"  :text="quarter2"  :size="200"  ref="Qrcode2" :download="downloadFilename" ></vue-qr>
    <div class="hb-content clearfix" v-if="base64">
      <div class="hb-item">
          <div class="title3">
            <span class="title3-item">我的专属海报</span>
          </div>
          <!-- 二维码 -->
          <div class="clearfix">
            <img class="haibao" height="200" :src="base64" alt="">
            <div class="box-setdown">
              <el-button type="primary" size="mini" class="button-down2" v-if="showdown" @click="downloadImg2">下载海报</el-button>
              <el-button type="primary" size="mini" class="button-down2" v-if="showdown" @click="downloadImg">下载二维码</el-button>
            </div>
          </div>
          <p v-if="quarter2" class="hb-url">{{quarter2}}<el-button size="mini" style="margin-left:15px;" @click="copyUrl(quarter2,$event)">点击复制</el-button></p>
      </div>

    </div>
    <div class="box-tktitle" >
      <p>想不想拥有一份有个性、有冲击力、专属自己的个人海报？</p>
      <p style="margin-top:6px;height:50px;line-height:28px">个人专属海报上带有您的专属二维码，把它分享到朋友圈可以吸引更多关注，扩大您影响力的同时为您带来更多权益
        <img
        @click="openInfo"
        style="cursor:pointer;"
        src="../../../assets/icons/icon-ques.svg"
        alt
      />。</p>
      <p style="margin-top:42px;height:20px;line-height:13px">【具体步骤】</p>
      <p style="margin-top:10px;height:20px;line-height:13px">第一步：选择你喜欢的海报样式</p>  
      <p style="margin-top:10px;height:20px;line-height:13px">第二步：选择“推荐产品”，并点击“生成”按钮，预览专属海报</p>
      <p style="margin-top:10px;height:20px;line-height:13px">第三步：点击“下载”，就可以成功下载您个人的专属二维码海报啦！</p>
    </div>
    <exclusive-posters-help ref="exclusive"></exclusive-posters-help>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
import logo1 from '@/assets/logo/logo1.jpg'
import { baseRequest } from '../../../api/base'
import clipboard from '@/utils/clipboard'
import ExclusivePostersHelp from './ExclusivePostersHelp'
export default {
  components: { VueQr, ExclusivePostersHelp },
  data() {
    return {
      imageList: [

      ],
      quarterVisable: false,
      showdown: false,
      downloadFilename: '',
      options: [],
      quarter1: '',
      quarter2: '',
      userId: '',
      value: '000',
      config: {
        // value: `http://localhost:9527/?productId=${this.optionId}recommender=${this.userId}`,
        imagePath: logo1
      },
      optionId: 'L0000002',
      demoActive: 0,
      base64: '',
      exsit: false,
      loading: false
    }
  },
  computed: {
    tableHight() {
      // eslint-disable-next-line no-irregular-whitespace
      return this.$store.state.app.containHeight - 158
    }
  },
  methods: {
    openInfo() {
      this.$refs.exclusive.Integralsm = true
    },
    changeHandle(val) {
      this.demoActive = val
    },
    copyUrl(text, event) {
      clipboard(text, event)
    },
    changeOption(id) {
      this.optionId = id
    },
    // 下拉框
    selectget() {
      baseRequest('/user/rwProductConfig/select', { id: '4' }).then(response => {
        this.options = response.data.item
        // this.options = [
        //   { productCode: 'L0000001', productId: 1, productName: 'First Step' },
        //   { productCode: 'L0000003', productId: 3, productName: '目标规划·SP' },
        //   { productCode: 'L0000005', productId: 5, productName: '探索之门' }
        // ]
        // this.getqr()
        this.getBgOptions()
      }).catch(error => {
        console.log(error)
      })
    },
    getBgOptions() {
      this.loading = true
      baseRequest('/user/poster/posterImage').then(response => {
        this.imageList = response.data.item
        console.log(this.imageList)
        this.$nextTick(_ => {
          for (const iterator of this.imageList) {
            this.drawAndShareImage(iterator, demo => {
              iterator.demo = demo
              this.exsit = false
              this.$nextTick(_ => {
                this.exsit = true
              })
            })
          }
        })
      }).catch(error => {
        console.log(error)
      }).finally(_ => {
        this.loading = false
      })
    },
    // 显示二维码
    getqr() {
      this.$nextTick(_ => {
        if (this.value === '000') {
          this.quarter2 = window.location.origin + '?productId=0&time=' + new Date().getTime()
        } else {
          const findItem = this.options.find(item => item.productCode === this.value)
          if (findItem) {
            this.quarter2 = `${findItem.productUrl}?productId=${findItem.productId}&recommender=${this.$store.state.user.userId}`
          } else {
            this.quarter2 = window.location.origin + '?productId=0&time=' + new Date().getTime()
          }
        }
        // else if (this.value === 'L0000001') {
        //   this.quarter2 = window.location.origin + `/course/firstStep?productId=1&recommender=${this.$store.state.user.userId}`
        // } else if (this.value === 'L0000003') {
        //   this.quarter2 = window.location.origin + `/course/sp?productId=3&recommender=${this.$store.state.user.userId}`
        // } else if (this.value === 'L0000005') {
        //   this.quarter2 = window.location.origin + `/course/exploredoor?productId=5&recommender=${this.$store.state.user.userId}`
        // }
        this.showdown = true
        this.loading = true
        this.$nextTick(_ => {
          setTimeout(_ => {
            this.drawAndShareImage(this.imageList[this.demoActive])
          }, 500)
        })
      })
    },
    // 下载二维码
    downloadImg() {
      const iconUrl = this.$refs.Qrcode2.$el.src
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = '二维码'
      a.href = iconUrl
      a.dispatchEvent(event)
    },
    downloadImg2() {
      // const iconUrl = this.$refs.Qrcode2.$el.src
      const iconUrl = this.base64
      const a = document.createElement('a')
      const event = new MouseEvent('click')
      a.download = '专属海报'
      a.href = iconUrl
      a.dispatchEvent(event)
    },
    setVueQr() {
      this.userId = this.$store.state.user.userId
    },
    drawAndShareImage(bg, callback) {
      console.log(this.quarter2)
      var canvas = document.createElement('canvas')
      canvas.width = bg.width
      canvas.height = bg.height
      var context = canvas.getContext('2d')

      context.rect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#fff'
      context.fill()

      var myImage = new Image()
      let imageUrl = ''
      const urlSplitLIst = bg.posterImage.split('ROOT')
      if (urlSplitLIst[1]) {
        imageUrl = urlSplitLIst[1]
      }
      myImage.src = window.location.origin + imageUrl // 背景图片  你自己本地的图片或者在线图片
      myImage.crossOrigin = 'Anonymous'

      myImage.onload = _ => {
        context.drawImage(myImage, 0, 0, bg.width, bg.height)

        context.font = '60px Courier New'
        // context.fillText('我是文字', 350, 450)

        var myImage2 = new Image()
        myImage2.src = this.$refs.Qrcode2.$el.src // 你自己本地的图片或者在线图片
        myImage2.crossOrigin = 'Anonymous'

        let widthMa = 0
        let marginMa = 0
        if (bg.width > bg.height) {
          widthMa = bg.width / 9
          marginMa = bg.width / 90
        } else {
          widthMa = bg.height / 9
          marginMa = bg.height / 90
        }
        myImage2.onload = _ => {
          context.drawImage(myImage2, bg.width - widthMa - marginMa, bg.height - widthMa - marginMa, widthMa, widthMa)
          if (callback) {
            callback(canvas.toDataURL('image/png'))
          } else {
            this.base64 = canvas.toDataURL('image/png')
          }
          this.loading = false
          // console.log(item.demo)
          // this.exsit = false
          // this.$nextTick(_ => {
          //   this.exsit = true
          // })
          // var img = document.getElementById('avatar')

          // document.getElementById('avatar').src = base64;
          // img.setAttribute('src', base64)
        }
      }
    }
  },
  created() {
    // this.setVueQr()
    this.quarter2 = 'https://www.raise-wisdom.com/?time=' + new Date().getTime()
    this.selectget()
  }
}
</script>
<style lang="scss" scoped>
.bt-hb {
    width: 1440px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    padding: 24px;
    margin-bottom: 30px;

  .demo-list{
    margin-top: 20px;
    width: 680px;
    // .demo-box{
      // float: left;
      // margin-right: 40px;
      // cursor: pointer;
      // &.active{
      //   border: 4px solid #67C23A;
      // }
      img{
        // width: 300px;
        height: 100%;
        display: block;
        margin: 0 auto;
      }
    // }
  }
  .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      font-size: 18px;
      color: #222222;
      float: left;
      margin-right: 5px;
    }
    .image-right{
      float: left;
      margin-top: 2px;
    }
  }
  .title2 {
    position: relative;
    width: 100px;
    height: 13px;
    margin-top: 24px;
    line-height: 13px;
    font-size: 13px;
    color: #222222;
    .title2-item {
      position: absolute;
      top: 0;
      left: 3px;
    }
  }
  .box-select {
    width: 350px;
    height: 60px;
    margin-top: 6px;
  }
  .hb-content{
    .hb-item{
      .hb-url{
        padding-left: 15px;
        margin-top:10px;
      }
    }
  }
  .title3{
    position: relative;
    width: 250px;
    height: 36px;
    margin-top: 4px;
    line-height: 36px;
    font-size: 13px;
    color: #222222;
    .title3-item {
      position: absolute;
      top: 0;
      left: 0;
    }
     .button-set{
      position: absolute;
      top:0;
      right:-5px;
      width: 100px;
      height: 36px;
      background-color: #00afff;
      border-radius: 4px;
      border: none;
      font-size: 16px;
      color:#ffffff;
    }
  }
  .haibao{
    float: left;
  }
  .box-setdown{
    // position: relative;
    width: 305px;
    height: 36px;
    margin-top: 0px;
    margin-left:5px;
    float: left;

    .button-down{
      width: 100px;
      height: 36px;
      background-color: #04ae0f;
      border-radius: 4px;
      border: none;
      font-size: 16px;
      color:#ffffff;
    }
    .button-down2{
      // position: absolute;
      top: 0px;
      background-color: #04ae0f;
      border: none;
      font-size: 16px;
      color:#ffffff;
      margin-top: 165px;
    }
  }
  .box-tktitle{
    width: 603px;
    height: 100%;
    margin-top:26px;
    padding: 24px;
    background-color: #fbf8eb;
    border-radius:4px;
    border: solid 1px #dfd0a3;
    color: #666;
      .text-title{
        width: 100%;
        height: 14px;
        font-size: 1px;
        color:#222222;
      }
      .text-title2{
        width: 552px;
        height: 100%;
        line-height: 20px;
        margin-top:14px;
        font-size: 0.75em;
        color:#222222;
      }
  }
}
</style>