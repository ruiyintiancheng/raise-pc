<template>  
  <div class="next-step">
     
      <div class="step-top">
          <ul>
              <li style="">
                  <img src="../../../assets/basic-img/icon-1-gray.svg" alt="">
                  <span style="display:block">验证身份</span>
              </li>
              <li style="margin:0 20px;color:#00afff">
                  <img src="../../../assets/basic-img/icon-2.svg" alt="">
                  <span style="display:block">设定密码</span>
              </li>
              <li>
                  <img src="../../../assets/basic-img/icon-3-gray.svg" alt="">
                  <span style="display:block">完成</span>
              </li>
          </ul>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div style="height:136px">
          <el-form :model="pswData" :rules="rules" ref="psw1">
            <div>
               <el-form-item  prop="loginName">
           <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required" autocomplete="off">新密码</span></div>
            <el-input placeholder="请输入新密码" v-model.trim="pswData.loginName" style="color:#222222" class="inpt" show-password>
            </el-input>
           </el-form-item>
             </div>
             <div style="margin-top:20px">
               <el-form-item  prop="loginPasswd">
            <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">确认新密码</span></div>
            <el-input v-model.trim="pswData.loginPasswd" style="display:block;margin-right:18px;width:340px" placeholder="请再次输入新密码" show-password autocomplete="off"></el-input>
           </el-form-item>
            </div>
            </el-form>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-bottom:20px;margin-top:200px"></div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { encrypt } from '@/utils/encryption'
export default {
  props: {
    pswFirst: {
      type: Object,
      default: {}
    }
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.pswData.loginName) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        // if (this.pswData.loginPasswd !== '') {
        //   this.$refs.psw1.validateField('loginPasswd')
        // }
        callback()
      }
    }
    var validatePassGs = (rule, value, callback) => {
      if (!/^\S{8,16}$/.test(value)) {
        callback(new Error('密码8-16位大小写字母、数字、或者特殊符合组成'))
      } else {
        callback()
      }
    }
    return {
      pswData: {
        loginName: null,
        loginPasswd: null
      },
      show: true,
      count: '',
      timer: null,
      pswStatus: 1,
      pswVisible: false,
      rules: {
        loginName: [
          { validator: validatePass },
          { validator: validatePassGs }

        ],
        loginPasswd: [
          { validator: validatePass2 }
        ]
      }

    }
  },
  methods: {
    upData(callback) {
      this.$refs['psw1'].validate((valid) => {
        if (valid) {
          encrypt(this.pswData.loginName).then(password => {
            // const params = {
            //   loginName: this.pswFirst.loginName,
            //   loginPasswd: password,
            //   smsCode: this.pswFirst.smsCode
            // }
            baseRequest('/user/rwUser/changePassword', { loginPasswd: password }).then(response => {
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
          })
        } else {
          return
        }
      })
    }
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
      .last{
          padding:14px 18px;
          width: 340px;
          height: 130px;
          background-color: #fbf8eb;
          border-radius: 4px;
          border: 1px solid #dfd0a3;
          ul li{
              font-size:12px;
              color: #222222;
              margin-bottom:8px;
              font-family:PingFangSC-Regular;
              text-align: left;
          }
      }   
}
</style>