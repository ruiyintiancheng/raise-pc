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
                  <span style="display:block">绑定邮箱</span>
              </li>
              <li>
                  <img src="../../../assets/basic-img/icon-3-gray.svg" alt="">
                  <span style="display:block">完成</span>
              </li>
          </ul>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0"></div>
      <div >
          <el-form :model="emailData" :rules="rules" ref="email">
            <div v-if="phoneNum.indexOf('@')<0">
           <div style="margin-bottom:6px; font-family:PingFangSC-Regular;font-size:13px;color:#222222" class="form-label required"><span >{{phoneNum.indexOf('@')>0?'邮箱':'手机号码'}}</span></div>
            <el-input :placeholder="phoneNum"  :disabled="true" style="color:#222222" class="inpt">
            </el-input>
             </div>
             <div>
            <el-form-item  prop="smsCode">
                  <div style="font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">密码</span></div>
                  <el-input v-model.trim="emailData.smsCode" style="display:block;float:left;margin-right:18px;" placeholder="请输入密码" show-password></el-input>
                </el-form-item>
            </div>
            </el-form>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin:20px 0 ;margin-top:30px"></div>
       <div class="last">
          <div style="font-size:14px;color:#222222;margin-bottom:10px; font-family:PingFangSC-Regular;text-align: left;"><span>没有收到短信验证吗？</span></div>
              <p>1.网络通信异常可能会造成短信丢失，请重新获取。</p>
              <p>2.请核实手机是否欠费停机，或屏蔽了系统信息。</p>
              <p>3.如果手机已丢失或停用，请联系平台客服。</p>
              <p>4.您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-top:30px"></div>
     
  </div>
</template>

<script>
import { encrypt } from '@/utils/encryption'
import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      emailData: {
        smsCode: null
      },
      rules: {
        smsCode: [
          { required: true, message: '请输入密码' }
        ]
      },
      phoneStatus: '',
      show: true,
      count: '',
      timer: null,
      phoneNum: ''

    }
  },
  methods: {
    getCode() {
      baseRequest('/user/rwPhoneVeriCodeRecords/sendShortMsg', { requestPhone: this.phoneNum, state: '8' }).then(response => {
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
      this.$refs['email'].validate((valid) => {
        if (valid) {
          encrypt(this.emailData.smsCode).then(password => {
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
    // upData(callback) {
    //   this.$refs['email'].validate((valid) => {
    //     if (valid) {
    //       const params = {
    //         loginName: this.phoneNum,
    //         smsCode: this.emailData.smsCode
    //       }
    //       baseRequest('/user/rwUser/isPhoneVerify', params).then(response => {
    //         if (response.code === 2) {
    //           if (response.data) {
    //             for (const iterator in response.data) {
    //               this.$Message.warning(response.data[iterator])
    //               break
    //             }
    //           }
    //         } else {
    //           callback && callback(params)
    //         }
    //       })
    //     } else {
    //       return
    //     }
    //   })
    // }
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