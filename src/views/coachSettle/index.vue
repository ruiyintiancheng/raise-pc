<template>
  <div class="jljs-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">教练结算</h4>
     </div>
     <el-form ref="form" :model="form" :inline="true"  style="margin-top:24px">
       <el-row>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
            <div>用户名</div>
            <el-input v-model="form.userName" style="width:280px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
            <div>手机号</div>
            <el-input v-model="form.loginName" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:280px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
            <el-form-item label="" class="formitem">
            <div>邮箱</div>
            <el-input v-model="form.email" style="width:280px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
              <div>班级状态</div>
              <el-select
                      v-model="form.status"
                      clearable
                      placeholder="请选择"
                      style="width:280px">
                      <el-option :value="item.value" :label="item.label" v-for="(item,index) in optionType" :key="index"></el-option>
                    </el-select>
          </el-form-item>
         </el-col>
       </el-row>
      <el-row>
         <el-col :span="4">
          <el-form-item class="formitem">
            <div>产品类型</div>
            <el-select placeholder="请选择" v-model="form.productId" clearable>
              <el-option
              v-for="item in optionsproduct"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
       </el-col>
        <el-col :span="10">
          <el-form-item label="" class="formitem">
            <div>项目开始时间</div>
                <el-date-picker class="data-item"  
                  style="margin-right:9px;width:251px"
                  :picker-options="pickerOptionsStart" 
                  type="date"
                  placeholder="选择日期" 
                  value-format='yyyy-MM-dd'
                  v-model="form.startTime" >
                  </el-date-picker>
              <span style="margin-right:7px;">至</span>
                <el-date-picker  class="data-item"
                  style="width:248px"
                :picker-options="pickerOptionsEnd" 
                  type="date" 
                  placeholder="选择日期" 
                  value-format='yyyy-MM-dd'
                  v-model="form.startTimeOne" >
                  </el-date-picker>
              </el-form-item>
        </el-col>
         <el-col :span="4">
          <el-form-item class="formitem">
            <div>是否结算</div>
            <el-select placeholder="请选择" v-model="form.settlementId" clearable>
              <el-option
              v-for="item in settlement"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
            </el-select>
          </el-form-item>
       </el-col>
        <el-col :span="6">
          <el-form-item style="display:flex;justify-content:flex-end;margin-top:36px" class="formitem">
            <el-button  style="width: 90px;height: 30px;line-height:0.5;" type="primary" v-if="onsettlement === true" @click="Batchsettlement">结算</el-button>
            <el-button @click="searchOption()" style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
            <el-button  @click="exportExcel" :loading='downLoading' style="padding:0px;width: 90px;height: 30px;line-height:0.5;border: solid 1px #00afff;color: #00afff;" >下载</el-button>
          </el-form-item>
        </el-col>
      </el-row>
</el-form>
 <div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:20px;margin-bottom:23px"></div>
 <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->

<el-table class="table-main" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading" border  @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" v-if="onsettlement === true" :disabled="aa ==='1'? false:true"> </el-table-column>
      <el-table-column type=index label="序号" width="52" align="center" ></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="loginName" label="手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" :show-overflow-tooltip="true" width="200" align="center"></el-table-column>
      <el-table-column prop="productName" label="产品"  align="center"></el-table-column>
      <el-table-column prop="startTime" label="开课时间"  align="center"></el-table-column>
      <el-table-column prop="endTime" label="结课时间" width="200" align="center"></el-table-column>
      <el-table-column prop="status" label="班级状态"  align="center"></el-table-column>
      <el-table-column prop="sNum" label="班级人数"  align="center"></el-table-column>
       <el-table-column prop="" label="操作"  align="center" fixed="right" width="180">
          <template slot-scope="scope">
             <el-button
            @click="detailsdialog(scope.row)"
            class="button-details"
            type="primary"
            size="mini"
          >
            详情    
          </el-button>
          <span  v-if="onsettlement === true">
           <el-button
            @click="buttonjiesuan(scope.row)"
            class="button-trial"
            type="primary"
            size="mini"
            v-show="aa === 1"
          >
            <span>结算</span>
          </el-button>
          <div
            style="width: 60px; height: 26px; display: inline-block"
            v-show="aa === 2"
          >
            已结算
          </div>
          </span>
          </template>
       </el-table-column>
    </el-table>
    <!-- 分页 -->
    <sur-pagination
      :pageNo="pageNo"
      :total="total"
      :pageSize="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></sur-pagination>
        <detailstable ref="detailstable"></detailstable>
  </div>
</template>

<script>
import { baseSearch } from '../../api/base'
import { download } from '@/utils/download'
import detailstable from './components/detailstable'
export default {
  components: {
    detailstable
  },
  data() {
    return {
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
          if (this.form.beginTime !== '') {
            let date = this.form.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      multipleSelection: [],
      id: '',
      row: '',
      item: '',
      pageNo: 1,
      total: 1,
      pageSize: 10,
      applyId: '',
      applyName: '',
      applyPhone: '',
      beginTime: '',
      endTime: '',
      auditType: '',
      reviewType: '',
      aa: 1,
      onsettlement: false,
      optionType: [
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '2',
          label: '已结课'
        },
        {
          value: '3',
          label: '未开始'
        }
      ],
      options: [
        {
          value: '',
          label: '台阶'
        }, {
          value: '1',
          label: '一次性'
        },
        {
          value: '2',
          label: '年度签约'
        },
        {
          value: '3',
          label: '代理'
        }
      ],
      settlement: [
        {
          value: '1',
          label: '已结算'
        },
        {
          value: '2',
          label: '未结算'
        }
      ],
      form: {
        userName: '',
        loginName: '',
        email: '',
        startTime: '',
        startTimeOne: '',
        status: '',
        productId: '',
        settlementId: ''
      },
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
      }, {
        value: '6',
        label: '1-1教练会谈'
      }],
      tableData: [],
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
    // this.select()
    const roles = this.$store.state.user.roles
    if (roles.includes('9')) {
      this.onsettlement = true
    } else {
      this.onsettlement = false
    }
  },

  methods: {
    select() {
      baseSearch('/user/rwProductConfig/select', { id: 7 }).then((response) => {
        console.log(response)
      })
    },
    buttonjsset(row) {
      this.$refs.jssetup.dialogsalejssetup = true
      this.row = row
    },
    buttonjsxq(row) {
      this.$refs.Billingdetails.dialogsalejsxq = true
      this.$refs.Billingdetails.tabledetail(row)
    },
    // 详情
    detailsdialog(row) {
      this.$refs.detailstable.dialogsalejsxq = true
      // this.$refs.detailstable.tabledetail(row)
    },
    // 单个结算
    buttonjiesuan(row) {
      this.$confirm('确定结算该目标吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        // baseRequest('/objective/rwGoalPlan/stopGoalPlan', { planId: row.planId }).then(response => {
        //   this.$Message.success('操作成功')
        //   this.searchOption()
        // })
      })
    },
    // table(page) {
    //   const param = {
    //     pageNo: this.pageNo,
    //     pageSize: this.pageSize
    //   }
    //   baseRequest('/course/firstStepCoach/selectCourseByCoach', param).then((response) => {
    //     this.tableData = response.data.item
    //     this.total = response.data.total
    //     this.pageSize = response.data.pageSize
    //     this.loading = false
    //   })
    // },

    // 列表查询
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.form, param)
      baseSearch('/course/courses/teacherAll', data).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    exportExcel() {
      this.downLoading = true
      const params = {
        userName: this.form.userName,
        loginName: this.form.loginName,
        email: this.form.email,
        startTime: this.form.startTime,
        startTimeOne: this.form.startTimeOne,
        status: this.form.status,
        productId: this.form.productId
      }
      download('/course/courses/teacherExport', params, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      //   this.table()
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      //   this.table()
      this.searchOption(true)
    },

    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach(element => {
        this.multipleSelection.push(element.courseId)
      })
    },
    // 批量结算
    Batchsettlement() {
      if (this.multipleSelection.length === 0) {
        this.$message.error('请先选择想要结算的内容')
      } else {
        this.$confirm('确定批量结算所选目标吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
        // baseRequest('/objective/rwGoalPlan/stopGoalPlan', { planId: row.planId }).then(response => {
        //   this.$Message.success('操作成功')
        //   this.searchOption()
        // })
        })
      }
    }

  }
}

</script>

<style lang="scss" scoped>
.jljs-content{
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
  padding-bottom: 50px;
  border-radius: 0px 10px 10px 10px;
   .title1 {
    height: 18px;
    width: 200px;
    display: block;
    .h4_left {
      float: left;
      font-size: 18px;
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
        top: 63px;
        right: 26px;
  }
  // .button-set{
  //     width: 66px;
  //     height: 26px;
  //     text-align: center;
  //     line-height: 9px;
  //     border-radius:4px;
  //     display: inline-block;
  //     font-size: 15px;
  //     margin-top: 0px;
  //     float: left;
  //     padding: 0px;
  // }
  // .button-details1111{
  //     width: 66px;
  //     height: 26px;
  //     text-align: center;
  //     line-height: 9px;
  //     border-radius:4px;
  //     display: inline-block;
  //     font-size: 15px;
  //     margin-top: 0px;
  //     float: right;
  //     padding: 0px;
  // }
     .title2 {
    height: 18px;
    width: 200px;
    margin-bottom:20px;
    display: block;
    .h4_left2 {
      float: left;
      font-size: 14px;
      color: #222222;
    }
  }
}
</style>