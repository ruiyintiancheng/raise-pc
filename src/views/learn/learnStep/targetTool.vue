<template>
    <!-- 目标规划 -->
    <div class="learn-target-tool" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <gps ref="gps" :year="year" v-if="flowNodeNo===19" :courseId="courseId" :flowNodeNo="flowNodeNo"></gps>
           <week :viewDate="viewDate" :courseId="courseId" v-if="flowNodeNo===20 && currentTab==='first'"></week>
           <day :viewDate="viewDate" v-if="flowNodeNo===20 && currentTab==='second'"></day>
           <day-track :viewDate="viewDate" v-if="flowNodeNo===20 && currentTab==='third'"></day-track>
            <month :viewDate="viewDate" v-if="flowNodeNo===25"></month>
       </el-scrollbar>
       <el-dialog
          title="目标规划·SP使用说明"
          :visible.sync="dialogVisible"
          class="dialog-main heightauto"
          top="10vh"
          width="520px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <div class="sp-letter" v-if="flowNodeNo===19">
                <p>1. 从第三周开始将逐步开放目标规划·SP系统表单的使用，本周你可先尝试规划1-2个目标、逐步熟悉表单内容。其中只有标识为红色*的内容为必填项，其它内容为选填项。</p>
                <p>2. 在第五周正式开放目标规划·SP之前，如需制定新的目标，仍请回到“第三周-目标清单总表”处填写。  </p>
                <p>3. 目前填写到工具表单中的信息，都将继承到后续开放的目标规划·SP系统中，以保证信息的完整性、连贯性。</p>
                <p>&nbsp;</p>
          </div>
          <div class="sp-letter" v-else-if="flowNodeNo===20">
                <p>1. 从第三周开始将逐步开放目标规划·SP系统表单的使用，本周你可尝试制定周目标、日计划、31日追踪事项。其中只有标识为红色*的内容为必填项，其它内容为选填项。</p>
                <p>2. 在第五周正式开放目标规划·SP之前，制定周目标、日计划，都请进入“第三周-周目标/日计划/31日追踪”处填写。 </p>
                <p>3. 个人目前填写到工具表单中的信息，都将继承到后续开放的目标规划·SP系统中，以保证信息的完整性、连贯性。</p>
                <p>&nbsp;</p>
          </div>
          <div class="sp-letter" v-else-if="flowNodeNo===25">
                <p>1. 本周目标规划·SP系统开放月度目标表，本周你可尝试制定本月或下月目标。其中只有标识为红色*的内容为必填项，其它内容为选填项。</p>
                <p>2. 个人目前填写到工具表单中的信息，都将继承到后续开放的目标规划·SP系统中，以保证信息的完整性、连贯性。</p>
                <p>&nbsp;</p>
          </div>
          <span slot="footer">
            <el-button  @click="dialogVisible = false">关 闭</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
// import { baseRequest } from '@/api/base'
import gps from './components/targetToolContent/gps'
import week from './components/targetToolContent/week'
import day from './components/targetToolContent/day'
import dayTrack from './components/targetToolContent/track'
import month from './components/targetToolContent/month'
export default {
  components: {
    gps, week, day, dayTrack, month
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  watch: {
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean,
    currentTab: String
  },
  data() {
    return {
      year: '',
      viewDate: '',
      dialogVisible: false
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.$nextTick(_ => {
      setTimeout(_ => {
        this.dialogVisible = this.isNewest
      }, 500)
    })
  },
  methods: {
    getData() {
      var date = new Date()
      this.year = date.getFullYear() + ''
      const seperator1 = '-'
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.viewDate = year + seperator1 + month + seperator1 + strDate
    },
    saveData() {
      return new Promise((resolve, reject) => {
        if (this.flowNodeNo === 19) {
          if (this.$refs.gps.tableData.every(item => item.rangeName)) {
            resolve()
          } else {
            this.$Message.warning('请补全目标计划工作单中的领域')
            reject()
          }
        } else {
          resolve()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.learn-target-tool{
    position: relative;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #222222;
    border-radius: 10px;
    // border: solid 1px #dddddd;
    overflow: auto;
    .sp-letter{
      p{
        margin-top: 10px;
      }
    }
}
</style>