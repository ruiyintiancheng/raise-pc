<template>
    <!-- 下周流程 -->
    <div class="next-process" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="scrollbar-box">
              <week-one :isEx="isEx" v-if="flowNodeNo===9" :courseId="courseId" :oneFourTime="oneFourTime" :oneOneTime="oneOneTime" @getData="getData"></week-one>
              <week-two v-if="flowNodeNo===16" :courseId="courseId"></week-two>
              <week-three v-if="flowNodeNo===22" :courseId="courseId"></week-three>
              <week-four v-if="flowNodeNo===27" :courseId="courseId"></week-four>
              <week-five v-if="flowNodeNo===32" :courseId="courseId" :oneFourTime="oneFourTime"></week-five>
           </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import weekOne from './components/nextProcessContent/weekOne'
import weekTwo from './components/nextProcessContent/weekTwo'
import weekThree from './components/nextProcessContent/weekThree'
import weekFour from './components/nextProcessContent/weekFour'
import weekFive from './components/nextProcessContent/weekFive'
import { parseTime } from '@/utils'
export default {
  components: {
    weekOne, weekTwo, weekThree, weekFour, weekFive
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      oneFourTimeOne: '',
      oneFourTimeFive: '',
      oneOneTime: '',
      oneFourTime: ''
    }
  },
  created() {
    if (this.flowNodeNo === 9 || this.flowNodeNo === 32) {
      this.getData()
    }
  },
  methods: {
    getData() {
      baseRequest('/course/firstStep/getMeetingTimeByStu', { courseId: this.courseId }).then(response => {
        const timeArr = response.data.item || []
        for (const iterator of timeArr) {
          if (iterator.flowNodeNo === 12) {
            const oneFourTimeOneS = iterator.startTime || ''
            const oneFourTimeOneE = iterator.endTime || ''
            if (oneFourTimeOneS) {
              this.oneFourTimeOne = parseTime(oneFourTimeOneS.substring(0, 10), '{y}年{m}月{d}日') + ' ' + oneFourTimeOneS.substring(11, 16) + '-' + oneFourTimeOneE.substring(11, 16)
            }
          } else if (iterator.flowNodeNo === 13) {
            const oneOneTimeS = iterator.startTime
            // const oneOneTimeS = ''
            const oneOneTimeE = iterator.endTime
            if (oneOneTimeS) {
              this.oneOneTime = parseTime(oneOneTimeS.substring(0, 10), '{y}年{m}月{d}日') + ' ' + oneOneTimeS.substring(11, 16) + '-' + oneOneTimeE.substring(11, 16)
            }
          } else if (iterator.flowNodeNo === 34) {
            const oneFourTimeTwoS = iterator.startTime
            const oneFourTimeTwoE = iterator.endTime
            if (oneFourTimeTwoS) {
              this.oneFourTimeFive = parseTime(oneFourTimeTwoS.substring(0, 10), '{y}年{m}月{d}日') + ' ' + oneFourTimeTwoS.substring(11, 16) + '-' + oneFourTimeTwoE.substring(11, 16)
            }
          }
        }
        if (this.flowNodeNo === 9) {
          this.oneFourTime = this.oneFourTimeOne
        } else if (this.flowNodeNo === 32) {
          this.oneFourTime = this.oneFourTimeFive
        }
      })
    },
    /**
     * 这里用promise做异步
     */
    saveData() {
      return new Promise((resolve, reject) => {
        // if (this.flowNodeNo === 9 && !this.oneOneTime) {
        //   this.$Message.warning('请选择1对1辅导时间')
        //   reject()
        // } else {
        resolve()
        // }
      })
    }
  }
}
</script>
<style lang="scss">
.next-process{
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
    .update-btn{
        position: absolute;
        top:30px;
        right: 30px;
        z-index: 1;
        opacity: 0.8;
    }
    .fg-line{
      margin-bottom: 30px;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .mt10{
      margin-top: 10px;
    }
    .mt20{
      margin-top: 20px;
    }
    .cored{
      color: #FF002B;
    }
    .next-process-content{
      font-size: 16px;
      color: #222;
      .weight{
          font-weight: bold;
      }
      .one-button{
        width: 72px;
        height: 24px;
        line-height: 24px;
        background-color: #00afff;
        border-radius: 4px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        border: none;
        cursor: pointer;
        outline: none;
      }
      .next-process-item{
        margin-bottom: 25px;
        .next-process-title{
          font-size: 15px;
          &.intent{
           text-indent: 0em;
          }
          &:last-child{
            // margin-bottom: 10px;
          }
        }
        .next-process-text{
          margin-top:20px;
          // width: 50%;
          line-height: 28px;
          font-size: 15px;
          p{
            margin-bottom: 10px;
            // text-indent: 2em;
          }
        }
      }
      .process-warning{
        font-size: 14px;
        color: #fb664a;
        margin-top:40px;
      }
    }
    /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner{
        border-color: #409EFF;
        background: #409EFF;
        &::after{
            background-color: #fff;
        }
    }
    /deep/ .el-radio {
      margin-right: 0px; 
    }
    .oneone-times{
      li{
        margin-bottom: 20px;
        &:last-child{
          margin-bottom: 0;
        }
      }
      .oneone-tip{
          font-size: 14px;
          line-height: 20px;
          color: #fb664a;
      }
    }
}
</style>