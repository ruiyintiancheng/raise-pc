<template>
  <div class="footer">
      Copyright © 2020北京睿思智得顾问有限公司<span class="spilt-scar">|</span><a href="https://beian.miit.gov.cn/" target="_blank">京ICP备2020034839号</a>
      <span class="spilt-scar">|</span><a href="http://www.raise-wisdom.com/media/licence.pdf" target="_blank">ICP认证：京B2-20203367</a>
      <span class="spilt-scar">|</span><svg-icon icon-class="beian"></svg-icon >
      <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502042524" target="_blank"> 京公网安备 11010502042524号</a>  
      <router-link to="/privacy">隐私政策</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .footer{
        min-width: 1440px;
        height:40px;
        line-height: 40px;
        width:100%;
        margin:0 auto;
        font-size:12px;
        color:#ffffff;
        font-family: PingFangSC-Regular;
        background-color: #222222;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        // a{
            // text-decoration: underline;
        // }
        a:hover {
            color: #fff;
            text-decoration: none;
            // background: #37a;
        }
        .spilt-scar{
            margin:0 6px;
        }
    }
</style>