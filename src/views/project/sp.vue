/** 产品购买SP */
<template>
  <div class="project-sp">
		<div class="sp-body">
			<h2 class="sp-title">目标规划·SP————助力你全方位规划并实现目标</h2>
			<div class="sp-title-item sp-table">
				<div class="title-image cell" style="padding-right: 62px;">
					<img :src="sp1" alt="" style="width: 406px; height: 320px;">
				</div>
				<div class="item-content cell top">
					<p>“目标规划·SP”（LMI·SP中文电子版）将LMI（Leadership Management International）创始人保罗•麦尔先生为达成目标而设计的“目标规划系统”转移到线上、形成电子版工具体系，
						这套经典的目标规划工具将帮助你把学习和反思应用到实践中去，以形成目标导向的思维和行为习惯。
					</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;● 购买目标规划·SP的用户，使用时长为12个月；
					</p>
					<p>&nbsp;&nbsp;&nbsp;&nbsp;● 在目标规划·SP试用体验有效期内购买目标规划·SP的用户，可享受使用总时长15个月的优惠；
					</p>
					<p>【注意】：活动期间购买First Step辅导项目，可免费获赠一年 “目标规划·SP”使用时长。
					</p>
					<div class="sp-prise-1">
						目标规划·SP 会员促销
					</div>
					<div class="sp-prise-2">
						<span class="tuchu">免费</span> 开启30天试用之旅
					</div>
					<div class="sp-prise">
						首年年费原价800/年<span class="tuchu">降至¥500/年</span>  续费¥260/年
					</div>
					<div class="sp-buy">
						<el-button type="success" v-if="applySp && !hasRecommender" @click="applySpHandle">免费试用</el-button>
						<el-button v-if="status === 1" type="primary" @click="handleBuy('one')">购买目标规划·SP</el-button>
						<el-button v-if="status === 2" type="primary" @click="handleBuy('one')">续费目标规划·SP</el-button>
						<!-- <el-button v-if="status === 1" type="primary" disabled>购买目标规划·SP</el-button>
						<el-button v-if="status === 2" type="primary" disabled>续费目标规划·SP</el-button> -->
						<el-button v-if="status === 3" type="primary" disabled>续费目标规划·SP</el-button>

					</div>
				</div>
			</div>
			<hr class="line" />
			<div class="sp-item sp-table">
				<div class="item-img cell" style="padding-right: 84px;"><img class="p-img" :src="sp3" alt=""></div>
				<div class="item-content cell top">
					<h3 style="margin-bottom:10px;">投入</h3>
					<p>
						首次购买费用为 500元/年，续费为 260元/年。<br/>
						<span style="color: red; font-size: 14px;">【注意】：First Step辅导项目已包含“目标规划·SP”。</span>
					</p>
				</div>
			</div>
			<div class="sp-item sp-table">
				<div class="item-content cell top">
					<h3 style="margin-bottom:10px;">收益</h3>
					<ul>
						<li><b>● 规划人生实现梦想</b>：每个人都是独一无二、多面丰富、有价值的个体，目标规划·SP系统帮助你用每天、每周、每月、每年的行动，一步步贴近自己的内心期许，活出人生的精彩。</li>
						<li><b>● 全方位管理工作和生活</b>：从长远看，保持全观平衡的发展，可有效提高生产力、使我们真正享受人生。目标规划·SP系统帮助你全方位规划和管理生活与事业领域的目标，使你保持平衡适度的发展、从而获得内外丰盛的生命。</li>
						<li><b>● 目标导向的思维习惯</b>：目标与现实之间往往存在着距离，目标规划·SP系统帮助你专注于目标，用目标指引和驱动、使自己每天努力一点、进步一点，在一个个小小目标的达成中收获成就感，形成脚踏实地的达成目标的习惯、建立以目标为导向的思维体系。</li>
					</ul>
				</div>
				<div class="item-img cell bottom" style="padding-left: 84px;"><img class="p-img" :src="sp2" alt=""></div>
			</div>
		</div>
  </div>
</template>

<script>
import { baseRequest } from '@/api/base'
import sp1 from '@/assets/images/sp-1.png'
import sp2 from '@/assets/images/sp-2.png'
import sp3 from '@/assets/images/sp-3.png'
export default {
  components: { },
  props: { },
  data() {
    return {
      sp1,
      sp2,
      sp3,
      id: 3, // 产品id
      name: '目标规划·SP',
      status: 1,
      userId: null,
      applySp: false
    }
  },
  computed: {
    hasRecommender() {
      return !!localStorage.getItem('recommender')
    }
  },
  created() {
    this.userId = this.$store.state.user.userId
    if (this.userId) {
      this.getInfo()
      this.getApplySp()
    } else {
      this.applySp = true
    }
  },
  mounted() { },
  methods: {
    getInfo() {
      // baseRequest('/user/rwProduct/getMegById', { productId: this.item.id }).then((response) => {
      //   const { productContent, productName, productPrice } = response.data.item
      //   this.item.content = productContent
      //   this.item.name = productName
      //   this.item.price = productPrice
      // })

      baseRequest('/objective/rwGoalPermission/isAvailable', {}).then((response) => {
        const { payFlag, days } = response.data.item
        // if (endDate === null || endDate === '' || Number(days) <= 31) {
        //   this.status = 1
        // } else {
        //   this.status = (payFlag === '1' ? 2 : 3)
        // }
        if (payFlag === '0') {
          this.status = 3
        } else {
          if (days && Number(days) > 31) {
            this.status = 2
          } else {
            this.status = 1
          }
        }
      })
    },
    getApplySp() {
      const roles = this.$store.state.user.roles
      if (roles.length === 1 && (roles[0] === '8' || roles[0] === '6')) {
        baseRequest('/objective/rwGoalPermission/isTrial').then(response => {
          this.applySp = response.data.item.status
        })
      } else {
        this.applySp = false
      }
    },
    applySpHandle() {
      this.applySp = false
      if (this.userId) {
        baseRequest('/objective/rwGoalPermission/isTrial').then(response => {
          if (response.data.item.status) {
            baseRequest('/objective/rwGoalPermission/addTrial').then(_ => {
              this.$Message.success('申请成功')
              this.getApplySp()
            })
          } else {
            this.$Message.warning('您已申请过免费试用')
          }
        })
      } else {
        const path = '/course/sp'
        const query = {}
        const fromPage = JSON.stringify({ path, query })
        this.$store.dispatch('SetLoginFromPage', fromPage).then(_ => {
          this.$router.push({ name: 'login' })
        })
      }
    },
    handleBuy(type) {
      this.$router.push({
        name: 'sp-buy',
        params: {
          id: this.id
        },
        query: {
          type,
          name: this.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.project-sp {
		width: 100%;
		min-height: calc(100vh - 100px);
		background-color: #ffffff;
	}

	.sp-body {
		width: 1440px;
		min-height: 100px;
		margin: 0 auto;
		padding: 50px 150px;
		// border: 1px solid #ccc;

		.sp-title {
			text-align: center;
		}
		.sp-title-item {
			margin: 80px 0;
			.title-image {
				margin: 0 40px;
			}
			.item-content {
				position: relative;
				line-height: 2;
			}
		}
		.sp-item {
			position: relative;
			margin: 80px 0 80px 100px;
			.item-img {
				// width: 250px;
				// margin: 0 20px;
				.p-img{
					width: 220px;
				}
			}
			.item-content {
				line-height: 2;
			}
		}
	}

	.tuchu{
		font-weight: bolder;
		color: #F56C6C;
	}

	.sp-prise-1{
		// position: absolute;
		right: left;
		bottom: 60px;
		color: #222222;
		font-size: 16px;
		font-weight: 600;
		margin-top: 15px;
	}
	.sp-prise-2{
		// position: absolute;
		// left: 20px;
		bottom: 30px;
		color: #222222;
		font-size: 16px;
		// font-weight: 600;
	}
	.sp-prise{
		// position: absolute;
		// left: 20px;
		bottom: 0;
		color: #222222;

		font-size: 16px;
		// font-weight: 600;
	}
	.sp-buy {
		position: absolute;
		right: 0;
		bottom: 0;
	}

	.sp-table {
		display: table;
		.cell {
			display: table-cell;
			&.top {
				vertical-align: top;
			}
			&.bottom {
				vertical-align: bottom;
			}
		}
	}

	.line {
		border: 0;
    border-top: 1px dashed #ccc;
	}
</style>

