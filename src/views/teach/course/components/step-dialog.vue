/** 课程进度 */
<template>
  <div class="step-dialog">
    <el-dialog
      append-to-body
      :visible.sync="visible"
      class="dialog-main"
      top="5%"
      width="650px"
      destroy-on-close
      :close-on-click-modal="false">
      <template slot="title">
        <div class="course-title">
          <span class="bold">{{title}}</span>
          <span>{{dateTitle}}</span>
        </div>
      </template>
      <div v-if="visible" class="step-body">
        <ul class="step-processInfo">
          <li class="item clearfix" v-for="(item, i) in processInfo" :key="i">
            <div class="content"><svg-icon class="icon" icon-class="icon-mark-green" /> {{item.flowNodeName}}</div>
            <div class="date">{{dateFormat(item.recordTime, 'yyyy年MM月dd日 hh:mm')}}</div>
            <div class="date" v-if="(item.flowNodeNo ===7 || item.flowNodeNo ===14) && item.isOpen === '1'"><el-button @click="checTzkDetail(item)" type="primary" size="mini">查看详情</el-button></div>
          </li>
        </ul>
        <div class="line-dashed" />
        <template >
        <div class="step-title">学员反馈表</div>
        <ul v-if="this.dataList && this.dataList.length > 0" 
          class="step-quest-list">
          <li class="item" v-for="(item,i) in dataList" :key="i">
            <template v-if="item.qType === '3'">
              <div class="quest">{{`${item.orderId}、${item.content}`}}</div>
              <p class="answer blue">{{item.answer}}</p>
            </template>
            <template v-if="item.qType === '5'">
              <span>{{`${item.orderId}、`}}</span>
              <div class="item-select">
                <div v-for="(d, j) in item.children" :key="j">
                  <div>{{d.content}}</div>
                  <div class="clearfix">
                    <div v-for="(select, k) in d.children" :key="k" 
                       style="float: left; margin-right: 50px;"
                       :class="{blue: answerMap.get(item.id + '-' + d.id) === ''+ select.id}">
                      <span>{{String.fromCharCode(65 + k)}}、{{select.content}}</span>
                      <template v-if="select.children && select.children.length > 0">
                        <span v-for="fill in select.children" :key="fill.id">
                          <span>，{{fill.content}}</span>
                          <u v-if="answerMap.has(item.id + '-' + fill.id)">{{answerMap.get(item.id + '-' + fill.id)}}</u>
                          <u v-else>&nbsp;&nbsp;&nbsp;&nbsp;</u>
                        </span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </li>
        </ul>
        <div class="line-dashed" />
        </template>
        <div class="step-title">教练评价</div>
        <div style="margin-bottom: 14px;">
          <span>发放积分奖励：</span>
          <el-radio-group v-model="cardFlag">
            <el-radio :disabled="disabled" label="1">是</el-radio>
            <el-radio :disabled="disabled" label="0">否</el-radio>
          </el-radio-group>
        </div>
        <el-input v-model="coachFeedback" 
          :disabled="disabled"
          maxlength="200"
          show-word-limit
          :autosize="{ minRows: 4}" type="textarea" 
          placeholder="请输入教练评价" />
      </div>
      <span slot="footer" v-if="operFlag">
        <el-button  @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      append-to-body
      :visible.sync="tzDialog"
      class="dialog-main no-footer"
      top="5%"
      width="750px"
      destroy-on-close
      :title="detailItem.flowNodeName"
      :close-on-click-modal="false">
      <template >
              <div class="challenge-head">
                  <p><strong>挑战</strong></p>
              </div>
                <el-table
              class="table-main"
                :data="tableDataOne"
                border
                default-expand-all
                style="width: 100%">
                  <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                prop="content"
                align="left"
                label="挑战"
                show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <div class="fg-line"></div>
          </template>
          <div class="challenge-head" style="margin-top:20px;">
              <p><strong>为改善设立目标</strong></p>
          </div>
          <el-table
            class="table-main"
              :data="tableDataTwo"
              border
              default-expand-all
              style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="80">
              </el-table-column>
              <el-table-column
              prop="content"
              align="left"
              label="目标"
              show-overflow-tooltip>
              </el-table-column>
          </el-table>
      </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { dateFormat } from '@/utils/dateUtil'
export default {
  components: {

  },
  props: {
    label: {
      type: String,
      default: ''
    },
    operFlag: {
      type: Boolean,
      default: false
    },
    weekNO: Number
  },
  data() {
    return {
      dateFormat,
      visible: false,
      weeks: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'],
      startDate: '',
      endDate: '',
      processInfo: [],
      dataList: [],
      answerMap: null,

      coachFeedback: '',
      coachFeedback_: '',
      cardFlag: '0',
      courseId: null,
      studentId: null,
      tzDialog: false,
      detailItem: {},
      tableDataOne: [
      ],
      tableDataTwo: [
      ]
    }
  },
  computed: {
    title() {
      return `${this.weeks[this.weekNO]}课程进度`
    },
    dateTitle() {
      const format = 'yyyy年MM月dd日'
      return dateFormat(this.startDate, format) + '~' + dateFormat(this.endDate, format)
    },
    disabled() {
      if (this.coachFeedback_ && this.coachFeedback_.trim() !== '') {
        return true
      }
      return false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      if (row) {
        this.courseId = row.courseId
        this.studentId = row.userId
      }
      const param = {
        courseId: row.courseId,
        studentId: row.userId,
        week: this.weekNO + 1
      }
      baseRequest('/course/firstStepCoach/getStuProcessInfo', param).then(response => {
        const item = response.data.item
        this.dataList = item.dataList
        this.startDate = item.startDate
        this.endDate = item.endDate
        this.processInfo = item.processInfo
        this.coachFeedback = item.coachFeedback
        this.coachFeedback_ = item.coachFeedback
        this.cardFlag = item.cardFlag || '0'
        this.visible = true

        this.handleAnswer()
      })
    },
    handleAnswer() {
      const map = new Map()
      this.dataList.filter(d => {
        return d.children && d.children.length > 0
      })
        .forEach(d => {
          const answers = JSON.parse(d.answer)
          answers.forEach(answer => {
            map.set(d.id + '-' + answer.id, answer.answer)
          })
        })
      this.answerMap = map
    },
    submit() {
      if (this.disabled) {
        this.visible = false
        return
      }

      this.$confirm('确定提交评价么，提交后不可更改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          courseId: this.courseId,
          week: this.weekNO + 1,
          studentId: this.studentId,
          content: this.coachFeedback,
          cardFlag: this.cardFlag
        }
        baseRequest('/course/firstStepCoach/saveCoachFeedback', param).then(response => {
          this.$Message.success('操作成功')
          this.visible = false
        })
      })
    },
    checTzkDetail(item) {
      baseRequest('/course/firstStepCoach/selectChallenge', { courseId: this.courseId, weeks: this.weekNO + 1, userId: this.studentId }).then(response => {
        this.tableDataOne = []
        this.tableDataTwo = []
        const tempList = response.data.item || []
        for (const iterator of tempList) {
          if (iterator.type === '1') {
            this.tableDataOne.push({
              content: iterator.content || ''
            })
          } else if (iterator.type === '2') {
            this.tableDataTwo.push({
              content: iterator.content || ''
            })
          }
        }
        if (this.tableDataOne.length === 0) {
          this.tableDataOne.push({
            content: ''
          })
        }
        if (this.tableDataTwo.length === 0) {
          this.tableDataTwo.push({
            content: ''
          })
        }
        this.detailItem = item
        this.tzDialog = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .challenge-head{
    font-size: 18px;
    font-weight: bold;
    height: 30px;
  }
  .course-title {
    color: #222222;
    font-size: 14px;
    font-weight: 400;
    .bold {
      font-weight: bold;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      margin-right: 10px;
    }
  }
  .step-body {
    color: #222222;
  }
  .step-title {
    margin-bottom: 14px;
  }
  .step-processInfo {
    .item {
      margin-bottom: 20px;
      height: 28px;
      line-height: 28px;
      .icon {
        // float: left;
        margin-right: 10px;
      }
      .content {
        float: left;
        // margin-left: 20px;
        min-width: 200px;
      }
      .date {
        float: left;
        margin-left: 20px;
      }
    }
  }
  .step-quest-title {
    margin-bottom: 14px;
  }
  .step-quest-list {
    /deep/ .clearfix {
      &:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
      }
    }

    .item {
      margin-bottom: 5px;
      line-height: 150%;
      
      /deep/ .item-select {
        margin-top: -1.4em;
        margin-left: 1.5em;
      }
      /deep/ .answer {
        display: block;
        text-indent: 1.5em;
      }
      /deep/ .blue {
        color: #00afff;
      }
    }
  }
  
  .line-dashed {
    margin: 30px 0;
    display: block;
    height: 0;
    border-top: 1px dashed #aaaaaa;
  }
</style>