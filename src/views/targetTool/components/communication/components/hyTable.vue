/** 会议计划表格 */
<template>
  <div>
    <el-table
      v-loading="loading"
      class="table-main"
      :data="tableData"
      border
      :height="tableHight"
      style="width: 100%">
      <el-table-column prop="conferenceName" label="会议名称" show-overflow-tooltip/>
      <el-table-column prop="conferenceTime" label="会议时间" align="center" width="250" />
      <el-table-column prop="finishDate" label="结束时间" align="center" width="250" />
      <el-table-column width="250" align="center">
        <template #header>
          <a v-if="!disable" class="table-upload-title" @click="download"><svg-icon  icon-class="icon-xz" />下载</a>
          <a v-if="!disable" class="table-header-title" @click="addHandle"><svg-icon  icon-class="icon-add" />添加</a>
        </template>
        <template slot-scope="scope">
          <div class="achieved" v-if="scope.row.finishState === '1' || disable">
            <el-button style="margin-right:20px" @click.native.prevent="updateHandle(scope.row,false)" type="primary" plain size="mini">查看</el-button>
            <svg-icon :style="{fontSize:'16px'}" icon-class="icon-flag" /> 已结束
          </div>
          <div v-else>
            <el-button type="primary" size="mini" @click="finishHandle(scope.row)">结束</el-button>
            <el-button @click.native.prevent="updateHandle(scope.row,true)" type="primary" plain size="mini">修改</el-button>
            <el-button v-if="!disable" @click.native.prevent="deleteRow(scope.row)" type="danger" plain size="mini">删除</el-button>
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
    <dialog-form ref="form" :view-date="viewYear" :disable="disable" @refresh="refresh" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import dialogForm from './hy-form'

export default {
  components: {
    dialogForm
  },
  props: {
    viewYear: String,
    disable: Boolean
  },
  data() {
    return {
      loading: false,

      tableData: [],
      pageNo: 1,
      pageSize: 10,
      total: null,

      updateId: null
    }
  },
  computed: {
    tableHight() {
      const height = this.$store.state.app.containHeight - 345
      return height < 390 ? 390 : height
    }
  },
  watch: {

  },
  created() {
    this.searchOption()
  },
  mounted() {},
  methods: {
    // 结束
    finishHandle(row) {
      this.$confirm('确定要结束吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id
        }
        baseRequest('/objective/rwConference/finishConference', params).then(response => {
          if (response.msg === 'Success') {
            this.$Message.success('操作成功')
            this.searchOption()
          }
        })
      })
    },
    searchOption(page) {
      this.loading = true
      const param = {
        viewYear: this.viewYear,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/objective/rwConference/selects', param).then(response => {
        const { item, total } = response.data
        this.tableData = item
        this.total = total
        this.loading = false
      })
    },
    refresh() {
      this.searchOption()
    },
    addHandle() {
      this.$refs.form.openDialog(null, true)
    },
    updateHandle(row, state) {
      this.$refs.form.openDialog(row, state)
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: row.id
        }
        baseRequest('/objective/rwConference/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
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
    // 下载
    download() {
      downloadFile('/objective/rwConference/upload', { viewYear: this.viewYear })
        .finally(_ => {
        })
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

    // /deep/ .el-table.table-main {
    //     td, th {
    //       border-right: 0;
    //     }
    // }
</style>