/** 授权表格 */
<template>
  <div>
    <el-table
      v-loading="loading"
      class="table-main"
      :data="tableData"
      :height="tableHight"
      border
      style="width: 100%">
      <el-table-column show-overflow-tooltip prop="empWork" label="授权内容" />
      <el-table-column prop="empPerson" label="被授权的人" width="200" align="center" />
      <el-table-column prop="empNowLevel" label="现在的授权层级" width="200" align="center" />
      <el-table-column prop="empReachLevel" label="要达到的授权层级" width="200" align="center" />
      <el-table-column prop="finishDate" label="结束时间" align="center" width="200"></el-table-column>
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
    <sqForm ref="form" :view-date="viewYear" :disable="disable" @refresh="refresh" />
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { downloadFile } from '@/utils/download'
import { icon } from '../../icon'
import sqForm from './sq-form'

export default {
  components: {
    sqForm
  },
  props: {
    viewYear: String,
    disable: Boolean
  },
  data() {
    return {
      icon,
      loading: false,

      tableData: [],

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
  mounted() {

  },
  methods: {
    // 结束
    finishHandle(row) {
      this.$confirm('确定要结束吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          empId: row.empId
        }
        baseRequest('/objective/rwEmpower/finishEmpower', params).then(response => {
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
        viewYear: this.viewYear
      }
      baseRequest('/objective/rwEmpower/selects', param).then(response => {
        this.tableData = response.data.item
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
      const param = {
        empId: row.empId
      }
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/objective/rwEmpower/delete', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.refresh()
          })
      })
    },
    // 下载
    download() {
      this.downLoading = true
      downloadFile('/objective/rwEmpower/upload', { viewYear: this.viewYear })
        .finally(_ => {
          this.downLoading = false
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