<template>
  <div class="project-fs">
    <div class="fs-header" :style="{ minHeight: minHeight + 'px' }">
      <div class="inside-container clearfix">
        <div class="fs-img">
          <img :src="jlht" alt="" />
        </div>
        <div class="fs-article">
          <div class="fs-article-header">
            <div class="fs-article-item">
              <svg-icon icon-class="icon-hexin" class="icon-hexin"></svg-icon
              >TTT训练认证
            </div>
            <!-- <div class="fs-article-item second-item">
                            First Step迈出第一步
                        </div> -->
          </div>
          <div class="article-introduction">
            <p>睿思智得辅导教练TTT认证</p>
            <p>
              帮助认证成为睿思智得线上辅导平台上的辅导教练。认证包括两大部分：
            </p>
            <p><b>一、资质认证</b></p>
            <p>1.项目内容培训</p>
            <p>
              项目内容培训总时长为一天，内容包括：睿思智得线上辅导项目总体概述、认证辅导项目流程内容说明、认证辅导项目教练辅导演练，帮助辅导教练录制教练个人音像信息。
            </p>
            <p>2.教练认证考核</p>
            <p>
              认证教练参加分配的演练小组活动，完成所有辅导动作的演练，并经由教练小组组长评估确认，通过评估确认的教练方可被允许设置个人教练账户
            </p>
            <p><b>二、建立系统 </b></p>
            <p>
              在线完成睿思智得线上辅导服务平台系统的介绍，帮助认证教练设定教练个人账户，建立自己的辅导服务系统。
            </p>
          </div>
          <!-- <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>促使改变真正发生
                        </div>
                        <div class="article-detail-content">
                            如果你以同样的方式思考和行动，你将得到同样的结果。FirstStep的整个辅导流程设计以促动学员发生改变为目的，结合工作生活持续自我觉察和反思，通过多感官学习方式与教练辅导，将反思落实到行动，最终得到期望的结果，并，最终达到知行合一。
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>全方位规划你的目标
                        </div>
                        <div class="article-detail-content">
                            First Step 引进LMI（美国领导力管理发展中心）保罗•麦尔为达成目标而设计的“目标规划系统”，这套经典的工具体系将帮助你把学习到的理论应用到实践中，全面、结构化的管理自己人生各领域、各阶段的目标。
                        </div>
                    </div>
                    <div class="article-detail">
                        <div class="article-detail-title">
                            <span class="article-detail-point"></span>专业教练支持和陪伴
                        </div>
                        <div class="article-detail-content">
                            专业教练支持每个个体持续不断的自我发展，通过小组辅导和一对一个人辅导，帮助和陪伴你脚踏实地实现自我目标、逐步贴近梦想。
                        </div>
                    </div> -->
          <div class="clearfix" style="margin-top: 70px">
            <!-- <div class="article-buy-price">￥4800</div> -->
            <div class="article-buy-btn">
              <el-button type="primary" @click="applicationHandle"
                >我要报名</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { baseRequest } from '../../api/base'
import jlht from '@/assets/images/tranning.png'
import projectfs2 from '@/assets/images/projectfs2.png'
import mubiao from '@/assets/images/mubiao.png'
import shouyi from '@/assets/images/shouyi.png'
import xuexi from '@/assets/images/guanzhu.png'
import guanzhu from '@/assets/images/xuexi.png'
import FsBuy from './fs-buy'
export default {
  components: {
    FsBuy
  },
  props: {},
  data() {
    return {
      isFSApplyDisabled: true,
      jlht,
      projectfs2,
      mubiao,
      shouyi,
      xuexi,
      guanzhu
    }
  },
  computed: {
    minHeight() {
      return this.$store.state.app.containHeight - 60
    }
  },
  created() {
    // this.isFSApply()
  },
  mounted() {},
  methods: {
    // 是否有报名权限
    isFSApply() {
      baseRequest('/user/rwTttApply/isFSApply', {}).then((response) => {
        if (response.data.item.flag) {
          this.isFSApplyDisabled = false
        }
      })
    },
    applicationHandle() {
      this.$router.push({
        name: 'basicinformationcopy',
        query: { isShowProduct: true }
      })
    },
    buy() {
      this.$router.push({
        name: 'fast-buy',
        params: {
          id: 3
        },
        query: {
          states: '1',
          type: 'one',
          name: 'TTT训练认证'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
$marginUd: 200px;
.project-fs {
  .fs-header {
    background-color: #fff;
    padding: 100px 0;
    border-bottom: 1px solid #ddd;
    .fs-img {
      float: left;
      width: 640px;
      margin-top: 72px;
      img {
        width: 560px;
      }
    }
    .fs-article {
      float: left;
      width: 800px;
      .fs-article-header {
        height: 60px;
      }
      .fs-article-item {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        color: #222222;
        height: 100%;
        border-bottom: 4px solid #00afff;
        padding-top: 2px;
        padding-left: 45px;
        position: relative;
        &.second-item {
          font-weight: normal;
          margin-left: 20px;
          border-bottom: none;
          padding-left: 0;
        }
        .icon-hexin {
          font-size: 30px;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .article-introduction {
        margin-top: 40px;
        font-size: 16px;
        line-height: 30px;
        color: #222222;
      }
      .article-detail {
        margin-top: 30px;
        .article-detail-title {
          color: #222222;
          font-size: 16px;
          font-weight: bold;
          .article-detail-point {
            margin: 0 14px 0 20px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: #00afff;
            display: inline-block;
          }
        }
        .article-detail-content {
          margin-top: 16px;
          line-height: 30px;
          font-size: 16px;
          padding-left: 46px;
        }
      }
      .article-buy-price {
        color: #f56c6c;
        float: left;
        line-height: 95px;
        padding-left: 45px;
        font-size: 25px;
        font-weight: 600;
      }
      .article-buy-btn {
        margin-top: 30px;
        padding-left: 46px;
        float: right;
      }
    }
  }
  .fs-options {
    background-color: #fff;
  }
  .fs-item {
    position: relative;
    padding: $marginUd 0 0 $marginUd;
    .fs-item-img {
      position: absolute;
      width: 320px;
    }
    .fs-item-content {
      color: #222;
      font-size: 16px;
      .fs-item-title {
        font-weight: 600;
        margin-bottom: 25px;
      }
      .fs-item-text {
        line-height: 35px;
        .item-text-intent {
          text-indent: 3em;
        }
      }
    }
    &.item-left {
      padding-left: 600px;
      .fs-item-img {
        top: $marginUd;
        left: $marginUd;
      }
    }
    &.item-right {
      padding-right: 400px;
      padding-left: $marginUd;
      .fs-item-img {
        bottom: 0;
        right: 0;
      }
    }
    &.last-item {
      padding-bottom: $marginUd;
      &.item-right {
        .fs-item-img {
          bottom: $marginUd;
        }
      }
    }
  }
  .fs-fivth {
    padding: 100px 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    .fs-fivth-header {
      height: 60px;
      border-bottom: 4px solid #00afff;
      font-size: 24px;
      font-weight: 600;
      padding-top: 7px;
      position: relative;
      padding-left: 54px;
      display: inline-block;
      .icon-more {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 40px;
      }
    }
    .fs-fivth-content {
      .fs-fivth-other {
        float: left;
        margin-top: 80px;
        li {
          margin-top: 40px;
          a {
            margin-left: 14px;
            font-size: 18px;
            color: #00afff;
            text-decoration: underline;
          }
        }
      }
      .fs-fivth-img {
        float: right;
        margin-top: 40px;
        width: 454px;
      }
    }
  }
}
</style>