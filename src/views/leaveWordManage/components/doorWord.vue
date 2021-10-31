<template>
  <div class="jljs-content" :style="{minHeight:tableHight + 'px'}">
     <div class="title1">
       <h4 class="h4_left">留言管理</h4>
     </div>
     <el-form ref="form" :model="formData" :inline="true"  style="margin-top:24px">
       <el-row>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
            <div>用户名</div>
            <el-input v-model="formData.userName" maxlength="38" style="width:251px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
            <div>手机号</div>
            <el-input v-model="formData.loginName" oninput="value=value.replace(/[^\d]/g,'')" maxlength="11" style="width:251px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
           <el-form-item label="" class="formitem">
            <div>邮箱</div>
            <el-input v-model="formData.email" style="width:251px" clearable></el-input>
          </el-form-item>
         </el-col>
         <el-col :span="6">
          <el-form-item label="" class="formitem">
            <div>是否反馈</div>
            <el-select v-model="formData.feedbackType" maxlength="38" style="width:251px" clearable>
                <el-option value="0" label="否"></el-option>
                <el-option value="1" label="是"></el-option>
            </el-select>
          </el-form-item>
         </el-col>
       </el-row>
       <el-row>
         <el-col :span="22">
           <el-form-item label="" class="formitem">
  <div>留言日期</div>
      <el-date-picker class="data-item"  
         style="margin-right:9px;width:251px"
         :picker-options="pickerOptionsStart" 
         type="date"
         placeholder="选择日期" 
         value-format='yyyy-MM-dd'
         v-model="formData.startDate" >
        </el-date-picker>
    <span style="margin-right:7px;">至</span>
      <el-date-picker  class="data-item"
        style="width:248px"
       :picker-options="pickerOptionsEnd" 
        type="date" 
        placeholder="选择日期" 
        value-format='yyyy-MM-dd'
        v-model="formData.endDate" >
        </el-date-picker>
    </el-form-item>
         </el-col>
         <el-col :span="2" style="display:flex;justify-content:flex-end">
          <el-form-item class="formitem">
            <el-button @click="searchOption" style="margin-top:36px;width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
          </el-form-item>
         </el-col>
       </el-row>
</el-form>
 <div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:24px;margin-bottom:23px"></div>
 <div class="title2">
       <h1 class="h4_left2">数据列表</h1>
     </div>
 <!-- 表格 -->

<el-table class="table-main" :data="tableData"  style="width:100%;margin-top:0px;" v-loading="loading" border>
      <el-table-column type=index label="序号" width="52" align="center"></el-table-column>
      <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
      <el-table-column prop="loginName" label="用户手机号" align="center"></el-table-column>
      <el-table-column prop="email" label="用户邮箱" :show-overflow-tooltip="true" align="center"></el-table-column>
      <el-table-column prop="leavingTime" label="留言日期"  align="center"></el-table-column>
      <el-table-column prop="feedbackTime" label="反馈日期"  align="center" ></el-table-column>
      <el-table-column label="操作"  align="center" >
        <template slot-scope="scope">
            <el-button v-if="scope.row.feedbackType === '0'" type="primary" size="mini" plain @click="leaveWord(scope.row)">反馈</el-button>
            <el-button v-else type="primary" size="mini" plain @click="leaveWord(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
          title="留言回复"
          :visible.sync="leaveWordShow"
          class="dialog-main height80"
          :class="{'no-bottom':currentRow.feedbackType==='1'}"
          top="5vh"
          width="800px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <h3>留言内容:</h3>
          <div style="padding:10px;">
            <label>1.我的学习收获</label>
            <p style="line-height:24px">{{this.updateForm['137'].answer}}</p>
          </div>
         <div style="padding:10px;">
            <label>2.我的j几点建议</label>
            <p style="line-height:24px">{{this.updateForm['138'].answer}}</p>
          </div>
          <h3>回复:</h3>
          <div style="padding:10px">
            <el-form ref="form"  :model="form">
              <el-form-item label="">
                <label class="form-label required">1.发放积分奖励</label>
                <div>
                    <el-radio :disabled="currentRow.feedbackType==='1'" v-model="p139Form.answer" label="1">是</el-radio>
                    <el-radio :disabled="currentRow.feedbackType==='1'" v-model="p139Form.answer" label="0">否</el-radio>
                </div>
              </el-form-item>
              <el-form-item label="">
                <label class="form-label required">2.教练反馈</label>
                <el-input :disabled="currentRow.feedbackType==='1'" type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model.trim="p140Form.answer" maxlength="500"
                show-word-limit  ></el-input>
              </el-form-item>
            </el-form>
          </div>
      <span slot="footer" v-if="currentRow.feedbackType!=='1'">
        <el-button type="primary" @click="submitBtn" >提 交</el-button>
        <el-button  @click="leaveWordShow = false">关 闭</el-button>
      </span>
    </el-dialog>
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
import { baseRequest, baseSearch } from '@/api/base'
export default {
  data() {
    return {
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.formData.endDate !== '') {
            let date = this.formData.endDate + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.formData.startDate !== '') {
            let date = this.formData.startDate + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      id: '',
      pageNo: 1,
      total: 1,
      pageSize: 10,
      applyId: '',
      applyName: '',
      applyPhone: '',
      leavingUserId: '',
      leaveWordShow: false,
      beginTime: '',
      endDate: '',
      leaveType: '',
      formData: {
        userName: '',
        loginName: '',
        email: '',
        feedbackType: '',
        startDate: '',
        endDate: ''
      },
      leaveContent: '',
      form: {
        desc: ''
      },
      tableData: [],
      loading: false,
      currentRow: {},
      updateForm: {
        '137': {},
        '138': {}
      },
      p139Form: {
        answer: '',
        id: ''
      },
      p140Form: {
        answer: '',
        id: ''
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  created() {
    this.searchOption()
  },

  methods: {
    // 回复提交
    submitBtn() {
      if (this.p140Form.answer) {
        const dataAnswer = [
          {
            'id': '139',
            'answer': this.p139Form.answer
          },
          {
            'id': '140',
            'answer': this.p140Form.answer
          }
        ]
        const param = {
          type: '1',
          stuId: this.currentRow.stuId,
          dataAnswer
        }
        baseRequest('/course/rwProductFeedback/operationQuestion', param).then((response) => {
          this.leaveWordShow = false
          this.$Message.success('操作成功')
          this.searchOption()
        })
      } else {
        this.$Message.warning('请填写回复内容')
      }
    },
    // 留言回复
    leaveWord(content) {
      this.leaveWordShow = true
      this.currentRow = content
      const param = {
        stuId: content.stuId
      }
      baseRequest('/course/rwProductFeedback/selectAll', param).then((response) => {
        const backManager = response.data.item.manager || {}
        const backStu = response.data.item.stu || {}
        this.updateForm['137'] = backStu['137'] || {}
        this.updateForm['138'] = backStu['138'] || {}
        if (backManager['139'] && backManager['139'].answer) {
          this.p139Form.answer = backManager['139'].answer
        } else {
          this.p139Form.answer = '0'
        }
        if (backManager['140'] && backManager['140'].answer) {
          this.p140Form.answer = backManager['140'].answer
        } else {
          this.p140Form.answer = ''
        }
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      const data = Object.assign(this.formData, param)
      baseSearch('/course/rwProductFeedback/feedbackAll', data).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
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
  margin:0 auto 20px;
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