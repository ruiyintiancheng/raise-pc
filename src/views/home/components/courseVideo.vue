<template>
    <div class="home-about2 ">
            <div class="about-us inside-container">
                <div class="about-title">
                    <ul>
                    <li style="padding-top:3px">
                        <div class="img-box">
                            <img src="../../../assets/shouye-img/icon-dengpao.svg" alt="">
                        </div>
                    </li>
                    <li><span class="titlePro">特色课程</span></li>
                    </ul>
                </div>
                <div class="line"></div>
                <div class="clearfix" style="">
                    <div class="image">
                        <video ref="learnVideo" :poster="poster" oncontextmenu="return false;" :autoplay="false"  controls  controlslist="nodownload" name="media" width="100%"  class="course-video">
                            <source :src="videoUrl" >
                        </video>
                    </div>
                    <div class="wenzi">
                        <div class="wenzi-title">拥有自主的精彩人生</div>
                        <p><span class="wenzi-title-point"></span> 不想要一成不变的工作和生活，可是又不知道该如何改变？不想将就过一辈子，可是又不确定能否与平庸抗争到底？</p>
                        <p><span class="wenzi-title-point"></span>如果我们都能更早地开始认识和了解自己，更早地去思考自己长远的规划并为之努力，我们的人生之舟就能更坚定地朝着目的地前进，即使遇到惊涛骇浪也能坚定地扬帆起航！</p>
                        <p><span class="wenzi-title-point"></span> First Step ，帮您找到适合自己的目标，理清挑战，通过系统的规划和学习实践，为工作和生活带来意想不到的改变！</p>
                        <p style="color:#00afff;"><i>以梦为马，迈开脚步，精彩人生，始于足下！</i></p>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import VueQr from 'vue-qr'
import poster from '@/assets/images/indexJie.png'
export default {
  components: { VueQr },
  props: {
    videoUrl: String
  },
  data() {
    return {
      poster
    }
  }
}
</script>

<style lang="scss" scoped>
    .home-about2{
        background-color: #f6f7f8;
        .img-box{
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: 14px;
            img{
                width: 40px;
                height: 40px;
            }
        }
        .about-us{
            padding: 80px 0;
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
      
            .qr-img{ 
                // position: absolute;
                float: right;
                // top:250px;
                // right:0px;    
                width: 224px;
                height: 224px;
                background-color: #ffffff;
                box-shadow: 0px 2px 10px 0px 
                    rgba(0, 0, 0, 0.1);
                border-radius: 10px;
                border: solid 1px #dddddd;
                margin-top: 100px;
                position: relative;
                .qr-ts{
                    position: absolute;
                    bottom: -20px;
                    height: 14px;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 36px;
                    letter-spacing: 0px;
                    color: #222222;
                    margin-top:20px;
                    margin-left:73px;
                }
            }
            .image{
                // width: 526px;
                // height: 300px;
                float: left;
                width: 678px;
                height: 390px;
                border-radius: 10px;
                overflow: hidden;

                .course-video{
                    width: 100%;
                    height: 100%;
                }
                // padding-right: 50px;
            }
            .wenzi{
                width: 633px;
                border-radius: 10px;
        //         box-shadow: 0px 2px 10px 0px 
		// rgba(0, 0, 0, 0.1);
                overflow: auto;
                float: right;
                padding: 8px;
                font-size: 16px;
                .wenzi-title{
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 30px;
                }
                .wenzi-title-point{
                        width: 12px;
                        height: 12px;
                        background-color: #00afff;
                        border-radius: 6px;
                        display: inline-block;
                        margin-right: 14px;
                    }
                p{
                    line-height: 27px;
                    margin-bottom: 30px;
                }
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