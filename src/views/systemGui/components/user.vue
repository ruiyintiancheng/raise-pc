<template>
  <div
    class="user-management"
    style="padding: 24px 23px"
    :style="{ minHeight: tableHight + 'px' }"
  >
    <div style="width: 1393px">
      <h1 class="systitle">筛选查询</h1>
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        class="sysquery"
      >
        <el-form-item label="" class="formitem">
          <div>用户名</div>
          <el-input
            style="width: 213px; height: 40px"
            placeholder="请填写用户名"
            clearable
            v-model="form.userName"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="formitem" prop="phone">
          <div>手机号</div>
          <el-input
            style="width: 213px; height: 40px"
			oninput="value=value.replace(/[^\d]/g,'')"
            maxlength="11"
            placeholder="请填写手机号"
            clearable
            v-model="form.phone"
          ></el-input>
        </el-form-item>
        <el-form-item
          label=""
          class="formitem"
          :prop="this.form.email ? 'email' : 'email1'"
        >
          <div>邮箱</div>
          <el-input
            style="width: 213px; height: 40px"
            placeholder="请填写邮箱"
            clearable
            v-model="form.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="" class="formitem">
          <div>用户角色</div>
          <el-select
            v-model="roleType"
            multiple
            collapse-tags
            placeholder="请选择角色"
            clearable
            style="width: 213px; height: 40px"
          >
            <el-option
              v-for="item in allUser"
              :key="item.role_type"
              :label="item.role_name"
              :value="item.role_type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formitem">
          <div>产品</div>
          <el-select
            v-model="productIdList"
            placeholder="请选择产品"
            multiple
            collapse-tags
            clearable
            style="width: 213px"
          >
            <el-option
              v-for="item in optionsproduct"
              :key="item.productId"
              :label="item.productName"
              :value="item.productId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="formitem" style="margin: 0">
          <el-form-item label="" prop="startTime">
            <div class="qurey-label">注册日期</div>
            <el-date-picker
              v-model="form.startTime"
              style="margin-right: 0px; width: 213px"
              class="learn-input"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择开始日期"
              :picker-options="pickerOptionsStart"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="endTime" style="margin-top: 36px">
            <span style="margin-right: 10px">至</span>
            <span class="inpt-title form-label"></span>
            <el-date-picker
              v-model="form.endTime"
              style="width: 213px"
              class="learn-input"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择结束日期"
              :picker-options="pickerOptionsEnd"
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <div class="operation">
          <el-button
            @click="adduser"
            style="
              width: 90px;
              height: 30px;
              line-height: 0.5;
              border: solid 1px #00afff;
              color: #00afff;
            "
            >添加</el-button
          >
          <el-button
            @click="searchOption()"
            style="width: 90px; height: 30px; line-height: 0.5"
            type="primary"
            >查询</el-button
          >
          <el-button
            :loading="downLoading"
            style="width: 90px; height: 30px; line-height: 0.5"
            @click="downLoad"
            >下载</el-button
          >
        </div>
      </el-form>
    </div>
    <div
      style="
        width: 1392px;
        height: 1px;
        border: dashed 1px #aaaaaa;
        margin-top: 20px;
        margin-bottom: 23px;
      "
    ></div>
    <div style="width: 1393px">
      <h1 class="systitle" style="margin-bottom: 20px">数据列表</h1>
      <el-table
        v-loading="loading"
        class="table-main"
        :data="tableData"
        row-key="planId"
        border
        default-expand-all
        style="width: 100%"
      >
        <el-table-column
          label=" "
          align="center"
          fixed="left"
          type="index"
          width="50"
        >
        </el-table-column>
        <el-table-column label="手机号" width="140" align="center">
          <template slot-scope="scope">
            <a style="color: blue" @click="userdatailed(scope.row)">{{
              scope.row.loginName
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          :show-overflow-tooltip="true"
          width="200"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="userName"
          align="center"
          width="180"
          label="用户名"
        >
        </el-table-column>
        <el-table-column
          prop="addTime"
          align="center"
          width="180"
          label="注册时间"
        >
        </el-table-column>
        <el-table-column
          prop="verifyTime"
          align="center"
          width="200"
          label="验证时间"
        >
        </el-table-column>
        <el-table-column
          prop="nickName"
          width="200"
          align="center"
          label="绑定微信"
        >
        </el-table-column>
        <el-table-column fixed="right" align="center" width="270">
          <!-- <template slot="header">
                   <a class="table-header-title"><svg-icon  icon-class="icon-add" /> 添加</a>
                </template> -->
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.userStatus === '1'"
              @click="roletitle(scope.row)"
              style="
                margin: 0 auto;
                width: 50px;
                height: 28px;
                line-height: 0.5;
                padding: 0;
              "
              type="warning"
              size="mini"
            >
              封号
            </el-button>
            <el-button
              v-if="scope.row.userStatus === '0'"
              @click="roletitle(scope.row)"
              style="
                margin: 0 auto;
                width: 50px;
                height: 28px;
                line-height: 0.5;
                padding: 0;
              "
              type="success"
              size="mini"
            >
              解封
            </el-button>
            <el-button
              @click="rolegement(scope.row)"
              style="
                margin: 0 auto;
                width: 70px;
                height: 28px;
                line-height: 0.5;
                padding: 0;
              "
              type="primary"
              size="mini"
            >
              角色配置
            </el-button>
            <el-button
              @click="zuzhangHandle(scope.row)"
              style="
                margin: 0 auto;
                width: 70px;
                height: 28px;
                line-height: 0.5;
                padding: 0;
              "
              v-if="scope.row.roleTypeList.some((item) => item === '4')"
              type="primary"
              size="mini"
            >
              选择组长
            </el-button>
            <el-button
              @click="jiaolianHandle(scope.row)"
              style="
                margin: 0 auto;
                width: 70px;
                height: 28px;
                line-height: 0.5;
                padding: 0;
              "
              v-if="scope.row.roleTypeList.some((item) => item === '2')"
              type="primary"
              size="mini"
            >
              查看教练
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <sur-pagination
        :pageNo="pageNo"
        :total="total"
        :pageSize="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></sur-pagination>
    </div>
    <el-dialog
      title="角色"
      :visible.sync="rolePop"
      class="dialog-main heightauto"
      top="10%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="boxcontent">
        <el-form
          class="formadd"
          style="margin-left: 20px"
          :model="formrole"
          label-width="80px"
        >
          <el-form-item label="">
            <el-checkbox-group v-model="formrole.roleuser">
              <el-checkbox
                style="width: 130px"
                v-for="item in roleOptions"
                :key="item.roleType"
                :label="item.roleName"
                :disabled="prohibitRole(item.roleType)"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="login-error">{{ errMsg }}</div>
      </div>
      <span slot="footer">
        <el-button @click="rolePop = false">取 消</el-button>
        <el-button type="primary" @click="rolecommit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="用户信息"
      :visible.sync="userinfoshow"
      class="dialog-main heightauto"
      top="10%"
      width="500px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="box">
        <div class="boxcontent">
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >用户名:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.userName
            }}</el-col>
          </el-row>
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >手机号:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.loginName
            }}</el-col>
          </el-row>
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >注册时间:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.addTime
            }}</el-col>
          </el-row>
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >验证时间:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.verifyTime
            }}</el-col>
          </el-row>
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >电子邮箱:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.email
            }}</el-col>
          </el-row>
          <el-row>
            <el-col class="userinfo" :span="6" style="text-align: right"
              >微信名称:</el-col
            >
            <el-col class="userinfo" :span="1"></el-col>
            <el-col class="userinfo" :span="16">{{
              detailedInformation.nickName
            }}</el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="userinfoshow = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserShow"
      class="dialog-main heightauto"
      top="10%"
      width="400px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <el-form
        ref="addUser"
        class="formadd"
        :model="addform"
        :rules="addRules"
        label-width="80px"
      >
        <el-form-item label="" prop="phone">
          <span class="form-label required">手机号</span>
          <el-input v-model="addform.phone" maxlength="11" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="addcommit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择组长"
      :visible.sync="zuzhangViasable"
      class="dialog-main heightauto"
      top="10%"
      width="450px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <div class="zu-zhang">
        <el-radio
          v-for="item in zuzhangList"
          :key="item.userId"
          class="zu-zhang-radio"
          v-model="zuzhangValue"
          :label="item.userId + ''"
          >{{ item.userName }}({{ item.loginName }})</el-radio
        >
      </div>
      <span slot="footer">
        <el-button @click="zuzhangViasable = false">取 消</el-button>
        <el-button type="primary" @click="zuzhangCommit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="查看教练"
      :visible.sync="jiaolianViasable"
      class="dialog-main heightauto"
      top="10%"
      width="550px"
      destroy-on-close
      :close-on-click-modal="false"
    >
      <coach-table
        v-if="jiaolianViasable"
        :jiaolianId="jiaolianId"
      ></coach-table>
      <span slot="footer">
        <el-button @click="jiaolianViasable = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { download } from '@/utils/download'
import CoachTable from './CoachTable'
export default {
  components: {
    CoachTable
  },
  data() {
    const reg =
      '/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*.[a-zA-Z0-9]{2,6}$/'
    var checkEmail = (rule, value, callback) => {
      if (!reg.test(value)) {
        console.log(11)
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var addcheckInput = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error('请正确输入手机号'))
      } else {
        callback()
      }
    }
    return {
      // 产品
      productIdList: [],
      optionsproduct: [],
      jiaolianViasable: false,
      downLoading: false,
      jiaolianId: null,
      zuzhangUserId: null,
      zuzhangValue: '',
      zuzhangViasable: false,
      zuzhangList: [],
      roleOptions: [],
      canSetRoleIds: [],
      detailedInformation: {}, // 单行详细信息
      errMsg: '',
      addPop: false,
      rolePop: false,
      userinfoshow: false,
      addUserShow: false,
      form: {
        phone: '',
        email: '',
        startTime: '',
        endTime: '',
        region: '',
        userName: ''
      },
      rules: {
        email: [
          {
            required: true,
            validator: checkEmail,
            trigger: 'blur'
          }
        ]
      },
      roleType: [],
      addform: {
        phone: '',
        username: null
      },
      formrole: {
        roleuser: []
      },
      allUser: [],
      loading: false,
      tableData: [],
      pageNo: 1,
      total: null,
      pageSize: 10,
      roleId: null,
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form.endTime !== '') {
            let date = this.form.endTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() > newDate
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form.startTime !== '') {
            let date = this.form.startTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate || time.getTime() > Date.now()
          }
        }
      },
      addRules: {
        phone: [
          { required: true, message: '请填写手机号' },
          { validator: addcheckInput }
        ]
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  },
  mounted() {},
  created() {
    this.searchOption()
    this.getAllUser()
    this.getProduct()
  },
  methods: {
    getAllUser() {
      baseRequest('/user/rwRole/getRole').then((response) => {
        this.allUser = response.data.item
      })
    },
    getProduct() {
      baseRequest('/user/rwProductConfig/select', { id: '5' }).then(
        (response) => {
          this.optionsproduct = response.data.item
        }
      )
    },
    downLoad() {
      this.downLoading = true
      const params = {
      }
      params.loginName = this.form.phone
      params.userName = this.form.userName
      params.email = this.form.email
      params.startTime = this.form.startTime
      params.endTime = this.form.endTime
      params.roleTypes = this.roleType.length > 0 ? this.roleType : ''
      params.productIdList =
      this.productIdList.length > 0 ? this.productIdList : ''
      console.log(params)
      download(
        '/user/rwUser/usersByRoleDownLoad',
        params,
        (_) => {
          this.downLoading = false
        },
        (_) => {
          this.downLoading = false
        }
      )
    },
    // 教练查看
    jiaolianHandle(row) {
      this.jiaolianId = row.userId
      this.jiaolianViasable = true
    },
    // 选择组长
    zuzhangHandle(row) {
      this.zuzhangUserId = row.userId
      baseRequest('/user/rwRole/getCoachManager', { coachId: row.userId }).then(
        (response) => {
          this.zuzhangList = response.data.item
          const result = this.zuzhangList.find((item) => item.flag === '1')
          if (result) {
            this.zuzhangValue = result.userId + ''
          } else {
            this.zuzhangValue = ''
          }
          this.zuzhangViasable = true
        }
      )
    },
    zuzhangCommit() {
      baseRequest('/user/rwRole/setFreeCoach', {
        roles: this.zuzhangValue,
        userId: this.zuzhangUserId
      }).then((_) => {
        this.$Message.success('操作成功!')
        this.zuzhangViasable = false
        this.searchOption(true)
      })
    },
    prohibitRole(id) {
      // 角色禁选
      if (this.canSetRoleIds) {
        const canse = this.canSetRoleIds.split(',')
        return canse.every((item) => item !== id)
      } else {
        return true
      }
    },
    userdatailed(row) {
      this.userinfoshow = true
      this.detailedInformation = row
    },
    unseal(row) {
      // 解封
      this.$confirm('此操作将解封该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/user/rwUser/closeOrOpenUser', {
          userId: row.userId,
          userStatus: row.userStatus
        }).then((response) => {
          this.$Message({
            type: 'success',
            message: '操作成功!'
          })
          this.searchOption()
        })
      })
    },
    roletitle(row) {
      // 封号
      this.$confirm('此操作将对该用户封号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/user/rwUser/closeOrOpenUser', {
          userId: row.userId,
          userStatus: row.userStatus
        }).then((response) => {
          this.$Message({
            type: 'success',
            message: '操作成功!'
          })
          this.searchOption()
        })
      })
    },
    rolecommit() {
      // 角色提交
      this.errMsg = ''
      if (this.formrole.roleuser.length === 0) {
        this.errMsg = '至少选择一项'
        return
      }
      const param = {}
      param.userId = this.roleId
      const arr = []
      for (const i of this.roleOptions) {
        for (const c of this.formrole.roleuser) {
          if (c === i.roleName) {
            arr.push(i.roleType)
          }
        }
      }
      param.roles = arr.join(',')
      baseRequest('/user/rwRole/setUserRole', param).then((response) => {
        // this.searchOption()
        this.$Message.success('操作成功!')
        this.searchOption()
        this.rolePop = false
      })
    },
    rolegement(row) {
      this.errMsg = ''
      this.roleId = row.userId
      baseRequest('/user/rwRole/getUserRole', {
        checkedUserId: row.userId
      }).then((response) => {
        this.roleOptions = response.data.item.managerRole
        this.canSetRoleIds = response.data.item.canSetRoleTypes
        const f = []
        if (response.data.item.checkRoleTypes) {
          for (const c of this.roleOptions) {
            for (const b of response.data.item.checkRoleTypes.split(',')) {
              if (b === c.roleType) {
                f.push(c.roleName)
              }
            }
          }
        }

        this.formrole.roleuser = f
        this.rolePop = true

        // if (response.data.item.canSetRoleIds.length > 0) {
        //   const select = response.data.item.canSetRoleIds.split(',')
        //   this.formrole.roleuser = select.filter(function(n){

        //   })
        // }
      })
    },
    addcommit() {
      // 添加提交
      // this.addPop = false
      this.$refs['addUser'].validate((valid) => {
        if (valid) {
          const params = {}
          params.loginName = this.addform.phone
          params.roles = '5'
          // params.roles = this.addform.username.join(',')
          baseRequest('/user/rwUser/addUser', params).then((response) => {
            if (response.code !== 1) {
              const validateMsg = response.data
              this.$Message.warning(validateMsg.loginName)
              return
            }
            this.$Message.success('操作成功!')
            this.searchOption(true)
            this.addUserShow = false
          })
        } else {
          return false
        }
      })
    },
    closeadd() {
      // 关闭添加
      this.addPop = false
    },
    closerole() {
      // 关闭角色管理
      this.rolePop = false
    },
    adduser() {
      // 打开添加
      // this.addPop = true
      this.addUserShow = true
      this.addform.phone = ''
      this.addform.username = null
      this.$nextTick((_) => {
        this.$refs.addUser.clearValidate()
      })
    },
    searchOption(page) {
      this.loading = true
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      param.loginName = this.form.phone
      param.userName = this.form.userName
      param.email = this.form.email
      param.startTime = this.form.startTime
      param.endTime = this.form.endTime
      param.roleTypes = this.roleType.length > 0 ? this.roleType : ''
      param.productIdList =
      this.productIdList.length > 0 ? this.productIdList : ''

      baseRequest('/user/rwUser/selectUsersByRole', param).then((response) => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    deleteRow() {},
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchOption(true)
    },
    focusColor(c) {
      if (c === 'phoneColor') {
        this.phoneColor = 1
      }
      if (c === 'userColor') {
        this.userColor = 1
      }
      if (c === 'captchaColor') {
        this.captchaColor = 1
      }
    },
    blurColor(c) {
      if (c === 'phoneColor') {
        this.phoneColor = 0
      }
      if (c === 'userColor') {
        this.userColor = 0
      }
      if (c === 'captchaColor') {
        this.captchaColor = 0
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.system-contant {
  width: 1440px;
  // height:810px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 14px;
  .bt-group {
    width: 100%;
    .bsclect.btn {
      background-color: #00afff;
      span {
        color: #ffffff;
      }
    }
    .btn {
      width: 140px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      border: none;
      margin-right: 12px;
      background-color: #ccefff;
      box-shadow: -1px 0px 0px 0px rgba(0, 175, 255, 0.4),
        0px -1px 0px 0px rgba(0, 175, 255, 0.4),
        1px 0px 0px 0px rgba(0, 175, 255, 0.4);
      border-radius: 10px 10px 0px 0px;
      span {
        width: 56px;
        height: 14px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 17px;
        letter-spacing: 0px;
        color: #00afff;
      }
    }

    .btn:focus {
      outline: none;
      background-color: #00afff;
      border-radius: 10px 10px 0px 0px;
      span {
        color: #ffffff;
      }
    }
  }
  .user-management {
    width: 1440px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    margin-bottom: 50px;
    .systitle {
      // width: 56px;
      height: 14px;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: 800;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
    }
    .sysquery {
      width: 1392px;
      margin-top: 25px;
      .operation {
        text-align: right;
      }
      .formitem {
        margin-right: 40px;
        span {
          width: 38px;
          height: 13px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          font-weight: 400;
          font-stretch: normal;
          line-height: 22px;
          letter-spacing: 0px;
          color: #222222;
        }
      }
      .formitem:last-child {
        margin-right: 0;
      }
    }
    //  .mengban{
    //    width: 100%;
    //    height: 100%;
    //   //  z-index: 9999999;
    //    background-color: rgba(22,22,22,.5);
    //    position: absolute;
    //    top: 0;
    //    left: 0;
    .box {
      .boxcontent {
        background-color: #ffffff;
        .userinfo {
          height: 32px;
          line-height: 32px;
          font-size: 16px;
        }
        .login-error {
          height: 15px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          font-weight: normal;
          font-stretch: normal;
          line-height: 25px;
          letter-spacing: 0px;
          color: #fb664a;
          margin-top: -3px;
        }
      }
      .addcommit {
        width: 90px;
        height: 30px;
        line-height: 0.5;
        position: absolute;
        right: 30px;
        bottom: 15px;
        background-color: #00afff;
        border-radius: 4px;
      }
      //  }
    }
    .zu-zhang {
      .zu-zhang-radio {
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.borderG {
  input {
    border-color: #00afff;
  }
}
.borderR {
  input {
    border-color: #f56c6c;
  }
}
.formadd {
  .el-form-item__content {
    margin: 0 !important ;
  }
}
</style>