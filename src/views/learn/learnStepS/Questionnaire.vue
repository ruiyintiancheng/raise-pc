<template>
    <!-- 打卡问卷 -->
    <div class="questionnaire" >
        <div class="questionnaire-content" :style="{height:materialsHeight+'px'}">
          <el-scrollbar style="height:100%">
              <ul class="question-box">
                  <li class="question-item" v-for="(item,index) in questionts" :key="item+index">
                      <div class="question-text">{{index+1}}. {{item.content}}</div>
                      <div class="answer-box">
                          <div class="answer-option" v-for="(it,i) in item.options" :key="it+i">
                              <el-radio v-model="item.value" :label="it.value">{{''}}</el-radio><a @click="item.value = it.value" :class="{'answer-active':item.value === it.value}">{{it.text}}</a>
                          </div>
                      </div>
                  </li>
              </ul>
          </el-scrollbar>
        </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    isNewest: Boolean
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  data() {
    return {
      questionts: []
    }
  },
  created() {
    this.getRandomQuests()
  },
  methods: {
    getRandomQuests() {
      let url = '/course/firstStep/getRandomQuests'
      if (this.flowNodeNo === 38) {
        url = '/course/firstStep/getAllRandomQuests'
      }
      baseRequest(url, { flowNodeNo: this.flowNodeNo }).then(response => {
        const temp = response.data.item
        this.questionts = []
        for (const iterator of temp) {
          iterator.value = null
          const choiceArr = iterator.choices.split(';')
          iterator.options = []
          choiceArr.forEach((item, index) => {
            iterator.options.push({
              text: item,
              value: String.fromCharCode(index + 65)
            })
          })
          this.questionts.push(iterator)
        }
      })
    },
    /**
     * 这里用promise做异步
     */
    saveData() {
      return new Promise((resolve, reject) => {
        if (this.questionts.every(item => item.value) && this.questionts.length > 0) {
          const answers = []
          for (const iterator of this.questionts) {
            answers.push({
              id: iterator.id,
              answer: iterator.value
            })
          }
          const params = {
            flowNodeNo: this.flowNodeNo,
            courseId: this.courseId,
            answers
          }
          baseRequest('/course/firstStep/randomQuestsScore', params).then(response => {
            const result = response.data.item.result
            // const result = false
            if (result) {
              resolve()
              if (this.flowNodeNo === 29) {
                this.openSp()
              }
            } else {
              reject(true)
            }
          }, _ => {
            reject()
          })
        } else {
          this.$Message.warning('请完成当前打卡问卷')
          reject()
        }
      })
    },
    /**
     * 开启成功手册
     */
    openSp() {
      baseRequest('/course/firstStep/openGoalPermission', { courseId: this.courseId })
    }
  }
}
</script>
<style lang="scss" scoped>
.questionnaire{
    .questionnaire-content{
        overflow: auto;
        margin-top:20px;
        background-color: #fcfcfc;
        border-radius: 10px;
        border: solid 1px #dddddd;
        .question-box{
            padding:0 30px;
            .question-item{
                margin-top:30px;
                padding-bottom:30px;
                border-bottom:dashed 1px #dddddd;
                &:last-child{
                    border-bottom:none;
                }
                .question-text{
                    font-size: 16px;
                    font-weight: bold;
                    color: #222222;
                    -webkit-user-select:none;
                    -moz-user-select:none;
                    -ms-user-select:none;
                    user-select:none;
                }
                .answer-box{
                    padding-left: 16px;
                    margin-top: 20px;
                    .answer-option{
                        font-size: 14px;
                        color: #222222;
                        display: inline-block;
                        min-width: 400px;
                        user-select:none;
                        .answer-active{
                            color:#00afff;
                        }
                        /deep/ .el-radio{
                          margin-right: 0;
                        }
                    }
                }
            }
        }
    }
}
</style>