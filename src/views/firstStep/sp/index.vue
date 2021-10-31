/** 目标计划 SP */
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
        <el-button v-if="status === 1" class="btn green" @click="handleBuy('one')">购买</el-button>
        <el-button v-if="status === 2" class="btn green" @click="handleBuy('group')">续费</el-button>
        <el-button v-if="status === 3" class="btn gray">续费</el-button>
      </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  components: {},
  props: {},
  data() {
    return {
      item: {
        id: 3,
        name: 'xxx',
        price: 'xxx',
        image: require('@/assets/images/pic1.png')
      },
      status: 1
    }
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 60 - 60 - 24 - 44
    },
    descHeigth() {
      return this.materialsHeight - 40 - 24 - 140 - 59 - 40 - 10
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

      baseRequest('/objective/rwGoalPermission/isAvailable', {}).then((response) => {
        const { payFlag, endDate } = response.data.item
        if (endDate === null || endDate === '') {
          this.status = 1
        } else {
          this.status = payFlag === '1' ? 2 : 3
        }
      })
    },
    handleBuy(type) {
      this.$router.push({
        name: 'sp-buy',
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
        &.green {
          background-color: #04ae0f;
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

