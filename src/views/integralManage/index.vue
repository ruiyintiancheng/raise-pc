<template>
  <div class="jfgl-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">积分管理</h4>
     </div>
     <el-form ref="form" :rules='rules' :model="form" :inline="true"  style="margin-top:24px;position: relative;">
         <el-row>
             <el-col :span="5">
                <el-form-item label="" class="formitem">
                    <div>用户名称</div>
                    <el-input v-model="form.userName" style="width:280px" clearable></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="5">
                <el-form-item label="" class="formitem">
                    <div>手机号</div>
                    <el-input v-model="form.loginName" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:280px" clearable></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="5">
                <el-form-item label="" class="formitem">
                    <div>邮箱</div>
                    <el-input v-model="form.email" style="width:280px" clearable></el-input>
                </el-form-item>
             </el-col>
             <el-col :span="8">
                <el-form-item class="formitem">
                    <div>积分</div>
                    <el-form-item prop="cardsValue">
                    <el-input v-model="form.cardsValue" oninput="value=value.replace(/[^\d]/g,'')" style="width:180px" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                    <span>至</span>
                    </el-form-item>
                    <el-form-item prop="cardsValues">
                    <el-input v-model="form.cardsValues" oninput="value=value.replace(/[^\d]/g,'')" style="width:180px" clearable></el-input>
                    </el-form-item>
                </el-form-item>
             </el-col>
         </el-row>
         <el-row>
           <el-col>
             <el-form-item style="display:flex;justify-content:flex-end;margin-top:36px" class="formitem">
             <div>
                  <el-button @click="searchOption(false)" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
                  <el-button  @click="exportHistory" :loading='downLoading' style="width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;padding:0px" >下载</el-button>
                </div>
             </el-form-item>
           </el-col>
         </el-row>
</el-form>
<div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:24px;margin-bottom:23px"></div>
     <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 全部 -->
<el-table class="table-main" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading" border>
      <el-table-column prop="invoId" type=index label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名"  align="center"></el-table-column>
      <el-table-column prop="loginName" label="手机号"  align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column prop="cardsValue" label="积分"  align="center"></el-table-column>
    </el-table>
        <!-- 全部列表分页 -->
    <sur-pagination    :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
                        
  </div>
</template>

<script>
import { download } from '@/utils/download'
import { baseSearch } from '../../api/base'

// import bulktable from './components/bulktable'
export default {
  components: {
  },
  data() {
    var checkInput = (rule, value, callback) => {
      if (value % 5 !== 0) {
        callback(new Error('请输入5的倍数'))
      } else if (parseInt(this.form.cardsValue) > parseInt(value)) {
        callback(new Error('请按规则输入区间值'))
      }
    }
    var checkInput1 = (rule, value, callback) => {
      if (this.form.cardsValue % 5 !== 0) {
        callback(new Error('请按规则输入区间值'))
      }
    }
    return {
      currentWay: '0',
      tuangouViasable: false,
      invoId: '',
      groupId: '',
      form: {
        userName: '',
        loginName: '',
        email: '',
        cardsValue: null,
        cardsValues: null
      },
      rules: {
        cardsValues: [
          { required: true, validator: checkInput }
        ],
        cardsValue: [
          { required: true, validator: checkInput1 }
        ]
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
      downLoading: false,
      loading: false
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
    exportHistory() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.loginName,
        email: this.form.email,
        cardsValue: this.form.cardsValue,
        cardsValues: this.form.cardsValues
      }
      download('/user/rwCardsInfo/export', params, _ => {
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
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, params)
      baseSearch('/user/rwCardsInfo/rwCardsInfoList', data).then((response) => {
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
.jfgl-content{
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