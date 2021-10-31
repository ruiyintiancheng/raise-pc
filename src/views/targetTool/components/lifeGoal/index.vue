<template>
    <div class="tt-goal" style="height:100%;">
         <div class="goal-title clearfix">
            人生规划
        </div>
        <div class="i-content">
            <span class="tap-both"  :class="{tapdisplay:state===0}" @click="state = 0" >个人规划</span>
            <span class="tap-both"  :class="{tapdisplay:state===1}" @click="state = 1" > 事业规划</span>
            <goal ref="goal" :year="year" v-show="state===0" @changeDream="changeDream"></goal>
            <cause ref="cause" :year="year" v-show="state===1" @changeDream="changeDream"></cause>
        </div>
    </div>
</template>
<script>
import goal from './components/goal.vue'
import cause from './components/cause.vue'
import { downloadFile } from '@/utils/download'
export default {
  props: {
    year: [String, Number]
  },
  components: {
    goal,
    cause
  },
  data() {
    return {
      state: 0,
      downLoading: false
    }
  },
  methods: {
    changeDream(tab) {
      this.state = tab
      if (tab === 1) {
        this.$refs.cause.active = 4
        this.$refs.cause.$refs.dream.searchOption()
      } else {
        this.$refs.goal.active = 4
        this.$refs.goal.$refs.dream.searchOption()
      }
    },
    downloadHandle() {
      this.downLoading = true
      downloadFile('/objective/rwVision/download', { viewYear: this.year }).finally(_ => {
        this.downLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.tt-goal{
        position: relative;
      // padding: 0 24px 24px;
    .i-content{
      // height:calc(100% - 66px);
      // overflow:auto;
      padding:10px 24px 24px;
    }
      .goal-title{
        height: 66px;
        // width:calc(100% + 24px);
        width:100%;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: bold;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        border-bottom: 1px solid #cccccc;
        // margin-bottom: 28px;
        padding-left: 24px;
        padding-right: 24px;
    }
    .tt-goal-btn{
      float: right;
      margin-top:20px;
    }
      .tap-both{
        display: inline-block;
        width: 105px;
        height: 50px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: 400;
        font-stretch: normal;
        line-height: 50px;
        letter-spacing: 0px;
        color: #222222;
        text-align: center;
        cursor: pointer;
        margin-bottom: 18px;
        border-bottom: 1px dashed #aaa;
        &:hover{
          color:#00afff
        }
    }
     .tapdisplay{
    background-image: linear-gradient(0deg, #D2F1FF 0%, 	#ffffff 100%);
    color: #00afff;
    background-blend-mode: normal, 	normal;
    border-bottom: 4px solid #00afff;
    }
    .dottedline{
        border:1px dashed #aaa;
        margin-bottom:32px;
    }
}
</style>