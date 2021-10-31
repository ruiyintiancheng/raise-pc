<template>
    <div class="door-box" :style="{height:materialsHeight+'px'}">
       <el-scrollbar style="height:100%">
        <div class="scrollbar-box">
            <div class="water-back">
              <img :src="watermark" class="watermark watermark-auto" alt="">
            <p class="door-text-duan text-b">自我认知</p>
            <p class="door-text-duan">在我们过往的人生中总会发生一些我们认为的重大事件，回看一下这些事件对我们产生的影响，你会发现这些生命的轨迹，成就了今天独特的你。</p>
            <p class="door-text-duan door-upblank"><b>绘制人生路线图</b>（请先下载下面的图表，并参考后面的图例）：</p>
            <p class="door-text-duan door-intent15">1、在图中最右侧箭头下标记上你现在的年龄；</p>
            <p class="door-text-duan door-intent15">2、根据年龄在左侧的各列中标记出年龄区段（可按平均设置，也可自行定义）；</p>
            <p class="door-text-duan door-intent15">3、在区段中标出从小到大对你产生重大影响的事件；</p>
            <p class="door-text-duan door-intent15">4、中间横线的上部代表对你产生积极情绪的正向影响，下部代表对你产生消极情绪的负向影响。距离中线位置越远，代表影响程度越大；</p>
            <p class="door-text-duan door-intent15">5、请依据影响程度在图中标记出这些重大事件，并用连线串联起来。</p>
            </div>
            <!-- table-start -->
            <div class="door-table-box">
                <div class="door-question">列出对你产生重大影响的事件并绘制出路线图：</div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataOne"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="left"  label="事件">
                      <template slot-scope="scope">
                        {{scope.row['37']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160px">
                        <template slot="header">
                            <div @click="addHandle('one')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                        </template>
                        <template slot-scope="scope" >
                            <el-button type="primary" size="mini" plain @click="updateHandle(scope.row,'one')">修改</el-button>
                            <el-button type="danger" size="mini" plain @click="deleteHandle(scope.row,'one')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- table-end -->
            <!-- 路线图-start -->
            <div class="door-draw-box clearfix">
                <div class="door-draw-label">模板</div>
                <div class="door-draw-img">
                    <img :src="baseUrl+'media/static/templet.jpg'" alt="">
                    <el-button @click="downloadIamge(baseUrl+'media/static/templet.jpg','人生路线图模板')" class="door-draw-btn" type="primary" size="small">下载模板</el-button>
                </div>
            </div>
            <div class="door-draw-box clearfix">
                <div class="door-draw-label">图例</div>
                <div class="door-draw-img">
                    <img :src="baseUrl+'media/static/legend.jpg'" alt="">
                    <!-- <el-button class="door-draw-btn" type="primary" size="small">下载模板</el-button> -->
                </div>
            </div>
            <div class="door-draw-box clearfix">
                <div class="door-draw-label">我的线路图 
                  <el-upload
                    style="display:inline-block;"
                    v-if="!imgItem"
                    v-loading="imageLoading"
                    class="avatar-uploader"
                    ref="upload"
                    :data="{'a':'1'}"
                    action="/rwFile/upload"
                    :http-request="sourceUploadRequest"
                    :show-file-list="false"
                    :auto-upload="true">
                    <el-button style="margin-left:15=0px;" type="primary" size="small">上传</el-button>
                </el-upload> 
                </div>
                <div v-if="imgItem" class="door-draw-img">
                    <img :src="imgItem.url" alt="">
                    <el-upload
                    v-loading="imageLoading"
                    class="avatar-uploader door-draw-btn"
                    ref="upload"
                    :data="{'a':'1'}"
                    action="/rwFile/upload"
                    :http-request="sourceUploadRequest"
                    :show-file-list="false"
                    :auto-upload="true">
                    <el-button style="margin-left:15=0px;" type="primary" size="small">重新上传</el-button>
                </el-upload> 
                </div>
            </div>
            <!-- 路线图-end -->
            <!-- table-start -->
            <div class="door-table-box">
                <div class="door-question">
                  <p class="door-text-duan">反思：</p>
                  <p class="door-text-duan">我会如何命名其中的各个阶段？命名并写下这些阶段带给我的影响：</p>
                </div>
                <el-table
                    class="table-main door-table"
                    :data="tableDataTwo"
                    border
                    style="width: 100%">
                    <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
                    <el-table-column prop="q" align="center" width="200" label="阶段">
                      <template slot-scope="scope">
                        {{scope.row['39']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="w" align="center" width="300" label="阶段命名" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['40']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="e" align="center"  label="对我产生的影响" show-overflow-tooltip>
                      <template slot-scope="scope">
                        {{scope.row['41']['answer']}}
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="160px">
                        <template slot="header">
                            <div @click="addHandle('two')" style="cursor:pointer;color:#00afff;"><i class="el-icon-circle-plus-outline"></i> 添加</div>
                        </template>
                        <template slot-scope="scope" >
                            <el-button type="primary" size="mini" plain @click="updateHandle(scope.row,'two')">修改</el-button>
                            <el-button type="danger" size="mini" plain @click="deleteHandle(scope.row,'two')">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- table-end -->
            <div class="door-qa-box">
                <div class="door-question">如果沿中线把这张图翻转过来看（翻转正、负影响），曾经带给我希望和信心的正向影响、实际上隐藏了哪些风险和真相？</div>
                <el-input class="door-answer" :disabled="!q107" maxlength="500" v-model="formData.q107.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q107" type="primary" size="small" @click="q107 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q107')">保存</el-button>
            </div>
            <div class="door-qa-box">
                <div class="door-question">而所谓的负向影响却促进我哪些向内的反思？</div>
                <el-input class="door-answer" :disabled="!q108" maxlength="500" v-model="formData.q108.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q108" type="primary" size="small" @click="q108 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q108')">保存</el-button>
            </div>
            <!-- 喜欢的阶段-start -->
            <div class="door-favourite-box">
                <div class="door-question">请选出最喜欢和最不喜欢的阶段，为什么？</div>
                <el-form class="door-favourite-template clearfix" ref="formFavourite" :model="formFavourite">
                  <div class="door-favourite-item first-fav">
                    <el-form-item style="margin-top:0px;" prop="trackGoal">
                        <div class="form-label">最喜欢</div>
                        <el-input  :disabled="!q109"  style="width: 600px;" v-model="formFavourite['43']['answer']" show-word-limit maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:0px;" prop="trackGoal">
                        <div class="form-label">喜欢的原因</div>
                        <el-input   :disabled="!q109"  type="textarea" :rows="4" style="width: 600px;" v-model="formFavourite['44']['answer']" show-word-limit maxlength="500"></el-input>
                    </el-form-item>
                  </div>
                  <div class="door-favourite-item last-fav">
                    <el-form-item style="margin-top:0px;" prop="trackGoal">
                        <div class="form-label">最不喜欢</div>
                        <el-input   :disabled="!q109"   style="width: 600px;" v-model="formFavourite['45']['answer']" show-word-limit maxlength="20"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-top:0px;" prop="trackGoal">
                        <div class="form-label">不喜欢的原因</div>
                        <el-input   :disabled="!q109"  type="textarea" :rows="4" style="width: 600px;" v-model="formFavourite['46']['answer']" show-word-limit maxlength="500"></el-input>
                    </el-form-item>
                  </div>
                </el-form>
                <div class="door-favourite-btns">
                  <el-button class="door-btn-save" v-if="!q109" type="primary" size="small" @click="q109 = true">编辑</el-button>
                  <el-button class="door-btn-save" v-else type="success" size="small" @click="saveFavourite">保存</el-button>
                </div>
            </div>
            <!-- 喜欢的阶段-end -->
            <div class="door-qa-box">
                <div class="door-question">看着这张代表我过往人生轨迹的路线图，我觉得这张图在告诉着我怎样的信息？</div>
                <el-input class="door-answer" :disabled="!q111"  maxlength="500" v-model="formData.q111.answer" type="textarea" placeholder="" show-word-limit :rows="4"></el-input>
                <el-button class="door-btn-save" v-if="!q111" type="primary" size="small" @click="q111 = true">编辑</el-button>
                <el-button class="door-btn-save" v-else type="success" size="small" @click="saveInput('q111')">保存</el-button>
            </div>
            <p class="door-text-duan door-upblank">人生经历是自我拼图中至关重要的一块，从小到大发生的所有事情都是为了成就今天的我。从人生的大尺度来看这些高峰低谷的时刻，像是支持你经历了一场与自我灵魂的对话，寻找它们背后的意义和真正的力量、推动你去体悟：我真的想要的是什么？</p>
       </div>
       </el-scrollbar>
       <!-- 影响弹框 -->
       <el-dialog
        append-to-body
        :title="updateStatus === 0?'添加':'修改'"
        :visible.sync="formOneVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm1" :model="updateFormOne" :rules="rulesOne">
            <el-form-item style="margin-top:0px;" prop="trackGoal">
                <div class="form-label required">事件</div>
                <el-input  :rows="4" style="" v-model="updateFormOne['37']" show-word-limit maxlength="20"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formOneVisible = false">取 消</el-button>
            <el-button type="primary" :loading="subbtn" @click="submit('one')">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 命名弹框 -->
        <el-dialog
        append-to-body
        :title="updateStatus === 0?'添加':'修改'"
        :visible.sync="formTwoVisible"
        class="dialog-main heightauto"
        top="5%"
        width="400px"
        destroy-on-close
        :close-on-click-modal="false"
        >
        <el-form ref="ruleForm2" :model="updateFormTwo" :rules="rulesTwo">
          <el-form-item style="margin-top:0px;" prop="trackGoal">
              <div class="form-label required">阶段</div>
              <el-input  style="" v-model="updateFormTwo['39']" show-word-limit maxlength="10"></el-input>
          </el-form-item>
          <el-form-item style="margin-top:0px;" prop="trackGoal">
              <div class="form-label required">阶段命名</div>
              <el-input :rows="4" style="" v-model="updateFormTwo['40']" show-word-limit maxlength="10"></el-input>
          </el-form-item>
          <el-form-item style="margin-top:0px;" prop="trackGoal">
              <div class="form-label required">对我产生的影响</div>
              <el-input type="textarea" :rows="7" style="" v-model="updateFormTwo['41']" show-word-limit maxlength="200"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button  @click="formTwoVisible = false">取 消</el-button>
            <el-button type="primary" :loading="subbtn" @click="submit('two')">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import { baseRequest, baseUpload } from '@/api/base'
import { downloadIamge } from '@/utils/download'
import watermark from '@/assets/images/watermark.png'
export default {
  components: {
  },
  computed: {
    materialsHeight() {
      return this.$store.state.app.containHeight - 340
    },
    baseUrl() {
      let baseUrl = ''
      if (process.env.BASE_API.startsWith('https://www.raise-wisdom.com')) {
        // 生产
        baseUrl = 'https://www.raise-wisdom.com/'
      } else {
        // 测试
        baseUrl = 'http://www.fascte.cn:9201/'
      }
      return baseUrl
    }
  },
  watch: {
  },
  props: {
  },
  data() {
    return {
      watermark,
      imageLoading: false,
      downloadIamge,
      formData: {
        q107: {
          id: 107,
          answer: null
        },
        q108: {
          id: 108,
          answer: null
        },
        q111: {
          id: 111,
          answer: null
        }
      },
      q107: false,
      q108: false,
      q111: false,
      q109: false,
      formFavourite: {
        '43': {},
        '44': {},
        '45': {},
        '46': {}
      },
      tableDataOne: [
      ],
      tableDataTwo: [
      ],
      updateStatus: null,
      formOneVisible: false,
      formTwoVisible: false,
      updateFormOne: {},
      updateFormTwo: {},
      rulesOne: {
        '37': [
          { required: true, message: '该项不能为空' }
        ]
      },
      rulesTwo: {
        '39': [
          { required: true, message: '该项不能为空' }
        ],
        '40': [
          { required: true, message: '该项不能为空' }
        ],
        '41': [
          { required: true, message: '该项不能为空' }
        ]
      },
      currentRow: {},
      imgItem: null,
      subbtn: false
    }
  },
  created() {
    this.getData()
    this.getImages()
  },
  methods: {
    hasUpdateState() {
      return this.q107 || this.q108 || this.q111
    },
    canGoon() {
      return new Promise((resolve, reject) => {
        baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 4 }).then(response => {
          const dataList = response.data.item.dataList || []
          const result = dataList.some(item => {
            let boo = false
            if (item.dataAnswer instanceof Array) {
              if (item.dataAnswer.length > 0) {
                console.log(item.dataAnswer)
                boo = item.dataAnswer.some(i => {
                  let a = false
                  for (const key in i) {
                    if (i[key].answer) {
                      a = true
                    }
                  }
                  return a
                })
              }
              console.log(boo)
            } else {
              boo = !!item.dataAnswer
            }
            return boo
          })
          if (!result) {
            baseRequest('/course/rwReflectionDiary/getInformation', { days: 4, pid: 110 }).then(response => {
              if (response.data.item && response.data.item.length > 0) {
                if (response.data.item[response.data.item.length - 1].url) {
                  resolve()
                } else {
                  reject()
                }
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
    getData() {
      baseRequest('/course/rwReflectionDiary/getExploreDays', { day: 4 }).then(response => {
        const dataList = response.data.item.dataList
        for (const iterator of dataList) {
          for (const key in this.formData) {
            if ('q' + iterator.id === key) {
              this.formData[key].answer = iterator.dataAnswer || ''
            }
          }
          if (iterator.id === 105) {
            this.tableDataOne = iterator.dataAnswer || []
          } else if (iterator.id === 106) {
            this.tableDataTwo = iterator.dataAnswer || []
          } else if (iterator.id === 109) {
            if (iterator.dataAnswer && iterator.dataAnswer[0]) {
              this.formFavourite = iterator.dataAnswer[0]
            }
          }
        }
      })
    },
    getImages() {
      baseRequest('/course/rwReflectionDiary/getInformation', { days: 4, pid: 110 }).then(response => {
        if (response.data.item && response.data.item.length > 0) {
          this.imgItem = response.data.item[response.data.item.length - 1]
          this.imgItem.url = this.baseUrl + this.imgItem.url.split('/ROOT/')[1]
        } else {
          this.imgItem = null
        }
      })
    },
    addHandle(order) {
      this.updateStatus = 0
      if (order === 'one') {
        if (this.tableDataOne.length >= 24) {
          this.$Message.warning('抱歉，该清单最多添加24条数据')
          return
        }
        this.updateFormOne = {
          '37': null
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        if (this.tableDataTwo.length >= 12) {
          this.$Message.warning('抱歉，该清单最多添加12条数据')
          return
        }
        this.updateFormTwo = {
          '39': null,
          '40': null,
          '41': null
        }
        this.formTwoVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm2.clearValidate()
        ])
      }
    },
    updateHandle(row, order) {
      this.updateStatus = 1
      this.currentRow = row
      if (order === 'one') {
        this.updateFormOne = {
          '37': row['37']['answer']
        }
        this.formOneVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm1.clearValidate()
        ])
      } else {
        this.updateFormTwo = {
          '39': row['39']['answer'],
          '40': row['40']['answer'],
          '41': row['41']['answer']
        }
        this.formTwoVisible = true
        this.$nextTick(_ => [
          this.$refs.ruleForm2.clearValidate()
        ])
      }
    },
    deleteHandle(row) {
      const dataAnswer = []
      for (const key in row) {
        dataAnswer.push({ id: row[key].id })
      }
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        baseRequest('/course/rwReflectionDiary/deleteFrom', { dataAnswer }).then(_ => {
          this.$Message.success('操作成功')
          this.getData()
        })
      })
    },
    saveInput(q) {
      const params = { dataAnswer: [this.formData[q]], day: 4 }
      baseRequest('/course/rwReflectionDiary/operationQuestion', params).then(_ => {
        this.$Message.success('操作成功')
        this.getData()
        this[q] = false
      })
    },
    saveFavourite() {
      const dataAnswer = []
      let hasId = false
      for (const key in this.formFavourite) {
        this.formFavourite[key].name = this.formFavourite[key].answer || ''
        if (this.formFavourite[key].id) {
          hasId = true
        } else {
          this.formFavourite[key].questId = key
        }
        dataAnswer.push(this.formFavourite[key])
      }
      if (hasId) {
        baseRequest('/course/rwReflectionDiary/updateFrom', { dataAnswer }).then(_ => {
          this.$Message.success('操作成功')
          this.getData()
          this.q109 = false
        })
      } else {
        baseRequest('/course/rwReflectionDiary/insertFrom', { id: '109', day: '4', dataAnswer }).then(_ => {
          this.$Message.success('操作成功')
          this.getData()
          this.q109 = false
        })
      }
    },
    submit(order) {
      const params = {
        day: '4'
      }
      let updateForm = {}
      let ref = null
      if (order === 'one') {
        params.id = '105'
        updateForm = this.updateFormOne
        ref = this.$refs.ruleForm1
      } else {
        params.id = '106'
        updateForm = this.updateFormTwo
        ref = this.$refs.ruleForm2
      }
      const dataAnswer = []
      let updateUrl = ''
      if (this.updateStatus === 0) {
        updateUrl = '/course/rwReflectionDiary/insertFrom'
        for (const key in updateForm) {
          const obj = {
            name: updateForm[key],
            questId: key
          }
          dataAnswer.push(obj)
        }
      } else {
        updateUrl = '/course/rwReflectionDiary/updateFrom'
        for (const key in updateForm) {
          console.log(this.currentRow)
          const obj = {
            name: updateForm[key],
            id: this.currentRow[key].id
          }
          dataAnswer.push(obj)
        }
      }
      params.dataAnswer = dataAnswer
      ref.validate((valid) => {
        if (valid) {
          this.subbtn = true
          baseRequest(updateUrl, params).then(_ => {
            this.$Message.success('操作成功')
            this.formOneVisible = false
            this.formTwoVisible = false
            this.getData()
          }).finally(_ => {
            this.subbtn = false
          })
        } else {
          return false
        }
      })
    },
    sourceUploadRequest(content) {
      const patt = new RegExp('.*\.(jpg|jpeg|png|JPG|JPEG|PNG)$')
      if (!patt.test(content.file.name)) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '错误的文件类型,请选择jpg/jpeg/png文件上传',
          type: 'error'
        })
        return
      }
      const isLt1M = content.file.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$refs.upload.clearFiles
        this.$Message({
          showClose: true,
          message: '文件大小不能超过1M',
          type: 'error'
        })
        return
      }
      var form = new FormData()
      form.append('file', content.file)
      this.imageLoading = true
      let url = ''
      if (!this.imgItem) {
        url = '/course/rwReflectionDiary/fileUpload/4/110'
      } else {
        url = '/course/rwReflectionDiary/updateLoad/' + this.imgItem.id
      }
      baseUpload(url, form).then((response) => {
        // this.fileId = response.data.item.fileId
        var reader = new FileReader()
        reader.readAsDataURL(content.file)
        reader.onload = e => {
          this.imageLoading = false
          this.$Message.success('上传成功')
          this.getImages()
        }
      }, _ => {
        this.$refs.upload.clearFiles()
        this.imageLoading = false
        this.$Message({
          showClose: true,
          message: '上传失败',
          type: 'error'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './door.scss';
.door-favourite-box{
    margin-top: 20px;
    min-height: 50px;
    width: 100%;
    position: relative;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    .door-favourite-template{
      margin-top: 15px;
      .door-favourite-item{
        float: left;
        width: 655px;
        &.last-fav{
          border-left: 1px dashed #ccc;
          padding-left: 50px;
        }
      }
    }
    .door-favourite-btns{
      text-align: right;
      padding-right: 10px;
    }
}
</style>