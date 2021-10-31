/*
 * @Author: mikey.zhaopeng 
 * @Date: 2020-07-14 10:00:31 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-08-26 16:30:27
 * @Description:  系统管理
 */
<template>
    <div class="system-contant">
        <div class="bt-group">
          <div v-for="(item,index) in btGroup" :key="index" :class="{'bsclect':index===btSclect,btn:true}" @click="btClick(index)"><span>{{item}}</span></div>
        <user v-if="btSclect===0"></user>
        <!-- <role v-if="btSclect===1"></role> -->
        <customer v-if="btSclect===1"></customer>
        </div>
     
    </div>
</template>
<script>
import user from './components/user'
// import role from './components/role'
import customer from './bigCustomer'
export default {
  components: {
    user,
    // role,
    customer
  },
  data() {
    return {
      btGroup: ['用户管理', '客户管理'],
      btSclect: 0,
      btCustomer: 0,
      form: {
        name: '',
        region: '',
        loading: false,
        tableData: []
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 420
    }
  },
  mounted() {
    this.btSclect = 0
  },
  methods: {
    btClick(index) {
      this.btSclect = index
    }
  }
}
</script>
<style lang="scss" scoped>
.system-contant{
    width: 1440px;
    // height:810px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
    .bt-group{
        width: 100%;
           .bsclect.btn{
              background-color: #00afff;
                span{
               color: #ffffff;
            }
        }
        .btn{
    width: 140px;
	height: 26px;
    line-height: 26px;
    text-align: center;
    display: inline-block;
    cursor:pointer;
    border:none;
    margin-right: 12px;
	background-color: #ccefff;
	box-shadow: -1px 0px 0px 0px 
		rgba(0, 175, 255, 0.4), 
		0px -1px 0px 0px 
		rgba(0, 175, 255, 0.4), 
		1px 0px 0px 0px 
		rgba(0, 175, 255, 0.4);
	border-radius: 10px 10px 0px 0px;
    span{
        width: 56px;
	height: 14px;
	font-family: PingFangSC-Regular;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 17px;
	letter-spacing: 0px;
	color: #00afff;
    }
        }
    
        .btn:focus{
         outline: none;
            background-color: #00afff;
            border-radius: 10px 10px 0px 0px;
            span{
               color: #ffffff;
            }
        }
    }
    .bt-content{
        	width: 1440px;
	         background-color: #ffffff;
	         box-shadow: 0px 2px 10px 0px 
	       	rgba(0, 0, 0, 0.1);
           	border-radius: 0px 10px 10px 10px;
               .systitle{
                   	// width: 56px;
	height: 14px;
	font-family: PingFangSC-Semibold;
	font-size: 14px;
	font-weight: 800;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #222222;
               }
               .sysquery{
                   width: 1392px;
	                height: 109px;
                    margin-top: 25px;
                    .operation{
                        text-align: right;
                        margin-top: 20px;
                    }
                .formitem{
                     width: 326px;
	                //  height: 59px;
                     margin-right: 24px;
                     margin-bottom: 0;
                     span{
                        width: 38px;
	                    height: 13px;
	                    font-family: PingFangSC-Regular;
	                    font-size: 13px;
	                    font-weight: 400;
	                    font-stretch: normal;
	                    line-height: 22px;
	                    letter-spacing: 0px;
	                    color: #222222;
                     }
                }
                .formitem:last-child{
                    margin-right: 0;
                }
               }
    }
}
</style>