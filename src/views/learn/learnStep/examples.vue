<template>
    <div class="learn-step">
       <div class="learn-container inside-container" v-if="relation[currentIndex]">
          <div class="learn-head">
            <h3 class="learn-title">
              <span class="learn-title-f" @click="$router.push({name:'learn'})">我的课程</span> <span class="sp-line">/</span><span class="learn-title-s">{{relation[currentIndex]['name']}}</span>
            </h3>
            <div class="learn-audio-box">
              <audio class="letter-audio" v-if="currentAudioNode" :src="currentAudioNode.url" controls  oncontextmenu="return false;">
                    您的浏览器不支持此音频文件
              </audio>
              <div class="audio-morn-btn">
                <el-popover 
                  placement="bottom"
                  trigger="hover"
                  width="250"
                  >
                    <el-button slot="reference"  icon="el-icon-more" circle size="mini"></el-button>
                    <ul class="audio-list-box">
                      <li class="audio-item" @click="audioChangeHandle(item)" :class="{active:item === currentAudioNode,disabled:relation.findIndex(it => it.step === item.step) > relation.findIndex(it => it.step === flowNodeNo)}" v-for="(item,index) in audioList" :key="index">
                        <i class="el-icon-video-play"></i>&nbsp;{{item.name}}
                      </li>
                    </ul>
                </el-popover>
              </div>
            </div>
          </div>
          <div class="fg-line"></div>
          <div v-if="relation[currentIndex] && relation[currentIndex].step === 20"  class="page-title">
            <span class="page-title-s" :class="{active:currentTab==='first'}" @click="currentTab='first'">周目标</span>
            <span class="page-title-s" :class="{active:currentTab==='second'}" @click="currentTab='second'">日计划</span>
            <span class="page-title-s" :class="{active:currentTab==='third'}" @click="currentTab='third'">31日追踪</span>
          </div>
          <div v-else-if="relation[currentIndex] && relation[currentIndex].step === 19"  class="page-title">
             <span class="page-title-l">{{relation[currentIndex]['name']}}</span><span class="gps-tip">请点击“目标”栏下面的内容进行目标规划</span>
          </div>
          <div v-else class="page-title clearfix">
            <span class="page-title-l">{{relation[currentIndex]['name']}}</span>
            <span class="page-title-r" v-if="meetingTip === 1">{{remindInfo}}</span>
            <span class="page-title-r" v-if="meetingTip === 2">小组辅导正在进行中，<a class="page-title-a" :href="joinUrl" target="_blank">立即进入</a></span>
          </div>
          <template v-if="pageExist">
             <letter ref="detailStep" v-if="relation[currentIndex]['step'] === 1" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']"></letter>
            <questionnaire ref="detailStep" v-if="questionnaires.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></questionnaire>
            <materials v-if="materialses.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo" :label="relation[currentIndex]['name']"></materials>
            <assessment ref="detailStep" :isEx="true" v-if="assessments.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></assessment>
            <challenge ref="detailStep" :isEx="true" v-if="challenges.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo" :overSecondWeek="relation.findIndex(it => it.step === flowNodeNo) < relation.findIndex(it => it.step === 14)"></challenge>
            <feedback ref="detailStep" v-if="feedbacks.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo" ></feedback>
            <next-process ref="detailStep" :isEx="true" v-if="nextProcesses.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></next-process>
            <meeting ref="detailStep" :isEx="true" v-if="meetings.some(item => item === relation[currentIndex]['step'])" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo" @changeGoOnStatus="changeGoOnStatus"></meeting>
            <target-tool ref="detailStep" v-if="targetTools.some(item => item === relation[currentIndex]['step'])" :currentTab="currentTab" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></target-tool>
            <tip ref="detailStep" :isEx="true" v-if="tips.some(item => item === relation[currentIndex]['step'])" :currentTab="currentTab" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></tip>
            <graduation ref="detailStep" :isEx="true" v-if="graduations.some(item => item === relation[currentIndex]['step'])" :currentTab="currentTab" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo" :graduationsName="graduationsName" @clearGraduationsName="graduationsName = ''"></graduation>
            <overall ref="detailStep" v-if="overalls.some(item => item === relation[currentIndex]['step'])" :currentTab="currentTab" :courseId="courseId" :flowNodeNo="relation[currentIndex]['step']" :isNewest="relation[currentIndex]['step'] === flowNodeNo"></overall>
          </template>
          
          <!-- 菜单按钮 -->
          <div class="learn-btns clearfix" v-show="currentIndex || currentIndex === 0">
            <div class="week-btns clearfix">
              <template v-for="(week,index) in weekBtns">
                <div class="btn-item week-btn" :key="index"  @mouseover="showNodeList(week)" @mouseleave="hideNodeList(week)" :class="{active:currentWeek === index+1,'can-learn':latestWeek >= index+1}" @click="weekChange(index+1)">{{week.weekName}}
                  <div class="week-node-list" v-show="week.weekList" @click.stop="">
                    <div class="week-node-content">
                        <el-timeline >
                          <el-timeline-item
                            v-for="(node, i) in nodeList"
                            :type="relation.findIndex(it => it.step === flowNodeNo) >= node.index?'primary':''"
                            :hide-timestamp="true"
                            :key="i"
                            :class="{'timeline-active':relation.findIndex(it => it.step === flowNodeNo) >= node.index}"
                            >
                             <div class="week-node-active-node" @click.stop="nodeClickHandle(node)">{{node.name}}</div>
                          </el-timeline-item>
                        </el-timeline>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="option-btns clearfix">
              <el-button :loading="downLoading" class="btn-item dwonload-btn"  v-if="canDownload()" @click="materialDownLoad">下载</el-button>
              <div class="btn-item next-btn" v-if="currentIndex !== 0" @click="previousStepHandle">上一步</div>
              <div class="btn-item next-btn" v-if="relation[currentIndex]['step'] !== flowNodeNo && relation[currentIndex]['step'] !== 37" @click="nextStepHandle">下一步</div>

              <div class="btn-item" :class="{'disabled':goOnLoading}"  v-if="relation[currentIndex]['step'] === flowNodeNo && timeCount === 0 && relation[currentIndex]['step'] !== 37" @click="goOnHandle()">{{[8, 15, 21, 26, 31, 35].some(item => item === relation[currentIndex]['step'])?'保存':'继续'}}</div>
              <div class="btn-item count-btn" v-if="relation[currentIndex]['step'] === flowNodeNo && timeCount !== 0" >{{timeCount}}s</div>
            </div>
          </div>
          
       </div>
    </div>
</template>
<script>
import Letter from './Letter'
import Materials from './Materials'
import Questionnaire from './Questionnaire'
import Assessment from './Assessment'
import Challenge from './Challenge'
import Feedback from './Feedback'
import NextProcess from './NextProcess'
import Meeting from './Meeting'
import targetTool from './targetTool'
import tip from './tip'
import Graduation from './Graduation'
import Overall from './Overall'
import { baseRequest } from '@/api/base'
import { download } from '@/utils/download'
import step from './step'
import audioList from './audioList'
export default {
  components: {
    Letter,
    Questionnaire,
    Assessment,
    Materials,
    Challenge,
    Feedback,
    NextProcess,
    Meeting,
    targetTool,
    tip,
    Graduation,
    Overall
  },
  watch: {
    currentIndex(to, from) {
      this.currentTab = 'first'
      if (this.relation[this.currentIndex]['step'] === this.flowNodeNo && this.materialses.includes(this.flowNodeNo)) {
        this.timeCount = 10
        this.time = setInterval(this.timeCountEvent, 1000)
      } else {
        clearInterval(this.time)
      }
      // const firstCroseNos = [1, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      // const secondCroseNos = [28, 29, 30, 31, 32, 33, 40, 38]
      // const currentNo = this.relation[to].step

      this.meetingTip = 0
      // if (firstCroseNos.includes(currentNo)) {
      //   this.getCourseTip(currentNo)
      // }
      // if (secondCroseNos.includes(currentNo)) {
      //   this.getCourseTip(currentNo)
      // }

      // 判断当前进入的音频
      const currentNode = this.relation[to]
      const audioItem = this.audioList.find(item => item.step === currentNode.step)
      this.audioChangeHandle(audioItem)
      this.pageExist = false
      this.$nextTick(_ => {
        this.pageExist = true
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      pageExist: true,
      // 显示小组辅导提示状态 0 不显示 1提示 2提示并且已开始
      meetingTip: 0,
      joinUrl: '',
      remindInfo: '',
      goOnLoading: false,
      time: null,
      timeCount: 0,
      courseId: null,
      // 当前节点
      flowNodeNo: null,
      // 当前序号
      currentIndex: null,
      downLoading: false,
      currentTab: 'first',
      // 打卡问卷对应步骤
      questionnaires: [3, 5, 11, 18, 24, 29, 38],
      // 资料对应步骤
      materialses: [4, 10, 17, 39, 23, 28, 33],
      // 自我评估对应步骤
      assessments: [6, 40],
      // 我的挑战表对应步骤
      challenges: [7, 14],
      // 学员反馈对应步骤
      feedbacks: [8, 15, 21, 26, 31],
      // 下周流程对应步骤
      nextProcesses: [9, 16, 22, 27, 32],
      // 小组辅导对应步骤
      meetings: [12, 13, 34],
      // 目标规划对应步骤
      targetTools: [19, 20, 25],
      // 开启成功手册
      tips: [30],
      // 整体评估
      overalls: [35],
      // 毕业证书
      graduations: [37],
      graduationsName: '',
      relation: step,
      weekBtns: [
        {
          weekNum: 1,
          weekName: '第一周',
          weekList: false
        },
        {
          weekNum: 2,
          weekName: '第二周',
          weekList: false
        },
        {
          weekNum: 3,
          weekName: '第三周',
          weekList: false
        },
        {
          weekNum: 4,
          weekName: '第四周',
          weekList: false
        },
        {
          weekNum: 5,
          weekName: '第五周',
          weekList: false
        },
        {
          weekNum: 6,
          weekName: '第六周',
          weekList: false
        }
      ],
      nodeList: [],
      audioList: audioList,
      currentAudioNode: null
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    },
    currentWeek() {
      let week = null
      if (this.currentIndex || this.currentIndex === 0) {
        week = this.relation[this.currentIndex]['week']
      }
      return week
    },
    latestWeek() {
      let week = 1
      if (this.flowNodeNo) {
        week = this.relation.find(item => item.step === this.flowNodeNo).week
      }
      return week
    }
    // weekBtns() {
    //   return
    // }
  },
  created() {
    this.courseId = this.$route.query.courseId
    if (!this.courseId) {
      this.$Message.error('参数错误')
      return
    }
    const roles = this.$store.state.user.roles
    const canIn = ['0', '1', '2', '4', '10']
    if (roles.find(item => canIn.some(i => i === item))) {
      this.getCourseProcess()
    } else {
      this.$Message.warning('很抱歉，您没有权限进入该页面')
    }

    // this.authentication().then(_ => {
    // this.getCourseProcess()
    // }, _ => {
    //   this.$router.push('/')
    // })
  },
  methods: {
    /**
     * 判断当前节点时候可以下载
     */
    canDownload() {
      let result = false
      if ([4, 10, 17, 23, 1, 33, 39].some(item => item === this.relation[this.currentIndex]['step'])) {
        result = true
      } else if (this.relation[this.currentIndex]['step'] !== this.flowNodeNo && [6, 40, 7, 14, 8, 15, 21, 26, 31, 35].some(item => item === this.relation[this.currentIndex]['step'])) {
        result = true
      }
      return result
    },
    /**
     * 改变audio
     */
    audioChangeHandle(audioItem) {
      if (!audioItem) {
        return
      }
      if (this.relation.findIndex(it => it.step === audioItem.step) > this.relation.findIndex(it => it.step === this.flowNodeNo)) {
        return
      }
      if (audioItem && this.currentAudioNode !== audioItem) {
        this.currentAudioNode = null
        this.$nextTick(_ => {
          this.currentAudioNode = audioItem
        })
      }
    },
    /**
     * 点击菜单节点
     */
    nodeClickHandle(node) {
      if (this.relation.findIndex(it => it.step === this.flowNodeNo) < node.index) {
        return
      }
      this.currentIndex = node.index
    },
    /**
     * 控制节点菜单显隐
     */
    showNodeList(week) {
      this.nodeList = []
      this.relation.forEach((item, index) => {
        if (item.week === week.weekNum) {
          item.index = index
          const flowIndex = this.relation.findIndex(it => it.step === this.flowNodeNo)
          if (flowIndex <= index) {
            this.nodeList.push(item)
          } else {
            if (!this.questionnaires.includes(item.step)) {
              this.nodeList.push(item)
            }
          }
        }
      })
      week.weekList = true
    },
    hideNodeList(week) {
      this.nodeList = []
      week.weekList = false
    },
    /**
     * 校验身份
     */
    authentication() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/firstStep/coursePermissionByStu', { courseId: this.$route.query.courseId }).then(response => {
          if (response.data.item.result) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    /**
     * 改变周
     */
    weekChange(week) {
      if (this.latestWeek < week) {
        return
      }
      this.currentIndex = this.relation.findIndex(item => item.week === week)
    },
    /**
     * 获取课程进度
     */
    getCourseProcess() {
      // baseRequest('/course/firstStep/getCourseProcess', { courseId: this.courseId }).then(response => {
      // this.flowNodeNo = response.data.item.flowNodeNo
      this.flowNodeNo = 37
      this.flowNodeNo = Number(this.flowNodeNo)
      if (this.flowNodeNo) {
        if (this.flowNodeNo !== 37) {
          this.currentIndex = this.relation.findIndex(item => item.step === this.flowNodeNo)
          this.currentIndex++
          this.flowNodeNo = this.relation[this.currentIndex].step
        }
      } else {
        this.flowNodeNo = 1
      }
      this.currentIndex = 0
      this.goOnLoading = false
      // })
    },
    /**
     * 点击继续
     */
    goOnHandle() {
      if (this.goOnLoading) {
        return
      }
      // // 判断第二周进第三周 第三周进第四周
      // if (this.flowNodeNo === 16 || this.flowNodeNo === 22) {
      //   this.dialogVisible = true
      //   return
      // }

      // 判断是否可以进入反馈页面
      if (this.flowNodeNo === 20 || this.flowNodeNo === 25 || this.flowNodeNo === 30) {
        let week = 3
        if (this.flowNodeNo === 25) {
          week = 4
        } else if (this.flowNodeNo === 30) {
          week = 5
        }
        baseRequest('/course/firstStep/feedBackList', { courseId: this.courseId, flowId: week }).then(response => {
          const status = response.data.item.status
          if (status) {
            this.saveCourseProcess()
          } else {
            this.$Message.warning(response.data.item.message)
          }
        })
        return
      }

      // 判断学员反馈是否发布
      if ([8, 15, 21, 26, 31, 35].some(item => item === this.relation[this.currentIndex]['step'])) {
        this.$confirm('请选择您要做的操作（发布后会进入下一步）', '提示', {
          confirmButtonText: '发布',
          cancelButtonText: '保存为草稿',
          confirmButtonClass: 'feedback-confirm-button',
          distinguishCancelAndClose: true,
          closeOnClickModal: false,
          // 保存为草稿
          beforeClose: (action, instance, done) => {
            if (action === 'cancel') {
              this.$refs.detailStep.saveData('0').then(_ => {
                this.$Message.success('保存草稿成功')
              })
            }
            done()
          },
          type: 'info',
          iconClass: ''
        }).then(() => {
          // 发布
          this.$refs.detailStep.saveData('1').then(_ => {
            // 判断倒数第二个节点生成毕业证
            if (this.flowNodeNo === 35) {
              this.$prompt('请确认您毕业证上的姓名', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
                inputErrorMessage: '姓名不能为空',
                inputValue: this.$store.state.user.name,
                closeOnClickModal: false
              }).then(({ value }) => {
                this.graduationsName = value
                this.saveCourseProcess(this.flowNodeNo)
              })
            } else {
              this.saveCourseProcess(this.flowNodeNo)
            }
            // this.saveCourseProcess(this.flowNodeNo)
          })
        })
        return
      }

      this.goOnLoading = true
      // 判断是否有保存回调
      if (this.$refs.detailStep && this.$refs.detailStep.saveData) {
        this.$refs.detailStep.saveData().then(_ => {
          this.saveCourseProcess(this.flowNodeNo)
        }, (wrongAnswer) => {
          if (wrongAnswer === true) {
            this.$Message.warning('对不起，您的打卡问卷回答没有通过，请重新学习回答')
            this.getCourseProcess()
          } else {
            this.goOnLoading = false
          }
        })
      } else {
        this.saveCourseProcess()
      }
    },
    /**
     * 保存课程进度
     */
    saveCourseProcess() {
      this.goOnLoading = true
      baseRequest('/course/firstStep/saveCourseProcess', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        if (response.data.item.courseNextFlag) {
          this.currentIndex++
          this.flowNodeNo = this.relation[this.currentIndex].step
          this.goOnLoading = false
        } else {
          this.$Message.warning(response.data.item.message)
        }
      })
    },
    confirmLetter() {
      this.dialogVisible = false
      this.saveCourseProcess()
    },
    /**
     * 上一步
     */
    previousStepHandle() {
      this.judgeContinue().then(_ => {
        this.currentIndex--
        if (this.questionnaires.includes(this.relation[this.currentIndex].step)) {
          this.currentIndex--
        }
      })
    },
    /**
     * 下一步
     */
    nextStepHandle() {
      this.judgeContinue().then(_ => {
        this.changeGoOnStatus(false)
        this.currentIndex++
        const currentStep = this.relation[this.currentIndex].step
        if ((currentStep !== this.flowNodeNo) && this.questionnaires.includes(currentStep)) {
          this.currentIndex++
        }
      })
    },
    /**
     * 判断上一步下一步时，是否存在未保存的数据(主要用于我的挑战，自我评估),如果存在则提醒(保存继续/不保存继续)
     */
    judgeContinue() {
      return new Promise((resolve, reject) => {
        if ([6, 7, 14, 40].some(item => item === this.relation[this.currentIndex]['step'])) {
          const updateStatus = this.$refs.detailStep.updateStatus
          if (updateStatus) {
            this.$confirm('检测到您有未保存的数据，是否继续?', '提示', {
              confirmButtonText: '保存并继续',
              cancelButtonText: '不保存继续',
              type: 'warning'
            }).then(() => {
              this.$refs.detailStep.saveData().then(_ => {
                resolve()
              })
            }).catch(() => {
              resolve()
            })
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      })
    },
    /**
     * 资料倒计时
     */
    timeCountEvent() {
      this.timeCount--
      if (this.timeCount <= 0) {
        clearInterval(this.time)
      }
    },
    /**
     * 改变继续可点击状态
     * 主要用于子组件方便调用
     */
    changeGoOnStatus(val) {
      this.goOnLoading = val
    },
    // 获取小组提示
    getCourseTip(currentNo) {
      baseRequest('/course/firstStep/getMeetingRemindInfo', { courseId: this.courseId, flowNodeNo: currentNo }).then(response => {
        this.remindInfo = response.data.item.remindInfo || ''
        this.joinUrl = response.data.item.joinUrl
        if (this.joinUrl) {
          this.meetingTip = 2
        } else {
          this.meetingTip = 1
        }
      })
    },
    // 下载
    materialDownLoad() {
      this.downLoading = true
      let url = ''
      if ([4, 10, 17, 23, 1, 33, 39].some(item => item === this.relation[this.currentIndex]['step'])) {
        url = '/course/firstStep/materialDownLoad'
      } else if ([6, 40].some(item => item === this.relation[this.currentIndex]['step'])) {
        url = '/course/rwPSelfAssess/selfAssessDownLoad'
      } else if ([7, 14].some(item => item === this.relation[this.currentIndex]['step'])) {
        url = '/course/rwPMyChallenge/myChallengeDownLoad'
      } else if ([8, 15, 21, 26, 31, 35].some(item => item === this.relation[this.currentIndex]['step'])) {
        url = '/course/rwPStuFeedback/feedbackLoad'
      }
      download(url, { courseId: this.courseId, flowNodeNo: this.relation[this.currentIndex]['step'] }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.learn-step{
      .learn-container{
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px 
            rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding:24px;
        margin-top:30px;
        margin-bottom: 30px;
        padding-bottom:78px;
        position: relative;
        .learn-head{
          position: relative;
          .learn-audio-box{
            position: absolute;
            top: 50%;
            right: 0;
            padding-right: 40px;
            transform: translateY(-50%);
            .audio-morn-btn{
              position: absolute;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 30px;
              height: 30px;
            }
          }
        }
        .learn-title{
            font-family: PingFangSC-Semibold;
            font-size: 16px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #888888;
            font-weight: bold;
            .sp-line{
              margin:0 10px;
            }
            .learn-title-f{
              cursor: pointer;
            }
            .learn-title-s{
              color: #222;
            }
        }
        .fg-line{
          height: 1px;
	        border: dashed 1px #ddd;
          margin-top: 24px;
        }
        .page-title{
          margin-top:30px;
          margin-bottom:22px;
          height: 17px;
          font-family: PingFangSC-Regular;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 19px;
          letter-spacing: 0px;
          color: #222222;
          border-left: 6px solid #00afff;
          padding-left: 10px;
          .page-title-s{
            margin-right: 30px;
            color: #888888;
            cursor: pointer;
            &:hover{
              color: #00afff;
            }
            &.active{
              color: #222222;
              // cursor: unset;
              &:hover{
                color: #222222;
              }
            }
          }
          .page-title-l{
            float: left;
          }
          .gps-tip{
            margin-left: 20px;
            color:#c81623;
            font-size: 14px;
          }
          .page-title-r{
            float: right;
            color:#c81623;
            font-size: 14px;
          }
          .page-title-a{
            text-decoration: underline;
          }
        }
         .learn-btns{
            position: absolute;
            left: 24px;
            bottom: 24px;
            right: 24px;
            .week-btns{
              float: left;
              .btn-item{
                padding: 0 25px;
                height: 30px;
                background-color: #00afff;
                border-radius: 15px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #ffffff;
                // cursor: pointer;
                float: left;
                margin-right: 20px;
                &.week-btn{
                  position: relative;
                  background-color: #e5f7ff;
                  color: #00afff;
                  -webkit-user-select:none;
                  -moz-user-select:none;
                  -ms-user-select:none;
                  user-select:none;
                  &.can-learn{
                    cursor: pointer;
                  }
                  &.active,&.can-learn:hover{
                    background-color: #00afff;
                    color: #ffffff;
                  }
                  .week-node-list{
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    padding-bottom: 12px;
                    z-index: 2;
                    width: 240px;
                    cursor: auto;
                    .week-node-content{
                    padding: 20px 20px;
                      background-color: #fff;
                      border-radius: 5%;
                      box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                      /deep/ .el-timeline-item {
                          padding-bottom: 20px;
                          cursor: auto;
                          .el-timeline-item__content{
                            line-height: 22px;
                          color: #aaa;
                          }
                          &.timeline-active{
                            .el-timeline-item__content{
                              color: #00afff;
                            }
                            .week-node-active-node{
                              cursor: pointer;
                            }
                          }
                      }
                    }
                  }
                }
              }
            }
            .option-btns{
              float: right;
              .btn-item{
                padding: 0 25px;
                height: 30px;
                background-color: #00afff;
                border-radius: 4px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #ffffff;
                cursor: pointer;
                margin-left: 20px;
                float: left;
                -webkit-user-select:none;
                -moz-user-select:none;
                -ms-user-select:none;
                user-select:none;
                &.next-btn{
                  color: #00afff;
                  background-color: #fff;
                  border:1px solid #00afff;
                  &:hover{
                    color: #fff;
                    background-color: #00afff;
                    border:1px solid #fff;
                  }
                }
                &.count-btn{
                  color: #fff;
                  background-color: #bbbbbb;;
                }
                &.disabled{
                  color: #bcbec2;
                  background-color: #f4f4f5;
                  border-color: #e9e9eb;
                  cursor: not-allowed;
                }
                &.dwonload-btn{
                 color: #67C23A;
                 border:1px solid #67C23A;
                 background-color: #fff;
                 &:hover{
                  color: #fff;
                  border:1px solid #fff;
                  background-color: #67C23A;
                 }
                }
              }
            }
          }
      }
}

</style>
<style lang="scss">
.step-title{
  margin-top:30px;
  padding-left: 10px;
	font-size: 18px;
	color: #222222;
  font-weight: normal;
  border-left: 6px solid #00afff;
}
.learn-step{
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .fg-line{
    height: 1px;
    border: dashed 1px #ddd;
    margin-top: 24px;
  }
  audio::-webkit-media-controls{
    overflow: hidden !important
  } 
  audio::-webkit-media-controls-enclosure{
    width: calc(100% + 32px);
    margin-left: auto;
  }
  .scrollbar-box{
    padding-right: 30px;
    position: relative;
  }
}
.audio-list-box{
  // width: 300px;
  padding-top: 10px;
  .audio-item{
    margin-bottom: 15px;
    cursor: pointer;
    &.active,&:hover{
      color: #00afff;
    }
    &.disabled{
      color: #aaa;
      &:hover{
        color: #aaa;
        cursor: default;
      }
    }
  }
}
.feedback-confirm-button.el-button--primary{
  background-color: #67C23A;
  border-color: #67C23A;
}
</style>