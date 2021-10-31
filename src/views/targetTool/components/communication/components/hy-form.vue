/** 会议计划表单 */
<template>
  <div>
    <el-dialog
      append-to-body
      :title="message[status].title"
      :visible.sync="formVisible"
      class="dialog-main heightauto"
      top="5%"
      width="1270px"
      destroy-on-close
      :close-on-click-modal="false"
      >
      <el-form v-if="formVisible" ref="ruleForm" :model="ruleForm" :rules="rules" inline>
        <el-form-item prop="conferenceName" style="margin:0 30px 0 0;">
          <div class="form-label required">会议名称</div>
          <el-input v-model="ruleForm.conferenceName" :disabled="inputState" type="textarea" placeholder="请填写会议名称" :rows="4" style="width: 580px;" show-word-limit maxlength="200" />
        </el-form-item>
        <el-form-item prop="conferenceTime" style="margin:0px;">
          <div class="form-label required">会议起始日期</div>
          <el-date-picker style="width: 250px"
            v-model="ruleForm.conferenceTime"
            :picker-options="pickerOptionsStart" 
            type="date"
            :disabled="inputState"
            value-format='yyyy-MM-dd'
            placeholder="请选择日期" />
        </el-form-item>
        <div class="line" />
        <el-form-item prop="conferenceContent" style="margin:0 30px 0 0;">
          <div class="form-label">会议目的/内容</div>
          <el-input v-model="ruleForm.conferenceContent" type="textarea" :disabled="inputState" placeholder="请填写会议内容（不要少于10字，不要超过500字）" :rows="4" style="width: 580px;" show-word-limit maxlength="500" />
        </el-form-item>
        <el-form-item prop="conferenceContent" style="margin:0px;">
          <div class="form-label">主要参会者</div>
          <el-input v-model="ruleForm.attendee" type="textarea" :disabled="inputState" placeholder="请填写主要参会者（不要少于10字，不要超过100字）" :rows="4" style="width: 580px;" show-word-limit maxlength="100" />
        </el-form-item>
         <div class="line" />
        <div class="form-label">会议日程安排</div>
        <schedule-table ref="scheduleTable" :view-date="viewDate" :tableId="tableId" :isShow="status" style="margin-bottom:10px"></schedule-table>
        <div class="line" />
        <form-table ref="formTable" :view-date="viewDate" :disable="disable" :btnStatus="btnStatus" :tableId="tableId" :isShow="status"/>
      </el-form>
      <span slot="footer" v-if="btnStatus">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import formTable from './hy-form-table'
import scheduleTable from './hy-form-schedule-table'

export default {
  components: {
    formTable,
    scheduleTable
  },
  props: {
    viewDate: String,
    disable: Boolean
  },
  data() {
    return {
      formVisible: false,
      status: 0, // 0添加 1修改
      selectUrl: '/objective/rwConference/select',
      message: [
        { title: '添加会议计划', url: '/objective/rwConference/confirmConference' },
        { title: '修改会议计划', url: '/objective/rwConference/confirmConference' },
        { title: '查看会议计划', url: '/objective/rwConference/confirmConference' }
      ],
      subbtn: false,
      inputState: false,
      btnStatus: true,
      tableId: '',
      params: {
        id: null,
        items: null,
        deleteIds: null
      },
      ruleForm: {
        conferenceName: null,
        conferenceTime: null,
        conferenceContent: null,
        attendee: null
      },
      rules: {
        conferenceName: [
          { required: true, message: '请填写会议名称' }
        ],
        conferenceTime: [
          { required: true, message: '请选择会议时间' }
        ]
      },
      pickerOptionsStart: {
        disabledDate: (time) => {
          return time.getTime() < new Date().getTime() - (24 * 3600 * 1000) ||
            time.getTime() < this.yearStratTime ||
            time.getTime() > this.yearEndTime
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
    openDialog(row, state) {
      this.tableId = row ? row.id : 0
      this.formVisible = true
      this.subbtn = false
      this.btnStatus = state
      if (row && state) { // 修改
        this.status = 1
        this.searchRow({ id: row.id })
        this.inputState = false
      } else if (row && !state) {
        this.status = 2
        this.inputState = true
        this.searchRow({ id: row.id })
      } else { // 添加
        this.status = 0
        this.inputState = false
        this.params = {
          id: null,
          items: [],
          viewDate: this.viewDate,
          deleteIds: null
        }
        this.ruleForm = {
          conferenceName: null,
          conferenceTime: null,
          conferenceContent: null
        }
        this.resetForm('ruleForm')
      }
      if (this.disable) {
        this.status = 2
      }
    },
    searchRow(params) {
      baseRequest(this.selectUrl, params).then((response) => {
        const { id, conferenceName, conferenceTime, conferenceContent, attendee, items, scheduleList } = response.data.item
        this.params = {
          id, items, scheduleList,
          deleteIds: null,
          viewDate: this.viewDate
        }
        this.ruleForm = { conferenceName, conferenceTime, conferenceContent, attendee }
        this.$refs.formTable.loadTable(this.params.items)
        this.$refs.scheduleTable.loadTable(this.params.scheduleList)
      })
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const check = this.$refs.formTable.checkSave()
          if (!check) {
            return false
          }
          this.subbtn = true
          const url = this.message[this.status].url
          const data = this.$refs.formTable.getData()
          const scheduleParams = this.$refs.scheduleTable.getData()
          const params = { ...this.params, ...this.ruleForm, ...data, scheduleId: scheduleParams.scheduleId, scheduleList: scheduleParams.list }
          baseRequest(url, params).then(() => {
            this.subbtn = false
            this.formVisible = false
            this.$Message.success('操作成功')
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
  .line{
    border-bottom: dashed 1px #aaaaaa;
    margin:30px 0;
  }
</style>