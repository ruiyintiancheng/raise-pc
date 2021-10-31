<template>
        <div class="about">
           <div class="about-one">
               <div class="imgs">
                   <img src="../../../assets/shouye-img/pic6.png" alt="" style="width:100%" height="100%">
               </div>
               <div class="wenzi">
                    <h4>我们的愿景</h4>
                    <p style="margin-top:30px">
                        <b>愿景</b>：每个人都可以得到便捷有效的系统化发展体系及自我成长的教练资源
                    </p>
                    <p>
                        <b>使命</b>：为个人的成长提供有效便利的教练式辅导服务平台
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
        .about{
            margin:0 auto;
            .about-one{
                width: 1440px;
                min-height: 330px;
                position: relative;
                background-color: #ffffff;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
                margin-top:30px;
                border-radius: 10px;
                padding-top:40px;
                
            }
            .imgs{width: 274px;height: 180px;margin-top:34px;margin-left:73px}
            .wenzi{
                position: absolute;
                left:420px;
                top:40px;
                width:953px;
                height: 206px;
            }
            h4{
                margin-bottom:20px;
                font-size: 20px;
            }
            .wenzi p{
                text-align: left;
                font-size: 14px;
                font-family: PingFangSC-Regular;
                color:#222222;
                line-height: 20px;
            }
            // .wenzi ul li{
            //     height: 14px;
            //     line-height: 14px; 
            //     font-size:14px;
            //     margin:4px0
            // }
        }
</style>