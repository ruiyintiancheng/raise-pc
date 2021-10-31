/** form里面的表格 */
<template>
<div>
<el-table class="table-main"
    :data="tableData"
    :height="height"
    border
    style="width: 100%">
    <el-table-column prop="scheduleTime" label="会议时间" width="220">
      <template slot-scope="scope" >
        <div class="tableDiv">
          <span style="width:100px">{{scope.row.scheduleTime}}</span>
          <span style="width:40px"><span v-if="scope.row.startDate">{{scope.row.startDate}}</span></span>
          <span style="width:5px;margin:0 5px"><span v-if="scope.row.startDate&&scope.row.endDate">-</span></span>
          <span style="width:40px"><span v-if="scope.row.endDate">{{scope.row.endDate}}</span></span>
        </div>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="startDate" label="开始时间" width="170" align="center" />
    <el-table-column prop="endDate" label="结束时间" width="170" align="center" /> -->
    <el-table-column prop="scheduleContent" label="议题" align="center" />
    <el-table-column label="主讲/主持人" width="170" align="center">
      <template slot-scope="scope">
        <span>{{scope.row.scheduleUser}}</span>
      </template>
    </el-table-column>
    <el-table-column width="220" align="center">
      <template #header>
        <div>
            <a style="float: right;margin-right: 12px;" v-if="isShouqi" @click="hiddenHeight"><svg-icon  icon-class="icon-shouqi" /> </a>
            <a style="float: right;margin-right: 12px;" v-else @click="showHeight"><svg-icon  icon-class="icon-zhankai" /></a>
        </div>
          <a v-if="isShow!==0" class="table-upload-title" @click="download"><svg-icon  icon-class="icon-xz" />下载</a>
          <a v-if="isShow!==2" class="table-header-title" @click="addRow"><svg-icon  icon-class="icon-add" />添加</a>
      </template>
      <template slot-scope="scope">
        <div v-if="scope.row.reachState === '1'" style="color: #04ae0f;">
          <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
        </div>
        <div v-else>
          <el-button @click.native.prevent="updateRow(scope.$index)" type="primary" plain size="mini">修改</el-button>
          <el-button v-if="!!scope.row.id" @click.native.prevent="reachRow(scope.$index)" type="primary" plain size="mini">达成</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index)" type="danger" plain size="mini">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <arrangeForm ref="arrangeForm" :view-date="viewDate" @save="saveRow"></arrangeForm>
  <!-- <matterForm ref="matterForm" :view-date="viewDate" @save="saveRow"></matterForm> -->
</div>
</template>
<script>
// import Reach from '../../Reach'
import arrangeForm from './hy-form-schedule-form'
import { downloadFile } from '@/utils/download'
export default {
  components: {
    arrangeForm
  },
  props: {
    viewDate: String,
    disable: Boolean,
    tableId: Number,
    isShow: Number
  },
  data() {
    return {
      height: '',
      isShouqi: true,
      tableData: [],
      current: null,
      scheduleId: []
    }
  },
  filters: {
  },
  computed: { },
  created() {},
  mounted() { },
  methods: {
    download() {
      this.downLoading = true
      downloadFile('/objective/rwConference/uploadSchedule', { id: this.tableId })
        .finally(_ => {
          this.downLoading = false
        })
    },
    hiddenHeight() {
      this.isShouqi = false
      this.height = '53px'
    },
    showHeight() {
      this.height = ''
      this.isShouqi = true
    },
    loadTable(table) {
      this.tableData = table || []
      this.current = null
      this.scheduleId = []
    },
    getData() {
      return {
        list: this.tableData,
        scheduleId: this.scheduleId
      }
    },
    checkSave() {
      return true
    },
    addRow() {
      this.$refs.arrangeForm.openDialog({
        row_index: null,
        status: 0,
        ischeduleId: null,
        scheduleTime: null,
        scheduleContent: null,
        scheduleUser: null
      })
    },
    updateRow(row_index) {
      const action = this.tableData[row_index]
      this.$refs.arrangeForm.openDialog({
        row_index,
        status: 1,
        ...action
      })
    },
    saveRow(row) {
      if (row.status === 0) {
        this.tableData.push({
          scheduleId: null,
          scheduleTime: row.scheduleTime,
          scheduleContent: row.scheduleContent,
          scheduleUser: row.scheduleUser ? row.scheduleUser : '',
          startDate: row.startDate ? row.startDate : '',
          endDate: row.endDate ? row.endDate : ''
        })
      } else {
        const action = this.tableData[row.row_index]
        action.scheduleTime = row.scheduleTime
        action.scheduleContent = row.scheduleContent
        action.scheduleUser = row.scheduleUser ? row.scheduleUser : ''
        action.startDate = row.startDate ? row.startDate : ''
        action.endDate = row.endDate ? row.endDate : ''
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
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const row = this.tableData[index]
        if (row.scheduleId) {
          this.scheduleId.push(row.scheduleId)
        }
        this.tableData.splice(index, 1)
        this.$Message({
          type: 'success',
          message: '操作成功!'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tableDiv{
    display: flex;
    span{
      display: block;
      text-align: center;
    }
  }
</style>