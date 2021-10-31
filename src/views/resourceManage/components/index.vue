<template>
    <div class="container">
        <!-- <h5>宣传内容</h5> -->
        <div style="height:1px;border: 1px dashed#aaa;margin:20px 0"></div>
        <div class="top-button">
            <el-button size="mini" type="primary" plain v-if="this.index!==0" @click="moveUp">上移</el-button>
            <el-button size="mini" type="danger" plain @click="deleteHandle">删除</el-button>
            <!-- <el-button size="mini" type="primary" plain>重选</el-button> -->
        </div>
        <upLoadModule @successUpload="successUpload" :valueFigurat="imgUrl" :urlId="urlId"></upLoadModule>
        <el-form :model="form" :rules="rules" ref="form" size="mini" :inline="true" style="margin-top:20px">
            <el-form-item label="链接：" prop="address">
              <el-input v-model="form.address" style="width:300px" clearable></el-input>
              <el-button size="mini" style="margin-left:22px" v-show="this.form.address" @click="saveHandle" plain>保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import upLoadModule from './upload'
import { baseRequest } from '@/api/base'
export default {
  components: {
    upLoadModule
  },
  props: {
    index: {
      type: Number
    },
    orderId: Number,
    skipUrl: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    urlId: {
      type: Number
    },
    imgList: {
      type: Array
    }
  },
  data() {
    var checkInput = (rule, value, callback) => {
      if (value.substring(0, 4) !== 'http') {
        callback(new Error('链接请以http开头'))
      }
    }
    return {
      form: {
        address: ''
      },
      imgId: '',
      rules: {
        address: [
          { required: true, validator: checkInput }
        ]
      }
    }
  },
  mounted() {
    this.form.address = this.skipUrl
  },
  methods: {
    successUpload(param) {
      this.imgId = param
    },
    moveUp() {
      // 请求接口
      if (this.orderId) {
        const param = {
          orderOne: this.orderId - 1,
          orderTwo: this.orderId
        }
        baseRequest('/user/rwBannerInfo/moveUp', param).then((response) => {
          if (response.msg === 'Success') {
            this.$Message({
              type: 'success',
              message: '操作成功'
            })
            this.$emit('refresh')
          }
        })
      } else {
        this.$Message({
          type: 'warning',
          message: '请先上传图片'
        })
      }
    },
    // 保存
    saveHandle() {
      var upLoadId = this.imgId || this.urlId
      if (this.form.address.substring(0, 4) !== 'http') {
        this.$Message({
          type: 'error',
          message: '链接请以http开头'
        })
      } else {
        if (!upLoadId) {
          this.$Message({
            type: 'warning',
            message: '请先上传图片'
          })
          return
        }
        const param = {
          id: upLoadId,
          skipUrl: this.form.address
        }
        baseRequest('/user/rwBannerInfo/update', param).then((response) => {
          if (response.msg === 'Success') {
            this.$Message({
              type: 'success',
              message: '操作成功'
            })
            this.$Mmit('refresh')
          }
        })
      }
    },
    deleteHandle() {
      // 删除并刷新
      this.$confirm('确定删除该图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {
          id: this.imgId || this.urlId
        }
        if (param.id) {
          baseRequest('/user/rwBannerInfo/delete', param).then((response) => {
            if (response.msg === 'Success') {
              this.$Message({
                type: 'success',
                message: '操作成功'
              })
              this.$emit('refresh')
            }
          })
        } else {
          this.$emit('refresh')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    // border: 1px dashed#aaa;
    // padding:20px;
    // border-radius: 10px;
   .top-button{
       display:flex;
       justify-content:flex-end
   }
}
</style>