<template>
    <div class="intoStudy">
       <div class="learn-container inside-container">
            <div class="learn-head">
                <h3 class="learn-title">
                    <span class="learn-title-f">我的课程</span>
                </h3>
            </div>
            <div class="fg-line"></div>
            <div class="page-title clearfix">
            <span class="page-title-l">1-1教练会谈</span>
            </div>
            <template v-for="(val,index) in courseList">
                <meeting v-if="currentIndex === index" :key="index" :courseId="connectVal.courseId" :planId="val.planId" :flowNodeNo="val.flowNodeNo"></meeting>
            </template>
             <coach-info v-if="currentIndex === 99" :recordId="recordId"></coach-info>
            <!-- 菜单按钮 -->
           <div class="learn-btns clearfix" v-show="currentIndex || currentIndex === 0">
            <div class="week-btns clearfix">
              <div class="btn-item week-btn"  @click="currentIndex = 99" :class="{active:currentIndex === 99,'can-learn':true}">流程说明</div>
              <template v-if="courseList.length>0">
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
import CoachInfo from './CoachInfo.vue'
export default {
  components: {
    Meeting,
    CoachInfo
  },
  data() {
    return {
      courseList: [],
      connectVal: null,
      currentIndex: 99,
      recordId: null
    }
  },
  created() {
    this.connectVal = this.$route.query.row
    this.recordId = this.$route.params.recordId
    // console.log(this.connectVal)
    this.authentication().then(_ => {
      this.getCourseProcess()
    }, _ => {
      this.$router.push('/')
    })
    this.oneToOnePermissionByStu()
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
    toChinesNum(num) {
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
      const unit = ['', '十', '百', '千', '万']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i === 0 && strArr[i] === 0 ? '' : (i > 0 && strArr[i] === 0 && strArr[i - 1] === 0 ? '' : changeNum[strArr[i]] + (strArr[i] === 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 10000)
      let noWan = num % 10000
      if (noWan.toString().length < 4) { noWan = '0' + noWan }
      return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
    },
    /**
     * 获取课程进度
     */
    getCourseProcess() {
      baseRequest('course/oneToOne/getOneToOneById', { recordId: this.recordId }).then(response => {
        this.courseList = response.data.item || []
        // console.log(this.courseList)
        this.courseList.map((item, index) => {
          item.name = '第' + this.toChinesNum(index + 1) + '次'
          // if (index === 0) {
          //   item.name = '第一次辅导'
          // } else if (index === 1) {
          //   item.name = '第二次辅导'
          // } else if (index === 2) {
          //   item.name = '第三次辅导'
          // }
          return item
        })
      })
    },
    // 进入上课页面权限（学员）
    oneToOnePermissionByStu() {
      baseRequest('course/firstStep/oneToOnePermissionByStu', { recordId: this.recordId }).then(response => {
        if (response.data.item.result === false) {
          this.$router.push('/')
        }
      })
    },
    dayChange(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style lang="scss">
.intoStudy{
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
        .learn-title{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #888888;
            font-weight: bold;
            .learn-line{
              margin:0 10px;
            }
            .learn-title-f{
              cursor: pointer;
              color: #88888888;
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