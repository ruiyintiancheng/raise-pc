/*
 * @Author: wk
 * @Date: 2020-07-07 16:24:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-03-15 14:33:53
  * @Description:  登录
 */
<template>
    <div class="login-container" :class="{'login-mobile':!IsPC()}" :style="{backgroundImage:'url('+bjt+')'}">
      <div class="login-dark">
        <div class="login-demol">
          <img :src="logo" alt="logo" class="logo" @click="$router.push('/')">
          <div class="login-title">
            <img :src="block" alt="">  用户登录
          </div>
          <el-form  ref="form" :model="form" class="login-form" @submit.native.prevent>
            <el-form-item >
              <el-input v-model="form.loginName" placeholder="请输入手机号或邮箱" clearable :class="{borderG:nameColor===1,borderR:nameColor===2}" @focus="focusColor('nameColor')" @blur="blurColor('nameColor')"></el-input>
            </el-form-item>
              <el-form-item >
              <el-input type="password" v-model="form.loginPasswd" placeholder="请输入密码" clearable :class="{borderG:passwdColor===1,borderR:passwdColor===2}" @focus="focusColor('passwdColor')" @blur="blurColor('passwdColor')"></el-input>
            </el-form-item>
             <el-form-item >
              <el-input  @keyup.enter.native="handleLogin" v-model="form.captcha" placeholder="请输入验证码" clearable :class="{borderG:captchaColor===1,borderR:captchaColor===2}" @focus="focusColor('captchaColor')"  @blur="blurColor('captchaColor')"></el-input>
              <a class="login-captcha"  @click="handleCaptcha">
                <img :src="verifyCode" />
              </a>
            </el-form-item>
            <div class="login-jump clearfix">
              <a @click="$router.push({ path: '/reset' })" class="a-left">忘记密码?</a>
              <a @click="$router.push('/register')" class="a-right">立即注册</a>
            </div>
            <!-- <div class="login-other">
                <span class="login-other-inside">其他登录方式:</span>
                <a class="login-other-inside wechat" @click="wechatHandle"></a>
                <div id="wx_qrcode"></div>
            </div> -->
             <el-button class="login-bt"
                   type="primary"
                   :loading="loading"
                   @click.native.prevent="handleLogin">立即登录</el-button>
             <el-button class="login-bt wechat-bth"
                   plain
                   :UseSubmitBehavior="false"
                   @click="wechatHandle"><svg-icon class="wechat-icon" icon-class="icon-wechat"></svg-icon> 微信扫码登录</el-button>
             <div class="login-error">{{errMsg}}</div>
                <div class="privacy-tip">
              点击登录或注册表示您已阅读并同意睿思智得<a class="privacy-btn" @click="toPrivacy()">《隐私政策》</a>
            </div>
          </el-form>
        </div>
      </div>
    </div>
</template>
<script>
import bjt from '@/assets/images/bjt.png'
import block from '@/assets/images/block.png'
import logo from '@/assets/logo/logo.png'
import { baseRequest } from '@/api/base'
import { encrypt } from '@/utils/encryption'
import { randomCode } from '@/utils/index'
export default {
  data() {
    return {
      bjt,
      block,
      logo,
      loading: false,
      errMsg: '',
      nameColor: 0,
      passwdColor: 0,
      captchaColor: 0,
      verifyRandom: '',
      verifyCode: '',
      loginUrl: '',
      form: {
        loginName: '',
        loginPasswd: '',
        captcha: ''
      }
    }
  },
  created() {
    console.log(this.$store)
    // const state = this.$route.query.state
    // const code = this.$route.query.code
    // if (state && code && state === localStorage.getItem('state')) {
    //   baseRequest('/login/loginWeChat', { 'code': code }).then(response => {
    //     const openId = response.data.item.openId
    //     const token = response.data.item.token
    //     if (token) {
    //       this.$store.dispatch('LoginByUsername', token).then(() => {
    //         this.$router.push('/')
    //       })
    //     } else {
    //       this.$router.push({ path: '/register', query: { openId: openId }})
    //     }
    //   })
    // }
  },
  mounted() {
    this.handleCaptcha()
  },
  methods: {
    // 立即登录
    handleLogin() {
      this.errMsg = ''
      if (this.form.loginName) {
        if (this.form.loginName.indexOf('@') > 0) {
          this.loginUrl = '/user/userLogin/emailLogin'
          if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.form.loginName)) {
            this.nameColor = 2
            this.errMsg = '邮箱格式不正确'
            return
          }
        } else {
          this.loginUrl = '/user/login'
          if (!/^1[34578]\d{9}$/.test(this.form.loginName)) {
            this.nameColor = 2
            this.errMsg = '手机号码格式不正确'
            return
          }
        }
      } else {
        this.nameColor = 2
        this.errMsg = '请输入手机号/邮箱'
        return
      }
      if (!this.form.loginPasswd) {
        this.passwdColor = 2
        this.errMsg = '密码不能为空'
        return
      }
      if (!this.form.captcha) {
        this.captchaColor = 2
        this.errMsg = '验证码不能为空'
        return
      }
      this.loading = true
      encrypt(this.form.loginPasswd).then(password => {
        const params = {
          loginPasswd: password,
          captcha: this.form.captcha,
          verifyRandom: this.verifyRandom
        }
        this.form.loginName.indexOf('@') > 0 ? params.email = this.form.loginName : params.loginName = this.form.loginName
        baseRequest(this.loginUrl, params).then(response => {
          if (response.code === 2) {
            const validateMsg = response.data
            if (validateMsg.hasOwnProperty('loginName')) {
              this.nameColor = 2
              this.errMsg = validateMsg.loginName
            }
            if (validateMsg.hasOwnProperty('loginPasswd')) {
              this.passwdColor = 2
              this.errMsg = validateMsg.loginPasswd
            }
            if (validateMsg.hasOwnProperty('email')) {
              this.nameColor = 2
              this.errMsg = validateMsg.email
            }
            if (validateMsg.hasOwnProperty('captcha')) {
              this.verifyCode = 'data:image/png;base64,' + validateMsg.verifyCode
              this.verifyRandom = validateMsg.verifyRandom
              this.$nextTick(function() {
                this.errMsg = validateMsg.captcha
                this.captchaColor = 2
              })
            }
            this.loading = false
            this.handleCaptcha()
            return
          }
          this.$store.dispatch('LoginByUsername', response.data.token || response.data.item.token).then(() => {
            // this.loading = false
            if (this.$store.state.permission.fromPage) {
              const fromPage = JSON.parse(this.$store.state.permission.fromPage)
              const path = fromPage.path
              const query = fromPage.query
              this.$store.dispatch('SetLoginFromPage', '').then(_ => {
                this.$router.push({ path, query })
              })
            } else {
              // this.$router.push({ path: '/' })
              this.toRolePage()
            }
          }).catch(() => {
            this.loading = false
          })
        }).catch(_ => {
          this.loading = false
        })
      })
    },
    // 跳转到相应角色页面
    toRolePage() {
      this.$store.dispatch('GetUserInfo').then(_ => {
        const roles = this.$store.state.user.roles
        if (roles.includes('0') || roles.includes('1')) {
          this.$router.push({
            name: 'user'
          })
        } else if (roles.includes('2') || roles.includes('4')) {
          this.$router.push({
            name: 'teach'
          })
        } else if (roles.includes('5') || roles.includes('6')) {
          this.$router.push({
            name: 'learn'
          })
        } else {
          console.log('dengluye')
          this.$router.push({ path: '/' })
        }
      })
    },
    // 点击切换验证码
    handleCaptcha() {
      baseRequest('/user/userLogin/getVerifyCode', { date: new Date().getTime() }).then((response) => {
        this.verifyCode = 'data:image/png;base64,' + response.data.item.verifyCode
        this.verifyRandom = response.data.item.verifyRandom
      })
    },
    focusColor(c) {
      if (c === 'nameColor') {
        this.nameColor = 1
      }
      if (c === 'passwdColor') {
        this.passwdColor = 1
      }
      if (c === 'captchaColor') {
        this.captchaColor = 1
      }
    },
    blurColor(c) {
      if (c === 'nameColor') {
        this.nameColor = 0
      }
      if (c === 'passwdColor') {
        this.passwdColor = 0
      }
      if (c === 'captchaColor') {
        this.captchaColor = 0
      }
    },
    wechatHandle() {
      const state = randomCode(32)
      localStorage.setItem('state', state)
      window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx76edc5993b3c35b4&redirect_uri=http%3a%2f%2fwww.raise-wisdom.com&response_type=code&scope=snsapi_login&state=' + state + '#wechat_redirect'
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent
      var Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod']
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false
          break
        }
      }
      return flag
    },
    toPrivacy() {
      this.$router.push({
        name: 'privacy'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container{
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  background-position: 0 0;
  background-repeat:no-repeat;
  background-size: 100% 100%;
  .privacy-tip{
    font-size: 12px;
    margin-top: 10px;
    color: #ABABAB;
    .privacy-btn{
      color: #00afff;
    }
  }
  .login-dark{
	width: 50%;
	height: 100%;
	background-color: #222222;
	background: rgba(22,22,22,.06); 
    padding-top: 1px;
   .login-demol{
    margin: 0 auto;
    width: 52%;
	height: 69%;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
	border-radius: 10px;
    position: relative;
     top: 50%; /*偏移*/
         transform: translateY(-50%);
     min-width: 437px;
     min-height: 590px;
     overflow:hidden;
     .logo{
	// height: 14%;
  width: 30%;
    margin-top: 12%;
    margin-left: 16%;
    display: block;
    margin-bottom: 8%;
     }
    .login-title{
     width: 68%;
	height: 4%;
	font-family: PingFangSC-Semibold;
	font-size: 1rem;
	font-weight: 600;
	font-stretch: normal;
	line-height: 4%;
	letter-spacing: 0px;
	color: #222222;
    margin: 3% auto 4% auto;
    
    img {
    vertical-align: middle;
    height: 90%;
    width: 3px;
    margin-right: 5px;
       
    }
     }
     .login-form{
       width: 68%;
       height: 56%;
       margin: 0  auto;
       .login-jump{
	        height: 14px;
	        font-family: PingFangSC-Regular;
	        font-size: 0.8rem;
	        font-weight: normal;
	        font-stretch: normal;
	        line-height: 21px;
	        letter-spacing: 0px;
	        color: #555555;
          margin-top:-6px ;
          .a-left{
            float: left;
          }
          .a-right{
            float: right;
          }
           .a-left:hover{
            color: #00afff;
          }
           .a-right:hover{
            color: #00afff;
          }
       }
       .login-other{
                height: 32px;
                line-height: 32px;
                font-size: 0.5rem;
                color: #555555;
                margin-top: 10px;
                .wechat{
                    width: 22px;
                    height: 22px;
                    background-image: url('../../assets/images/weixin.png');
                    background-size: 100%;
                    background-repeat: no-repeat;
                    margin-left: 16px;
                    margin-top: 4px;
                    &:hover{
                        background-image: url('../../assets/images/weixin2.png');
                    }
                }
                .login-other-inside{
                    float: left;
                }
            }
       .login-bt{
         width: 100%;
         height: 13%;
         margin-top: 8%;
        &.el-button+.el-button{
            margin-left:0;
        }
         &.wechat-bth{
           margin-top: 6%;
           background-color: #ffffff;
          border-radius: 4px;
          border: solid 1px #04ae0f;
          color: #04ae0f;
          font-size: 14px;
          outline:none;
          cursor: pointer;
          .wechat-icon{
            margin-right: 5px;
          }
          &:hover{
            background-color: #04ae0f;
            color: #fff;
          }
         }
       }
       .login-captcha{
         position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        height: 90%;
          img{
            border-radius: 4px;
            display: block;
            // width: 80%;
            float: right;
            height: 100%;
          }
       }
      
       .login-error{
	        height: 15px;
          text-align: center;
	        font-family: PingFangSC-Regular;
	        font-size: 14px;
	        font-weight: normal;
	        font-stretch: normal;
	        line-height: 25px;
	        letter-spacing: 0px;
	        color: #fb664a;
          margin-top: 5px;
       }
     }
    }
  }
}
</style>