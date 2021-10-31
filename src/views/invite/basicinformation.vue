<template>
  <div class="box-content">
    <div class="content">
      <div class="information-des" v-if="$route.query.userId === '2'">
        <div class="information-title">睿思智得推广大使认证流程为：</div>
        <div class="information-content">
          <p>本人提交申请表 ➪ 初审 ➪ 复审 ➪ 成为推广大使</p>
          <p>
            请您填写下面的申请表，我们收到申请会尽快完成初审。初审通过后将第一时间联系您，沟通确认复审事宜。
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
            ref="ruleForm"
            class="form-right"
          >
            <el-form-item label style="margin-bottom: 17px" prop="birthday">
              <span class="form-label required">出生年份</span>
              <el-date-picker
                :picker-options="pickerOptionsBs"
                placeholder="请选择出生年份"
                style="width: 646px; height: 40px"
                type="year"
                v-model="form.birthday"
                :default-value="new Date().getTime() - (1000 * 60 * 60 * 24 * 356 * 23)"
                :disabled="
                  (this.$route.query.userId === '2' && coachdidisable
                    ? false
                    : true) || form.birthdayD
                "
                value-format="yyyy"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="sex" style="margin-bottom: 27px">
              <div class="form-label required">性别</div>
              <el-radio-group
                v-model="form.sex"
                style="margin-top: 20px"
                :disabled="
                  (this.$route.query.userId === '2' && coachdidisable
                    ? false
                    : true) || form.sexD
                "
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
                :disabled="
                  (this.$route.query.userId === '2' && coachdidisable
                    ? false
                    : true) || form.wechatD
                "
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
                  !coachdidisable || disabledchexked || form.experienceD
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
                :picker-options="pickerOptionsStart1"
                :disabled="
                  !coachdidisable || disabledchexked || form.experienceD
                "
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
                  !coachdidisable || disabledchexked || form.experienceD
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
                  !coachdidisable || disabledchexked || form.experienceD
                "
                v-model="value.learnDate"
                placeholder="选择时间"
                style="width: 486px"
                type="date"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
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
              v-if="this.$route.query.userId === '2' && !form.resumeD"
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
            >
              <el-button
                slot="trigger"
                class="menu"
                size="small"
                v-show="this.$route.query.userId === '2' && !form.resumeD"
                :disabled="!coachdidisable"
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

      <!-- 销售复审 -->
      <el-form
        :model="form4"
        class="xsshfs"
        v-if="
          this.$route.query.applyIdfushen ||
          this.$route.query.applyIdfushendetails
        "
        ref="refForm"
        :rules="rules2"
      >
        <el-form-item
          label="销售方式："
          class="rebateIdstyle"
          style="margin-top: 24px; margin-left: 27px; font-size: 16px"
          prop="rebateId"
        >
          <el-select
            v-model="form4.rebateId"
            placeholder="请选择"
            style="margin-left: 15px; width: 161px"
            :disabled="disableambassdeils"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          class="rebateItemstyle"
          style="margin-left:146px;margin-top:0px"
          v-if="form4.rebateId==='1'"
          prop="rebateItemId"
        >
          <el-radio-group v-model="form4.rebateItemId" :disabled='disableambassdeils'>
            <el-radio  label="6">2班/8人</el-radio>
            <el-radio  label="8">4班/16人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          class="signTypestyle"
          style="margin-left:146px;margin-top:-16px"
          v-if="form4.rebateId==='1'"
          prop="signType"
        >
          <el-radio-group v-model="form4.signType" :disabled='disableambassdeils'>
            <el-radio label="0">课程</el-radio>
            <el-radio label="1" style="margin-left:20px">金额</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- 年度签约人数 -->
        <!-- <el-form-item
          class="rebateItemstyle"
          style="margin-left:146px;margin-top:0px"
          v-if="form4.rebateId===14"
          prop="peopleNum"
        >
          <el-radio-group v-model="form4.peopleNum" :disabled='disableambassdeils'>
            <el-radio :label="item.id" v-for="item in rwRebateItemsList" :key="item.id">{{item.reachCount}}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item
          label="有效期："
          class="beginTimestyle"
          style="margin-left: 27px; font-size: 16px; margin-top: 0px"
          :inline="true"
          prop="beginTime"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期开始"
            :picker-options="pickerOptionsStart"
            value-format="yyyy-MM-dd"
            v-model="form4.beginTime"
            :disabled="disableambassdeils"
            @change="selectTime"
            style="margin-left: 30px; width: 160px"
          ></el-date-picker>
        </el-form-item>
        <span style="margin-left: 311px; margin-top: -46px; display: block"
          >至</span
        >
        <el-form-item class="endTimestyle" prop="endTime">
          <el-date-picker
            class="data-item"
            style="
              width: 160px;
              margin-left: 343px;
              margin-top: -31px;
              display: block;
            "
            :picker-options="pickerOptionsEnd"
            type="date"
            disabled
            placeholder="选择日期结束"
            value-format="yyyy-MM-dd"
            v-model="form4.endTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form
        :model="form5"
        v-if="
          this.$route.query.applyIdfushen ||
          this.$route.query.applyIdfushendetails
        "
        ref="refForm2"
        :rules="rules3"
      >
        <el-form-item
          label="可售课程："
          class="productTypestyle"
          prop="productType"
          style="margin-top: 24px; margin-left: 27px; font-size: 16px"
        >
          <el-select
            v-model="form5.productType"
            placeholder="请选择"
            style="margin-left: 17px; width: 160px"
            :disabled="disableambassdeils || disablejlfushendei"
          >
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>

      <div style="float: right" v-show="this.$route.query.userId === '2'">
        <el-button
          class="cx-box"
          :loading="resetLoading"
          style="width: 120px; height: 40px; font-size: 16px"
          v-if="buttonType === 'applyIng' && !fileIddown"
          @click="resetInfo"
          plain
          >更新信息</el-button
        >

        <el-button
          @click="apply('ruleForm')"
          v-if="this.$route.query.userId === '2'"
          class="cx-box"
          :loading="ConfirmLoading"
          style="
            width: 120px;
            height: 40px;
            font-size: 16px;
            border-radius: 4px;
          "
          :disabled="
            buttonType === 'disabled' ||
            buttonType === 'none' ||
            buttonType === 'applyIng' ||
            !coachdidisable
          "
          type="primary"
          >{{
            buttonType === "button"
              ? "申请大使"
              : buttonType === "disabled"
              ? "驳回"
              : buttonType === "none"
              ? "您已是大使"
              : buttonType === "applyIng"
              ? "审核中"
              : ""
          }}</el-button
        >
      </div>

      <div
        style="width: 270px; height: 40px; float: right"
        v-show="
          this.$route.query.applyIdchushen ||
          this.$route.query.applyIdfushen ||
          this.$route.query.applyIdjlchushen ||
          this.$route.query.applyIdjlfushen
        "
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
        :visible.sync="ambassadorchushenVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <ambassdorchushen></ambassdorchushen>
        <span slot="footer">
          <el-button type="primary" @click="ambassdorchushen"
            >返回销售审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="ambassadorfushenVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <ambassdorfushen></ambassdorfushen>
        <span slot="footer">
          <el-button type="primary" @click="ambassdorfushen"
            >返回销售审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="refusechushen"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <ambassdorfused></ambassdorfused>
        <span slot="footer">
          <el-button type="primary" @click="ambassdorfused"
            >返回销售审核页面</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        append-to-body
        :visible.sync="fushenrefuse"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
      >
        <fusedambassdarfushen></fusedambassdarfushen>
        <span slot="footer">
          <el-button type="primary" @click="ambassdorfused"
            >返回销售审核页面</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import { baseUpload } from '@/api/base'
import { baseRequest, baseUpload } from '@/api/base'
import success from './components/success'
import ambassdorchushen from './components/ambassdorchushen'
import ambassdorfushen from './components/ambassdorfushen'
import ambassdorfused from './components/ambassdorfused'
import fusedambassdarfushen from './components/fusedambassdarfushen'
import { download } from '@/utils/download'
import { parseTime } from '@/utils'
export default {
  components: {
    success,
    ambassdorchushen,
    ambassdorfushen,
    ambassdorfused,
    fusedambassdarfushen
  },
  data() {
    return {
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
      options: [],
      options2: [
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
      ambassadorchushenVisible: false,
      ambassadorfushenVisible: false,
      refusechushen: false,
      fushenrefuse: false,
      coachdidisable: true,
      disabledchexked: false,
      applyStatus: 0,
      downLoading: false,
      ConfirmLoading: false,
      throughLoading: false,
      disableambassdeils: false,
      disablejlfushendei: false,
      validBeginTime: '',
      rules: {
        birthday: [
          { required: true, message: '请输入出生年份', trigger: 'change' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        wechat: [
          { required: true, message: '请输入微信号', trigger: 'change' },
          {
            pattern: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
            message: '请输入正确的微信号'
          }
        ]
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
      }
    }
  },
  created() {
    this.information()
  },
  mounted() {
    this.getNowTime()
  },
  methods: {
    // 获取当前日期
    getNowTime() {
      var now = new Date().getTime()
      var nowAdd = now + 86400000
      var nowAfter = now + 86400000 * 365
      // var year = now.getFullYear() // 得到年份
      // var month = now.getMonth() // 得到月份
      // var date = now.getDate() // 得到日期
      // month = month + 1
      // month = month.toString().padStart(2, '0')
      // date = date + 1
      // date = date.toString().padStart(2, '0')
      // var defaultDate = `${year}-${month}-${date}`
      // var defaultDate1 = `${year + 1}-${month}-${date - 1}`
      // this.validBeginTime = defaultDate
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
      // setYear.setFullYear(setYear.getFullYear() + 1)
      // var year = setYear.getFullYear() // 得到年份
      // var month = setYear.getMonth() // 得到月份
      // var date = setYear.getDate() // 得到日期
      // month = month + 1
      // month = month.toString().padStart(2, '0')
      // date = date - 1
      // date = date.toString().padStart(2, '0')
      // var defaultDate1 = `${year}-${month}-${date}`
      // console.log('defaultDate1', defaultDate1)
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
        this.ambassador('ruleForm', true)
      })
    },
    goOff() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else if (this.$route.query.xsPage === 1) {
        this.$router.push({ path: '/system/check', query: { current: 1 }})
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
    ambassdorchushen() {
      this.applyStatus = 0
      this.$router.push({ path: '/system/check', query: { current: 1 }})
    },
    ambassdorfushen() {
      this.applyStatus = 0
      this.$router.push({ path: '/system/check', query: { current: 1 }})
    },
    ambassdorfused() {
      this.applyStatus = 0
      this.$router.push({ path: '/system/check', query: { current: 1 }})
    },

    // 信息回显
    information() {
      // 大使申请
      if (this.$route.query.userId === '2') {
        this.ambassadorButton()
        this.ambassadorform()
        // 大使初审详情
      } else if (this.$route.query.applyId) {
        this.disabledchexked = true
        this.ambassadordetails()
        // 大使初审
      } else if (this.$route.query.applyIdchushen) {
        this.disabledchexked = true
        this.ambassadordchushen()
        // 大使复审
      } else if (this.$route.query.applyIdfushen) {
        this.disabledchexked = true
        this.ambassadordfushen()
        // 大使复审详情
      } else if (this.$route.query.applyIdfushendetails) {
        this.disableambassdeils = true
        this.disabledchexked = true
        this.applyIdfushendetails()
      }
    },

    Refused() {
      if (this.$route.query.applyIdchushen) {
        this.ambassadorchushenrefuse()
      } else if (this.$route.query.applyIdfushen) {
        this.ambassadorfushenrefuse()
      }
    },
    through(refForm, refForm2) {
      if (this.$route.query.applyIdchushen) {
        this.ambassadorchushenseed(refForm)
      } else if (this.$route.query.applyIdfushen) {
        this.ambassadorfushenseed(refForm)
      }
    },
    // 销售初审拒绝
    ambassadorchushenrefuse() {
      this.throughLoading = true
      const params = {
        applyId: this.$route.query.applyIdchushen,
        auditType: this.Refusedtype.auditType,
        applyName: this.form2.applyName,
        id: this.$route.query.major
      }
      baseRequest('/user/rwAmbassadorApply/updateAmbassadorApply', params).then(
        (response) => {
          this.throughLoading = false
          this.refusechushen = true
        }
      )
    },
    // 销售复审拒绝
    ambassadorfushenrefuse() {
      this.throughLoading = true
      const params = {
        applyId: this.$route.query.applyIdfushen,
        reviewType: '2',
        id: this.$route.query.major,
        applyName: this.form2.applyName
      }
      if (this.form4.rebateId === '1') {
        params.rebateItemId = this.form4.rebateItemId
        params.signType = this.form4.signType
      }
      baseRequest('/user/rwAmbassadorApply/updateAmbassadorApply', params).then(
        (response) => {
          this.throughLoading = false
          this.fushenrefuse = true
        }
      )
    },
    //  销售初审发送
    ambassadorchushenseed(refForm) {
      this.throughLoading = true
      const params = {
        applyId: this.$route.query.applyIdchushen,
        auditType: this.throughtype.auditType,
        applyName: this.form2.applyName,
        id: this.$route.query.major
      }
      baseRequest('/user/rwAmbassadorApply/updateAmbassadorApply', params).then(
        (response) => {
          this.throughLoading = false
          this.ambassadorchushenVisible = true
        }
      )
    },
    //  销售复审发送
    ambassadorfushenseed(refForm) {
      this.$refs[refForm].validate((valid) => {
        if (valid) {
          this.throughLoading = true
          const params = {
            applyId: this.$route.query.applyIdfushen,
            reviewType: '0',
            productId: this.form5.productType,
            beginTime: this.form4.beginTime,
            endTime: this.form4.endTime,
            rebateId: this.form4.rebateId,
            applyName: this.form2.applyName,
            id: this.$route.query.major
          }
          console.log(params)
          // if (this.form4.rebateId === '14') {
          //   params.rebateItemId = this.form4.rebateItemId
          //   params.signType = this.form4.signType
          // }
          if (this.form4.rebateId === 14) {
            params.rebateItemId = this.form4.peopleNum
          }
          baseRequest(
            '/user/rwAmbassadorApply/updateAmbassadorApply',
            params
          ).then((response) => {
            this.throughLoading = false
            this.ambassadorfushenVisible = true
          })
        } else {
          return false
        }
      })
    },

    // 销售/大使初审回显
    ambassadordchushen() {
      this.getambassadorcertificate((_) => {
        baseRequest('/user/rwAmbassadorApply/getApplyInfo', {
          applyId: this.$route.query.applyIdchushen,
          applyTime: this.$route.query.applyTime
        }).then((response) => {
          this.form2 = response.data.item
          this.form = response.data.item
          this.fileIddown = response.data.item.resume
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
          })
        })
      })
    },
    // 销售/大使复审回显
    ambassadordfushen() {
      this.getambassadorcertificate((_) => {
        baseRequest('/user/rwAmbassadorApply/getApplyInfo', {
          applyId: this.$route.query.applyIdfushen,
          applyTime: this.$route.query.applyTime
        }).then((response) => {
          this.form2 = response.data.item
          this.form = response.data.item
          this.fileIddown = response.data.item.resume
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
          })
        })

        this.saleswayselect()
      })
    },
    // 销售方式下拉框
    saleswayselect() {
      baseRequest('/finance/rwRebate/getSelect')
        .then((response) => {
          this.options = response.data.item.rwRebateList
          this.rwRebateItemsList = response.data.item.rwRebateItemsList
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 销售/大使初审详情
    ambassadordetails() {
      this.getambassadorcertificate((_) => {
        baseRequest('/user/rwAmbassadorApply/getApplyInfo', {
          id: this.$route.query.major,
          applyId: this.$route.query.applyId,
          applyTime: this.$route.query.applyTime
        }).then((response) => {
          this.form2 = response.data.item
          this.form = response.data.item
          this.form4.rebateId = response.data.item.productId
          this.form4.rebateItemId = response.data.item.rebateId
          this.form4.beginTime = response.data.item.beginTime
          this.form4.endTime = response.data.item.endTime
          this.fileIddown = response.data.item.resume
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
          })
        })
      })
    },
    // 销售/大使复审详情
    applyIdfushendetails() {
      this.getambassadorcertificate((_) => {
        baseRequest('/user/rwAmbassadorApply/getApplyInfo', {
          id: this.$route.query.major,
          applyId: this.$route.query.applyIdfushendetails,
          applyTime: this.$route.query.applyTime
        }).then((response) => {
          this.form2 = response.data.item
          this.form = response.data.item
          this.form5.productType = response.data.item.productId || null
          this.form4.rebateId =
            response.data.item.rebateId === null
              ? null
              : Number(response.data.item.rebateId)
          this.form4.peopleNum =
            response.data.item.rebateItemId === null
              ? null
              : Number(response.data.item.rebateItemId)
          this.form4.rebateItemId = response.data.item.rebateItemId
          this.form4.signType = response.data.item.signType
          this.form4.beginTime = response.data.item.beginTime
          this.form4.endTime = response.data.item.endTime
          this.form = response.data.item
          this.fileIddown = response.data.item.resume
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
          })
        })
      })
      this.saleswayselect()
    },
    // 获取大使的获取证书
    getambassadorcertificate(callback) {
      baseRequest('/user/rwExperience/selects', { type: '0' }).then(
        (response) => {
          response.data.item.map((value) => {
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
            }
          })
          callback && callback()
        }
      )
    },
    // 申请大使回显
    ambassadorform() {
      baseRequest('/user/rwUser/getPersonalUserInfo').then((response) => {
        const item = response.data.item
        this.form2.applyName = item.userName
        this.form2.applyPhone = item.loginName
        this.form2.email = item.email
      })
      // this.getambassadorcertificate()
    },
    // 申请
    apply(ruleForm) {
      this.ambassador(ruleForm)
    },
    // 大使申请
    ambassador(ruleForm, isReset) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // if (this.item1.every(item => !item.value)) {
          //   this.$Message({
          //     message: `请填写学习辅导的项目名称和时间`,
          //     type: 'warning'
          //   })
          //   return
          // }
          if (this.item1.some((item) => item.value && item.joinDate === null)) {
            this.$Message({
              message: `请选择学习辅导的项目时间`,
              type: 'warning'
            })
            return
          }
          // if (this.item2.every(item => !item.value2)) {
          //   this.$Message({
          //     message: `请填写学习的LMI课程名称、时间`,
          //     type: 'warning'
          //   })
          //   return
          // }
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

          if (!this.fileId && !this.fileIddown) {
            this.$Message({
              message: `请上传简历！`,
              type: 'warning '
            })
            return
          }

          const arrParam1 = []
          const arrParam2 = []
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
          const arrParam = arrParam1.concat(arrParam2)
          const params = {
            sex: this.form.sex,
            wechat: this.form.wechat,
            birthday: this.form.birthday,
            email: this.form2.email,
            resume: this.fileId,
            experience: JSON.stringify(arrParam)
          }
          let url = '/user/rwAmbassadorApply/addAmbassadorApply'

          if (isReset) {
            this.resetLoading = true
            params.applyId = this.form.applyId
            url = '/user/rwAmbassadorApply/completAmbassadorApply'
          } else {
            this.ConfirmLoading = true
          }
          baseRequest(url, params).then((response) => {
            if (isReset) {
              this.resetLoading = false
              this.getDaShiHuiXian()
              this.$Message.success('操作成功')
            } else {
              this.ConfirmLoading = false
              this.coachdidisable = false
              this.applyVisible = true
            }
          })
        } else {
          return false
        }
      })
    },

    getDaShiHuiXian() {
      baseRequest('/user/rwAmbassadorApply/getApplyInfo', {}).then(
        (response) => {
          this.form = response.data.item
          this.fileIddown = response.data.item.resume
          for (const key in this.form) {
            if (this.form[key]) {
              this.form[key + 'D'] = true
            }
          }
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
            })
          }
          // this.saleswayselect()
        }
      )
    },
    // 申请大使按钮判断
    ambassadorButton() {
      baseRequest('/user/rwAmbassadorApply/buttonStyle').then((response) => {
        this.buttonType = response.data.item.type
        this.getambassadorcertificate((_) => {
          if (this.buttonType === 'none' || this.buttonType === 'applyIng') {
            this.getDaShiHuiXian()
          }
        })
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
