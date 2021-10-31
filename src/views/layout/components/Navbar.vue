/*
 * @Author: lk 
 * @Date: 2018-09-21 14:54:24 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2021-07-13 17:47:03
 * @Description:  
 */
<template>
  <div>
      <div class="navbar no-text-select">
        <div class="navbar-container inside-container clearfix">
            <div class="navbar-left fl clearfix">
                <!-- <div class="logo">
                    <h1><a href="javascript:;"
                      :style="{backgroundImage:'url('+logo+')'}">睿思智得线上辅导系统</a></h1>
                  </div> -->
                <h1 class="logo-name fl">
                  <a class="lmi-logo"  v-if="menuStatus === '0'" @click="$router.push('/')">LMI</a>
                  <a v-else @click="$router.push('/')">睿思智得线上辅导系统</a>
                </h1>
                <nav class="menu fl" :class="{'menu-pc':menuPc}">
                  <ul class="clearfix" v-if="menuStatus === '0'">
                      <li class="menu-item fl" @click="navigateTo('home')" :class="{active:isActive({name:'home'})}">
                        <svg-icon class="menu-icon" icon-class="icon-shouye" />
                        <a class="menu-title">首页</a>
                      </li>
                      <li class="menu-item fl" @click="navigateTo('targetTool')" :class="{active:isActive({name:'targetTool'})}">
                        <svg-icon class="menu-icon" icon-class="icon-shouce" />
                        <a class="menu-title">LMI•SP</a>
                      </li>
                  </ul>
                  <ul class="clearfix" v-else>
                    <template v-for="(item,index) in menu" >
                      <li v-if="!item.children && item.meta && roleMenu(item.meta)" class="menu-item fl" @click="navigateTo(item.name)" :key="item+index" :class="{active:isActive(item)}">
                        <svg-icon  class="menu-icon" v-if="item.meta.icon" :icon-class="item.meta.icon" />
                        <a class="menu-title">{{item.meta.title}}</a>
                      </li>
                      <li v-else-if="item.meta && roleMenu(item.meta)" class="menu-item fl" :key="item+index" :class="{active:isActive(item)}" @mouseenter="floorHandle(item.name)" @mouseleave="floorLeaveHandle()">
                        <svg-icon class="menu-icon" v-if="item.meta.icon" :icon-class="item.meta.icon" />
                        <a class="menu-title">{{item.meta.title}}</a>
                        <ul class="menu-floor" v-if="currentFloor === item.name">
                          <template v-for="(item,index) in item.children">
                            <li class="menu-floor-item" v-if="item.meta && roleMenu(item.meta)" @click="navigateTo(item.name)" :class="{active:isActive(item)}"  :key="item+index">
                              <div class="menu-floor-item-text">
                                <svg-icon class="menu-floor-icon" v-if="item.meta.icon" :icon-class="item.meta.icon" />
                                {{item.meta.title}}
                              </div>
                            </li>
                          </template>
                        </ul>
                        <div class="menu-floor-zw" v-if="currentFloor === item.name"></div>
                      </li>
                    </template>
                  </ul>
                </nav>
            </div>
            <div class="navbar-right fr">
              <div v-if="name" class="user-box"  @mouseleave="userOptionsVisable=false">
                <svg-icon class="user-icon" icon-class="user" @mouseenter="userOptionsVisable=true"></svg-icon>
                <span class="user-name" @mouseenter="userOptionsVisable=true">{{name}}</span>&nbsp;
                <div class="user-message" @click="checkNews">
                  <el-badge :value="newsCount" :max="99" class="" :hidden="!newsCount" >
                      <svg-icon class="message-icon" icon-class="envelope" ></svg-icon>
                  </el-badge>
                </div>
                <ul class="user-options" v-if="userOptionsVisable" >
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'0'})">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-jibenxinxi"></svg-icon>
                    </div>
                    <span class="user-options-title">基本信息</span>
                  </li>
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'1'})" v-if="menuStatus !== '0' && haibaoViasible">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-haibao"></svg-icon>
                    </div>
                    <span class="user-options-title">专属海报</span>
                  </li>
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'2'})" v-if="menuStatus !== '0'">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-jifen"></svg-icon>
                    </div>
                    <span class="user-options-title" >我的积分</span>
                  </li>
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'3'})" v-if="menuStatus !== '0' && quanyiViasible">
                    <div class="user-options-icon-box">
                      <svg-icon class="icon-quanyi" icon-class="icon-quanyi"></svg-icon>
                    </div>
                    <span class="user-options-title">销售情况</span>
                  </li>
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'4'})" v-if="menuStatus !== '0'">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-chengjiu"></svg-icon>
                    </div>
                    <span class="user-options-title">我的成就</span>
                  </li>
                  <li class="clearfix" @click="navigateTo('mymy',{tab:'5'})">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-lishi"></svg-icon>
                    </div>
                    <span class="user-options-title">购买历史</span>
                  </li>
                  <li class="clearfix" @click="changeMode">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="qiehuan"></svg-icon>
                    </div>
                    <span class="user-options-title" v-if="menuStatus !== '0'">切换LMI</span>
                    <span class="user-options-title" v-else>切换常规</span>
                  </li>
                  <li class="clearfix" @click="logout">
                    <div class="user-options-icon-box">
                      <svg-icon  icon-class="icon-logout"></svg-icon>
                    </div>
                    <span class="user-options-title">退出</span>
                  </li>
                </ul>
                <div class="user-options-zw"></div>
              </div>
              <a v-else @click="toLogin">
                  <div class="login-btn" type="primary">登录/注册</div>
              </a>
            </div>
        </div>
      </div>
      <div class="navbar-placeholder"></div>
      <el-dialog
          title="我的消息"
          :visible.sync="dialogVisible"
          class="news-dialog dialog-main heightauto"
          top="10%"
          width="620px"
          destroy-on-close
          >
          <el-table
        class="table-main"
      :data="tableData"
      :height="tableHeight+'px'"
       border
      style="width: 100%;">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="消息"
        show-overflow-tooltip
        >
        <template slot-scope="scope">
          <a class="un-read" v-if="scope.row.status === '0'" @click="checkDetail(scope.row)">{{scope.row.scheduleType==='6'?'管理员回复:':''}}{{scope.row.content}}</a>
          <a v-else @click="checkDetail(scope.row)">{{scope.row.scheduleType==='6'?'管理员回复:':''}}{{scope.row.content}}</a>
        </template>
      </el-table-column>
      <el-table-column
      width="80"
      align="right"
        label="">
        <template slot-scope="scope">
          <el-button type="danger" 
          plain
          @click="deleteNew(scope.row)" 
          size="mini">
          删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <sur-pagination
        :pageNo="pageNo"
        :total="total"
        :pageSize="pageSize"
        @size-change="handleSizeChange"  @current-change="handleCurrentChange">
    </sur-pagination>
            <span slot="footer" v-if="showNoTip">
                    <div style="position:absolute;top:0;">
                      <el-checkbox v-model="todayNoTip">今天内不再提示</el-checkbox>
                    </div>
                    <el-button @click="dialogVisible = false">关闭</el-button>
                    <el-button type="primary" @click="todayNoTipHandle">确定</el-button>
            </span>
      </el-dialog>
      <el-dialog
          :title="messageTitle"
          :visible.sync="newsVisible"
          class="news-dialog dialog-main heightauto"
          top="13%"
          width="420px"
          destroy-on-close
          >
            <ul class="message-box" v-if="scheduleType==='6'">
              <h3>留言内容:</h3>
              <div style="padding:10px;">
              <p style="line-height:24px" v-html="questionHtml"></p>
              </div>
              <h3>回复:</h3>
              <div style="padding:10px">
                <p style="line-height:24px" v-html="messageHtml"></p>
              </div>
            </ul>
             <ul class="message-box" v-else>
              <p v-html="messageHtml"></p>
            </ul>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { openWebSocket, closeWebSocket } from '@/utils/websocket'
import { baseRequest } from '../../../api/base'
import { getToken } from '@/utils/auth'
import { IsPC } from '@/utils'
// import { baseRequest } from '../../../api/base'
// import { baseRequest } from '@/api/base'
// import logo from '@/assets/logo/logo.png'
export default {
  created() {
    this.getNewsCount().then(_ => {
      openWebSocket(function(result) {
        console.log(result)
        result = JSON.parse(result)
        if (typeof (result) !== 'object') return
        const h = this.$createElement
        const notify = this.$notify({
          title: result.msgTitle ? result.msgTitle : '消息',
          dangerouslyUseHTMLString: true,
          message: h('span', {// 内容 可点击弹框
            on: {
              click: _ => {
                // this.openNotify(result.msgId)
              }
            }
          }, result.msgContent),
          duration: 0, // 显示时间, 毫秒。设为 0 则不会自动关闭
          offset: 250, // 位置
          showClose: true, // 是否展示可关闭按钮
          iconClass: 'el-icon-bell' // 自定义图标的类名，会覆盖 type
        })
        this.notifyList.push(notify)
        this.getNewsCount()
      }.bind(this))
      if (this.newsCount > 0) {
        // this.getNotice()
      }
    })
    // const h = this.$createElement
    // const notify = this.$notify({
    //   title: '消息',
    //   dangerouslyUseHTMLString: true,
    //   message: h('span', {// 内容 可点击弹框
    //     on: {
    //       click: _ => {
    //         // this.openNotify(result.msgId)
    //       }
    //     }
    //   }, '一条测试消息'),
    //   duration: 0, // 显示时间, 毫秒。设为 0 则不会自动关闭
    //   offset: 250, // 位置
    //   showClose: true, // 是否展示可关闭按钮
    //   iconClass: 'el-icon-bell' // 自定义图标的类名，会覆盖 type
    // })
  },
  mounted() {
    this.$nextTick(_ => {
      if (!IsPC()) {
        this.menuPc = false
        const doms = document.querySelectorAll('.menu-item')
        doms.forEach(item => {
          item.style.fontSize = '12px'
          item.style.margin = '0 10px'
        })
      }
    })
  },
  watch: {
    name() {
      // this.$nextTick(_ => {
      //   const messageDom = document.querySelector('.navbar-right .user-box .el-badge__content')
      //   messageDom.onclick = this.checkNews
      // })
    }
  },
  destroyed() {
    closeWebSocket()
    for (const notify of this.notifyList) {
      if (notify) {
        notify.close()
      }
    }
  },
  data() {
    return {
      tableData: [],
      scheduleType: '0',
      questionHtml: '',
      currentFloor: null,
      userOptionsVisable: false,
      newsCount: 0,
      dialogVisible: false,
      newsVisible: false,
      messageTitle: '',
      messageHtml: '',
      pageNo: 1,
      pageSize: 10,
      total: null,
      notifyList: [], // 右侧notify列表
      // 权限
      haibao: ['2', '4', '7', '5', '6'],
      quanyi: ['3', '7'],
      showNoTip: false,
      todayNoTip: true,
      menuPc: true
    }
  },
  computed: {
    ...mapGetters([
      'bgColor',
      'menu',
      'addRouters',
      'name',
      'menuStatus',
      'roles'
    ]),
    tableHeight() {
      return document.body.offsetHeight * 0.5 - 60
    },
    haibaoViasible() {
      return true
      // return this.haibao.some(item => this.roles.find(it => it === item))
    },
    quanyiViasible() {
      return this.quanyi.some(item => this.roles.find(it => it === item))
    }
  },
  components: {
  },
  methods: {
    todayNoTipHandle() {
      if (this.todayNoTip) {
        baseRequest('/user/rwNoticeStatus/add')
      }
      this.dialogVisible = false
    },
    getNotice() {
      baseRequest('/user/rwNoticeStatus/selectType').then(response => {
        if (!response.data.item.result) {
          this.checkNews()
          this.showNoTip = true
        }
      })
    },
    // 切换模式
    changeMode() {
      this.$confirm('确定切换到' + (this.menuStatus === '0' ? '睿思智得' : 'LMI') + '吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/user/userLogin/changeMenuStatus').then(response => {
          location.reload()
        })
      })
    },
    // 获取未读文件数
    getNewsCount() {
      return new Promise((resolve) => {
        if (this.name && getToken()) {
          baseRequest('/user/rwNotice/getNoticeCount').then(response => {
            this.newsCount = response.data.item.result
            resolve()
          })
        } else {
          resolve()
        }
      })
    },
    // 角色判断菜单
    roleMenu(meta) {
      if (meta.roles) {
        const currentRoles = this.$store.state.user.roles
        return currentRoles.some(item => {
          return meta.roles.find(it => it === item)
        })
      } else {
        return true
      }
    },
    checkNews() {
      this.showNoTip = false
      this.searchHandle()
      this.dialogVisible = true
    },
    checkDetail(row) {
      if (row.status === '0') {
        baseRequest('/user/rwNotice/updateStatus', { noticeId: row.noticeId }).then(_ => {
          this.searchHandle(true)
          this.getNewsCount()
        })
      }
      this.scheduleType = row.scheduleType
      this.questionHtml = row.summary
      this.messageHtml = row.content
      this.messageTitle = row.noticeTitle
      this.newsVisible = true
    },
    navigateTo(name, query) {
      if (name === 'targetTool') {
        if (this.name) {
          baseRequest('/objective/rwGoalPermission/isAvailable', { date: new Date().getTime() }).then(response => {
            const openFlag = response.data.item.openFlag
            const payFlag = response.data.item.payFlag
            if (openFlag === '1') {
              this.$router.push({ name })
            } else {
              if (payFlag === '1') {
                this.$router.push({ name: 'sp' })
              } else {
                this.$Message(
                  {
                    message: '您的LMI•SP将在First Step项目结束后开启',
                    showClose: true,
                    type: 'warning',
                    duration: 5 * 1000
                  }
                )
              }
            }
          })
        } else {
          this.$router.push({ name: 'sp' })
        }
        // this.$router.push({ name })
      } else {
        if (query) {
          this.$router.push({ name, query })
        } else {
          this.$router.push({ name })
        }
      }
    },
    isActive(item) {
      if (this.$route.name === 'home' && item.name === 'home') {
        return true
      } else if (this.$route.name === item.name || this.$route.path.startsWith(`/${item.path}/`)) {
        return true
      } else {
        return false
      }
    },
    deleteNew(row) {
      baseRequest('/user/rwNotice/deleteLog', { noticeId: row.noticeId }).then(response => {
        this.searchHandle()
        this.getNewsCount()
      })
    },
    searchHandle(page) {
      if (!page) {
        this.pageNo = 1
      }
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      baseRequest('/user/rwNotice/viewLog', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
      })
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchHandle()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchHandle(true)
    },
    floorHandle(name) {
      this.currentFloor = name
    },
    floorLeaveHandle(name) {
      this.currentFloor = null
    },
    logout() {
      this.$confirm('确定注销当前登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()
        })
      })
    },
    toLogin() {
      location.href = location.origin + '/login'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$navbarHieght:60px;
$menuMaring:15px;
$activeColor:#00afff;
@media  (max-width: 1440px) and (min-width:1200px){
  .navbar{
    .navbar-container.inside-container{
      width: 100%;
      .menu{
        .menu-item{
          margin: 0 5px;
        }
      }
    }
  }
}
@media  (max-width: 1250px) and (min-width:1000px){
  .navbar{
    .navbar-container.inside-container{
      width: 100%;
      .menu{
        .menu-item{
          margin: 0 5px;
          font-size: 12px;
        }
      }
    }
  }
}
@media  (max-width: 1090px){
  .navbar{
    .navbar-container.inside-container{
      width: 100%;
      .menu-pc{
        display: none;
      }
    }
  }
}
// @media  (max-width: 1440px){
//   .navbar{
//     .navbar-container.inside-container{
//       width: 100%;;
//     }
//   }
// }
// @media (max-width: 1120px){
//   .navbar{
//     .navbar-container.inside-container{
//       width: 100%;
//       .menu .menu-item{
//         margin: 0 5px;
//       } 
//     }
//   }
// }
// @media (max-width: 750px){
//   .navbar{
//     .navbar-container.inside-container{
//        .menu{
//         .menu-item{
//           color: red;
//         }
//       }
//     }
//   }
// }
.navbar {
	height: $navbarHieght;
	background-color: #ffffff;
	box-shadow: 0px 2px 10px 0px 
    rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 99;
  top:0;
  left: 0;
  width: 100%;
  .navbar-container{
    height: $navbarHieght;
    background-color: #ffffff;
    // overflow: hidden;
  }
  .logo-name{
    height: $navbarHieght;
    font-family: PingFangSC-Semibold;
    font-size: 0px;
    font-weight: normal;
    font-stretch: normal;
    line-height: $navbarHieght;
    letter-spacing: 1px;
    color: $activeColor;
    margin-right: 35px;
    font-weight: bold;
    a{
      display: block;
      width: 122px;
      height: 42px;
      margin-top:12px;
      background-image: url('../../../assets/logo/logo.png');
      background-repeat: no-repeat;
       background-size: 120px;
      &.lmi-logo{
        display: block;
        margin-top:14px;
        width: 95px;
        height: 38px;
        margin-top: 11px;
        background-image: url('../../../assets/shouye-img/logo-lmi.png');
        background-size: 95px 64px;
      }
    }
  }
  .menu{
    height: $navbarHieght;
    line-height: $navbarHieght;
    .menu-item{
      margin:0 $menuMaring;
      font-family: PingFangSC-Regular;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #222222;
      padding:0 10px;
      position: relative;
      cursor: pointer;
      .menu-floor{
        position: absolute;
        top: 66px;
        left: 0;
        	width: 180px;
          background-color: #ffffff;
          box-shadow: 0px 2px 10px 0px 
            rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          z-index: 99;
          .menu-floor-item{
            font-size: 14px;
            color:#222;
            padding-left: 14px;
            position: relative;
            .menu-floor-item-text{
              height: 44px;
              line-height: 44px;
              border-bottom: 1px solid #dddddd;
              .menu-floor-icon{
                margin-right: 8px;
              }
            }
            &:last-child{
              .menu-floor-item-text{
                border-bottom: none;
              }
            }
            &:hover{
              color: $activeColor;
            }
            &.active{
              color: $activeColor;
              &::before{
                content: "";
                height: 24px;
                width: 4px;
                top: 10px;
                left: 0px;
                background-color: $activeColor;
                position: absolute;
              }
            }
          }
      }
      .menu-floor-zw{
        width: 180px;
        height: 6px;
        position: absolute;
        top: 60px;
        left: 0;
        z-index: 99;
      }

      &:hover .menu-title{
        color:$activeColor;
      }
      &:hover .menu-icon{
        color:$activeColor;
      }
      &.active{ 
        background-image: linear-gradient(#fff, #cff0ff);
        color:$activeColor;
        &:after{
          content: "";
          position: absolute;
          width: 100%;
          height: 4px;
          background-color: $activeColor;
          left: 0;
          bottom:0;
        }
      }
    }
  }
  .navbar-right{
    line-height: $navbarHieght;
    .user-box{
      font-size: 14px;
      color:#222;
      text-align: right;
      position: relative;
      min-width: 200px;
      text-align: right;
      padding-right: 10px;
      .user-message{
        display: inline-block;
        cursor: pointer;
      }
      // &:hover{
      //   .user-name{
      //     color: $activeColor;
      //   }
      // }
      /deep/ .el-badge{
        line-height: initial;
        // .el-badge__content{
        //   cursor: pointer;
        //   right: 3px;
        // }
      }
      .user-icon{
        color: $activeColor;
      }
      .message-icon{
        font-size: 18px;
        color: $activeColor;
      }
      .user-options{
        position: absolute;
        z-index: 99;
        padding: 10px;
        right: 0;
        top:62px;
        background-color: #fff;
        border-radius: 4px;
        width: 180px;
        box-shadow: 0px 2px 10px 0px 
		rgba(0, 0, 0, 0.2);
    font-size: 14px;
        li{
          height: 40px;
          padding-left: 10px;
          border-radius: 4px;
          line-height: 40px;
          text-align: left;
          cursor: pointer;
          color: #222;
          &:hover{
            background-color: #f6f7f8;
          }
          .user-options-icon-box{
            float: left;
            height: 25px;
            line-height: 25px;
            text-align: center;
            width: 25px;
            background-color: #ccefff;
            color: #00afff;
            margin: 8px 10px 0 0;
             .icon-quanyi{
               color:#00AFFF;
             }
          }
          .user-options-title{
            float: left;
          }
        }
      }
      .user-options-zw{
        position: absolute;
        right: 0;
        top:60px;
        height: 2px;
        width: 180px;
        z-index: 99;
      }
    }
    .login-btn{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin-top:15px;
      background-color: $activeColor;
      border-radius: 4px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
}
.navbar-placeholder{
  height: $navbarHieght;
}
.news-dialog{
  .un-read{
    color: #00afff;
    text-decoration: underline;
  }
  .message-box{
    li{
      background-color: #eee;
      padding:10px;
      border-radius: 5px;
      margin-bottom: 15px;
    }
  }
}
</style>
