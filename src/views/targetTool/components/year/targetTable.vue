/** 年度重要目标表格 */
<template>
  <div>
    <el-table
      v-loading="loading"
      class="table-main"
      :data="getTableDate"
      row-key="annualId"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      style="width: 100%">
      <el-table-column prop="goal" :label="label" show-overflow-tooltip>
        <template #header>
          <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
        </template>
        <template slot-scope="scope">
            <svg-icon v-if="scope.row.sourceType !== ''" :style="{color: icon(scope.row.sourceType).color ,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" /> 
            <span v-if="scope.row.reachState === '1'|| scope.row.stopState==='1'">{{scope.row.annualGoal}}</span>
            <a v-else class="alive-text" @click="updateHandle(scope.row)">{{scope.row.annualGoal}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="开始日期" align="center" width="180"></el-table-column>
      <el-table-column prop="endDate" label="预计达成日期" align="center" width="180"></el-table-column>
      <el-table-column prop="reachDate" label="达成/终止日期" align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.reachDate">{{scope.row.reachDate}}</span>
            <span class="danger-cl" v-else-if="scope.row.stopDate">{{scope.row.stopDate}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" width="330" v-if="!disable">
        <template slot="header">
            <a class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
        </template>
        <template slot-scope="scope">
          <div class="achieved" v-if="scope.row.reachState === '1'">
            <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已达成
          </div>
          <div class="achieved danger-cl" v-else-if="scope.row.stopState === '1'">
             <svg-icon :style="{fontSize:'18px'}" icon-class="stop" /> 已终止
          </div>
          <div v-else>
            <el-button :disabled="scope.row.planId ? true : false" @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
            <el-button 
                @click.native.prevent="stopRow(scope.row)"
                type="danger"
                size="mini">
                终止
            </el-button>
            <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
            <el-button :type="scope.row.planId?'success':'primary'" size="mini" @click="setPlan(scope.row)">制定规划</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="达成状态" width="260" v-if="disable">
        <template slot-scope="scope">
          <div class="achieved" v-if="scope.row.reachState === '1'">
            <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已达成
          </div>
          <div class="achieved" v-else style="color: gray; text-align: center;">
            <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 未达成
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
    <target-form ref="form" @refresh="refresh" :id="id" :viewYear="viewYear" :disable="disable" />
    <reach ref="reach" @reachCallBack="reachCallBack" />
     <plan ref="plan" @planCallback="planCallback"></plan>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../icon'
import targetForm from './target-form'
import Reach from '../Reach'
import plan from '../Plan'

export default {
  components: {
    targetForm,
    Reach,
    plan
  },
  props: {
    id: [String, Number],
    label: String,
    viewYear: [String, Number],
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
  created() {
    this.searchOption()
  },
  mounted() { },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        viewYear: this.viewYear,
        annualField: this.id,
        time: new Date().getTime(),
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwAnnual/selects', param).then(response => {
        this.tableData = response.data.item || []
        this.total = response.data.total
        this.loading = false

        if (this.tableData && this.tableData.length > 0) {
          this.tableData_ = [this.tableData[0]]
        }
      })
    },
    refresh() {
      this.searchOption()
    },
    addHandle() {
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
    },
    setPlan(row) {
      this.$refs.plan.updateHandle({
        paramIds: {
          sourceId: row.sourceId,
          annualId: row.annualId,
          viewDate: this.viewYear,
          sourceType: row.sourceType,
          planId: row.planId
        },
        year: this.viewYear,
        planId: row.planId,
        selectUrl: '/objective/rwAnnual/makePlan',
        updateUrl: '/objective/rwGoalPlan/update'
      })
      // this.$emit('setPlan', row)
    },
    planCallback() {
      this.searchOption()
    },
    deleteRow(row) {
      const param = {
        annualId: row.annualId,
        sourceId: row.sourceId,
        sourceType: row.sourceType
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwAnnual/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    },
    stopRow(row) {
      this.$confirm('确定终止该目标吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwAnnual/stopAnnual', { annualId: row.annualId }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    // 达成目标
    reachRow(row) {
      row.reachState = '0'
      this.updateId = row.annualId
      this.$refs.reach.openDialog(row.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      baseRequest('/objective/rwAnnual/reach', { annualId: this.updateId, reachDate: date })
        .then(response => {
          this.$Message.success('操作成功')
          this.searchOption(true)
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
    .danger-cl{
      color: #F56C6C;
    }
</style>