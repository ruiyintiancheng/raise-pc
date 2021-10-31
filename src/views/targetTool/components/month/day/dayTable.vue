/** 年度重要目标表格 */
<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="getTableDate"
        border
        style="width: 100%">
        <el-table-column show-overflow-tooltip>
          <template #header>
              <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
              <a class="alive-text" @click="updateHandle(scope.row)">{{scope.row.trackGoal}}</a>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" v-if="!disable">
          <template #header>
              <a class="table-header-title" v-if="tableData.length < 10" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
          </template>
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <sur-pagination v-if="total > pageSize" :pageNo="pageNo"
                      :total="total"
                      :pageSize="pageSize"
                      @size-change="handleSizeChange"  
                      @current-change="handleCurrentChange">
      </sur-pagination>
    </div>
    <target-form ref="form" :monthlyDate="monthlyDate" :goalType="goalType" @refresh="refresh"
      :label="label"
      :disable="disable" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import targetform from './day-form'

export default {
  components: {
    'target-form': targetform
  },
  props: {
    // 表名称
    label: {
      type: String,
      default: 'tableName'
    },
    // 月度时间
    monthlyDate: {
      type: [String],
      default: null
    },
    // 目标类型
    goalType: {
      type: [String, Number],
      default: null
    },
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
  created() {
    // baseRequest('/objective/rwMonthlyTrack/initMonthlyTrack', { monthlyDate: this.monthlyDate }).then(_ => {
    this.searchOption()
    // })
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
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        monthlyDate: this.monthlyDate,
        goalType: this.goalType
      }
      baseRequest('/objective/rwMonthlyTrack/selects', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false

        if (this.tableData.length > 0) {
          this.tableData_ = [this.tableData[0]]
        }
      })
    },
    refresh() {
      this.searchOption()
      this.$emit('refresh', this.contType)
    },
    addHandle() {
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
    },
    deleteRow(row) {
      const param = {
        trackGoalId: row.trackGoalId
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwMonthlyTrack/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
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
  @import "../month.css";
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