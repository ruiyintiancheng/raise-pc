<template>
    <!-- 自我评估 -->
    <div class="assessment" :style="{height:materialsHeight+'px'}">
      <template v-if="!isEx">
            <el-button v-if="!isNewest&&!updateStatus" class="update-btn" type="primary" size="mini" @click="updateStatus=true">编辑</el-button>
            <el-button v-if="!isNewest&&updateStatus" class="update-btn" type="success" size="mini" @click="saveUpdate">保存</el-button>
      </template>
       <el-scrollbar style="height:100%">
            <div class="scrollbar-box">
              <div class="assessment-tip">
                <p>影响你达成最佳结果的因素有很多，本评估表是为帮助你发现生活和工作中的挑战而设置。</p>
                <p>评估针对&ldquo;个人的习惯和态度&rdquo;和&ldquo;干扰的情景&rdquo;两部分。请对评估表的每一题目，在最能反映你的实际情况的数字上画圈（5分代表非常符合，1分代表非常不符合，中间的数字分别代表两者之间的不同程度）。</p>
                <p>选择好每道题的数字后，回顾每一题的打分，看看自己是否对所评的状态满意。如果满意，就在&ldquo;+&rdquo;号栏中打勾（注：系统默认为 “ + ”）；如果你觉得需要有改变，请在&ldquo;-&rdquo;号栏打勾（注：请点击“-”号栏下的按钮）。表格的所有必填项需填写完整才能提交，提交后如需修改请点击右上角的“编辑”按钮进行修改。</p>
                <p>请关注评估表&ldquo;-&rdquo;号栏对应的内容，也许这中间包含了你目前面临的挑战。请把你在评估中的这些发现填写到&ldquo;我的发现&rdquo;表中，并以此作为反思自我挑战的依据。</p>
              </div>
              <div class="assessment-box">
                  <div class="assessment-head clearfix">
                        <div class="assessment-title fl">个人的习惯和态度</div>
                        <div class="assessment-title-satisfied fr clearfix">
                            <div class="assessment-title-l fl">+</div>
                            <div class="assessment-title-r fr">-</div>
                        </div>
                        <div class="assessment-title-question fr clearfix">
                            <div class="assessment-title-l fl">完全不像我</div>
                            <div class="assessment-title-r fr">非常像我</div>
                        </div>
                  </div>
                    <div class="assessment-item clearfix" v-for="(item,index) in questionListOne" :key="item+index">
                        <div class="assessment-label fl" v-if="item.qType === '6'">
                          <el-input style="width:255px;" @change="otherChangeHandle(item)" :disabled="!isNewest && !updateStatus" v-model.trim="item.content" placeholder="其他"></el-input>
                        </div>
                        <div class="assessment-label fl" v-else>{{item.content}}</div>
                        <div class="assessment-satisfied-options fr">
                            <el-radio :disabled="!isNewest && !updateStatus" v-model="item.satisfiedFlag" label="1">{{''}}</el-radio>
                            <el-radio :disabled="!isNewest && !updateStatus" v-model="item.satisfiedFlag" label="0">{{''}}</el-radio>
                        </div>
                        <ul class="assessment-options fr clearfix">
                            <template v-if="(isNewest || updateStatus) && item.content">
                                <li class="assessment-options-item fl" v-for="it in 5" :key="it" :class="{active:item.score === it}" @click="item.score=it">{{it}}</li>
                            </template>
                            <template v-else>
                                <li class="assessment-options-item disabled fl" v-for="it in 5" :key="it" :class="{active:item.score === it}">{{it}}</li>
                            </template>   
                        </ul>
                    </div>
              </div>
              <div class="assessment-box">
                  <div class="assessment-head clearfix">
                        <div class="assessment-title fl">干扰的情形</div>
                        <div class="assessment-title-satisfied fr clearfix">
                            <div class="assessment-title-l fl">+</div>
                            <div class="assessment-title-r fr">-</div>
                        </div>
                        <div class="assessment-title-question fr clearfix">
                            <div class="assessment-title-l fl">完全不像我</div>
                            <div class="assessment-title-r fr">非常像我</div>
                        </div>
                  </div>
                    <div class="assessment-item clearfix" v-for="(item,index) in questionListTwo" :key="item+index">
                        <div class="assessment-label fl" v-if="item.qType === '6'">
                          <el-input style="width:255px;" @change="otherChangeHandle(item)" :disabled="!isNewest && !updateStatus" v-model.trim="item.content" placeholder="其他"></el-input>
                        </div>
                        <div class="assessment-label fl" v-else>{{item.content}}</div>
                        <div class="assessment-satisfied-options fr">
                            <el-radio :disabled="(!isNewest && !updateStatus) || !item.content" v-model="item.satisfiedFlag" label="1">{{''}}</el-radio>
                            <el-radio :disabled="(!isNewest && !updateStatus) || !item.content" v-model="item.satisfiedFlag" label="0">{{''}}</el-radio>
                        </div>
                        <ul class="assessment-options fr clearfix">
                            <template v-if="(isNewest || updateStatus) && item.content">
                                <li class="assessment-options-item fl" v-for="it in 5" :key="it" :class="{active:item.score === it}" @click="item.score=it">{{it}}</li>
                            </template>
                            <template v-else>
                                <li class="assessment-options-item disabled fl" v-for="it in 5" :key="it" :class="{active:item.score === it}">{{it}}</li>
                            </template>  
                        </ul>
                    </div>
              </div>
              <div class="fg-line"></div>
              <div class="assessment-discover">
                  <div class="assessment-discover-title">我的发现:</div>
                  <el-input
                    type="textarea"
                    :disabled="!isNewest && !updateStatus"
                    :rows="5"
                    maxlength="200"
                    show-word-limit
                    v-model.trim="discover"
                    placeholder="通过上面的自我评估、我有如下的发现：">
                    </el-input>
              </div>             
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
    isNewest: Boolean,
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      questionListOne: [],
      questionListTwo: [],
      discover: '',
      updateStatus: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/rwPSelfAssess/getSelfAssess', { courseId: this.courseId }).then(response => {
        this.discover = response.data.item.discover
        const questList = response.data.item.questList
        const answerList = response.data.item.answerList || []
        for (const iterator of questList) {
          iterator.options = iterator.choices.split(';')
          const anwser = answerList.find(item => iterator.id === item.questId)
          if (anwser) {
            if (iterator.qType === '6' && !iterator.content) {
              iterator.score = ''
              iterator.satisfiedFlag = null
            } else {
              iterator.score = anwser.score || null
              iterator.satisfiedFlag = anwser.satisfiedFlag || '1'
            }
          } else {
            if (iterator.qType === '6' && !iterator.content) {
              iterator.score = ''
              iterator.satisfiedFlag = null
            } else {
              iterator.score = ''
              iterator.satisfiedFlag = '1'
            }
          }
          if (iterator.kindsTwo === '6-1') {
            this.questionListOne.push(iterator)
          } else if (iterator.kindsTwo === '6-2') {
            this.questionListTwo.push(iterator)
          }
        }
      })
    },
    saveUpdate() {
      this.saveData().then(_ => {
        this.updateStatus = false
        this.$Message.success('操作成功')
      })
    },
    judgement() {
      if (this.questionListOne.every(item => {
        if (item.qType === '6') {
          if (item.content) {
            return item.score && item.satisfiedFlag
          } else {
            if (item.score || item.satisfiedFlag) {
              return false
            } else {
              return true
            }
          }
        } else {
          return item.score && item.satisfiedFlag
        }
      })) {
        if (this.questionListTwo.every(item => {
          if (item.qType === '6') {
            if (item.content) {
              return item.score && item.satisfiedFlag
            } else {
              if (item.score || item.satisfiedFlag) {
                return false
              } else {
                return true
              }
            }
          } else {
            return item.score && item.satisfiedFlag
          }
        })) {
          if (this.discover) {
            return true
          } else {
            this.$Message.warning('请填写我的发现')
            return false
          }
        } else {
          this.$Message.warning('请完成干扰的情形选择')
          return false
        }
      } else {
        this.$Message.warning('请完成个人的习惯和态度选择')
        return false
      }
    },
    /**
     * 这里用promise做异步
     */
    saveData() {
      return new Promise((resolve, reject) => {
        if (this.judgement() && this.questionListOne.length > 0) {
          const answers = []
          for (const iterator of this.questionListOne) {
            answers.push({
              id: iterator.id,
              answer: iterator.score,
              satisfiedFlag: iterator.satisfiedFlag,
              questContent: iterator.qType === '6' ? iterator.content : null
            })
          }
          for (const iterator of this.questionListTwo) {
            answers.push({
              id: iterator.id,
              answer: iterator.score,
              satisfiedFlag: iterator.satisfiedFlag,
              questContent: iterator.qType === '6' ? iterator.content : null
            })
          }
          const params = {
            flowNodeNo: this.flowNodeNo,
            courseId: this.courseId,
            discover: this.discover,
            answers
          }
          baseRequest('/course/rwPSelfAssess/setSelfAssess', params).then(response => {
            resolve()
          })
        } else {
          reject()
        }
      })
    },
    otherChangeHandle(item) {
      this.$set(item, 'score', null)
      this.$set(item, 'satisfiedFlag', '')
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss">
.assessment{
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
    .assessment-tip{
        font-size: 16px;
        line-height: 24px;
        color: #222222;
    }
    .assessment-box{
        background-color: #ffffff;
        border-radius: 10px;
        border: solid 1px #dddddd;
        font-size: 14px;
        color: #222;
        margin-top:20px;
        overflow: hidden;
        .assessment-head{
            background-color: #eeeeee;
            border-radius: 10px 10px 0px 0px;
            padding:0 24px;
            height: 44px;
            line-height: 44px;
            .assessment-title-question{
                width: 230px;
                margin-right: 20px;
                .assessment-title-l{
                    text-align: left;
                }
                .assessment-title-r{
                    text-align: right;
                }
            }
            .assessment-title-satisfied{
                width: 130px;
                 .assessment-title-l{
                    display: inline-block;
                    width: 50%;
                    text-align: center;
                }
                .assessment-title-r{
                   display: inline-block;
                   width: 50%;
                   text-align: center;
                }
            }
        }
        .assessment-item{
            height: 60px;
            line-height: 60px;
            padding:0 24px;
            border-top:1px solid #ddd;
            .assessment-satisfied-options{
                width: 130px;
                text-align: center;
                padding-left: 8px;
                /deep/ .el-radio__input.is-disabled.is-checked .el-radio__inner{
                    border-color: #409EFF;
                    background: #409EFF;
                    &::after{
                        background-color: #fff;
                    }
                }
            }
            .assessment-options{
                width: 230px;
                height: 100%;
                margin-right: 20px;
                .assessment-options-item{
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background-color: #ffffff;
                    border-radius: 6px;
                    border: solid 1px #222222;
                    margin-top:15px;
                    margin-right: 20px;
                    cursor: pointer;
                    &:last-child{
                        margin-right: 0px;
                    }
                    &.active{
                        background-color: #00afff;
                        color: #fff;
                        border: none;
                    }
                    &.disabled{
                        cursor: not-allowed;
                    }
                }
            }
        }
    }
    .assessment-discover{
        margin-top: 20px;
    }
}
</style>