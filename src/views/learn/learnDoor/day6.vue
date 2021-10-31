<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan text-b">自我价值</p>
            <p class="door-text-duan">你认为自己的人生包含有哪几个重要的组成部分？如：身体、工作、生活、家庭、个人成长、信仰……，或像 LMI 把人生划分为六大领域：身体与健康、精神与道德、事业与理财、心智与教育、社交与文化、家庭与天伦</p>
            <p class="door-text-duan door-upblank">请在下面列出：</p>
            <p class="door-text-duan">你认为人生重要的组成部分，并写下每个部分对自己而言的重要性和必要性，以及对自己的真正价值：</p>
          </div>
            <div class="door-table-box">
                <!-- <div class="door-question"></div> -->
                <el-table
                    class="table-main door-table"
                    :data="tableDataOne"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="center" width="300" label="组成部分">
                        <template slot-scope="scope">
                        {{scope.row['49']['answer']}}
                       </template>
                    </el-table-column>
                    <el-table-column prop="q" align="center"  label="重要性/必要性和价值" show-overflow-tooltip>
                        <template slot-scope="scope">
                        {{scope.row['50']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="e" align="center" width="200"  label="关键词" >
                        <template slot-scope="scope">
                        {{scope.row['51']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160px">
                        <template slot="header">
                            <div @click="addHandle('one')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                        </template>
                        <template slot-scope="scope" >
                            <el-button type="primary" size="mini" plain @click="updateHandle(scope.row,'one')">修改</el-button>
                            <el-button type="danger" size="mini" plain @click="deleteHandle(scope.row,'one')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="door-qa-box">
                <div class="door-question">在这些关键词中你所看到的共同点是什么？请选出表达自己认为最核心最重要的几个词：</div>
                <el-input class="door-answer"  :disabled="!q116" maxlength="20" v-model="formData.q116.answer"  placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q116" type="primary" size="small" @click="q116 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q116')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank text-b">我的价值观</p>
            <div class="water-back">
              <img :src="watermark" style="height: 200px;" class="watermark watermark-auto" alt="">
            <div class="door-price-box">
                <p class="door-price-title">价值观清单</p>
                <table class="arrange-table">
                    <thead>
                        <tr>
                            <th>价值观类型</th>
                            <th style="width: calc(100% - 240px)">价值观词汇</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="table-label">经济型</td>
                            <td>
                                技能、能力、创造、学习、卓越、勤奋、效率、行动、专业、财富、发展、才干、价值、独立、自强、坚持
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">宗教型</td>
                            <td>
                                品德、自律、诚信、道德、信仰、良心、信念、理想、正直、无私、忠诚、诚实、责任、本份、贞操
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">审美型</td>
                            <td>
                                美貌、艺术、优雅、欣赏、美丽、和谐、品质、浪漫、享受、健康、轻松、自然、喜悦、幸福
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">政治型</td>
                            <td>
                                权力、挑战、成功、成就、影响、权威、服从、公平、荣誉、勇敢、满足、刺激、伟大
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">社会型</td>
                            <td>
                                关怀、助人、包容、尊重、温暖、平和、宽容、博爱、合作、家庭、友谊、孝顺、热情、感恩、接纳、仁慈
                            </td>
                        </tr>
                        <tr>
                            <td class="table-label">理论型</td>
                            <td>
                                真理、知识、原则、求真、科学、逻辑、理性、标准、聪明、智慧、自主、创新、开放、好奇、分享
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </div>
            <div class="door-table-box">
                <div class="door-question">请从你写下的重要词汇及价值观清单中，选出10个列在下面，并请花一点时间思考，在每个选出的价值观后面写下∶这个价值观对我有多重要?为什么这么重要?</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataTwo"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="center" width="200" label="价值观">
                        <template slot-scope="scope">
                        {{scope.row['55']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="q" align="center" width="200" label="重要程度">
                        <template slot-scope="scope">
                        {{scope.row['56']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="e" align="center"  label="为什么重要" show-overflow-tooltip>
                        <template slot-scope="scope">
                        {{scope.row['57']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160px">
                        <template slot="header">
                            <div @click="addHandle('two')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                        </template>
                        <template slot-scope="scope" >
                            <el-button type="primary" size="mini" plain @click="updateHandle(scope.row,'two')">修改</el-button>
                            <el-button type="danger" size="mini" plain @click="deleteHandle(scope.row,'two')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <p class="door-text-duan door-upblank" style="margin-bottom:10px;">选出让我有强烈情感的5个核心价值观</p>
            <el-input style="width:199px;margin-left:5px;" :disabled="!q119" v-for="(item,index) in hxjzg" :key="index"  v-model="item['119']" show-word-limit placeholder="" maxlength="5"></el-input>
            
           
            <el-button class="door-btn-save" v-if="!q119" type="primary" size="small" @click="q119 = true">编辑</el-button>
            <el-button type="success" v-else size="small" @click="saveHxjzg">保存</el-button>
            <p class="door-text-duan door-upblank">价值观深藏于内心深处，却是我们日常生活的行为准则，当你违背了内在的价值体系，纠结、无奈就会缠绕你。所以，请再次审视你写下的5个核心价值观，用下面的句型写下包含核心价值的一句话：</p>
            <p class="door-text-duan door-upblank">
               我是一个 <el-input style="width:900px;" :disabled="!q120"  maxlength="50" show-word-limit v-model="formData.q120.answer" placeholder=""></el-input> 的人。 
                <el-button class="door-btn-save" v-if="!q120" type="primary" size="small" @click="q120 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q120')">保存</el-button>
            </p>
       </div>
       <el-dialog
        append-to-body
        :title="updateStatus === 0?'添加':'修改'"
        :visible.sync="formOneVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm1" :model="updateFormOne" :rules="rulesOne">
            <el-form-item style="margin-top:0px;" prop="49">
                <div class="form-label required">组成部分</div>
                <el-input  style="" v-model="updateFormOne['49']" show-word-limit maxlength="10"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="50">
                <div class="form-label required">重要性/必要性和价值</div>
                <el-input type="textarea" :rows="7" style="" v-model="updateFormOne['50']" show-word-limit maxlength="200"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="51">
                <div class="form-label required">关键词</div>
                <el-input  style="" v-model="updateFormOne['51']" show-word-limit maxlength="20"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formOneVisible = false">取 消</el-button>
            <el-button type="primary" :loading="subbtn" @click="submit('one')">确 定</el-button>
        </span>
        </el-dialog>
       <el-dialog
        append-to-body
        :title="updateStatus === 0?'添加':'修改'"
        :visible.sync="formTwoVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm2" :model="updateFormTwo" :rules="rulesTwo">
            <el-form-item style="margin-top:0px;" prop="55">
                <div class="form-label required">价值观</div>
                <el-input  style="" v-model="updateFormTwo['55']" show-word-limit maxlength="5"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="56">
                <div class="form-label required">重要程度</div>
                <el-input  style="" v-model="updateFormTwo['56']" show-word-limit maxlength="5"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="57">
                <div class="form-label required">为什么重要</div>
                <el-input type="textarea" :rows="7" style="" v-model="updateFormTwo['57']" show-word-limit maxlength="200"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formTwoVisible = false">取 消</el-button>
            <el-button type="primary" :loading="subbtn" @click="submit('two')">确 定</el-button>
        </span>
        </el-dialog>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import watermark from '@/assets/images/watermark.png'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  watch: {
  },
  props: {
  },
  data() {
    return {
      watermark,
      formData: {
        q115: {
          id: 115,
          answer: null
        },
        q116: {
          id: 116,
          answer: null
        },
        q120: {
          id: 120,
          answer: null
        }
      },
      q116: false,
      q120: false,
      q119: false,
      tableDataOne: [
      ],
      tableDataTwo: [
      ],
      hxjzg: [],
      updateStatus: null,
      formOneVisible: false,
      formTwoVisible: false,
      formThreeVisible: false,
      updateFormOne: {},
      updateFormTwo: {},
      updateFormThree: {},
      rulesOne: {
        '49': [
          { required: true, message: '该项不能为空' }
        ],
        '50': [
          { required: true, message: '该项不能为空' }
        ],
        '51': [
          { required: true, message: '该项不能为空' }
        ]
      },
      rulesTwo: {
        '55': [
          { required: true, message: '该项不能为空' }
        ],
        '56': [
          { required: true, message: '该项不能为空' }
        ],
        '57': [
          { required: true, message: '该项不能为空' }
        ]
      },
      currentRow: {},
      imgItem: null,
      subbtn: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hasUpdateState() {
      return this.q116 || this.q120 || this.q119
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 6 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => {
            let boo = false
            if (item.dataAnswer instanceof Array) {
              boo = item.dataAnswer.length > 0
            } else {
              boo = !!item.dataAnswer
            }
            return boo
          })
          if (!result) {
            reject()
          } else {
            resolve()
          }
        })
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 6 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
          if (iterator.id === 115) {
            this.tableDataOne = iterator.dataAnswer || []
          } else if (iterator.id === 118) {
            this.tableDataTwo = iterator.dataAnswer || []
          } else if (iterator.id === 119) {
            this.hxjzg = iterator.dataAnswer || []
            // this.hxjzg = []
            if (this.hxjzg.length > 5) {
              this.hxjzg = this.hxjzg.slice(-5)
            } else if (this.hxjzg.length < 5) {
              console.log(this.hxjzg.length)
              const count = 5 - this.hxjzg.length
              for (var i = 0; i < count; i++) {
                this.hxjzg.push({
                  'id': null,
                  '119': null
                })
              }
            }
          }
        }
      })
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 6 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    addHandle(order) {
      this.updateStatus = 0
      if (order === 'one') {
        if (this.tableDataOne.length >= 8) {
          this.$Message.warning('抱歉，该清单最多添加8条数据')
          return
        }
        this.updateFormOne = {
          '49': null,
          '50': null,
          '51': null
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        if (this.tableDataTwo.length >= 10) {
          this.$Message.warning('抱歉，该清单最多添加10条数据')
          return
        }
        this.updateFormTwo = {
          '55': null,
          '56': null,
          '57': null
        }
        this.formTwoVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm2.clearValidate()
        ])
      }
    },
    updateHandle(row, order) {
      this.updateStatus = 1
      this.currentRow = row
      if (order === 'one') {
        this.updateFormOne = {
          '49': row['49']['answer'],
          '50': row['50']['answer'],
          '51': row['51']['answer']
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        this.updateFormTwo = {
          '55': row['55']['answer'],
          '56': row['56']['answer'],
          '57': row['57']['answer']
        }
        this.formTwoVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm2.clearValidate()
        ])
      }
    },
    deleteHandle(row, order) {
      const dataAnswer = []
      for (const key in row) {
        dataAnswer.push({ id: row[key].id })
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/rwReflectionDiary/deleteFrom', { dataAnswer }).then(_ => {
          this.$Message.success('操作成功')
          this.getData()
        })
      })
    },
    submit(order) {
      const params = {
        day: '6'
      }
      let updateForm = {}
      let ref = null
      if (order === 'one') {
        params.id = '115'
        updateForm = this.updateFormOne
        ref = this.$refs.ruleForm1
      } else {
        params.id = '118'
        updateForm = this.updateFormTwo
        ref = this.$refs.ruleForm2
      }
      const dataAnswer = []
      let updateUrl = ''
      if (this.updateStatus === 0) {
        updateUrl = '/course/rwReflectionDiary/insertFrom'
        for (const key in updateForm) {
          const obj = {
            name: updateForm[key],
            questId: key
          }
          dataAnswer.push(obj)
        }
      } else {
        updateUrl = '/course/rwReflectionDiary/updateFrom'
        for (const key in updateForm) {
          console.log(this.currentRow)
          const obj = {
            name: updateForm[key],
            id: this.currentRow[key].id
          }
          dataAnswer.push(obj)
        }
      }
      params.dataAnswer = dataAnswer
      ref.validate((valid) => {
        if (valid) {
          this.subbtn = true
          baseRequest(updateUrl, params).then(_ => {
            this.$Message.success('操作成功')
            this.formOneVisible = false
            this.formTwoVisible = false
            this.getData()
          }).finally(_ => {
            this.subbtn = false
          })
        } else {
          return false
        }
      })
    },
    saveHxjzg() {
      const boo = this.hxjzg.every(item => {
        if (item['119']) {
          return true
        } else {
          return false
        }
      })
      if (boo) {
        for (const iterator of this.hxjzg) {
          iterator.answer = iterator['119']
        }
        baseRequest('/course/rwReflectionDiary/operationCoreValue', { day: 6, pid: '119', dataAnswer: this.hxjzg }).then(_ => {
          this.$Message.success('操作成功')
          this.q119 = false
        })
      } else {
        this.$Message.warning('请将信息填写完整')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import './door.scss';
$tdWidth:240px;
.door-price-box{
    .door-price-title{
        text-align: center;
        font-size: 20px;
        color: #222222;
        font-weight: bold;
        margin-bottom: 20px;
    }
    .arrange-table{
        border: solid 1px #dddddd;
        border-radius: 10px;
        border-spacing: 0;
        overflow: hidden;
        width: 100%;
        thead{
            background-color: #fafafa;.arrange-table{
                    border: solid 1px #dddddd;
                    border-radius: 10px;
                        border-spacing: 0;
                        overflow: hidden;
                    thead{
                        background-color: #fafafa;
                        tr{
                            height: 44px;
                            line-height: 44px;
                            text-align: center;
                            th{
                                border-right: 1px solid #dddddd;
                                border-bottom: 1px solid #dddddd;

                                width: $tdWidth;
                                &:last-child{
                                    border-right: none;
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                padding: 24px;
                                text-align: center;
                                border-right: 1px solid #dddddd;
                                border-bottom: 1px solid #dddddd;
                                // width: $tdWidth;
                                &:last-child{
                                    border-right: none;
                                }
                                &:first-child{
                                   background-color: #fafafa;
                                   font-weight: bold;
                                }
                                p{
                                    line-height: 24px;
                                    text-align: left;
                                }
                                .arrange-table-icon{
                                    font-size: 26px;
                                }
                                .arrange-table-item{
                                    text-align: left;
                                    margin-top: 18px;
                                    &:first-child{
                                        margin-top: 0px;
                                    }
                                    .svg-icon{
                                        margin-right: 12px;
                                        color: #00afff;
                                    }
                                }
                            }
                            &:last-child{
                                td{
                                    border-bottom: none;
                                }
                            }
                        }
                    }
                }
            tr{
                height: 44px;
                line-height: 44px;
                text-align: center;
                th{
                    border-right: 1px solid #dddddd;
                    border-bottom: 1px solid #dddddd;

                    width: $tdWidth;
                    &:last-child{
                        border-right: none;
                    }
                }
            }
        }
        tbody{
            tr{
                td{
                    padding: 24px;
                    text-align: left;
                    border-right: 1px solid #dddddd;
                    border-bottom: 1px solid #dddddd;
                    // width: $tdWidth;
                    &.table-label{
                      text-align: center;
                    }
                    &:last-child{
                        border-right: none;
                    }
                    &:first-child{
                        background-color: #fafafa;
                        font-weight: bold;
                    }
                    p{
                        line-height: 24px;
                        text-align: left;
                    }
                    .arrange-table-icon{
                        font-size: 26px;
                    }
                    .arrange-table-item{
                        text-align: left;
                        margin-top: 18px;
                        &:first-child{
                            margin-top: 0px;
                        }
                        .svg-icon{
                            margin-right: 12px;
                            color: #00afff;
                        }
                    }
                }
                &:last-child{
                    td{
                        border-bottom: none;
                    }
                }
            }
        }
    }
}
</style>