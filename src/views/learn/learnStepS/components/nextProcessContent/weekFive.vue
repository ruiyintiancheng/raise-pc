<template>
    <div class="next-process-content">
        <!-- <div class="next-process-item weight">第六周学习流程</div> -->
        <div class="next-process-item">
          <div class="next-process-title">
              第六周小组辅导时间：<b>{{oneFourTime}}</b>
          </div>
            <div class="next-process-title">
            <span class="cored">特别注意：</span>所有你已经选定的辅导时间无法在系统里做变更！请务必提前安排好时间。
          </div>
          <!-- <div class="next-process-text">
              <p class="weight">
              {{oneFourTime}}
              </p>
          </div> -->
        </div>
        <div class="next-process-item">
          <div class="next-process-title">
              恭喜你进入第六周的学习！本周通过重温学习要点来盘点学习收获并和组员们一同庆祝成功。
          </div>
          <div class="next-process-text">
            <p>学习提示：</p>
              <p>● 请花一点时间回顾过往五周的学习内容，建议根据要点重读以往的学习资料，建立起完整的思维框架。</p>
              <p>● 本周将再次结合《自我评估表》进行评估，对照之前完成的情况，看看自己已经发生的改变，从而重新思考所面对的挑战，使用目标规划·SP系统持续培养有效的目标设定习惯。</p>
              <p>● 请务必按提示时间点击链接进入小组辅导，在小组中分享彼此的学习反思和实践经验。</p>
              <p>● 最后不要忘记按时提交整体学习评估，获得结业证书。</p>
          </div>
        </div>
          <div class="next-process-item">
            <div class="next-process-text">
                <p>
               请按照阅读资料和系统提示的内容完成实际操作。
                </p>
            </div>
         </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
export default {
  props: {
    oneOneTime: String,
    oneFourTime: String,
    courseId: [String, Number]
  },
  data() {
    return {
      dialogVisible: false,
      planId: null,
      timeArr: []
    }
  },
  methods: {
    openDialog() {
      baseRequest('/course/firstStep/getNoSetCoachPlan', { courseId: this.courseId }).then(response => {
        const timeArr = response.data.item
        if (timeArr && timeArr.length > 0) {
          for (const iterator of timeArr) {
            const startTime = iterator.startTime || ''
            const endTime = iterator.endTime || ''
            if (startTime) {
              iterator.optionName = parseTime(startTime.substring(0, 10), '{y}年{m}月{d}日') + ' ' + startTime.substring(11, 16) + '~' + endTime.substring(11, 16)
            } else {
              iterator.optionName = ''
            }
            this.dialogVisible = true
          }
          this.planId = null
          this.timeArr = timeArr
          console.log(this.timeArr)
        } else {
          this.$Message.warning('暂无可选辅导时间')
        }
      })
    },
    saveHandle() {
      baseRequest('/course/firstStep/stuSetCoachPlan', { planId: this.planId }).then(response => {
        this.$Message.success('保存成功')
        this.dialogVisible = false
        this.$emit('getData')
      })
    }
  }
}
</script>