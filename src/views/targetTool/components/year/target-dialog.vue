/** 年度重要目标表单 */
<template>
  <div>
    <el-dialog
      append-to-body
      :title="message[status].title"
      :visible.sync="formVisible"
      class="dialog-main heightauto"
      top="5%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <el-form v-if="formVisible" ref="ruleForm" :model="ruleForm" :rules="rules">
                    
        <el-form-item style="margin-top:0px;" prop="annualField">
            <div class="form-label required">领域</div>
            <el-select style="width: 100%;" v-model="ruleForm.annualField">
              <el-option v-for="item in options" :key="item.valueField" :label="item.valueFieldName" :value="item.valueField"></el-option>
            </el-select>
        </el-form-item>           
        <el-form-item style="margin-top:0px;" prop="annualGoal">
            <div class="form-label required">目标</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.annualGoal" show-word-limit maxlength="100"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
            <div class="form-label">开始日期</div>
            <el-date-picker style="width:100%" v-model="ruleForm.startDate"
                type="date"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptionsStart"
                >
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="endDate">
            <div class="form-label">预计达成日期</div>
            <el-date-picker style="width:100%" v-model="ruleForm.endDate"
                type="date"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptionsEnd"
                >
            </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'

export default {
  components: {

  },
  props: {
    id: [String, Number],
    viewYear: [String, Number],
    options: Array
  },
  computed: {
    yearStratTime() {
      return new Date(this.viewYear + '-01-01 00:00:00').getTime()
    },
    yearEndTime() {
      return new Date(this.viewYear + '-12-31 23:59:59').getTime()
    }
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加年度重要目标', url: '/objective/rwAnnual/add' },
        { title: '修改年度重要目标', url: '/objective/rwAnnual/update' }
      ],
      subbtn: false,

      ruleForm: {
        annualField: null,
        annualGoal: null,
        startDate: null,
        endDate: null
      },
      params: {},

      rules: {
        annualField: [
          { required: true, message: '请选择领域' }
        ],
        annualGoal: [
          { required: true, message: '请输入明确的行动步骤' }
        ],
        startDate: [
          {
            validator: (rule, value, callback) => {
              if (!value && this.ruleForm.endDate) {
                callback(new Error('请选择开始日期'))
              } else {
                callback()
              }
            }
          }
        ],
        endDate: [
          {
            validator: (rule, value, callback) => {
              if (!value && this.ruleForm.startDate) {
                callback(new Error('请选择预计达成日期'))
              } else {
                callback()
              }
            }
          }
        ]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.ruleForm.endDate) {
            let date = this.ruleForm.endDate
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate ||
              time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.yearStratTime ||
              time.getTime() > this.yearEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.yearStratTime ||
              time.getTime() > this.yearEndTime
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.ruleForm.startDate) {
            let date = this.ruleForm.startDate
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate ||
                time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
                time.getTime() < this.yearStratTime ||
                time.getTime() > this.yearEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
                time.getTime() < this.yearStratTime ||
                time.getTime() > this.yearEndTime
          }
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
    openDialog(rw) {
      this.formVisible = true
      this.subbtn = false
      this.status = 0

      this.ruleForm = {
        annualField: null,
        annualGoal: null,
        startDate: '',
        endDate: ''
      }
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.subbtn = true
          const url = this.message[this.status].url
          const params = { ...this.params, ...this.ruleForm, viewDate: this.viewYear }
          baseRequest(url, params).then(() => {
            this.$emit('refresh', this.ruleForm.annualField)
            this.subbtn = false
            this.formVisible = false
            this.$Message.success('操作成功')
          })
        } else {
          return false
        }
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

</style>