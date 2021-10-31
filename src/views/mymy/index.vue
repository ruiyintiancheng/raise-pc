/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-vars */
<template>
  <div class="system-contant">
    <div class="bt-group">
      <template v-for="(item,index) in btGroup">
        <div
          v-if="(menuStatus !== '0' || index === 0 || index === 5) && (index !==3 || quanyi.some(item => roles.find(it => it === item)))"
          :key="index"
          :class="{'bsclect':index+''===btSclect,btn:true}"
          @click="btClick(index+'')"
        >
          <span>{{item}}</span>
        </div>
      </template>
    </div>
    <bs v-if="btSclect==='0'"/>
    <exclusivePosters v-if="btSclect==='1'"/>
    <integral v-if="btSclect==='2'"/>
    <rightsInterests v-if="btSclect==='3'  && quanyi.some(item => roles.find(it => it === item))"/>
    <achievement v-if="btSclect==='4'"/>
    <PurchaseHistory v-if="btSclect==='5'"/>
  </div>
</template>

<script>
import bs from './components/basic'
import integral from './components/integral'
import exclusivePosters from './components/exclusivePosters'
import achievement from './components/achievement'
import PurchaseHistory from './components/PurchaseHistory'
// eslint-disable-next-line no-unused-vars
import rightsInterests from './components/rightsInterests'
import { mapGetters } from 'vuex'
export default {
  components: {
    bs,
    integral,
    exclusivePosters,
    rightsInterests,
    achievement,
    PurchaseHistory
  },
  data() {
    return {
      btGroup: [
        '基本信息',
        '专属海报',
        '我的积分',
        '销售情况',
        '我的成就',
        '购买历史'
      ],
      haibao: ['2', '4', '7', '5', '6'],
      quanyi: ['3', '7'],
      // quanyi: [],
      btSclect: 0,
      index: 0,
      form: {
        name: '',
        region: '',
        loading: false,
        tableData: []
      }
    }
  },
  mounted() {
    this.navigateToTab(this.$route.query.tab)
  },
  watch: {
    $route(val) {
      this.navigateToTab(this.$route.query.tab)
    }
  },
  methods: {
    btClick(index) {
      this.btSclect = index
      this.$router.push({ name: 'mymy', query: { tab: index }})
    },
    navigateToTab(name) {
      if (name) {
        this.btSclect = name
      } else {
        this.btSclect = '0'
      }
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 225
    },
    ...mapGetters([
      'menuStatus',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.system-contant {
  width: 1440px;
  // height:810px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 14px;
  .bt-group {
    width: 100%;
    .bsclect.btn {
      background-color: #00afff;
      span {
        color: #ffffff;
      }
    }
    .btn {
      width: 140px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      border: none;
      margin-right: 12px;
      background-color: #ccefff;
      box-shadow: -1px 0px 0px 0px rgba(0, 175, 255, 0.4),
        0px -1px 0px 0px rgba(0, 175, 255, 0.4),
        1px 0px 0px 0px rgba(0, 175, 255, 0.4);
      border-radius: 10px 10px 0px 0px;
      span {
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

    .btn:focus {
      outline: none;
      background-color: #00afff;
      border-radius: 10px 10px 0px 0px;
      span {
        color: #ffffff;
      }
    }
  }
  .bt-content {
    width: 1440px;
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0px 10px 10px 10px;
    .systitle {
      // width: 56px;
      height: 14px;
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      font-weight: 800;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
    }
    .sysquery {
      width: 1392px;
      height: 109px;
      margin-top: 25px;
      .operation {
        text-align: right;
        margin-top: 20px;
      }
      .formitem {
        width: 326px;
        //  height: 59px;
        margin-right: 24px;
        margin-bottom: 0;
        span {
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
      .formitem:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>