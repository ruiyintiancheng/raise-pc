<template>  
  <div class="next-step">
     
      <div class="step-top">
          <ul>
              <li style="color:#00afff">
                  <img src="../../../assets/basic-img/icon-1.svg" alt="">
                  <span style="display:block">验证身份</span>
              </li>
              <li style="margin:0 20px">
                  <img src="../../../assets/basic-img/icon-2-gray.svg" alt="">
                  <span style="display:block">设定密码</span>
              </li>
              <li>
                  <img src="../../../assets/basic-img/icon-3-gray.svg" alt="">
                  <span style="display:block">完成</span>
              </li>
          </ul>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div>
          <el-form :model="pswData" :rules="rules" ref="psw">
            <div>
            <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222;display:flex;justify-content:space-between">
              <span class="form-label">{{phoneNum.indexOf('@')>0?'邮箱':'手机号码'}}</span>
              <span v-if="userInfo.loginName && userInfo.email"><a @click="judgeState" class="changeColor">{{judgeStates===1?'邮箱验证':'手机号验证'}}</a></span>
            </div>
            <el-input placeholder="" v-model.trim="phoneNum" :disabled="true" style="color:#222222" class="inpt"></el-input>
             </div>
             <div>
               <el-form-item  prop="smsCode" >
            <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">{{phoneNum.indexOf('@')>0?'邮箱验证码':'短信验证码'}}</span></div>
            <el-input v-model.trim="pswData.smsCode" style="display:block;float:left;margin-right:18px;width:200px" clearable placeholder="请输入验证码"></el-input>
            <el-button v-if="show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe"  @click="getCode">获取验证码</el-button>
            <el-button v-if="!show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe">{{count}}s后可重发</el-button>
            </el-form-item>
            </div>
            </el-form>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div class="last">
          <div style="font-size:14px;color:#222222;margin-bottom:10px; font-family:PingFangSC-Regular;text-align: left;"><span>没有收到短信验证码？</span></div>
              <p>1.网络通信异常可能会造成短信丢失，请重新获取。</p>
              <p>2.请核实手机是否欠费停机，或屏蔽了系统信息。</p>
              <p>3.如果手机已丢失或停用，请联系平台客服。</p>
              <p>4.您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-top:30px"></div>
     
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      pswData: {
        smsCode: null
      },
      show: true,
      count: '',
      timer: null,
      phoneNum: '',
      judgeStates: 1,
      userInfo: {},
      rules: {
        smsCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    select() {
      this.phoneNum = this.select === '1' ? this.userInfo.loginName : this.userInfo.email
    }
  },
  methods: {
    judgeState() {
      this.show = true
      clearInterval(this.timer)
      this.timer = null
      this.pswData.smsCode = null
      this.judgeStates === 1 ? this.judgeStates = 2 : this.judgeStates = 1
      if (this.judgeStates === 1) {
        this.phoneNum = this.userInfo.loginName
      } else if (this.judgeStates === 2) {
        this.phoneNum = this.userInfo.email
      }
    },
    // 获取短信验证码
    getCode() {
      if (this.phoneNum.indexOf('@') > 0) {
        baseRequest('/user/rwUser/sendEmailMsg', { email: this.phoneNum, state: '1' }).then(response => {
          if (response.code === 2) {
            this.$Message.warning(response.data.email)
          } else {
            this.timeGo()
          }
        })
      } else {
        baseRequest('/user/rwPhoneVeriCodeRecords/sendShortMsg', { requestPhone: this.phoneNum, state: '5' }).then(response => {
          if (response.code === 2) {
            this.$Message.warning(response.data.smsCode)
          } else {
            this.timeGo()
          }
        })
      }
    },
    timeGo() {
      const TIME_COUNT = 180
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    upData(callback) {
      this.$refs['psw'].validate((valid) => {
        if (valid) {
          const verifyUrl = this.phoneNum.indexOf('@') > 0 ? '/user/rwUser/isEmailVerify' : '/user/rwUser/isPhoneVerify'
          const params = {
            loginName: this.phoneNum.indexOf('@') > 0 ? '' : this.phoneNum,
            smsCode: this.phoneNum.indexOf('@') > 0 ? '' : this.pswData.smsCode,
            emailCode: this.phoneNum.indexOf('@') > 0 ? this.pswData.smsCode : '',
            email: this.phoneNum.indexOf('@') > 0 ? this.phoneNum : ''
          }
          baseRequest(verifyUrl, params).then(response => {
            if (response.code === 2) {
              if (response.data) {
                for (const iterator in response.data) {
                  this.$Message.warning(response.data[iterator])
                  break
                }
              }
            } else {
              callback && callback(params)
            }
          })
        } else {
          return
        }
      })
    }
  },
  created() {
    baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
      this.userInfo = response.data.item
      this.phoneNum = response.data.item.loginName ? response.data.item.loginName : response.data.item.email
    })
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.next-step{
  .changeColor:hover{
    color: #00afff;
  }
  .step-top{
      height: 80px;
      ul li{
          float: left;
          width: 100px;
          height: 80px;
          background-color: #fafafa;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          text-align: center;
          padding-top:12px;
          padding-bottom:12px
          }
      }
      .last{
          padding:14px 18px;
          width: 340px;
          height: 130px;
          background-color: #fbf8eb;
          border-radius: 4px;
          border: 1px solid #dfd0a3;
          p{
              font-size:12px;
              color: #222222;
              line-height: 20px;
              font-family:PingFangSC-Regular;
              text-align: left;
          }
      }   
}
</style>