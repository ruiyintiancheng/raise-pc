<template>
  <div class="xsls-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">销售历史</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true" label-width="80px" style="margin-top:24px">
       <el-row>
       <el-col :span="5">
        <el-form-item label="" class="formitem">
          <div>用户名称</div>
          <el-input placeholder="请输入用户名称" v-model="form.userName" style="width:240px" clearable></el-input>
        </el-form-item>
       </el-col>
       <el-col :span="5">
        <el-form-item label="" class="formitem">
          <div>手机号</div>
          <el-input placeholder="请输入手机号" v-model="form.userPhone" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:240px" clearable></el-input>
        </el-form-item>
       </el-col>
       <el-col :span="5">
         <el-form-item label="" class="formitem">
          <div>邮箱</div>
          <el-input placeholder="请输入邮箱" v-model="form.email" style="width:240px" clearable></el-input>
        </el-form-item>
       </el-col>
       <el-col :span="5">
          <el-form-item class="formitem">
            <div>产品</div>
            <el-select placeholder="请选择" v-model="form.productId" clearable style="width:240px">
              <el-option
              v-for="item in optionsproduct"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
       </el-col>
       <el-col :span="4">
        <el-form-item class="formitem">
          <div>订单类型</div>
          <el-select v-model="form.dealType" clearable  style="width:220px">
            <el-option
            v-for="item in optionsOrderdetails"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
       </el-col>
     </el-row>
     <el-row>
       <el-col :span="4">
        <el-form-item class="formitem">
          <div>支付方式</div>
          <el-select v-model="form.orderType" clearable  style="width:220px">
            <el-option
            v-for="item in orderTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
       </el-col>
       <el-col :span="4">
        <el-form-item class="formitem">
          <div>订单状态</div>
          <el-select v-model="form.status" clearable  style="width:220px">
            <el-option
            v-for="item in statusArr"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          </el-select>
        </el-form-item>
       </el-col>
       <el-col :span="11">
        <el-form-item label="" class="formitem">
          <div>购买时间</div>
          <el-date-picker
            style="margin-right:9px;width:213px"
            :picker-options="pickerOptionsStart" 
            type="date"
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.startTime" >
            </el-date-picker>
        <span style="margin-right:10px;">至</span>
          <el-date-picker 
            style="width:213px"
          :picker-options="pickerOptionsEnd" 
            type="date" 
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.endTime" >
            </el-date-picker>
        </el-form-item>
       </el-col>
       <el-col :span="5">
           <div class="search-btns" style="margin-top:36px">
            <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
            <el-button  @click="exportHistory" :loading='downLoading' style="width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;padding:0px" >下载</el-button>
            </div>
       </el-col>
     </el-row>
  </el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->
 <!-- 全部 -->
<el-table class="table-main"  v-show="this.currentWay=='0'" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading"  border>
      <el-table-column prop="invoId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center" width="100"></el-table-column>
      <el-table-column prop="loginName" width="140" label="手机号"  align="center"></el-table-column>
       <el-table-column prop="email" width="180" :show-overflow-tooltip="true" label="邮箱"  align="center"></el-table-column>
      <el-table-column prop="productName" width="120" label="产品"  align="center"></el-table-column>
      <el-table-column prop="payType" width="120" label="销售来源"  align="center"></el-table-column>
      <el-table-column prop="startTime" width="180" label="购买课时"  align="center"></el-table-column>
      <el-table-column prop="txnTime" label="购买时间" width="180" align="center"></el-table-column>
      <el-table-column prop="statusName" label="订单状态"  align="center"></el-table-column>
      <el-table-column prop="dealName" label="订单类型"  align="center"></el-table-column>
      <el-table-column prop="orderName" label="支付方式"  align="center" width="100"></el-table-column>
      <el-table-column prop="txnAmt" label="支付金额"  align="center"></el-table-column>
      <el-table-column prop="introName" label="销售人员" width="100" align="center"></el-table-column>
      <el-table-column prop="introPhone" label="销售电话" width="140" align="center"></el-table-column>
    </el-table>
        <!-- 全部列表分页 -->

    <sur-pagination   v-show="this.currentWay=='0'" :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
                        
    <!-- 拼团表格 -->
<el-table class="table-main" v-show="this.currentWay=='1'" :data="tableData1" :height="tableHight" style="width:100%;margin-top:0px;"  border>
      <el-table-column prop="invoId" type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="groupId" label="团购ID"  align="center"></el-table-column>
      <el-table-column prop="productName" label="产品"  align="center"></el-table-column>
      <el-table-column prop="num" label="团购人数"  align="center"></el-table-column>
      <el-table-column prop="beginTime" label="团购开始日期"  align="center"></el-table-column>
      <el-table-column prop="endTime" label="团购结束日期" width="200px" align="center"></el-table-column>
      <el-table-column prop="" label="团购状态"  align="center">
          <template   slot-scope="scope">
            <span>{{scope.row.isOk==='0'?'成功':(scope.row.isOk==='1'?'失败':(scope.row.isOk==='2'?'拼团中':''))}}</span>
          </template>
      </el-table-column>
      <el-table-column  label="详情"  align="center">
        <template   slot-scope="scope">
            <el-button 
                @click="groupPurchasedetails(scope.row)"
                class="button-details"
                type="primary"
                size="mini">
                <span >团购详情</span>
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <fpxq :item='item' :invoId='invoId' ref="fpxq" @searchOption="searchOption"/>
      <el-dialog
            title="团购详情"
            :visible.sync="tuangouViasable"
            class="dialog-main heightauto"
            top="6%"
            width="850px"
            destroy-on-close
            :close-on-click-modal="false"
            >
            <bulktable v-if="tuangouViasable" :groupId="groupId"></bulktable>
            <span slot="footer">
              <el-button  @click="tuangouViasable = false">关 闭</el-button>
            </span>
          </el-dialog>
  </div>
</template>

<script>
import { download } from '@/utils/download'
import { baseSearch } from '../../api/base'
import fpxq from './components/fpxq'
import bulktable from './components/bulktable'
export default {
  components: {
    fpxq,
    bulktable
  },
  data() {
    return {
      currentWay: '0',
      tuangouViasable: false,
      invoId: '',
      groupId: '',
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.endTime !== '') {
            let date = this.form.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form.startTime !== '') {
            let date = this.form.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      options: [
        {
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }
      ],
      optionsproduct: [{
        value: '1',
        label: 'First Step'
      }, {
        value: '3',
        label: 'SP'
      }, {
        value: '5',
        label: '探索之门'
      }, {
        value: '7',
        label: 'fs强化辅导'
      }],
      optionsOrderdetails: [{
        value: '0',
        label: '支付'
      }, {
        value: '1',
        label: '退款'
      }],
      optionsBuyingpatterns: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '拼团'
      }],
      statusArr: [{
        value: '1',
        label: '成功'
      }, {
        value: '0',
        label: '失败'
      }],
      orderTypes: [{
        value: '5',
        label: '线下支付'
      }, {
        value: '0',
        label: '其他'
      }],
      form: {
        userName: '',
        userPhone: '',
        introPhone: '',
        startTime: '',
        email: '',
        endTime: '',
        isOpen: '',
        productId: '',
        dealType: '',
        status: '',
        orderType: ''
      },
      pageNo: 1,
      total: null,
      pageSize: 10,
      pageNo1: 1,
      total1: null,
      pageSize1: 10,
      tableData: [],
      tableData1: [],
      item: {},
      loading: false,
      downLoading: false
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
    // this.grouptable()
  },

  methods: {
    forceUpdate() {
      this.$forceUpdate()
    },
    groupPurchasedetails(row) {
      this.groupId = row.groupId
      this.tuangouViasable = true
    },
    exportHistory() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.userPhone,
        email: this.form.email,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: this.form.productId,
        dealType: this.form.dealType,
        status: this.form.status,
        orderType: this.form.orderType
      }
      download('/user/rwAmbaHistroy/export', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userName: this.form.userName,
        loginName: this.form.userPhone,
        email: this.form.email,
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: this.form.productId,
        dealType: this.form.dealType,
        status: this.form.status,
        orderType: this.form.orderType
      }
      baseSearch('/user/rwAmbaHistroy/selects', params).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageNo = response.data.pageNo
        this.loading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchOption(true)
    }
  }
}

</script>

<style lang="scss" scoped>
.xsls-content{
  .formitem{
    margin-bottom: 0;
    }
  position: relative;
  width: 1440px;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom:50px;
  border-radius: 0px 10px 10px 10px;
  .search-btns{
    display: flex;
    justify-content:flex-end;
  }
   .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }
   .title2 {
    height: 18px;
    width: 200px;
    display: block;
    margin-bottom: 20px;
    .h4_left2 {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }

//   表格
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
  .button-search{
       width: 90px;
        height: 40px;
        text-align: center;
        background-color: #ffffff;
        border-radius: 4px;
        border:solid 1px #00afff;
        font-size: 16px;
        color:#00afff;
        position: absolute;
        top: 126px;
        right: 32px;
  }
  
  .button-details{
      width: 65px;
      height: 33px;
      text-align: center;
      line-height: 13px;
      border-radius:8px;
      display: inline-block;
      margin-top: 0px;
      padding:0;
  }
}
</style>