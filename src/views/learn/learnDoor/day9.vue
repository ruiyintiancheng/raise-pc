<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
          <img :src="watermark" class="watermark" alt="">
            <p class="door-text-duan text-b">个人使命宣言</p>
            <p class="door-text-duan">写出来的人生使命体现了独特真实的你，反映了你心灵深处的憧憬和意愿。接下来，你要将这段文字浓缩成一句掷地有声的使命宣言，它完完全全表达出了你真正的自我而且无论你处在什么样的景况中，你都可以脱口而出。</p>
            <p class="door-text-duan door-upblank">个人使命宣言：</p>
            <p class="door-text-duan">是确立人生愿景最有效的方法；是认定自己的人生哲学或基本信念；是行为处事的根本大法，就好比一国的宪法。不管世事如何多变，环境多么艰难，它依然不为所动。</p>
            <p class="door-text-duan" style="text-align:right;">———— 摘自百度百科《个人使命宣言》</p>
            <p class="door-text-duan door-upblank">个人使命宣言是你生活目的的简短书面表述。</p>
            <p class="door-text-duan door-upblank text-b">使命宣言实例：</p>
            <p class="door-text-duan door-intent15">特蕾莎修女：服侍穷人中的穷人</p>
            <p class="door-text-duan door-intent15">丘吉尔：有所作为，让世界变得更美好</p>
            <p class="door-text-duan door-intent15">星巴克：激发并孕育人文精神 —— 每人，每杯，每个社区</p>
            <p class="door-text-duan door-intent15">无印良品：以真正必要的方式，制造生活中基本的、并真正需要的产品</p>
            <p class="door-text-duan door-intent15">迪斯尼：使人们过得快活</p>
            <p class="door-text-duan door-intent15">IBM：无论一小步，还是一大步，都要带动人类的进步</p>
            <div class="door-table-box">
                <!-- <div class="door-question"></div> -->
                <el-table
                    class="table-main door-table"
                    :data="tableDataOne"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="e" align="left"  label="我的使命宣言" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['70']['answer']}}
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
            <p class="door-text-duan door-upblank">写完后请带有激情的大声表达出来！</p>
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
            <el-form-item style="margin-top:0px;" prop="70">
                <div class="form-label required">我的使命宣言:</div>
                <el-input type="textarea" :rows="7" style="" v-model="updateFormOne['70']" show-word-limit maxlength="100"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formOneVisible = false">取 消</el-button>
            <el-button type="primary" :loading="subbtn" @click="submit('one')">确 定</el-button>
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
      formData: {},
      tableDataOne: [
      ],
      updateStatus: null,
      formOneVisible: false,
      formTwoVisible: false,
      updateFormOne: {},
      rulesOne: {
        '70': [
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
      return false
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 9 }).then(response => {
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
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 9 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          if (iterator.id === 132) {
            this.tableDataOne = iterator.dataAnswer || []
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
          '70': null
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      }
    },
    updateHandle(row, order) {
      this.updateStatus = 1
      this.currentRow = row
      if (order === 'one') {
        this.updateFormOne = {
          '70': row['70']['answer']
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
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
        day: '9'
      }
      let updateForm = {}
      let ref = null
      if (order === 'one') {
        params.id = '132'
        updateForm = this.updateFormOne
        ref = this.$refs.ruleForm1
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