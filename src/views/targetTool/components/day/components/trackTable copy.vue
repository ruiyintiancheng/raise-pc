/** 31日追踪事项 */
<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="getTableDate"
        border
        style="width: 100%">
        <el-table-column>
          <template #header>
            <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
              <span>{{scope.row.trackGoal}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="reachDate" label="达成日期" align="center" width="160" /> -->
        <el-table-column align="center" width="200">
          <template #header >
              <span v-if="disable">达成状态</span>
          </template>
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'">
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
            <div v-else-if="disable" class="achieved" style="color: gray; text-align: center;">
              <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 未达成
            </div>
            <div v-else>
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'

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
    tableHight() {
      return this.$store.state.app.containHeight - 255
    },
    getTableDate() {
      return this.tableVisual ? this.tableData : this.tableData_
    }
  },
  data() {
    return {
      icon,
      loading: false,

      pageNo: 1,
      pageSize: 10,
      total: null,

      tableData: [],
      tableData_: [],
      tableVisual: true,

      updateId: null
    }
  },
  watch: {
    dailyDate: {
      handler(newValue, oldValue) {
        this.searchOption()
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    searchOption() {
      this.loading = true
      const param = {
        reachDate: this.dailyDate
      }
      baseRequest('/objective/rwDaily/getMonthlyTrack', param).then(response => {
        this.tableData = response.data.item
        this.loading = false

        if (this.tableData.length > 0) {
          this.tableData_ = [this.tableData[0]]
        }
      })
    },
    refresh() {
      this.searchOption()
    },
    // 达成目标
    reachRow(row) {
      const param = {
        trackGoalId: row.trackGoalId,
        reachState: '1',
        reachDate: this.dailyDate
      }
      this.$confirm('确定达成此事项么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwDaily/updateMonthlyTrackReach', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../font.scss";
    .achieved{
      font-family: PingFangSC-Regular;
      font-weight: normal;
      font-stretch: normal;
      line-height: 17px;
      letter-spacing: 0px;
      color: #04ae0f;
      text-align: right;
      padding-right:10px;
    }
</style>