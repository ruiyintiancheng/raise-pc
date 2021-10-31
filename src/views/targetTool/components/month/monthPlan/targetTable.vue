/** 月计划->月个人焦点目标/月公司焦点目标 */
<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="getTableDate"
        row-key="monContId"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        style="width: 100%">
        <el-table-column show-overflow-tooltip>
          <template #header>
              <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
              <svg-icon v-if="icon(scope.row.sourceType)" :style="{color: icon(scope.row.sourceType).color ,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" /> 
              <svg-icon v-if="scope.row.isFirst === '1'" icon-class="icon-star" />
              <span v-if="scope.row.reachState === '1'|| scope.row.stopState==='1'">{{scope.row.monCont}}</span>
              <a v-else class="alive-text" @click="updateHandle(scope.row)">{{scope.row.monCont}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="reachDate" label="达成/终止日期" align="center" width="180" >
            <template slot-scope="scope">
              <span v-if="scope.row.reachDate">{{scope.row.reachDate}}</span>
              <span class="danger-cl" v-else-if="scope.row.stopDate">{{scope.row.stopDate}}</span>
            </template>
        </el-table-column>
        <el-table-column width="330" v-if="!disable" align="center">
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
              <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
              <el-button type="danger" size="mini" @click.native.prevent="stopRow(scope.row)">终止</el-button>
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
              <el-button v-if="scope.row.isFirst === '1'" class="bg-blue"  size="mini" plain @click.native.prevent="transfer(scope.row)">取消首要</el-button>
              <el-button v-else type="primary" size="mini" @click.native.prevent="transfer(scope.row)">转为首要</el-button>
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
    </div>
    <target-form ref="form" :monthlyId="monthlyId" 
        :label="formLabel"
        :contType="contType" :fieldCode="fieldCode"
        :disable="disable"
        :view-date="viewMonth"
        @refresh="refresh">
    </target-form>
    <reach ref="reach" @reachCallBack="reachCallBack"></reach>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'
import targetform from './target-form'
import Reach from '../../Reach'

export default {
  components: {
    'target-form': targetform,
    Reach
  },
  props: {
    formLabel: String,
    // 查看日期
    viewMonth: String,
    // 月度id
    monthlyId: {
      type: [String, Number],
      default: null
    },
    // 内容类型
    contType: {
      type: [String, Number],
      default: null
    },
    // 领域码值
    fieldCode: {
      type: [String, Number],
      default: null
    },
    // 领域名称
    label: {
      type: String,
      default: ''
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
  mounted() {

  },
  methods: {
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        viewDate: this.viewMonth,
        contType: this.contType,
        fieldCode: this.fieldCode,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwMonthlyCont/selectGoal', param).then(response => {
        this.tableData = response.data.item || []
        this.total = response.data.total || 0
        this.loading = false

        if (this.tableData && this.tableData.length > 0) {
          this.tableData_ = [this.tableData[0]]
        }
      })
    },
    refresh() {
      this.searchOption()
      this.$emit('refresh', '1')
    },
    addHandle() {
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          monContId: row.monContId,
          contType: row.contType,
          sourceType: row.sourceType
        }
        baseRequest('/objective/rwMonthlyCont/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
      })
    },
    stopRow(row) {
      this.$confirm('确定终止该目标吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          monContId: row.monContId
        }
        baseRequest('/objective/rwMonthlyCont/stopMonthlyPlan', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
      })
    },
    // 达成目标
    reachRow(row) {
      this.updateId = row.monContId
      this.$refs.reach.openDialog(row.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      const param = {
        monContId: this.updateId,
        contType: this.contType,
        reachDate: date
      }
      baseRequest('/objective/rwMonthlyCont/reach', param)
        .then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
    },
    // 转为首要
    transfer(row) {
      const isFirst = row.isFirst === '0' ? '1' : '0'
      const param = {
        monContId: row.monContId,
        isFirst
      }
      baseRequest('/objective/rwMonthlyCont/switchState', param).then(response => {
        this.$Message.success('操作成功')
        this.refresh()
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
    .danger-cl{
      color: #F56C6C;
    }
</style>