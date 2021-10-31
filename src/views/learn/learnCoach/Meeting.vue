<template>
    <!-- 小组会议 -->
    <div class="talk-meeting" :style="{height:materialsHeight+'px'}">
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
                <el-button type="primary" @click="formVisible = true" v-show="btnShow">教练测评</el-button>
                <el-dialog
                  append-to-body
                  title="教练测评"
                  :visible.sync="formVisible"
                  class="dialog-main heightauto"
                  top="5%"
                  width="1000px"
                  destroy-on-close
                  :close-on-click-modal="false"
                  >
                    

                    <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                      <el-form-item :label="comments[0].content">
                        <el-rate :disabled="!confirmShow" v-model="formLabelAlign.scoreValue"></el-rate>
                      </el-form-item>
                      <el-divider></el-divider>
                      <el-form-item :label="comments[1].content">
                        <el-input :disabled="!confirmShow" type="textarea" v-model="formLabelAlign.answerOne" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider style="border-top: 1px dashed #e8eaec;margin: 8px 0;background: 0 0;"></el-divider>
                      <el-form-item :label="comments[2].content">
                        <el-input :disabled="!confirmShow" type="textarea" v-model="formLabelAlign.answerTwo" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider ></el-divider>
                      <el-form-item :label="comments[3].content">
                        <el-input :disabled="!confirmShow" type="textarea" v-model="formLabelAlign.answerThree" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider></el-divider>
                    </el-form>
                    <!-- <el-form label-position="top" label-width="80px" :model="comments">
                      <el-form-item :label="comments[0].content">
                        <el-rate v-model="formLabelAlign.scoreValue"></el-rate>
                      </el-form-item>
                      <el-form-item label="综合上面这些问题，你有什么发现" v-for="(val , index) in comments" :key="index">
                        <el-input type="textarea" v-model="formLabelAlign.answerOne" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider style="border-top: 1px dashed #e8eaec;margin: 8px 0;background: 0 0;"></el-divider>
                      <el-form-item label="综合上面这些问题，你有什么发现">
                        <el-input type="textarea" v-model="formLabelAlign.answerTwo" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider ></el-divider>
                      <el-form-item label="综合上面这些问题，你有什么发现">
                        <el-input type="textarea" v-model="formLabelAlign.answerThree" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider></el-divider>
                    </el-form> -->

                    <span slot="footer">
                      <el-button @click="formVisible = false">取 消</el-button>
                      <el-button :loading="loading" type="primary" @click="submit" v-show="confirmShow">确 定</el-button>
                    </span>
                  </el-dialog>
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
      // 0未开始，1进行中, 2已结束，3未预约
      status: null,
      formVisible: false,
      loading: false,
      formLabelAlign: {
        scoreValue: null,
        answerOne: '',
        answerTwo: '',
        answerThree: ''
      },
      btnShow: true,
      confirmShow: true,
      comments: []

    }
  },
  created() {
    // console.log(this.flowNodeNo)
  },
  mounted() {
    this.getData()
    this.selectScore()
    this.rwQuestionBank()
  },
  methods: {
    rwQuestionBank() {
      // 查询问题-公共接口
      baseRequest('/course/rwQuestionBank/selects', { kinds: 'coachMeeting', kindsTwo: '1' }).then(response => {
        console.log(response)
        this.comments = response.data.item
      })
    },
    getData() {
      if (!this.planId) {
        this.status = 3
        return
      }
      // 获取视频会议信息-公共接口学员
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
        // 获取系统时间
        baseRequest('/course/firstStep/getSysTime').then(response => {
          const sysTime = response.data.item.sysTime.replace(/-/g, '/')
          const currentSysTime = new Date(sysTime).getTime()
          const startTime = new Date(this.startTime).getTime()
          const endTime = new Date(this.endTime).getTime()
          // const fastShowTime = endTime + 3 * 60 * 1000 + 50 * 60 * 1000 + 7 * 24 * 60 * 60 * 1000
          const fastShowTime = endTime + 7 * 24 * 60 * 60 * 1000
          // const fastShowTime = currentSysTime - 60 * 60 * 1000
          if (currentSysTime > fastShowTime) {
            this.btnShow = false
          }
          if (startTime > currentSysTime) {
            this.status = 0
            // this.status = 2
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
    },
    // 添加教练测评
    submit() {
      const params = {
        planId: this.planId,
        data: [
          {
            'questId': '141',
            'answer': this.formLabelAlign.scoreValue,
            'orderId': '1'
          },
          {
            'questId': '142',
            'answer': this.formLabelAlign.answerOne,
            'orderId': '2'
          },
          {
            'questId': '143',
            'answer': this.formLabelAlign.answerTwo,
            'orderId': '3'
          },
          {
            'questId': '144',
            'answer': this.formLabelAlign.answerThree,
            'orderId': '4'
          }
        ]
      }
      baseRequest('/course/coachScore/insertScore', params).then(response => {
        if (response.msg === 'Success') {
          this.$Message.success('操作成功')
          this.selectScore()
          this.formVisible = false
        } else {
          this.$Message.warning(response.msg)
        }
      })
    },
    // 查询教练测评
    selectScore() {
      baseRequest('/course/coachScore/selectScore', { planId: this.planId }).then(response => {
        if (response.data.item.length !== 0) {
          this.confirmShow = false
        } else {
          this.confirmShow = true
        }
        response.data.item.forEach((val, index) => {
          if (val.orderId === 1) {
            this.formLabelAlign.scoreValue = parseInt(val.answer)
          } else if (val.orderId === 2) {
            this.formLabelAlign.answerOne = val.answer
          } else if (val.orderId === 3) {
            this.formLabelAlign.answerTwo = val.answer
          } else if (val.orderId === 4) {
            this.formLabelAlign.answerThree = val.answer
          }
        })
      })
    },
    insertScore() {

    }
  }
}
</script>
<style lang="scss">
.el-divider--horizontal {
    display: block;
    // height: 1px;
    width: 100%;
    margin: 24px 0;
    border: 1px dashed #DCDFE6;
}
.el-divider {
    background-color: #ffffff;
}
.talk-meeting{
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
   .el-scrollbar__wrap {
      overflow-x: hidden;
    }
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
            padding-bottom:10px ;         
        } 
    }
    
}
</style>