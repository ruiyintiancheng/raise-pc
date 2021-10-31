<template>
    <div class="month-calendar-box" v-loading="loading">
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
            <div v-for="(item,i) in calendarMonth" :key="item + i" class="calend-cell" :class="{'current-day':item.data.day === currentDate}">
              <ul class="target-list">
                <template v-for="(target,o) in item.data.result">
                  <li v-if="o<5" class="calender-day-list"  :key="target+o">
                    <span class="calender-icon-box">
                      <svg-icon v-if="target.dailyType === '0' || target.dailyType === '1'" :icon-class="target.dailyType === '0'?'icon-jingji':'icon-zhongyao'" />
                      <svg-icon v-else style="color:#0066ff;" icon-class="icon-C" />
                    </span>
                    <span v-if="target.startDate">{{target.startDate}}-{{target.endDate}}</span>
                    <span>{{target.dailyMatter}}</span>
                  </li>
                </template>
              </ul>
              <div class="date-num2" :class="{'current-day':item.data.day === currentDate}">{{item.num}}</div>
              <div class="more-icon">
                <i v-if="item.data.day >= currentDate" @click="addHandle(item)" class="iconfont el-icon-circle-plus-outline"></i>
                <i v-if="item.data.result && item.data.result.length > 0" @click="clickHandle(item)" class="iconfont el-icon-more"></i>
              </div>
            </div>
            <div v-for="i in backBlank" :key="'blankback' + i" class="calend-cell blank" ></div>
          </div>
        </div>

      <el-dialog
        append-to-body
        :title="currentItem.data.day"
        :visible.sync="dialogVisable"
        class="dialog-main heightauto"
        top="10%"
        width="700px"
        destroy-on-close
        :close-on-click-modal="false"
      >
            <template slot="title">
        <span>{{currentItem.data.day}}</span><a style="    margin-left: 7px;
        color: #00afff;
        font-size: 16px;
        text-decoration: underline;" @click="intoDay">进入日计划</a>
      </template>
      <el-table
        v-loading="tableLoading"
        class="table-main"
        height="500px"
        :data="tableData"
        border
        style="width: 100%">
                <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="事项"  prop="dailyMatter" align="center">
            <template slot-scope="scope">
              <div style="text-align:left;">
                <span style="margin-right:5px;">
                  <svg-icon v-if="scope.row.dailyType === '0' || scope.row.dailyType === '1'" :icon-class="scope.row.dailyType === '0'?'icon-jingji':'icon-zhongyao'" />
                  <svg-icon v-else style="color:#0066ff;" icon-class="icon-C" />
                </span>
                <span v-if="scope.row.startDate">{{scope.row.startDate}}-{{scope.row.endDate}}</span>
                {{scope.row.dailyMatter}}
              </div>
            </template>
        </el-table-column>
      </el-table>
      <sur-pagination v-if="total > pageSize" :pageNo="pageNo"
                      :total="total"
                      :pageSize="pageSize"
                      @size-change="handleSizeChange"  
                      @current-change="handleCurrentChange">
      </sur-pagination>
    </el-dialog>
      <canlendar-form ref="canlendarForm" :monthlyDate="currentItem.data.day" @refresh="getData"></canlendar-form>
    </div>
</template>
<script>
import { baseRequest } from '../../../../api/base'
import { parseTime } from '@/utils/index'
import canlendarForm from './canlendarForm'
export default {
  components: { canlendarForm },
  data() {
    return {
      calendarMonth: [],
      loading: false,
      exsit: true,
      currentItem: {
        data: {
          day: '',
          result: []
        }
      },
      tableLoading: false,
      pageNo: 1,
      pageSize: 10,
      total: null,
      dialogVisable: false,
      tableData: []
    }
  },
  props: {
    viewMonth: String
  },
  computed: {
    blank() {
      const date = new Date(parseInt(this.viewMonth.substring(0, 4)), this.viewMonth.substring(5) - 1, 1)
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
  created() {
    this.getCalendarMonth()
  },
  methods: {
    intoDay() {
      this.$emit('intoDay', this.currentItem.data.day)
    },
    addHandle(item) {
      this.currentItem = item
      this.$refs.canlendarForm.openDialog()
    },
    clickHandle(item) {
      this.currentItem = item
      this.searchOption()
      this.dialogVisable = true
    },
    getCalendarMonth() {
      const year = this.viewMonth.substring(0, 4)
      const month = this.viewMonth.substring(5)
      const monthTotal = this.getCurrentMonthLast(year, month)
      for (let i = 1; i <= monthTotal; i++) {
        this.calendarMonth[i - 1] = {
          num: i,
          data: {
            result: []
          }
        }
      }
      this.getData()
    },
    getData() {
      this.loading = true
      baseRequest('/objective/rwMonthlyCont/selectList', { dailyDate: this.viewMonth + '-01' }).then(response => {
        const data = response.data.item
        this.calendarMonth.map((item, index) => {
          item.data = {
            result: data[index].result || [],
            day: data[index].day
          }
          return item
        })
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
    searchOption(page) {
      this.tableLoading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        dailyDate: this.currentItem.data.day
      }
      baseRequest('/objective/rwMonthlyCont/selectByPage', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.tableLoading = false
      })
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}
</script>
<style lang="scss" scoped>
$squreWidth: 182px;
$squreheight: 170px;
.month-calendar-box{
  padding-top: 15px;
  width: calc(100% - 4px);
  .month-calendar{
    border: 1px solid #ddd;
    border-radius: 10px;
    overflow: hidden;
    .calend-header{
      // height: 100px;
      border-bottom: 1px solid #ccc;
      background-color: #eee;
      width: 1295px;
      .calend-week{
        float: left;
        width: $squreWidth;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-right: 1px solid #ddd;
        &:last-child{
          border-right: 0;
        }
      }
    }
    .month-calendar-body{
      width: 1295px;
    }
    .calend-cell{
        float: left;
        padding-top: 31px;
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
          top:10px;
          right: 10px;
          font-size: 22px;
          font-weight: 700;
          color: #00afff;
          width: 34px;
          text-align: center;
          height: 29px;
          line-height: 32px;
          border-radius: 5px;
          &.current-day{
            // background-color: #FE383A;
            background-color: #00afff;
            color: #fff;
          }
        }
        .more-icon{
          position: absolute;
          bottom:5px;
          right: 10px;
          cursor: pointer;
          &:hover{
            color: #00afff;
          }
        }
      }
  }
}
</style>