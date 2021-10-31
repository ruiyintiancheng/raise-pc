/** form里面的表格 */
<template>
  <div>
    <div v-if="!inputState" style="direction: rtl;"><el-button type="primary" size="small" @click="addItem">添加事项</el-button></div>
    <div class="item" v-for="(item,i) in items" :key="item.id">
      <table class="my-table">
        <tr class="my-table-head">
          <th><span>沟通事项</span></th>
          <th>
            <span>相关人</span>
            <a v-if="!inputState" @click="deleteItem(i)" style="float: right;margin-right: 22px;color: #F56C6C;"><svg-icon  icon-class="icon-remove" />删除</a>
          </th>
        </tr>
        <tr class="my-table-row">
          <td>
            <el-input
              v-model="item.discussItem" 
              type="textarea" 
              :disabled="inputState"
              placeholder="请填写内容" :rows="4"  show-word-limit maxlength="200">
            </el-input>
          </td>
          <td>
            <el-input
              v-model="item.discussPerson" 
              :disabled="inputState"
              placeholder="请填写相关人" style="width: 250px;" />
          </td>
        </tr>
      </table>
      <el-table class="table-main"
        :data="item.actions"
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
              <el-button @click.native.prevent="updateRow(i, scope.$index)" type="primary" plain size="mini">修改</el-button>
              <el-button v-if="!!scope.row.id" @click.native.prevent="reachRow(i, scope.$index)" type="primary" plain size="mini">达成</el-button>
              <el-button @click.native.prevent="deleteRow(i, scope.$index)" type="danger" plain size="mini">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    discussType: String,
    inputState: Boolean
  },
  data() {
    return {
      items: [
        {
          id: null,
          discussItem: null,
          discussPerson: null,
          actions: []
        }
      ],
      deleteItemIds: [],
      deleteActionIds: [],
      current: null,
      currentRow: null
    }
  },
  computed: { },
  created() {},
  mounted() { },
  methods: {
    // 下载
    downloadBtn(i) {
      console.log(i)
      const param = {
        itemsId: this.items[i].id,
        discussType: this.discussType
      }
      downloadFile('/objective/rwDiscussPlan/uploadDetails', param)
        .finally(_ => {
          this.downLoading = false
        })
    },
    loadTable(table) {
      this.items = table || []
      this.current = null
      this.deleteActionIds = []
      this.deleteItemIds = []
    },
    getData() {
      return {
        items: this.items,
        deleteActionIds: this.deleteActionIds,
        deleteItemIds: this.deleteItemIds
      }
    },
    checkSave() {
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        if (item.discussItem === null && item.discussPerson === null &&
          item.actions.length === 0) {
          this.$Message.warning('请填写事项')
          return false
        }
      }
      return true
    },
    addItem() {
      const check = this.checkSave()
      if (!check) {
        return
      }

      this.items.unshift({
        id: null,
        discussItem: null,
        discussPerson: null,
        actions: []
      })
    },
    deleteItem(item_index) {
      this.items[item_index].actions.forEach(row => {
        if (row.id) {
          this.deleteActionIds.push(row.id)
        }
      })
      if (this.items[item_index].id) {
        this.deleteItemIds.push(this.items[item_index].id)
      }

      this.items.splice(item_index, 1)
    },
    addRow(item_index) {
      this.$refs.matterForm.openDialog({
        item_index,
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
    updateRow(item_index, row_index) {
      const action = this.items[item_index].actions[row_index]
      this.$refs.matterForm.openDialog({
        item_index,
        row_index,
        status: 1,
        ...action
      })
    },
    saveRow(row) {
      const actions = this.items[row.item_index].actions
      if (row.status === 0) {
        actions.push({
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
        const action = actions[row.row_index]
        action.actionName = row.actionName
        action.isSelf = row.isSelf
        action.principal = row.principal
        action.startDate = row.startDate
        action.predictReachDate = row.predictReachDate
      }
    },
    // 达成目标
    reachRow(item_index, index) {
      this.current = item_index
      this.currentRow = index
      const action = this.items[item_index].actions[index]
      this.$refs.reach.openDialog(action.startDate)
    },
    /**
     * 达成
     */
    reachCallBack(date) {
      this.items[this.current].actions[this.currentRow].reachDate = date
      this.items[this.current].actions[this.currentRow].reachState = '1'
    },
    deleteRow(item_index, index) {
      const row = this.items[item_index].actions[index]
      if (row.id) {
        this.deleteActionIds.push(row.id)
      }
      this.items[item_index].actions.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    border: 1px solid #cccccc;
    padding: 10px;
    margin-bottom: 20px;
  }

  .my-table {
    width: 100%;
    font-size: 14px;
    .my-table-head {
      background-color: #fafafa;
      color: #222222;
      height: 52px;
      text-align: left;
      font-weight: 400;
      th {
        padding-left: 20px;
        font-weight: 400;
      }
    }
    .my-table-row {
      height: 100px;
      vertical-align: top;
      td {
        padding: 20px;
      }
    }
  }
</style>