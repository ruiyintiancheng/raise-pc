<template>
    <div class="door-box" ref="44" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <p class="door-text-duan text-b">社会影响：</p>
            <p class="door-text-duan door-upblank">请仔细思考并回答下面的问题</p>
            <div class="door-qa-box no-margin-t">
                <div class="door-question">我的同龄人带给我的影响是：</div>
                <el-input class="door-answer" :disabled="!q98" maxlength="300" v-model="formData.q98.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q98" type="primary" size="small" @click="q98 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q98')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">我周围的人文环境（如：热衷和崇尚什么？嘲笑或鄙视什么？）带给我的影响是：</div>
                <el-input class="door-answer" :disabled="!q99" maxlength="300" v-model="formData.q99.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q99" type="primary" size="small" @click="q99 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q99')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">当前社会的发展和形态的变迁带给我的影响是：</div>
                <el-input class="door-answer" :disabled="!q100" maxlength="300" v-model="formData.q100.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q100" type="primary" size="small" @click="q100 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q100')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">从上面这些影响中我感受到的压力是：</div>
                <el-input class="door-answer" :disabled="!q101" maxlength="300" v-model="formData.q101.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q101" type="primary" size="small" @click="q101 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q101')">保存</el-button>
            </div>
            <div class="door-table-box">
                <div class="door-question">下面这些对我的人生有重要影响的人，我最想拥有他们身上的什么？为什么想要拥有这些？</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataOne"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="center" width="187" label="名单">
                      <template slot-scope="scope">
                        {{scope.row['30']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="w" align="center" width="400" label="最想拥有" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['31']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="e" align="center" width="500"  label="为什么想拥有？" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['32']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160">
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
                <div class="door-question">如果他们会给我一些忠告，会是什么忠告？我会接受这个忠告吗？为什么接受或不接受？</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataTwo"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="center" width="187" label="名单">
                      <template slot-scope="scope">
                        {{scope.row['34']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="w" align="center"  width="400" label="忠告" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['35']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="e" align="center" width="500"  label="接受这个忠告吗？为什么？" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['36']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160">
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
            <div class="door-qa-box">
                <div class="door-question">综合上面这些问题，我的发现是：</div>
                <el-input class="door-answer" :disabled="!q104" maxlength="500" v-model="formData.q104.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q104" type="primary" size="small" @click="q104 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q104')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank">回顾生命历程中对我们影响至深的人，可以帮助我们更真诚地了解自己内心深处的渴望。当我们能清晰拥有并坦然拥抱忠告时，我们将会更坚定自己应有的担当。</p>
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
            <el-form-item style="margin-top:0px;" prop="30">
                <div class="form-label required">名单</div>
                <el-input  style="" v-model="updateFormOne['30']" show-word-limit maxlength="10"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="31">
                <div class="form-label required">最想拥有</div>
                <el-input type="textarea" :rows="4" style="" v-model="updateFormOne['31']" show-word-limit maxlength="30"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="32">
                <div class="form-label required">为什么想拥有？</div>
                <el-input type="textarea" :rows="7" style="" v-model="updateFormOne['32']" show-word-limit maxlength="200"></el-input>
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
            <el-form-item style="margin-top:0px;" prop="34">
                <div class="form-label required">名单</div>
                <el-input  style="" v-model="updateFormTwo['34']" show-word-limit maxlength="10"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="35">
                <div class="form-label required">忠告</div>
                <el-input type="textarea" :rows="4" style="" v-model="updateFormTwo['35']" show-word-limit maxlength="30"></el-input>
            </el-form-item>
            <el-form-item style="margin-top:0px;" prop="36">
                <div class="form-label required">接受这个忠告吗？为什么？</div>
                <el-input type="textarea" :rows="7" style="" v-model="updateFormTwo['36']" show-word-limit maxlength="200"></el-input>
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
      formData: {
        q98: {
          id: 98,
          answer: null
        },
        q99: {
          id: 99,
          answer: null
        },
        q100: {
          id: 100,
          answer: null
        },
        q101: {
          id: 101,
          answer: null
        },
        q104: {
          id: 104,
          answer: null
        }
      },
      q98: false,
      q99: false,
      q100: false,
      q101: false,
      q104: false,
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
        '30': [
          { required: true, message: '该项不能为空' }
        ],
        '31': [
          { required: true, message: '该项不能为空' }
        ],
        '32': [
          { required: true, message: '该项不能为空' }
        ]
      },
      rulesTwo: {
        '34': [
          { required: true, message: '该项不能为空' }
        ],
        '35': [
          { required: true, message: '该项不能为空' }
        ],
        '36': [
          { required: true, message: '该项不能为空' }
        ]
      },
      subbtn: false,
      currentRow: {},
      watermark
    }
  },
  created() {
    this.getData()
  },
  methods: {
    hasUpdateState() {
      return this.q98 || this.q99 || this.q100 || this.q101 || this.q104
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 3 }).then(response => {
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
          if (result) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 3 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 3 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
          if (iterator.id === 102) {
            this.tableDataOne = iterator.dataAnswer || []
          } else if (iterator.id === 103) {
            this.tableDataTwo = iterator.dataAnswer || []
          }
        }
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
          '30': null,
          '31': null,
          '32': null
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        if (this.tableDataTwo.length >= 8) {
          this.$Message.warning('抱歉，该清单最多添加8条数据')
          return
        }
        this.updateFormTwo = {
          '34': null,
          '35': null,
          '36': null
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
          '30': row['30']['answer'],
          '31': row['31']['answer'],
          '32': row['32']['answer']
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        this.updateFormTwo = {
          '34': row['34']['answer'],
          '35': row['35']['answer'],
          '36': row['36']['answer']
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
        day: '3'
      }
      let updateForm = {}
      let ref = null
      if (order === 'one') {
        params.id = '102'
        updateForm = this.updateFormOne
        ref = this.$refs.ruleForm1
      } else {
        params.id = '103'
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