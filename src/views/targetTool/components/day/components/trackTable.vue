/** 31日追踪事项 */
<template>
  <div class="calandar-track clearfix" v-loading="loading">
    <div class="month-calendar" v-if="exsit">
          <div class="calend-header clearfix">
            <div class="calend-week">日</div>
            <div class="calend-week">一</div>
            <div class="calend-week">二</div>
            <div class="calend-week">三</div>
            <div class="calend-week">四</div>
            <div class="calend-week">五</div>
            <div class="calend-week">六</div>
          </div>
          <div class="month-calendar-body clearfix">
            <div v-for="i in blank" :key="'blank' + i" class="calend-cell blank" ></div>
            <div v-for="(item,i) in calendarMonth" :key="item + i" class="calend-cell" @click="dateClick(item)" :class="{disabled:item.status === 2 || item.date > currentDate,active: currentItem === item}">
              <div class="date-num2" :class="{'current-day':item.date === currentDate}">{{item.num}}</div>
              <div class="date-status" v-if="item.status === 1 && item.date <= currentDate"><i class="el-icon-success"></i></div>
              <div class="date-status un-reach" v-if="item.status === 0 && item.date <= currentDate"><i class="el-icon-warning"></i></div>
            </div>
            <div v-for="i in backBlank" :key="'blankback' + i" class="calend-cell blank" ></div>
          </div>
        </div>
      <el-table
        class="table-track table-main"
        :data="tableData"
        :height="tableHeight + 'px'"
        border
        stripe
        >
        <el-table-column prop="trackGoal" label="事项" align="left"></el-table-column>
        <el-table-column prop="goalType" label="类型" align="center" width="160">
          <template slot-scope="scope">
            <span v-if="scope.row.goalType === '0'">个人目标</span>
            <span v-if="scope.row.goalType === '1'">工作目标</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120" label="打卡">
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'" style="color: #04ae0f; text-align: center;" >
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
            <div v-else-if="isPast()" class="achieved" style="color: gray; text-align: center;">
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 未达成
            </div>
            <div v-else>
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils/index'

export default {
  components: {
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    dailyDate: String,
    disable: Boolean
  },
  computed: {
    blank() {
      const date = new Date(parseInt(this.dailyDate.substring(0, 4)), this.dailyDate.substring(5, 7) - 1, 1)
      const week = date.getDay()
      // return parseInt((week - 1 + 7) % 7) // 周一开头
      return parseInt((week + 7) % 7) // 周日开头
    },
    backBlank() {
      const total = this.blank + this.calendarMonth.length
      const outNum = total % 7
      if (outNum) {
        return 7 - outNum
      } else {
        return 0
      }
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      loading: false,
      calendarMonth: [],
      exsit: true,
      currentItem: null,
      tableData: [],
      tableHeight: '345'
    }
  },
  created() {
    this.getCalendarMonth()
  },
  mounted() {

  },
  methods: {
    dateClick(item) {
      if (item.status === 2 || item.date > this.currentDate) {
        return
      }
      this.currentItem = item
      this.getTableData()
    },
    getCalendarMonth() {
      const year = this.dailyDate.substring(0, 4)
      const month = this.dailyDate.substring(5, 7)
      const monthTotal = this.getCurrentMonthLast(year, month)
      for (let i = 1; i <= monthTotal; i++) {
        this.calendarMonth[i - 1] = {
          num: i
        }
      }
      this.getData()
    },
    refresh() {
      // this.searchOption()
    },
    getTableData() {
      baseRequest('/objective/rwDaily/getMonthlyTrack', { reachDate: this.currentItem.date }).then(response => {
        this.tableData = response.data.item
      })
    },
    getData() {
      this.loading = true
      baseRequest('/objective/rwMonthlyTrack/getMonthlyTrack', { reachDate: this.dailyDate }).then(response => {
        const data = response.data.item
        let index = 0
        for (const key in data) {
          this.calendarMonth[index]['date'] = key
          this.calendarMonth[index]['status'] = data[key]
          if (this.calendarMonth[index]['date'] === this.dailyDate) {
            if (this.dailyDate > this.currentDate || data[key] === 2) {
              this.currentItem = null
            } else {
              this.currentItem = this.currentItem || this.calendarMonth[index]
            }
          }
          index++
        }
        if (this.currentItem) {
          this.getTableData()
        } else {
          this.tableData = []
        }
        this.tableHeight = Math.ceil((this.blank + this.calendarMonth.length) / 7) * 58 + 52
        this.exsit = false
        this.$nextTick(_ => {
          this.exsit = true
          this.loading = false
        })
      })
    },
    getCurrentMonthLast(year, month) {
      year = Number(year)
      month = Number(month)
      var nextMonthFirstDay = new Date(year, month, 1)
      var oneDay = 1000 * 60 * 60 * 24
      var lastTime = new Date(nextMonthFirstDay - oneDay)
      var day = lastTime.getDate()
      if (day < 10) {
        day = '0' + day
      }
      return day
    },
    isPast() {
      const year = this.dailyDate.substring(0, 4)
      const month = this.dailyDate.substring(5, 7)
      const passDate = year + '-' + month
      const date = new Date()
      const currentYear = date.getFullYear()
      let currentMonth = date.getMonth() + 1
      currentMonth = currentMonth >= 10 ? currentMonth : '0' + currentMonth
      const currentDate = currentYear + '-' + currentMonth
      return passDate < currentDate
    },
    // 达成目标
    reachRow(row) {
      const param = {
        trackGoalId: row.trackGoalId,
        reachState: '1',
        reachDate: this.currentItem.date
      }
      this.$confirm('确定达成此事项么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwDaily/updateMonthlyTrackReach', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.getCalendarMonth()
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$squreWidth: 58px;
$squreheight: 58px;
.calandar-track{
  .month-calendar{
    width: 411px;
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    float: left;
    .calend-header{
      // height: 100px;
      border-bottom: 1px solid #ccc;
      background-color: #eee;
      .calend-week{
        float: left;
        width: $squreWidth;
        height: 52px;
        line-height: 52px;
        text-align: center;
        border-right: 1px solid #ddd;
        &:last-child{
          border-right: 0;
        }
      }
    }
    .calend-cell{
        float: left;
        // padding-top: 31px;
        width: $squreWidth;
        height: $squreheight;
        // line-height: $squreWidth;
        // text-align: center;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        position: relative;
        &.blank{
          background-color: #f6f5f5;
        }
        &:nth-child(7n){
          border-right: none;
        }
        &.disabled{
          // background-color: #ede9e9;
          .date-num2{
            color: #ede9e9;
            cursor: default;
          }
        }
        &.active{
          background-color: #dfedfd;
        }
        &.current-day{
          // background-color: #ecf5ff;
          // border: 1px solid #00afff;
        }
        .target-list{
          padding: 3px 10px;
          .calender-day-list{
            margin-top: 8px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            color: #222;
            font-size: 12px;
            .calender-icon-box{
              display: inline-block;
              min-width: 18px;
            }
          }
        }
        .date-num{
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size: 50px;
          font-weight: 800;
          opacity: 0.3;
          color: #00afff;
          &.current-day{
            color: red;
          }
        }
        .date-num2{
          position: absolute;
          top:15px;
          right: 13px;
          font-size: 18px;
          font-weight: 700;
          color: #00afff;
          width: 34px;
          text-align: center;
          height: 29px;
          line-height: 32px;
          border-radius: 5px;
          cursor: pointer;
          &.current-day{
            // background-color: #FE383A;
            background-color: #00afff;
            color: #fff;
          }
        }
        .date-status{
          position: absolute;
          top:1px;
          right: 1px;
          font-size: 14px;
          font-weight: 600;
          color: #67C23A;
          &.un-reach{
            color: #ccc;
          }
        }
      }
  }
  .table-track{
    float: right;
    width: 830px;
  }
}
</style>