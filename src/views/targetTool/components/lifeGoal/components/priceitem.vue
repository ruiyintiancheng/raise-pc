<template>
    <div class="price">
        <div class="p-title" :class="{'no-bottom':!contentVisable}"> 
            <span class="titleleft">{{valueData.valueFieldName}} 
              <!-- <a v-if="contentVisable" class="el-icon-arrow-up" @click="contentVisable=false"></a>
              <a v-else class="el-icon-arrow-down" @click="contentVisable=true"></a> -->
            </span>
           <el-button style="margin-left:15px;" v-if="visionType==='0' && index !== 0" size="mini" type="primary" plain @click="moveUp">上移</el-button>
        </div>
        <div class="p-content" >
            <div class="p-item">
                 <!-- <div class="contitem clearfix" v-for="(item,index) in rwValueContVos" :key="index"> -->
                 <div class="contitem clearfix">
                   <div class="">
                      <!-- <span class="v-title">价值</span> -->
                      <div  style="margin-top:0px;margin-bottom:0px;position: relative;">
                          <el-input
                          :ref="'jzInput'"
                          type="textarea"
                          :rows="4"
                          maxlength="200"
                          show-word-limit
                          style="width:1090px"
                          @focus="priceitemChange()"
                          placeholder="请输入价值"
                          v-model="valueData.valueCont">
                          </el-input>
                          <div class="priceitem-commit-btn">
                              <el-button size="small" v-if="this.updateStatus === 1" @click="cancelOperate()">取消</el-button>
                              <el-button size="small" type="primary" v-if="this.updateStatus === 1" :loading="loading" @click="preservation()">保存</el-button>
                          </div>
                      </div>
                    </div>
                   </div>
                      <!-- <div class="dottedline"></div>
                    <span class="v-title">具象化  <el-button class="add-mini-btn" v-if="!valueData.valueFigurat && !jxhVisable" size="mini" type="success" @click="jxhVisable = true">上传</el-button></span>
                    <concretization v-if="valueData.valueFigurat || jxhVisable" style="margin:20px 0 0;" :valueFigurat="valueData.valueFigurat" @successUpload="successUpload"></concretization>
                    <span class="v-title"  style="margin:20px 0 0;">自我肯定宣言  <el-button class="add-mini-btn" v-if="!valueData.valueDec && !xyVisable" size="mini" type="success" @click="xyVisable = true">填写</el-button></span>
                      <div style="margin-top:6px;margin-bottom:20px;" v-if="valueData.valueDec || xyVisable">
                      <el-input
                        type="textarea"
                        :rows="5"
                        maxlength="100"
                        show-word-limit
                        style="width:590px"
                        :disabled="isPast"
                        placeholder="请填写内容(不要少于10字,不要超过100字)"
                        v-model="valueData.valueDec">
                        </el-input>
                        <div style=" width: 590px;text-align:right;margin-top:6px">
                        </div>
                      </div>
                            <div style="position:relative;text-align:left;margin-bottom:20px;margin-top:20px;">
                              <el-button type="success" @click="prevision" v-if="!isPast && ((valueData.valueFigurat || jxhVisable) || (valueData.valueDec || xyVisable))">保存</el-button>
                          </div> -->
                            </div>
                        </div>
    </div>
</template>
<script>
import { baseRequest } from '@/api/base'
export default {
  components: {
  },
  computed: {
  },
  props: {
    valueData: {
      type: Object,
      default: function() {
        return {
          'valueCont': null,
          'valueField': null,
          'valueFieldName': '',
          'valueFieldOrder': null,
          'valueId': null
        }
      }
    },
    visionType: String,
    year: [String, Number],
    index: Number
  },
  data() {
    return {
      loading: false,
      contentVisable: false,
      updateStatus: 0
    }
  },
  created() {
    if (this.visionType === '1') {
      this.contentVisable = true
    }
  },
  methods: {
    // 获取焦点时 改变状态
    priceitemChange() {
      this.updateStatus = 1
      this.$set(this.valueData, 'valueContBack', this.valueData.valueCont)
    },
    // 上移
    moveUp() {
      if (this.valueData.valueFieldOrder === 1) {
        baseRequest('/objective/rwValue/orderValue', { valueId: this.valueData.valueId, newOrder: 6, oldOrder: 1 }).then(response => {
          this.$Message.success('操作成功!')
          this.$emit('getRefresh')
        })
      } else {
        baseRequest('/objective/rwValue/orderValue', { valueId: this.valueData.valueId, newOrder: this.valueData.valueFieldOrder - 1, oldOrder: this.valueData.valueFieldOrder }).then(response => {
          this.$Message.success('操作成功!')
          this.$emit('getRefresh')
        })
      }
    },
    // 取消修改
    cancelOperate() {
      this.$set(this.valueData, 'valueCont', this.valueData.valueContBack)
      this.updateStatus = 0
    },
    // 保存目标
    preservation() {
      if (this.valueData.valueCont) {
        const url = '/objective/rwValue/update'
        const params = {
          'valueId': this.valueData.valueId,
          'valueCont': this.valueData.valueCont
        }
        this.loading = true
        baseRequest(url, params).then(response => {
          this.$Message.success('操作成功!')
          this.loading = false
          this.updateStatus = 0
        })
      } else {
        this.$Message.warning('价值不能为空')
      }
    }
  }
}
</script>
<style lang="scss">
.price{
    margin-top: 20px;
    margin-bottom: 24px;
    border-radius: 10px;
	border: solid 1px #dddddd;
  position: relative;
  overflow: hidden;
  width: calc(100% - 20px);
  // .dialog-main{
   
  // }
  .priceitem-commit-btn{
    // position: absolute;
    margin-top:20px;
    right: 0;
    bottom: 0;
  }
    .v-submit{
      position: absolute;
      right: 0px;
      bottom: 0px;
    }
    .p-title{
        height: 44px;
        line-height: 44px;
        background-color: #fafafa;
	    border-bottom:1px solid  #dddddd;
        position: relative;
        &.no-bottom{
          border-bottom: none;
        }
        .titleleft{
	         font-family: PingFangSC-Semibold;
	         font-size: 14px;
	         font-weight: normal;
	         font-stretch: normal;
	         letter-spacing: 0px;
	         color: #00afff;
             margin-left: 19px;
        }
        .p-button{
            	width: 60px;
	            height: 30px;
	            background-color: #00afff;
                color:#fff;
	            border-radius: 4px;
                border:none;
                position: absolute;
                right: 16px;
                top: 50%;
                margin-top: -14px;
                cursor: pointer;
        }
        .p-buttonup{
            	width: 60px;
	            height: 30px;
	            background-color: #00afff;
                color:#fff;
	            border-radius: 4px;
                border:none;
                position: absolute;
                right: 20px;
                top: 50%;
                margin-top: -14px;
                cursor: pointer;
                font-size: 14px;
        }
        .p-buttonup:focus{
          outline:0;
        }
        .p-button:focus{
          outline:0;
        }
    }
      .zanw{
          height: 200px;
          line-height: 200px;
          text-align: center;
        }
        .p-content{
            margin: 10px;
            .p-item{
                position: relative;
                .addgoal{
                  text-align: right;
                   .targetsub{
                     margin: 0;
                      padding: 0;
                      width:60px;
                      height:30px;
                  }
                }
                .contitem{
                  position: relative;
                  .button-combination{
                    position: absolute;
                    top: 20px;
                    right: 0px;
                    button{
                      margin: 0;
                      padding: 0;
                      width:60px;
                      height:30px;
                    }
                  }
                }
.v-title{
         display: block;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        font-weight: 600;
        line-height: 22px;
        color: #222222;
    }
      .updateimg{
      position: relative;
       width: 590px;
       .v-img{
         width: 360px;
         height: 240px;
        //  border:1px solid #000;
       }
       .updateimg-button{
         position: absolute;
         right: 100px;
         bottom: 0;
       }
    }
    .paragraph{
          width: 590px;
        min-height: 110px;
        display: inline-block;
        border:1px solid #ccc;
        padding:15px;
        margin-top: 6px;
        border-radius: 5px;
        overflow: hidden;
        word-wrap:break-word;
        margin-bottom:20px;
    }
    .p-img{
        width:360px;
        height:240px;
        display: block;
        border:1px solid #000;
        margin:6px 0 20px 0; 
    }
            }
             

        }
      .add-mini-btn{
      &.el-button--mini, .el-button--mini.is-round {
          padding: 3px 6px;
      }
    }
}
</style>