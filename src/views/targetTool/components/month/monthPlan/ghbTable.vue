/** 高回报活动事项 */
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
        <el-table-column>
          <template #header>
              <a @click="tableVisual = !tableVisual">{{label}} <svg-icon :icon-class="tableVisual ? 'icon-zhetie' : 'icon-zhetie-activity'" /></a>
          </template>
          <template slot-scope="scope">
              <a class="alive-text" @click="updateHandle(scope.row)">{{scope.row.monCont}}</a>
          </template>
        </el-table-column>
        <el-table-column width="180" v-if="!disable">
          <template slot="header">
            <a class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" /> 添加</a>
          </template>
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
            <el-button v-if="scope.row.contOrder === 1" disabled type="info" size="mini">上移</el-button>
            <el-button v-else type="primary" size="mini" @click.native.prevent="reachRow(scope.row)">上移</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <target-form ref="form" :monthlyId="monthlyId" 
      label="高回报活动事项"
      :content="label"
      :contType="contType" :fieldCode="fieldCode"
      :view-date="viewMonth"
      :disable="disable"
      @refresh="refresh">
    </target-form>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { icon } from '../../icon'
import targetform from './target-form'

export default {
  components: {
    'target-form': targetform
  },
  props: {
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

      tableData: [],
      tableData_: [],
      tableVisual: true
    }
  },
  created() {
    this.searchOption()
  },
  mounted() {

  },
  methods: {
    searchOption() {
      this.loading = true
      const param = {
        viewDate: this.viewMonth
      }
      baseRequest('/objective/rwMonthlyCont/selectPayBack', param).then(response => {
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
    addHandle() {
      if (this.tableData.length >= 8) {
        this.$Message.warning('最多填写8条数据')
        return
      }
      this.$refs.form.openDialog()
    },
    updateHandle(row) {
      this.$refs.form.openDialog(row)
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
            this.searchOption()
          })
      })
    },
    // 上移
    reachRow(row) {
      const param = {
        monContId: row.monContId,
        monthlyId: row.monthlyId,
        newOrder: row.contOrder - 1,
        oldOrder: row.contOrder
      }
      baseRequest('/objective/rwMonthlyCont/orderValue', param).then(response => {
        this.$Message.success('操作成功')
        this.searchOption()
      })
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