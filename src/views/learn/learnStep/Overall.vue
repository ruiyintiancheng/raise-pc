<template>
    <!-- 整体评估 -->
    <div class="overall" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="scrollbar-box">
            <div class="feedback-item" v-for="(iterator,i) in questions" :key="iterator+i">
              <div class="feedback-label">{{i+1}}. {{iterator.content}}</div>
                <el-input
                    type="textarea"
                    :disabled="!isNewest"
                    :rows="4"
                    maxlength="200"
                    v-model.trim="iterator.answer"
                    show-word-limit
                    placeholder="">
                </el-input>
                <div class="fb-line" ></div>
           </div>
           <div class="feedback-item">
              <div class="feedback-label">{{questions.length+1}}. 是否匿名引用</div>
                <el-radio :disabled="!isNewest" v-model="openFlag" label="1">是</el-radio>
                <el-radio :disabled="!isNewest" v-model="openFlag" label="0">否</el-radio>
                <div class="fb-line" ></div>
            </div>
           </div>
           <div class="feedback-item" v-if="coachFeedback" style="margin-right:30px;">
              <div class="feedback-label">教练反馈</div>
                <el-input
                    type="textarea"
                    disabled
                    :rows="4"
                    maxlength="200"
                    v-model.trim="coachFeedback"
                    show-word-limit
                    placeholder="">
                </el-input>
           </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean
  },
  data() {
    return {
      updateStatus: false,
      questions: [],
      openFlag: '0',
      coachFeedback: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/rwPAllLearnAssess/selectAllLearnAssess', { courseId: this.courseId }).then(response => {
        this.questions = response.data.item.dataList
        this.openFlag = response.data.item.openFlag || '0'
        this.coachFeedback = response.data.item.coachFeedback
      })
    },
    judgement() {
      let compelete = true
      for (const iterator of this.questions) {
        if (!iterator.answer && iterator.content.indexOf('其它反馈') === -1) {
          compelete = false
          this.$Message.warning('请完整填写整体评估')
          break
        }
      }
      return compelete
    },
    /**
     * 这里用promise做异步
     */
    saveData(isPublish) {
      return new Promise((resolve, reject) => {
        if ((isPublish === '0' || this.judgement()) && this.questions.length > 0) {
          const answerArray = []
          for (const iterator of this.questions) {
            answerArray.push({
              'id': iterator.id,
              'answer': iterator.answer
            })
          }
          const params = {
            answerArray,
            courseId: this.courseId,
            openFlag: this.openFlag,
            isPublish
          }
          baseRequest('/course/rwPAllLearnAssess/addAllLearnAssess', params).then(response => {
            resolve()
          })
        } else {
          reject()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.overall{
    position: relative;
    padding:30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
    overflow: auto;
    padding-right: 0;
    /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner{
        border-color: #409EFF;
        background: #409EFF;
        &::after{
            background-color: #fff;
        }
    }
     /deep/  .el-radio__input.is-disabled+span.el-radio__label {
        color: #222222;
        cursor: not-allowed;
    }
    /deep/ .el-textarea.is-disabled .el-textarea__inner {
         color: #222222;
    }
    .update-btn{
        position: absolute;
        top:30px;
        right: 30px;
        z-index: 1;
        opacity: 0.8;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .feedback-item{
        font-size: 14px;
        color: #222222;
        .feedback-label{
            margin-bottom: 2px;
        }
        .fb-line{
            height: 1px;
            border: dashed 1px #ddd;
            margin: 20px 0;
        }
        .feedback-options{
            margin:15px;
            .feedback-option{
                margin-right: 100px;
                // cursor: pointer;
                &.active{
                    color:#00afff;
                }
            }
            /deep/.el-radio{
                margin-right: 0px;
                color: #222;
            }
            .el-radio__input.is-checked+.el-radio__label{
                color: #222;
            }
            .feedback-input{
                display: inline-block;
            }
        }
    }
}
</style>