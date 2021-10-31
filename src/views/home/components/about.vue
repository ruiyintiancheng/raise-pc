<template>
    <div class="home-about">
            <div class="about-us clearfix">
                <div class="about-title">
                    <ul>
                    <li style="padding-top:3px"><img src="../../../assets/shouye-img/icon-guanyu.svg" alt=""></li>
                    <li><span class="titlePro">联系我们</span></li>
                    </ul>
                </div>
                <div class="line"></div>
                <ul class="co-info-box">
                    <li class="info-item">
                        <img src="../../../assets/images/icon-dh.svg" alt="">
                        联系电话：010-84802362
                    </li>
                    <li class="info-item">
                        <img src="../../../assets/images/icon-dz.svg" alt="">
                        公司地址：北京市朝阳区安立路56号1号楼710室
                    </li>
                    <li class="info-item">
                        <img src="../../../assets/images/icon-yx.svg" alt="">
                        公司邮箱：raisewisdom@163.com
                    </li>
                    <li class="info-item">
                        <img src="../../../assets/images/icon-wx.svg" alt="">
                        微信客服助手：
                         <el-popover
                                placement="bottom"
                                width="190"
                                trigger="click"
                               >
                                <div class="zhushou">
                                    <div class="zhushou-title">如有问题请添加小睿微信在线咨询</div>
                                    <img :src="baseUrl+'media/zhushou.jpg'" alt="">
                                </div>
                                <a slot="reference" class="name-highlight">小睿（睿思智得客服）</a>
                            </el-popover>
                    </li>
                </ul>
                <div class="qr-img-box">
                    <div class="qr-img">
                        <img :src="baseUrl+'media/raisegzh.jpg'" alt="" style="width:100%;" />
                    </div>
                    <div class="qr-ts">微信公众号</div>
                </div>
                <div class="qr-img-box">
                        <div class="qr-img">
                        <!-- <img src="../../../assets/shouye-img/raisegzh.jpg" alt="" style="width:100%;" /> -->
                        <vue-qr style="width:100%;" text="http://www.raise-wisdom.com/download/appDownload/"  :size="330"  ref="Qrcode2" ></vue-qr>
                    </div>
                    <div class="qr-ts">APP下载</div>
                </div>
            </div>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  components: { VueQr },
  computed: {
    baseUrl() {
      let baseUrl = ''
      if (process.env.BASE_API.startsWith('https://www.raise-wisdom.com')) {
        // 生产
        baseUrl = 'https://www.raise-wisdom.com/'
      } else {
        // 测试
        baseUrl = 'http://www.fascte.cn:9201/'
      }
      return baseUrl
    }
  }
}
</script>
<style lang="scss" scoped>
.zhushou{
    text-align: center;
     .zhushou-title{
         font-size: 14px;
     }
     img{
         width: 170px;
         display: block;
         margin: 0 auto;
     }
}
</style>
<style lang="scss" scoped>
    .home-about{
        padding:80px 0;
        .fl{
            float: left;
        }
        .about-us{
            position: relative;
            .co-info-box{
                width: 700px;
                height: 360px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #dddddd;
                float: left;
                padding: 30px;
                .info-item{
                    height: 60px;
                    line-height: 61px;
                    background-color: #E5F7FF;
                    border-radius: 10px;
                    font-size: 18px;
                    padding-left: 90px;
                    position: relative;
                    margin-bottom: 20px;
                    img{
                        position: absolute;
                        height: 30px;
                        width: 30px;
                        top: 15px;
                        left: 30px;
                    }
                }
            }



            .wenzi{
                // position: absolute;
                margin-top: 120px;
                left: 600px;
                top: 302px;
                width: 453px;
                /* height: 206px; */
                float: left;
                margin-left: 15px;
                .name-highlight{
                    color: #00afff;
                }
            }
            .name-highlight{
                    color: #00afff;
                }
            .lianxi{
                margin-bottom:24px
            }
           .lianxi ul:nth-child(1){
               width: 40px;
               height: 40px;
               background-color: #ccefff;
               border-radius: 40px;
               text-align: center;
               padding-top:12px;
               float: left;
               margin-right:16px
           }
           .lianxi ul:nth-child(2) { 
               height: 40px;line-height: 40px;font-size: 16px;font-family: PingFangSC-Regular;color:#222222
            }
            .about-p{     
                width: 580px;
                height: 17px;
                font-family: PingFangSC-Semibold;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #222222;
            }
            .qr-img-box{
                float: left;
                margin-left: 86px;
                margin-top: 30px;

            }
      
            .qr-img{ 
                // position: absolute;
                // top:250px;
                // right:0px;    
                position: relative;
                

                width: 264px;
                height: 264px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #dddddd;
                overflow: hidden;
            }
            .qr-ts{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    letter-spacing: 0px;
                    color: #222222;
                    margin-top:20px;
                    text-align: center;
            }
            .image{
                margin-top:90px;
                // width: 526px;
                height: 300px;
                float: left;
            }
            .line {
                width: 196px;
                height: 4px;
                background-color: #00afff;
                margin-bottom:30px;
                    }
            .about-title{
                    width: 441px;
                    height: 60px; 
                    
                ul li{
                        float: left;
                        height:46px;
                        line-height: 46px;
                    }
                    ul li:nth-child(1){
                        margin-right:14px;
                        height:46px;
                        line-height: 46px;
                    }
                    ul li:nth-child(2){
                        margin-right:20px;
                        font-family: PingFangSC-Semibold;
                        font-size: 24px;
                        color: #222222;
                        height:46px;
                        line-height: 46px;
                    }
                    ul li:nth-child(3){
                        font-size: PingFangSC-Regular;
                        font-size: 24px;
                        color: #222222;
                        height:46px;
                        line-height: 46px;
                    }
                }
        }
    }
</style>