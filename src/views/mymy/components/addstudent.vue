<template>
  <el-dialog
    id="addstudent"
    title="添加学员"
    :visible.sync="dialogaddstudent"
    width="596px"
    top="15vh"
    destroy-on-close
    :close-on-click-modal="false"
  >
    <div class="box-middle">
      <el-form>
        <el-form-item
          label="学员："
          style="margin-left:43px;margin-top:14px"
          v-for="(value,index) in item"
          :key="index"
        >
          <el-input
            v-model="value.loginName"
            :disabled="true"
            style="width:219px;margin-left: -8px;"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in (row.personNum-row.coursePerson)"
          :key="index+'1'"
        >
          <el-input v-model="query[index]" style="width:219px;margin-left: 95px;"></el-input>
        </el-form-item>
        </el-form>
    </div>
    <div class="button-box" style="margin-top:16px;margin-left:212px">
      <el-button type="primary" size="medium" class="Refused" style="margin-top:-8px">拒绝</el-button>
      <el-button type="primary" size="medium" class="through" @click="through(row)" style="margin-top:-8px">通过</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  props: ['item', 'row'],
  data() {
    return {
      dialogaddstudent: false,
      value: '',
      form: {
        name: '',
        name2: ''
      },
      query: []
    }
  },
  created() {
    // this.getstudent()
  },
  methods: {
    through(row) {
      var arr = []
      this.item.map(value => {
        arr.push(value.loginName)
      })
      const params = {
        settlementId: row.id,
        users: this.query.concat(arr)
      }
      baseRequest('/finance/rwRebateSettlement/insertSettlementUser', params).then(
        (response) => {
          this.loading = false
        }
      )
      this.dialogaddstudent = false
    }
  }
}
</script>

<style lang="scss" >
#addstudent .el-dialog {
  border-radius: 10px;
  background-color: #f3f3f3;
  .el-dialog__header {
    height: 52px;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    letter-spacing: 0px;
    border-radius: 10px;
    color: #222222;
    .el-dialog__headerbtn {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 20px;
      right: 21px;
      padding: 0;
      background: #222222;
      border: none;
      outline: 0;
      cursor: pointer;
      font-size: 16px;
      border-radius: 50%;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #ffffff;
    }
  }

  .box-middle {
    height: 200px;
    .el-form-item__label {
      font-size: 16px;
      // height: 250px;
    }
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px 20px 20px 20px;
  }
  .button-box {
    width: 184px;
    height: 37.5px;
    margin-left: 205px;
    margin-top: 21px;
    .Refused {
      float: left;
    }
    .through {
      float: right;
    }
  }
}
.rebateIdstyle {
  .el-form-item__error {
    margin-left: 198px;
  }
}
</style>