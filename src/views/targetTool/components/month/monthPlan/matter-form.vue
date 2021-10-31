/** 紧要/重要事项计划表 */
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
        <el-form-item style="margin-top:0px;" prop="monCont">
            <div class="form-label required">{{content}}</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.monCont" show-word-limit maxlength="200"></el-input>
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
      <span slot="footer" v-if="!disable">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { queryDays } from '@/utils/dateUtil'
export default {
  components: {

  },
  props: {
    label: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '目标'
    },
    viewDate: String,
    // 月度id
    monthlyId: {
      type: [String, Number],
      default: null
    },
    // 内容类型
    contType: {
      type: [String, Number],
      default: null
    },
    // 领域码值
    fieldCode: {
      type: [String, Number],
      default: null
    },
    disable: Boolean
  },
  computed: {
    monthStartTime() {
      return new Date(this.viewDate + '-01 00:00:00').getTime()
    },
    monthEndTime() {
      const day = queryDays(this.viewDate + '-01')
      return new Date(this.viewDate + '-' + day + ' 23:59:59').getTime()
    }
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加', url: '/objective/rwMonthlyCont/add' },
        { title: '修改', url: '/objective/rwMonthlyCont/update' },
        { title: '查看' }
      ],
      subbtn: false,

      ruleForm: {
        monCont: null,
        startDate: null,
        endDate: null
      },
      params: {},

      rules: {
        monCont: [
          { required: true, message: `请填写${this.content}内容` }
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
              time.getTime() < this.monthStartTime ||
              time.getTime() > this.monthEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.monthStartTime ||
              time.getTime() > this.monthEndTime
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
              time.getTime() < this.monthStartTime ||
              time.getTime() > this.monthEndTime
          } else {
            return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
              time.getTime() < this.monthStartTime ||
              time.getTime() > this.monthEndTime
          }
        }
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      this.formVisible = true
      this.subbtn = false

      if (row) { // 修改
        this.status = 1
        this.params = {
          monContId: row.monContId,
          contType: row.contType,
          sourceType: row.sourceType
        }
        this.ruleForm = {
          monCont: row.monCont,
          startDate: row.startDate,
          endDate: row.endDate
        }
      } else { // 添加
        this.status = 0

        this.params = {
          monthlyId: this.monthlyId,
          contType: this.contType,
          fieldCode: this.fieldCode,
          viewDate: this.viewDate,
          isFirst: '0'
        }

        this.ruleForm = {
          monCont: null,
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