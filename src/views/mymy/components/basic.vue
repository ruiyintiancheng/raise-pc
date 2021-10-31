<template>
    <div class="bt-content inside-container">
         <h4>您的基础信息</h4>
            <div class="basic-mess">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-name.svg" alt="">
                    </li>
                    <li class="cen">姓名</li>
                    <li class="wh">{{basicData.userName}}</li>
                    <li style="float:right"><div class="change" >
                       <el-button @click="changeName" type="primary" size="mini">修改</el-button>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess" style="height:160px">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-qr.svg" alt="">
                    </li>
                    <li class="cen">个人照片</li>
                    <li class="wh"><li class="wh"><personalPhoto></personalPhoto></li>
                </ul>
            </div>
            <div class="basic-mess">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-phone.svg" alt="">
                    </li>
                    <li class="cen">绑定手机</li>
                    <li class="wh">{{basicData.loginName?basicData.loginName:'' | addStar}}</li>
                    <li style="float:right;font-size:14px" ><div class="change" >
                          <span v-if="basicData.phoneStatus==='1'" style="color:#67C23A">已绑定</span>
                          <span v-else style="color:#909399">未绑定</span>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-mail.svg" alt="">
                    </li>
                    <li class="cen">绑定邮箱</li>
                    <li class="wh">
                        {{basicData.email?basicData.email: '' | addStar}}
                    </li>
                    <li style="float:right;font-size:14px" ><div class="change" >
                          <span v-if="basicData.emailStatus==='1'" style="color:#67C23A">已验证</span>
                          <span v-else style="color:#909399">未验证</span>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-wechat.svg" alt="">
                    </li>
                    <li class="cen">绑定微信</li>
                    <li class="wh"></li>
                    <li style="float:right"><div class="change" >
                       <el-button type="danger" size="mini" v-if="basicData.openId" @click="unbundlingWechat">解绑</el-button>
                       <el-button type="success" size="mini" v-else @click="bindWechat">绑定</el-button>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/urgency-lianxi.svg" alt="">
                    </li>
                    <li class="cen">紧急联系方式</li>
                    <li class="wh">
                      {{basicData.urgentPhone}}
                    </li>
                    <li style="float:right"><div class="change" >
                       <el-button type="primary" size="mini" v-if="basicData.urgentPhone" @click="addUrgentPhone">修改</el-button>
                       <el-button type="primary" size="mini" v-else @click="addUrgentPhone">添加</el-button>
                       </div>
                    </li>
                </ul>
            </div>
             <div class="basic-mess" v-if="basicData.coach" style="height:160px">
                <ul>
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-qr.svg" alt="">
                    </li>
                    <li class="cen">微信二维码</li>
                    <li class="wh"><div style="width:128px;height:128px;border-radius:10px;border:1px solid #dddddd;padding:8px;"><qrCode></qrCode></div></li>
                    <li style="float:right"><div class="change" >
                       <!-- <el-button type="primary" size="mini" @click="changeHandle">修改</el-button> -->
                       </div>
                    </li>
                </ul>
            </div>
             <div class="basic-mess" v-if="basicData.coach">
                <ul class="clearfix" style="padding-bottom:20px;">
                    <li class="img">
                        <img src="../../../assets/basic-img/icon-jianjie.svg" alt="">
                    </li>
                    <li class="cen">个人简介</li>
                    <li class="wh">
                      {{basicData.coachIntro}}
                    </li>
                    <li style="float:right"><div class="change" >
                       <el-button type="primary" size="mini" @click="introChange">修改</el-button>
                       </div>
                    </li>
                </ul>
            </div>
        <h4 style="margin-top:20px;font-family: PingFangSC-Semibold">您的安全服务</h4>
        <div class="basic-mess" style="height:90px">
                <ul>
                    <li class="img gre">
                        <img src="../../../assets/basic-img/icon-password.svg" alt="">
                    </li>
                    <li class="cen">登录密码</li>
                    <div class="ceshiDiv">
                    <div class="wh" style="width:148px;line-height: 30px;height:30px">●●●●●●</div>
                    <div class="_text" style="margin-left:160px;font-size:14px;color:#888888;">
                    <p style="display:block;margin-bottom:-6px;">安全性高的密码可以是账号更安全</p>
                    <p style="display:block">建议您定期更换密码，且设置一个包含数字和字母并长度超过6位以上的密码</p>
                    </div>
                    </div>
                    <li style="float:right"><div class="change" >
                       <el-button type="primary" size="mini" @click="changePsw">修改</el-button>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess" style="height:90px">
                <ul>
                    <li class="img gre">
                        <img src="../../../assets/basic-img/icon-phone-white.svg" alt="">
                    </li>
                    <li class="cen">绑定手机</li>
                    <div class="ceshiDiv">
                    <div class="wh" style="width:148px;line-height: 30px;height:30px">
                        {{basicData.loginName?basicData.loginName:'' | addStar}}
                    </div>
                    <div class="_text">
                    <p style="display:block;margin-bottom:-6px">此手机号码是您登录系统的手机号码</p>
                    <p>可在此处修改绑定的手机号码</p>
                    </div>
                    </div>
                    <li style="float:right">
                        <div class="change" >
                       <el-button :type="basicData.phoneStatus==='1'?'primary':'success'" size="mini" @click="bindPhone">{{basicData.phoneStatus==='1'?'修改':'绑定'}}</el-button>
                       </div>
                    </li>
                </ul>
            </div>
            <div class="basic-mess" style="height:90px">
                <ul>
                    <li class="img gre">
                        <img src="../../../assets/basic-img/icon-mail-white.svg" alt="">
                    </li>
                    <li class="cen">绑定邮箱</li>
                    <li class="wh" style="width:148px">
                        {{basicData.email?basicData.email:'' | addStar}}
                        </li>
                     <li class="_text">
                    <span style="display:block;margin-bottom:-6px">绑定手机号码是您找回登录密码的方式之一</span>
                    <span>在绑定的手机号码无法接受短信时，通过邮箱找回密码，或修改登录手机密码</span>
                    </li>
                    <li style="float:right">
                        <div class="change">
                       <el-button :type="basicData.emailStatus==='1'?'primary':'success'" size="mini" @click="emailChange">{{basicData.emailStatus==='1'?'修改':'绑定'}}</el-button>
                       </div>
                    </li>
                </ul>
            </div>
            <!-- 修改姓名 -->
            <el-dialog
                append-to-body
                title="修改姓名"
                :visible.sync="nameVisible"
                class="dialog-main heightauto"
                top="10%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">
                <el-form ref="formDetail" :model="nameFrom" :rules="nameRules">
                  <el-form-item style="margin-top:0px;" prop="userName">
                      <div class="form-label required">姓名</div>
                      <el-input :rows="4" style="" v-model.trim="nameFrom.userName"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="nameVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveName">保存</el-button>
                </span>
         </el-dialog>
          <!-- 添加修改紧急联系方式 -->
            <el-dialog
                append-to-body
                :title="this.basicData.urgentPhone?'修改紧急联系方式':'添加紧急联系方式'"
                :visible.sync="urgentPhoneVisible"
                class="dialog-main heightauto"
                top="10%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">
                <el-form ref="contactWay" :model="contactWayFrom">
                  <el-form-item style="margin-top:0px;">
                      <div class="form-label required">紧急联系方式</div>
                      <el-input :rows="4" style="" v-model.trim="contactWayFrom.urgentPhone"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="urgentPhoneVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveUrgentPhone">保存</el-button>
                </span>
         </el-dialog>
            <!-- 修改个人简介 -->
            <el-dialog
                append-to-body
                :title="this.introStatus==1 ? '个人简介':''"
                :visible.sync="introVisible"
                class="dialog-main heightauto"
                top="10%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">
                <intro ref="introRef" v-if="introVisible" :coachIntro="coachIntro"></intro>
                <span slot="footer">
                    <el-button type="primary" @click="introSave">保存</el-button>
                </span>
         </el-dialog>
            <!-- 绑定微信 -->
             <el-dialog
                append-to-body
                :title="this.updateStatus==1 ? '绑定微信':''"
                :visible.sync="updateVisible"
                class="dialog-main heightauto"
                top="10%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">
                <span slot="footer">
                    <el-button type="primary">下一步</el-button>
                </span>
         </el-dialog>
         <!-- 修改登录密码 -->
         <el-dialog
                append-to-body
                :title="'修改密码'"
                :visible.sync="passwordVisible"
                class="dialog-main heightauto"
                top="5%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">

                <psw v-if="pswVisible" ref="psw"></psw>
                 <psw1 v-if="psw1Visible" :pswFirst="pswFirst" ref="psw1"></psw1>
                  <psw2 v-if="psw2Visible" ref="psw2"></psw2>
                <span slot="footer">
                    <el-button type="primary" @click="pswNext">{{this.next}}</el-button>
                </span>
         </el-dialog>
         <!-- 修改手机或邮箱 -->
         <el-dialog
                append-to-bodyreset
                :title="this.basicData.phoneStatus==='1'?'修改绑定手机':'绑定手机'"
                :visible.sync="bindPhonevisible"
                class="dialog-main heightauto"
                top="5%"
                width="400px"
                heigt="auto"
                destroy-on-close
                :close-on-click-modal="false">

                    <bindPhone v-if="phoneVisible" ref="phone"></bindPhone>
                    <bindPhone1 v-if="phoneVisible1" ref="phone1" :loginName="basicData.loginName"></bindPhone1>
                     <bindPhone2 v-if="phoneVisible2" ref="phone2"></bindPhone2>

                <span slot="footer">
                    <el-button type="primary" @click="PhoneNext">{{this.next}}</el-button>
                </span>
         </el-dialog>
         <!-- 绑定邮箱 -->
          <el-dialog
                append-to-bodyreset
                :title="this.basicData.emailStatus==='1'?'修改绑定邮箱':'绑定手机'"
                :visible.sync="updateVisible"
                class="dialog-main heightauto"
                top="5%"
                width="400px"
                destroy-on-close
                :close-on-click-modal="false">

                    <bindEmail v-if="emailVisible" ref="email"></bindEmail>
                    <bindEmail1 v-if="emailVisible1" ref="email1"></bindEmail1>
                    <bindEmail2 v-if="emailVisible2" ref="email2"></bindEmail2>
                <span slot="footer" >
                    <el-button type="primary" @click="emailNext">{{this.next}}</el-button>
                </span>
         </el-dialog>
    </div>
</template>
<script>
import personalPhoto from './personalPhoto'
import intro from './intro'
import psw from './changePsw'
import psw1 from './changePsw1'
import psw2 from './changePsw2'
import bindEmail from './bindEmail'
import bindEmail1 from './bindEmail1'
import bindEmail2 from './bindEmail2'
import bindPhone from './bindPhone'
import bindPhone1 from './bindPhone1'
import bindPhone2 from './bindPhone2'
import qrCode from './vxQrcode'
import { randomCode } from '@/utils/index'
import { baseRequest } from '@/api/base'

export default {

  created() {
    this.search()
  },
  components: {
    bindEmail,
    bindEmail1,
    bindEmail2,
    bindPhone,
    bindPhone1,
    bindPhone2,
    psw,
    psw1,
    psw2,
    qrCode,
    intro,
    personalPhoto
  },
  data() {
    return {
      nameVisible: false,
      nameFrom: {
        userName: ''
      },
      contactWayFrom: {
        urgentPhone: ''
      },
      urgentPhoneVisible: false,
      nameRules: {
        userName: [
          { required: true, message: '请输入姓名' },
          { max: 8, message: '姓名长度不能超过8位' }
        ]
      },
      pswFirst: {},
      emailFirst: {},
      introVisible: false,
      updateVisible: false,
      passwordVisible: false,
      bindPhonevisible: false,
      phoneVisible: false,
      phoneVisible1: false,
      phoneVisible2: false,
      emailVisible: false,
      emailVisible1: false,
      emailVisible2: false,
      introStatus: 0,
      upStatus: 0,
      pswStatus: 0,
      emailStatus: 0,
      pswVisible: false,
      psw1Visible: false,
      psw2Visible: false,
      disabled: false,
      phoneStatus: 0,
      updateStatus: 0,
      basicData: [],
      next: '下一步',
      kuan: '760px',
      applyFor: '申请',
      vanish: 0,
      coachIntro: ''
    }
  },
  filters: {
    addStar: function(str) {
      if (!str) return ''
      str = str.toString()
      return str.replace(str.substr(4, 4), '****')
    }
  },
  methods: {
    /**
     * 绑定微信
     */
    bindWechat() {
      const state = randomCode(20) + 'aibindingwci'
      localStorage.setItem('state', state)
      window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx76edc5993b3c35b4&redirect_uri=http%3a%2f%2fwww.raise-wisdom.com&response_type=code&scope=snsapi_login&state=' + state + '#wechat_redirect'
    },
    /**
     * 解绑微信
     */
    unbundlingWechat() {
      this.$confirm('确定解绑当前微信吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/user/userLogin/unbundWeChat').then(respone => {
          if (respone.data.item.result === 1) {
            this.search()
            this.$Message.success('微信解绑成功')
          } else {
            this.$Message.error('微信解绑失败')
          }
        })
      })
    },
    changeName() {
      this.nameFrom.userName = this.basicData.userName
      this.nameVisible = true
    },
    addUrgentPhone() {
      this.contactWayFrom.urgentPhone = this.basicData.urgentPhone
      this.urgentPhoneVisible = true
    },
    saveUrgentPhone() {
      baseRequest('/user/rwUser/completeInfo', { urgentPhone: this.contactWayFrom.urgentPhone }).then(_ => {
        this.urgentPhoneVisible = false
        this.search()
        // this.$store.dispatch('SetUserName', this.contactWayFrom.urgentPhone)
      })
    },
    saveName() {
    //  this.search()
      this.$refs.formDetail.validate((valid) => {
        if (valid) {
          baseRequest('/user/rwUser/completeInfo', { userName: this.nameFrom.userName }).then(_ => {
            this.nameVisible = false
            this.search()
            this.$store.dispatch('SetUserName', this.nameFrom.userName)
          })
        }
      })
    },
    introSave() {
      this.$refs.introRef.introSubmit(_ => {
        this.introVisible = false
        this.$Message.success('修改成功')
        this.introStatus = 0
        this.search()
      })
    },
    introChange() {
      this.coachIntro = this.basicData.coachIntro
      this.introVisible = true
      this.introStatus = 1
    },
    PhoneNext() {
      this.phoneStatus = 1
      this.bindPhonevisible = true
      if (this.phoneVisible) {
        this.$refs.phone.upData((_) => {
          this.phoneVisible = false
          this.phoneVisible1 = true
        })
      } else if (this.phoneVisible1) {
        this.$refs.phone1.upData((_) => {
          this.phoneVisible = false
          this.phoneVisible1 = false
          this.phoneVisible2 = true
          this.next = '完成'
          this.$refs.phone2.goGrdoupRecor()
          this.search()
        })
      } else if (this.phoneVisible2) {
        this.bindPhonevisible = false
        this.next = '下一步'
        this.phoneStatus = 0
      }
    },
    search() {
      baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
        this.basicData = response.data.item
      })
    },
    changePsw() {
      this.pswStatus = 1
      this.passwordVisible = true
      this.pswVisible = true
      this.psw1Visible = false
      this.psw2Visible = false
      this.next = '下一步'
    },
    bindPhone() {
      this.bindPhonevisible = true
      this.phoneVisible = true
      this.phoneVisible1 = false
      this.phoneVisible2 = false
      this.phoneStatus = 1
      this.next = '下一步'
    },
    emailChange() {
      this.updateStatus = 1
      this.updateVisible = true
      this.emailVisible = true
      this.emailVisible1 = false
      this.emailVisible2 = false
      this.next = '下一步'
    },
    emailNext() {
      this.updateStatus = 1
      this.updateVisible = true
      if (this.emailVisible) {
        this.$refs.email.upData((params) => {
          this.emailFirst = params
          this.emailVisible = false
          this.emailVisible1 = true
        })
      } else if (this.emailVisible1) {
        this.$refs.email1.upData((_) => {
          this.emailVisible = false
          this.emailVisible1 = false
          this.emailVisible2 = true
          this.next = '完成'
          this.search()
        })
      } else if (this.emailVisible2) {
        this.updateVisible = false
        this.updateStatus = 0
        this.next = '下一步'
      }
    },
    pswNext() {
      this.passwordVisible = true
      this.pswStatus = 1
      if (this.pswVisible) {
        this.$refs.psw.upData(params => {
          this.pswFirst = params
          this.pswVisible = false
          this.psw1Visible = true
        })
      } else if (this.psw1Visible) {
        this.$refs.psw1.upData(_ => {
          this.pswVisible = false
          this.psw1Visible = false
          this.psw2Visible = true
          this.next = '完成'
          this.$refs.psw2.goGrdoupRecor()
        })
      } else if (this.psw2Visible) {
        this.passwordVisible = false
        this.pswStatus = 0
        this.next = '下一步'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
*{
list-style: none;
}
      .bt-content{
        .active{
          display:none
        }
          padding:24px;
          margin-bottom:30px;
          h4{ margin-bottom:24px;  }
          .ceshi-box{
            display: flex;
            justify-content: space-around;
          }
          .basic-mess{
            .ceshiDiv{
              float: left;
              display: flex;
              justify-content: space-around;
              ._text{
                  margin-left:160px;
                  font-size:14px;
                  color:#888888;
                  font-family: PingFangSC-Semibold;
                  p{
                    line-height: 30px;
                  }
                }
            }
                padding-left:14px;
                padding-top:16px;
                min-height: 60px;
                line-height: 60px;
                border: 1px solid #dddddd;
                width: 1392px;
                background-color: #fff;
                border-radius: 4px;
                margin-bottom:16px;
                padding-right:14px;
                ul li{
                    float: left;
                    line-height: 30px;  
                    }
                ._text{
                  margin-left:160px;
                  font-size:14px;
                  color:#888888;
                  font-family: PingFangSC-Semibold;
                }
                .wh{color: #222222;font-size:14px;font-family: PingFangSC-Semibold;}
                .img{
                    width:30px;
                    margin-right:14px;
                    background-color: #ccefff;
                    border-radius: 4px;
                    text-align: center;
                }
                .gre{background-color: #04ae0f;}
                .cen{
                    width:182px;
                    text-align: left;   
                    color: #555555;
                    font-size:14px;
                    font-family: PingFingSC-Regular;
                    }
                }       
}
</style>