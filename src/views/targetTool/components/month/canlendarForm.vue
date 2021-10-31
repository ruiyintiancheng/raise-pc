/** 添加月历表事项 */
<template>
  <div>
    <el-dialog
      append-to-body
      title="添加事项"
      :visible.sync="formVisible"
      class="dialog-main heightauto"
      top="5%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item style="margin-top:0px;" prop="dailyType">
            <div class="form-label required">紧要/重要事项</div>
            <el-select :rows="4" v-model="ruleForm.dailyType" style="width:100%;">
              <el-option label="紧要事项" value="0"></el-option>
              <el-option label="重要事项" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item style="margin-top:0px;" prop="dailyMatter">
            <div class="form-label required">事项</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.dailyMatter" show-word-limit maxlength="200"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:0px;">
            <div class="form-label">时长（min）</div>
            <el-input  onkeyup="value=value.replace(/[^\d]/g,'')" v-model="ruleForm.duration" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
            <div class="form-label">开始时间</div>
            <el-cascader
              style="width:100%"
              placeholder="请选择开始时间"            
              v-model="ruleForm.startDate"
              :options="startOptions"
              separator=" "
              :props="{emitPath: false }" />
        </el-form-item>
        <el-form-item prop="endDate">
            <div class="form-label">结束时间</div>
            <el-cascader
              style="width:100%"
              placeholder="请选择结束时间"            
              v-model="ruleForm.endDate"
              :options="endOptions"
              separator=" "
              :props="{ emitPath: false }" />  
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="commitHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { selectTimeRange } from '@/utils/dateUtil'

export default {
  components: {

  },
  props: {
    monthlyDate: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    startOptions() {
      return selectTimeRange({
        step: 10,
        edt: 10,
        end: this.ruleForm.endDate
      })
    },
    endOptions() {
      return selectTimeRange({
        step: 10,
        sdt: 10,
        start: this.ruleForm.startDate
      })
    }
  },
  data() {
    return {
      formVisible: false,
      subbtn: false,
      ruleForm: {
        dailyMatter: null,
        dailyType: '',
        duration: null,
        startDate: null,
        endDate: null
      },
      rules: {
        dailyMatter: [
          { required: true, message: '请填写事项' }
        ],
        dailyType: [
          { required: true, message: '请选择类型' }
        ],
        startDate: [
          { validator: (rule, value, callback) => {
            if (!value || value === '') {
              callback(new Error('请选择开始时间'))
            } else {
              callback()
            }
          } }
        ],
        endDate: [
          { validator: (rule, value, callback) => {
            if (!value || value === '') {
              callback(new Error('请选择结束时间'))
            } else {
              callback()
            }
          } }
        ]
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
      this.ruleForm = {
        trackGoal: null
      }
      this.resetForm('ruleForm')
    },
    // 表单提交
    commitHandle() {
      if (this.ruleForm.startDate || this.ruleForm.endDate) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.submit()
          }
        })
      } else {
        this.submit()
      }
    },
    submit() {
      this.subbtn = true
      const params = {
        dailyDate: this.monthlyDate,
        dailyMatter: this.ruleForm.dailyMatter,
        dailyType: this.ruleForm.dailyType,
        duration: this.ruleForm.duration,
        endDate: this.ruleForm.endDate,
        startDate: this.ruleForm.startDate
      }
      baseRequest('/objective/rwDaily/add', params).then(() => {
        this.subbtn = false
        this.$Message.success('操作成功')
        this.formVisible = false
        this.$emit('refresh')
      })
    },
    resetForm(formName) {
      // 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
      this.ruleForm = {
        dailyMatter: null,
        dailyType: '',
        duration: null,
        startDate: null,
        endDate: null
      }
      this.$nextTick(_ => {
        this.$refs[formName].clearValidate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>

</style>