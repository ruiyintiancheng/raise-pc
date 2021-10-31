<template>
    <div class="order">
            <div class="order-content inside-container">
                <div class="title ">
                    <ul class="clearfix">
                        <li class="icon-liucheng">
                            <img src="../../assets/shouye-img/icon-liucheng-blue.svg" alt="">
                        </li>
                        <li class="first-step">
                            <span>核心辅导项目·First Step —— 项目流程</span>
                        </li>
                    </ul>
                </div>
                <div class="details">
                     <a @click="$router.push({name:'firstStep'})">First Step详情</a>
                </div>
                <div class="line"></div>
                <div class="image">
                    <img src="../../assets/shouye-img/132项目流程_03_03.gif" alt="">
                </div>
                <div class="line" style="margin-bottom:50px"></div>
                <div class="content-bottom ">
                    <ul class="clearfix">
                        <li class="icon-anpai">
                            <img src="../../assets/shouye-img/icon-anpai.svg" alt="">
                        </li>
                        <li class="first-step1">
                            <a @click="$router.push({name:'arrange'})">First Step辅导项目安排</a>
                        </li>
                        <li class="buy">
                            <FsBuy />
                            <!-- <el-button type="primary" style="width:98px;height:36px"  @click="$router.push({name:'firstStep-buy'})">立即购买</el-button> -->
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>
  import FsBuy from './fs-buy.vue'
export default {
    components: {
      FsBuy
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="scss" scoped>
    .order{
        background: #fff;
        padding:60px 0;
        .order-content{
            .content-bottom{
                margin:0 auto;
                width: 1392px;
                height: 70px;
                ul li{
                    float: left;
                }
                .icon-anpai {
                    width: 24px;
                    height: 24px;
                    margin-right:14px;
                }
                .first-step1 {
                    width: 210px;
                    height: 20px;
                    font-family: PingFangSC-Semibold;
                    text-decoration: underline;
                    font-size: 18px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 30px;
                    letter-spacing: 0px;
                    color: #00afff;
                }
                .buy{
                    float: right;
                }
            }
            .image{
                margin:60px 0;
            }
            .line {
                margin:0 auto;
                width: 1392px;
                height: 1px;
                background-color: #dddddd;
            }
            position: relative;
            .details{
                width: 130px;
                height: 20px;
                font-family: PingFangSC-Semibold;
                text-decoration: underline;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 30px;
                letter-spacing: 0px;
                color: #00afff;
                position: absolute;
                top:24px;
                right:20px;
            }
            .title {
                margin:40px auto;
                width: 500px;
                height: 48px;
                border-bottom:4px solid #00afff;
                .icon-liucheng {
                    float: left;
                    width: 24px;
                    height: 24px;
                    margin-right:13px;
                    margin-left:18px;
                }
                .first-step {
                    float: left;
                    width: 443px;
                    height: 25px;
                    font-family: PingFangSC-Semibold;
                    font-size: 24px;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 46px;
                    letter-spacing: 0px;
                    color: #222222;
                    margin-top:-12px;
                }
            }
        }
    }
</style>