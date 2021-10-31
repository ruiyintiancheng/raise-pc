<template>
    <div class="learn-coach">
       <div class="learn-container inside-container">
            <div class="learn-head">
                <h3 class="learn-title">
                    <span class="learn-title-f">1-1教练会谈</span>
                    <span class="learn-line">/</span>
                    <span class="learn-title-x" >选择教练</span> 
                    <span class="learn-line"></span>
                </h3>
            </div>
            <div class="fg-line"></div>
            <el-row class="seek">
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                        <el-input placeholder="请输教练名字" class="seek-input" v-model="keyWords"></el-input>
                        <el-button type="primary" class="seek-btn" @click= searchCoach()>查询</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-table
            ref="table"
            class="table-main course-table"
            :data="tableData"
            style="width: 100%"
            border
            :height="tableHight"
            @current-change="handleCurrentRowChange"
            >
            <el-table-column label=" " width="50" align="center">
                <template slot-scope="scope">
                <el-radio :disabled="scope.row.status" v-model="radio" :label="scope.row"><span></span></el-radio>
                </template>
            </el-table-column>
            <el-table-column label="序号" type="index" align="center"  width="80" />
            <el-table-column label="教练名称" prop="userName" align="center" min-width="30%"/>
            <el-table-column label="教练简介" prop="coachIntro" align="center" />
            </el-table>
            <sur-pagination
              style="border: solid 1px #bbbb;height: 60px"
              :pageNo="pageNo"
              :total="total"
              :pageSize="pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
            </sur-pagination>
            <div class="table-footer">
                <el-button type="primary" class="sub-btm" @click="subCoachName()">确定</el-button> 
            </div> 
        </div> 
            
             
       <!-- </div> -->
    </div>
</template>
<script>
    import { baseRequest } from '@/api/base'
    export default {
      data() {
        return {
          tableData: [],
          tableCoach: [],
          item: null,
          orderId: null,
          total: null,
          pageSize: 10,
          pageNo: 1,
          coachName: null,
          keyWords: null,
          radio: null
        }
      },
      methods: {
        handleSizeChange(val) {
          // 分页
          this.pageSize = val
          this.queryCoachList()
        },
        handleCurrentChange(val) {
          // 分页
          this.pageNo = val
          this.queryCoachList(true)
        },
        searchCoach() {
          this.coachName = this.keyWords
          if (this.coachName === null) {
            this.$Message.warning('请输入教练名字')
          } else {
            this.queryCoachList(true)
          }
        },
        // 获取学员选择教练列表
        queryCoachList(page) {
          if (!page) {
            this.pageNo = 1
          }
          this.loading = true
          const params = {
            orderId: this.orderId,
            pageSize: this.pageSize,
            pageNo: this.pageNo,
            coachName: this.coachName
          }
          baseRequest('/user/rwCoach/getOneToOneCoachList', params).then(response => {
            if (response.msg === 'Success') {
              this.tableCoach = response.data.item
              this.tableData = response.data.item
              this.total = response.data.total
            } else {
              this.$Message.info('暂无数据')
            }
          })
        },
        handleCurrentRowChange(val) {
          if (val.status) {
            return
          }
          this.radio = val
          // console.log(val)
        },
        // 选择教练
        subCoachName() {
          if (this.radio == null) {
            this.$Message.warning('请选择教练')
          } else {
            this.$confirm('确定选择教练?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              const params = {
                recordId: this.item.recordId,
                coachId: this.radio.userId,
                productId: this.item.productId
              }
              baseRequest('/course/oneToOne/setRecordCoach', params).then(response => {
                if (response.msg === 'Success') {
                  this.$Message.success('选择成功')
                  this.$router.push({ name: 'learn' })
                }
              })
            }).catch(() => {})
          }
        }
      },
      created() {
        this.item = this.$route.query.row
        this.orderId = this.$route.params.orderId
        // console.log(this.item)
        this.queryCoachList()
      },
      computed: {
        tableHight() {
          return this.$store.state.app.containHeight - 402
        }
  }
    }
</script>
<style lang="scss">
.learn-coach{
    .learn-container{
        background-color: #ffffff;
        box-shadow: 0px 2px 10px 0px 
            rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding:24px;
        margin-top:30px;
        margin-bottom: 30px;
        padding-bottom:78px;
        position: relative;
        .learn-head{
          position: relative;
        }
        .learn-title{
            font-family: PingFangSC-Semibold;
            font-size: 18px;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #888888;
            font-weight: bold;
            .learn-line{
              margin:0 10px;
            }
            .learn-title-f{
              cursor: pointer;
              color: #1b1b1b;
              font-weight: 100;
            }
            .learn-title-s{
              color: #1b1b1b;
              font-weight: 100;
            }
            .learn-title-x{
                font-weight: bold;
                color: black;
            }
        }
        .fg-line{
          height: 1px;
	        border: dashed 1px #ddd;
          margin-top: 24px;
        }
        .seek{
            margin-top: 50px;
            margin-bottom: 30px;
            .seek-btn{
                margin-left: 20px;
                width: 100px;
            }
            .seek-input{
                width: 260px;
            }
        }
        .course-table {
          margin-top: 20px;
        }
        .table-footer{
                text-align: right;
                box-sizing: border-box;
                padding-top: 30px;
                .sub-btm{
                    width: 120px;
                }
            }
    }
}
</style>