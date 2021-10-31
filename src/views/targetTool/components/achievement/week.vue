/** 周成就 */
<template>
  <div>
    <div class="tt-week">
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column :label="label" show-overflow-tooltip>
          <template slot-scope="scope">
            <svg-icon :style="{color:icon(scope.row.sourceType).color,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" />
            <span>{{scope.row.weeklyMatter}}</span>  
          </template>
        </el-table-column>
        <el-table-column prop="reachDate" label="达成日期" width="300" align="center" />
        <el-table-column width="78" align="center">
          <template slot-scope="scope">
            <svg-icon v-show="scope.row.reachState === '1'" icon-class="icon-mark-base" style="color: #04ae0f;" />
            <svg-icon v-show="scope.row.reachState === '2'" icon-class="icon-mark-base" style="color: orange;" />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { getWeek, dateInfo } from '@/utils/dateUtil'
import { icon } from '../icon'

export default {
  components: {},
  props: {
    date: String,
    // 表名称
    label: {
      type: String,
      default: '本周完成事项'
    }
  },
  data() {
    return {
      icon,
      loading: false,
      tableData: [],
      weekStartDate: null,
      weekEndDate: null
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    }
  },
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
  mounted() {

  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        weekStartDate: this.weekStartDate,
        weekEndDate: this.weekEndDate
      }
      baseRequest('/objective/rwWeekly/getAchievement', param).then(response => {
        this.tableData = response.data.item
        this.loading = false
      })
    },
    handleDate() {
      const date = dateInfo(this.date)
      const weeks = getWeek(date.year, date.month)
      this.weekStartDate = weeks[date.week].first
      this.weekEndDate = weeks[date.week].last
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../font.scss";

  .tt-week {
    margin-top: 32px;
  }

  /deep/ .el-table.table-main {
      td, th {
        border-right: 0;
      }
  }
</style>