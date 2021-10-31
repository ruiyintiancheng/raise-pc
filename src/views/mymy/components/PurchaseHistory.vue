<template>
  <div class="gmls-content" :style="{minHeight:tableHight + 'px'}">
     <div class="box-title8">
       <h4 class="title8">购买历史</h4>
     </div>
  <!-- 日历 -->
 <div class="box-rili">
   <el-form ref="formData" :model="formData" class="data-form" inline>
    <el-form-item >
      <el-date-picker class="data-item" 
        style="margin-top:0px" 
        type="date"
        placeholder="选择日期" 
        :picker-options="pickerOptionsStart"
        value-format='yyyy-MM-dd'
        v-model="formData.startTime" >
        </el-date-picker>
    <span style="margin-right:0px;">至</span>
      <el-date-picker 
       class="data-item" 
        type="date" 
        placeholder="选择日期" 
         :picker-options="pickerOptionsEnd"
        value-format='yyyy-MM-dd'
        v-model="formData.endTime" >
        </el-date-picker>
    </el-form-item>
     <el-form-item >
      <el-button type="primary" size="small" class="cx-box"   @click="searchOption()">查询</el-button>
      <el-button type="primary" size="small" class="cx-box2"   @click="exportHistory">下载</el-button>
      </el-form-item >
   </el-form>
 </div>
 <!-- 表格 -->
<el-table class="table-main" :data="tableData"  style="width:100%;margin-top:24px;"  border>
      <el-table-column type="index" width="52"></el-table-column>
      <el-table-column prop="orderId" label="订单号" width="200px" align="center"></el-table-column>
      <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
      <el-table-column prop="txnTime" label="购买日期" width="200px" align="center"></el-table-column>
      <el-table-column prop="courseTime" label="所选课时" width="200px" align="center"></el-table-column>
      <el-table-column prop="txnAmt" label="支付金额"  align="center"></el-table-column>
      <el-table-column prop="buyWay" label="支付方式"  align="center"></el-table-column>
      <el-table-column label="拼团详情"  align="center">
        <template slot-scope="scope">
        <a  v-if="scope.row.groupId!==null" @click="groupDetails(scope.row.groupId,scope.row.productName)" ><span style="color: #56aaff;">详情</span></a>
        </template>
      </el-table-column>
      <el-table-column prop="isOpen" width="180px" label="操作"  align="center">
        <template slot-scope="scope">
            <el-button
             v-if="scope.row.isOpen==='0'"
                @click="invoice(scope.row.orderId)"
                class="button-kaifapiao"
                type="primary"
                size="mini">
               开票
            </el-button>
            <el-button
                v-if="scope.row.isOpen==='1'"
                class="button-notk"
                type="primary"
                size="mini">
              已开票
            </el-button>
            <!-- <span v-if="scope.row.isOpen==='1'">已开票</span> -->
            <el-button
                v-if="scope.row.isOpen==='2'"
                class="button-kaifapiajyo"
                type="primary"
                size="mini">
              开票中
            </el-button>
            <el-button
                v-if="scope.row.isOpen==='3'"
                class="button-kaifapiajyo"
                type="primary"
                size="mini">
              不可开票
            </el-button>
            <el-button 
                slot="reference"
                class="button-tuipiao"
                type="primary"
                v-if="scope.row.isRefund==='0'"
                @click="refund(scope.row)"
                size="mini">
              退款
            </el-button>
            <!-- </el-popover> -->
            <el-button
                v-if="scope.row.isRefund==='1'"
                class="button-notk"
                type="primary"
                size="mini">
              已退款
            </el-button>
            <el-button
                v-if="scope.row.isRefund==='3'"
                class="button-notk"
                type="primary"
                size="mini">
              不可退款
            </el-button>
            <el-button
                v-if="scope.row.isRefund==='2'"
                class="button-refunding"
                type="primary"
                size="mini">
              正在退款中
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <invoicedialog :orderId='orderId' ref="invoicedialog" @searchOption="searchOption"/>
    <groupDetails :groupId='groupId' :productName='productName' ref="groupDetails"/>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { baseRequest } from '@/api/base'
import { baseSearch } from '@/api/base'
import AddClass from '../../course/components/addClass'
import invoicedialog from './invoicedialog'
import groupDetails from './groupDetails'
import { download } from '@/utils/download'
export default {
  components: {
    AddClass,
    invoicedialog,
    groupDetails
  },
  data() {
    return {
      groupId: '',
      productName: '',
      item: '',
      orderId: '',
      errCode: '',
      respCode: '',
      radio: '1',
      formData: {
        startTime: '',
        endTime: ''
      },
      pageNo: 1,
      total: null,
      pageSize: 10,
      tableData: [],
      currentRow: {},
      dialogVisible: false,
      dialogVisiblexsfs: false,
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.formData.endTime !== '') {
            let date = this.formData.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.formData.startTime !== '') {
            let date = this.formData.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.table()
  },
  methods: {
    exportHistory() {
      this.downLoading = true
      download('/user/rwUser/exportBuyHistroy', _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    // 打开详情
    groupDetails(groupId, productName) {
      this.groupId = groupId
      this.productName = productName
      this.$refs.groupDetails.groupdialog = true
      this.$nextTick(_ => {
        this.$refs.groupDetails.vueqrdig()
      })
    },
    refund(row) {
      let url = '/user/rwOrder/refund'
      if (row.payType === '1') {
        url = '/user/rwAppOrder/appRefund'
      }
      this.$confirm('您是否确定退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.orderId = row.orderId
        baseRequest(url, { orderId: row.orderId }).then((response) => {
        // console.log(response)
          this.item = response.data.item
          this.orderId = row.orderId
          this.$Message({
            type: 'success',
            message: '退款申请成功!'
          })
          this.table()
        })
      })
      // .catch(() => {
      //   this.$Message({
      //     type: 'info',
      //     message: '您已取消退款！'
      //   })
      // })
    },
    // 开发票dialog框
    invoice(id) {
      this.$refs.invoicedialog.dialogVisiblekfp = true
      this.orderId = id
      this.table()
    },
    table(page) {
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/user/rwUser/getBuyHistroy', params).then((response) => {
        // console.log(response)
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.pageSize = response.data.pageSize
      })
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        startTime: this.formData.startTime,
        endTime: this.formData.endTime
      }
      baseSearch('/user/rwUser/getBuyHistroy', params).then((response) => {
        // console.log(response)
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.table()
      this.searchOption(true)
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.table()
      this.searchOption(true)
    }
  }
}
</script>

<style lang="scss" scoped>
.gmls-content{
    width: 1440px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    padding: 24px;
    margin-bottom: 30px;
   .box-title8{
      width: 200px;
      height: 18px;
      position: relative;
      margin-bottom: 12px;
      .title8{
          font-size:18px;
          color:#222222;
          position: absolute;
          top: 0;
          left: 0;
      }
  }
  .box-rili{
      // width: 895px;
      // height: 40px;
    //   background-color: pink;

      // position: relative;
      // display: inline-block;
    .cx-box{
        // position: absolute;
        top: 0;
        right: 16px;
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
    }
    .cx-box2{
        // position: absolute;
        top: 0;
        right: 137px;
        text-align: center;
        border-radius: 4px;
        font-size: 16px;
    }
  }
//   日历
  .data-form{
    .data-item{
        width: 300px;
       
    }
  }
  .el-input--medium .el-input__inner {
    height: 36px;
    line-height: 36px;
}
  .el-input__inner{
      background-color: #fcfcfc;
      border-radius: 4px;
      border: solid 1px #dddddd;
  }
// 表格
.button-kaifapiao{
    border: 0;
    margin:0 auto;
    width: 66px;
    height: 29px;
    line-height:0.5;
    background-color: #04ae0f;
    border-radius: 8px;
    font-size:12px;
    color:#ffffff;
    padding:0;
}
.button-kaifapiajyo{

    width: 66px;
    height: 29px;
    border: none;
    line-height:0.5;
    background-color: #bbbbbb;
    border-radius: 8px;
    font-size:12px;
    color:#ffffff;
    padding:0;
}
.button-notk{
    width: 66px;
    height: 29px;
    border: none;
    line-height:0.5;
    background-color: #bbbbbb;
    border-radius: 8px;
    font-size:12px;
    color:#ffffff;
    padding:0;
}
.button-refunding{
   width: 66px;
    height: 29px;
    border: none;
    line-height:0.5;
    background-color: #bbbbbb;
    border-radius: 8px;
    font-size:12px;
    color:#ffffff;
    padding:0;
}
.button-tuipiao{
width: 66px;
    height: 29px;
    border: none;
    line-height:0.5;
    border-radius: 8px;
    font-size:12px;
    color:#ffffff;
    padding:0;
}
.el-table__header tr,
  .el-table__header th {
     height: 25px;
    line-height: 25px;
  }
  .el-table__body tr,
  .el-table__body td {
    height: 52px;
    width: 52px;
    line-height: 52px;
  }
  .el-table .cell,
  .el-table--border td:first-child .cell {
    padding-left: 20px;
    font-size: 14px;
    color: #222222;
  }
}
</style>