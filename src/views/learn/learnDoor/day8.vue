<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan text-b">人生使命</p>
            <p class="door-text-duan">就像特工担负着秘密使命一样，我们也有一个“使命”，我们被“派遣”到人世间做什么？为什么我来到这里？今生我的人生目的是什么？我最想做什么？我最大的愿望是什么？这些看似简单却深刻的问题，实际上是你自己生活中要遵守的最根本原则。请避开外界干扰，静下心来，真诚面对内心世界，你就会逐渐找到自己的人生使命。</p>
            <p class="door-text-duan door-upblank text-b">撰写个人使命</p>
            <p class="door-text-duan">尝试按下面的步骤，写出自己的人生使命，你可以先快速写下第一时间浮现在你心里的任何想法，然后在后面的版本里，可以再不断精雕细琢，甚或加入一些其他想法。</p>
            </div>
            <p class="door-text-duan door-upblank">步骤：</p>
            
            <div class="door-qa-box no-margin-t">
                <div class="door-question">(1)请从Day7的思考题中找出你最想做的，想要承担或成就的事和责任；</div>
                <el-input class="door-answer"  :disabled="!q126" v-model="formData.q126.answer" type="textarea" maxlength="300" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q126" type="primary" size="small" @click="q126 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q126')">保存</el-button>               
            </div>
            <div class="door-qa-box">
                <div class="door-question">(2)概述想达成的最重要的长期目标或个人成就；</div>
                <el-input class="door-answer" :disabled="!q127" v-model="formData.q127.answer" type="textarea" maxlength="300" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q127" type="primary" size="small" @click="q127 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q127')">保存</el-button> 
            </div>
            <div class="door-qa-box">
                <div class="door-question">(3)列出在前面写下的核心价值观；</div>
                <el-input class="door-answer" :disabled="!q128" v-model="formData.q128.answer" type="textarea" maxlength="300" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q128" type="primary" size="small" @click="q128 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q128')">保存</el-button> 
            </div>
            <div class="door-qa-box">
                <div class="door-question">(4)想一想有否特定的服务领域及服务对象；</div>
                <el-input class="door-answer" :disabled="!q129" v-model="formData.q129.answer" type="textarea" maxlength="300" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q129" type="primary" size="small" @click="q129 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q129')">保存</el-button> 
            </div>
            <div class="door-table-box" style="border:none;">
                <div class="door-question">(5)请把（1）~（4）的内容综合起来用文字表达出来，可以分别写下不同领域的使命：</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataOne"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="e" align="left"  label="初稿" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['68']['answer']}}
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
            <div class="door-table-box">
                <div class="door-question">你所写出来的人生使命需要：呈现出你人生持续性的重要产出或成就，反映了你所持守的核心价值观，并且含有你要担当责任的动作或动词，以及特别的服务领域或服务对象。</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataTwo"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="e" align="left"  label="终稿" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['69']['answer']}}
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
            <p class="door-text-duan door-upblank">使命伴随着人出生而降临到每个人的身上，无论你是否意识到它的存在，它早已藏在我们的心里，我们所做的只是将它识别并挖掘出来。拥有人生使命，会使你不再关注外部环境，你的内心也将会变得强大无比。</p>
       </div>
       <el-dialog
        append-to-body
        :title="updateStatus === 0?'添加':'修改'"
        :visible.sync="formOneVisible"
        class="dialog-main heightauto"
        top="5%"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm1" :model="updateFormOne" :rules="rulesOne">
            <el-form-item style="margin-top:0px;" prop="68">
                <div class="form-label required">初稿:</div>
                <el-input type="textarea" :rows="12" style="" v-model="updateFormOne['68']" show-word-limit maxlength="500"></el-input>
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
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm2" :model="updateFormTwo" :rules="rulesTwo">
            <el-form-item style="margin-top:0px;" prop="69">
                <div class="form-label required">终稿:</div>
                <el-input type="textarea" :rows="12" style="" v-model="updateFormTwo['69']" show-word-limit maxlength="500"></el-input>
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
        q126: {
          id: 126,
          answer: null
        },
        q127: {
          id: 127,
          answer: null
        },
        q128: {
          id: 128,
          answer: null
        },
        q129: {
          id: 129,
          answer: null
        }
      },
      q126: false,
      q127: false,
      q128: false,
      q129: false,
      tableDataOne: [
      ],
      tableDataTwo: [
      ],
      updateStatus: null,
      formOneVisible: false,
      formTwoVisible: false,
      updateFormOne: {},
      updateFormTwo: {},
      rulesOne: {
        '68': [
          { required: true, message: '该项不能为空' }
        ]
      },
      rulesTwo: {
        '69': [
          { required: true, message: '该项不能为空' }
        ]
      },
      subbtn: false,
      currentRow: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hasUpdateState() {
      return this.q126 || this.q127 || this.q128 || this.q129
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 8 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => {
            let boo = false
            if (item.dataAnswer instanceof Array) {
              if (item.dataAnswer.length > 0) {
                boo = item.dataAnswer.some(i => {
                  let a = false
                  for (const key in i) {
                    if (i[key].answer) {
                      a = true
                    }
                  }
                  return a
                })
              }
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
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 8 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 8 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
          if (iterator.id === 130) {
            this.tableDataOne = iterator.dataAnswer || []
          } else if (iterator.id === 131) {
            this.tableDataTwo = iterator.dataAnswer || []
          }
        }
      })
    },
    addHandle(order) {
      this.updateStatus = 0
      if (order === 'one') {
        if (this.tableDataOne.length >= 3) {
          this.$Message.warning('抱歉，该清单最多添加3条数据')
          return
        }
        this.updateFormOne = {
          '68': null
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        if (this.tableDataTwo.length >= 3) {
          this.$Message.warning('抱歉，该清单最多添加3条数据')
          return
        }
        this.updateFormTwo = {
          '69': null
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
          '68': row['68']['answer']
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        this.updateFormTwo = {
          '69': row['69']['answer']
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
        day: '8'
      }
      let updateForm = {}
      let ref = null
      if (order === 'one') {
        params.id = '130'
        updateForm = this.updateFormOne
        ref = this.$refs.ruleForm1
      } else {
        params.id = '131'
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
    }
  }
}
</script>
<style lang="scss">
@import './door.scss';
</style>