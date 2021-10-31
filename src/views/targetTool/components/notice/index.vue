/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-07-24 14:27:59 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-02-09 15:40:06
 * @帮助续费
 */
<template>
    <div class="notice">
        <div class="notice-title">
          备忘录
          <div class="jump-project">
            内容:&nbsp;&nbsp;<el-input style="width:155px;margin-right:10px;" clearable v-model="content"></el-input>
            &nbsp;&nbsp;主题:&nbsp;&nbsp;<el-input style="width:155px;margin-right:10px;" clearable v-model="topicName"></el-input>
            行程日期:&nbsp;&nbsp;
            <el-date-picker 
              v-model="startTime"
                style="margin-right:0px;width: 213px;"
                class="learn-input"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder="请选择行程日期"
                :picker-options="pickerOptionsStart">
            </el-date-picker>
              <!-- <span>至</span>
              <span class="inpt-title  form-label"></span>
            <el-date-picker v-model="endTime"
                  style="width: 213px;"
                  class="learn-input"
                  type="date"
                  value-format='yyyy-MM-dd'
                  placeholder="请选择结束日期"
                  :picker-options="pickerOptionsEnd"
                  >
              </el-date-picker>  -->
            <el-button type="primary" @click="searchOption()">查询</el-button>
          </div>
        </div>
        <div style="width:100%;padding:0 24px;">
          <el-table
              v-loading="loading"
              :height="tableHeight+'px'"
              class="table-main"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column prop="content" label="内容"></el-table-column>
              <el-table-column prop="topicName" width="180" label="主题"></el-table-column>
              <el-table-column prop="tripTime" label="行程日期" width="180" align="center"></el-table-column>
              <el-table-column width="170" align="center">
                <template #header>
                  <a  class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" />添加</a>
                </template>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="updateHandle(scope.row)" type="primary" plain size="mini">修改</el-button>
                  <el-button @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <sur-pagination :pageNo="pageNo"
              :total="total"
              :pageSize="pageSize"
              @size-change="handleSizeChange"  
              @current-change="handleCurrentChange">
            </sur-pagination>
        </div>
        <el-dialog
          :title="this.updateStatus === '0'?'添加':'修改'"
          v-loading="loading"
          :visible.sync="updateVisible"
          class="dialog-main heightauto"
          top="10%"
          width="400px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <notice-update ref="noticeUpdate" v-if="updateVisible" :updateStatus="updateStatus" :currentRow="currentRow"></notice-update>
          <span slot="footer">
            <el-button  @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveHandle()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
import { baseRequest, baseSearch } from '@/api/base'
import noticeUpdate from './components/noticeUpdate'
export default {
  data() {
    return {
      loading: false,
      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: null,
      // 0add 1update
      startTime: '',
      endTime: '',
      topicName: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.endTime !== '') {
            let date = this.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.startTime !== '') {
            let date = this.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      updateStatus: '0',
      updateVisible: false,
      content: '',
      currentRow: {}
    }
  },
  components: {
    noticeUpdate
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.containHeight - 290
    }
  },
  created() {
    this.searchOption()
  },
  methods: {
    addHandle() {
      this.updateStatus = '0'
      this.currentRow = {}
      this.updateVisible = true
    },
    updateHandle(row) {
      this.updateStatus = '1'
      this.currentRow = row
      this.updateVisible = true
    },
    // 点击删除
    deleteRow(row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwNotepad/delete', { id: row.id }).then(_ => {
          this.updateVisible = false
          this.searchOption()
        })
      })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        topicName: this.topicName,
        tripTime: this.startTime,
        endTime: this.endTime,
        content: this.content,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseSearch('/objective/rwNotepad/selects', param).then(response => {
        const { item, total } = response.data
        this.tableData = item
        this.total = total
        this.loading = false
      })
    },
    saveHandle() {
      this.$refs.noticeUpdate.$refs.updateForm.validate((valid) => {
        if (valid) {
          let url = '/objective/rwNotepad/addNotepad'
          const params = this.$refs.noticeUpdate.formData
          if (this.updateStatus === '1') {
            url = '/objective/rwNotepad/update'
          }
          baseRequest(url, params).then(_ => {
            this.updateVisible = false
            this.searchOption()
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
<style lang="scss">
.notice{
    position: relative;
    // padding: 0 24px 24px;
    .notice-title{
      height: 66px;
      // width:calc(100% + 24px);
      width:100%;
      line-height: 66px;
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      font-weight: bold;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      border-bottom: 1px solid #cccccc;
      margin-bottom: 28px;
      position: relative;
      padding-left: 24px;
      padding-right: 24px;
      .jump-project{
         top: 0;
        position: absolute;
        right: 24px;
        font-size: 15px;
        font-weight: normal;
        color: #222222;
      }
    }
}
</style>