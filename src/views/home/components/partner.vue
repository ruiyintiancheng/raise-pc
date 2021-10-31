<template>
    <div class="partner">
            <div class="hz-partner inside-container">
                 <div class="partner-title clearfix">
                    <ul>
                    <li style="padding-top:3px"><img src="../../../assets/shouye-img/icon-huoban.svg" alt=""></li>
                    <li><span class="titlePro">合作伙伴</span></li>
                    </ul>
                </div>
                <div class="line"></div>
                <div class="clearfix">
                    <div class="LMI-bg" @click="urlJump('http://www.lmi-china.com')">
                        <div class="LMI-img">
                            <img src="../../../assets/shouye-img/logo-lmi.png" alt="" width=234px />
                        </div>
                        <div class="LMI-qr">
                            <img src="../../../assets/shouye-img/qr-lmi_03.gif" alt="" width=200px />
                        </div>
                    </div>
                    <div class="xian"></div>
                    <div class="learn-bg" @click="urlJump('https://luminalearning.com/zh/')">
                        <div class="learn-img">
                            <img src="../../../assets/shouye-img/logo-ll.png" alt="" width=304px />
                        </div>
                        <div class="learn-qr">
                            <img src="../../../assets/shouye-img/qr-learn.gif" alt="" width=200px />
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
    
        }
      },
      methods: {
        urlJump(url) {
          window.open(url)
        }
      }
    }
</script>

<style lang="scss" scoped>
    .partner{
        background-color: #f6f7f8;
        .hz-partner{
            padding: 80px 0 50px;
            .learn-bg {
                float: right;
                width: 640px;
                height: 288px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #dddddd;
                cursor: pointer;
                .learn-img{
                    float: left;
                    margin:75px 0 75px 40px;
                    width: 304px;
                    height: 138px;
                }
                .learn-qr{
                    margin:30px 30px 30px 0;    
                    float:right;
                    width: 224px;
                    height: 224px;
                    background-color: #ffffff;
                    box-shadow: 0px 2px 10px 0px 
                        rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                    border: solid 1px #eeeeee;
                    padding:11px
                }
            }
            .xian{
                margin-top:-25px;
                float: left;
                width: 1px;
                height: 348px;
                border-left: solid 1px #dddddd;
            }
            .LMI-bg {
                float: left;
                margin-right:79px;
                width: 640px;
                height: 288px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #dddddd;
                cursor: pointer;
                .LMI-img{
                    float: left;
                    width: 234px;
	                height: 160px;
                    margin:64px 0 64px 64px;
                }
                .LMI-qr{
                margin:30px 30px 30px 0;    
                padding:12px;
                float: right;
                width: 224px;
                height: 224px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #eeeeee;
                }
            }
            .line {
                width: 196px;
                height: 4px;
                background-color: #00afff;
                margin-bottom:30px;
                    }
            .partner-title{
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