<template>
    <div class="learn-step">
       <div class="learn-container inside-container">
          <div class="learn-head">
            <h3 class="learn-title">
              <span class="learn-title-f" @click="$router.push({name:'learn'})">我的课程</span> <span class="sp-line">/</span><span class="learn-title-f" @click="$router.push({name:'exploredoor'})">First Step强化辅导</span> <span class="sp-line"></span>
            </h3>
          </div>
          <div class="fg-line"></div>
          <div class="page-title clearfix">
            <span class="page-title-l">强化辅导</span>
          </div>
          <template v-for="(item,index) in courseList">
              <meeting v-if="currentIndex === index" :key="index" :courseId="courseId" :planId="item.planId" :flowNodeNo="item.flowNodeNo"></meeting>
          </template>
          
          <!-- 菜单按钮 -->
          <div class="learn-btns clearfix" v-show="currentIndex || currentIndex === 0">
            <div class="week-btns clearfix">
              <template v-if="courseList.length>1">
                <div class="btn-item week-btn" v-for="(item,index) in courseList"  @click="dayChange(index)" :key="index" :class="{active:currentIndex === index,'can-learn':true}">{{item.name}}</div>
              </template>
            </div>
          </div>
          
       </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import Meeting from './Meeting.vue'
export default {
  components: {
    Meeting
  },
  watch: {
  },
  data() {
    return {
      courseId: null,
      recordId: null,
      // 当前序号
      currentIndex: 0,
      courseList: []
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    }
  },
  created() {
    this.courseId = this.$route.query.courseId
    this.recordId = this.$route.query.recordId
    if (!this.courseId) {
      this.$Message.error('参数错误')
      return
    }
    this.authentication().then(_ => {
      this.getCourseProcess()
    }, _ => {
      this.$router.push('/')
    })
  },
  methods: {
    /**
     * 校验身份
     */
    authentication() {
      return new Promise((resolve, reject) => {
        resolve()
      })
    },
    /**
     * 获取课程进度
     */
    getCourseProcess() {
      // baseRequest('/course/coaches/getOrderRecordPlanList', { courseId: this.courseId, recordId: this.recordId }).then(response => {
      baseRequest('/course/courses/selectByFSExtra', { }).then(response => {
        this.courseList = response.data.item || []
        this.courseList.map((item, index) => {
          if (index === 0) {
            item.name = '第一次辅导'
          } else if (index === 1) {
            item.name = '第二次辅导'
          } else {
            item.name = '强化辅导'
          }
          return item
        })
      })
    },
    /**
     * 点击切换天
     */
    dayChange(index) {
      this.currentIndex = index
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