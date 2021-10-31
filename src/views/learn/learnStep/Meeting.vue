<template>
    <!-- 小组会议 -->
    <div class="meeting" :style="{height:materialsHeight+'px'}">
      <!-- <div class="waigua-btn">
        <el-button size="mini" @click="setMeeting(0)">设置为未开始</el-button>
        <el-button size="mini" @click="setMeeting(1)">设置为课程中</el-button>
        <el-button size="mini" @click="setMeeting(2)">设置为已结束</el-button>
        <el-button size="mini" @click="setChuxi()">设置为已出席</el-button>
      </div> -->
       <el-scrollbar style="height:100%">
           <div class="scrollbar-boX">
             <template v-if="flowNodeNo===13&&this.selectCourseShow">
              <img class="meeting-img" :src="pic2" alt="">
              <div class="verticalBox">
                    <div class="meeting-address">
                            <span class="verticalBoxSpan">选择个人辅导时间:</span>
                            <el-button type="primary" size="mini" @click="openDialog()">1对1 辅导</el-button> 
                        </div>
                </div>
             </template>
           <template v-if="status === 0 || status === 1">
                <img v-if="flowNodeNo===13" class="meeting-img" :src="pic2" alt="">
                <img v-else class="meeting-img" :src="pic1" alt="">
                <div class="meeting-info" v-if="status === 1">
                    <div class="meeting-address entry-meeting">
                        <a class="meeting-address-entry" target="_blank" :href="joinUrl">进入{{flowNodeNo===13?'个人':'小组'}}辅导</a>
                          <!-- <p class="meeting-address-tip">扫描二维码或点击链接，即刻进入辅导</p> -->
                    </div>
                    <div class="meeting-info-box" :style="{background:'url('+qr+')'}">
                        <div class="qr-box">
                                <vue-qr :text="joinUrl" :margin="5" :size="152" ref="Qrcode"></vue-qr>
                        </div>
                    </div>
                        <div class="meeting-address">
                            <!-- <a class="meeting-address-entry" :href="joinUrl">前往{{flowNodeNo===13?'个人':'小组'}}辅导</a> -->
                            <p class="meeting-address-tip">点击链接或扫描二维码，即刻进入辅导</p>
                        </div>
                </div>
                <div class="metting-tip-box" v-else-if="status === 0">
                    <template v-if="isEx">
                      <p class="metting-tip" v-if="flowNodeNo===12">第二周小组辅导</p>
                      <p class="metting-tip" v-else-if="flowNodeNo===13">个人辅导</p>
                      <p class="metting-tip" v-else-if="flowNodeNo===34">第六周小组辅导</p>
                    </template>
                    <template v-else>
                      <p class="metting-tip">辅导暂未开始</p>
                      <p class="metting-tip-date">辅导开始时间： <span class="metting-time">{{parseTime(startTime,'{y}年{m}月{d}日 {h}:{i}')}}</span></p>
                    </template>
                </div>
           </template>
            <div v-else-if="status === 2" class="meeting-end">
               <img :src="pic3" class="meeting-end-img">
               <template v-if="attendFlag === '1'">
                  <p class="meeting-end-tip">恭喜您</p>
                  <p class="meeting-end-tip">您于 <b>{{parseTime(endTime,'{y}年{m}月{d}日 {h}:{i}')}}</b> 完成{{flowNodeNo===13?'个人':'小组'}}辅导</p>
                  <p class="meeting-end-tip" v-if="flowNodeNo===12 && hasStrendthen" style="color:#D9001B;margin-top:15px;">您如需强化教练辅导效果，可在First Step原辅导次数基础上，优惠选购<a @click="$router.push({name:'strengthen'})" style="text-decoration:underline;cursor: pointer;">First Step辅导升级包</a></p>
               </template>
               <template v-else>
                  <!-- <p class="meeting-end-tip">恭喜您</p> -->
                  <p class="meeting-end-tip">项目辅导已结束，请等待或者联系辅导教练确认您的出席</p>
               </template>
           </div>
           </div>
       </el-scrollbar>
       <el-dialog
          title="1对1 辅导时间"
          :visible.sync="dialogVisible"
          class="dialog-main heightauto"
          top="10%"
          width="420px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <ul class="oneone-times">
            <li v-for="(item,index) in timeArr" :key="item+index">
                <el-radio v-model="planId"  :label="item.planId">{{''}}</el-radio>
                <span class="oneone-time">{{item.optionName}}</span>
            </li>
            <li>
                 <div class="oneone-tip" style="color: #fb664a">此辅导时间为教练设置的 1对1 辅导时间。
                    如未有合适时段，请在小组辅导中联系教练更换辅导时间。</div>
            </li>
          </ul>
          <span slot="footer">
            <el-button  @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveHandle" :loading="oneoneLoading">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import pic1 from './components/meetingContent/images/pic1.png'
import pic2 from './components/meetingContent/images/pic2.png'
import pic3 from './components/meetingContent/images/pic3.png'
import qr from './components/meetingContent/images/qr.png'
import VueQr from 'vue-qr'
import { parseTime } from '@/utils'
export default {
  components: {
    VueQr
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  watch: {
    startTime() {
      this.getStatus()
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    isEx: {
      type: Boolean,
      default: false
    },
    hs: Boolean
  },
  data() {
    return {
      refresh: true,
      selectCourseShow: false,
      dialogVisible: false,
      timeArr: [],
      planId: '',
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
      status: null,
      // 0 未出席  1已出席
      attendFlag: '0',
      hasStrendthen: false
    }
  },
  created() {
    this.hasStrendthen = this.hs
  },
  mounted() {
    this.$emit('changeGoOnStatus', true)
    if (this.isEx) {
      this.status = 0
    } else {
      this.getData()
    }
    // this.timer = setInterval(this.getCurrentTime, 1000)
  },
  methods: {
    saveHandle() {
      this.oneoneLoading = true
      this.$confirm('确定选择该一对一辅导时间吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/firstStep/stuSetCoachPlan', { planId: this.planId }).then(response => {
          this.$Message.success('保存成功')
          this.dialogVisible = false
          this.getData()
        }).finally(_ => {
          this.oneoneLoading = false
        })
      })
    },
    openDialog() {
      baseRequest('/course/firstStep/getNoSetCoachPlan', { courseId: this.courseId }).then(response => {
        const timeArr = response.data.item
        if (timeArr && timeArr.length > 0) {
          for (const iterator of timeArr) {
            const startTime = iterator.startTime || ''
            const endTime = iterator.endTime || ''
            if (startTime) {
              iterator.optionName = parseTime(startTime.substring(0, 10), '{y}年{m}月{d}日') + ' ' + startTime.substring(11, 16) + '~' + endTime.substring(11, 16)
            } else {
              iterator.optionName = ''
            }
          }
          this.dialogVisible = true
          this.planId = null
          this.timeArr = timeArr
        } else {
          this.$Message.warning('暂无可选辅导时间')
        }
      })
    },
    getCurrentTime() {
      const yy = new Date().getFullYear()
      const mm = new Date().getMonth() + 1
      const dd = new Date().getDate()
      const hh = new Date().getHours()
      const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
      const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
      this.currentTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
    },
    setMeeting(status) {
      this.status = status
      if (this.status === 2) {
        if (this.attendFlag === '1') {
          this.$emit('changeGoOnStatus', false)
        } else {
          this.$emit('changeGoOnStatus', true)
        }
      } else {
        this.$emit('changeGoOnStatus', true)
      }
    },
    setChuxi() {
      this.attendFlag = '1'
      if (this.status === 2) {
        if (this.attendFlag === '1') {
          this.$emit('changeGoOnStatus', false)
        } else {
          this.$emit('changeGoOnStatus', true)
        }
      } else {
        this.$emit('changeGoOnStatus', true)
      }
    },
    getData() {
      baseRequest('/course/firstStep/getMeetingInfo', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        if (!response.data.item) {
          this.selectCourseShow = true
        } else {
          this.selectCourseShow = false
        }
        this.startTime = response.data.item.startTime || ''
        // this.startTime = '2021-10-25 00:00:00'
        this.endTime = response.data.item.endTime || ''
        // this.endTime = '2021-10-24 17:00:00'
        this.joinUrl = response.data.item.joinUrl || ''
        // 是否出席 0：未出席 1：已出席
        this.attendFlag = response.data.item.attendFlag
        // this.attendFlag = '0'
        this.getStatus((param) => {
          if (param === 2) {
            if (this.attendFlag === '1') {
              this.$emit('changeGoOnStatus', false)
              if (this.isNewest && this.flowNodeNo === 12) {
                this.hasStrendthen = true
                this.$emit('changeStrendthen', true)
              }
            }
          }
        })
        // this.$emit('changeGoOnStatus', false)
        // if (this.status === 2) {
        //   if (this.attendFlag === '1') {
        //     this.$emit('changeGoOnStatus', false)
        //   }
        // }
      })
    },
    getStatus(callback) {
      if (this.startTime) {
        baseRequest('/course/firstStep/getSysTime').then(response => {
          const sysTime = response.data.item.sysTime.replace(/-/g, '/')
          const currentSysTime = new Date(sysTime).getTime()
          // let startTime = this.dateLess(this.startTime, 3) + ':00'
          // startTime = startTime.replace(/-/g, '/')
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
          callback && callback(this.status)
        })
      }
    },
    dateLess(d, lessMin) {
      d = new Date(d.substring(0, 4),
        d.substring(5, 7) - 1,
        d.substring(8, 10),
        d.substring(11, 13),
        d.substring(14, 16),
        d.substring(17, 19))
      d.setTime(d.getTime() - lessMin * 60 * 1000)
      // 小于10前面补0
      var getMonth = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
      var getDate = d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate()
      var getHours = d.getHours() < 10 ? '0' + (d.getHours()) : d.getHours()
      var getMinutes = d.getMinutes() < 10 ? '0' + (d.getMinutes()) : d.getMinutes()
      return d.getFullYear() + '-' + getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes
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
                width: 160px;
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