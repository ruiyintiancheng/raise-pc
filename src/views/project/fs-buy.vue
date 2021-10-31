/** fs-buy购买菜单 */
<template>
  <div>
    <el-button type="success" :disabled="disBuy" @click="handleBuy('one')">立即购买</el-button>
    <el-button type="success" :disabled="disBuy" @click="handleBuyWu()">购买无会谈版</el-button>
    <!-- <el-button type="primary" :disabled="disBuy" @click="handleBuy('group')">发起拼团</el-button> -->
    <!-- <el-popover
        placement="right"
        width="400"
        trigger="hover">
        <popover-buy />        
        <svg-icon slot="reference" class="item-person-icon" icon-class="icon-ques" />
    </el-popover>  	 -->
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import popoverBuy from './components/popover-buy'
export default {
  components: {
    popoverBuy
  },
  props: {},
  data() {
    return {
      disBuy: false, // 是否可购买 tru 不可购买
      id: 1,
      name: 'First Step',
      userId: null
    }
  },
  computed: {},
  created() {
    this.userId = this.$store.state.user.userId
    if (this.userId) {
      this.getInfo()
    }
  },
  mounted() {},
  methods: {
    getInfo() {
      baseRequest('/user/rwOrder/getIsBuy', {}).then((response) => {
        const { isBuy } = response.data.item
        this.disBuy = !isBuy
      })
    },
    handleBuy(type) {
      this.$router.push({
        name: 'firstStep-buy',
        params: { id: this.id },
        query: { type, name: this.name }
      })
    },
    handleBuyWu() {
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: '9'
        },
        query: {
          type: '1',
          name: 'FS无会谈'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>