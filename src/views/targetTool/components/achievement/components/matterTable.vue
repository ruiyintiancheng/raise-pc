/** 31日追踪表格 */
<template>
  <div>
    <div>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column prop="name" :label="label" show-overflow-tooltip>
          <template slot-scope="scope">
            <svg-icon :style="{color:icon(scope.row.sourceType).color,fontSize:'16px'}" :icon-class="icon(scope.row.sourceType).icon" />
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="达成日期" width="300" align="center"/>
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
import { icon } from '../../icon'

export default {
  components: {},
  props: {
    // 表名称
    label: {
      type: String,
      default: 'tableName'
    },
    tableData: {
      type: Array,
      default: null
    },
    loading: false
  },
  data() {
    return {
      icon
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 255
    }
  },
  watch: {},
  created() {
  },
  mounted() {

  },
  methods: {
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

    /deep/ .el-table.table-main {
        td, th {
          border-right: 0;
        }
    }
</style>