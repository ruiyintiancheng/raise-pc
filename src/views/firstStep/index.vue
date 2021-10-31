/** 产品购买 */
<template>
  <div class="one-one inside-container">
    <div class="one-one-title">
      <span class="bold">产品购买</span>
    </div>
    <div class="one-one-list clearfix" :style="{'min-height': materialsHeight + 'px'}">
      <product-first class="one-one-item" :isBuy="true" :style="{'height': (materialsHeight - 24) + 'px'}" />
      <product-sp class="one-one-item" :style="{'height': (materialsHeight - 24) + 'px'}" />
    </div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import productFirst from './first/index'
import productSp from './sp/index'
export default {
  components: {
    productFirst,
    productSp
  },
  props: { },
  data() {
    return {
      isBuy: null
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 24 - 44
    }
  },
  created() {
    this.getIsBuy()
  },
  mounted() { },
  methods: {
    getIsBuy() {
      baseRequest('/user/rwOrder/getIsBuy', {}).then((response) => {
        const { isBuy } = response.data.item.isBuy
        this.isBuy = isBuy
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .one-one {
    background-color: #ffffff;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding:24px 0 0 24px;
    margin-top:30px;
    margin-bottom:30px;
    color: #222222;
    font-family: PingFangSC-Regular;
	  font-size: 14px;
    .one-one-title {
      margin-bottom: 24px;
      .bold {
        font-weight: bold;
        font-family: PingFangSC-Semibold;
        font-size: 16px;
      }
    }
    .one-one-list {
      min-height: 200px;
      .one-one-item {
        width: 684px;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px 
          rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        margin: 0 24px 24px 0;
        padding: 20px;
        float: left;
        position: relative;
      }
    }
  }
</style>