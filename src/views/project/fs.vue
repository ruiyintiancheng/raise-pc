<template>
    <div class="project-fs">
        <div class="fs-header">
            <div class="inside-container clearfix">
                <div class="fs-img">
                    <img :src="projectfs" alt="">
                </div>
                 <div class="fs-article">
                     <div class="fs-article-header">
                        <div class="fs-article-item">
                            <svg-icon icon-class="icon-hexin" class="icon-hexin"></svg-icon>核心辅导项目
                        </div>
                        <div class="fs-article-item second-item">
                            First Step迈出第一步
                        </div>
                     </div>
                    <p class="article-introduction">
                        First Step迈出第一步辅导项目，通过六周的学习，包含2次小组辅导，1次一对一辅导，将帮助您清晰洞见生活和工作中的痛点、挑战，通过设定应对挑战的目标为起点，指导您学习规划目标、制定目标计划，最终实现所设定的目标。专业的学习资料、实践工具、辅导流程、资深的专业教练指导、快捷完善的技术平台，支持您运用多感官的学习方式，体验从认知、反思、实践、到最终取得成果，助力您自主培养出略胜一筹的思维习惯与自我驱动的行动改变。
                    </p>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>促使改变真正发生
                        </div>
                        <div class="article-detail-content">
                            如果你以同样的方式思考和行动，你将得到同样的结果。FirstStep的整个辅导流程设计以促动学员发生改变为目的，结合工作生活持续自我觉察和反思，通过多感官学习方式与教练辅导，将反思落实到行动，最终得到期望的结果，并最终达到知行合一。
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>全方位规划你的目标
                        </div>
                        <div class="article-detail-content">
                            First Step 引进LMI（美国领导力管理发展中心）保罗•麦尔为达成目标而设计的“目标规划系统”，这套经典的工具体系将帮助你把学习到的理论应用到实践中，全面、结构化的管理自己人生各领域、各阶段的目标。
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>专业教练支持和陪伴
                        </div>
                        <div class="article-detail-content">
                            专业教练支持每个个体持续不断的自我发展，通过小组辅导和一对一个人辅导，帮助和陪伴你脚踏实地实现自我目标、逐步贴近梦想。
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <!-- <span class="article-detail-point"></span>专业教练支持和陪伴 -->
                        </div>
                        <div class="article-detail-content ">
                            <p class="detail-title tuchu">优惠活动：</p>
                            <!-- <p>自2021年3月1日起,<b class="tuchu">直降100元！免费使用</b>目标规划·SP系统延长使用至1年！</p> -->
                            <!-- <p>● 购买First Step辅导项目，直降100元！目标规划·SP系统延长使用至1年！</p> -->
                            <!-- <p> 3人拼团购买First Step辅导项目，每人<b class="tuchu">直降300元！</b></p>
                            <p> 4人拼团购买First Step辅导项目，每人<b class="tuchu">直降400元！</b></p> -->
                            <p>自2021年7月1日起，<b class="tuchu">免费使用</b>目标规划·SP系统延长至1年。</p>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="article-buy-price">
                            <span v-if="Number(price)<2980">
                                <span class="article-buy-old">
                                    ￥2980
                                </span>
                                ￥{{price}}
                            </span>
                            <span v-else>
                                ￥{{price}}
                            </span>
                        </div>
                        <div class="article-buy-btn">
                                 <FsBuy />
                        </div>
                    </div>
                    <div class="article-tip">
                        特别提示：本项目含两次固定时间的小组辅导，请务必购买时选择匹配的“辅导时间”；因新的辅导时间会陆续开放，如暂无适合时间，可点击“无合适时间”按钮，点击“提交订单”确认支付、完成购买流程。  之后您可以在“我的项目”栏下“学员项目”查看到你的辅导项目；或在“个人信息”的“购买历史”查看订单状态。
                    </div>
                </div>
            </div>
        </div>
        <div class="fs-options">
            <div class="inside-container">
                <div class="fs-item item-left">
                    <img class="fs-item-img" :src="mubiao">
                    <div class="fs-item-content">
                        <div class="fs-item-title">项目目标</div>
                        <div class="fs-item-text">
                            <p>针对期待持续成长、想要突破自我、获得更大成就的所有人士。通过本辅导项目可以达成：</p>
                            <p><b>● 解决工作和生活的挑战、促使改变真正发生</b>——促动对工作生活的持续觉察和反思，发现痛点和挑战，学会设定应对挑战的目标，制定目标计划、最终达成预先设定的目标。</p>
                            <p><b>● 全方位规划和管理工作与生活的目标</b>——帮助个人全面管理工作与个人生活各领域、各阶段的目标，将目标达成落实到年度/月度/周/日目标管理体系中，得到期望的结果。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fs-options">
            <div class="inside-container">
                <div class="fs-item item-right">    
                    <img class="fs-item-img" :src="shouyi">
                    <div class="fs-item-content">
                        <div class="fs-item-title">投入和收益</div>
                        <div class="fs-item-text">
                            <p>投入：¥2980元</p>
                            <p>获得：六周全程的学习支持</p>
                            <p class="item-text-intent">2次小组辅导</p>
                            <p class="item-text-intent">1次一对一辅导</p>
                            <p class="item-text-intent">免费开放半年的学习系统和目标规划·SP系统</p>
                            <p>为使改变真正发生，完成从认知、实践、最终得到期望结果的全过程，学员在辅导过程中需全力投入，与工作实践结合并持续反思，最终达到知行合一。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fs-options">
            <div class="inside-container">
                <div class="fs-item item-left">
                    <img class="fs-item-img" :src="xuexi">
                    <div class="fs-item-content">
                        <div class="fs-item-title">学习形式</div>
                        <div class="fs-item-text">
                            <p>● 共6周，小班辅导、每组3-5人，满3人开班，5人上限</p>
                            <p>● 自我学习+自我评估+自我实践多感官自主学习</p>
                            <p>● 专业教练支持，含2次小组辅导和1次一对一辅导</p>
                            <p>● 应用“目标规划·SP”系统管理目标达成</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fs-options">
            <div class="inside-container">
                <div class="fs-item item-right last-item">
                    <img class="fs-item-img" :src="guanzhu">
                    <div class="fs-item-content">
                        <div class="fs-item-title">特别关注</div>
                        <div class="fs-item-text">
                            <p>● First Step学习辅导项目已包含“目标规划·SP系统“半年的使用权限</p>
                            <p>● 小组辅导和一对一辅导是本辅导项目中非常重要的环节，请在购买本辅导产品时、务必选择自己肯定能出席的时间，以确保教练能支持到您。这也是对彼此的承诺，请务必特别认真对待！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="fs-fivth">
            <div class="inside-container">
                <div class="fs-fivth-header">
                    <svg-icon icon-class="icon-gengduo" class="icon-more"></svg-icon>更多项目详情
                </div>
                <div class="fs-fivth-content clearfix">
                    <ul class="fs-fivth-other">
                        <li>
                            <svg-icon icon-class="icon-anpai2"></svg-icon><a @click="$router.push({name:'arrange'})">First Step辅导项目安排</a>
                        </li>
                        <!-- <li>
                            <svg-icon icon-class="icon-liucheng"></svg-icon><a @click="$router.push({name:'order'})">First Step辅导项目流程</a>
                        </li> -->
                    </ul>
                    <img class="fs-fivth-img" :src="projectfs2" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import projectfs from '@/assets/images/projectfs.png'
import projectfs2 from '@/assets/images/projectfs2.png'
import mubiao from '@/assets/images/mubiao.png'
import shouyi from '@/assets/images/shouyi.png'
import xuexi from '@/assets/images/guanzhu.png'
import guanzhu from '@/assets/images/xuexi.png'
import FsBuy from './fs-buy'
import { baseRequest } from '@/api/base'
export default {
  components: {
    FsBuy
  },
  props: { },
  data() {
    return {
      projectfs,
      projectfs2,
      mubiao,
      shouyi,
      xuexi,
      guanzhu,
      price: ''
    }
  },
  computed: { },
  created() {},
  mounted() {
    this.getPrice()
  },
  methods: {
    getPrice() {
      const params = {
        productId: '1',
        type: '1',
        token: this.$store.state.token
      }
      baseRequest('/user/rwProductPrice/selects', params).then((response) => {
        this.price = response.data.item.txnAmt
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$marginUd:200px;
.project-fs{
    .highlight{
        color: #F56C6C;
    }
    .fs-header{
        background-color: #fff;
        padding:100px 0;
        border-bottom: 1px solid #ddd;
        .fs-img{
            float: left;
            width: 640px;
            margin-top: 72px;
            img{
                width: 560px;
            }
        }
        .fs-article{
            float: left;
            width: 800px;
            .fs-article-header{
                height: 60px;
            }
            .fs-article-item{
                display: inline-block;
                font-size: 24px;
                font-weight: bold;
                color: #222222;
                height: 100%;
                border-bottom: 4px solid #00afff;
                padding-top:2px;
                padding-left: 45px;
                position: relative;
                &.second-item{
                    font-weight: normal;
                    margin-left: 20px;
                    border-bottom: none;
                    padding-left: 0;
                }
                .icon-hexin{
                    font-size: 30px;
                    position: absolute;
                    top:0;
                    left: 0;
                }
            }
            .article-introduction{
                margin-top:40px;
                font-size: 16px;
                line-height: 30px;
                color: #222222;
            }
            .article-detail{
                margin-top:30px;
                .article-detail-title{
                    color: #222222;
                    font-size: 16px;
                    font-weight: bold;
                    .article-detail-point{
                        margin: 0 14px 0 20px;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: #00afff;
                        display: inline-block;
                    }
                }
                .article-detail-content{
                    margin-top:16px;
                    line-height: 30px;
                    font-size: 16px;
                    padding-left: 46px;
                    .detail-title{
                        font-weight: 700;
                    }
                    .tuchu{
                        font-size: 18px;
                        font-weight: bold;
                        color: #F56C6C;
                    }
                }
            }
            .article-tip{
                padding-left: 50px;
                font-size: 12px;
                line-height: 15px;
                // color: #E80000;
            }
            .article-buy-price{
                color: #F56C6C;
                float: left;
                line-height: 80px;
                padding-left: 45px;
                font-size: 25px;
                font-weight: 600;
                .article-buy-old{
                    font-size: 16px;
                    color: #222;
                    font-weight: normal;
                    text-decoration: line-through
                }
            }
            .article-buy-btn{
                margin-top:30px;
                padding-left: 46px;
                float: right;
            }
        }
    }
    .fs-options{
        background-color: #fff;
    }
    .fs-item{
        position: relative;
        padding: $marginUd 0 0 $marginUd;
        .fs-item-img{
            position: absolute;
            width: 320px;
        }
        .fs-item-content{
            color: #222;
            font-size: 16px;
            .fs-item-title{
                font-weight: 600;
                font-size: 18px;
                margin-bottom: 25px;
            }
            .fs-item-text{
                line-height: 35px;
                .item-text-intent{
                    text-indent: 3em;
                }
            }
        }
        &.item-left{
            padding-left: 600px;
            .fs-item-img{
                top: $marginUd;
                left: $marginUd;
            }
        }
        &.item-right{
            padding-right: 400px;
            padding-left:$marginUd;
            .fs-item-img{
                bottom: 0;
                right: 0;
            }
        }
        &.last-item{
            padding-bottom: $marginUd;
            &.item-right{
                .fs-item-img{
                    bottom: $marginUd;
                }
            }
        }
    }
    .fs-fivth{
        padding:100px 0;
        background-color: #fff;
        border-top: 1px solid #ddd;
        .fs-fivth-header{
            height: 60px;
            border-bottom: 4px solid #00afff;
            font-size: 24px;
            font-weight: 600;
            padding-top: 7px;
            position: relative;
            padding-left: 54px;
            display: inline-block;
            .icon-more{
                position: absolute;
                top:0;
                left: 0;
                font-size: 40px;
            }
        }
        .fs-fivth-content{
            .fs-fivth-other{
                float: left;
                margin-top:80px;
                li{
                    margin-top:40px;
                    a{
                        margin-left: 14px;
                        font-size: 18px;
                        color: #00afff;
                        text-decoration: underline;
                    }
                }
            }
            .fs-fivth-img{
                float: right;
                margin-top: 40px;
                width: 454px;
            }
        }
    }
}
</style>