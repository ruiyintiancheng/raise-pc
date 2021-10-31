<template>
  <el-dialog
    id="Billingdetails"
    title="详情"
    :visible.sync="dialogsalejsxq"
    width="900px"
    top="9vh"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="detailstable">
         <el-button @click="exportExceldetails" :loading='downLoading' style="padding:0px;width: 90px;height: 30px;margin-top:10px;margin-bottom:10px;float: right;margin-right:17px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" v-if="financial === true" >下载</el-button>
      <el-table
        v-loading="loading"
        :height="tableHeight + 'px'"
        class="table-main"
        :data="tableData"
        border
        default-expand-all
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          fixed="left"
          align="center"
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column label="用户名" align="center" prop="userName">
        </el-table-column>
        <el-table-column
          label="手机号"
          align="center"
          width="100"
          prop="loginName"
        >
        </el-table-column>
        <el-table-column
          label="邮箱"
          align="center"
          :show-overflow-tooltip="true"
          width="200"
          prop="email"
        >
        </el-table-column>
        <el-table-column
          label="产品名称"
          width="130"
          align="center"
          prop="startTime"
        >
        </el-table-column>
        <el-table-column
          label="上课时间"
          width="130"
          align="center"
          prop="qrValue"
        >
        </el-table-column>
        <el-table-column label="课程类型" align="center" prop="txnAmt">
        </el-table-column>
      </el-table>
      <!-- <sur-pagination
        :pageNo="pageNo"
        :total="total"
        :pageSize="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></sur-pagination> -->
    </div>
    <span slot="footer">
      <el-button @click="dialogsalejsxq = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
// import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      financial: false,
      dialogsalejsxq: false,
      downLoading: false,
      loading: false,
      tableData: [],
      pageNo: 1,
      total: 1,
      pageSize: 10
    }
  },
  computed: {
    tableHeight() {
      return this.$store.state.app.containHeight * 0.5
    }
  },
  created() {
    const roles = this.$store.state.user.roles
    if (roles.includes('9')) {
      this.financial = true
    } else {
      this.financial = false
    }
  }
  // methods: {
  //  exportExceldetails() {
  //   this.downLoading = true
  //   download('/finance/rwRebateSettlementDetail/export', { settlementId: this.row.id }, _ => {
  //     this.downLoading = false
  //   }, _ => {
  //     this.downLoading = false
  //   })
  // },
  // tabledetail(row) {
  //   this.loading = true
  //   this.row = row
  //   const param = {
  //     pageNo: this.pageNo,
  //     pageSize: this.pageSize,
  //     settlementId: row.id
  //   }
  //   baseRequest('/finance/rwRebateSettlementDetail/selects', param).then((response) => {
  //     this.tableData = response.data.item
  //     this.total = response.data.total
  //     this.pageSize = response.data.pageSize
  //     this.loading = false
  //   })
  // },
  //  handleSizeChange(val) {
  //       // 分页
  //       this.pageSize = val
  //       this.searchOption()
  //     },
  //     handleCurrentChange(val) {
  //       // 分页
  //       this.pageNo = val
  //       this.searchOption(true)
  //     }
  //   }
}
</script>
<style lang="scss" >
#Billingdetails .el-dialog{
    border-radius: 10px;
    .el-dialog__header, .el-dialog__footer {
        border-radius: 10px;
}
    .box-middle{
        width: 100%;
        padding:20px;
         .box-topmiddle{
             margin-left:10px;
         }
    }
}

</style>