<template>
    <div class="about-join">
        <div class="about-one">
               <div class="imgs">
                   <img src="../../../assets/shouye-img/pic3.png" alt="">
               </div>
               <div class="wenzi">
                    <h4 style="margin-bottom:20px">加入我们</h4>
                    <p>在快速更迭变化发展的时代，帮助更多的人得到便捷有效的系统化发展体系及自我成长的教练资源，助力个人成长发展，是睿思智得创立和发展的信念。 </p>
                    <p>睿思智得历经12个月打造线上辅导服务平台，平台的第一个产品First Step是基于LMI的核心理念打造，并结合LMI最经典的成功手册原型开发线上版「SP-目标规划系统」，目的是将有效的个人目标发展和实现工具、通过线上辅导系统传递和影响到更多的人、使之获益。</p>
                    <p>在线上培训逐步成为主流的趋势下，睿思智得线上辅导服务平台将助力您扩大影响力，打造个人教练品牌，实现教练价值；同时您还可借由睿思智得的教练合作体系，连接更多志同道合的伙伴。
                        诚挚地邀请您在这个平台上共同筑梦、逐梦，实现价值。期待您的加入。<router-link to='/skip1' style="color:#00afff">点击成为大使，</router-link><router-link to='/skip' style="color:#00afff">点击成为教练</router-link>
                    </p>
               </div>
         </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.about-join{
        .about-one{
                width: 1440px;
                height: 330px;
                position: relative;
                background-color: #ffffff;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
                margin-top:24px;
                border-radius: 10px;
                padding-top:40px; 
            }
            .imgs{width: 244px;height: 200px;margin-top:10px;margin-left:73px}
            .wenzi{
                position: absolute;
                left:420px;
                top:80px;
                width:953px;
                height: 206px;
            }
            .wenzi p{
                text-align: left;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color:#222222;
                line-height: 25px;
            }
        }
        
</style>