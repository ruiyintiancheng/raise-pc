<template>
    <!-- 我的挑战 -->
    <div class="challenge" :style="{height:materialsHeight+'px'}">
      <template v-if="!isEx">
        <el-button v-if="!isNewest&&!updateStatus&&(flowNodeNo !== 7 || overSecondWeek)" class="update-btn" type="primary" size="mini" @click="updateStatus=true">编辑</el-button>
        <el-button v-if="!isNewest&&updateStatus&&(flowNodeNo !== 7 || overSecondWeek)" class="update-btn" type="success" size="mini" @click="saveUpdate">保存</el-button>
      </template>
        <el-scrollbar style="height:100%">
          <div class="scrollbar-box">
            <!-- <template v-if="flowNodeNo===7"> -->
            <template >
              <div class="challenge-head">
                  <p><strong>挑战</strong></p>
                  <p>请花一点时间认真思考你未来1～2年想要成为的样子或更胜任当下角色职责时的状态，反思自己可能面临的挑战；同时，再请结合&ldquo;自我评估表&rdquo;中的发现，使挑战更加明确。</p>
                  <p>请在下表列出影响你胜任当下角色职责或长远发展的关键的挑战（最多可以“添加”至5个），并按照它们对你的重要性排序。</p>
                  <p>在写挑战时避免使用&ldquo;如何&rdquo;、&ldquo;怎样&rdquo;等疑问句式，而是尽量以直视问题的方式使用陈述语句来表达挑战。提交后如需修改请点击右上角的“编辑”按钮进行修改。</p>
              </div>
                <el-table
              class="table-main"
                :data="tableDataOne"
                border
                default-expand-all
                style="width: 100%">
                  <el-table-column
                    type="index"
                    label="序号"
                    align="center"
                    width="80">
                </el-table-column>
                <el-table-column
                prop="content"
                align="left"
                label="挑战">
              <!-- <template slot="header">
                  <div class="fl">挑战</div>
                  <div class="fr" @click="addHandle('one')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
              </template> -->
                <template slot-scope="scope">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-if="isNewest || updateStatus"  style="width:100%;" v-model.trim="scope.row.content" placeholder="请输入挑战" show-word-limit maxlength="200"></el-input>
                    <span v-else>{{scope.row.content}}</span>
                </template>
                </el-table-column>
                <el-table-column
                    label="优先级"
                    align="center"
                    width="100px"
                    v-if="isNewest || updateStatus"
                    >
                    <template slot-scope="scope">
                        <el-button v-if="scope.$index === 0" type="primary" size="mini" plain disabled>上移</el-button>
                        <el-button v-else type="primary" size="mini" plain @click="upHandle(scope.$index)">上移</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="100px"
                    v-if="isNewest || updateStatus"
                    >
                    <template slot="header">
                        <div @click="addHandle('one')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                    </template>
                    <template slot-scope="scope">
                        <el-button v-if="scope.$index === 0" type="danger" size="mini" plain disabled>删除</el-button>
                        <el-button v-else type="danger" size="mini" plain @click="deleteHandle(scope.$index,'one')">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="fg-line"></div>
          </template>
          <div class="challenge-head challenge-head-s">
              <p><strong>为改善设立目标</strong></p>
<p>将上述的挑战转化为你决定通过学习要专注达成的S.M.A.R.T.目标（具体的、可衡量的、可达成的、现实的、实质的），它们可能帮助你应对一部分的挑战或者是全部。</p>
          </div>
          <el-table
            class="table-main"
              :data="tableDataTwo"
              border
              default-expand-all
              style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="80">
              </el-table-column>
              <el-table-column
              prop="content"
              align="left"
              label="目标">
              <!-- <template slot="header">
                <div class="fl">目标</div>
                <div class="fr" @click="addHandle('two')" style="cursor:pointer;color:#00afff;margin-right:15px;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
            </template> -->
              <template slot-scope="scope" >
                  <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 4}" v-if="isNewest || updateStatus" style="width:100%;" v-model.trim="scope.row.content" placeholder="请输入目标" show-word-limit maxlength="200"></el-input>
                  <span v-else>{{scope.row.content}}</span>
              </template>
              </el-table-column>
              <el-table-column
                  align="center"
                  width="100px"
                  v-if="isNewest || updateStatus"
                  >
                  <template slot="header">
                      <div @click="addHandle('two')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                  </template>
                  <template slot-scope="scope">
                      <el-button v-if="scope.$index === 0" type="danger" size="mini" plain disabled>删除</el-button>
                      <el-button v-else type="danger" size="mini" plain @click="deleteHandle(scope.$index,'two')">删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
          <template v-if="isNewest">
            <div style="margin-top:25px;"><b>是否将信息开放给教练</b></div>
            <div style="margin-top:15px;">
              <el-radio v-model="isOpen" label="0">否</el-radio>
              <el-radio v-model="isOpen" label="1">是</el-radio>
            </div>
          </template>
         </div>
       </el-scrollbar>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  props: {
    courseId: [String, Number],
    flowNodeNo: [String, Number],
    overSecondWeek: Boolean,
    isNewest: Boolean,
    isEx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: '0',
      updateStatus: false,
      tableDataOne: [
        // { content: '' }
      ],
      tableDataTwo: [
        // { content: '' }
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      baseRequest('/course/rwPMyChallenge/selectMyChallenge', { courseId: this.courseId, flowNodeNo: this.flowNodeNo }).then(response => {
        this.tableDataOne = []
        this.tableDataTwo = []
        const tempList = response.data.item || []
        for (const iterator of tempList) {
          if (iterator.type === '1') {
            this.tableDataOne.push({
              content: iterator.content || ''
            })
          } else if (iterator.type === '2') {
            this.tableDataTwo.push({
              content: iterator.content || ''
            })
          }
        }
        if (this.tableDataOne.length === 0) {
          this.tableDataOne.push({
            content: ''
          })
        }
        if (this.tableDataTwo.length === 0) {
          this.tableDataTwo.push({
            content: ''
          })
        }
      })
    },
    addHandle(param) {
      if (param === 'one') {
        this.tableDataOne.push({
          'content': '',
          'orderId': null
        })
      } else if (param === 'two') {
        this.tableDataTwo.push({
          'content': ''
        })
      }
    },
    deleteHandle(index, param) {
      if (param === 'one') {
        if (this.tableDataOne.length <= 1) return
        this.tableDataOne.splice(index, 1)
      } else {
        if (this.tableDataTwo.length <= 1) return
        this.tableDataTwo.splice(index, 1)
      }
    },
    upHandle(index) {
      if (index === 0) return
      const preIndex = index - 1
      const currentItem = this.tableDataOne[index]
      this.tableDataOne.splice(index, 1)
      this.tableDataOne.splice(preIndex, 0, currentItem)
    },
    saveUpdate() {
      this.saveData().then(_ => {
        this.updateStatus = false
        this.$Message.success('操作成功')
        this.getData()
      })
    },
    judgement() {
      if (this.tableDataOne.some(item => item.content) || this.flowNodeNo === 14) {
        if (this.tableDataTwo.some(item => item.content)) {
          return true
        } else {
          this.$Message.warning('请至少填写一个目标')
          return false
        }
      } else {
        this.$Message.warning('请至少填写一个挑战')
        return false
      }
    },
    /**
     * 这里用promise做异步
     */
    saveData() {
      return new Promise((resolve, reject) => {
        if (this.tableDataOne.length > 0 && this.judgement()) {
          const dataOne = []
          const dataTwo = []

          let oneIndex = 1
          let twoIndex = 1
          for (const iterator of this.tableDataOne) {
            if (iterator.content) {
              dataOne.push({
                content: iterator.content,
                orderId: oneIndex
              })
              oneIndex++
            }
          }
          for (const iterator of this.tableDataTwo) {
            if (iterator.content) {
              dataTwo.push({
                content: iterator.content,
                orderId: twoIndex
              })
              twoIndex++
            }
          }
          const params = {
            flowNodeNo: this.flowNodeNo,
            courseId: this.courseId,
            dataTwo,
            dataOne
          }
          if (this.isNewest) {
            params.isOpen = this.isOpen
          }
          // if (this.flowNodeNo === 7) {
          //   params.dataOne = dataOne
          // }
          baseRequest('/course/rwPMyChallenge/updateMyChallenge', params).then(response => {
            resolve()
          })
        } else {
          reject()
        }
      })
    }
  }
}
</script>
<style lang="scss">
.challenge{
    position: relative;
    padding:30px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    background-color: #fcfcfc;
    border-radius: 10px;
    border: solid 1px #dddddd;
    overflow: auto;
    padding-right: 30px;
    .update-btn{
        position: absolute;
        top:30px;
        right: 30px;
        z-index: 2;
        opacity: 0.8;
    }
    .fl{
        float: left;
    }
    .fr{
        float: right;
    }
    .challenge-head{
        font-size: 14px;
        &.challenge-head-s{
            margin-top:20px;
        }
        .challenge-title{
            font-size: 16px;
        }
        .challenge-content{
            margin:10px 0 20px;
        }
        p{
          line-height: 30px;
          font-size: 16px;
        }
    }
    /deep/.el-table.table-main.el-table--border{
        border-radius: 10px;
    }
}
</style>