<template>
    <div class="next-process-content">
        <!-- <div class="next-process-item weight">第二周学习流程</div> -->
        <div class="next-process-item" v-if="!oneOneTime">教练已安排1对1辅导时间，请选择辅导时间。
            <button class="one-button" :disabled="isEx" @click="openDialog()">1对1 辅导</button>
        </div>
        <div class="next-process-item">
          <div class="next-process-title" v-if="oneOneTime">
              1对1辅导时间：<b>{{oneOneTime }}</b>
          </div>
          <div class="next-process-title">
              第二周小组辅导时间：<b>{{oneFourTime }}</b>
          </div>
          <div class="next-process-title">
            <span class="cored">特别注意：</span>所有你已经选定的辅导时间无法在系统里做变更！请务必提前安排好时间。
           </div>
        </div>
        <!-- <div class="next-process-item">
          <div class="next-process-title">
              第二周小组辅导时间：<b>{{oneFourTime }}</b>
          </div>
        </div>
        <div class="next-process-title">
            <span class="cored">特别注意：</span>所有你已经选定的辅导时间无法在系统里做变更！请务必提前安排好时间。
        </div> -->
         <div class="fg-line"></div>

        <!-- <div class="next-process-item">
          <div class="next-process-title">
              第二周小组辅导时间：{{oneFourTime}}
          </div>
        </div> -->
        <div class="next-process-item">
        <div class="next-process-title intent">
            欢迎你进入第二周的学习！第二周是非常关键的一周，我们将一起学习知易行难的S.M.A.R.T.目标。
        </div>
        <div class="next-process-title intent">
            如果你是第一次听说S.M.A.R.T.，那么恭喜你将学习一个设定目标的实用方法。如果你之前听说过，甚至熟悉S.M.A.R.T.，那么请特别关注有何不同。
        </div>
        <div class="next-process-text">
            <p>学习提示：</p>
            <p>● 音频约6分钟。建议听、读学习内容三遍，请特别注意S.M.A.R.T.每个维度的定义，再次提醒这是一个知易行难的工具。</p>
            <p>
            ● 在本周的学习里，我们将开启一次小组辅导和一次1对1的个人辅导，重温和再确认LMI的核心理念，明确何为S.M.A.R.T.，从而在教练的帮助下完成”我的挑战表“，将发现的挑战转化为可以实现的S.M.A.R.T.目标。请务必按照所选定好的时间点击链接进入辅导会议。
            </p>
            <p>
            ●	请提前在PC端和手机端安装好Zoom：https://zoom.com.cn/download，以便顺利进入小组辅导和1-1辅导。
            </p>
            <p>
            ● 完成全部学习内容后，请使用《学员反馈表》做个学习小反思。
            </p>
            <p>
             ● 在完成本周小组辅导和个人辅导后，如仍希望在现有辅导基础上对目标规划达成进行更深入理解践行， <a style="color:#00afff;text-decoration: underline;" @click="$router.push({name:'strengthen'})">“First Step强化辅导”</a>能够支持满足你的进一步需求，欢迎了解！
            </p>
        </div>
        <div class="next-process-title mt20">
            请按照阅读资料和系统提示的内容完成实际操作。
        </div>

        </div>
       
        <div class="process-warning" v-if="!oneOneTime">特别注意：所有你已经选定的辅导时间无法在系统里做变更！请务必提前安排好时间。</div>
        <el-dialog
          title="1对1 辅导时间"
          :visible.sync="dialogVisible"
          class="dialog-main heightauto"
          top="10%"
          width="420px"
          destroy-on-close
          :close-on-click-modal="false"
          >
          <ul class="oneone-times">
            <li v-for="(item,index) in timeArr" :key="item+index">
                <el-radio v-model="planId"  :label="item.planId">{{''}}</el-radio>
                <span class="oneone-time">{{item.optionName}}</span>
            </li>
            <li>
                 <div class="oneone-tip">此辅导时间为教练设置的 1对1 辅导时间。
                    如未有合适时段，请在小组辅导中联系教练更换辅导时间。</div>
            </li>
          </ul>
          <span slot="footer">
            <el-button  @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveHandle" :loading="oneoneLoading">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils'
export default {
  props: {
    oneOneTime: String,
    oneFourTime: String,
    courseId: [String, Number],
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      oneoneLoading: false,
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
          }
          this.dialogVisible = true
          this.planId = null
          this.timeArr = timeArr
          console.log(this.timeArr)
        } else {
          this.$Message.warning('暂无可选辅导时间')
        }
      })
    },
    saveHandle() {
      this.oneoneLoading = true
      this.$confirm('确定选择该一对一辅导时间吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/firstStep/stuSetCoachPlan', { planId: this.planId }).then(response => {
          this.$Message.success('保存成功')
          this.dialogVisible = false
          this.$emit('getData')
        }).finally(_ => {
          this.oneoneLoading = false
        })
      })
    }
  }
}
</script>