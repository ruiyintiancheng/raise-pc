<template>
  <div class="qy-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">销售情况</h4>
       <img
        class="icon-right"
        @click="openInfo()"
        src="../../../assets/icons/icon-ques.svg"
        alt
      />
     </div>
     <div class="box-title3 clearfix">
         <div class="title3_left">当前销售方式：</div><el-button @click="changeXy" v-if="isShowQh" type="primary" plain style="margin-left:10px;margin-top:-10px;" size="mini">切换协议</el-button>
         <div class="title3_right">{{itemitemSalesway.name}}</div>
     </div>
     <div class="box-title4">
         <div class="title4_left">开始时间：</div>
         <div class="title4_right">{{itemitemSalesway.signDate}}</div>
     </div>
     <div class="box-title5">
         <div class="title5_left">结束时间：</div>
         <div class="title5_right">{{itemitemSalesway.abortTime}}</div>
     </div>
     <div class="box-title8">
       <h4 class="title8">返利明细</h4>
     </div>
  <!-- 日历 -->
 <div class="box-rili">
   <el-form ref="formData" :model="formData" class="data-form" >
    <el-form-item >
      <el-date-picker class="data-item"  
         style="margin-right:9px; margin-top:4px;"
         :picker-options="pickerOptionsStart" 
         type="date"
         placeholder="请选择开始日期" 
         value-format='yyyy-MM-dd'
         v-model="formData.startTime" >
        </el-date-picker>
    <span style="margin-right:10px;">至</span>
      <el-date-picker  class="data-item"
       :picker-options="pickerOptionsEnd" 
        type="date" 
        placeholder="请选择结束日期" 
        value-format='yyyy-MM-dd'
        v-model="formData.endTime" >
        </el-date-picker>
    </el-form-item>
      <el-button type="primary" size="small" class="cx-box"  @click="searchOption()">查询</el-button>
   </el-form>
 </div>
 
 <!-- 表格 -->
<el-table class="table-main" :data="tableData"  style="width:100%;margin-top:24px;" border>
      <el-table-column type=index align="center" label="序号" width="100"></el-table-column>
      <el-table-column prop="productName" align="center" label="产品" ></el-table-column>
      <el-table-column prop="" align="center" label="学员姓名" >
        <template slot-scope="scope">
          <a style="color:#00afff;" @click="details(scope.row)" v-if="scope.row.tobId">详情</a>
          <span v-else>{{scope.row.userName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" align="center" label="销售日期" ></el-table-column>
      <el-table-column prop="num" align="center" label="销售人数" ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
    <addstudent :row='row' :item='item' ref="addstudent"/>
    <xsfsdialog  ref="xsfsdialog"/>
    <rightsInterestsHelp ref="rightsIn"></rightsInterestsHelp>
    <el-dialog
        title="学员详情"
        append-to-body
        :visible.sync="particularsVisible"
        class="dialog-main heightauto"
        top="5%"
        width=" 630px"
        destroy-on-close
        :close-on-click-modal="false">
       <el-form label-width="150" style="margin-left:50px;">
         <el-form-item label="学员手机号：" v-for="(item,index) in phones" :key="index">
           <el-input style="width:355px;" disabled v-model="item.loginName" placeholder=""></el-input>
         </el-form-item>
       </el-form>
    </el-dialog>  
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { baseSearch } from '@/api/base'
import addstudent from './addstudent'
import xsfsdialog from './xsfsdialog'
import RightsInterestsHelp from './RightsInterestsHelp'
import { parseTime, getDateStr } from '@/utils/index'
export default {
  components: {
    addstudent,
    xsfsdialog,
    RightsInterestsHelp
  },
  data() {
    return {
      isShowQh: false,
      item: [],
      itemitemSalesway: {},
      row: '',
      checked: false,
      radio: '1',
      formData: {
        startTime: '',
        endTime: ''
      },
      pageNo: 1,
      total: null,
      pageSize: 10,
      personNum: '',
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
            return time.getTime() > newDate || time.getTime() < newDate - (90 * 86400000)
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.formData.startTime !== '') {
            let date = this.formData.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate || time.getTime() > newDate + (90 * 86400000)
          }
        }
      },
      particularsVisible: false,
      phones: []
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  created() {
    this.formData.endTime = this.currentDate
    this.formData.startTime = getDateStr(-90)
    this.searchOption()
    this.SaleswayTime()
  },
  mounted() {
    // this.$nextTick(_ => {
    //   this.SalesWay()
    // })
  },
  methods: {
    details(row) {
      this.currentRow = row
      baseRequest('/user/rwMessageTob/catInfo', { id: row.tobId }).then(response => {
        const list = response.data.item
        this.phones = []
        for (const iterator of list) {
          this.phones.push({
            loginName: iterator
          })
        }
        this.particularsVisible = true
      })
    },
    changeXy() {
      this.$confirm('确认提交切换销售协议的申请吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isShowQh = false
        baseRequest('/user/rwAmbassadorApply/witchApply', {}).then(
          (response) => {
            this.$Message.success('已提交切换申请')
          }
        )
      })
    },
    openInfo() {
      this.$refs.rightsIn.Integralsm = true
    },
    SaleswayTime() {
      baseRequest('/finance/rwRebateUser/rebateName').then(
        (response) => {
          this.itemitemSalesway = response.data.item || {}
        }
      )
      baseRequest('/finance/rwRebateUser/witchFlag').then(
        (response) => {
          this.isShowQh = response.data.item.result
        }
      )
    },
    addstudent(row) {
      this.row = row
      this.$refs.addstudent.dialogaddstudent = true
      const params = {
        id: row.id
      }
      baseRequest('/finance/rwRebateSettlement/getSettlementUser', params).then(
        (response) => {
          this.item = response.data.item
          this.loading = false
        }
      )
    },
    SalesWay() {
      this.$refs.xsfsdialog.dialogVisiblexsfs = true
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        beginTime: this.formData.startTime,
        endTime: this.formData.endTime
      }
      baseSearch('/user/rwMessageTob/selectRebate', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
      }).finally(_ => {
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.table()
      this.searchOption()
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
.qy-content{
    width: 1440px;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    padding: 24px;
    margin-bottom: 30px;
    .title1 {
    display: block;
    .h4_left {
      float: left;
      font-size: 18px;
      color: #222222;
    }
    .icon-right {
      margin-left: 6px;
      margin-top: 2px;
    }
  }
  .box-title2{
      position: relative;
      margin-top: 24px;
      .title2{
          font-size:16px;
          color:#222222;
          position: absolute;
          top: 0;
          left: 0;
      }
  }
  .box-title3{
      margin-top: 12px;
      position: relative;
      font-size: 14px;
      color: #222222;
      .title3_left{
      // position: absolute;
      float: left;
      top: 0;
      left: 0;
      }
      .title3_right{
      float: left;
      top: 0;
      left: 110px;
      }
  }
  .box-title4{
      width: 300px;
      height: 14px;
      margin-top: 10px;
      position: relative;
      font-size: 14px;
      color: #222222;
      .title4_left{
      position: absolute;
      top: 0;
      left: 0;
      }
      .title4_right{
      position: absolute;
      top: 0;
      left: 80px;
      }
  }
  .box-title5{
      width: 300px;
      height: 14px;
      margin-top: 10px;
      position: relative;
      font-size: 14px;
      color: #222222;
      .title5_left{
      position: absolute;
      top: 0;
      left: 0;
      }
      .title5_right{
      position: absolute;
      top: 0;
      left: 80px;
      }
  }
  .box-title6{
      width: 100%;
      height: 12px;
      position: relative;
      margin-top:24px;
        .title6{
            position: absolute;
            top: 0;
            left: 0;
            font-size: 12px;
            color: #fb664a;
        }
  }
  .box-title7{
      // width: 108px;
      // height: 22px;
      // line-height: 22px;
      // text-align: center;
      background-color: #00afff;
      border-radius: 9px;
      border: none;
      margin-top: 12px;
        font-size: 12px;
          color:#ffffff;
  }
   .box-title8{
      width: 200px;
      height: 16px;
      position: relative;
      margin-top: 24px;
      margin-bottom: 12px;
      .title8{
          font-size:16px;
          color:#222222;
          position: absolute;
          top: 0;
          left: 0;
      }
  }
  .box-rili{
      width: 730px;
      height: 40px;
    //   background-color: pink;
      position: relative;
    .fanli-radio{
      position: absolute;
      top:13px;
      left: 682px;
      .el-radio__input.is-checked+.el-radio__label{
        color:#222222;
        font-size:14px;
      }
    }
    .cx-box{
        position: absolute;
        top: 5px;
        right: 0;
        text-align: center;
        border-radius: 4px;

        font-size: 16px;

    }
  }
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
//   .el-icon-date:before {
//     content: "";
// }
//   .el-input--prefix .el-input__inner {
//       padding-left: 14px;
// }
// 表格
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