/** 行动 */
<template>
  <div>
    <el-dialog
      append-to-body
      :title="message[status].title + '行动'"
      :visible.sync="formVisible"
      class="dialog-main heightauto"
      top="5%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item style="margin-top:0px;" prop="itemName">
            <div class="form-label required">具体行动</div>
            <el-input
              v-model="ruleForm.itemName" 
              type="textarea" 
              placeholder="请填写内容（不要少于10字，不要超过100字）" :rows="4"  show-word-limit maxlength="200">
            </el-input>
        </el-form-item>
        <el-form-item style="margin-top:0px;" prop="itemPrincipal">
            <div class="form-label required">负责人</div>
            <el-checkbox style="margin-left: 10px;"
              v-model="ruleForm.isSelf"
              true-label="1"
              false-label="0"
              @change="handleChange"
              >本人负责</el-checkbox> 
            <el-input
              v-model="ruleForm.itemPrincipal" 
              :disabled="ruleForm.isSelf === '1'"
              placeholder="请填写负责人"/>
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
            <el-date-picker style="width:100%" v-model="ruleForm.itemDate"
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
export default {
  components: {},
  props: {
    viewDate: String
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

      disable: true,

      ruleForm: {
        itemName: null,
        isSelf: '1',
        itemPrincipal: null,
        startDate: null,
        itemDate: null
      },
      params: {},
      rules: {
        itemName: [
          { required: true, message: `请填写行动内容` }
        ],
        itemPrincipal: [
          {
            validator: (rule, value, callback) => {
              if (!value && this.ruleForm.isSelf === '0') {
                callback(new Error('请填写负责人'))
              } else {
                callback()
              }
            }
          }
        ],
        startDate: [
          { validator: (rule, value, callback) => {
            if (!value && this.ruleForm.itemDate) {
              callback(new Error('请选择追踪日期'))
            } else {
              callback()
            }
          } }
        ],
        itemDate: [
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
          if (this.ruleForm.itemDate) {
            let date = this.ruleForm.itemDate
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
  computed: {
    yearStratTime() {
      return new Date(this.viewDate + '-01-01 00:00:00').getTime()
    },
    yearEndTime() {
      return new Date(this.viewDate + '-12-31 23:59:59').getTime()
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      this.formVisible = true
      this.subbtn = false

      this.status = row.status
      this.ruleForm = { ...row }
      this.resetForm('ruleForm')

      // itemName: null,
      // itemDate: null,
      // reachDate: null,
      // itemPrincipal: null,
      // isSelf: '1'
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.$emit('save', this.ruleForm)
          this.formVisible = false
        } else {
          return false
        }
      })
    },
    handleChange(value) {
      if (value === '1') {
        this.ruleForm.itemPrincipal = null
      }
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