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
       <form action="" :v-model="vxData">
      <div class="phoneNum">
          <h5>手机号码</h5>
            <input type="text" placeholder="15010241234" disabled="true">
      </div>
      <div class="yzm">
          <h5>验证码</h5>
          <ul>
              <li><input type="text" placeholder="请输入验证码" value=""></li>
              <li>
              <span v-show="show" @click="getCode">获取验证码</span>
              <span v-show="!show" class="count">{{count}}s后可重新发送</span>
              </li>
          </ul>
      </div>
      </form>
      <div style="border:1px dashed #aaaaaa; margin:20px 0"></div>
      <div class="last">
          <h5>没有收到验证码吗？</h5>
         <ol>
             <li>网络通信异常可能会造成短信丢失，请重新获取。</li>
             <li>请核实手机是否欠费停机，或屏蔽了系统信息。</li>
             <li>如果手机已丢失或停用，请联系平台客服。</li>
             <li>您也可以尝试将SIM卡移动到另一部手机，然后重试。</li>
         </ol>
      </div>
      <div style="border:1px dashed #aaaaaa; margin:20px 0"></div>
     
  </div>
</template>

<script>
export default {
  data() {
    return {
      vxData: [],
      show: true,
      count: '',
      timer: null

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
    }
  }
}
</script>

<style lang="scss" scoped>
       .next-step{
           padding:30px 0;
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
              .phoneNum{
                  margin:20px 0;
                  padding-top:20px;
                  border-top:1px dashed #aaaaaa;
                  h5{margin-bottom:6px}
                  input {
                      width: 340px;
                      height: 50px;
                      line-height: 50px;
                      padding-left:18px;
                      background-color: #f0f0f0;
                      border-radius: 4px;
                      border: 1px solid #dddddd;
                      font-size: 16px;
                      color: #222222;
                      font-family: 'PingFangSC-Semibold';
                  }

              }
              .yzm{
                  height:70px;
                  h5{margin-bottom:6px}
                  ul li:nth-child(1){float: left;
                  input{
                      width:200px;
                      height: 50px;
                      line-height: 50px;
                      background-color: #fafafa;
                      border-radius: 4px;
                      border: 1px solid #dddddd;
                      margin-right:18px;
                      padding-left:18px;
                      color:#dddddd;
                      
                  }}
                  ul li:nth-child(2){ float: left;
                      span{
                      width:122px;
                      height: 50px;
                      line-height: 50px;
                      display: block;
                      background-color: #ffffff;
                      border-radius: 4px;
                      border: 1px solid #00afff;
                      color:#00afff;
                      text-align: center;
                     
                  }}
              }
              .last{
                  padding:14px 18px;
                  width: 340px;
                  height: 130px;
                  background-color: #fbf8eb;
                  border-radius: 4px;
                  border: 1px solid #dfd0a3;
                  h5{margin-bottom:10px}
                  ol li{
                      font-size:12px;
                      color: #222222;
                  }
              }
       }
</style>