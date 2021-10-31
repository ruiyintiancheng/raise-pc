/** 课程进度 */
<template>
  <div class="step-dialog">
    <el-dialog
      append-to-body
      :visible.sync="visible"
      class="dialog-main"
      top="5%"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false">
      <template slot="title">
        <div class="course-title">
          <span class="bold">学员列表</span>
        </div>
      </template>
      <ul class="tab-list">
        <li v-for="item in list" :key="item.userId" class="tab-item clearfix">
          <div class="tab-item-left cloum c1" :title="item.userName+'('+(item.loginName||'')+')'">{{item.userName+'('+(item.loginName||'')+')'}}</div>
          <div v-if="item.recordTime" class="tab-item-left cloum c2">{{ parseTime(item.recordTime, '{y}年{m}月{d}日')}}</div>
        </li>
      </ul>
      <span slot="footer">
        <el-button  @click="visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
export default {
  components: {},
  props: {},
  data() {
    return {
      parseTime,
      visible: false,
      list: []

    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      const param = {
        courseId: row.courseId
      }
      baseRequest('/course/firstStepCoach/getCourseProcessList', param)
        .then(response => {
          this.list = response.data.item
          this.visible = true
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
        margin: 20px 0;
        overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
      }
      .cloum.c2 {
        margin: 20px 0;
      }
    }
    :first-child {
      margin-top: 0;
    }
  }
</style>