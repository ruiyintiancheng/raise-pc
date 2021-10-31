/** 1对1辅导 */
<template>
  <div class="student-tab">
    <template v-if="operFlag">
      <div v-if="list.length < sNum" class="menu-add btn" @click="addRow">添加</div>
      <div v-else class="menu-add btn gray">添加</div>
    </template>
    <ul class="tab-list">
      <li v-for="(item, i) in list" :key="i" class="tab-item clearfix">
        <div class="tab-item-left cloum c1">{{dateTitle(i)}}</div>
        <div class="tab-item-left cloum c2">学员：{{ item.userName}}</div>
        <div class="tab-item-left cloum c3" :title="item.loginName||''">手机号/邮箱：{{item.loginName}}</div>
        <div class="tab-item-left cloum c4">
          <template v-if="operFlag">
            <div v-if="canUpdate(item)" class="item-btn btn" @click="updateRow(item)">修改</div>
            <div v-else class="item-btn btn gray" >修改</div>
          </template>
        </div>
      </li>
    </ul>
    <oneone-form ref="form" @refresh="refresh" :course-id="courseId" :one-date="startDate" />
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { dateFormat } from '@/utils/dateUtil'
import oneoneForm from './oneone-form.vue'
export default {
  components: {
    oneoneForm
  },
  props: {
    courseId: [String, Number],
    startDate: String,
    sNum: [String, Number],
    operFlag: Boolean
  },
  data() {
    return {
      list: []
    }
  },
  computed: { },
  created() {
    this.searchOptions()
  },
  mounted() { },
  methods: {
    searchOptions() {
      const param = {
        courseId: this.courseId
      }
      baseRequest('/course/firstStepCoach/getPlanList', param).then(response => {
        this.list = response.data.item
      })
    },
    addRow() {
      this.$refs.form.openDialog()
    },
    updateRow(row) {
      this.$refs.form.openDialog(row)
    },
    canUpdate(item) {
      const rowDate = new Date(item.startTime.replace(/-/g, '/')).getTime() - 86400000
      const tDate = new Date().getTime()
      return parseInt(item.updateCount) < 1 && rowDate > tDate
    },
    dateTitle(index) {
      const startDate = this.list[index].startTime
      const endDate = this.list[index].endTime
      return dateFormat(startDate, 'yyyy年MM月dd日 hh:mm') + '—' + dateFormat(endDate, 'hh:mm')
    },
    refresh() {
      this.searchOptions()
    }
  }
}
</script>

<style lang="scss" scoped>
.student-tab {
  position: relative;
  .menu-add {
    position: absolute;
    top: -64px;
    right: 0;
    width: 80px;
    line-height: 40px;
    color: #ffffff;
	  background-color: #00afff;
    border-radius: 4px;
    font-family: PingFangSC-Regular;
	  font-size: 16px;
  }
  .tab-list {
    color: #222222;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #222222;
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
        width: 440px;
        margin: 42px 0;
        font-size: 16px;
      }
      .cloum.c2 {
        width: 150px;
        margin: 42px 0;
        font-size: 18px;
      }
      .cloum.c3 {
        width: 250px;
        margin: 42px 0;
        font-size: 18px;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      }
      .cloum.c4 {
        margin: 35px 0;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        .item-btn {
          width: 50px;
          line-height: 30px;
          background-color: #00afff;
          border-radius: 4px;
          
        }
      }
    }
  }
  .btn {
    text-align: center;
    user-select: none;
    cursor: pointer; 
    &.gray {
      color: #ffffff !important;
      background-color: #cccccc !important;
    }
  }
}
</style>

