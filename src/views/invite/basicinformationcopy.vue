<template>
  <div class="box-content">
    <div class="content">
      <div class="information-des">
        <div class="information-title">睿思智得教练认证流程：</div>
        <div class="information-content">
          <p>
            本人完成睿思智得辅导项目学习  ➪  本人提交申请表 ➪ 初审 ➪
            参加TTT并通过认证 ➪ 成为睿思智得教练（对应的辅导项目）。
          </p>
          <p>
            请您填写下面的教练申请认证表，我们收到申请会尽快完成初审。初审通过后将第一时间联系您后续TTT及认证事宜。
          </p>
          <p>感谢您的信任与积极参与，期待在这里绽放您的精彩！</p>
        </div>
      </div>
      <h4 style="font-size: 20px">基础信息</h4>
      <el-button
        @click="goOff()"
        class="cx-box"
        style="
          width: 112px;
          height: 35px;
          font-size: 16px;
          float: right;
          border-radius: 4px;
          margin-top: -39px;
        "
        type="primary"
        >返回上一页</el-button
      >
      <div class="box-form">
        <div class="box-form-left">
          <el-form
            :model="form2"
            :rules="rules"
            ref="ruleForm"
            class="form-left"
          >
            <el-form-item label prop="applyName" style="margin-bottom: 17px">
              <span class="form-label">姓名</span>
              <el-input
                disabled
                style="width: 646px; height: 40px"
                v-model="form2.applyName"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="applyPhone" style="margin-bottom: 17px">
              <span class="form-label">手机号码</span>
              <el-input
                disabled
                style="width: 646px; height: 40px"
                v-model="form2.applyPhone"
              ></el-input>
            </el-form-item>
            <el-form-item label prop="email" style="margin-bottom: 0px">
              <span class="form-label">邮箱</span>
              <el-input
                disabled
                style="width: 646px; height: 40px"
                v-model="form2.email"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-form-right">
          <el-form
            :model="form"
            :rules="rules"
            ref="rulesForm"
            class="form-right"
          >
            <el-form-item label style="margin-bottom: 17px" prop="birthday">
              <span class="form-label required">出生年份</span>
              <el-date-picker
                :editable="false"
                :picker-options="pickerOptionsBs"
                placeholder="请选择出生年份"
                style="width: 646px; height: 40px"
                type="year"
                :default-value="new Date().getTime() - (1000 * 60 * 60 * 24 * 356 * 23)"
                v-model="form.birthday"
                :disabled="(coachdidisable ? false : true) || form.birthdayD"
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="sex" style="margin-bottom: 27px">
              <div class="form-label required">性别</div>
              <el-radio-group
                v-model="form.sex"
                style="margin-top: 20px"
                :disabled="(coachdidisable ? false : true) || form.sexD"
              >
                <el-radio label="1">男</el-radio>
                <el-radio label="2" style="margin-left: 20px">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              prop="wechat"
              style="margin-bottom: 0px; margin-top: 5px"
            >
              <span class="form-label required">微信号</span>
              <el-input
                placeholder="请填写内容"
                style="width: 646px; height: 40px"
                v-model="form.wechat"
                :disabled="(coachdidisable ? false : true) || form.wechatD"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 申请项目开始 -->
      <div>
        <h4 style="font-size: 20px; margin-bottom: 20px">申请项目</h4>
        <el-form
          :model="formProduct"
          :rules="rulesProduct"
          ref="rulesForm2"
          style="margin-bottom: 40px"
        >
          <el-form-item label prop="productId">
            <span class="form-label required" style="margin-right: 30px">
              申请睿思智得辅导项目教练
            </span>
            <el-select
              :disabled="
                !coachdidisable ||
                disabledchexked
              "
              v-model="formProduct.productId"
              placeholder="请选择项目"
              collapse-tags
              @change="changeProductId"
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
        </el-form>
      </div>
      <!-- 申请项目结束 -->
      <h4 style="font-size: 20px; margin-top: 10px">相关经历</h4>
      <p style="margin-top: 30px; font-size: 13px">
        参加过睿思智得的学习辅导项目，请填写参与学习辅导的项目名称、时间
      </p>
      <template v-if="zzzsVisable">
        <el-form :model="form3">
          <div
            :key="index + a"
            style="width: 646px; height: 40px; position: relative"
            v-for="(value, index) in item1"
          >
            <el-form-item style="margin-top: 10px">
              <el-checkbox
                :disabled="
                  !coachdidisable || disabledchexked
                "
                v-model="value.value"
                >{{ value.name }}</el-checkbox
              >
            </el-form-item>
            <el-form-item
              style="position: absolute; right: 0; top: 0px"
              v-show="value.value || value.joinId"
            >
              <el-date-picker
                :disabled="
                  !coachdidisable || disabledchexked
                "
                :picker-options="pickerOptionsStart1"
                placeholder="选择时间"
                style="width: 486px"
                type="date"
                v-model="value.joinDate"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>

          <p style="margin-top: 30px; font-size: 13px">
            参加过LMI的学习辅导项目，请填写学习的LMI课程名称、时间
          </p>

          <div
            :key="index"
            style="width: 646px; height: 40px; position: relative"
            v-for="(value, index) in item2"
          >
            <el-form-item style="margin-top: 10px">
              <el-checkbox
                :disabled="
                  !coachdidisable || disabledchexked
                "
                v-model="value.value2"
                >{{ value.name }}</el-checkbox
              >
            </el-form-item>
            <el-form-item
              style="position: absolute; right: 0; top: 0px"
              v-show="value.value2 || value.learnId"
            >
              <el-date-picker
                :picker-options="pickerOptionsStart1"
                :disabled="
                  !coachdidisable || disabledchexked
                "
                v-model="value.learnDate"
                placeholder="选择时间"
                style="width: 486px"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </div>

          <div
            class="coach"
          >
            <p style="margin-top: 20px; font-size: 13px">
              获取教练认证，请填写获取的教练资质名称、时间
            </p>

            <div
              style="width: 646px; height: 40px; position: relative"
              :key="index + b"
              v-for="(value, index) in item3"
            >
              <el-form-item style="margin-top: 10px">
                <el-checkbox
                  :disabled="
                    !coachdidisable || disabledchexked 
                  "
                  v-model="value.value3"
                  >{{ value.name }}</el-checkbox
                >
              </el-form-item>
              <el-form-item
                style="position: absolute; right: 0; top: 0px"
                v-show="
                  value.name !== 'other' && (value.value3 || value.coachId)
                "
              >
                <el-date-picker
                  :picker-options="pickerOptionsStart1"
                  :disabled="
                    !coachdidisable || disabledchexked
                  "
                  placeholder="选择时间"
                  style="width: 486px"
                  v-model="value.coachDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>

              <div
                style="
                  width: 646px;
                  height: 40px;
                  position: relative;
                  margin-top: -13px;
                "
                v-show="
                  (value.name === 'other' && value.value3) || value.otherId
                "
              >
                <el-form-item style="position: absolute; left: 10px; top: 0px">
                  <el-input
                    :disabled="
                      !coachdidisable || disabledchexked
                    "
                    v-model="value.otherInput"
                    placeholder="请输入教练资质名称"
                    style="width: 308px; height: 40px"
                  ></el-input>
                </el-form-item>
                <el-form-item style="position: absolute; right: 0; top: 0px">
                  <el-date-picker
                    :picker-options="pickerOptionsStart1"
                    :disabled="
                      !coachdidisable || disabledchexked
                    "
                    placeholder="选择时间"
                    style="width: 300px"
                    v-model="value.otherDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </div>
          <h4 style="font-size: 20px; margin-top: 100px; margin-bottom: 30px">
            我的简历<span
              class="form-label required"
              style="margin-left: 5px"
            ></span>
          </h4>
          <div class="enclosure">
            <el-input
              v-model="wzName"
              v-if="!disabledchexked && wzName"
              :disabled="true"
              style="width: 500px"
              placeholder
            ></el-input>
            <el-upload
              ref="upload"
              action="/user/rwCoachApply/upload"
              style="display: inline-block"
              :show-file-list="false"
              :http-request="sourceUploadRequest"
              :auto-upload="true"
              v-if="!disabledchexked && !(buttonType === 'disabled' || (buttonType === 'applyIng' && fileIddown) ||
            buttonType === 'none')"
            >
              <el-button
                slot="trigger"
                class="menu"
                size="small"
                >上传简历</el-button
              >
            </el-upload>
            <el-button
              slot="trigger"
              :loading="downLoading"
              size="small"
              v-show="fileIddown"
              @click="downresume"
              >下载简历</el-button
            >
          </div>
        </el-form>
      </template>
      <!-- <el-form
        :model="form6"
        v-if="
          this.$route.query.applyIdjlfushen || this.$route.query.jlfushendetails
        "
        ref="refForm"
        :rules="rules4"
      >
        <el-form-item
          label="可授课程："
          class="productTypestyle"
          prop="productType"
          style="margin-top: 24px; margin-left: 27px; font-size: 16px"
        >
          <el-select
            v-model="form6.productType"
            placeholder="请选择"
            style="margin-left: 17px; width: 160px"
            :disabled="disableambassdeils || disablejlfushendei"
          >
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form> -->

      <div style="float: right" v-show="this.$route.query.isShowProduct">
        <el-button
          class="cx-box"
          :loading="resetLoading"
          style="width: 120px; height: 40px; font-size: 16px"
          @click="resetInfo"
          plain
          v-if="buttonType === 'applyIng' && !fileIddown"
          >更新信息</el-button
        >
        <el-button
        v-if="buttonType"
          @click="apply('ruleForm')"
          :disabled="
            buttonType === 'disabled' ||
            buttonType === 'none' ||
            buttonType === 'applyIng' ||
            !coachdidisable
          "
          class="cx-box"
          :loading="ConfirmLoading"
          style="
            box-sizing: border-box;
            padding-left: 20px;
            padding-right: 20px;
            height: 40px;
            font-size: 16px;
            border-radius: 4px;
          "
          type="primary"
          >{{
            buttonType === "button"
              ? "申请教练"
              : buttonType === "disabled"
              ? "驳回"
              : buttonType === "none"
              ? "您已申请成为该产品教练"
              : buttonType === "applyIng"
              ? "审核中"
              : ""
          }}</el-button
        >
        <el-button v-else type="info" disabled>请选择辅导项目</el-button>
      </div>

      <div
        style="width: 270px; height: 40px; float: right"
        v-show="this.$route.query.applyIdjlchushen && shenheBtnVisable"
      >
        <el-button
          @click="Refused"
          class="cx-box"
          plain
          style="
            width: 120px;
            height: 40px;
            background-color: #fff;
            font-size: 16px;
            border-radius: 4px;
            color: #00afff;
          "
          type="primary"
          >拒绝</el-button
        >
        <el-button
          :loading="throughLoading"
          @click="through('refForm', 'refForm2')"
          class="cx-box"
          style="
            width: 120px;
            height: 40px;
            font-size: 16px;
            float: right;
            border-radius: 4px;
          "
          type="primary"
          >通过</el-button
        >
      </div>
      <el-dialog
        append-to-body
        :visible.sync="applyVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <success></success>
        <span slot="footer">
          <el-button type="primary" @click="successBtn">返回首页</el-button>
        </span>
      </el-dialog>

      <el-dialog
        append-to-body
        :visible.sync="coachchushendia"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <fusedambasschushen></fusedambasschushen>
        <span slot="footer">
          <el-button type="primary" @click="backcoach"
            >返回TTT审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="coachdchushenfusedia"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <diacoachchushenfused></diacoachchushenfused>
        <span slot="footer">
          <el-button type="primary" @click="backcoach"
            >返回TTT审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="coachfushendia"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <diacoachfushen></diacoachfushen>
        <span slot="footer">
          <el-button type="primary" @click="backcoach"
            >返回TTT审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="fushenrefusedia"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <coachfusedfushendia></coachfusedfushendia>
        <span slot="footer">
          <el-button type="primary" @click="backcoach"
            >返回TTT审核页面</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { baseRequest, baseUpload } from '@/api/base'
import success from './components/success'
import fusedambasschushen from './components/fusedambasschushen'
import diacoachchushenfused from './components/diacoachchushenfused'
import diacoachfushen from './components/diacoachfushen'
import coachfusedfushendia from './components/coachfusedfushendia'
import { download } from '@/utils/download'
import { parseTime } from '@/utils'
export default {
  components: {
    success,
    fusedambasschushen,
    diacoachchushenfused,
    diacoachfushen,
    coachfusedfushendia
  },
  data() {
    return {
      shenheBtnVisable: true,
      // 项目
      formProduct: {
        productId: ''
      },
      optionsproduct: [],
      resetLoading: false,
      rwRebateItemsList: [],
      zzzsVisable: true,
      buttonType: '',
      wzName: '',
      a: 'a',
      b: 'b',
      item1: [],
      item2: [],
      item3: [],
      value: '',
      form: {
        sex: '',
        wechat: '',
        birthday: '',
        email: '',
        experience: '',
        resume: ''
      },
      form2: {
        applyName: '',
        applyPhone: '',
        email: ''
      },
      form3: {
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        value6: '',
        value7: '',
        checked: '',
        checked2: '',
        checked3: '',
        checked4: '',
        checked5: '',
        checked6: '',
        checked7: ''
      },
      throughtype: { auditType: '0' },
      Refusedtype: { auditType: '2' },
      type: '',
      form4: {
        type: '',
        endTime: '',
        beginTime: '',
        rebateId: '',
        rebateItemId: '',
        signType: '',
        peopleNum: ''
      },
      form5: {
        date1: '',
        type: '',
        productType: '1',
        auditType: '0'
      },
      // form6: {
      //   productType: '1'
      // },
      options: [],
      options2: [
        {
          value: '1',
          label: 'First Step'
        }
      ],
      options3: [
        {
          value: '1',
          label: 'First Step'
        }
      ],
      pickerOptionsStart: {
        disabledDate: (time) => {
          if (this.form4.beginTime !== '') {
            return time.getTime() < Date.now()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: (time) => {
          if (this.form4.beginTime !== '') {
            let date = this.form4.beginTime + ' 00:00:00'
            date = date.replace(/-/g, '/')
            const newDate = new Date(date).getTime()
            return time.getTime() < newDate
          }
        }
      },
      pickerOptionsBs: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000 * 365 * 22
        }
      },
      pickerOptionsStart1: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      },
      fileId: '',
      fileIddown: null,
      applyVisible: false,
      fushenrefuse: false,
      coachchushendia: false,
      coachdidisable: true,
      disabledchexked: false,
      coachdchushenfusedia: false,
      coachfushendia: false,
      fushenrefusedia: false,
      applyStatus: 0,
      downLoading: false,
      ConfirmLoading: false,
      throughLoading: false,
      disableambassdeils: false,
      disablejlfushendei: false,
      rules: {
        // birthday: [
        //   { required: true, message: '请输入出生年份', trigger: 'change' }
        // ],
        // sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        // wechat: [
        //   { required: true, message: '请输入微信号', trigger: 'change' },
        //   {
        //     pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
        //     message: '请输入正确的微信号'
        //   }
        // ]
      },
      rules2: {
        rebateId: [
          { required: true, message: '请选择销售方式', trigger: 'change' }
        ],
        peopleNum: [
          { required: true, message: '请选择签约人数', trigger: 'change' }
        ],
        signType: [
          { required: true, message: '请选择课程或金额', trigger: 'change' }
        ],
        beginTime: [
          { required: true, message: '请选择日期开始', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择日期结束', trigger: 'change' }
        ]
      },
      rules3: {
        productType: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ]
      },
      rules4: {
        productType: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ]
      },
      rulesProduct: {
        productId: [
          { required: true, message: '请选择产品', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.information()
    this.getProduct() // 申请项目下拉数据
  },
  mounted() {
    this.getNowTime()
  },
  methods: {
    // 申请项目
    getProduct(callback) {
      baseRequest('/user/rwProductConfig/select', { id: '3' }).then(
        (response) => {
          this.optionsproduct = response.data.item
          callback && callback()
        }
      )
    },
    // 选择申请项目
    changeProductId() {
      this.buttonType = ''

      baseRequest('/user/rwTttApply/buttonStyle', {
        productId: this.formProduct.productId
      }).then((response) => {
        this.buttonType = response.data.item.type
        if (
          this.buttonType === 'none' ||
            this.buttonType === 'applyIng' ||
            this.buttonType === 'disabled'
        ) {
          this.item1 = []
          this.item2 = []
          this.item3 = []
          this.fileIddown = ''
          this.getcertificate((_) => {
            this.getrwTttApplyInfo(this.formProduct.productId)
          })
        }

        // this.getcertificate((_) => {
        //   this.buttonType = response.data.item.type
        //   if (
        //     this.buttonType === 'none' ||
        //     this.buttonType === 'applyIng' ||
        //     this.buttonType === 'disabled'
        //   ) {
        //     this.item1 = []
        //     this.item2 = []
        //     this.item3 = []
        //     this.fileIddown = ''
        //     this.getrwTttApplyInfo(this.formProduct.productId)
        //   }
        // })
      })
    },
    // 获取当前日期
    getNowTime() {
      var now = new Date().getTime()
      var nowAdd = now + 86400000
      var nowAfter = now + 86400000 * 365
      this.$set(
        this.form4,
        'beginTime',
        parseTime(new Date(nowAdd), '{y}-{m}-{d}')
      )
      this.$set(
        this.form4,
        'endTime',
        parseTime(new Date(nowAfter), '{y}-{m}-{d}')
      )
    },
    selectTime() {
      var setYear = new Date(this.form4.beginTime).getTime()
      var nowAfter = setYear + 86400000 * 365
      this.$set(
        this.form4,
        'endTime',
        parseTime(new Date(nowAfter), '{y}-{m}-{d}')
      )
    },
    // 更新信息
    resetInfo() {
      this.$confirm('此操作将覆盖您之前保存的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.coachapply('ruleForm', true)
      })
    },
    // 返回上一页
    goOff() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else if (this.$route.query.xsPage === 0) {
        this.$router.push({ path: '/system/check', query: { current: 0 }})
      } else {
        this.$router.back(-1)
      }
    },
    downresume() {
      this.downLoading = true
      download(
        '/user/rwCoachApply/downFile',
        { fileId: this.fileIddown },
        (_) => {
          this.downLoading = false
        },
        (_) => {
          this.downLoading = false
        }
      )
    },
    successBtn() {
      this.applyStatus = 0
      this.$router.push({ path: '/' })
    },
    backcoach() {
      this.applyStatus = 0
      this.$router.push({ path: '/system/check', query: { current: 0 }})
    },
    // 信息回显
    information() {
      // 申请教练按钮判断
      this.coachButton()
      // 基础信息
      // this.coachinform()
      if (this.$route.query.applyIdjlchushen) {
        // 教练初审
        this.disabledchexked = true
      } else if (this.$route.query.jlchushendetails) {
        // 教练初审详情
        this.disabledchexked = true
      } else {
        baseRequest('/user/rwUser/getPersonalUserInfo').then((response) => {
          const item = response.data.item
          this.form2.applyName = item.userName
          this.form2.applyPhone = item.loginName
          this.form2.email = item.email
        })
      }
    },
    // 审核拒绝
    Refused() {
      this.coachdchushenfuse()
    },
    // 审核通过
    through(refForm, refForm2) {
      this.coachdchushenseed(refForm2)
    },
    // 基础信息
    coachinform() {
      baseRequest('/user/rwUser/getPersonalUserInfo').then((response) => {
        const item = response.data.item
        this.form2.applyName = item.userName
        this.form2.applyPhone = item.loginName
        this.form2.email = item.email
      })
    },
    //  教练初审通过
    coachdchushenseed() {
      this.throughLoading = false
      const params = {
        applyId: this.$route.query.applyIdjlchushen,
        auditType: this.throughtype.auditType,
        applyName: this.form2.applyName,
        id: this.$route.query.major,
        productId: null
      }
      baseRequest('/user/rwTttApply/updateTTTApply', params).then(() => {
        this.coachchushendia = true
        this.throughLoading = false
        this.shenheBtnVisable = false
      })
    },
    //  教练初审拒绝
    coachdchushenfuse() {
      this.throughLoading = false
      const params = {
        applyId: this.$route.query.applyIdjlchushen,
        auditType: this.Refusedtype.auditType,
        applyName: this.form2.applyName,
        id: this.$route.query.major,
        productId: null
      }
      baseRequest('/user/rwTttApply/updateTTTApply', params).then(() => {
        this.throughLoading = false
        this.coachdchushenfusedia = true
        this.shenheBtnVisable = false
      })
    },
    //  申请TTT训练信息展示
    getrwTttApplyInfo(productId) {
      const params = {
        productId: productId || '',
        id: null
      }
      if (
        this.$route.query.jlchushendetails ||
        this.$route.query.applyIdjlchushen
      ) {
        params.id = this.$route.query.major
        params.productId = this.$route.query.productId
      }
      // if (!params.productId) {
      //   return
      // }
      baseRequest('/user/rwTttApply/getApplyInfo', params).then((response) => {
        this.form = response.data.item
        if (
          this.$route.query.jlchushendetails ||
        this.$route.query.applyIdjlchushen
        ) {
          this.formProduct.productId = response.data.item.productId
        }
        response.data.item.applyPhone = response.data.item.applyPhone || response.data.item.loginName
        this.form2 = response.data.item

        for (const key in this.form) {
          if (this.form[key]) {
            this.form[key + 'D'] = true
          }
        }
        if (response.data.item.resume) {
          this.fileIddown = response.data.item.resume
        } else {
          this.fileIddown = ''
        }
        this.$refs.ruleForm.clearValidate()
        if (response.data.item.experience) {
          var experience = JSON.parse(
            response.data.item.experience.replace(/^\"|\"$/g, '')
          )
          experience.filter((item) => {
            if (item.joinId) {
              this.item1.map((value, index) => {
                if (item.joinId === value.id) {
                  this.item1[index].joinId = item.joinId
                  this.item1[index].value = true
                  this.item1[index].joinDate = item.joinTime
                }
              })
            }
            if (item.learnId) {
              this.item2.map((value, index) => {
                if (item.learnId === value.id) {
                  this.item2[index].learnId = item.learnId
                  this.item2[index].value2 = true
                  this.item2[index].learnDate = item.learnTime
                }
              })
            }
            if (item.coachId) {
              this.item3.map((value, index) => {
                if (item.coachId === value.id) {
                  this.item3[index].coachId = item.coachId
                  this.item3[index].value3 = true
                  this.item3[index].coachDate = item.coachTime
                }
              })
            }
            if (item.otherId) {
              this.item3.map((value, index) => {
                if (item.otherId === value.id) {
                  this.item3[index].otherId = item.otherId
                  this.item3[index].value3 = true
                  this.item3[index].otherDate = item.otherTime
                  this.item3[index].otherInput = item.otherContent
                }
              })
            }
            this.zzzsVisable = false
            this.$nextTick((_) => {
              this.zzzsVisable = true
            })
          })
        }
      })
    },
    // 获取教练证书列表
    getcertificate(callback) {
      baseRequest('/user/rwExperience/selects', {}).then((response) => {
        response.data.item.forEach((value) => {
          value.value = false
          value.value2 = false
          value.value3 = false
          value.joinDate = null
          value.coachDate = null
          value.learnDate = null
          value.otherDate = null
          value.otherInput = null
          if (value.style === '0') {
            this.item1.push(value)
          } else if (value.style === '1') {
            this.item2.push(value)
          } else if (value.style === '2') {
            this.item3.push(value)
          }
        })
        callback && callback()
      })
    },
    // 申请
    apply(ruleForm) {
      this.coachapply(ruleForm)
    },
    // 教练申请
    coachapply(ruleForm, isReset) {
      this.$refs['rulesForm'].validate((pass) => {
        if (pass) {
          this.$refs['rulesForm2'].validate((valid) => {
            if (valid) {
              if (!this.form.birthday) {
                this.$Message({
                  message: `请选择出生年份`,
                  type: 'warning'
                })
                return
              }
              if (!this.form.sex) {
                this.$Message({
                  message: `请选择性别`,
                  type: 'warning'
                })
                return
              }
              if (!this.form.wechat) {
                this.$Message({
                  message: `请选择微信号`,
                  type: 'warning'
                })
                return
              }
              if (
                this.item1.some(
                  (item) => item.value === true && item.joinDate === null
                )
              ) {
                this.$Message({
                  message: `请选择学习辅导的项目时间`,
                  type: 'warning'
                })
                return
              }
              if (
                this.item2.some(
                  (item) => item.value2 === true && item.learnDate === null
                )
              ) {
                this.$Message({
                  message: `请选择学习的LMI课程时间`,
                  type: 'warning'
                })
                return
              }
              if (
                this.item3.some(
                  (item) =>
                    item.value3 === true &&
                item.name !== 'other' &&
                item.coachDate === null
                )
              ) {
                this.$Message({
                  message: `填写获取的教练资质时间`,
                  type: 'warning'
                })
                return
              }
              if (
                this.item3.some(
                  (item) =>
                    item.value3 === true &&
                item.name === 'other' &&
                (item.otherInput !== null || item.otherInput !== '') &&
                !item.otherDate
                )
              ) {
                this.$Message({
                  message: `请填写other获取的教练资质时间`,
                  type: 'warning'
                })
                return
              }

              if (!this.fileId && !this.fileIddown) {
                this.$Message({
                  message: `请上传简历！`,
                  type: 'warning '
                })
                return
              }
              const arrParam1 = []
              const arrParam2 = []
              const arrParam3 = []
              this.item1.map((value) => {
                if (value.value === true) {
                  arrParam1.push({
                    joinId: value.id,
                    joinTime: value.joinDate
                  })
                }
              })

              this.item2.map((value) => {
                if (value.value2 === true) {
                  arrParam1.push({
                    learnId: value.id,
                    learnTime: value.learnDate
                  })
                }
              })
              this.item3.map((value) => {
                if (value.name !== 'other' && value.value3 === true) {
                  arrParam1.push({
                    coachId: value.id,
                    coachTime: value.coachDate
                  })
                }
                if (value.name === 'other' && value.value3 === true) {
                  arrParam1.push({
                    otherId: value.id,
                    otherTime: value.otherDate,
                    otherContent: value.otherInput
                  })
                }
              })
              let url = '/user/rwTttApply/addTTTApply'
              const arrParam = arrParam1.concat(arrParam2, arrParam3)
              const params = {
                sex: this.form.sex,
                wechat: this.form.wechat,
                birthday: this.form.birthday,
                email: this.form2.email,
                resume: this.fileId || this.fileIddown,
                productId: this.formProduct.productId,
                experience: JSON.stringify(arrParam)
              }
              if (isReset) {
                this.resetLoading = true
                params.applyId = this.form.applyId
                url = '/user/rwTttApply/completTTTApply'
              } else {
                this.ConfirmLoading = true
              }
              // 申请TTT训练认证
              baseRequest(url, params).then((response) => {
                this.formProduct.productId = ''
                this.buttonType = ''
                if (isReset) {
                  this.resetLoading = false
                  // this.getrwTttApplyInfo()
                  this.$Message.success('操作成功')
                } else {
                  this.ConfirmLoading = false
                  // this.coachdidisable = false
                  this.applyVisible = true
                }
              })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },

    // 申请教练按钮判断 button：可申请；disabled：驳回；none：已经是；applyIng:审核中
    coachButton() {
      // baseRequest('/user/rwTttApply/buttonStyle', {
      //   productId: '1'
      // }).then((response) => {
      //   this.buttonType = response.data.item.type
      //   this.getcertificate((_) => {
      //     if (
      //       this.buttonType === 'none' ||
      //       this.buttonType === 'applyIng' ||
      //       this.buttonType === 'disabled'
      //     ) {
      //       this.getrwTttApplyInfo()
      //     }
      //   })
      // })

      this.getcertificate((_) => {
        // if (
        //   this.buttonType === 'none' ||
        //     this.buttonType === 'applyIng' ||
        //     this.buttonType === 'disabled'
        // ) {
        this.getrwTttApplyInfo()
        // }
      })
    },

    // 上传简历
    sourceUploadRequest(content) {
      const patt = new RegExp('.*.(pdf|doc|docx|PDF|DOC|DOCX)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择pdf|doc|docx文件上传',
          type: 'error'
        })
        return
      }
      const isLt2M = content.file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过2M',
          type: 'error'
        })
        return
      }
      var form = new FormData()
      form.append('file', content.file)

      baseUpload('/user/rwCoachApply/upload', form).then(
        (response) => {
          this.wzName = content.file.name
          this.fileId = response.data.item.fileId
        },
        (_) => {
          this.$refs.upload.clearFiles()
          this.$Message({
            showClose: true,
            message: '上传失败',
            type: 'error'
          })
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  width: 100%;

  height: 100%;
  padding: 30px 0 30px 0px;

  .content {
    width: 1440px;
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    padding: 50px;
    padding-bottom: 91px;
    margin: auto;

    .box-form {
      width: 1340px;
      height: 220px;
      margin-bottom: 100px;

      .box-form-left {
        width: 646px;
        height: 220px;
        margin-top: 30px;
        float: left;
      }

      .box-form-right {
        width: 646px;
        height: 220px;
        margin-top: 30px;
        float: right;
      }
    }
    .cx-box {
      padding: 0px;
    }
  }
}
</style>
<style lang="scss">
.box-jlinput {
  .jlinput {
    .el-input--medium .el-input__inner {
      height: 45px;
    }
  }
}
.information-des {
  margin-bottom: 30px;
  color: #222222;
  font-size: 14px;

  .information-title {
    font-weight: bold;
    margin-bottom: 15px;
    font-size: 20px;
  }
  .information-content {
    p {
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
}

.rebateIdstyle {
  .el-form-item__error {
    margin-left: 120px;
  }
}
.beginTimestyle {
  .el-form-item__error {
    margin-left: 117px;
  }
}
.endTimestyle {
  .el-form-item__error {
    margin-left: 349px;
  }
}
.rebateItemstyle {
  .el-form-item__error {
    margin-left: 0px;
    margin-top: -10px;
  }
}
.signTypestyle {
  .el-form-item__error {
    margin-left: 0px;
    margin-top: -10px;
  }
}
.productTypestyle {
  .el-form-item__error {
    margin-left: 116px;
  }
}
.el-upload-list__item-name {
  color: #606266;
  display: block;
  margin-right: 40px;
  overflow: hidden;
  padding-left: 0px;
  text-overflow: ellipsis;
  -webkit-transition: color 0.3s;
  transition: color 0.3s;
  white-space: nowrap;
  margin-left: -521px;
  margin-top: -45px;
}
</style>
