<template>
    <div class="vision">
        <div class="vision-row clearfix">
            <div class="vision-box fl" @click="intoPage('firstStep')">
                <div class="vision-head">
                    <div class="vision-head-icon">
                        <svg-icon icon-class="icon-hexin2" />
                    </div>
                    <b style="margin-right:16px;">核心辅导项目</b>  First Step迈出第一步
                </div>
                <div class="vision-head-line"></div>
                <div class="vision-dis">
                    First Step迈出第一步辅导项目，将帮助您清晰洞见生活和工作中的痛点、挑战，通过设定应对挑战的目标，指导您学习规划目标、制定目标计划，最终实现所设定的目标。
                    <p>First Step项目 ——六周3～5人小组辅导项目</p>
                </div>
                <ul class="vision-list" style="margin-top:40px;">
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>促使改变真正发生</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>全方位规划你的目标</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>专业教练支持和陪伴</li>
                </ul>
                <img class="vision-pic" width="216px" height="170px" src="../../../assets/shouye-img/pic9.png" alt="">
            </div>
            <div class="vision-box fr" @click="intoPage('exploredoor')">
                <div class="vision-head">
                    <div class="vision-head-icon">
                        <svg-icon icon-class="icon-tisheng" />
                    </div>
                    <b style="margin-right:16px;">个人提升项目</b>  探索之门
                </div>
                <div class="vision-head-line"></div>
                <div class="vision-dis">
                    通过内含哲学思维的提问，启发对过去、对未来、对人生的思考，循序渐进地探寻出自己生命的意义，并找到可以持续向前的内在动力。
                </div>
                <ul class="vision-list" style="margin-top:65px;">
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>了解过去，探寻什么在影响着你</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>认清自己，你拥有的独特价值</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>找到使命、指引你走向更好的未来</li>
                </ul>
                <img class="vision-pic" width="262px" height="170px" src="../../../assets/shouye-img/pic10.png" alt="">
            </div>
        </div>
        <div class="vision-row clearfix" style="margin-top:40px;">
            <div class="vision-box big fl" @click="intoPage('sp')">
                <div class="vision-head">
                    <div class="vision-head-icon">
                        <svg-icon icon-class="icon-gongju" />
                    </div>
                    <b style="margin-right:16px;">经典在线工具</b>  目标规划·SP
                </div>
                <div class="vision-head-line"></div>
                <div class="vision-dis">
                    目标规划·SP是LMI（Leadership Management International）经典的目标管理工具的线上版。
                </div>
                <ul class="vision-list" style="margin-top:29px;">
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>帮助您管理规划目标，逐步的实现对你有价值的、预先设定的、个人的目标</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>帮助您把行动落实在每天、每周、每月，一步步贴近目标</li>
                    <li class="vision-list-item"><span class="vision-list-item-point"></span>管理您工作和生活的目标，包括你未来的事业领域拓展</li>
                </ul>
                <img class="vision-pic-big" width="640px" height="394px" src="../../../assets/shouye-img/9d2a30f56e68cf4d219e4347247f653.png" alt="">
            </div>
            <div class="fr">
                <div class="vision-box small first-v" @click="intoPage('coachTalk')">
                    <div class="vision-head">
                        <div class="vision-head-icon">
                            <svg-icon icon-class="icon-fudao2" />
                        </div>
                        <b style="margin-right:16px;">预约辅导</b>  1-1教练会谈
                    </div>
                    <div class="vision-head-line"></div>
                    <div class="vision-dis">
                        帮助客户发掘自身寻求解决办法和对策的能力，支持客户发现自我潜能，找到自我成长的路径。
                    </div>
                    <ul class="vision-list" style="margin-top:30px;">
                        <li class="vision-list-item"><span class="vision-list-item-point"></span>激发被教练者重新审视自我</li>
                        <li class="vision-list-item"><span class="vision-list-item-point"></span>打开被教练者的制约心态，进一步厘清个人职业与生活方向</li>
                        <li class="vision-list-item"><span class="vision-list-item-point"></span>突破自我，解决工作和生活中面临的挑战</li>
                    </ul>
                    <img class="vision-pic" width="192px" height="150px" src="../../../assets/shouye-img/pic22.png" alt="">
                </div>
                <div class="vision-box small mt40" @click="intoPage('training')">
                    <div class="vision-head">
                        <div class="vision-head-icon">
                            <svg-icon icon-class="icon-renzheng" />
                        </div>
                        <b style="margin-right:16px;">认证项目</b>  TTT训练认证
                    </div>
                    <div class="vision-head-line"></div>
                    <div class="vision-dis">
                        通过培训，可认证成为睿思智得线上辅导平台专属教练，提升教练核心能力，拓展更多客户群体，实现资源变现。
                    </div>
                    <ul class="vision-list" style="margin-top:30px;">
                        <li class="vision-list-item"><span class="vision-list-item-point"></span>学习培训内容，完成教练认证考核</li>
                        <li class="vision-list-item"><span class="vision-list-item-point"></span>建立睿思智得线上辅导平台专属服务系统</li>
                    </ul>
                    <img class="vision-pic" width="174px" height="150px" src="../../../assets/shouye-img/pic2.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      methods: {
        intoPage(name) {
          this.$router.push({
            name
          })
        }
      }
    }
</script>

<style lang="scss" scoped>
    .vision{
        color: #222222;
        background-color: #ffffff;
        padding:80px 0;
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
        .vision-box{
            width: 700px;
            height: 426px;
            background-color: #ffffff;
            box-shadow: 0px 2px 10px 0px 
                rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            border: solid 1px #dddddd;
            padding: 30px;
            position: relative;
            cursor: pointer;
            &.big{
                height: 732px;
            }
            &.small{
                height: 346px;
            }
            &:hover{
                box-shadow: 0px 10px 10px 0px 
                rgba(0, 0, 0, 0.1);
                margin-top:-5px;
            }
            &.first-v{
                margin-bottom: 40px;
                &:hover{
                    margin-top: -5px;
                    margin-bottom: 45px;
                }
            }
            &.mt40{
                &:hover{
                    margin-top: -5px;
                }
            }
            .vision-head{
                height: 40px;
                line-height: 40px;
                padding-left: 54px;
                position: relative;
                font-size: 24px;
                img{
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    top: 0;
                    left: 0;
                }
                .vision-head-icon{
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    text-align: center;
                    background-color: #00afff;
                    border-radius: 12px;
                }
            }
            .vision-head-line{
                width: 196px;
                height: 4px;
                background-color: #00afff;
                margin-top:16px;
            }
            .vision-dis{
                margin-top:30px;
                font-size: 16px;
                line-height: 30px;
            }
            .vision-pic{
                position: absolute;
                bottom: 30px;
                right: 30px;
            }
            .vision-pic-big{
                margin-top:22px;
            }
            .vision-list{
                .vision-list-item{
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    &:last-child{
                        margin-bottom: 0;
                    }
                    .vision-list-item-point{
                        width: 12px;
                        height: 12px;
                        background-color: #00afff;
                        border-radius: 6px;
                        display: inline-block;
                        margin-right: 14px;
                    }
                }
            }
        }
    }
</style>