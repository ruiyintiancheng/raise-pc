<template>
  <el-dialog
  id="Billingdetails"
  title="结算详情"
  :visible.sync="dialogsalejsxq"
  width="900px"
  top="9vh"
  destroy-on-close
  :close-on-click-modal="false">
   <div class="box-middle">
    <div class="box-topmiddle">
      <el-row style="font-size:16px">
          <el-col :span="4">
            <label>用户名：</label>
            <span>{{row.userName}}</span>
          </el-col>
          <el-col :span="6">
            <label>手机号：</label>
            <span>{{row.loginName}}</span>
          </el-col>
          <el-col :span="9">
            <label>结算时间：</label>
            <span>{{row.settlementTime}}</span>
          </el-col>
          <el-col :span="5">
            <label>结算金额：</label>
            <span>{{row.amount}}</span>
          </el-col>
      </el-row>
      <el-button  @click="exportExceldetails" :loading='downLoading' style="padding:0px;width: 90px;height: 30px;margin-top:10px;margin-bottom:10px;float: right;margin-right:17px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button>
    </div>
    <!-- 表格 -->
    <el-table class="table-main" v-loading="loading" :data="tableData1"  style="width:100%;margin-top:20px;" border>
      <el-table-column prop="applyId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="学员名称" width="130" align="center"></el-table-column>
      <el-table-column prop="loginName" label="学员手机号" width="150" align="center"></el-table-column>
      <el-table-column prop="email" label="学员邮箱" width="150" show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column prop="productName"    label="产品" width="100" align="center"></el-table-column>
      <el-table-column prop="addTime" label="购买时间" width="190" align="center"></el-table-column>
      <el-table-column prop="type" label="结算方式" width="100" align="center"></el-table-column>
      <el-table-column prop="amount" label="结算金额"  align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
   </div>
</el-dialog>

</template>

<script>
import { baseRequest } from '../../../api/base'
import { download } from '@/utils/download'
export default {
  data() {
    return {
      row: {},
      dialogsalejsxq: false,
      tableData1: [],
      applyId: '',
      applyName: '',
      applyPhone: '',
      loading: false,
      pageNo: 1,
      total: 1,
      pageSize: 10,
      table: false,
      downLoading: false,
      ifExport: false
    }
  },
  created() {
  },
  mounted() {

  },
  methods: {
    exportExceldetails() {
      this.downLoading = true
      download('/finance/rwRebateSettlementDetail/export', { settlementId: this.row.id }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    tabledetail(row) {
      this.loading = true
      this.row = row
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        settlementId: row.id
      }
      baseRequest('/finance/rwRebateSettlementDetail/selects', param).then((response) => {
        this.tableData1 = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    tablePaging(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        settlementId: this.row.id
      }
      baseRequest('/finance/rwRebateSettlementDetail/selects', param).then((response) => {
        this.tableData1 = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.tablePaging()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.tablePaging(true)
    }
  }
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