<template>
    <!-- 学员反馈 -->
    <div class="feedback" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
           <div class="scrollbar-box">
           <div class="feedback-item" v-for="(iterator,i) in questions" :key="iterator+i">
               <template v-if="iterator.qType === '3'">
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
               </template>
               <template v-if="iterator.qType === '5'">
                   <div class="mix-box" v-for="(question,index) in iterator.children" :key="question+index">
                       <div class="feedback-label">
                           <span v-if="index === 0">{{i+1}}. </span>
                           <span v-else>&nbsp;&nbsp;</span>
                           {{question.content}}
                        </div>
                       <div class="feedback-options clearfix">
                           <div class="feedback-option fl"  v-for="(option,index) in question.children" :key="option+index">
                               <!-- <span class="feedback-option-text">{{String.fromCharCode(65 +index)+'. '+option.content}}</span> -->
                               <el-radio :disabled="!isNewest" v-model="question.answer" :label="option.id">{{option.content}}</el-radio>
                               <template v-if="option.children">,
                                   <div class="feedback-input" v-for="(input,index) in option.children" :key="input+index">
                                       <span>{{input.content}}:</span>
                                       <el-input :disabled="!isNewest" v-model.trim="input.answer" style="width:255px;margin:0 10px;"></el-input>
                                   </div>
                               </template>
                           </div>
                       </div>
                   </div>
               </template>
                <div class="fb-line" v-if="i !== questions.length-1 || coachFeedback"></div>
           </div>
           <template v-if="coachFeedback">
                <div class="feedback-label feedback-coach">教练反馈：</div>
                <el-input
                    disabled
                    type="textarea"
                    :rows="4"
                    v-model.trim="coachFeedback"
                    placeholder="">
                </el-input>
           </template>
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
      coachFeedback: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/rwPStuFeedback/getFeedback', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        const tempList = response.data.item.dataList
        this.coachFeedback = response.data.item.coachFeedback
        for (const iterator of tempList) {
          if (iterator.qType === '5') {
            const answerList = iterator.answer ? JSON.parse(iterator.answer) : []
            for (const question of iterator.children) {
              const answerItem = answerList.find(item => item.id + '' === question.id + '')
              question.answer = answerItem ? Number(answerItem.answer) : null
              if (question.children) {
                for (const option of question.children) {
                  if (option.children) {
                    for (const input of option.children) {
                      const inputItem = answerList.find(item => item.id + '' === input.id + '')
                      input.answer = inputItem ? inputItem.answer : ''
                    }
                  }
                }
              }
            }
          }
        }
        this.questions = tempList
      })
    },
    judgement() {
      let compelete = true
      for (const iterator of this.questions) {
        if (iterator.qType === '3') {
          if (!iterator.answer && iterator.content.indexOf('其它反馈') === -1) {
            compelete = false
            break
          }
        } else if (iterator.qType === '5') {
          for (const question of iterator.children) {
            if (!question.answer && question.answer !== 0) {
              compelete = false
              break
            } else {
              for (const option of question.children) {
                if (option.id === question.answer) {
                  if (option.children) {
                    if (option.children.some(item => !item.answer)) {
                      compelete = false
                      break
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (!compelete) {
        this.$Message.warning('请完成当前反馈')
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
            if (iterator.qType === '3') {
              answerArray.push({
                id: iterator.id,
                answer: iterator.answer
              })
            } else if (iterator.qType === '5') {
              const answerArr = []
              for (const question of iterator.children) {
                answerArr.push({
                  id: question.id,
                  answer: question.answer
                })
                for (const option of question.children) {
                  if (option.id === question.answer) {
                    if (option.children) {
                      for (const input of option.children) {
                        answerArr.push({
                          id: input.id,
                          answer: input.answer
                        })
                      }
                    }
                  }
                }
              }
              answerArray.push({
                id: iterator.id,
                answer: answerArr
              })
            }
          }
          const params = {
            flowNodeNo: this.flowNodeNo,
            courseId: this.courseId,
            answerArray,
            isPublish
          }
          baseRequest('/course/rwPStuFeedback/setFeedback', params).then(response => {
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
.feedback{
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
    .feedback-label{
        margin-bottom: 2px;
        font-size: 14px;
        color: #222222;
        &.feedback-coach{
          border-left: 6px solid #00afff;
          padding-left: 10px;
          height: 17px;
          line-height: 17px;
          margin-bottom: 8px;
        }
      }
    .feedback-item{
        font-size: 14px;
        color: #222222;
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