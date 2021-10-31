<template>
    <div class="report">
        <div class="inside-container">
            <div class="report-item">
                <div class="report-item-title">SWOT个人规划报告</div>
                <div class="report-item-content">
                    <p>SWOT分析是强大的分析工具：S代表strength（优势），W代表weakness（弱势），O代表opportunity（机会），T代表threat（威胁）。其中，S、W是内部因素，O、T是外部因素。企业经常使用这一工具来扫描、分析整个行业和市场，获取相关的内外部资讯，为高层提供决策依据。</p>
                    <p>SWOT分析也可以用于检查个人的技能、能力、职业、喜好和职业机会。对自己做个细致的SWOT分析，那可以明了地知道自己的个人优点和弱点在哪里，以及自己所感兴趣的不同职业道路的机会和威胁所在。</p>
                </div>
                <div class="report-item-options clearfix">
                   <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
            <div class="report-item">
                <div class="report-item-title">2020互联网解决方案创新应用报告</div>
                <div class="report-item-content">
                    <p>工业互联网作为新一轮科技革命和产业变革的重要驱动力量，成为重要的未来产业。我国工业互联网发展与发达国家基本同步启动，发展成就来之不易，既得益于我国信息技术的高速发展和雄厚的工业根基，也得益于政府的大力倡导、企业持续深入的产业布局。工业互联网在我国工业领域的落地实践已取得一定进展，经济效益、社会效益逐步显现，工业互联网解决方案成为助力工业企业转型升级的重要途径。</p>
                </div>
                <div class="report-item-options clearfix">
                   
                    <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
            <div class="report-item">
                <div class="report-item-title">2020-2025大数据产业发展前景及投资分析报告</div>
                <div class="report-item-content">
                    <p>报告描述：报告描述：本文从全球大数据产业发展现状与预测、中国大数据产业发展现状与预测、中国企业大数据需求与应用趋势调查、中国大数据产业链投资机会、大数据产业投融资现状与趋势等多角度分析，通过对全行业近几年来连续性市场数据，全面、准确地分析整个大数据产业市场走向和发展趋势……</p>
                </div>
                <div class="report-item-options clearfix">
                   
                    <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
            <div class="report-item">
                <div class="report-item-title">EMBA运营模式与投资机会分析报告</div>
                <div class="report-item-content">
                    <p>报告描述：本报告从EMBA教育培训行业的发展背景，国内外EMBA教育培训行业发展状况，美国、英法、韩国等主要国家EMBA教育培训行业运营模式，国内EMBA教育培训行业运营模式及重点地区EMBA教育培训行业发展状况与投资机会等多角度分析EMBA的运营及投资机会，提供丰富的分析数据。  </p>
                </div>
                <div class="report-item-options clearfix">
                   
                    <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
            <div class="report-item">
                <div class="report-item-title">5G通信技术投资分析报告</div>
                <div class="report-item-content">
                    <p>报告描述：第五代移动通信技术简称5G或5G技术，是最新一代蜂窝移动通信技术，也是继4G（LTE-A、WiMax）、3G（UMTS、LTE）和2G（GSM）系统之后的延伸。5G的性能目标是高数据速率、减少延迟、节省能源、降低成本、提高系统容量和大规模设备连接。5G的发展也来自于对移动数据日益增长的需求。随着移动互联网的发展，越来越多的设备接入到移动网络中，新的服务和应用层出不穷，全球移动宽带用户在2018年有望达到90亿，到2020年，预计移动通信网络的容量需要在当前的网络容量上增长1000倍，通信行业将迎来新一轮的投资高峰。 </p>
                </div>
                <div class="report-item-options clearfix">
                   
                    <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
            <div class="report-item">
                <div class="report-item-title">2019年全球高管洞察</div>
                <div class="report-item-content">
                    <p>随着企业跨界经营，行业之间的界限越来越模糊，高管们当然了解这种变化，而且他们认为产业融合是未来3到5年盛行的趋势。 五年前，高管通常认为竞争对手来自行业内部，现在他们更担心行业外竞争者的“侵入”。    </p>
                </div>
                <div class="report-item-options clearfix">
                   
                    <el-button @click="buy" class="report-item-more" type="primary" size="small">1元 阅读全文</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    buy() {
      this.$router.push({
        name: 'fast-buy',
        params: {
          id: 3
        },
        query: {
          states: '3',
          type: 'one',
          name: '行业报告'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.report{
    padding-bottom: 50px;
    .report-item{
        background-color: #ffffff;
        -webkit-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
        margin-top: 30px;
        border-radius: 10px;
        padding:25px 40px;
        .report-item-title{
            margin-bottom: 20px;
            font-size: 20px;
            font-weight: bold;
        }
        .report-item-content{
            line-height: 25px;
        }
        .report-item-options{
            margin-top: 10px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            .report-item-price{
                float: left;
                color: #F56C6C;
                font-weight: 600;
                font-size: 22px;
            }
            .report-item-more{
                float: right;
            }
        }
    }
}
</style>