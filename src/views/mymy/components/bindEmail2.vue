<template>  
  <div class="next-step">
     
      <div class="step-top">
          <ul>
              <li style="">
                  <img src="../../../assets/basic-img/icon-1-gray.svg" alt="">
                  <span style="display:block">验证身份</span>
              </li>
              <li style="margin:0 20px;">
                  <img src="../../../assets/basic-img/icon-2-gray.svg" alt="">
                  <span style="display:block">设定密码</span>
              </li>
              <li style="color:#00afff">
                  <img src="../../../assets/basic-img/icon-3.svg" alt="">
                  <span style="display:block">完成</span>
              </li>
          </ul>
      </div>
      <div style="border-top:1px dashed #aaaaaa; margin-top:20px"></div>
      <div style="height:136px" class="success">
        <ul>
            <li style="margin-bottom:50px">
                <img src="../../../assets/basic-img/icon-success.svg" alt="">
            </li>
            <li><span>您的邮箱修改成功</span></li>
            <!-- <li><span>wang****@126.com</span></li> -->
        </ul>
        </div>
      <div style="border-top:1px dashed #aaaaaa;"></div>
  </div>
</template>

<script>
// import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      pswdata: {}
    }
  },
  methods: {
  },
  created() {
    // baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
    //   this.psdData = response.data.item
    //   this.loading = false
    //   this.phoneNum = response.data.item.loginName
    // })
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
              .success{
                 margin:100px 0;
                  width: 340px;
                  ul li{
                      width:340px;
                      margin-bottom:12px;
                      height:15px;
                      text-align: center;
                      font-size:16px;
                      font-family: PingFangSC-Semibold;
                      color: #222222;

                  }
              }
       }
</style>