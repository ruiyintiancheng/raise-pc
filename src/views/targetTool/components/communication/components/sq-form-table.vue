/** form里面的表格 */
<template>
<div>
<el-table class="table-main"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="empCont" label="授权/反馈的行动" />
    <el-table-column prop="startDate" label="追踪日期" width="170" align="center" />
    <el-table-column prop="targetDate" label="预计达成日期" width="170" align="center" />
    <el-table-column prop="reachDate" label="达成日期" width="150" align="center" />
    <el-table-column width="220" align="center">
      <template #header>
          <a v-if="isShow!==0" class="table-upload-title" @click="download"><svg-icon  icon-class="icon-xz" />下载</a>
          <a v-if="isShow!==2" class="table-header-title" @click="addRow"><svg-icon  icon-class="icon-add" />添加</a>
      </template>
      <template slot-scope="scope">
        <div v-if="scope.row.reachState === '1'" style="color: #04ae0f;">
          <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
        </div>
        <div v-else-if="!disable">
          <el-button @click.native.prevent="updateRow(scope.$index)" type="primary" plain size="mini">修改</el-button>
          <el-button v-if="!!scope.row.empContId" @click.native.prevent="reachRow(scope.$index)" type="primary" plain size="mini">达成</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index)" type="danger" plain size="mini">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <reach ref="reach" @reachCallBack="reachCallBack"></reach>
  <matterForm ref="matterForm" :view-date="viewDate" @save="saveRow"></matterForm>
</div>
</template>
<script>
import Reach from '../../Reach'
import matterForm from './sq-form-table-form'
import { downloadFile } from '@/utils/download'
export default {
  components: {
    Reach,
    matterForm
  },
  props: {
    viewDate: String,
    disable: Boolean,
    buttonState: Boolean,
    empId: Number,
    isShow: Number
  },
  data() {
    return {
      tableData: [],
      current: null,
      deleteIds: []
    }
  },
  computed: { },
  created() {},
  mounted() { },
  methods: {
    download() {
      this.downLoading = true
      downloadFile('/objective/rwEmpower/uploadDetails', { empId: this.empId })
        .finally(_ => {
          this.downLoading = false
        })
    },
    loadTable(table) {
      this.tableData = table || []
      this.current = null
      this.deleteIds = []
    },
    getData() {
      return {
        empConts: this.tableData,
        deleteIds: this.deleteIds
      }
    },
    checkSave() {
      return true
    },
    addRow() {
      this.$refs.matterForm.openDialog({
        row_index: null,
        status: 0,
        empContId: null,
        empCont: null,
        startDate: null,
        targetDate: null
      })
    },
    updateRow(row_index) {
      const action = this.tableData[row_index]
      this.$refs.matterForm.openDialog({
        row_index,
        status: 1,
        ...action
      })
    },
    saveRow(row) {
      if (row.status === 0) {
        this.tableData.push({
          empContId: null,
          empCont: row.empCont,
          startDate: row.startDate,
          targetDate: row.targetDate,
          reachDate: null,
          reachState: '0'
        })
      } else {
        const action = this.tableData[row.row_index]
        action.empCont = row.empCont
        action.startDate = row.startDate
        action.targetDate = row.targetDate
      }
    },
    // 达成目标
    reachRow(index) {
      this.current = index
      const action = this.tableData[index]
      this.$refs.reach.openDialog(action.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      this.tableData[this.current].reachDate = date
      this.tableData[this.current].reachState = '1'
    },
    deleteRow(index) {
      console.log(index)
      const row = this.tableData[index]
      if (row.empContId) {
        this.deleteIds.push(row.empContId)
      }
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>