/** 授权表单 */
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
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" inline>
        <el-form-item prop="empWork" style="margin:0 30px 0 0;">
            <div class="form-label required">授权内容</div>
            <el-input v-model="ruleForm.empWork" type="textarea" :disabled="inputState" placeholder="请填写内容（不要少于10字，不要超过200字）" :rows="4" style="width: 580px;" show-word-limit maxlength="200"></el-input>
        </el-form-item>
        <el-form-item prop="empPerson" style="margin:0px;">
          <div class="form-label required">被授权的人</div>
          <el-input v-model="ruleForm.empPerson" :disabled="inputState" placeholder="请填写被授权人" style="width: 250px;" />
        </el-form-item>
        <div class="line" />

        <el-form-item prop="empNowLevel" style="margin-right: 50px;">
          <div class="form-label">现在的授权层级</div>
          <el-select v-model="ruleForm.empNowLevel" placeholder="请选择" style="width: 280px" :disabled="inputState">
            <el-option v-for="(item,index) in currentClassList" :key="index"
              :label="item.codeName"
              :value="item.codeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="empReachLevel" style="margin:0px;">
          <div class="form-label">要达到的授权层级</div>
          <el-select v-model="ruleForm.empReachLevel" placeholder="请选择" style="width: 280px" :disabled="inputState">
            <el-option v-for="(item,index) in achieveClassList" :key="index"
              :label="item.codeName"
              :value="item.codeId">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="line" />

        <el-form-item prop="benefitToMe" style="margin:0 28px 0 0;">
            <div class="form-label">对我的益处</div>
            <el-input v-model="ruleForm.benefitToMe" :disabled="inputState" type="textarea" placeholder="请填写内容（不要少于10字，不要超过500字）" :rows="4" style="width: 580px;" show-word-limit maxlength="500"></el-input>
        </el-form-item>
        <el-form-item prop="benefitToEmped" style="margin:0px;">
            <div class="form-label">对被授权人的益处</div>
            <el-input v-model="ruleForm.benefitToEmped" :disabled="inputState" type="textarea" placeholder="请填写内容（不要少于10字，不要超过500字）" :rows="4" style="width: 580px;" show-word-limit maxlength="500"></el-input>
        </el-form-item>
        <div class="line" />
        <form-table ref="formTable" :view-date="viewDate" :disable="disable" :buttonState="btnStatus" :empId="empId" :isShow="status" />
      </el-form>
      <span slot="footer" v-if="btnStatus">
        <el-button  @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import formTable from './sq-form-table'
export default {
  components: {
    formTable
  },
  props: {
    viewDate: String,
    disable: Boolean
  },
  computed: {},
  data() {
    return {
      currentClassList: [],
      achieveClassList: [],
      formVisible: false,
      status: 0, // 0添加 1修改
      selectUrl: '/objective/rwEmpower/select',
      message: [
        { title: '添加授权计划', url: '/objective/rwEmpower/add' },
        { title: '修改授权计划', url: '/objective/rwEmpower/update' },
        { title: '查看授权计划', url: '/objective/rwEmpower/update' }
      ],
      subbtn: false,
      btnStatus: true,
      empId: '',
      inputState: false,
      ruleForm: {
        empWork: null,
        empPerson: null,
        empNowLevel: null,
        empReachLevel: null,
        benefitToMe: null,
        benefitToEmped: null,
        empConts: null
      },
      params: {},
      current: null,
      rules: {
        empWork: [
          { required: true, message: '请填写要授权的工作' }
        ],
        empPerson: [
          { required: true, message: '请填写被授权人' }
        ]
      }
    }
  },
  created() {},
  mounted() {
    this.getNowClass()
    this.getAchieveClass()
  },
  methods: {
    // 获取要达到的授权层级 codeType = 1
    getAchieveClass() {
      baseRequest('/objective/rwEmpower/getCode', { codeType: 1 }).then((response) => {
        this.achieveClassList = response.data.item
      })
    },
    // 获取现在的授权层级 codeType = 0
    getNowClass() {
      baseRequest('/objective/rwEmpower/getCode', { codeType: 0 }).then((response) => {
        this.currentClassList = response.data.item
      })
    },
    // 打开弹框
    openDialog(row, state) {
      this.empId = row ? row.empId : 0
      this.formVisible = true
      this.subbtn = false
      this.btnStatus = state
      if (row && state) { // 修改
        this.status = 1
        this.inputState = false
        this.searchRow({ empId: row.empId })
      } else if (row && !state) { // 查看
        this.status = 2
        this.inputState = true
        this.searchRow({ empId: row.empId })
      } else { // 添加
        this.status = 0
        this.inputState = false
        this.params = {
          viewDate: this.viewDate,
          deleteIds: []
        }

        this.ruleForm = {
          empWork: null,
          empPerson: null,
          empNowLevel: null,
          empReachLevel: null,
          benefitToMe: null,
          benefitToEmped: null,
          empConts: []
        }
        this.resetForm('ruleForm')
      }
      if (this.disable) {
        this.status = 2
      }
    },
    searchRow(params) {
      baseRequest(this.selectUrl, params).then((response) => {
        const { empId,
          empPerson,
          empWork,
          benefitToMe,
          benefitToEmped,
          empConts } = response.data.item

        this.params = {
          empId,
          viewDate: this.viewDate,
          deleteIds: [],
          empConts: []
        }
        this.ruleForm = {
          empPerson,
          empWork,
          empReachLevel: response.data.item.reachCodeId,
          benefitToMe,
          benefitToEmped,
          empNowLevel: response.data.item.nowCodeId
        }

        this.$refs.formTable.loadTable(empConts)
      })
    },
    handleFocus(index) {
      this.current = index
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
          const params = { ...this.params, ...this.ruleForm, ...data }
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
    },
    checkSave() {
      for (let i = 0; i < this.ruleForm.empConts.length; i++) {
        const action = this.ruleForm.empConts[i]
        if (action.isUpdate) {
          this.$Message.warning('请保存修改数据')
          return false
        }
      }
      return true
    },
    addRow() {
      const check = this.checkSave()
      if (!check) {
        return
      }

      this.ruleForm.empConts.push({
        empCont: null,
        targetDate: null,
        reachDate: null,
        isUpdate: true
      })
    },
    updateRow(index) {
      const action = this.ruleForm.empConts[index]
      if (action.isUpdate && !action.empCont) {
        this.$Message.warning('请填写行动内容')
        return
      }
      this.$set(action, 'isUpdate', !action.isUpdate)
    },
    deleteRow(index) {
      const row = this.ruleForm.empConts[index]
      if (row.empContId) {
        this.params.deleteIds.push(row.empContId)
      }
      this.ruleForm.empConts.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .line{
    border-bottom: dashed 1px #aaaaaa;
    margin:30px 0;
    // width: 1210px;
  }
</style>