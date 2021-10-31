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
          <el-form :model="emailData1" :rules="rules" ref="email1">
            <div>
              <el-form-item  prop="email">
           <div style="font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">邮箱</span></div>
            <el-input placeholder='请输入邮箱' v-model.trim="emailData1.email" style="color:#222222" class="inpt">
            </el-input>
            </el-form-item>
             </div>
             <div>
               <el-form-item  prop="emailCode" >
            <div style="font-family:PingFangSC-Regular;font-size:13px;color:#222222"><span class="form-label required">邮箱验证码</span></div>
            <el-input v-model.trim="emailData1.emailCode" style="display:block;float:left;margin-right:18px;width:200px" placeholder="请输入验证码"></el-input>
            <el-button v-if="show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe"  @click="getCode">获取验证码</el-button>
            <el-button v-if="!show" style="float:left;display:block;width:122px;border:1px solid #00affe; color:#00affe">{{count}}s后可重发</el-button>
            </el-form-item>
            </div>
            </el-form>
      </div>
      <div style="border-top:0px dashed #aaaaaa; margin:20px 0;margin-top:30px"></div>
       <div class="last">
          <div style="font-size:14px;color:#222222;margin-bottom:10px; font-family:PingFangSC-Regular;text-align: left;"><span>没有收到邮箱验证码？</span></div>
              <p>1.网络通讯异常可能会造成邮件丢失，请重新获取</p>
              <p>2.请核实邮箱是否正常使用，并检查垃圾邮箱文件夹</p>
         <!-- <ul>
             <li></li>
             <li></li>
         </ul> -->
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-top:30px"></div>
     
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      emailData1: {
        email: null,
        emailCode: null
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱' },
          { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, message: '请输入正确的邮箱' }
        ],
        emailCode: [
          { required: true, message: '请输入验证码' }
        ]
      },
      show: true,
      count: '',
      timer: null,
      phoneNum: ''

    }
  },
  methods: {
    getCode() {
      if (!this.emailData1.email) {
        this.$Message.warning('请输入邮箱')
        return
      }
      if (!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.emailData1.email)) {
        this.$Message.warning('请输入正确的邮箱')
        return
      }
      baseRequest('/user/rwUser/sendNewEmailMsg', { email: this.emailData1.email, state: '1', loginName: this.phoneNum }).then(response => {
        if (response.code === 2) {
          this.$Message.warning(response.data.email)
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
      this.$refs['email1'].validate((valid) => {
        if (valid) {
          const params = {
            email: this.emailData1.email,
            emailCode: this.emailData1.emailCode
          }
          // callback && callback()
          baseRequest('/user/rwUser/updateEmail', params).then(response => {
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
          return '验证码错误'
        }
      })
    }
  },
  created() {
    baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
      this.phoneNum = response.data.item.loginName
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
                margin-top:20px;
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