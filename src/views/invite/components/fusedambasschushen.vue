<template>  
  <div class="next-step">
      <div style="height:136px" class="success">
        <ul>
            <li style="margin-bottom:50px">
                <img src="../../../assets/basic-img/icon-success.svg" alt="">
            </li>
            <li><span>教练初审已通过</span></li>
            <!-- <li><span>我们会在申请后三个工作日内联系您！</span></li> -->
            <!-- <li><span>申请未通过在半年后可再次申请！</span></li> -->
        </ul>
        </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
export default {
  data() {
    return {
      psdData: {}
    }
  },
  methods: {
  },
  created() {
    baseRequest('/user/rwUser/getPersonalUserInfo').then(response => {
      this.psdData = response.data.item
      this.loading = false
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