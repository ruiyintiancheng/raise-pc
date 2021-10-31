<template>
    <!-- 小组会议 -->
    <div class="meeting" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="scrollbar-boX">
            <template v-if="status === 0 || status === 1 || status === 3">
               <img  class="meeting-img" :src="pic1" alt="" v-if="flowNodeNo === 1">
               <img class="meeting-img" :src="pic2" alt="" v-else>
              <div class="metting-tip-box" v-if="status ===0">
                <template>
                  <p class="metting-tip">辅导暂未开始</p>
                  <p class="metting-tip-date">辅导开始时间： <span class="metting-time">{{parseTime(startTime,'{y}年{m}月{d}日 {h}:{i}')}}</span></p>
                </template>
                </div> 
              <div class="metting-tip-box" v-else-if="status ===3">
                <template>
                  <p class="metting-tip">辅导未预约</p>
                  <p class="metting-tip-date1" style="text-align:center;margin-top:20px;">请等待或联系教练预约辅导时间</p>
                </template>
                </div> 
              <div class="meeting-info" v-else-if="status === 1">
                    <div class="meeting-address entry-meeting">
                        <a class="meeting-address-entry" target="_blank" :href="joinUrl">进入辅导</a>
                    </div>
                    <div class="meeting-info-box" :style="{background:'url('+qr+')'}">
                        <div class="qr-box">
                              <vue-qr :text="joinUrl" :margin="5" :size="152" ref="Qrcode"></vue-qr>
                        </div>
                    </div>
                        <div class="meeting-address">
                            <p class="meeting-address-tip">点击链接或扫描二维码，即刻进入{{fdName}}</p>
                        </div>
                </div>
            </template>
            <div class="meeting-end" v-if="status === 2">
              <img :src="pic3" class="meeting-end-img">
              <template>
                <p class="meeting-end-tip">恭喜您</p>
                <p class="meeting-end-tip">您于 <b>{{parseTime(endTime,'{y}年{m}月{d}日 {h}:{i}')}}</b> 完成{{fdName}}</p>
              </template>
            </div>
           </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import pic1 from '../learnStep/components/meetingContent/images/pic1.png'
import pic2 from '../learnStep/components/meetingContent/images/pic2.png'
import pic3 from '../learnStep/components/meetingContent/images/pic3.png'
import qr from '../learnStep/components/meetingContent/images/qr.png'
import VueQr from 'vue-qr'
import { parseTime } from '@/utils'
export default {
  components: {
    VueQr
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    },
    fdName() {
      return this.flowNodeNo === 1 ? '小组辅导' : '个人辅导'
    }
  },
  watch: {
    startTime() {
      this.getStatus()
    }
  },
  props: {
    courseId: [String, Number],
    planId: [String, Number],
    flowNodeNo: [String, Number]
  },
  data() {
    return {
      refresh: true,
      selectCourseShow: false,
      dialogVisible: false,
      timeArr: [],
      oneoneLoading: false,
      parseTime,
      pic1, pic2, pic3, qr,
      joinUrl: '',
      startTime: '',
      endTime: '',
      currentTime: '',
      currentSysTime: '',
      timer: null,
      // 0未开始，1进行中, 2已结束
      status: null
    }
  },
  created() {

  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (!this.planId) {
        this.status = 3
        return
      }
      baseRequest('/course/coaches/getMeetingInfoByPlanId', { planId: this.planId }).then(response => {
        if (!response.data.item) {
          this.selectCourseShow = true
        } else {
          this.selectCourseShow = false
        }
        this.startTime = response.data.item.startTime || ''
        // this.startTime = '2021-10-25 00:00:00'
        // this.startTime = ''
        this.endTime = response.data.item.endTime || ''
        // this.endTime = '2021-10-24 17:00:00'
        this.joinUrl = response.data.item.joinUrl || ''
        this.getStatus()
      })
    },
    getStatus(callback) {
      if (this.startTime) {
        baseRequest('/course/firstStep/getSysTime').then(response => {
          const sysTime = response.data.item.sysTime.replace(/-/g, '/')
          const currentSysTime = new Date(sysTime).getTime()
          const startTime = new Date(this.startTime).getTime()
          if (startTime > currentSysTime) {
            this.status = 0
          } else {
            let endTime = this.endTime.replace(/-/g, '/')
            endTime = new Date(endTime).getTime()
            if (currentSysTime > endTime) {
              this.status = 2
            } else {
              this.status = 1
            }
          }
          console.log(this.status)
          callback && callback(this.status)
        })
      }
    }
  }
}
</script>
<style lang="scss">
.meeting{
    position: relative;
    padding:30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
    overflow: auto;
    padding-right: 0;
    .waigua-btn{
      position: absolute;
      top:20px;
      left:20px;
      z-index: 1;
    }
    .meeting-img{
        float: left;
        margin: 90px 150px 30px;
    }
    .meeting-info{
        float: left;
        margin-top:120px;
        .meeting-info-box{
            width: 172px;
            height: 172px;
            padding:10px;
            margin:0 auto;
            .qr-box{
                width: 100%;
                height:100%;
                border-radius: 10px;
                overflow: hidden;
            }
        }
        .meeting-address{
            margin-top:18px;
            &.entry-meeting{
              margin-top: 0;
              margin-bottom: 18px;
            }
            .meeting-address-entry{
                display: block;
                text-decoration: underline;
                font-size: 18px;
                letter-spacing: 0px;
                color: #00afff;
                font-weight: 600;
                letter-spacing: 1px;
                // width: 160px;
                text-align: center;
            }
            .meeting-address-tip{
                margin-top:13px;
                font-size: 14px;
                color: #222222;
            }
        }
    }
    .verticalBox{
      float: left;
     margin-top:220px;
     .verticalBoxSpan{
       font-size: 14px;
                color: #222222;
     }
      // transform: translateY(-50%);
    }
    .metting-tip-box{
        float: left;
        margin-top:150px;
        .metting-tip{
            width: 300px;
            text-align: center;
            color: #00afff;
            font-weight: 600;
            font-size: 30px;
            letter-spacing: 1px;
        }
        .metting-tip-date{
            margin-top: 150px;
            color: #222;
            font-size: 18px;
            color: #777;
            .metting-time{
                color: #C03639;
                font-weight: 600;
            }
        }
    }
    .meeting-end{
        // width: 411px;
        margin:150px auto 50px;
        text-align: center;
        .meeting-end-img{
            margin-bottom: 20px;
        }
        .meeting-end-tip{
            font-size: 16px;
            font-weight: normal;
            line-height: 24px;
            color: #222222;            
        }
    }
}
</style>