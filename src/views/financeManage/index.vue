<template>
    <div class="system-contant">
        <div class="bt-group">
          <div v-for="(item,index) in btGroup" :key="index" :class="{'bsclect':index===btSclect,btn:true}" @click="btClick(index)"><span>{{item}}</span></div>
        <salesHistory v-if="btSclect===0"></salesHistory>
        <salesGroup v-if="btSclect===1"></salesGroup>
        <invoiceManage v-if="btSclect===2"></invoiceManage>
        <coachSettle v-if="btSclect===3"></coachSettle>
        <ambossSettle v-if="btSclect===4"></ambossSettle>
        <!-- <settlementManagement ></settlementManagement> -->
        <integralManage v-if="btSclect===5"></integralManage>
        <business v-if="btSclect===6"></business>
        <forrecord v-if="btSclect===7"></forrecord>
        </div>
     
    </div>
</template>
<script>
import salesHistory from '../saleshistory/index'
import salesGroup from '../saleshistory/group'
import settlementManagement from '../Settlementmanagement/index'
import ambossSettle from '../ambassaborSettle/index'
import integralManage from '../integralManage/index'
import invoiceManage from '../invoiceManage/index'
import coachSettle from '../coachSettle/index'
import business from '../business/index'
import forrecord from '../forrecord/index'
export default {
  components: {
    salesHistory,
    salesGroup,
    settlementManagement,
    ambossSettle,
    integralManage,
    invoiceManage,
    coachSettle,
    business,
    forrecord
    // role,
    // customer
  },
  data() {
    return {
      btGroup: ['销售历史', '团购历史', '发票管理', '教练结算', '大使结算', '积分管理', '业务运维', '兑换记录'],
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
    this.btSclect = this.$route.query.btSclect || 0
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