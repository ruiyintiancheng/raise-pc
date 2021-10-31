<template>
    <div class="learn-step">
       <div class="learn-container inside-container" v-if="relation[currentIndex]">
          <div class="learn-head">
            <h3 class="learn-title">
              <span class="learn-title-f" @click="$router.push({name:'learn'})">我的课程</span> <span class="sp-line">/</span><span class="learn-title-f" @click="$router.push({name:'exploredoor'})">探索之门</span> <span class="sp-line">/</span><span class="learn-title-s">{{relation[currentIndex]['name']}}</span>
            </h3>
            <div class="learn-audio-box">
              <audio class="letter-audio" v-if="audioVisable && relation[currentIndex] && relation[currentIndex]['audio']" :src="relation[currentIndex]['audio']" controls  oncontextmenu="return false;">
                    您的浏览器不支持此音频文件
              </audio>
            </div>
          </div>
          <div class="fg-line"></div>
          <div class="page-title clearfix">
            <span class="page-title-l">{{relation[currentIndex]['name']}}</span>
            <a @click="$router.push({name:'coachTalk'})" class="page-title-r">购买1对1教练会谈</a>
          </div>
          <template >
              <foreword ref="doorref" v-if="currentIndex === 0"></foreword>
              <day1 ref="doorref" v-else-if="currentIndex === 1" :isShiyong="isShiyong"></day1>
              <day2 ref="doorref" v-else-if="currentIndex === 2"></day2>
              <day3 ref="doorref" v-else-if="currentIndex === 3"></day3>
              <day4 ref="doorref" v-else-if="currentIndex === 4"></day4>
              <day5 ref="doorref" v-else-if="currentIndex === 5"></day5>
              <day6 ref="doorref" v-else-if="currentIndex === 6"></day6>
              <day7 ref="doorref" v-else-if="currentIndex === 7"></day7>
              <day8 ref="doorref" v-else-if="currentIndex === 8"></day8>
              <day9 ref="doorref" v-else-if="currentIndex === 9"></day9>
              <day10 ref="doorref" v-else-if="currentIndex === 10"></day10>
              <feedback ref="doorref" v-else-if="currentIndex === 11"></feedback>
          </template>
          
          <!-- 菜单按钮 -->
          <div class="learn-btns clearfix" v-show="currentIndex || currentIndex === 0">
            <div class="week-btns clearfix">
              <template v-for="(item,index) in relation">
                <div class="btn-item week-btn" @click="dayChange(index)" :key="index" :class="{active:currentIndex === index,'can-learn':lastIndex >= index}">{{item.name}}</div>
              </template>
              <div class="btn-item week-btn database" v-if="!this.isShiyong" @click="openDatebase">资料库</div>
            </div>
            <div class="option-btns clearfix">
              <el-button :loading="downLoading" class="btn-item dwonload-btn"  v-if="currentIndex!==0 && currentIndex!==11" @click="materialDownLoad">下载</el-button>
              <!-- <div class="btn-item next-btn" v-if="currentIndex !== 0" @click="previousStepHandle">上一步</div>
              <div class="btn-item next-btn" v-if="relation[currentIndex]['step'] !== flowNodeNo && relation[currentIndex]['step'] !== 11" @click="nextStepHandle">下一步</div> -->

              <div class="btn-item" :class="{'disabled':goOnLoading}"  v-if="relation[currentIndex]['day'] === flowNodeNo && relation[currentIndex]['day'] !== 11" @click="goOnHandle()">继续</div>
            </div>
          </div>
          
       </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { download } from '@/utils/download'
import foreword from './foreword'
import day1 from './day1.vue'
import day2 from './day2.vue'
import day3 from './day3.vue'
import day4 from './day4.vue'
import day5 from './day5.vue'
import day6 from './day6.vue'
import day7 from './day7.vue'
import day8 from './day8.vue'
import day9 from './day9.vue'
import day10 from './day10.vue'
import feedback from './feedback.vue'
export default {
  components: {
    foreword, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, feedback
  },
  watch: {
    currentIndex(to, from) {
      this.audioVisable = false
      this.$nextTick(_ => {
        this.audioVisable = true
      })
      if (this.currentIndex >= 1 && this.isShiyong) {
        this.goOnLoading = true
      }
    }
  },
  data() {
    return {
      audioVisable: true,
      joinUrl: '',
      goOnLoading: false,
      courseId: null,
      // 当前节点
      flowNodeNo: null,
      // 当前序号
      currentIndex: null,
      downLoading: false,
      isShiyong: true,
      relation: [
        { day: 0, name: '序言', audio: 'http://www.raise-wisdom.com/media/doorForeword.mp4' },
        { day: 1, name: 'DAY1', audio: 'http://www.raise-wisdom.com/media/doorDay1.mp3' },
        { day: 2, name: 'DAY2', audio: 'http://www.raise-wisdom.com/media/doorDay2.mp3' },
        { day: 3, name: 'DAY3', audio: 'http://www.raise-wisdom.com/media/doorDay3.mp4' },
        { day: 4, name: 'DAY4', audio: 'http://www.raise-wisdom.com/media/doorDay4.mp3' },
        { day: 5, name: 'DAY5', audio: 'http://www.raise-wisdom.com/media/doorDay5.mp3' },
        { day: 6, name: 'DAY6', audio: 'http://www.raise-wisdom.com/media/doorDay6.mp3' },
        { day: 7, name: 'DAY7', audio: 'http://www.raise-wisdom.com/media/doorDay7.mp3' },
        { day: 8, name: 'DAY8', audio: 'http://www.raise-wisdom.com/media/doorDay8.mp4' },
        { day: 9, name: 'DAY9', audio: 'http://www.raise-wisdom.com/media/doorDay9.mp4' },
        { day: 10, name: 'DAY10', audio: 'http://www.raise-wisdom.com/media/doorDay10.mp3' },
        { day: 11, name: '反馈' }
      ]
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    },
    // 最新学到的序号
    lastIndex() {
      return this.relation.findIndex(item => item.day === this.flowNodeNo)
    }
  },
  created() {
    this.authentication().then(_ => {
      this.getCourseProcess()
    }, _ => {
      this.$router.push('/')
    })
  },
  methods: {
    /**
     * 判断当前节点时候可以下载
     */
    canDownload() {
      return true
    },
    /**
     * 校验身份
     */
    authentication() {
      return new Promise((resolve, reject) => {
        baseRequest('/user/rwProductPermission/isAvailable', {}).then(response => {
          if (response.data.item.openFlag === '1') {
            resolve()
            baseRequest('/user/rwProductPermission/isDisplay', {}).then(response => {
              this.isShiyong = response.data.item.flag
            })
          } else {
            reject()
          }
        })
      })
    },
    /**
     * 获取课程进度
     */
    getCourseProcess() {
      baseRequest('/course/rwReflectionDiary/getExploreProcess', { }).then(response => {
        this.flowNodeNo = response.data.item.days ? Number(response.data.item.days) : 0
        // this.flowNodeNo = 9
        this.currentIndex = this.relation.findIndex(item => item.day === this.flowNodeNo)
        this.goOnLoading = false
      })
    },
    /**
     * 点击切换天
     */
    dayChange(index) {
      if (this.lastIndex < index) {
        return
      }
      this.judgmentSave().then(_ => {
        baseRequest('/course//rwReflectionDiary/getPermissionByNode', { days: this.relation[index].day }).then(response => {
          if (response.data.item.result) {
            this.currentIndex = index
          } else {
            this.$Message.warning('很抱歉，您不能访问该页面')
          }
        })
      })
    },
    judgmentSave() {
      return new Promise((resove, reject) => {
        if (this.$refs.doorref && this.$refs.doorref.hasUpdateState && this.$refs.doorref.hasUpdateState()) {
          this.$confirm('检测到您有未保存的内容，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            resove()
          })
        } else {
          resove()
        }
      })
    },
    /**
     * 点击继续
     */
    goOnHandle() {
      if (this.goOnLoading) {
        return
      }
      this.judgmentSave().then(_ => {
        this.saveCourseProcess()
      })
    },
    /**
     * 保存课程进度
     */
    saveCourseProcess() {
      // this.goOnLoading = true
      //   baseRequest('/course/firstStep/saveCourseProcess', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
      //     if (response.data.item.courseNextFlag) {
      //       this.currentIndex++
      //       this.flowNodeNo = this.relation[this.currentIndex].step
      //       this.goOnLoading = false
      //     } else {
      //       this.$Message.warning(response.data.item.message)
      //     }
      //   })
      baseRequest('/course//rwReflectionDiary/getPermissionByNode', { days: this.relation[this.currentIndex + 1].day }).then(response => {
        if (response.data.item.result) {
          this.$refs.doorref.canGoon().then(_ => {
            this.currentIndex++
            this.flowNodeNo = this.relation[this.currentIndex].day
          }, _ => {
            this.$Message.warning('请您填写并保存相关信息后继续')
          })
        } else {
          this.$Message.warning('很抱歉，您不能访问该页面')
        }
      })
    },
    /**
     * 上一步
     */
    previousStepHandle() {
      this.judgeContinue().then(_ => {
        this.currentIndex--
      })
    },
    /**
     * 下一步
     */
    nextStepHandle() {
      this.judgeContinue().then(_ => {
        this.changeGoOnStatus(false)
        this.currentIndex++
      })
    },
    /**
     * 判断上一步下一步时，是否存在未保存的数据(主要用于我的挑战，自我评估),如果存在则提醒(保存继续/不保存继续)
     */
    judgeContinue() {
      return new Promise((resolve, reject) => {
        // if ([6, 7, 14, 40].some(item => item === this.relation[this.currentIndex]['step'])) {
        //   const updateStatus = this.$refs.detailStep.updateStatus
        //   if (updateStatus) {
        //     this.$confirm('检测到您有未保存的数据，是否继续?', '提示', {
        //       confirmButtonText: '保存并继续',
        //       cancelButtonText: '不保存继续',
        //       type: 'warning'
        //     }).then(() => {
        //       this.$refs.detailStep.saveData().then(_ => {
        //         resolve()
        //       })
        //     }).catch(() => {
        //       resolve()
        //     })
        //   } else {
        //     resolve()
        //   }
        // } else {
        //   resolve()
        // }
        resolve()
      })
    },
    openDatebase() {
      this.judgmentSave().then(_ => {
        this.$router.push({ name: 'database' })
      })
    },
    /**
     * 改变继续可点击状态
     * 主要用于子组件方便调用
     */
    changeGoOnStatus(val) {
      this.goOnLoading = val
    },
    // 下载
    materialDownLoad() {
      this.downLoading = true
      let url = ''
      if (this.relation[this.currentIndex].day === 10) {
        url = '/course/rwReflectionDiary/exploreDay10Download'
      } else {
        url = '/course/rwReflectionDiary/reflectionDownload'
      }

      download(url, { days: this.relation[this.currentIndex]['day'] }, _ => {
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
        }
        .learn-audio-box{
            position: absolute;
            top: 50%;
            right: 0;
            padding-right: px;
            transform: translateY(-50%);
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
            text-decoration: underline;
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
                padding: 0 15px;
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
                margin-right: 18px;
                &.week-btn{
                  position: relative;
                  -webkit-user-select:none;
                  -moz-user-select:none;
                  -ms-user-select:none;
                  user-select:none;
                  background-color: #ccc;
                    color: #fff;
                  &.can-learn{
                    cursor: pointer;
                    background-color: #e5f7ff;
                    color: #00afff;
                  }
                  &.active,&.can-learn:hover{
                    background-color: #00afff;
                    color: #ffffff;
                  }
                  &.database{
                    border-radius: 5px;
                    color: #00afff;
                    border: 1px solid #00afff;
                    background-color: #ffffff;
                    cursor: pointer;
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