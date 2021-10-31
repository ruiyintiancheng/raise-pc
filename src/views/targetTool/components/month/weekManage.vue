/** 周时间管理 */
<template>
  <div class="tt-plan">
    <!-- <div class="tt-title">
      <div @click="handleActive(i)" :class="{'active': active === i, 'tt-week': true, 'txt-sem-16': true, 'btn': true}"
        v-for="(item, i) in weekData" :key="i">
        {{item.name}}
      </div>
    </div> -->
    <!-- <div class="tt-times txt-black txt-sem-16">{{ getTimes }}</div> -->
    <!-- <div class="line line-dashed" /> -->
    <div v-for="(value, weekNum) in weekMap" :key="weekNum">
      <weekTable @refresh="refresh" :week="value" :weekNum="weekNum" :year="year" :month="month"/>
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
// import { getWeek } from '@/utils/dateUtil'
import weekTable from './week/weekTable'
export default {
  components: {
    weekTable
  },
  props: {
    year: {
      type: [String, Number],
      default: null
    },
    month: {
      type: [String, Number],
      default: null
    },
    week: Number
  },
  data() {
    return {
      active: 0,
      weekMap: {},
      weekData: []
    }
  },
  computed: {
    // getTimes() {
    //   const i = this.active
    //   return `${this.weekData[i].first} 至 ${this.weekData[i].last}`
    // },
    disable() {
      const i = this.active
      const endWeek = this.weekData[i].last
      const time = new Date(endWeek + ' 24:00:00').getTime()
      const now = new Date().getTime()
      return time < now
    }
  },
  created() {
    // this.weekData = getWeek(this.year, this.month)
    // this.handleActive(this.week)
    this.getWeekData()
  },
  mounted() {

  },
  methods: {
    getWeekData() {
      const param = {
        monthlyDate: this.month
      }
      baseRequest('/objective/rwWeeklySchedule/selects', param).then(response => {
        this.weekMap = response.data.item
      })
    },

    searchOption(startDate, endDate) {
      const param = {
        weekStartDate: startDate,
        weekEndDate: endDate
      }
      baseRequest('/objective/rwWeeklySchedule/selects', param).then(response => {
        this.weekMap = response.data.item
      })
    },
    handleActive(i) {
      this.active = i
      this.searchOption(this.weekData[i].first, this.weekData[i].last)
    },
    refresh(day) {
      this.getWeekData()
      // const param = {
      //   weekStartDate: day,
      //   weekEndDate: day
      // }
      // baseRequest('/objective/rwWeeklySchedule/selectDay', param).then(response => {
      //   this.weekMap[day] = response.data.item
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./month.css";

  .tt-plan {
    padding-top: 32px;
    .tt-title {
      margin-top: 32px;
      margin-bottom: 24px;
      height: 36px;
      .tt-week {
        width: 100px;
        height: 36px;
        line-height: 36px;
        margin-right: 24px;
        float: left;
        text-align: center;
        color: #00afff;
        background-color: #e5f7ff;
        border-radius: 18px;
      }
      .active {
        color: #ffffff !important;
        background-color: #00afff !important;
      }
    }
    .tt-times {
      float: right;
      margin-top: -48px;
    }
    .tt-content {
      background-color: #fcfcfc;
      border: 1px solid #dddddd;
      padding: 20px;
      border-radius: 10px;
    }
    .line {
      margin-bottom: 32px;
    }
  }
</style>