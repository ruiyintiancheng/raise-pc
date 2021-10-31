/** 事项计划表表格 */
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
              <svg-icon :style="{color: icon(scope.row.sourceType).color ,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" /> 
              <svg-icon v-if="scope.row.isFirst === '1'" icon-class="icon-star" /> 
              <span v-if="scope.row.reachState === '1' || scope.row.stopState==='1'">{{scope.row.weeklyMatter}}</span>
              <a v-else class="alive-text" :class="{red: compareDate(scope.row)}" @click="updateHandle(scope.row)">{{scope.row.weeklyMatter}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="startDate" label="追踪日期" align="center" width="180"></el-table-column>
        <el-table-column prop="endDate" label="预计达成日期" align="center" width="180"></el-table-column>
        <el-table-column prop="reachDate" label="达成/终止日期" align="center" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.reachDate">{{scope.row.reachDate}}</span>
            <span class="danger-cl" v-else-if="scope.row.stopDate">{{scope.row.stopDate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="330">
          <template #header >
              <a v-if="!disable" class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
              <span v-else>达成状态</span>
          </template>
          <template slot-scope="scope">
            <div class="achieved" v-if="scope.row.reachState === '1'">
              <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
            </div>
          <div class="achieved danger-cl" v-else-if="scope.row.stopState === '1'">
             <svg-icon :style="{fontSize:'18px'}" icon-class="stop" /> 已终止
          </div>
            <div v-else-if="disable" class="achieved" style="color: gray; text-align: center;">
              <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 未达成
            </div>
            <div v-else>
              <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
              <el-button 
                @click.native.prevent="stopRow(scope.row)"
                type="danger"
                size="mini">
                终止
            </el-button>
              <el-button type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">达成</el-button>
              <el-button type="primary" size="mini" @click.native.prevent="stateRow(scope.row)">{{weeklyType === '0' ? '转为重要' : '转为紧要'}}</el-button>
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
    <target-form ref="form" :label="formLabel" :weeklyType="weeklyType" 
      :weekDate="startWeek"
      :startWeek="startWeek"
      :endWeek="endWeek"
      :disable="disable"
      @refresh="refresh" />
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
    label: {
      type: String,
      default: ''
    },
    startWeek: {
      type: String,
      default: null
    },
    endWeek: {
      type: String,
      default: null
    },
    weeklyType: {
      type: String,
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
        weeklyType: this.weeklyType,
        weekStartDate: this.startWeek,
        weekEndDate: this.endWeek,

        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwWeekly/selects', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.pageNo = response.data.pageNo
        this.loading = false

        if (this.tableData.length > 0) {
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
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          weeklyId: row.weeklyId,
          sourceType: row.sourceType
        }
        baseRequest('/objective/rwWeekly/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.searchOption()
          })
      })
    },
    stopRow(row) {
      this.$confirm('确定终止该事项吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwWeekly/stopWeekCont', { weeklyId: row.weeklyId }).then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
      })
    },
    // 达成目标
    reachRow(row) {
      this.updateId = row.weeklyId
      this.$refs.reach.openDialog(row.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      const param = {
        weeklyId: this.updateId,
        reachDate: date
      }
      baseRequest('/objective/rwWeekly/reach', param)
        .then(response => {
          this.$Message.success('操作成功')
          this.searchOption()
        })
    },
    // 转为重要 紧要
    stateRow(row) {
      const param = {
        weeklyId: row.weeklyId
      }
      if (this.weeklyType === '0') {
        param.weeklyType = '1'
      }
      if (this.weeklyType === '1') {
        param.weeklyType = '0'
      }
      baseRequest('/objective/rwWeekly/switchState', param).then(response => {
        this.$Message.success('操作成功')
        this.searchOption()
        this.$emit('refresh', this.weeklyType)
      })
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    },
    compareDate(row) {
      if (this.weeklyType === '0' && row.endDate && row.endDate !== '') {
        const nowTime = new Date().getTime()
        const time = new Date(row.endDate).getTime()
        const day = 1 * 24 * 3600 * 1000
        // const time = new Date(row.endDate + ' 23:59:59').getTime()
        // const day = 2 * 24 * 3600 * 1000 - 1000
        // 1天以内
        return nowTime >= time - day && nowTime <= time
      }
      return false
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
    .alive-text.red {
      color:red
    }
    .danger-cl{
      color: #F56C6C;
    }
</style>