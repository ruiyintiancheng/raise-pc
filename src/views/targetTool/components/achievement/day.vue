/** 日成就 */
<template>
  <div class="tt-track">
    <div class="box">
      <matter-table label="本日完成事项" :tableData="today" />
    </div>
    <div class="line" />
    <div class="box">
      <matter-table label="31日追踪" :tableData="track" />
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { dateInfo } from '@/utils/dateUtil'
import matterTable from './components/matterTable'
export default {
  components: {
    matterTable
  },
  props: {
    date: String
  },
  data() {
    return {
      dailyDate: null,
      monthlyDate: null,
      today: null,
      track: null
    }
  },
  computed: {},
  watch: {
    date(val) {
      this.handleDate()
      this.searchOption()
    }
  },
  created() {
    this.handleDate()
    this.searchOption()
  },
  mounted() {},
  methods: {
    searchOption() {
      this.loading = true
      const param = {
        dailyDate: this.dailyDate,
        monthlyDate: this.monthlyDate
      }
      baseRequest('/objective/rwDaily/getAchievement', param)
        .then(response => {
          const data = response.data.item

          const today = []
          data.today.forEach(d => {
            today.push({
              name: d.dailyMatter,
              date: d.reachDate,
              reachState: d.reachState,
              sourceType: d.sourceType
            })
          })
          this.today = today

          const track = []
          data.track.forEach(d => {
            track.push({
              name: d.trackGoal,
              date: d.reachDate,
              reachState: d.reachState
            })
          })
          this.track = track
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
    display : flex;
    .box {
      width: 50%;
    }
    .line {
      margin: 24px;
      display: block;
      border-left: 1px dashed #aaaaaa;
    }
  }
</style>

