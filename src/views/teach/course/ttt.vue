<template>
  <div class="learn">
    <div
      class="learn-container inside-container"
      :style="{ minHeight: minHeight + 'px' }"
    >
      <h3 class="learn-title">TTT资料库</h3>
      <!-- 头部 -->
      <el-form class="learn-form" style="text-align:center;" :inline="true" :model="formData">
        <el-form-item>
            <el-select style="width:150px;" v-model="formData.productId" placeholder="请选择">
              <el-option value="0" label="全部"></el-option>
              <el-option
                v-for="item in options"
                :key="item.productId"
                :label="item.productName"
                :value="item.productId"
              ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-input style="width:800px;" v-model="formData.title" placeholder="" clearable>
                 <el-button style="background-color:#00afff;color:#fff;" slot="append" icon="el-icon-search" type="primary" @click="listSearchHandle()">搜索</el-button>
            </el-input>
        </el-form-item>
      </el-form>
      <div class="learn-line"></div>
      <div class="ttt-container clearfix">
        <div class="ttt-tree">
         <div class="tree-item" v-for="item in treeList" :key="item.productId">
           <div class="tree-project">
             {{item.kinds}}
           </div>
           <div class="tree-project-list">
              <div class="tree-project-item" :class="{active:currentNode.operation === it.operation}"  v-for="it in item.childList" :key="it.operation" @click="nodeClickHandle(it,item.productId)">
                    <el-tooltip class="item" effect="dark" :content="it.kinds" placement="top">
                      <span>{{it.kinds}}</span>
                    </el-tooltip>
              </div>
           </div>
         </div>
        </div>
        <div class="ttt-list">
          <!-- 项目的列表 -->
          <ul class="learn-list" v-if="learnList.length > 0 ">
            <!-- First Step -->
            <li
              class="learn-item clearfix"
              v-for="(item, index) in learnList"
              :key="item + index"
              @click="openhandle(item)"
            >
                <div class="ttt-title">
                    <svg-icon v-if="item.type==='3'" style="color:#ed6d00;" class="ttt-tile-icon" icon-class="movie"></svg-icon>
                    <svg-icon v-if="item.type==='5'" class="ttt-tile-icon" icon-class="icon-pdf"></svg-icon>
                    {{item.title}}</div>
                <!-- <div class="ttt-content">{{item.content}}</div> -->
            </li>
          </ul>
          <div class="no-crouse-list" v-else>暂无数据</div>
                <!-- 分页 -->
          <sur-pagination
            v-if="total > pageSize"
            :pageNo="pageNo"
            :total="total"
            :pageSize="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </sur-pagination>
        </div>
      </div>
      
    </div>
    <el-dialog
      append-to-body
      :visible.sync="visible"
      class="dialog-main"
      :class="{height80:currentItem.type === '5','no-padding':currentItem.type === '5',heightauto:currentItem.type === '3'}"
      :title="currentItem.title"
      top="5%"
      width="800px"
      destroy-on-close
      :close-on-click-modal="false">
      <div class="pdf" style="min-height:300px;" v-if="visible && currentItem.type === '5'" v-loading="loading">
        <div v-if="!pageCount" class="pad-tip"><i class="el-icon-loading"></i>加载中，请稍后...</div>
        <pdf v-if="pdfUrl && refresh"
            :src="pdfUrl"
            :page="currentPage"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
            class="pdf-set"
        ></pdf>
      </div>
      <video v-if="currentItem.type === '3' && visible" ref="learnVideo" oncontextmenu="return false;" autoplay  controls  controlslist="nodownload" name="media" width="100%"  class="video_detial">
            <source :src="baseUrl + currentItem.productUrl.split('/ROOT/')[1]" >
        </video>
      <span slot="footer">
        <template v-if="pageCount && currentItem.type === '5'" >
            {{currentPage}} / {{pageCount}}
            <el-button  @click="change1">上一页</el-button>
            <el-button  @click="change2">下一页</el-button>
        </template>
        <el-button  @click="visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { baseRequest } from '@/api/base'
import { baseDownLoad } from '@/api/base'
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  data() {
    return {
      formData: {
        productId: '0',
        title: ''
      },
      pageNo: 1,
      pageSize: 10,
      total: null,
      learnList: [],
      treeList: [],
      // 头部项目的选择
      options: [
      ],
      visible: false,
      currentItem: {},
      pdfUrl: '',
      loading: false,
      numPages: 0,
      currentPage: 1,
      pageCount: null,
      refresh: true,
      currentNode: {},
      searchUrl: '/course/rwDatabase/selectAll'
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
    this.getoptions()
    this.getTree()
  },
  mounted() {},
  methods: {
    change1() {
      if (this.currentPage > 1) {
        this.refresh = false
        this.$nextTick(_ => {
          this.currentPage--
          this.refresh = true
        })
      }
    }, change2() {
      if (this.currentPage < this.pageCount) {
        this.refresh = false
        this.$nextTick(_ => {
          this.currentPage++
          this.refresh = true
        })
      }
    },
    openhandle2(item) {
      this.currentItem = item
      this.visible = true
      this.pageCount = null
      this.currentPage = 1
      this.pdfUrl = this.baseUrl + item.productUrl.split('/ROOT/')[1]
    },
    openhandle(item) {
      this.currentItem = item
      this.visible = true

      if (item.type === '5') {
        // this.pdfUrl = ''
        // this.$nextTick(_ => {
        //   this.pageCount = null
        //   this.currentPage = 1
        //   this.pdfUrl = this.baseUrl + item.productUrl.split('/ROOT/')[1]
        // })
        this.pageCount = null
        this.currentPage = 1
        this.pdfUrl = ''
        this.$nextTick(_ => {
          if (this.$store.state.app.pdfConfig[item.id + '']) {
            this.pdfUrl = this.$store.state.app.pdfConfig[item.id + '']
          } else {
            baseDownLoad('/course/rwDatabase/getPDF', { id: item.id }).then(response => {
              const pdfUrl = window.URL.createObjectURL(response.data)
              if (item.id === this.currentItem.id) {
                this.pdfUrl = pdfUrl
              }
              this.$store.dispatch('addPdfConfig', { id: item.id + '', pdfUrl })
            })
          }
        })
      }
    },
    getoptions() {
      baseRequest('/user/rwProductConfig/selectPermission', { id: '3' }).then(response => {
        this.options = response.data.item
        this.searchHandle()
      })
    },
    nodeClickHandle(it, productId) {
      this.currentNode = it
      this.currentNode.productId = productId
      this.searchUrl = '/course/rwDatabase/getTTTTreeChild'
      this.searchHandle()
    },
    getTree() {
      baseRequest('/course/rwDatabase/selectTTTTree', {}).then(response => {
        this.treeList = response.data.item
        console.log(this.treeList)
      })
    },
    listSearchHandle() {
      this.currentNode = {}
      this.searchUrl = '/course/rwDatabase/selectAll'
      this.searchHandle()
    },
    searchHandle(page) {
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        title: this.formData.title
      }
      if (this.currentNode.operation) {
        param.operation = this.currentNode.operation
        param.productId = this.currentNode.productId
      }
      let productList = []
      if (this.formData.productId === '0') {
        // for (const iterator of this.options) {
        //   productList.push(iterator.productId)
        // }
        productList = null
      } else {
        productList.push(this.formData.productId)
      }
      param.productList = productList
      baseRequest(this.searchUrl, param).then(
        (response) => {
          this.learnList = response.data.item
          this.total = response.data.total
        }
      )
    },
    handleSizeChange(val) {
      // 分页
      this.pageSize = val
      this.searchHandle()
    },
    handleCurrentChange(val) {
      // 分页
      this.pageNo = val
      this.searchHandle(true)
    }
  }
}
</script>
<style lang="scss" scoped>
.pdf{
  position: relative;
}
.pad-tip{
  margin-top: 150px;
  font-size: 20px;
  color: #00afff;
  text-align: center;
}
// 头部项目选择
.el-select {
  width: 300px;
}
.learn {
  .learn-container {
    background-color: #ffffff;
    // box-shadow: 0px 2px 10px 0px
    //     rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 24px;
    margin-top: 30px;
    .learn-title {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      font-weight: bold;
    }
    .learn-form {
      margin-top: 18px;
      .learn-label {
        height: 28px;
        line-height: 28px;
      }
      .learn-input {
        width: 300px;
        margin-right: 8px;
      }
    }
    .learn-line {
      height: 1px;
      border: dashed 1px #ccc;
    }
    .ttt-tree{
      float: left;
      width: 350px;
      padding: 30px;
      padding-left: 0px;
      padding-right: 60px;
      .tree-item{
        margin-bottom: 30px;
        .tree-project{
          font-weight: bold;
          font-size: 18px;
          color: #111;
        }
        .tree-project-list{
          margin-top: 20px;
          padding-left: 25px;
        }
        .tree-project-item{
          margin-bottom: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          &.active{
            color: #00afff;
          }
        }
      }
    }
    .ttt-list{
      width: calc(100% - 350px);
      float: left;
    }
    .learn-list {
      .learn-item {
        margin-top: 24px;
        position: relative;
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        border: solid 1px #eeeeee;
        padding: 14px;
        overflow: hidden;
        position: relative;
        padding: 20px 14px;
        cursor: pointer;
        .ttt-title{
            font-weight: bold;
            .ttt-tile-icon{
                color:#00afff;
                font-size: 18px;
            }
        }
      }
    }
    .no-crouse-list {
      text-align: center;
      padding-top: 200px;
      font-size: 30px;
      color: #00afff;
      font-weight: 600;
    }
  }
}
</style>