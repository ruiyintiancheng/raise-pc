<template>
  <div class="course-plus inside-container" :style="{minHeight:minHeight+ 'px'}">
      <div class="course-title">
        <span class="bold">First Step 强化辅导 </span>
        <span>{{dateTitle}}</span>
      </div>
      <el-table
          class="table-main"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%">
            <el-table-column
              align="center" 
              fixed="left"
              type="selection"
              :selectable="selectable"
              width="50">
            </el-table-column>
            <el-table-column
            label="学员姓名"
            align="left" 
            prop="">
            <template slot-scope="scope">
              <svg-icon v-if="scope.row.appointmentStatus === '1'" icon-class="icon-juese" />
              <svg-icon v-else-if="scope.row.appointmentStatus === '2'" icon-class="icon-xuexi" />
              {{scope.row.userName}}
            </template>
            </el-table-column>
            <el-table-column
            label="手机号/邮箱"
            prop="loginName"
            align="center"
             >
            </el-table-column>
            <el-table-column
            label="辅导时间"
            prop=""
            align="center"
             >
             <template v-if="scope.row.startTime" slot-scope="scope">
               {{scope.row.startTime}} 
               <el-button style="margin-left:20px;" type="primary" size="mini" :disabled="!canUpdate(scope.row)" @click="updateHandle(scope.row)">修改</el-button>
               <el-button type="primary" size="mini" :disabled="!hasMeeting(scope.row.startTime,scope.row.endTime)" @click="openMeeting(scope.row.planId)">进入会议</el-button>
             </template>
            </el-table-column>
      </el-table>
      <div class="yuyue-btn">
        <el-button type="primary" :disabled="this.multipleSelection.length === 0" @click="yuyueHandle">预约辅导</el-button>
      </div>
      <strengthen-oneone-form ref="strengthenOneoneForm" :courseId="id" :endDate="endDate" :multipleSelection="multipleSelection" @getData="getData"></strengthen-oneone-form>
      <strengthen-group-form ref="strengthenGroupForm" :courseId="id" :endDate="endDate" :multipleSelection="multipleSelection" @getData="getData"></strengthen-group-form>
      <el-dialog
      append-to-body
      title="进入会议"
      :visible.sync="resultVisible"
      class="result-dialog dialog-main heightauto"
      top="10%"
      width="360px"
      :close-on-click-modal="false"
      >
      <div class="result-main">        
        <vue-qr v-if="code" class="result-code" :text="code" :margin="0" :size="220" />
        <div class="result-title" style="font-size: 14px;line-height: 1.5;">
          <div><el-link type="primary" :underline="true" @click="goMeeting"  style="font-size:15px;">点击进入会议室</el-link></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
import { baseRequest } from '../../../api/base'
import strengthenOneoneForm from './components/strengthen-oneone-form'
import strengthenGroupForm from './components/strengthen-group-form'
import VueQr from 'vue-qr'
export default {
  components: {
    strengthenOneoneForm,
    strengthenGroupForm,
    VueQr
  },
  props: {
    id: [String, Number],
    startDate: String,
    endDate: String,
    sNum: [String, Number]
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      planId: null,
      resultVisible: false,
      code: ''
    }
  },
  computed: {
    dateTitle() {
      return parseTime(this.startDate, '{y}年{m}月{d}日') + '~' + parseTime(this.endDate, '{y}年{m}月{d}日')
    },
    minHeight() {
      return this.$store.state.app.containHeight - 120
    }
  },
  created() {
    this.getData()
  },
  mounted() { },
  methods: {
    canUpdate(item) {
      const rowDate = new Date(item.startTime.replace(/-/g, '/')).getTime() - 86400000
      const tDate = new Date().getTime()
      return parseInt(item.updateCount) < 1 && rowDate > tDate
    },
    selectable(row, index) {
      return !row.startTime
    },
    getData() {
      baseRequest('/course/firstStepExtra/getExtraUserList', { courseId: this.id }).then(response => {
        this.tableData = response.data.item
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    yuyueHandle() {
      const userIds = []
      for (const iterator of this.multipleSelection) {
        userIds.push(iterator.userId)
      }
      if ((new Set(userIds)).size !== userIds.length) {
        this.$Message.warning('小组辅导不能多次选择同一学员，请重新选择')
        return
      }
      if (this.multipleSelection.length === 2 || this.multipleSelection.length === 0) {
        this.$Message.warning('个人辅导请勾选1个人，小组辅导请至少勾选3个人')
      } else if (this.multipleSelection.length === 1) {
        // this.formVisible = true
        // this.loading = false
        // this.status = 0
        // this.ruleForm = {
        //   startDate: '',
        //   time: null
        // }

        // this.resetForm('ruleForm')
        this.$refs.strengthenOneoneForm.openDialog()
      } else {
        this.$refs.strengthenGroupForm.openDialog()
      }
    },
    updateHandle(row) {
      if (row.appointmentStatus === '2') {
        this.$refs.strengthenOneoneForm.openDialog(row)
      } else if (row.appointmentStatus === '1') {
        this.$refs.strengthenGroupForm.openDialog(row)
      }
    },
    // 是否进入会议
    hasMeeting(startTime, endTime) {
      const start = new Date(startTime.replace(/-/g, '/')).getTime()
      const end = new Date(endTime.replace(/-/g, '/')).getTime()
      const now = new Date().getTime()
      // const now = new Date('2021-08-19 22:55:00').getTime()
      return now >= start - 5 * 60000 && now <= end + 5 * 60000
    },
    openMeeting(planId) {
      this.planId = planId
      baseRequest('/course/coaches/getMeetingInfoCoach', { planId })
        .then(response => {
          this.code = response.data.item.startUrl
          this.resultVisible = true
        })
    },
    goMeeting() {
      window.open(this.code)
      this.resultVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-plus {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding:24px;
    margin-top:30px;
    margin-bottom:30px;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    .course-title {
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .table-main{
      margin-top: 30px;
    }
    .yuyue-btn{
      margin-top: 20px;
      text-align: right;
    }
  }
  .result-main {
    text-align: center;
    .result-icon {
      width: 48px;
      height: 48px;
      margin: 20px 0 16px;
    }
    .result-title {
      font-family: PingFangSC-Semibold;
	    font-size: 20px;
      font-weight: bold;
      color: #222222;
    }
    .result-code {
      margin: 16px 0;
    }
    .result-btn {
      width: 90px;
      height: 30px;
      padding: 7px 0;
      margin: 20px 0 10px;
    }
  }
</style>

