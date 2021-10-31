<template>
        <div class="about">
           <div class="about-one">
               <div class="imgs">
                   <img src="../../../assets/shouye-img/pic9.png" alt="" style="width:100%" height="100%">
               </div>
               <div class="wenzi">
                    <h4>我们的价值观</h4>
                    <p>
                       价值观：诚信、成长、支持、合作、公平
                    </p>
                    <p>
                       ●诚信：诚信为基石，守诺求真，尊重事实。遵守法律法规，尊重知识产权，维护个人隐私；
                    </p>
                    <p>
                       ●成长：每个人都可以得到便捷有效的系统化发展体系，帮助加入其中的所有人成为这个愿景的践行者，并在其中获得不断的自我成长！
                    </p>
                    <p>
                        ●支持：所有的一切都为能支持到客户、教练及员工，无论是便捷的系统还是全员的信念：我能做什么更好的支持到你；
                    </p>
                    <p>
                        ●合作：所有的关系都是合作的、共创的、彼此感恩的；
                    </p>
                    <p>
                       ●公平：激励体系是公平可见的，保护和支持建立自营体系。
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
                width:auto;
                height: auto;
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
                line-height: 30px;
            }
            // .wenzi ul li{
            //     height: 14px;
            //     line-height: 14px; 
            //     font-size:14px;
            //     margin:4px0
            // }
        }
</style>