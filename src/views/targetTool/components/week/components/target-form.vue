/** 年度重要目标表单 */
<template>
  <div>
    <el-dialog
      append-to-body
      :title="message[status].title + label"
      :visible.sync="formVisible"
      class="dialog-main heightauto"
      top="5%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item style="margin-top:0px;" prop="weeklyMatter">
            <div class="form-label required">事项</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.weeklyMatter" show-word-limit maxlength="200"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
            <div class="form-label">追踪日期</div>
            <el-date-picker style="width:100%" v-model="ruleForm.startDate"
                type="date"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptionsStart"
                >
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="endData">
            <div class="form-label">预计达成日期</div>
            <el-date-picker style="width:100%" v-model="ruleForm.endDate"
                type="date"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptionsEnd"
                >
            </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" v-if="!disable">
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
    label: {
      type: String,
      default: ''
    },
    weeklyType: {
      type: String,
      default: null
    },
    startWeek: {
      type: String,
      default: null
    },
    endWeek: {
      type: String,
      default: null
    },
    weekDate: String,
    disable: Boolean
  },
  computed: {
    weekStartTime() {
      return new Date(this.startWeek + ' 00:00:00').getTime()
    },
    weekEndTime() {
      return new Date(this.endWeek + ' 23:59:59').getTime()
    }
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加', url: '/objective/rwWeekly/add' },
        { title: '修改', url: '/objective/rwWeekly/update' },
        { title: '查看' }
      ],
      subbtn: false,

      ruleForm: {
        weeklyMatter: null,
        startDate: null,
        endDate: null
      },
      params: {},

      rules: {
        weeklyMatter: [
          { required: true, message: '请填写事项内容' }
        ],
        startDate: [
          { validator: (rule, value, callback) => {
            if (!value && this.ruleForm.endDate) {
              callback(new Error('请选择追踪日期'))
            } else {
              callback()
            }
          } }
        ],
        endDate: [
          { validator: (rule, value, callback) => {
            if (!value && this.ruleForm.startDate) {
              callback(new Error('请选择预计达成日期'))
            } else {
              callback()
            }
          } }
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
              time.getTime() < this.weekStartTime ||
              time.getTime() > this.weekEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.weekStartTime ||
              time.getTime() > this.weekEndTime
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
              time.getTime() < this.weekStartTime ||
              time.getTime() > this.weekEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.weekStartTime ||
              time.getTime() > this.weekEndTime
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
    openDialog(row) {
      this.formVisible = true
      this.subbtn = false

      if (row) { // 修改
        this.status = 1
        this.params = {
          weeklyId: row.weeklyId,
          weeklyType: row.weeklyType,
          sourceType: row.sourceType
        }
        this.ruleForm = {
          weeklyMatter: row.weeklyMatter,
          startDate: row.startDate,
          endDate: row.endDate
        }
      } else { // 添加
        this.status = 0

        this.params = {
          weeklyType: this.weeklyType,
          weekDate: this.weekDate
        }

        this.ruleForm = {
          weeklyMatter: null,
          startDate: '',
          endDate: ''
        }
        this.resetForm('ruleForm')
      }

      if (this.disable) {
        this.status = 2
      }
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.subbtn = true
          const url = this.message[this.status].url
          const params = { ...this.params, ...this.ruleForm }
          baseRequest(url, params).then(() => {
            this.subbtn = false
            this.$Message.success('操作成功')
            this.formVisible = false
            this.$emit('refresh')
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