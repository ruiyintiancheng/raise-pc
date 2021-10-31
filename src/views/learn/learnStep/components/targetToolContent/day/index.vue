<template>
  <div class="tt-html">
    <h4 class="tt-head">日计划</h4>
    <div class="tt-calendar">
      <div class="bg">
        <svg-icon class="icon-add-white"  icon-class="icon-rili" />
      </div>
      <el-date-picker
        v-model="dailyDate"
        type="date"
        :editable="false"
        :clearable="false"
        value-format="yyyy-MM-dd"
        @change="handleChangeDate"
        placeholder="选择日期">
      </el-date-picker>
    </div>
    <div class="tt-plan btn" @click="hanleTrip">
      <div class="bg">
        <svg-icon class="icon-add-white"  icon-class="icon-xingcheng" />
        <span class="font">当日行程</span>
      </div>
    </div>
    <div class="line-title" />
    <div class="tt-tables">
      <div>
        <div class="tt-title txt-white">紧要事项</div>
        <matterTable 
            ref="contType0" @refresh="refresh" 
            :dailyDate="dailyDate"
            dailyType="0" 
            label="事项"
            :disable="disable"
            formLable="紧要事项" />
        <div class="line line-dashed" />
      </div>
      <div>
        <div class="tt-title txt-white">重要事项</div>
        <matterTable 
            ref="contType1" @refresh="refresh"
            :dailyDate="dailyDate"
            dailyType="1"
            label="事项"
            :disable="disable"
            formLable="重要事项" />
        <div class="line line-dashed" />
      </div>
      <!-- <div>
        <div class="tt-title txt-white">31日追踪事项</div>
        <trackTable 
            ref="contType2" @refresh="refresh"
            :dailyDate="dailyDate"
            label="事项" />
        <div class="line line-dashed" />
      </div>
      <div>
        <div class="tt-title txt-white">沟通/授权</div>
        <personTable 
            ref="contType3" @refresh="refresh" :dailyDate="dailyDate" label="事项">
        </personTable>

      </div> -->
            <div>
        <div class="tt-title txt-white" id="communication">沟通/追踪</div>
        <personTable 
            ref="contType3" @refresh="refresh" :dailyDate="dailyDate" 
            :disable="disable"
            label="事项">
        </personTable>
      </div>
      <div>
        <div class="tt-title txt-white" id="track">31日追踪事项</div>
        <trackTable 
            ref="contType2" @refresh="refresh"
            :dailyDate="dailyDate"
            :disable="disable"
            label="事项" />
        <div class="line line-dashed" />
      </div>
    </div>
    <trip ref="trip" :dailyDate="dailyDate" />
  </div>
</template>

<script>
import matterTable from '@/views/targetTool/components/day/components/matterTable'
import trackTable from '@/views/targetTool/components/day/components/trackTable'
import personTable from '@/views/targetTool/components/day/components/personTable'
import trip from '@/views/targetTool/components/day/components/trip'
import { dateInfo } from '@/utils/dateUtil'
export default {
  components: {
    matterTable,
    trackTable,
    personTable,
    trip
  },
  props: {
    viewDate: String
  },
  data() {
    return {
      viewYear: '',
      dailyDate: null,
      pickerOptionsStart: {
        disabledDate: (time) => {
          var date = new Date()
          this.viewYear = date.getFullYear() + ''
          const startTime = new Date(this.viewYear + '-01-01 00:00:00').getTime()
          const endTime = new Date(this.viewYear + '-12-31 23:59:59').getTime()
          return time.getTime() < startTime || time.getTime() > endTime
        }
      }
    }
  },
  computed: {
    disable() {
      const time = new Date(this.dailyDate).getTime()
      const now = new Date(dateInfo().format).getTime()
      return time < now
    }
  },
  created() {
    this.dailyDate = this.viewDate
  },
  mounted() {},
  methods: {
    refresh(contType) {
      // 刷新重要事项计划表
      if (contType === '0') {
        this.$refs['contType1'].searchOption()
        return
      }
      // 刷新重要事项计划表
      if (contType === '1') {
        this.$refs['contType0'].searchOption()
        return
      }
    },
    // 改变日期
    handleChangeDate(val) {
      // console.log(this.dailyDate)
    },
    hanleTrip() {
      this.$refs.trip.openDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-html{
    position: relative;
    padding:0 24px 24px;
    .tt-head{
        height: 66px;
        line-height: 66px;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
        font-weight: bold;
    }

    .tt-calendar {
      position: absolute;
      top: 19px;
      left: 102px;
      .bg {
        float: left;
        height: 36px;
        color: #00afff;
        line-height: 36px;
        .icon-add-white {
          width: 12px;
        }
      }
      /deep/ .el-date-editor {
        width: 150px;
        .el-input__inner {
          cursor: pointer;
          width: 150px;
          color: #00afff;
          border: 0;
          padding-left: 6px;
          padding-right: 0;
          text-decoration: underline;
          font-family: PingFangSC-Regular;
          font-size: 16px;
        }
        .el-input__prefix {
          display: none;
        }
      }
    }

    .tt-plan {
      position: absolute;
      top: 19px;
      right: 24px;
      cursor: pointer;
      .bg {
        width: 100px;
        height: 28px;
        background-color: #04ae0f;
        border-radius: 4px;
        color: #ffffff;
        line-height: 28px;
        text-align: center;
        .icon-add-white {
          width: 12px;
        }
        .font {
          font-family: PingFangSC-Regular;
          font-size: 14px;
        }
      }
    }

    .line-title {
      display: block;
      height: 0;
      margin: 0 -24px;
      border-top: 1px solid #cccccc;
    }

    .tt-tables {
      .tt-title {
        width: 160px;
        height: 28px;
        line-height: 28px;
        margin-top: 32px;
        margin-bottom: 14px;
        padding-left: 20px;
        background-color: #00afff;
        border-radius: 0 10px 10px 0;
      }
      .tt-table {
        margin-bottom: 24px;
      }
      .btn-group {
        text-align: right;
        margin-top: 14px;
        .btn {
          width: 90px;
          height: 30px;
          border-radius: 4px;
          padding: 0;
        }
        .btn-clear {
          background-color: #ffffff;
        }
        .btn-save {
          margin-left: 30px;
          background-color: #00afff;
        }  
      }
      .line {
        margin-top: 24px;
      }
    }
  }
</style>

