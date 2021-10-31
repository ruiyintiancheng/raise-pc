/** 月成就 */
<template>
  <div class="tt-track">
    <matter-table label="本月完成目标" :tableData="goalTable" />
    <div class="line line-dashed" />
    <matter-table label="本月完成事项" :tableData="monthTable" />
    <div class="line line-dashed" />
    <div class="tb-box">
      <div class="tb-title">31日追踪事项</div>
      <div class="tb-body">
        <div class="title txt-reg-14 txt-black">个人目标</div>
        <div class="clearfix">
          <template v-for="(item, i) in persons">
            <month-calendar :key="i"
            :class="i % 2 === 0 ? 'left' : 'right'"
            :months="months" 
            :days="item.days"
            :label="item.trackGoal" />
          </template>
        </div>
        <div class="line2 line-dashed" />
        <div class="title txt-reg-14 txt-black">工作目标</div>
        <div class="clearfix">
          <template v-for="(item, i) in companies">
            <month-calendar :key="i"
            :class="i % 2 === 0 ? 'left' : 'right'"
            :months="months" 
            :days="item.days"
            :label="item.trackGoal" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { dateInfo, queryDays } from '@/utils/dateUtil'
import matterTable from './components/matterTable'
import monthCalendar from './components/month-calendar'
export default {
  components: {
    matterTable,
    monthCalendar
  },
  props: {
    date: String
  },
  data() {
    return {
      months: null,
      goalTable: null,
      monthTable: null,
      persons: null,
      companies: null
    }
  },
  computed: {},
  watch: {
    date(val) {
      this.months = queryDays(val)
      this.handleDate()
      this.searchOption()
    }
  },
  created() {
    this.months = queryDays(this.date)
    this.handleDate()
    this.searchOption()
  },
  mounted() {},
  methods: {
    searchOption() {
      this.loading = true
      const param = {
        viewDate: this.monthlyDate
        // monthlyDate: this.monthlyDate
      }
      baseRequest('/objective/rwMonthlyCont/getAchievement', param)
        .then(response => {
          const { persons, companies, month, goal } = response.data.item

          this.persons = persons
          this.companies = companies

          this.monthTable = month.map(d => {
            return {
              name: d.monCont,
              date: d.reachDate,
              reachState: d.reachState,
              sourceType: d.sourceType
            }
          })

          this.goalTable = goal.map(d => {
            return {
              name: d.monCont,
              date: d.reachDate,
              reachState: d.reachState,
              sourceType: d.sourceType
            }
          })
        })
    },
    handleDate() {
      const date = dateInfo(this.date)
      this.dailyDate = this.date
      this.monthlyDate = date.yyyy + '-' + date.MM
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../font.scss";
  .tt-track {
    margin-top: 32px;
  }
  .tb-body {
    padding: 24px 24px 0 24px;
    .title {
      margin-bottom: 10px;
    }
  }
 
  .tt-calendar {
    margin-bottom: 32px;
  }
  .tt-calendar.left {
    float:left;
  }
  .tt-calendar.right {
    float: right;
  }

  .line {
    margin-top: 32px;
    margin-bottom: 32px;
  }
  .line2 {
    margin: 0 14px 32px;
  }

</style>

