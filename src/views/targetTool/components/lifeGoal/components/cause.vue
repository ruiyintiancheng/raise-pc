<template>
    <div class="goal">
        <div class="goal-item">
            <div>
                <span class="goal-item-tile" :class="{active:active===1}" @click="active=1">愿景</span>
                <span class="goal-item-tile" :class="{active:active===2}" @click="active=2">使命</span>
                <span class="goal-item-tile" :class="{active:active===3}" @click="active=3">价值观</span>
                <span class="goal-item-tile" :class="{active:active===4}" @click="active=4" >梦想</span>
            </div>
            <vision :year="year" v-show="active === 1" :visionType='"1"'></vision>
            <mission :year="year" v-show="active === 2" :visionType='"1"'></mission>
              <div  v-show="active === 3">
                <template v-if="priceData && priceData.length>0">
                    <div class="high-value">
                      <label class="high-label">核心价值观</label>
                      <el-input
                          type="textarea"
                          :rows="4"
                          maxlength="200"
                          show-word-limit
                          style="width:1090px"
                          v-model="hxItem.coreValueCont">
                          </el-input>
                          <el-button style="display:block;margin-top:10px;" type="success" @click="saveHigh" :loading="highLoading">保存核心价值观</el-button>
                    </div>
                    <priceitem ref=""  @getRefresh="getRefresh" v-for="(item,index) in priceData" :key="index" :visionType='"1"' :valueData="item" :index="index"></priceitem>
                </template>
                <div v-else>
                  <div class="price-loading"><i class="el-icon-loading" style="margin-right:5px;"></i>加载中,请稍后...</div>
                </div>
              </div>
            <dream ref='dream' :year="year" :visionType='"1"' v-show="active === 4" @changeDream="changeDream"></dream>
        </div>
    </div>
</template>
<script>
import vision from './vision'
import mission from './mission'
import priceitem from './priceitem'
import dream from './dream'
import { baseRequest } from '@/api/base'
export default {
  props: {
    year: [String, Number]
  },
  components: {
    vision,
    mission,
    priceitem,
    dream
  },
  data() {
    return {
      priceData: [],
      active: 1,
      hxItem: {
        coreId: null,
        coreValueCont: ''
      },
      highLoading: false
    }
  },
  mounted() {
    this.getPricevalue()
    this.getHighValue()
  },
  methods: {
    saveHigh() {
      this.hxItem.codeType = '1'
      this.highLoading = true
      baseRequest('/objective/rwValueCore/update', this.hxItem).then(_ => {
        this.$Message.success('操作成功')
        this.getHighValue()
      }).finally(_ => {
        this.highLoading = false
      })
    },
    // 获取核心价值观
    getHighValue() {
      baseRequest('/objective/rwValueCore/selects', { codeType: '1' }).then(response => {
        if (response.data.item) {
          this.hxItem = response.data.item[0] || {}
        } else {
          this.hxItem = {
            coreId: null,
            coreValueCont: ''
          }
        }
      })
    },
    changeDream() {
      this.$emit('changeDream', 0)
    },
    getRefresh() {
      this.getPricevalue()
    },
    getPricevalue() {
      baseRequest('/objective/rwValue/selects', { codeType: '1' }).then(response => {
        this.priceData = response.data.item
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.goal{
    .goal-item{
        .goal-item-tile{
            width: 80px;
            height: 28px;
            display: inline-block;
            font-size: 16px;
            line-height: 28px;
            letter-spacing: 0px;
            color: #444;
            background-color: #ecf5ff;
            // border-color: #b3d8ff;
            border-radius: 0px 10px 10px 0px;
            font-family: PingFangSC-Semibold;
            text-align: center;
            margin-right: 5px;
            cursor: pointer;
            &:hover{
              color: #00afff;
            }
            &.active{
              background-color:#00afff;
              color: #ffffff;
            }
        }
        .high-value{
          margin-top: 20px;
          .high-label{
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
        .price-loading{
          text-align: center;
          margin-top: 150px;
          font-size: 20px;
          color: #00afff;
        }
    }
}
</style>