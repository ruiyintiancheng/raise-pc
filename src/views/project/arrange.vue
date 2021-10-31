<template>
    <div class="arrange">
            <div class="order-content inside-container">
                <div class="title ">
                    <ul class="clearfix">
                        <li class="icon-liucheng">
                            <img src="../../assets/shouye-img/icon-liucheng-blue.svg" alt="">
                        </li>
                        <li class="first-step">
                            <span>核心辅导项目·First Step —— 项目安排</span>
                        </li>
                    </ul>
                </div>
                <div class="details">
                    <a @click="$router.push({name:'firstStep'})">First Step详情</a>
                </div>
                <div class="a-content">
                    <table class="arrange-table">
                        <thead>
                            <tr>
                                <th rowspan="2">日期</th>
                                <th rowspan="2" style="width:465px;">学习内容</th>
                                <th colspan="4">学习形式</th>
                            </tr>
                            <tr>
                                <th>听&读学习</th>
                                <th>评估&反思</th>
                                <th>目标规划实践</th>
                                <th>教练辅导</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>第1周</td>
                                <td>
                                    <p>● 学习改变的核心理念</p>
                                    <p>● 清晰洞见痛点和挑战</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>第2周</td>
                                <td>
                                    <p>● 学习为期望的改变设定目标</p>
                                    <p>● 学习将笼统目标转换为S.M.A.R.T.的目标</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-kecheng" />小组辅导</div>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-jiaolian2" />一对一辅导</div>
                                </td>
                            </tr>
                            <tr>
                                <td>第3周</td>
                                <td>
                                    <p>● 学习制定可落地的目标行动计划，与周目标/日计划建立关联</p>
                                    <p>● 学习周目标/日计划/31日追踪表的使用</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>第4周</td>
                                <td>
                                    <p>● 学习“生命之轮”，认知全方位人生的各个领域</p>
                                    <p>● 学习规划月度目标，平衡规划个人生活和工作</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>第5周</td>
                                <td>
                                    <p>● 学习系统化全方位地管理工作和生活各领域的目标</p>
                                    <p>● 学习使用完整的目标规划·SP系统</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-shouce" />目标规划·SP</div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>第6周</td>
                                <td>
                                    <p>● 回顾整体学习内容</p>
                                    <p>● 为新的改变制定持续成长的目标</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-shouce" />目标规划·SP</div>
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-kecheng" />小组辅导</div>
                                </td>
                            </tr>
                            <tr>
                                <td>第7周~6个月</td>
                                <td>
                                    <p>间隔重复复习学习资料、</p>
                                    <p>不断迭代进步</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-shouce" />目标规划·SP</div>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>第7个月~1年</td>
                                <td>
                                    <p>结束FirstStep学习，</p>
                                    <p>持续自我成长</p>
                                </td>
                                <td>
                                    <svg-icon class="arrange-table-icon" icon-class="icon-dg" />
                                </td>
                                <td>
                                </td>
                                <td>
                                    <div class="arrange-table-item"><svg-icon icon-class="icon-shouce" />目标规划·SP</div>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="content-bottom ">
                    <ul class="clearfix">
                        <!-- <li class="icon-anpai">
                            <img src="../../assets/shouye-img/icon-liucheng.svg" alt="">
                        </li> -->
                        <!-- <li class="first-step1">
                            <a @click="$router.push({name:'order'})">First Step辅导项目流程</a>
                        </li> -->
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
$tdWidth:240px;
    .arrange{
        background: #fff;
        padding:60px 0;
        .order-content{
            .content-bottom{
                margin:0 auto;
                // width: 1440px;
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
                    width: 195px;
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
            .a-content{
                margin:60px 0;
                .arrange-table{
                    border: solid 1px #dddddd;
                    border-radius: 10px;
                        border-spacing: 0;
                        overflow: hidden;
                    thead{
                        background-color: #fafafa;
                        tr{
                            height: 44px;
                            line-height: 44px;
                            text-align: center;
                            th{
                                border-right: 1px solid #dddddd;
                                border-bottom: 1px solid #dddddd;

                                width: $tdWidth;
                                &:last-child{
                                    border-right: none;
                                }
                            }
                        }
                    }
                    tbody{
                        tr{
                            td{
                                padding: 24px;
                                text-align: center;
                                border-right: 1px solid #dddddd;
                                border-bottom: 1px solid #dddddd;
                                // width: $tdWidth;
                                &:last-child{
                                    border-right: none;
                                }
                                &:first-child{
                                   background-color: #fafafa;
                                   font-weight: bold;
                                }
                                p{
                                    line-height: 24px;
                                    text-align: left;
                                }
                                .arrange-table-icon{
                                    font-size: 26px;
                                }
                                .arrange-table-item{
                                    text-align: left;
                                    margin-top: 18px;
                                    &:first-child{
                                        margin-top: 0px;
                                    }
                                    .svg-icon{
                                        margin-right: 12px;
                                        color: #00afff;
                                    }
                                }
                            }
                            &:last-child{
                                td{
                                    border-bottom: none;
                                }
                            }
                        }
                    }
                }
            }
            .line {
                margin:0 auto;
                width: 1440px;
                height: 1px;
                background-color: #dddddd;
            }
            position: relative;
            .details{
                width: 124px;
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
                right:0px;
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
                    width: 435px;
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