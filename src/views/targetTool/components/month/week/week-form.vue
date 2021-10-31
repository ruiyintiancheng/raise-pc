/** 周时间管理表单 */
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
        <el-form-item style="margin-top:0px;" prop="weeklyMatter">
            <div class="form-label required">事项</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.weeklyMatter" show-word-limit maxlength="200"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
            <div class="form-label">开始时间</div>
            <el-cascader
              style="width:100%"
              clearable
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
              clearable
              placeholder="请选择结束时间"            
              v-model="ruleForm.endDate"
              :options="endOptions"
              separator=" "
              :props="{ emitPath: false }" />  
        </el-form-item>
      </el-form>
      <span v-if="!disable" slot="footer">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
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
    year: {
      type: [String, Number],
      default: null
    },
    month: {
      type: [String, Number],
      default: null
    },
    // 周时间
    weekDate: {
      type: [String, Number],
      default: null
    },
    weekNum: [Number, String],
    disable: Boolean
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加事项', url: '/objective/rwWeeklySchedule/add' },
        { title: '修改事项', url: '/objective/rwWeeklySchedule/update' },
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
          { required: true, message: '请填写事项' }
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
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      this.formVisible = true
      if (row) { // 修改
        this.status = 1
        this.params = {
          dayWeek: this.weekNum,
          monthlyDate: this.month,
          weeklyScheId: row.weeklyScheId
        }
        this.ruleForm.weeklyMatter = row.weeklyMatter
        this.ruleForm.startDate = row.startDate
        this.ruleForm.endDate = row.endDate
      } else { // 添加
        this.status = 0

        this.params = {
          dayWeek: this.weekNum,
          monthlyDate: this.month
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
      if (this.ruleForm.startDate || this.ruleForm.endDate) {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.trip()
          }
        })
      } else {
        this.trip()
      }
    },
    async trip() {
      this.subbtn = true
      // 添加的时候先查询日程是否冲突
      // const trip = {
      //   dailyId: this.params.weeklyScheId || '',
      //   dailyDate: this.params.weekDate,
      //   startDate: this.ruleForm.startDate,
      //   endDate: this.ruleForm.endDate
      // }
      // const flag = await baseRequest('/objective/rwDaily/addTripFlag', trip)
      //   .then(response => {
      //     return response.data.item.result
      //   })
      // if (!flag) {
      //   this.$Message.warning('日程冲突，请选择别的时段')
      //   this.subbtn = false
      //   return false
      // }
      // this.params = {
      //   dayWeek: this.weekNum,
      //   monthlyDate: this.month
      // }
      const url = this.message[this.status].url
      const params = { ...this.params, ...this.ruleForm }
      baseRequest(url, params).then(() => {
        this.$Message.success('操作成功')
        this.$emit('refresh')
        this.formVisible = false
      }).finally(_ => {
        this.subbtn = false
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