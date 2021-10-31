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
      <span style="font-size:18px">用户</span>
      <span style="font-size:18px">{{row.userName}}</span>
      <span style="font-size:18px;margin-left:52px">手机号：</span>
      <span style="font-size:18px">{{row.cellphone}}</span>
      <span style="font-size:18px;margin-left:52px">结算时间：</span>
      <span style="font-size:18px">{{row.settlementTime}}</span>
      <span style="font-size:18px;margin-left:52px">总计：</span>
      <span style="font-size:18px">{{row.amount}}</span>
      <el-button  @click="exportExceldetails" :loading='downLoading' style="padding:0px;width: 90px;height: 30px;margin-top:10px;margin-bottom:10px;float: right;margin-right:17px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button>
    </div>
    <!-- 表格 -->
    <el-table class="table-main" :data="tableData1"  style="width:100%;margin-top:20px;"  border>
      <el-table-column prop="applyId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="学员" width="130" align="center"></el-table-column>
      <el-table-column prop="cellphone" label="学员手机号" width="150" align="center"></el-table-column>
      <el-table-column prop="productName"    label="产品"  align="center"></el-table-column>
      <el-table-column prop="orderTime" label="购买时间" width="190" align="center"></el-table-column>
      <el-table-column prop="name" label="结算方式" width="90" align="center"></el-table-column>
      <el-table-column prop="amount" label="结算明细"  align="center"></el-table-column>
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
      this.ifExport = true

      download('/finance/rwRebateSettlement/getAllUserSettlement', { ifExport: this.ifExport }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    tabledetail(row) {
      this.row = row
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        settlementId: row.id
      }
      baseRequest('/finance/rwRebateSettlement/getSettlementDetail', param).then((response) => {
        this.tableData1 = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.table()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.table()
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
        padding:20px 30px 50px 30px;
         .box-topmiddle{
             width: 100%;
             height: 18px;
             margin-left:12px;
         }
    }
}

</style>