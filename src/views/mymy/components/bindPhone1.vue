<template>  
  <div class="next-step">
     
      <div class="step-top">
          <ul>
              <li>
                  <img src="../../../assets/basic-img/icon-1-gray.svg" alt="">
                  <span style="display:block">验证身份</span>
              </li>
              <li style="margin:0 20px;color:#00afff">
                  <img src="../../../assets/basic-img/icon-2.svg" alt="">
                  <span style="display:block">绑定手机</span>
              </li>
              <li>
                  <img src="../../../assets/basic-img/icon-3-gray.svg" alt="">
                  <span style="display:block">完成</span>
              </li>
          </ul>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div>
          <el-form :model="phoneData1" :rules="rules" ref="phone1">
           
            <el-form-item  prop="loginName" :rules="[
                    { required: true, message: '请输入手机号码'},
                    { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号格式' }]">
           <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">新手机号码</span></div>
            <el-input placeholder="请输入手机号" v-model.number="phoneData1.loginName"  style="color:#222222" class="inpt" maxlength="11" minlength="11">
            </el-input> 
             </el-form-item>
               <el-form-item  prop="smsCode" >
            <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">验证码</span></div>
            <el-input v-model.trim="phoneData1.smsCode" style="display:block;float:left;margin-right:18px;width:200px" placeholder="请输入验证码"></el-input>
            <el-button v-if="show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe"  @click="getCode">获取验证码</el-button>
            <el-button v-if="!show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe">{{count}}s后可重发</el-button>
            </el-form-item>
               <!-- <el-form-item  prop="loginPasswd">
           <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">新密码</span></div>
            <el-input placeholder="请输入新密码" v-model="phoneData1.loginPasswd" style="color:#222222" class="inpt" show-password>
            </el-input>
           </el-form-item>
               <el-form-item  prop="loginPasswd1">
           <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">确认密码</span></div>
            <el-input placeholder="请再次输入新密码" v-model="phoneData1.loginPasswd1" style="color:#222222" class="inpt" show-password>
            </el-input>
           </el-form-item> -->
            
            </el-form>
      </div>
      <div style="border-top:1px dashed #aaaaaa;margin-top:20px"></div>
     
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
// import { encrypt } from '@/utils/encryption'
export default {
  props: {
    loginName: String
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.phoneData1.loginPasswd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/^\S{8,16}$/.test(value)) {
          callback(new Error('密码8-16位大小写字母、数字、或者特殊符合组成'))
        } else {
          callback()
        }
      }
    }
    return {
      phoneData1: {
        loginName: '',
        smsCode: '',
        loginPasswd: '',
        loginPasswd1: ''
      },
      show: true,
      count: '',
      timer: null,
      rules: {
        loginName: [
          { required: true, message: '请输入手机号码' }
        ],
        smsCode: [
          { required: true, message: '请输入验证码' }
        ],
        loginPasswd: [
          { validator: validatePass }
        ],
        loginPasswd1: [
          { validator: validatePass2 }
        ]

      }
    }
  },
  methods: {
    getCode() {
      if (!this.phoneData1.loginName) {
        this.$Message.warning('请输入手机号码')
        return
      } else if (!/^1[3456789]\d{9}$/.test(this.phoneData1.loginName)) {
        this.$Message.warning('请输入正确的手机号格式')
        return
      }
      baseRequest('/user/rwPhoneVeriCodeRecords/sendShortMsg', { requestPhone: this.phoneData1.loginName, state: '6' }).then(response => {
        if (response.code === 2) {
          this.$Message.warning(response.data.smsCode)
        }
      })
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
      this.$refs['phone1'].validate((valid) => {
        if (valid) {
          // const params = {
          //   loginName: this.phoneData1.loginName,
          //   loginPasswd: this.phoneData1.loginPasswd
          // }
          // baseRequest('/user/rwUser/checkPasswd', params).then(_ => {
          //   callback && callback()
          // })
          const params = {
            loginName: this.loginName,
            newPhone: this.phoneData1.loginName,
            smsCode: this.phoneData1.smsCode
          }
          // callback && callback()
          baseRequest('/user/rwUser/changePhone', params).then(response => {
            if (response.code === 2) {
              if (response.data) {
                for (const iterator in response.data) {
                  this.$Message.warning(response.data[iterator])
                  break
                }
              }
            } else {
              callback && callback()
            }
          })
        } else {
          return
        }
      })
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.next-step{
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
el-form-item{
margin-bottom:20px
}
}
</style>