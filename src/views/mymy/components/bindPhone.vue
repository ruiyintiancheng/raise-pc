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
          <el-form :model="phoneData" :rules="rules" ref="phone">
              <div v-if="phoneNum.indexOf('@')<0">
                <div style="font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label">{{phoneNum.indexOf('@')>0?'邮箱':'手机号码'}}</span></div>
                <el-input placeholder="" v-model="phoneNum" disabled style="color:#222222"></el-input>
             </div>
              <div>
                <el-form-item  prop="smsCode">
                  <div style="font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">密码</span></div>
                  <el-input v-model.trim="phoneData.smsCode" style="display:block;float:left;margin-right:18px;" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
            </div>
          </el-form>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div class="last">
          <div style="font-size:14px;color:#222222;margin-bottom:10px; font-family:PingFangSC-Regular;text-align: left;"><span>绑定新手机号</span></div>
            <p>1.此账号绑定新手机号码，需要您输入登录密码确认。</p>
            <p>2.确认通过后输入新的手机号，验证通过后此账户通过新绑定的手机号登录系统。</p>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-top:30px"></div>
     
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { encrypt } from '@/utils/encryption'
export default {
  data() {
    return {
      phoneData: {
        smsCode: ''
      },
      rules: {
        smsCode: [
          { required: true, message: '请输入密码' }
        ],
        phoneNum: [
          { required: true, message: '请输入手机号' }
        ]
      },
      show: true,
      phoneStatus: '',
      count: '',
      timer: null,
      phoneNum: ''

    }
  },
  methods: {
    getCode() {
      const TIME_COUNT = 60
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
      this.$refs['phone'].validate((valid) => {
        if (valid) {
          encrypt(this.phoneData.smsCode).then(password => {
            // callback && callback()
            const params = {
              loginPasswd: password
            }
            this.phoneNum.indexOf('@') > 0 ? params.email = this.phoneNum : params.loginName = this.phoneNum
            baseRequest('/user/rwUser/checkPasswd', params).then(response => {
              if (response.code === 2) {
                if (response.data) {
                  for (const iterator in response.data) {
                    this.$Message.warning(response.data[iterator])
                    break
                  }
                }
              } else {
                const status = response.data.item.status
                if (status === '1') {
                  callback && callback()
                } else {
                  this.$Message.warning('密码错误')
                }
              }
            })
          })
        } else {
          return '验证码错误'
        }
      })
    }
  },
  created() {
    baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
      this.phoneNum = response.data.item.loginName || response.data.item.email
      this.phoneStatus = response.data.item.phoneStatus
    })
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
                  width: 100%;
                  height: 130px;
                  background-color: #fbf8eb;
                  border-radius: 4px;
                  border: 1px solid #dfd0a3;
                  p{font-size:12px;
                      color: #222222;
                      font-size:12px;
                      color: #222222;
                      line-height: 20px;
                      font-family:PingFangSC-Regular;
                      text-align: left;
                      }
              }   
       }
</style>