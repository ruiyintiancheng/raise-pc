<template>
  <div class="course-booking">
    <ul class="tab-list">
      <li class="tab-item clearfix" v-for="(val,index) in courseList" :key="index">
        <div class="tab-item-left cloum c1" v-if="val.startTime">{{parseTime(val.startTime, '{y}年{m}月{d}日')}} {{val.startTime.slice(11,16)}}—{{val.endTime.slice(11,16)}}</div>
        <div class="tab-item-left cloum c1" v-else></div>
        <div class="tab-item-left cloum c2">学员：{{val.userName}}</div>
        <div class="tab-item-left cloum c4">
            手机号或邮箱号：{{val.loginName}}
        </div>
        <div class="tab-item-right cloum c3">
            <el-button 
            :type="val.updateCount===1?'info':'primary'" @click="yuyueHandle(val)" 
            style="width:100px" 
            v-if="val.startTime"
            v-show="showyuyueBtn"
            :disabled="sysTime >= new Date(val.endTime.replace(/-/g, '/')).getTime()">
            修改
            </el-button>
            <el-button type="primary" @click="yuyueHandle(val)" style="width:100px" v-else v-show="showyuyueBtn">预约</el-button>
        </div>
      </li>
    </ul>
    <edit-appointment-form ref="strengthenOneoneForm" :courseId="id" :endDate="endDate" :item="item" @getData="getData"></edit-appointment-form>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
import editAppointmentForm from './edit-appointment-form'
export default {
  components: {
    editAppointmentForm
  },
  props: {
    recordId: [String, Number],
    id: [String, Number],
    startDate: String,
    endDate: String,
    sNum: [String, Number]
  },
  data() {
    return {
      parseTime,
      courseList: null,
      multipleSelection: null,
      item: null,
      typeState: 'primary',
      operFlag: null,
      showFlag: null,
      sysTime: null,
      showyuyueBtn: true
    }
  },
  methods: {
    getData() {
      this.queryCourseList()
    },
    //   获取获取课程预约列表
    queryCourseList() {
      const params = {
        recordId: this.recordId
      }
      baseRequest('course/oneToOne/getOneToOneById', params).then(response => {
        if (response.msg === 'Success') {
          this.courseList = response.data.item
          this.multipleSelection = this.courseList
        } else {
          this.$Message.info('暂无数据')
        }
      })
    },
    // 进入页面权限(教练)
    getCoachInfo() {
      baseRequest('/course/firstStepCoach/oneToOnePermissionByCoach', { recordId: this.recordId }).then(response => {
        this.operFlag = response.data.item.operFlag
        this.showFlag = response.data.item.showFlag
        if (this.showFlag === false) {
          this.$router.push('/')
        }
        if (this.operFlag === false) {
          this.showyuyueBtn = false
        }
      })
    },
    yuyueHandle(item) {
      this.item = item
      if (this.operFlag === false) {
        this.$Message.info('您无权限操作')
      } else if (item.updateCount === 0 || item.updateCount === null) {
        this.$refs.strengthenOneoneForm.openDialog()
      }
    },
    getStatus() {
      // 获取系统时间
      baseRequest('/course/firstStep/getSysTime').then(response => {
        const sysTime = new Date(response.data.item.sysTime.replace(/-/g, '/')).getTime()
        this.sysTime = sysTime
      })
    }
  },
  computed: {
    dateTitle() {
      return parseTime(this.startDate, '{y}年{m}月{d}日') + '~' + parseTime(this.endDate, '{y}年{m}月{d}日')
    }
  },
  created() {
    this.getStatus()
    this.queryCourseList()
    this.getCoachInfo()
  }
}
</script>

<style lang="scss" scoped>
.row-card-list{
    margin-top: 20px;
    line-height: 35px;
    display: flex;
    flex-wrap: wrap;
    height: 60px;
    .course-btn{
        text-align: right;
    }
    .el-card{  
        min-width: 100%;
        height: 100%;
    }
}

  .tab-list {
    color: #222222;
    font-family: PingFangSC-Semibold;
	font-size: 16px;
    .tab-item {
      position: relative;
      height: 100px;
      background-color: #ffffff;
      box-shadow: 0px 2px 10px 0px 
        rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      border: solid 1px #eeeeee;
      margin: 24px 0;
      padding: 0 44px;

      .tab-item-left {
        float: left;
      }
      .tab-item-right {
        float: right;
      }
      .cloum.c1 {
        width: 400px;
        margin: 42px 0;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      }
      .cloum.c2 {
        margin: 42px 0;
        width: 200px;
      }
      .cloum.c4 {
        margin: 42px 0;
      }
      .cloum.c3 {
        margin: 32px 0;
        .cloum-btn {
          width: 100px;
          line-height: 36px;
          margin-left: 24px;
          float: left;
          text-align: center;
          font-family: PingFangSC-Regular;
          color: #00afff;
          background-color: #e5f7ff;
          border-radius: 18px;
          user-select: none;
          cursor: pointer;

          &.end {
            color: #ffffff;
            background-color: #00afff;
          }
          &.running {
            color: #00afff;
            background-color: #e5f7ff;
          }
          &.start {
            color: #ffffff;
            background-color: #cccccc;
          }
        }
      }
    }
  }

</style>