/** form里面的表格 */
<template>
<div>
<el-table class="table-main"
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column prop="actionName" label="具体行动" />
    <el-table-column prop="startDate" label="追踪日期" width="170" align="center" />
    <el-table-column prop="predictReachDate" label="预计达成日期" width="170" align="center" />
    <el-table-column prop="reachDate" label="达成日期" width="150" align="center" />
    <el-table-column label="负责人" width="170" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.isSelf === '0'">{{scope.row.principal}}</span>
        <span v-else>本人负责</span>
      </template>
    </el-table-column>
    <el-table-column width="220" align="center">
      <template #header>
          <a v-if="isShow!==0" class="table-upload-title" @click="downloadBtn(i)"><svg-icon  icon-class="icon-xz" />下载</a>
              <a v-if="isShow===0 ||isShow===1" class="table-header-title" @click="addRow(i)"><svg-icon  icon-class="icon-add" />添加</a>
      </template>
      <template slot-scope="scope">
        <div v-if="scope.row.reachState === '1'" style="color: #04ae0f;">
          <svg-icon style="fontSize: 16px" icon-class="icon-flag" /> 已达成
        </div>
        <div v-else-if="!disable">
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
import matterForm from './tl-form-table-form'
export default {
  components: {
    Reach,
    matterForm
  },
  props: {
    viewDate: String,
    disable: Boolean,
    buttonState: Boolean,
    isShow: Number,
    discussType: String
  },
  data() {
    return {
      tableData: [],
      current: null,
      deleteActionIds: []
    }
  },
  computed: { },
  created() {},
  mounted() { },
  methods: {
    // 下载
    downloadBtn() {
      const param = {
        itemsId: this.tableData[0].planId,
        discussType: this.discussType
      }
      downloadFile('/objective/rwDiscussPlan/uploadDetails', param)
        .finally(_ => {
          this.downLoading = false
        })
    },
    loadTable(table) {
      this.tableData = table || []
      this.current = null
      this.deleteActionIds = []
    },
    getData() {
      return {
        actions: this.tableData,
        deleteActionIds: this.deleteActionIds
      }
    },
    checkSave() {
      return true
    },
    // addRow() {
    //   const check = this.checkSave()
    //   if (!check) {
    //     return
    //   }

    //   this.tableData.push({
    //     id: null,
    //     actionName: null,
    //     principal: null,
    //     predictReachDate: null,
    //     isUpdate: true,
    //     isSelf: '1'
    //   })
    // },
    // handleChange(value, row) {
    //   if (value === '1') {
    //     row.principal = null
    //   }
    // },
    // updateRow(index) {
    //   const action = this.tableData[index]
    //   if (action.isUpdate && !action.actionName) {
    //     this.$Message.warning('请填写行动内容')
    //     return
    //   }
    //   this.$set(action, 'isUpdate', !action.isUpdate)
    // },
    // deleteRow(index) {
    //   const row = this.tableData[index]
    //   if (row.id) {
    //     this.deleteActionIds.push(row.id)
    //   }
    //   this.tableData.splice(index, 1)
    // },
    addRow() {
      console.log('执行')
      this.$refs.matterForm.openDialog({
        row_index: null,
        status: 0,
        id: null,
        actionName: null,
        isSelf: '1',
        principal: null,
        startDate: null,
        predictReachDate: null
      })
    },
    updateRow(row_index) {
      console.log('执行')
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
          actionName: row.actionName,
          isSelf: row.isSelf,
          principal: row.principal,
          startDate: row.startDate,
          predictReachDate: row.predictReachDate,
          reachDate: null,
          reachState: '0'
        })
      } else {
        const action = this.tableData[row.row_index]
        action.actionName = row.actionName
        action.isSelf = row.isSelf
        action.principal = row.principal
        action.startDate = row.startDate
        action.predictReachDate = row.predictReachDate
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
      const row = this.tableData[index]
      if (row.id) {
        this.deleteActionIds.push(row.id)
      }
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

