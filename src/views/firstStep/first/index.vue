/** firstStep */
<template>
    <div class="one-one-item">
      <div class="item-info clearfix">
        <el-image class="item-image" :src="item.image" fit="fill" />
        <div class="item-course">
            <div class="item-course-name">{{item.name}}</div>
            <div class="item-course-price">￥{{item.price}}</div>
        </div>
      </div>
      <div class="item-title">项目描述</div>
      <div class="item-message" :style="{'height': descHeigth + 'px'}">
        <el-scrollbar style="height:100%">
          <p v-html="item.content"></p>
        </el-scrollbar> 
      </div>
      <div class="item-menu">
        <el-button class="btn one"
          :disabled="!getBuy"
          :class="{gray: !getBuy}"
          @click="handleBuy('one')">单独购买</el-button>
        <el-button class="btn group" 
          :disabled="!getBuy" 
          :class="{gray: !getBuy}"
          @click="handleBuy('group')">发起拼团</el-button>
        <el-popover
          placement="left-end"
          width="400"
          trigger="hover">
          <popover-buy />        
          <svg-icon slot="reference" class="item-person-icon" icon-class="icon-ques" />
        </el-popover>  
      </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import popoverBuy from './components/popover-buy'
export default {
  components: {
    popoverBuy
  },
  props: {
    isBuy: {
      type: [String, Boolean],
      default: null
    }
  },
  data() {
    return {
      item: {
        id: 1,
        content: 'XXXX',
        name: 'First Step',
        price: 'xxxx',
        image: require('@/assets/images/pic2.png')
      }
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 24 - 44
    },
    descHeigth() {
      return this.materialsHeight - 40 - 24 - 140 - 59 - 40 - 10
    },
    getBuy() {
      return this.isBuy === true || this.isBuy === 'true'
    }
  },
  created() {
    this.getInfo()
  },
  mounted() { },
  methods: {
    getInfo() {
      baseRequest('/user/rwProduct/getMegById', { productId: this.item.id }).then((response) => {
        const { productContent, productName, productPrice } = response.data.item
        this.item.content = productContent
        this.item.name = productName
        this.item.price = productPrice
      })
    },
    handleBuy(type) {
      this.$router.push({
        name: 'firstStep-buy',
        params: {
          id: this.item.id
        },
        query: {
          type,
          name: this.item.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .one-one-item {
    .item-info {
      .item-image {
        width: 322px;
        height: 140px;
        float: left;
      }
      .item-course {
        margin: 20px 0 0 20px;
        padding: 10px 0 0 20px;
        height: 100px;
        border-left: 6px solid #eeeeee;
        float: left;
        color: #222222;
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        line-height: 21px;
        font-weight: bold;
        .item-course-price {
          margin: 10px 0;
          color: #ff0000;
        }
      }
    }

    .item-title {
      font-family: PingFangSC-Regular;
      line-height: 25px;
      font-size: 16px;
      font-weight: bold;
      color: #222222;
      margin: 20px 0 14px;
    }
    .item-message {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      line-height: 25px;
      color: #222222;
      overflow: auto;
    }
    .item-menu {
      position: absolute;
      right: 20px;
      bottom: 20px;
      .btn {
        width: 120px;
        height: 40px;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #ffffff;
        &.one {
          background-color: #04ae0f;
        }
        &.group {
          background-color: #00afff;
        }
        &.gray {
          background-color: #cccccc;
        }
      }
    }
  }
  /deep/ .el-scrollbar__wrap{
    overflow-x: hidden;
  }
</style>

