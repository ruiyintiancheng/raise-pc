<template>
  <div class="member inside-container">
    <div class="member-one" style="height: 460px">
      <div class="image">
        <img src="../../assets/shouye-img/pic13.png" alt="" width="100%" />
      </div>
      <div class="students-member">
        <h4 class="quanyi-title">学员权益</h4>
        <p>成功购买First Step辅导项目，即可获得如下权益：</p>
        <p>
          ●
          拥有辅导项目时间内的在线学习系统使用及服务，获取含在项目内的专业教练辅导支持
        </p>
        <p>
          ●
          可通过打卡学习换取积分，或使用个人专属二维码推广他人购买睿思智得产品获取奖励积分，累计积分享有购买辅导产品更优惠权益
        </p>
        <p>● 所有毕业学员，均有机会成为睿思智得的推广大使和项目辅导教练</p>
        <p style="margin-top: 10px">
          睿思智得辅导项目详细情况请点击如下链接查阅：
        </p>
        <div class="details clearfix" style="width: 889px">
          <a
            style="text-decoration: underline; float: left"
            @click="$router.push({ name: 'firstStep' })"
            >First Step辅导项目介绍</a
          >
          <el-button
            style="float: right"
            type="primary"
            @click="$router.push({ name: 'firstStep' })"
            >购买</el-button
          >
        </div>
        <div class="details clearfix" style="width: 889px">
          <a
            style="text-decoration: underline; float: left"
            @click="$router.push({ name: 'exploredoor' })"
            >探索之门辅导项目介绍</a
          >
          <el-button
            style="float: right"
            type="primary"
            @click="$router.push({ name: 'exploredoor' })"
            >购买</el-button
          >
        </div>
        <div class="details clearfix" style="width: 889px">
          <a
            style="text-decoration: underline; float: left"
            @click="$router.push({ name: 'coachTalk' })"
            >1-1教练会谈介绍</a
          >
          <el-button
            style="float: right"
            type="primary"
            @click="$router.push({ name: 'coachTalk' })"
            >购买</el-button
          >
        </div>
        <div class="details clearfix" style="width: 889px">
          <a
            style="text-decoration: underline; float: left"
            @click="$router.push({ name: 'training' })"
            >TTT训练认证介绍</a
          >
          <el-button
            style="float: right"
            type="primary"
            @click="$router.push({ name: 'training' })"
            >购买</el-button
          >
        </div>
      </div>
    </div>
    <div style="border-top: 1px solid #dddddd"></div>
    <div class="member-one">
      <div class="image" style="margin-top: 50px">
        <img src="../../assets/shouye-img/pic14.png" alt="" width="100%" />
      </div>
      <div class="students-member">
        <h4 class="quanyi-title">教练权益</h4>
        <p>● 系统会为您设立专属账号，通过账号支持您建立完整的管理体系</p>
        <p>● 教练可自主设定所有辅导时间</p>
        <p>● 有机会参加睿思智得举办的线上或线下学习及沙龙活动</p>
        <p>● 每位教练自动成为睿思智得的推广大使</p>
        <div class="zhuCoach">
          <p class="zhuCoach-title">【成为睿思智得教练的基本条件】：</p>
          <p>
            完成本平台的辅导项目学习，并最终通过睿思智得辅导项目TTT训练认证，即有机会成为睿思智得辅导平台对应辅导项目的认证教练。
          </p>
          <p>参加过教练学习及认证资格者优先。。</p>
        </div>
        <div class="coachlink">
          <!-- <a
            style="text-decoration: underline"
            @click="
              $router.push({ name: 'basicinformation', query: { userId: '1' } })
            "
            >诚邀加入专业教练团队 共同实现价值</a
          > -->
              <a
            style="text-decoration: underline"
            @click="
              $router.push({ name: 'basicinformationcopy', query: { isShowProduct: true  } })
            "
            >诚邀加入专业教练团队 共同实现价值</a
          >
        </div>
      </div>
      <div class="buy">
        <el-button
          type="primary"
          @click="
            $router.push({ name: 'basicinformationcopy', query: { isShowProduct: true } })
          "
          >心动加入</el-button
        >
      </div>
    </div>
    <div style="border-top: 1px solid #dddddd"></div>
    <div class="member-one" style="height: 270px">
      <div class="image">
        <img src="../../assets/shouye-img/pic15.png" alt="" width="100%" />
      </div>
      <div class="students-member">
        <h4 class="quanyi-title">推广大使权益</h4>
        <p>● 可以灵活选择适合自己的推广项目、推广收益方式</p>
        <p>● 影响圈越大、收益越大；</p>
        <p>● 有机会参加睿思智得举办的线上或线下学习及沙龙活动</p>
        <div class="ambassadorlink">
          <a
            style="text-decoration: underline"
            @click="
              $router.push({ name: 'basicinformation', query: { userId: '2' } })
            "
            >加入我们，成为睿思智得推广大使</a
          >
        </div>
      </div>
      <div class="buy">
        <el-button
          type="primary"
          @click="
            $router.push({ name: 'basicinformation', query: { userId: '2' } })
          "
          >心动加入</el-button
        >
      </div>
    </div>
    <div style="border-top: 1px solid #dddddd"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.member {
  width: 1440px;
  background-color: #ffffff;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 10px;
  .member-one {
    position: relative;
    padding: 60px 120px;
    width: 1440px;
    height: 380px;
    .buy {
      position: absolute;
      width: 160px;
      right: 60px;
      bottom: 30px;
    }
    .image {
      margin-top: 20px;
      width: 210px;
      height: 190px;
    }
    .students-member {
      position: absolute;
      left: 420px;
      top: 60px;
      .dashi {
        margin-top: 130px;
        p {
          font-size: 13px;
          color: #888888;
          line-height: 20px;
          font-family: PingFangSC-Regular;
        }
      }
      .zhuCoach {
        width: 774px;
        margin-top: 20px;
        .zhuCoach-title {
          font-weight: bold;
          color: #222222;
          margin-bottom: 10px;
        }
        p {
          font-size: 13px;
          color: #888888;
          line-height: 20px;
          font-family: PingFangSC-Regular;
        }
      }
      p {
        font-size: 14px;
        color: #222222;
        font-family: PingFangSC-Regular;
        line-height: 24px;
      }
      .quanyi-title {
        font-family: PingFangSC-Sembibold;
        font-size: 20px;
        color: #222222;
        margin-bottom: 19px;
      }
      .details {
        margin-top: 15px;
        font-size: 13px;
        height: 36px;
        line-height: 36px;
        font-family: PingFangSC-Sembibold;
        color: #00afff;
      }
      .coachlink {
        margin-top: 35px;
        font-size: 13px;
        font-family: PingFangSC-Sembibold;
        color: #00afff;
      }
      .ambassadorlink {
        margin-top: 35px;
        font-size: 13px;
        font-family: PingFangSC-Sembibold;
        color: #00afff;
      }
    }
  }
}
</style>