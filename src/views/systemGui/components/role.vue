<template>
     <div class="bt-content" style="padding:24px 23px">
           <div style="width: 1393px;">
               <h1 class="systitle">筛选查询</h1>
              <el-form  :inline="true"  ref="form" :model="form" label-width="80px" class="sysquery">
                      <el-form-item label="" class="formitem">
                          <span>角色名称</span>
                          <el-input style="width: 326px;height: 40px;" placeholder="请填写角色名" v-model="form.name"></el-input>
                      </el-form-item>
                       <div class="operation">
                             <el-button @click="searchOption"  style="width: 90px;height: 30px;line-height:0.5;" type="primary">查询</el-button>
                       </div>
                       
             </el-form>
           </div>
           <div style="width: 1392px;height: 1px;border: dashed  1px #aaaaaa;margin-top:40px;margin-bottom:23px"></div>
           <div style="width:1393px"> 
                <h1 class="systitle" style="margin-bottom:20px">数据列表</h1>
                     <el-table
                         v-loading="loading"
                         :height="tableHight"
                         class="table-main"
                          :data="tableData"
                         row-key="planId"
                         border
                         default-expand-all
                         style="width: 100%">
                             <el-table-column
                            label=" "
                              align="center" 
                             type="index"
                             width="50">
                           </el-table-column>
      
            <el-table-column
            prop="roleName"
            label="角色名称"
            align="center" >
            </el-table-column>
            <el-table-column
            prop="updateTime"
            align="center"
            label="修改时间">
            </el-table-column>
            <el-table-column
                align="center"
                width="200">
                <!-- <template slot="header">
                   <a class="table-header-title"><svg-icon  icon-class="icon-add" /> 添加</a>
                </template> -->
                <template slot-scope="scope">
                    <el-button
                    v-if="scope.row.roleType==='2'"
                    @click.native.prevent="openCoach(scope.row)"
                    type="warning"
                    size="mini">
                    {{maxper?'配置':'查看'}}
                    </el-button>
                    <el-button
                    @click.native.prevent="deleteRow(scope.row)"
                    type="primary"
                    size="mini">
                    修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
         <sur-pagination :pageNo="pageNo"
                       :total="total"
                       :pageSize="pageSize"
                        @size-change="handleSizeChange"  @current-change="handleCurrentChange"></sur-pagination>
           </div>
            <div  v-if="addPop" class="mengban">
             <div class="box">
               <div class="boxt clearfix"><span>修改</span> <span @click="addPop = false" class="close"><svg-icon  icon-class="icon-rong" ></svg-icon></span></div>
               <div class="boxcontent">
                  <el-form class="formadd"  :model="addform"  label-width="80px">
                      <el-form-item label="" prop="oldphone">
                        <span>旧用户名</span>
                         <el-input v-model="addform.oldphone" disabled clearable ></el-input>
                      </el-form-item>
                      <el-form-item label="" prop="newphone">
                        <span>新用户名</span>
                         <el-input v-model="addform.newphone" clearable :class="{borderG:phoneColor===1,borderR:phoneColor===2}" @focus="focusColor('phoneColor')" @blur="blurColor('phoneColor')"></el-input>
                      </el-form-item>
                   
                  </el-form>
                   <div class="login-error">{{errMsg}}</div>
               </div>
                  <el-button @click="addcommit" class="addcommit" type="primary">确定</el-button>
             </div>
           </div>
            <el-dialog
          title="教练管理"
          :visible.sync="updateVisible"
          class="dialog-main height80 noPaddingRight"
          top="5%"
          :close-on-click-modal="false"
          >
          <coachment ref="coachment" :roleId="roleId" :userPhone='userPhone' :maxper='maxper'></coachment>
          <!-- <update v-if="updateVisible" ref="gpsUpdate" :planId="updateId" :isMinTarget="isMinTarget"></update> -->
          <!-- <span slot="footer">
            <span class="dialog-error-msg">{{errorText}}</span>
            <el-button  @click="updateVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateDone">确 定</el-button>
          </span> -->
        </el-dialog>
        </div>
</template>
<script>
import { baseRequest, baseSearch } from '@/api/base'
import coachment from './coachMent'
export default {
  components: {
    coachment
  },
  data() {
    return {
      userPhone: '',
      maxper: false,
      updateVisible: false,
      roleId: null,
      errMsg: '',
      addPop: false,
      btGroup: ['用户管理', '角色管理', '课程管理'],
      btSclect: 0,
      phoneColor: 0,
      form: {
        name: '',
        region: ''

      },
      addform: {
        oldphone: '',
        newphone: ''

      },
      loading: false,
      tableData: [],
      pageNo: 1,
      total: null,
      pageSize: 15
    }
  },
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 500
    }
  },
  created() {
    this.searchOption()
    this.maxper = true
    // baseRequest('/user/userLogin/getUserInfo').then(response => {

    //   const userinfo = response.data.item.roleTypes
    //   if (userinfo.indexOf('0') !== -1 || userinfo.indexOf('1') !== -1) {
    //     this.maxper = true
    //     alert(90)
    //   } else if (userinfo.indexOf('2') !== -1) {
    //     this.maxper = false
    //     this.userPhone = response.data.item.loginName
    //     alert(0)
    //   }
    // })
  },
  mounted() {
    this.btSclect = 0
  },
  methods: {
    openCoach(row) {
      this.updateVisible = true
      this.$refs.coachment.searchOption()
      this.roleId = row.roleId
    },
    addcommit() { // 添加提交
      this.errMsg = ''
      if (this.addform.newphone.length < 1) {
        this.userColor = 2
        this.errMsg = '新角色名不能为空'
        return
      }
      // this.addPop = false
      const params = {}
      params.roleId = this.roleId
      params.roleName = this.addform.newphone
      baseRequest('/user/rwRole/update', params).then(response => {
        if (response.code !== 1) {
          const validateMsg = response.data
          if (validateMsg.hasOwnProperty('phone')) {
            this.phoneColor = 2
            this.errMsg = validateMsg.phone
          }
          if (validateMsg.hasOwnProperty('username')) {
            this.userColor = 2
            this.errMsg = validateMsg.username
          }
          return
        }
        this.searchOption()
        this.addPop = false
      })
    },
    btClick(index) {
      this.btSclect = index
    },
    searchOption(page) {
      if (!page) {
        this.pageNo = 1
      }
      this.loading = true
      const param = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      param.userName = this.form.name
      baseSearch('/user/rwRole/selects', param).then(response => {
        this.tableData = response.data.item
        this.total = response.data.total
        this.pageSize = response.data.pageSize
        this.loading = false
      })
    },
    deleteRow(row) {
      this.roleId = row.roleId
      this.addform
      this.errMsg = ''
      this.addform.oldphone = row.roleName
      this.addform.newphone = ''
      this.addPop = true
    },
    handleSizeChange(val) { // 分页
      this.pageSize = val
      this.searchOption()
    },
    handleCurrentChange(val) { // 分页
      this.pageNo = val
      this.searchOption(true)
    },
    focusColor(c) {
      if (c === 'phoneColor') {
        this.phoneColor = 1
      }
      if (c === 'userColor') {
        this.userColor = 1
      }
      if (c === 'captchaColor') {
        this.captchaColor = 1
      }
    },
    blurColor(c) {
      if (c === 'phoneColor') {
        this.phoneColor = 0
      }
      if (c === 'userColor') {
        this.userColor = 0
      }
      if (c === 'captchaColor') {
        this.captchaColor = 0
      }
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
           	border-radius: 10px 10px 10px 10px;
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
               .mengban{
                 width: 100%;
                 height: 100%;
                //  z-index: 9999999;
                 background-color: rgba(22,22,22,.5);
                 position: absolute;
                 top: 0;
                 left: 0;
                 .box{
                   width: 340px;
                   height: 318px;
                   background-color: #f4f4f4;
                   box-shadow: 0px 2px 10px 0px 	rgba(0, 0, 0, 0.2);
                   border-radius: 10px;
                   position: absolute;
                   top:50%;
                   margin-top: -159px;
                   left: 50%;
                     margin-left: -170px;
                     padding-top: 15px;
                   .boxt{
                     width: 281px;
                     height: 20px;
                     margin: 0 auto;
                     span{
                       float: left;
                     }
                     .close{
                       float: right;
                       cursor: pointer;
                     }
                   }
                   .boxcontent{
                     width: 340px;
                     height: 208px;
                     background-color: #ffffff;
                     box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
                     border-radius: 10px;
                     margin-top: 17px;
                     padding:16px 30px;
                     .userinfo{
                       height:32px;
                       line-height: 32px;
                       font-size: 16px;
                     }
                    .login-error{
	        height: 15px;
          text-align: center;
	        font-family: PingFangSC-Regular;
	        font-size: 14px;
	        font-weight: normal;
	        font-stretch: normal;
	        line-height: 25px;
	        letter-spacing: 0px;
	        color: #fb664a;
          margin-top: -3px;
       }
                   }
                   .addcommit{
                     width: 90px;
                     height: 30px;
                     line-height: .5;
                     position: absolute;
                     right: 30px;
                     bottom: 15px;
                     background-color: #00afff;
                     border-radius: 4px;
                   }
                 }
               }
    }
}
</style>
<style lang="scss">
 .borderG{
         input{
           border-color: #00afff;
         }
       }
         .borderR{
         input{
           border-color: #F56C6C;
         }
       }
  .formadd{
    .el-form-item{
      margin-bottom:10px
    }
   .el-form-item__content{
     margin: 0 !important ; 
    }
  }
</style>