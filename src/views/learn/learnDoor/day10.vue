<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan text-b">活出人生使命</p>
            <p class="door-text-duan">认识独特真实的自己，清晰内在不息的渴求，明确自己生存的目的，这些都只是代表你开始朝向真正要前行的方向，但只有活出使命，才能真正实现你存在的价值，不枉此生。</p>
            <p class="door-text-duan door-upblank">那么如何活出你的人生使命？还记得前面你制作的人生路线图吗，前面的路线我们已无法改变，但如果此刻邀请你：暂停几秒，将注意力转向未来——有什么画面正在浮现？有什么想法正在涌起？你将如何绘制从今往后的生命蓝图？</p>
            </div>
            <div class="door-tf-box clearfix">
                <upload-jxh class="door-tf-item" v-for="(item,index) in imgList" :key="item.id" :imgItem="item" :pid="133" :days="'10'" @getImages="getImages()" @deleteImg="deleteImg(index)"></upload-jxh>
                <div class="door-tf-item" v-if="imgList.length<5">
                    <el-button style=" margin-top: 228px;margin-left:5px;" type="primary" @click="addImages()">添加</el-button>
                </div>
            </div>
            <div class="door-life-path clearfix">
                <div class="door-life-path-l">
                    <p class="door-text-duan text-b">活出人生使命的路径</p>
                    <p class="door-text-duan text-b">1、描述愿景并写下梦想清单</p>
                    <div style="padding-left:30px;">
                        <p class="door-text-duan"><b>A.愿景：</b>我5年、10年甚至更长时间以后的样子</p>
                        <div class="door-qa-box no-margin-t">
                            <div class="door-question">如：我在做什么？处在怎样的状态中？自己的收益和成长是什么？带给别人的收益和帮助是什么？</div>
                            <el-input class="door-answer" :disabled="!q134" v-model="formData.q134.answer" maxlength="800" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                            <el-button class="door-btn-save" v-if="!q134" type="primary" size="small" @click="q134 = true">编辑</el-button>
                            <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q134')">保存</el-button>         
                        </div>
                    </div>
                </div>
                <div class="door-life-path-r">
                    <img src="https://www.raise-wisdom.com/media/static/lifepath.jpg" alt="">
                </div>
            </div>
            <!-- <div class="door-tf-box clearfix" style="padding-left:30px;">
                <p class="door-text-duan door-upblank"><b>B．梦想清单：</b>（之后想到可以继续添加） </p>
                <upload-jxh class="door-tf-item"></upload-jxh>
                <upload-jxh class="door-tf-item"></upload-jxh>
                <div class="door-tf-item">
                    <el-button style=" margin-top: 214px;margin-left:5px;" type="primary">添加</el-button>
                </div>
            </div> -->
            <div class="door-tf-box clearfix" style="padding-left:30px;">
              <p class="door-text-duan door-upblank"><b>B．梦想清单：</b>（之后想到可以继续添加） </p>
                <text-a-file class="door-tf-item" v-for="(item,index) in imgList2" :key="item.id" uploadTip="上传具象化图片" :imgItem="item" :pid="135" :days="'10'" @getImages="getImages(true)" @deleteImg="deleteImg(index,true)"></text-a-file>
                <div class="door-tf-item" v-if="imgList2.length<5">
                    <el-button style=" margin-top: 251px;margin-left:5px;" type="primary" @click="addImages(true)">添加</el-button>
                </div>
            </div>
            <div class="water-back">
              <img :src="watermark" style="height:170px;" class="watermark watermark-auto" alt="">
            <p class="door-text-duan text-b door-upblank">2、设定目标</p>
            <p class="door-text-duan">设定目标是一个选择目标的过程，一生中有很多事情要做，但是否一定是你的目标？请认真思考你的使命和愿景，将你的精力投入到真正有价值的目标上。</p>
            <p class="door-text-duan">(详情请见本文末尾说明 ☟)</p>
            <p class="door-text-duan text-b door-upblank">3、规划目标</p>
            <p class="door-text-duan">LMI创始人保罗·麦尔先生说：如果你没有实现你想要实现的目标，要么是目标设定的不够清楚，要么是没有设定达成目标的路径。</p>
            <p class="door-text-duan door-upblank">所以预先规划目标，进行全方位探索，清晰自己的挑战、整合有效的资源、思考多种路径及方案，不但能确保目标的达成，而且能由此强化你的信心，扩展你的视野，提升你的能力。</p>
            <p class="door-text-duan">(详情请见本文末尾说明 ☟)</p>
            <p class="door-text-duan text-b door-upblank">4、行动及追踪评估</p>
            <p class="door-text-duan">没有行动就不会有收获，但行动后没有追踪评估，常会使我们偏移方向徒做无用功，不但无法达成预定的目标成果，还会消耗我们的精力，打击我们的信心，也使我们失去从小的失误中学习成长的机会。所以请务必培养出行动并追踪评估的习惯。</p>
            <p class="door-text-duan">（详情请见本文末尾说明 ☟)</p>
            </div>

            <!-- 九宫格 -->
            <p class="door-text-duan text-b door-upblank" style="font-size:18px;" v-if="refresh">探索汇总九宫格</p>
            <p class="door-text-duan">至此，我们已来到了这段找寻人生使命、自我探索旅程的终点，让我们重新回顾这段旅程，以帮助我们更全观地思考人生的意义、价值、目标，更加笃定自己内在最深切的渴望及梦想。</p>
            <div class="door-nine-box clearfix">
              <div class="door-nine-item" v-for="item in nineData" :key="item.questionId" :class="{'no-right-border':item.third,'no-right-bottom':item.bottom}">
                <div class="door-nine-label">{{item.label}}</div>
                <div v-if="item.questionId === 'seven'">
                  <div class="door-nine-seven-value">
                    <span>{{item['58'].label}}&nbsp;&nbsp;</span>
                    {{item['58'].answer}}
                  </div>
                  <div class="door-nine-seven-value">
                    <span>{{item['65'].label}}&nbsp;&nbsp;</span>
                    {{item['65'].answer}}
                  </div>
                </div>
                <div v-else class="door-nine-value">
                  <span v-if="item.questionId === '66'">我是:&nbsp;&nbsp;</span>
                  {{item.answer}}
                </div>
                <i class="door-edit-btn el-icon-edit-outline" @click="updateNine(item)"></i>
              </div>
            </div>
            <p class="door-text-duan" style="text-align:right;margin-right:160px;margin-top:15px;">
              <el-button type="success" plain size="small" @click="materialDownLoad" :loading="downLoading">下载九宫格</el-button>
            </p>
            <p class="door-text-duan text-b door-upblank">【填写说明】:</p>
            <p class="door-text-duan">请依标号及箭头顺序填写，如下图</p>
            <div class="door-draw-box clearfix">
                <div class="door-draw-img">
                    <img src="https://www.raise-wisdom.com/media/static/ninegrid.jpg" alt="">
                </div>
            </div>
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan door-upblank">恭喜你完成了本次自我探索的旅程，我们深知，找寻人生价值并践行人生使命不是一蹴而就的，这将是一个在生命中持续思考与探索、持续磨练提升的过程。在三个月探索之门学习结束后，你仍可以以续费的方式，每隔一段时间重新回顾和探索，以确保生命方向不偏航，并持续获取向前的内在动力！</p>
            <p class="door-text-duan door-upblank">同样，活出人生使命也需要一套行之有效的方法论支持，使我们的探索可以真正转化出期待的成果。睿思智得核心辅导项目First Step和目标规划·SP工具系统，正是能够支持你设定目标、规划目标、实现目标的有效助力，帮助你把目标落实到行动，让梦想成为现实。</p>
            </div>
            <!-- <div style="text-align:right;padding-bottom:30px;">
                <span style="font-size:30px;">☞ </span> <el-button @click="intoBuyPage()" type="primary" size="small">立即购买</el-button>
            </div> -->
            <ul class="production-list">
              <li @click="intoBuyPage('firstStep')">First Step =></li>
              <li @click="intoBuyPage('sp')">目标规划·SP工具 =></li>
            </ul>
       </div>
       </el-scrollbar>
       <el-dialog
        append-to-body
        :title="currentNineItem.label"
        :visible.sync="formVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm" :model="nineForm" :rules="rules">
            <template v-if="currentNineItem.questionId === 'seven'">
              <el-form-item style="margin-top:0px;">
                <div class="form-label">正向：</div>
                <el-input type="textarea" :rows="4" style="" v-model="nineForm.value1" show-word-limit maxlength="100"></el-input>
            </el-form-item>
              <el-form-item style="margin-top:0px;">
                <div class="form-label">负向：</div>
                <el-input  type="textarea" :rows="4" style="" v-model="nineForm.value2" show-word-limit maxlength="100"></el-input>
            </el-form-item>
            </template>
            <el-form-item v-else style="margin-top:0px;">
                <div v-if="currentNineItem.questionId === '66'" class="form-label">我是：</div>
                <el-input  type="textarea" :rows="4" style="" v-model="nineForm.value" show-word-limit maxlength="100"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import UploadJxh from './components/UploadJxh'
import TextAFile from './components/TextAFile'
import { baseRequest } from '@/api/base'
import { download } from '@/utils/download'
import watermark from '@/assets/images/watermark.png'
export default {
  components: {
    UploadJxh,
    TextAFile
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    }
  },
  watch: {
  },
  props: {
  },
  data() {
    return {
      watermark,
      downLoading: false,
      refresh: true,
      formData: {
        q134: {
          id: 134,
          answer: null
        }
      },
      q134: false,
      imgList: {},
      imgList2: {},
      nineData: [
        {
          questionId: '59',
          label: '家庭启示',
          answer: '',
          id: null
        },
        {
          questionId: '60',
          label: '愿景/梦想',
          answer: '',
          id: null
        },
        {
          questionId: '61',
          answer: '',
          label: '才能特质',
          id: null,
          third: true
        },
        {
          questionId: '62',
          label: '典范效应',
          answer: '',
          id: null
        },
        {
          questionId: '63',
          label: '使命宣言',
          answer: '',
          id: null
        },
        {
          questionId: '64',
          label: '获得成就',
          answer: '',
          id: null,
          third: true
        },
        {
          questionId: 'seven',
          label: '经历反思',
          id: null,
          bottom: true,
          '58': {
            questionId: '58',
            label: '正向:',
            'answer': '',
            'id': null
          },
          '65': {
            questionId: '65',
            label: '负向:',
            'answer': '',
            'id': null
          }
        },
        {
          questionId: '66',
          label: '核心价值',
          answer: '',
          id: null,
          bottom: true
        },
        {
          questionId: '67',
          label: '贡献领域',
          answer: '',
          id: null,
          third: true,
          bottom: true
        }
      ],
      formVisible: false,
      currentNineItem: {},
      nineForm: {
        value: '',
        value1: '',
        value2: ''
      },
      rules: {}
    }
  },
  created() {
    this.getData()
    this.getImages()
    this.getImages(true)
    this.getNineData()
  },
  methods: {
    hasUpdateState() {
      return this.q134
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 10 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => {
            let boo = false
            if (item.id !== 136) {
              if (item.dataAnswer instanceof Array) {
                boo = item.dataAnswer.length > 0
              } else {
                boo = !!item.dataAnswer
              }
            }
            return boo
          })
          if (!result) {
            baseRequest('/course/rwReflectionDiary/selectNine', { day: 10, id: 136 }).then(response => {
              const dataList = response.data.item.dataList || []
              const a = dataList.some(item => {
                let boo = false
                for (const key in item) {
                  if (item[key].answer) {
                    boo = true
                  }
                }
                console.log(boo)
                return boo
              })
              if (a) {
                resolve()
              } else {
                reject()
              }
            })
          } else {
            resolve()
          }
        })
      })
    },
    getNineData() {
      baseRequest('/course/rwReflectionDiary/selectNine', { day: 10, id: 136 }).then(response => {
        const nineData = response.data.item.dataList || []
        for (const kv of nineData) {
          for (const key in kv) {
            if (key === '58' || key === '65') {
              const nineItem = this.nineData.find(item => item.questionId === 'seven')
              nineItem[key].answer = kv[key].answer
              nineItem[key].id = kv[key].id
            }
            const nineItem = this.nineData.find(item => item.questionId === key)
            if (nineItem) {
              nineItem.answer = kv[key].answer
              nineItem.id = kv[key].id
            }
          }
        }
        this.refresh = false
        this.$nextTick(_ => {
          this.refresh = true
        })
      })
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 10 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this[q] = false
      })
    },
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 10 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
        }
      })
    },
    intoBuyPage(name) {
      this.$router.push({
        name: name
      })
    },
    updateNine(item) {
      this.currentNineItem = item
      if (item.questionId === 'seven') {
        this.nineForm.value1 = item['58'].answer
        this.nineForm.value2 = item['65'].answer
      } else {
        this.nineForm.value = item.answer
      }
      this.formVisible = true
    },
    submit() {
      const params = {
        'day': '10',
        'id': 136
      }
      if (this.currentNineItem.questionId === 'seven') {
        params.dataAnswer = [
          {
            'answer': this.nineForm.value1,
            'id': this.currentNineItem['58'].questionId
          },
          {
            'answer': this.nineForm.value2,
            'id': this.currentNineItem['65'].questionId
          }
        ]
      } else {
        params.dataAnswer = [
          {
            'answer': this.nineForm.value,
            'id': this.currentNineItem.questionId
          }
        ]
      }
      baseRequest('/course/rwReflectionDiary/operationNine', params).then(response => {
        this.$Message.success('操作成功')
        this.formVisible = false
        this.getNineData()
      })
    },
    getImages(second) {
      let pid = 133
      if (second) {
        pid = 135
      }
      baseRequest('/course/rwReflectionDiary/getInformation', { days: 10, pid: pid }).then(response => {
        const imgList = response.data.item || []
        if (imgList.length === 0) {
          imgList.push({
            add: true,
            id: new Date().getTime(),
            answer: '',
            url: ''
          })
        }
        if (second) {
          this.imgList2 = imgList
        } else {
          this.imgList = imgList
        }
      })
    },
    addImages(second) {
      let imgList = this.imgList
      if (second) {
        imgList = this.imgList2
      }
      imgList.push({
        add: true,
        id: new Date().getTime(),
        answer: '',
        url: ''
      })
    },
    deleteImg(index, second) {
      if (second) {
        this.imgList2.splice(index, 1)
      } else {
        this.imgList.splice(index, 1)
      }
    },
    // 下载
    materialDownLoad() {
      this.downLoading = true
      download('/course/rwReflectionDiary/downloadNine', { days: '10' }, _ => {
        this.downLoading = false
      }, _ => {
        this.downLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './door.scss';
.door-life-path{
    margin-top: 20px;
    .door-life-path-l{
        float: left;
        width: 928px;
    }
    .door-life-path-r{
        float: right;
        padding-right: 50px;
    }
}
.door-nine-box{
  margin: 10px auto 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  width: 1000px;
  .door-nine-item{
    float: left;
    width: 33.3%;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 250px;
    padding: 20px 20px;
    position: relative;
    &.no-right-border{
      border-right: 0;
    }
    &.no-bottom-border{
      border-bottom: 0;
    }
    .door-edit-btn{
      position: absolute;
      bottom: 20px;
      right: 25px;
      font-size: 20px;
      color: #00afff;
      cursor: pointer;
    }
    .door-nine-label{
      text-align: center;
      font-weight: bold;
    }
    .door-nine-value{
      margin-top: 5px;
      height: 150px;
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:5; 
    }
    .door-nine-seven-value{
      margin-top: 5px;
      height: 60px;
      overflow:hidden; 
      text-overflow:ellipsis;
      display:-webkit-box; 
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2; 
      &:last-child{
        margin-top: 15px;
      }
    }
  }
}
.production-list{
    margin-top: 25px;
    font-size: 16px;
    color: #00afff;
    list-style: #222222;
    text-decoration: underline;
    cursor: pointer;
}
</style>