/** 未来规划 */
<template>
  <div class="tt-html" style="height:100%;">
    <h4 class="tt-head">未来规划</h4>
    <!-- <el-button class="download" size="mini" type="success" plain @click="download" :loading="downLoading">  
      <i class="el-icon-download el-icon--right" />
      <span class="font">下 载</span>
    </el-button> -->
    <div class="line-title" />
    <div class="tt-list i-content clearfix">
      <month-calendar v-for="(item, i) in calendar" :key="i"
        :viewYear="viewYear"
        :month="i+1"
        :days="item"
        :class="{'clear-rigth': (i+1)%3 === 0, 'clear-bottom': i > 9 }"
        @handleClick="handleClick"
      />
    </div>
    <planForm ref="form" :viewYear="viewYear" @refresh="refresh" />
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import { queryDays, dateInfo } from '@/utils/dateUtil'
import monthCalendar from './components/month-calendar'
import planForm from './components/plan-form'
export default {
  components: {
    monthCalendar,
    planForm
  },
  props: {
    viewYear: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      downLoading: false,
      dailyDate: null,
      calendar: [],
      dayArr: []
    }
  },
  computed: {},
  created() {
    this.dailyDate = this.viewYear + '/01/01'
    this.refresh()
  },
  mounted() {},
  methods: {
    refresh() {
      this.handleDayArray()
      this.handlePlan()
    },
    // 数据处理
    handleDayArray() {
      // 月分布
      const dayArr = [31, queryDays(dateInfo(this.dailyDate).year + '-02-01'), 31, 30, 31, 30,
        31, 31, 30, 31, 30, 31]
      this.dayArr = dayArr
    },
    handlePlan() {
      const calendar = []
      // 初始化日历
      this.dayArr.forEach((d, index) => {
        const month = []
        for (let i = 1; i <= d; i++) {
          month[i - 1] = {
            num: i,
            align: 'none',
            type: 'none',
            data: []
          }
        }
        calendar[index] = month
      })

      // 遍历规划
      const param = { viewYear: dateInfo(this.dailyDate).year }
      baseRequest('/objective/rwFuturePlan/selects', param).then(response => {
        const data = response.data.item
        const firstDay = this.viewYear + '/01/01'
        const lastDay = this.viewYear + '/12/31'

        data.forEach((d, i) => {
          const start = this.compareDate(firstDay, d.startDate) > 0 ? dateInfo(firstDay) : dateInfo(d.startDate)
          const end = this.compareDate(lastDay, d.endDate) > 0 ? dateInfo(d.endDate) : dateInfo(lastDay)
          let day = start.day
          for (let m = start.month; m <= end.month;) {
            for (; day <= (m === end.month ? end.day : this.dayArr[m - 1]); day++) {
            // 往日历添加属性
              const cal_day = calendar[m - 1][day - 1]
              cal_day.data.push(d)

              if (cal_day.type === 'one') {
                cal_day.type = 'two'
              }
              if (cal_day.type === 'none') {
                cal_day.type = 'one'
              }
              cal_day.align = 'all'
            }
            m++
            day = 1
          }

          const start_day = calendar[start.month - 1][start.day - 1]
          const end_day = calendar[end.month - 1][end.day - 1]

          start_day.align = start_day.type === 'two' ? 'all' : 'start'
          end_day.align = end_day.type === 'two' ? 'all' : 'end'

          if (d.startDate === d.endDate) {
            start_day.align = 'none'
          }
          if (this.compareDate(firstDay, d.startDate) > 0) {
            start_day.align = 'all'
          }
          if (this.compareDate(lastDay, d.endDate) < 0) {
            end_day.align = 'all'
          }
        })

        this.calendar = calendar
      })
    },
    // 日期比较
    compareDate(a, b) {
      const da = new Date(a).getTime()
      const db = new Date(b).getTime()
      if (da > db) {
        return 1
      } else if (da < db) {
        return -1
      } else {
        return 0
      }
    },
    // 添加/修改数据
    handleClick(month, day, data) {
      const date = `${this.viewYear}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
      this.$refs.form.openDialog(date, data.data)
    },
    download() {
      console.log('未来规划导出')
      this.downLoading = true
      downloadFile('/objective/rwGoalPlan/download', { })
        .finally(_ => {
          this.downLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-html{
    position: relative;
    // padding:0 24px 24px;
    .i-content{
      height:calc(100% - 66px);
      overflow:auto;
      padding:0px 24px 24px;
    }
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
        padding-left: 24px;
    }

    .tt-date {
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

    .line-title {
      display: block;
      height: 0;
      margin: 0 -24px;
      border-top: 1px solid #cccccc;
    }

    .tt-list {
      padding-top: 28px;
      /deep/ .tt-calendar {
        float: left;
        margin-right: 27px;
        margin-bottom: 30px;
      }
      /deep/ .clear-rigth {
        margin-right: 0;
      }
      /deep/ .clear-bottom {
        margin-bottom: 0;
      }
    }
  }

  .download {
    position: absolute;
    right: 24px;
    top: 19px;
  }
</style>

