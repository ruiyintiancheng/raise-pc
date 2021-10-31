/** 年成就 */
<template>
  <div>
    <div class="tt-week">
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="annualGoal" :label="label"  show-overflow-tooltip>
           <template slot-scope="scope">
            <svg-icon :style="{color:icon(scope.row.sourceType).color,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" />
            <span>{{scope.row.annualGoal}}</span>
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
import { dateInfo } from '@/utils/dateUtil'
import { icon } from '../icon'

export default {
  components: {},
  props: {
    date: String,
    // 表名称
    label: {
      type: String,
      default: '本年完成目标'
    }
  },
  data() {
    return {
      icon,
      loading: false,
      tableData: [],
      viewYear: null
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
    searchOption() {
      this.loading = true
      const param = {
        viewYear: this.viewYear
      }
      baseRequest('/objective/rwAnnual/getAchievement', param).then(response => {
        this.tableData = response.data.item
        this.loading = false
      })
    },
    handleDate() {
      const date = dateInfo(this.date)
      this.viewYear = date.year
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