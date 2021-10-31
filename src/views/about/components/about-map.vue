<template>
        <div class="aboutMap">
           <div class="about-one">
               <div class="imgs">
                   <img src="../../../assets/shouye-img/map_03.gif" alt="">
               </div>
               <div class="wenzi">
                   <h4>联系我们</h4>
                   <div class="lianxi">
                       <ul>
                            <img src="../../../assets/shouye-img/icon-phone.svg" alt="">
                       </ul>
                       <ul>
                           联系电话：132323232
                       </ul>
                   </div>
                   <div class="lianxi">
                       <ul>
                            <img src="../../../assets/shouye-img/icon-location.svg" alt="">
                       </ul>
                       <ul>
                          公司地址：北京市西城区长安街中南海1号院
                       </ul>
                   </div>
                   <div class="lianxi">
                       <ul>
                            <img src="../../../assets/shouye-img/icon-mail.svg" alt="">
                       </ul>
                       <ul>
                           公司邮箱：321321321@.com
                       </ul>
                   </div>
               </div>
           </div>
        </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
        .aboutMap{
            .about-one{
                width: 1440px;
                height: 330px;
                position: relative;
                background-color: #ffffff;
                box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
                margin-top:24px;
                border-radius: 10px;
                
            }
            .imgs{width: 600px;height: 282px;margin-top:-15px;margin-left:24px}
            .wenzi{
                position: absolute;
                left:648px;
                top:54px;
                width:953px;
                height: 206px;
                h4{font-size:20px;margin-bottom:24px}
            }
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
           .lianxi ul:nth-child(2) { height: 40px;line-height: 40px;font-size: 16px;font-family: PingFangSC-Regular;color:#222222}
        }
</style>