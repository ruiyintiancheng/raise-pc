/** form里面的表格 */
<template>
<div>
<el-table class="table-main"
    :data="tableData"
    :height="height"
    border
    style="width: 100%">
    <el-table-column prop="itemName" label="具体行动" />
    <el-table-column prop="startDate" label="追踪日期" width="170" align="center" />
    <el-table-column prop="itemDate" label="预计达成日期" width="170" align="center" />
    <el-table-column prop="reachDate" label="达成日期" width="150" align="center" />
    <el-table-column label="负责人" width="170" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.isSelf === '0'">{{scope.row.itemPrincipal}}</span>
        <span v-else>本人负责</span>
      </template>
    </el-table-column>
    <el-table-column width="220" align="center">
      <template #header> 
        <a style="float: right;margin-right: 12px;" v-if="isShouqi" @click="hiddenHeight"><svg-icon  icon-class="icon-shouqi" /> </a>
        <a style="float: right;margin-right: 12px;" v-else @click="showHeight"><svg-icon  icon-class="icon-zhankai" /></a>
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
  <reach ref="reach" @reachCallBack="reachCallBack"></reach>
  <matterForm ref="matterForm" :view-date="viewDate" @save="saveRow"></matterForm>
</div>
</template>
<script>
import Reach from '../../Reach'
import { downloadFile } from '@/utils/download'
import matterForm from './hy-form-table-form'
export default {
  components: {
    Reach,
    matterForm
  },
  props: {
    viewDate: String,
    disable: Boolean,
    btnStatus: Boolean,
    tableId: Number,
    isShow: Number
  },
  data() {
    return {
      height: '',
      isShouqi: true,
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
      downloadFile('/objective/rwConference/uploadDetails', { id: this.tableId })
        .finally(_ => {
          this.downLoading = false
        })
    },
    hiddenHeight() {
      this.isShouqi = false
      this.height = '54px'
    },
    showHeight() {
      this.height = ''
      this.isShouqi = true
    },
    loadTable(table) {
      this.tableData = table || []
      this.current = null
      this.deleteIds = []
    },
    getData() {
      return {
        items: this.tableData,
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
        id: null,
        itemName: null,
        isSelf: '1',
        itemPrincipal: null,
        startDate: null,
        itemDate: null
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
          id: null,
          itemName: row.itemName,
          isSelf: row.isSelf,
          itemPrincipal: row.itemPrincipal,
          startDate: row.startDate,
          itemDate: row.itemDate,
          reachDate: null,
          reachState: '0'
        })
      } else {
        const action = this.tableData[row.row_index]
        action.itemName = row.itemName
        action.isSelf = row.isSelf
        action.itemPrincipal = row.itemPrincipal
        action.startDate = row.startDate
        action.itemDate = row.itemDate
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
        if (row.id) {
          this.deleteIds.push(row.id)
        }
        this.tableData.splice(index, 1)
      })
      this.$Message({
        type: 'success',
        message: '操作成功!'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>