/** 出席表格 */
<template>
  <div class="attend">
    <div class="course-title">
        <span class="bold">{{ title }}</span>
      </div>
    <el-table
      ref="table"
      class="table-main course-table"
      :data="tableData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" :selectable="selectable" />
      <el-table-column prop="userName" label="学员姓名" />
      <el-table-column prop="loginName" label="手机号/邮箱" />
      <el-table-column label="辅导时间">
        <template slot-scope="scope">
          {{computedTime(scope.row)}}
          <template v-if="operFlag">
            <div v-if="title === '一对一辅导' && hasMeeting(scope.row.startTime, scope.row.endTime)" class="meeting-btn btn" @click="openMeeting(scope.row.meetingId)">进入会议</div>    
            <div v-if="title === '一对一辅导' && !hasMeeting(scope.row.startTime, scope.row.endTime)" class="meeting-btn btn gray">进入会议</div>    
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="course-menu">
       <template v-if="operFlag">
        <div v-if="tableData.length !== checks.length" class="item-btn btn" @click="submit">出席</div>
        <div v-else class="item-btn btn gray">出席</div>
        <div v-if="title !== '一对一辅导' && tableData.length > 0 && hasMeeting(tableData[0].startTime, tableData[0].endTime)" class="item-btn btn" @click="openMeeting(tableData[0].meetingId)">进入会议</div>
        <div v-if="title !== '一对一辅导' && tableData.length > 0 && !hasMeeting(tableData[0].startTime, tableData[0].endTime)" class="item-btn btn gray">进入会议</div>
       </template>
    </div>
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
import { baseRequest } from '@/api/base'
import { dateFormat } from '@/utils/dateUtil'
import VueQr from 'vue-qr'
export default {
  components: {
    VueQr
  },
  props: {
    courseId: [String, Number],
    operFlag: Boolean,
    title: {
      type: String,
      default: ''
    },
    startDate: String,
    endDate: String,
    tableData: Array
  },
  data() {
    return {
      stuIds: [],
      checks: [],
      resultVisible: false,
      code: '',
      meetingId: null
    }
  },
  computed: {
    dateTitle() {
      return dateFormat(this.startDate, 'yyyy-MM-dd') + '~' + dateFormat(this.endDate, 'yyyy-MM-dd')
    },
    flowNodeNo() {
      if (this.tableData && this.tableData.length > 0) {
        return this.tableData[0].flowNodeNo
      } else {
        return null
      }
    }
  },
  watch: {
    tableData: {
      handler() {
        this.checkData()
      },
      immediate: true
    }
  },
  created() {
    this.resultVisible = false
  },
  mounted() {},
  methods: {
    checkData() {
      this.checks = []
      this.$nextTick(_ => {
        this.tableData.forEach(row => {
          if (row.attendFlag === '1') {
            this.checks.push(row.userId)
            this.$refs.table.toggleRowSelection(row)
          }
        })
      })
    },
    selectable(row, index) {
      return row.attendFlag !== '1'
    },
    computedTime(row) {
      const startTime = dateFormat(row.startTime, 'yyyy-MM-dd hh:mm')
      const endTime = dateFormat(row.endTime, 'hh:mm')
      return startTime + '~' + endTime
    },
    handleSelectionChange(val) {
      this.stuIds = val.filter(d => d.attendFlag === '0')
        .map(d => d.userId)
    },
    submit() {
      if (this.stuIds.length === 0) {
        this.$Message.warning('请勾选出席学员')
        return
      }
      const existNoEnd = this.stuIds.some(userId => {
        const it = this.tableData.find(item => item.userId === userId)
        let endTime = it.endTime
        endTime = new Date(endTime).getTime()
        const current = new Date().getTime()
        return current < endTime
      })
      if (existNoEnd) {
        this.$Message.warning('所选学员中存在未结束的辅导，请重新选择')
        return
      }
      this.$confirm('确定出席么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          courseId: this.courseId,
          flowNodeNo: this.flowNodeNo,
          stuIds: this.stuIds
        }
        baseRequest('/course/firstStepCoach/setStuAttend', param)
          .then(response => {
            this.$Message.success('操作成功')
            this.$emit('refresh')
          })
      })
    },
    // 是否进入会议
    hasMeeting(startTime, endTime) {
      const start = new Date(startTime.replace(/-/g, '/')).getTime()
      const end = new Date(endTime.replace(/-/g, '/')).getTime()
      const now = new Date().getTime()
      return now >= start - 5 * 60000 && now <= end + 5 * 60000
    },
    openMeeting(meetingId) {
      this.meetingId = meetingId
      baseRequest('/course/mettings/getMeeting', { meetingId })
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
  .attend {
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
    .course-table {
      margin: 14px 0;
    }
    .course-menu {
      direction: rtl;
      .item-btn {
        width: 90px;
        line-height: 30px;
        display: inline-block;
        background-color: #00afff;
        color: #ffffff;
        border-radius: 4px;

        &.gray {
          color: #ffffff;
          background-color: #cccccc;
        }
      }
    }
  }

  .meeting-btn {
    display: inline-block;
    margin-left: 50px;
    width: 90px;
    line-height: 30px;
    display: inline-block;
    background-color: #00afff;
    color: #ffffff;
    border-radius: 4px;

    &.gray {
      color: #ffffff;
      background-color: #cccccc;
    }
  }

  .btn {
    text-align: center;
    user-select: none;
    cursor: pointer;
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

