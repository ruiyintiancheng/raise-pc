/** 未来规划表单 */
<template>
  <div>
    <el-dialog
      append-to-body
      title="添加/修改未来规划"
      :visible.sync="formVisible"
      class="dialog-main"
      top="5%"
      width="710px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <div v-if="formVisible">
          <div v-for="(item, i) in list" :key="i">
            <el-form ref="ruleForm" :model="item" :rules="rules" inline>
              <el-form-item prop="futurePlanGoal" style="margin-top:0px;">
                  <div class="form-label required">
                    规划事项
                    <el-button class="item-delete" @click.native.prevent="deleteRow(i)" type="danger" plain size="mini">删除</el-button>
                  </div>
                  <el-input type="textarea" :rows="4" 
                    placeholder="请填写内容（不要少于10字，不要超过100字）" style="width: 650px;" 
                    v-model="item.futurePlanGoal" show-word-limit maxlength="200"></el-input>
              </el-form-item>
              <el-form-item prop="startDate" style="margin-right: 50px;">
                  <div class="form-label required">开始日期</div>
                  <el-date-picker style="width: 300px" v-model="item.startDate"
                     :disabled="item.startDateDisabled"
                      type="date"
                      value-format='yyyy-MM-dd'
                      :picker-options="pickerOptionsStart"
                      @focus="handleFocus(i)"
                      >
                  </el-date-picker>
              </el-form-item>
              <el-form-item prop="endDate" style="margin-right: 0;">
                  <div class="form-label required">结束日期</div>
                  <el-date-picker style="width:300px;" v-model="item.endDate"
                      type="date"
                      value-format='yyyy-MM-dd'
                      :picker-options="pickerOptionsEnd"
                      @focus="handleFocus(i)"
                  />
              </el-form-item>
            </el-form>
            <div v-if="i < list.length - 1" class="line" />
          </div>
          <div style="direction: rtl;"><el-button type="primary" :disabled="!disAdd" size="mini" @click="addRow">添加</el-button></div>
      </div>
      <span slot="footer">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { parseTime } from '@/utils/index'

export default {
  components: {},
  props: {
    viewYear: [String, Number]
  },
  computed: {
    disAdd() {
      let flag = true
      this.list.forEach(d => {
        flag = flag && d.futurePlanGoal !== null
      })
      return flag
    },
    startDate() {
      return this.list[this.current].startDate
    },
    endDate() {
      return this.list[this.current].endDate
    },
    currentDate() {
      return parseTime(new Date(), '{y}-{m}-{d}')
    }
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      subbtn: false,

      list: null,
      deleteIds: null,
      date: null,
      current: null,

      ruleForm: {
        futurePlanGoal: null,
        startDate: null,
        endDate: null
      },
      params: {},

      rules: {
        futurePlanGoal: [
          { required: true, message: '请填写规划事项' }
        ],
        startDate: [
          { validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请选择开始日期'))
            } else {
              callback()
            }
          } }
        ],
        endDate: [
          { validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error('请选择结束日期'))
            } else {
              callback()
            }
          } }
        ]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          const endDate = this.list[this.current].endDate
          let date = endDate + ' 00:00:00'
          date = date.replace(/-/g, '/')
          const newDate = new Date(date).getTime()
          return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() > newDate ||
              time.getTime() < (new Date(`${this.viewYear}/01/01`).getTime() - 24 * 3600 * 1000)
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          const startDate = this.list[this.current].startDate
          let date = startDate + ' 00:00:00'
          date = date.replace(/-/g, '/')
          const newDate = new Date(date).getTime()
          return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
            time.getTime() < newDate ||
            time.getTime() > new Date(`${this.viewYear}/12/31`).getTime()
        }
      }
    }
  },
  created() {},
  mounted() {
    // console.log(this.label)
  },
  methods: {
    // 打开弹框
    openDialog(date, list) {
      this.formVisible = true
      this.subbtn = false
      this.deleteIds = []
      this.date = date

      if (list && list.length > 0) { // 修改
        console.log('update')
        this.status = 1
        console.log(list)
        this.list = list
        this.list.map(item => {
          if (item.startDate <= this.currentDate) {
            item.startDateDisabled = true
          }
          return item
        })
      } else { // 添加
        this.status = 0
        this.list = []
        this.addRow()
      }
    },
    addRow() {
      console.log(this.date)
      console.log(this.currentDate)
      const startDate = this.date > this.currentDate ? this.date : this.currentDate
      this.list.push({
        futurePlanId: null,
        futurePlanGoal: null,
        startDate: startDate, // this.date,
        endDate: '' // this.date
      })
    },
    deleteRow(index) {
      const id = this.list[index].futurePlanId
      if (id) {
        this.deleteIds.push(id)
      }
      this.list.splice(index, 1)
    },
    handleFocus(index) {
      this.current = index
    },
    submit() {
      let flag = true
      this.$refs['ruleForm'].forEach(com => {
        com.validate((valid) => {
          flag = flag && valid
          if (!valid) {
            return false
          }
        })
      })
      if (!flag) {
        return
      }
      this.subbtn = true
      const param = {
        entities: this.list,
        deleteIds: this.deleteIds
      }
      baseRequest('/objective/rwFuturePlan/confirmFuturePlan', param)
        .then(response => {
          this.subbtn = false
          this.$Message.success('操作成功')
          this.formVisible = false
          this.$emit('refresh')
        })
    },
    resetForm(formName) {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .item-delete {
    position: absolute;
    right: 0;
    top: -5px;
  }

  .line{
    border-bottom: dashed 1px #aaaaaa;
    margin: 20px 0;
  }
</style>