/** 1对1辅导表单 */
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
      <el-form v-if="formVisible" ref="ruleForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="startDate">
            <div class="gps-label">辅导日期</div>
            <el-date-picker style="width:100%" v-model="ruleForm.startDate"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder="选择日期"
                :picker-options="pickerOptionsStart"
                >
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="time">
            <div class="gps-label">辅导时间</div>
            <el-select v-model="ruleForm.time" placeholder="请选择辅导时间" style="width:100%">
              <el-option
                v-for="(item, i) in timeRange"
                :key="i"
                :label="`${item.start} —— ${item.end}`"
                :value="i">
              </el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button :loading="loading" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { dateFormat } from '@/utils/dateUtil'

export default {
  components: {},
  props: {
    label: {
      type: String,
      default: ''
    },
    courseId: [String, Number],
    oneDate: String
  },
  data() {
    return {
      formVisible: false,
      loading: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加辅导时间', url: '/course/firstStepCoach/addPlanOneVOne' },
        { title: '修改辅导时间', url: '/course/firstStepCoach/updatePlanOneVOne' }
      ],

      ruleForm: {
        startDate: null,
        time: null
      },
      params: {},
      rules: {
        time: [
          { required: true, message: '请选择辅导时间' }
        ],
        startDate: [
          { validator: (rule, value, callback) => {
            if (!value || value === '') {
              callback(new Error('请选择辅导日期'))
            } else {
              callback()
            }
          } }
        ]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          const newDate = new Date(this.oneDate).getTime() + 7 * 24 * 3600 * 1000
          const endDate = newDate + 6 * 24 * 3600 * 1000
          return time.getTime() < newDate || time.getTime() > endDate || time.getTime() < new Date().getTime()
        }
      }
    }
  },
  computed: {
    timeRange() {
      const time = []

      for (let i = 0; i <= 23; i++) {
        // if (!((i >= 14 && i <= 34) || (i >= 42 && i <= 46))) {
        // if (!(i >= 14 && i <= 46)) {
        //   continue
        // }
        const min = i * 60
        time.push({
          start: format(min),
          end: format(min + 50)
        })
      }

      function format(min) {
        const h = parseInt(min / 60)
        const m = parseInt(min % 60)
        return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}`
      }
      return time
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row) {
      this.formVisible = true
      this.loading = false

      if (row) { // 修改
        this.status = 1
        this.params = {
          planId: row.planId
        }

        this.ruleForm = {
          startDate: dateFormat(row.startTime, 'yyyy-MM-dd'),
          time: this.getTimeIndex(row.startTime)
        }
      } else { // 添加
        this.status = 0

        this.params = {
          courseId: this.courseId
        }

        this.ruleForm = {
          startDate: '',
          time: null
        }

        this.resetForm('ruleForm')
      }
    },
    getTimeIndex(startTime) {
      const time = dateFormat(startTime, 'hh:mm')
      let index = 0
      this.timeRange.forEach((d, i) => {
        if (d.start === time) {
          index = i
        }
      })
      return index
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const url = this.message[this.status].url

          this.$confirm('确定提交表单么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const params = { ...this.params }
            const time = this.timeRange[this.ruleForm.time]
            params.startTime = this.ruleForm.startDate + ' ' + (time.start) + ':00'
            params.endTime = this.ruleForm.startDate + ' ' + (time.end) + ':00'
            this.loading = true
            baseRequest(url, params)
              .then(response => {
                if (response.code === 2) {
                  return
                }
                this.formVisible = false
                this.$Message.success('操作成功')
                this.$emit('refresh')
              })
              .finally(() => {
                this.loading = false
              })
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