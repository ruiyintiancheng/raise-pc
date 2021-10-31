<template>
  <div class="box-content">
    <div class="content">
      <div class="coachleft">
        <img
          src="../../assets/shouye-img/pic21.png"
          style="width: 100%"
          height="100%"
          alt=""
        />
      </div>
      <div class="coachright">
        <div class="coachright-text">
          <svg-icon
            icon-class="icon-jiaolian"
            style="width: 50px; height: 100%"
          />
          <h4 class="text1">诚邀加入专业教练团队 共同实现价值</h4>
        </div>
        <div class="biaotixian"></div>
        <p style="margin-top: 40px; line-height: 31px">
          睿思智得致力于让每个人都可以得到便捷有效的系统化发展体系及自我成长的教练资源，真诚地期待您在这个平台上与我们共同筑梦、逐梦、圆梦——实现价值。
        </p>
        <h4 style="margin-top: 40px">在这里：</h4>
        <p style="margin-top: 8px; line-height: 31px">
          ● 助力您扩大影响力，打造个人教练品牌，实现教练价值；
        </p>
        <p style="margin-top: 5px; line-height: 31px">
          ● 借由教练合作体系，连接更多志同道合的伙伴。
        </p>
        <h4 style="margin-top: 25px">您只需具备：</h4>
        <p style="margin-top: 14px; line-height: 31px">
          ●
          完成本平台辅导项目学习，并通过睿思智得的辅导项目TTT训练认证，即可成为本平台认证教练。
        </p>
        <p style="margin-top: 5px; line-height: 31px">
          ● 参加过LMI辅导学习项目或具备LMI、ICF等教练认证者优先。
        </p>
        <p style="margin-top: 25px; line-height: 31px">
          欢迎报名加入睿思智得线上辅导教练团队，我们会第一时间与您联系。
        </p>
        <el-button
          @click="coachtobase"
          style="
            width: 152px;
            height: 35px;
            font-size: 18px;
            line-height: 0.5;
            margin-top: 40px;
          "
          type="primary"
          >心动加入</el-button
        >
      </div>

      <div class="coachright2">
        <div class="coachright2-text">
          <svg-icon icon-class="icon-dashi" style="width: 50px; height: 100%" />
          <h4 class="text2">加入我们，成为睿思智得推广大使</h4>
        </div>
        <div class="biaotixian2"></div>
        <p style="margin-top: 40px; line-height: 31px">
          我们诚挚地邀请您参与睿思智得线上辅导项目的推广工作，真诚地期待您在这个平台上与我们共同筑梦、逐梦、圆梦——实现价值。
        </p>
        <h4 style="margin-top: 40px; line-height: 26px">在这里：</h4>
        <p style="margin-top: 17px; line-height: 26px">
          ● 睿思智得线上辅导服务平台是您发展自我影响力的绝佳舞台；
        </p>
        <p style="margin-top: 13px; line-height: 25px">
          ● 可邀请和连接更多希望持续自我成长的小伙伴加入学习；
        </p>
        <p style="margin-top: 13px; line-height: 25px">
          ● 未来有机会向专业教练方向发展，在平台上打造您的个人教练品牌。
        </p>
        <h4 style="margin-top: 29px; line-height: 25px">您只需具备：</h4>
        <p style="margin-top: 13px; line-height: 25px">
          ●
          完成本平台的辅导项目学习，并通过睿思智得推广大使认证，即可成为本平台推广大使。
        </p>
        <p style="margin-top: 13px; line-height: 25px">
          ● 参加过LMI辅导学习项目者优先。
        </p>
        <p style="margin-top: 13px; line-height: 25px">
          ● 通过睿思智得辅导项目TTT训练认证者即拥有推广大使身份。
        </p>
        <p style="margin-top: 48px; ine-height: 25px">
          欢迎报名加入睿思智得推广大使，我们会第一时间与您联系
        </p>
        <el-button
          style="
            width: 152px;
            height: 35px;
            font-size: 18px;
            line-height: 0.5;
            margin-top: 40px;
          "
          @click="ambassadortobase"
          type="primary"
          >心动加入</el-button
        >
      </div>
      <div class="coachleft2">
        <img
          src="../../assets/shouye-img/pic22.png"
          style="width: 100%"
          height="100%"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // coachtobase() {
    //   this.$router.push({ path: 'basicinformation', query: { userId: '1', isShowProduct: true }})
    // },
    coachtobase() {
      this.$router.push({
        path: 'basicinformationcopy',
        query: { isShowProduct: true }
      })
    },
    ambassadortobase() {
      this.$router.push({ path: 'basicinformation', query: { userId: '2' }})
    }
  }
}
</script>

<style lang="scss" scoped>
.box-content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .content {
    background-color: #fff;
    width: 1440px;
    height: 1640px;
    margin: auto;

    .coachleft {
      width: 720px;
      height: 720px;
      padding: 226px 80px 170px 80px;
      background-color: #fff;
      float: left;
      border-bottom: 1px solid #dddddd;
    }
    .coachright {
      width: 710px;
      height: 720px;
      background-color: #fff;
      float: right;
      padding: 100px 0px 100px 0px;
      border-bottom: 1px solid #dddddd;
      .coachright-text {
        width: 400px;
        height: 50px;
        padding-top: 0px;
        padding-bottom: 0px;
        position: relative;
        .text1 {
          position: absolute;
          top: 17px;
          left: 65px;
          font-size: 18px;
        }
      }
      .biaotixian {
        width: 172px;
        height: 5px;
        background-color: #00affe;
        margin-top: 13px;
      }
    }
    .coachleft2 {
      width: 620px;
      height: 720px;
      padding: 217px 80px 38px 0px;
      background-color: #fff;
      float: right;
    }
    .coachright2 {
      width: 810px;
      height: 720px;
      background-color: #fff;
      float: left;
      padding: 100px 0px 100px 80px;
      .coachright2-text {
        width: 400px;
        height: 50px;
        padding-top: 0px;
        padding-bottom: 0px;
        position: relative;
        .text2 {
          position: absolute;
          top: 17px;
          left: 65px;
          font-size: 18px;
        }
      }
      .biaotixian2 {
        width: 172px;
        height: 5px;
        background-color: #00affe;
        margin-top: 13px;
      }
    }
  }
}
</style>