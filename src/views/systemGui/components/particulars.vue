<template>
    <div class="particulars">
        <div class="particulars-content inside-container">
            <el-form ref="form"  class="detail-form clearfix"  >
                <el-form-item label="" v-for="(value,index) in detailList"
                  :key="index">
                    <span class="inpt-title required form-label">学员手机号：</span>
                    <el-input class="learn-input" :value="value"  :disabled="true"></el-input>
                </el-form-item>
                <el-button  @click="handleClose" class="detailsExport"  >关闭</el-button>
                    <!-- <ul>
                         <li v-for="(value,index) in detailList" :key="index">
                            <el-form-item label="" prop="courseTime">
                                <span class="inpt-title required form-label" >课时：</span>
                            <el-input  class="learn-input" :disabled="true" :placeholder="value[0]"></el-input>
                            </el-form-item>
                                <el-form-item label="" class="detail-item">
                                <span class="inpt-title required form-label">学员：</span>
                                <el-input :placeholder="value[1]" class="learn-input input-block" :disabled="true"></el-input>
                                <el-input :placeholder="value[2]" class="learn-input input-block" :disabled="true"></el-input>
                                <el-input :placeholder="value[3]" class="learn-input input-block" :disabled="true"></el-input>
                                <el-input :placeholder="value[4]" class="learn-input input-block" :disabled="true"></el-input>
                            </el-form-item>
                            <div style="margin:20px 0;border-top:1px solid #aaaaaa"></div>
                        </li>
                    </ul> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import { download } from '@/utils/download'
export default {
  props: {
    currentRow: {
      type: Object,
      default: _ => {}
    }
  },
  data() {
    return {
      detailList: [],
      downLoading: false
    }
  },
  created() {
    baseRequest('/user/rwMessageTob/catInfo', { id: this.currentRow.id }).then(response => {
      this.detailList = response.data.item
    })
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    exportdetail() {
      this.downLoading = true
      download('/user/rwMessageTob/export', { id: this.currentRow.id }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.particulars{
    .particulars-content{
        width: 600px;
        text-align: left;
        .detail-form{
            .detail-item{
                margin-top:-20px
            }   
            .search-label{
               margin-left:50px;
            }
                .input-block{
                    display: block;
                    margin-left:120px;
                    margin-bottom:5px
                }
            .inpt-title{
            width: 105px;
            text-align: right;
            display: block;
            float: left;
            font-size: 14px;
            font-family: PingFangSC-Semibold;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #222222;
            font-weight: bold;
            margin-right:20px
            }
            .learn-input{
               width: 250px;
            }
            .course-time{
               width: 200px; 
            }
          .detailsExport{
            width: 90px;
            height: 30px;
            line-height:0.5;
            border: solid 1px #00afff;
            color: #00afff;
            padding: 0px;
            float: right;
            margin-right:20px;
          }
        }   
    }
}
</style>
