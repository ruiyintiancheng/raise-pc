<template>
    <div class="about-tdjs">
        <div class="about-one">
               <div class="imgs">
                   <img src="../../../assets/shouye-img/pic10.png" alt="" width="100%">
               </div>
               <div class="wenzi">
                    <h4 style="margin-bottom:20px">教练团队</h4>
                    <p>睿思智得（Raise Wisdom）拥有资深的专业认证教练团队，他们经过LMI体系认证或经过符合ICF（国际教练联盟）认证标准的专业教练培训，并全部经过睿思智得辅导项目认证；同时他们肩负理想和使命，希望用自己的专业和热忱，帮助支持更多人发现自我、产生改变、寻求和实现梦想。</p>
                    <!-- <p>在这里，教练们将陪伴学员通过专业的线上教练辅导服务平台，去看见，去支持，助你找到方向，敦促你产生行动，助力你养成习惯；让你每一天都离目标更近一步，清晰的看到自己的改变，为自己喝彩。</p> -->
               </div>
         </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.about-tdjs{
        margin-bottom:50px;
        .about-one{
                width: 1440px;
                min-height: 330px;
                position: relative;
                background-color: #ffffff;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
                margin-top:24px;
                border-radius: 10px;
                padding-top:40px; 
            }
            .imgs{width: 244px;height: 200px;margin-top:40px;margin-left:73px}
            .wenzi{
                position: absolute;
                left:420px;
                top:100px;
                width:auto;
                height: auto;
                padding-right: 65px;
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