/** 学习进度 */
<template>
  <div class="student-tab">
    <ul class="tab-list">
      <li v-for="(item, i) in list" :key="i" class="tab-item clearfix">
        <div class="tab-item-left cloum c1" :title="item.userName+'('+(item.loginName||'')+')'">{{item.userName+'('+(item.loginName||'')+')'}}</div>
        <div v-if="item.recordTime" class="tab-item-left cloum c2">{{ parseTime(item.recordTime, '{y}年{m}月{d}日')}}</div>
        <div class="tab-item-right cloum c3">
          <template v-for="week in 6">
            <div v-if="week === parseInt(item.flowId) && item.isLast !== '1'"  @click="openDialog(item, week - 1)"
              class="cloum-btn running" :key="week">
              {{weeks[week - 1]}}
            </div>
            <div v-else-if="week > parseInt(item.flowId)"
              class="cloum-btn start" :key="week">
              {{weeks[week - 1]}}
            </div>
            <div v-else 
              class="cloum-btn end" :key="week" @click="openDialog(item, week - 1)">
              {{weeks[week - 1]}}
            </div>
          </template>
        </div>
      </li>
    </ul>
    <step-dialog ref="step" :operFlag="operFlag" :weekNO="weekNO" />
  </div>
</template>

<script>
import stepDialog from './step-dialog'
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
export default {
  components: {
    stepDialog
  },
  props: {
    courseId: [String, Number],
    operFlag: Boolean
  },
  data() {
    return {
      parseTime,
      list: [],
      weeks: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'],
      weekNO: null
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
      baseRequest('/course/firstStepCoach/getCourseProcessList', param).then(response => {
        this.list = response.data.item
      })
    },
    openDialog(row, week) {
      this.weekNO = week
      this.$nextTick(_ => {
        this.$refs.step.openDialog(row)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
        width: 216px;
        margin: 42px 0;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      }
      .cloum.c2 {
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

