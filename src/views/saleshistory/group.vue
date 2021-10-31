<template>
  <div class="tgls-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">团购历史</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true"  style="margin-top:24px;position: relative;">
      <el-form-item label="" >
      <div>团购日期</div>
          <el-date-picker class="data-item"  
            style="margin-right:9px;width:200px"
            :picker-options="pickerOptionsStart" 
            type="date"
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.startTime" >
            </el-date-picker>
        <span style="margin-right:10px;">至</span>
          <el-date-picker  class="data-item"
            style="width:200px"
          :picker-options="pickerOptionsEnd" 
            type="date" 
            placeholder="选择日期" 
            value-format='yyyy-MM-dd'
            v-model="form.endTime" >
            </el-date-picker>
        </el-form-item>
  <div class="search-btns">
  <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
</div>
</el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->
 <!-- 全部 -->
<el-table class="table-main"  v-show="this.currentWay=='0'" fit :data="tableData" v-loading="loading"  border>
      <el-table-column prop="invoId" type=index label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="groupId" label="团购ID"  align="center"></el-table-column>
      <el-table-column prop="productName" label="产品"  align="center"></el-table-column>
      <el-table-column prop="num" label="团购人数"  align="center"></el-table-column>
      <el-table-column prop="beginTime" label="团购开始日期"  align="center"></el-table-column>
      <el-table-column prop="endTime" label="团购结束日期" width="200px" align="center"></el-table-column>
      <el-table-column prop="" label="团购状态"  align="center" width="100">
        <template   slot-scope="scope">
          <span>{{scope.row.isOk==='0'?'成功':(scope.row.isOk==='1'?'失败':(scope.row.isOk==='2'?'拼团中':''))}}</span>
         </template>
      </el-table-column>
      <el-table-column  label="详情"  align="center" width="120">
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
        <!-- 全部列表分页 -->

    <sur-pagination   v-show="this.currentWay=='0'" :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
                        
    <!-- 拼团表格 -->
    <!-- <fpxq :item='item' :invoId='invoId' ref="fpxq" @searchOption="searchOption"/> -->
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
      form: {
        userName: '',
        userPhone: '',
        introPhone: '',
        startTime: '',
        endTime: '',
        isOpen: '',
        productId: '',
        dealType: ''
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
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: this.form.productId,
        dealType: this.form.dealType
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
        startTime: this.form.startTime,
        endTime: this.form.endTime,
        productId: this.form.productId,
        dealType: this.form.dealType
      }
      baseSearch('/user/rwGroupInfo/hisGroups', params).then((response) => {
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
.tgls-content{
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
    // position: absolute;
    // right: 0;
    // bottom: 30px;
    // top:50%;
    // transform: translateY(-50%);
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

}
</style>