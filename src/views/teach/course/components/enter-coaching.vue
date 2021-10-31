<template>
  <div class="enter-coaching">
        <el-table
          class="table-main"
          :data="tableData"
          border
          style="width: 100%">
            <el-table-column
            label="学员姓名"
            align="left" 
            prop="studentName">
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
               {{
                 parseTime( new Date(parseInt(new Date(scope.row.startTime.replace(/-/g, '/')) - 5*60*1000)),'{y}-{m}-{d} {h}:{i}:{s}')
                }} 
              </template>
            </el-table-column>
            <el-table-column
            label="操作"
            prop=""
            align="center"
             >
             <template v-if="scope.row.startTime" slot-scope="scope">
               <el-button type="primary" size="mini" :disabled="!hasMeeting(scope.row.startTime,scope.row.endTime)" @click="openMeeting(scope.row.planId)">进入会议</el-button>
               <el-button type="primary" size="mini" :disabled="!canUpdate(scope.row)" @click="selectScore(scope.row)">教练测评</el-button>
               <!-- <el-button type="primary" size="mini" @click="selectScore(scope.row)">教练测评</el-button> -->
               <el-dialog
                  append-to-body
                  title="教练测评"
                  :visible.sync="formVisible"
                  class="dialog-main heightauto"
                  top="5%"
                  width="1000px"
                  destroy-on-close
                  :close-on-click-modal="false"
                  >
                    <!-- <el-rate v-model="formLabelAlign.scoreValue"></el-rate> -->

                    <el-form label-position="top" label-width="80px" :model="formLabelAlign">
                      <el-form-item :label="comments[0].content">
                        <el-rate disabled v-model="formLabelAlign.scoreValue"></el-rate>
                      </el-form-item>
                      <el-form-item :label="comments[1].content">
                        <el-input disabled type="textarea" v-model="formLabelAlign.answerOne" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider style="border-top: 1px dashed #e8eaec;margin: 8px 0;background: 0 0;"></el-divider>
                      <el-form-item :label="comments[2].content">
                        <el-input disabled type="textarea" v-model="formLabelAlign.answerTwo" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider ></el-divider>
                      <el-form-item :label="comments[3].content">
                        <el-input disabled type="textarea" v-model="formLabelAlign.answerThree" rows="3" resize="none" maxlength="200" show-word-limit></el-input>
                      </el-form-item>
                      <el-divider></el-divider>
                    </el-form>

                    <span slot="footer">
                      <el-button @click="formVisible = false">取 消</el-button>
                      <el-button :loading="loading" type="primary" v-show="confirmShow">确 定</el-button>
                    </span>
                  </el-dialog>
             </template>
            </el-table-column>
      </el-table>
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
import { parseTime } from '@/utils'
import VueQr from 'vue-qr'
export default {
  components: {
    VueQr
  },
  props: {
    recordId: [String, Number],
    operFlag: Boolean
  },
  data() {
    return {
      parseTime,
      tableData: null,
      resultVisible: false,
      code: '',
      formLabelAlign: {
        scoreValue: null,
        answerOne: '',
        answerTwo: '',
        answerThree: ''
      },
      formVisible: false,
      confirmShow: false,
      loading: false,
      sysTime: null,
      comments: []
    }
  },
  methods: {
    rwQuestionBank() {
      // 查询问题-公共接口
      baseRequest('/course/rwQuestionBank/selects', { kinds: 'coachMeeting', kindsTwo: '1' }).then(response => {
        console.log(response)
        this.comments = response.data.item
      })
    },
    canUpdate(item) {
      // const rowDate = new Date(item.startTime.replace(/-/g, '/')).getTime() - 86400000
      // const rowDate = new Date(item.startTime.replace(/-/g, '/')).getTime()
      // const tDate = new Date().getTime()
      // return item.updateCount != null && rowDate > tDate
      return item.answer != null
    },
    // 是否进入会议
    hasMeeting(startTime, endTime) {
      const start = new Date(startTime.replace(/-/g, '/')).getTime()
      const end = new Date(endTime.replace(/-/g, '/')).getTime()
      // const now = new Date('2021-08-19 22:55:00').getTime()
      // return now >= start - 5 * 60000 - 24 * 60 * 60 * 1000 && now <= end + 5 * 60000 - 24 * 60 * 60 * 1000
      this.getStatus()
      return this.sysTime >= start - 5 * 60000 && this.sysTime <= end + 5 * 60000
    },
    openMeeting(planId) {
      this.planId = planId
      // 获取视频会议信息-公共接口教练
      baseRequest('/course/coaches/getMeetingInfoCoach', { planId })
        .then(response => {
          this.code = response.data.item.startUrl
          this.resultVisible = true
        })
    },
    goMeeting() {
      window.open(this.code)
      this.resultVisible = false
    },
    // 查询教练测评
    selectScore(row) {
      this.formVisible = true
      baseRequest('/course/coachScore/selectScore', { planId: row.planId }).then(response => {
        if (response.data.item.length === 0) {
          this.$Message.info('学员暂未进行测评')
        } else {
          response.data.item.forEach((val, index) => {
            if (val.orderId === 1) {
              this.formLabelAlign.scoreValue = parseInt(val.answer)
            } else if (val.orderId === 2) {
              this.formLabelAlign.answerOne = val.answer
            } else if (val.orderId === 3) {
              this.formLabelAlign.answerTwo = val.answer
            } else if (val.orderId === 4) {
              this.formLabelAlign.answerThree = val.answer
            }
          })
        }
      })
    },
    // 获取进入会议列表
    queryCourseList() {
      const params = {
        recordId: this.recordId
      }
      baseRequest('/course/coaches/getOrderRecordPlanList', params).then(response => {
        if (response.msg === 'Success') {
          this.tableData = response.data.item
          console.log(this.tableData)
        } else {
          this.$Message.info('暂无数据')
        }
      })
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
    tableHight() {
    //   return this.$store.state.app.containHeight - 402
    }
  },
  mounted() {
    // this.selectScore()
  },
  created() {
    this.getStatus()
    this.queryCourseList()
    this.rwQuestionBank()
  }

}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
    display: block;
    // height: 1px;
    width: 100%;
    margin: 24px 0;
    border: 1px dashed #DCDFE6;
}
.el-divider {
  background-color: #ffffff;
}
.enter-coaching{
  margin-top: 30px;
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