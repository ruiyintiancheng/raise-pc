<template>
    <!-- 学习资料 -->
    <div class="materials" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
         <div class="scrollbar-box">
            <week-one v-if="flowNodeNo===4"></week-one>
            <week-two v-if="flowNodeNo===10"></week-two>
            <week-three v-if="flowNodeNo===17"></week-three>
            <week-three2 v-if="flowNodeNo===39"></week-three2>
            <week-four v-if="flowNodeNo===23"></week-four>
            <week-five v-if="flowNodeNo===28"></week-five>
            <week-six v-if="flowNodeNo===33"></week-six>
         </div>
       </el-scrollbar>
        <el-button @click="materialsDetailHandle()" class="materials-detail-btn" icon="el-icon-copy-document" circle v-if="canSeeDetail && flowNodeNo!==28"></el-button>
        <el-dialog
        :title="label"
        :visible.sync="dialogVisable"
        class="dialog-main materials-dialog height80 no-bottom"
        width="80%"
        top="5%"
        :close-on-click-modal="false"
        >
        <materials v-if="canSeeDetail" :canSeeDetail="false" :courseId="courseId" :flowNodeNo="flowNodeNo" :isNewest="isNewest"></materials>
      </el-dialog>
       <!-- <audio class="materials-audio" v-if="flowNodeNo === 4" src="http://www.raise-wisdom.com/media/weekOne.mp3" controls  oncontextmenu="return false;">
        您的浏览器不支持此音频文件
      </audio>
       <audio class="materials-audio" v-else-if="flowNodeNo === 10" src="http://www.raise-wisdom.com/media/weekTwo.mp3" controls  oncontextmenu="return false;">
        您的浏览器不支持此音频文件
      </audio>
       <audio class="materials-audio" v-if="flowNodeNo === 17" src="http://www.raise-wisdom.com/media/weekThree1.mp3" controls  oncontextmenu="return false;">
        您的浏览器不支持此音频文件
      </audio>
       <audio class="materials-audio" v-if="flowNodeNo === 39" src="http://www.raise-wisdom.com/media/weekThree2.mp3" controls  oncontextmenu="return false;">
        您的浏览器不支持此音频文件
      </audio>
       <audio class="materials-audio" v-if="flowNodeNo === 23" src="http://www.raise-wisdom.com/media/weekFour.mp3" controls  oncontextmenu="return false;">
        您的浏览器不支持此音频文件
      </audio> -->
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import WeekOne from './components/materialsContent/WeekOne'
import WeekTwo from './components/materialsContent/WeekTwo'
import WeekThree from './components/materialsContent/WeekThree'
import WeekThree2 from './components/materialsContent/WeekThree2'
import WeekFour from './components/materialsContent/WeekFour'
import WeekFive from './components/materialsContent/WeekFive'
import WeekSix from './components/materialsContent/WeekSix'
// import autoOne from './components/materialsContent/audio/weekOne.mp3'
// import autoTwo from './components/materialsContent/audio/weekTwo.mp3'
// import autoThree1 from './components/materialsContent/audio/weekThree1.mp3'
// import autoThree2 from './components/materialsContent/audio/weekThree2.mp3'
// import autoFour from './components/materialsContent/audio/weekFour.mp3'

export default {
  name: 'materials',
  components: {
    WeekOne, WeekTwo, WeekThree, WeekThree2, WeekFour, WeekFive, WeekSix
  },
  computed: {
    materialsHeight() {
      if (this.canSeeDetail) {
        return this.$store.state.app.containHeight - 340
      } else {
        return this.$store.state.app.containHeight * 0.8 - 18
      }
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    label: String,
    canSeeDetail: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisable: false
      // autoOne, autoTwo, autoThree1, autoThree2, autoFour
    }
  },
  created() {
    // this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/firstStep/getPMaterial', { flowNodeNo: this.flowNodeNo }).then(response => {
      })
    },
    materialsDetailHandle() {
      this.dialogVisable = true
    }
  }
}
</script>
<style lang="scss">
.materials{
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
    -webkit-user-select:none;
   -moz-user-select:none;
   -ms-user-select:none;
   user-select:none;
   padding-right: 0;
    .materials-audio{
      position: absolute;
      top:30px;
      right: 50px;
      opacity: 0.9;
      outline: white;
    }
    .materials-detail-btn{
      position: absolute;
      top:10px;
      right: 20px;
    }
    .el-scrollbar__wrap{
        overflow-x: hidden;
    }
    .materials-article{
      font-size: 16px;
      line-height: 32px;
      position: relative;
      .watermark{
        position: absolute;
        top: 220px;
        left: 50%;
        transform:rotate(-23deg) translateX(-50%);
        transform-origin: 0 0;
        width: 503px;
        z-index: 1;
        opacity: 0.1;
      }
      .watermark-2{
        top: 1220px;
      }
      .watermark-3{
        top: 2220px;
      }
      .watermark-4{
        top: 3220px;
      }
      .watermark-5{
        top: 4220px;
      }
      .watermark-6{
        top: 5220px;
      }
      .watermark-lmi{
        position: absolute;
        bottom: 0px;
        right: 30px;
        z-index: 1;
      }
      .materials-title{
        margin:0px 0 20px;
        font-size: 20px;
      }
      p{
        // margin-bottom: 10px;
        text-indent: 2em;
        &.p-p{
          text-indent: 1em;
        }
        &.p-s{
          text-indent: 4em;
        }
        &.p-a{
          padding-left: 4em;
          text-indent: 0em;
        }
        &.p-b{
          padding-left: 2em;
          text-indent: 0em;
        }
        &.p-c{
          padding-left: 3em;
          text-indent: -1em;
          &.plus{
            padding-left: 3em;
            text-indent: 0em;
          }
        }
        &.p-d{
          padding-left: 4em;
          text-indent: -1em;
        }
        &.materials-lead{
          text-indent: 0em;
          &.has-weight{
            font-weight: 600;
          }
        }
        &.materials-title-s{
          font-size: 16px;
          font-weight: bold;
        }
      }
      img{
        margin:20px auto;
      }
      .img-box{
        text-align: center;
        img{
          display: block;
        }
      }
    }
    .dialog-main.materials-dialog{
      .el-dialog__body{
        padding: 0;
      }
    }
}
</style>