/** 沟通 */
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
        <el-form-item style="margin-top:0px;" prop="trackItem">
            <div class="form-label required">沟通事项</div>
            <el-input type="textarea" :rows="4" style="" v-model="ruleForm.trackItem" show-word-limit maxlength="200"></el-input>
        </el-form-item>
        <el-form-item style="margin-top:0px;">
            <div class="form-label">沟通人</div>
            <el-input  v-model="ruleForm.trackUser" ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:0px;">
            <div class="form-label">时长（min）</div>
            <el-input  onkeyup="value=value.replace(/[^\d]/g,'')" v-model="ruleForm.duration" placeholder="请输入数字"></el-input>
        </el-form-item>
        <el-form-item prop="startDate">
            <div class="form-label">开始时间</div>
            <el-cascader
            clearable
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
            clearable
              style="width:100%"
              placeholder="请选择结束时间"            
              v-model="ruleForm.endDate"
              :options="endOptions"
              separator=" "
              :props="{ emitPath: false }" />  
        </el-form-item>
      </el-form>
      <span slot="footer" v-if="!disable">
        <el-button @click="formVisible = false">取 消</el-button>
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
    label: {
      type: String,
      default: ''
    },
    viewDate: {
      type: String,
      default: null
    },
    dailyDate: {
      type: String,
      default: null
    },
    disable: Boolean
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      message: [
        { title: '添加', url: '/objective/rwDailyTrack/insert' },
        { title: '修改', url: '/objective/rwDailyTrack/update' },
        { title: '查看' }
      ],
      subbtn: false,

      ruleForm: {
        trackItem: null,
        trackUser: null,
        duration: null,
        startDate: null,
        endDate: null
      },
      params: {},

      rules: {
        trackItem: [
          { required: true, message: '请填写事项内容' }
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
      this.subbtn = false
      if (row) { // 修改
        this.status = 1
        this.params = {
          trackId: row.trackId,
          viewDate: this.viewDate,
          dailyDate: row.dailyDate
        }
        this.ruleForm = {
          trackItem: row.trackItem,
          trackUser: row.trackUser,
          duration: row.duration,
          startDate: row.startDate,
          endDate: row.endDate
        }
      } else { // 添加
        this.status = 0

        this.params = {
          viewDate: this.viewDate,
          dailyDate: this.dailyDate
        }

        this.ruleForm = {
          trackItem: null,
          trackUser: null,
          duration: null,
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
      const url = this.message[this.status].url
      const params = { ...this.params, ...this.ruleForm }
      baseRequest(url, params).then(response => {
        if (response.code !== 1) {
          this.subbtn = false
          return
        }
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

</style>