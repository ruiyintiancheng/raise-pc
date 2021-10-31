/** 月首要目标 */
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
              <svg-icon :style="{color: icon(scope.row.sourceType).color ,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" /> 
              <svg-icon v-if="scope.row.isFirst === '1'|| scope.row.stopState==='1'" icon-class="icon-star" /> 
              {{scope.row.monCont}}
          </template>
        </el-table-column>
        <el-table-column prop="fieldName" label="领域" width="180" align="center"></el-table-column>
        <el-table-column prop="reachState" label="达成状态" width="180" align="center">
          <template slot-scope="scope">
            {{scope.row.reachState === '1'?'已达成':'未达成'}}
          </template>
        </el-table-column>
        <el-table-column prop="reachDate" label="达成日期" width="180" align="center"></el-table-column>
        <el-table-column align="center" width="180" v-if="!disable">
          <template slot-scope="scope">
            <!-- <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button> -->
            <template >
              <el-button v-if="scope.row.isFirst === '1'" class="bg-blue"  size="mini" plain @click.native.prevent="reachRow(scope.row)">取消首要</el-button>
              <el-button v-else type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">设为首要</el-button>
            </template>
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
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'

export default {
  components: { },
  props: {
    // 查看日期
    viewMonth: String,
    // 领域名称
    label: {
      type: String,
      default: 'tableName'
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
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwMonthlyCont/selectFirstGoal', param).then(response => {
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
    },
    deleteRow(row) {
      const param = {
        monContId: row.monContId,
        contType: row.contType,
        sourceType: row.sourceType
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwMonthlyCont/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.$emit('refresh', 'first', row.fieldCode)
            this.searchOption()
          })
      })
    },
    // 设为首要
    reachRow(row) {
      const param = {
        monContId: row.monContId
      }

      if (row.isFirst === '0') {
        param.isFirst = '1'
      }
      if (row.isFirst === '1') {
        param.isFirst = '0'
      }
      baseRequest('/objective/rwMonthlyCont/switchState', param).then(response => {
        this.$Message.success('操作成功')
        this.$emit('refresh', 'first', row.fieldCode)
        this.searchOption()
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