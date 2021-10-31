/** 讨论计划表单 */
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
      :close-on-click-modal="false">
      <el-form v-if="formVisible" ref="ruleForm" :model="ruleForm" :rules="rules" inline>
        <el-form-item prop="discussContent" style="margin-right: 50px;">
          <div class="form-label left required">主题</div>
          <el-input v-model="ruleForm.discussContent" :disabled="inputState" type="textarea" placeholder="请填写会议内容（不要少于10字，不要超过200字）" :rows="4" style="width: 580px;" show-word-limit maxlength="200" />
        </el-form-item>
        <div class="line" />
        <el-form-item prop="discussType" style="margin-right: 50px;">
          <div class="form-label left required">类型</div>
          <el-radio-group v-model="ruleForm.discussType" :disabled="(status === 1&&arrLength)||status === 2|| disable ">
            <el-radio label="0">项目</el-radio>
            <el-radio label="1">事项</el-radio>
          </el-radio-group>
        </el-form-item>
        <form-table v-if="ruleForm.discussType === '0'" ref="formTable" :view-date="viewDate" :disable="disable" :buttonState="btnStatus" :discussType="ruleForm.discussType" :inputState="inputState" :isShow="status"/>
        <form-tablesx v-else ref="formTable" :view-date="viewDate" :disable="disable" :buttonState="btnStatus" :discussType="ruleForm.discussType" :isShow="status" />
      </el-form>
      <span  slot="footer">
        <div v-if="btnStatus">
          <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subbtn" @click="submit">确 定</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import formTable from './tlFormTable'
import formTablesx from './tlFormSxtable'

export default {
  components: {
    formTable,
    formTablesx
  },
  props: {
    viewDate: String,
    disable: Boolean
  },
  computed: {},
  data() {
    return {
      formVisible: false,
      btnStatus: true,
      status: 0, // 0添加 1修改
      selectUrl: '/objective/rwDiscussPlan/select',
      message: [
        { title: '添加沟通追踪', url: '/objective/rwDiscussPlan/confirmDiscuss' },
        { title: '修改沟通追踪', url: '/objective/rwDiscussPlan/confirmDiscuss' },
        { title: '查看沟通追踪', url: '/objective/rwDiscussPlan/confirmDiscuss' }
      ],
      subbtn: false,
      isShow: true,
      inputState: false,
      arrLength: false,
      params: {
        id: null,
        items: null,
        deleteItemIds: null,
        deleteActionIds: null
      },
      ruleForm: {
        discussType: '0',
        discussContent: null
      },
      rules: {
        discussContent: [
          { required: true, message: '请填写讨论内容' }
        ],
        discussType: [
          { required: true, message: '请选择讨论类型' }
        ]
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 打开弹框
    openDialog(row, state) {
      this.formVisible = true
      this.btnStatus = state
      this.isShow = !!row
      this.subbtn = false
      console.log(row)
      if (row && state) { // 修改
        this.status = 1
        this.inputState = false
        this.searchRow({ id: row.id })
      } else if (row && !state) { // 查看
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
          deleteActionIds: null
        }
        this.ruleForm = {
          discussType: '0',
          discussContent: null
        }
        // this.resetForm('ruleForm')
      }
      if (this.disable) {
        this.status = 2
      }
    },
    searchRow(params) {
      baseRequest(this.selectUrl, params).then((response) => {
        const { id, discussType, discussContent, items, actions } = response.data.item
        this.params = { id,
          deleteActionIds: null,
          viewDate: this.viewDate,
          deleteItemIds: null
        }
        console.log(actions)
        this.ruleForm = { discussType, discussContent }
        this.$nextTick(() => {
          if (discussType === '0') {
            this.$refs.formTable.loadTable(items)
            this.arrLength = items.length > 0
          }
          if (discussType === '1') {
            this.$refs.formTable.loadTable(actions)
            this.arrLength = actions.length > 0
          }
        })
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
  .dialog-main {
    .form-label {
      line-height: 36px;
      &.left {
        float: left;
        margin-right: 20px;
      }
    }
  }

</style>