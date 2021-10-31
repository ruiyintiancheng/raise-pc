<template>
    <div class="kernel">
            <div class="coach">
                <div class="img-title">
                    <ul class="clearfix">
                    <li style="padding-top:3px"><img src="../../../assets/shouye-img/icon-hexin.svg" alt=""></li>
                    <li><span class="titlePro">核心辅导项目</span></li>
                    <li>First Step迈出第一步</li>
                    </ul>
                </div>
                <div class="line"></div>
                <p class="firstStep">First Step迈出第一步辅导项目，将帮助您清晰洞见生活和工作中的痛点、挑战，通过设定应对挑战的目标，指导您学习规划目标、制定目标计划，最终实现所设定的目标。</p>
                <p class="firstStep last">First Step项目 ——六周3～4人小组辅导项目</p>
                <ul>
                <li class="text-p clearfix">
                    <div class="dot"></div>
                    <span class="cushi">促使改变真正发生</span>
                </li>
                <li class="text-p clearfix">
                    <div class="dot"></div>
                    <span class="cushi">全方位规划你的目标</span>
                </li>
                <li class="text-p clearfix">
                    <div class="dot"></div>
                    <span class="cushi">专业教练支持和陪伴</span>
                </li>
                </ul>
                <div class="image">
                    <img src="../../../assets/shouye-img/jiangbei.png" alt=""  />
                </div>
                <div class="details">
                    <router-link to="/course/firstStep">查看更多 >></router-link>
                </div>
            </div>
            <div class="classic">
                <div class="classic-title">
                    <ul class="clearfix">
                    <li style="padding-top:3px"><img src="../../../assets/shouye-img/icon-jingdian.svg" alt=""></li>
                    <li><span class="titlePro">经典在线工具</span></li>
                    <li>目标规划·SP</li>
                    </ul>
                </div>
                <div class="line"></div>
                <p class="sp-lmi">目标规划·SP是LMI（Leadership Management International）经典的目标管理工具的线上版。</p>
                <ul>
                <li class="text-p">
                    <div class="dot"></div>
                    <span class="cushi">帮助您管理规划目标，逐步的实现对你有价值的、预先设定的、个人的目标</span>
                </li>
                <li class="text-p">
                    <div class="dot"></div>
                    <span class="cushi">帮助您把行动落实在每天、每周、每月，一步步贴近目标</span>
                </li>
                <li class="text-p">
                    <div class="dot"></div>
                    <span class="cushi">管理您工作和生活的目标，包括你未来的事业领域拓展</span>
                </li>
                </ul>
                <div class="pic">
                    <img src="../../../assets/shouye-img/9d2a30f56e68cf4d219e4347247f653.png" alt="" width=334px height=360px />
                </div>
                <div class="details">
                    <router-link to="/course/sp">查看更多 >></router-link>
              </div>
            </div>
            
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
    .kernel{
        background-color: #ffffff;
        overflow: hidden;
        position: relative;
        height:900px;
        // padding:0 80px;
        .coach{ 
            // background-color: red;
            .details{
            margin-top:65px;
            margin-left:520px;
            font-size: 18px;
            font-family: PingFangSC-Sembibold;
            color: #00afff;
          }
            border-right: 1px solid #dddddd;
            width: 720px;
            height: 900px;
            position: absolute;
            top:0;
            left:0;
            .image{
                margin-top:60px;
                margin-left:24px;
                width: 334px;
                height: 360px;
            }
            .text-p{
                height: 30px;
                line-height: 30px;
                .dot {
                    width: 12px;
                    height: 12px;
                    margin:8px 14px;
                    background-color: #00afff;
                    border-radius: 6px;
                    float: left;
                    }
                .cushi{
                    display: block;
                    float: left;
                    font-family: PingFangSC-Semibold;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #222222;
                }
            }
            .firstStep{
                margin-top:30px;
                width:703px;
                line-height:30px;
                font-size:16px;
                &.last{
                    margin-top:0px;
                    margin-bottom: 30px;
                }
            }
            .line {
                    width: 196px;
                    height: 4px;
                    background-color: #00afff;
                }
            .img-title{
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
        .classic{
            position: absolute;
            top:0;
            right:0;
            // background-color: blue;
            .pic {
                margin-top:60px;
                margin-left:24px;
                width:334px;
                height:360px;
            }
            .details{
            margin-left:500px;
            margin-top:65px;
            font-size: 18px;
            font-family: PingFangSC-Sembibold;
            color: #00afff;
          }
            .text-p{
                height: 30px;
                line-height: 30px;
                .dot {
                    width: 12px;
                    height: 12px;
                    margin:8px 14px;
                    background-color: #00afff;
                    border-radius: 6px;
                    float: left;
                    }
                .cushi{
                    display: block;
                    float: left;
                    width: 600px;
                    font-family: PingFangSC-Semibold;
                    font-size: 16px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #222222;
                }
            }
            .sp-lmi {
                margin-top:30px;
                margin-bottom:50px;
                width: 641px;
                height: 77px;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #222222;
            }
            
            .line {
                    width: 196px;
                    height: 4px;
                    background-color: #00afff;
                }
            .classic-title{
                // width: 441px;
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