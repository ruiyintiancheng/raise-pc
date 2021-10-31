<template>
  <div class="database">
    <div
      class="database-container inside-container"
      :style="{ minHeight: minHeight + 'px' }"
    >   
        <div class="backdoor-btn" @click="backDoor">返回探索之门</div>
        <div class="database-item" v-for="(item,index) in tableData" :key="index" @click="openDetail(item)">
            <div class="database-head">
                <svg-icon v-if="item.kinds === '电影推荐'" class="database-head-icon" icon-class="movie" />
                <svg-icon v-else class="database-head-icon" icon-class="file" />
                <span class="database-label">{{item.title}}</span>
            </div>
            <div class="database-content">
                {{item.content}}
            </div>
        </div>
    </div>
    <el-dialog
        :title="currentItem.title"
        :visible.sync="formVisible"
        class="dialog-main height80 no-bottom"
        top="5%"
        width="800px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <div class="database-detail-box">
            <div class="database-detail-head clearfix" v-if="currentItem.kinds === '电影推荐' && currentItem.productUrl">
               <div class="database-detail-image-box">
                    <img :src="baseUrl + currentItem.productUrl.split('/ROOT/')[1]" alt="">
               </div>
               <!-- <ul class="database-detail-jj">
                   <li class="detail-jj-item">
                       <span class="detail-jj-label">导演:</span>
                       <span class="detail-jj-value">西蒙·韦斯特</span>
                   </li>
                                      <li class="detail-jj-item">
                       <span class="detail-jj-label">导演:</span>
                       <span class="detail-jj-value">西蒙·韦斯特</span>
                   </li>
                                      <li class="detail-jj-item">
                       <span class="detail-jj-label">导演:</span>
                       <span class="detail-jj-value">西蒙·韦斯特</span>
                   </li>
                                      <li class="detail-jj-item">
                       <span class="detail-jj-label">导演:</span>
                       <span class="detail-jj-value">西蒙·韦斯特</span>
                   </li>
               </ul> -->
            </div>
            <div class="database-file-content">
                <p v-if="currentItem.kinds === '电影推荐' && currentItem.productUrl" class="content-tjly">推荐理由：</p>
                <p v-html="currentItem.content"></p> 
            </div>
        </div>
     </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '../../../api/base'
// import { baseSearch } from '@/api/base'
export default {
  data() {
    return {
      tableData: [],
      title: '故事一',
      formVisible: false,
      currentItem: {}
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 120
    },
    baseUrl() {
      let baseUrl = ''
      if (process.env.BASE_API.startsWith('https://www.raise-wisdom.com')) {
        // 生产
        baseUrl = 'https://www.raise-wisdom.com/'
      } else {
        // 测试
        baseUrl = 'http://www.fascte.cn:9201/'
      }
      return baseUrl
    }
  },
  created() {
    this.searchHandle()
  },
  mounted() {},
  methods: {
    searchHandle() {
      baseRequest('/course/rwDatabase/getReflectionDiaryList', { productId: 5 }).then(response => {
        this.tableData = response.data.item
      })
    },
    backDoor() {
      this.$router.push({ name: 'learnDoor' })
    },
    openDetail(row) {
      baseRequest('/course/rwDatabase/select', { id: row.id }).then(response => {
        this.currentItem = response.data.item
        this.formVisible = true
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.database {
  .database-container {
    background-color: #ffffff;
    // box-shadow: 0px 2px 10px 0px
    //     rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
    font-size: 16px;
    position: relative;
    padding-top:40px;
    .backdoor-btn{
        position: absolute;
        top: 30px;
        right: 40px;
        color: #D9001B;
        cursor: pointer;
        &:hover{
            text-decoration: underline;
        }
    }
    .database-item{
        padding: 30px 20px 25px;
        border-bottom: 1px dashed #ccc;
        cursor: pointer;
        // &:first-child{
        //     border-top: none;
        // }
        .database-head{
            margin-bottom: 10px;
            font-size: 22px;
            .database-head-icon{
                color: #00afff;
            }
            .database-label{
                margin-left: 5px;
            }
        }
        .database-content{
            margin-top: 15px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space:nowrap;
        }
    }
  }
}
.database-detail-box{
    .database-detail-head {
        margin-bottom: 25px;
        .database-detail-image-box{
            float: left;
            img{
                height: 250px;
                display: block;
            }
        }
        .database-detail-jj{
            float: left;
            margin-left: 20px;
            padding-top: 5px;
            .detail-jj-item{
                margin-bottom: 10px;
                .detail-jj-label{
                    color:#666666;
                }
                .detail-jj-value{
                     color:#222222;
                }
            }
        }
    }
    .database-file-content{
        line-height: 28px;
        .content-tjly{
            color: #000;
            font-size: 17px;
        }
    }
}
</style>