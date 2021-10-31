<template>
    <div class="materials-article">
          <img :src="watermark" class="watermark" alt="">
          <img :src="watermark" class="watermark watermark-2" alt="">
          <img :src="watermarkLmi" class="watermark-lmi" alt="">
          <h3 class="materials-title">S.M.A.R.T.目标</h3>
          <p>本周我们将学习写下S.M.A.R.T.目标：即以尽量简练的文字，写下你希望达成的明确目标。记得要以“具体的、可衡量的、可达成的、现实的、实质的”（S.M.A.R.T.）方式写下你的目标。请参考如下指导性的原则：</p>
          <p>&nbsp;</p>
          <p class="p-p"><b>• S代表“具体的”（SPECIFIC）</b>。具体的目标比笼统的目标达成机会要大很多。在设立具体的目标时可以先问自己：
          <p class="p"><span style="width:200px;display:inline-block;">☆ 谁:</span>牵涉到哪些人？</p>
          <p class="p"><span style="width:200px;display:inline-block;">☆ 什么：</span>我想达成什么？</p>
          <p class="p"><span style="width:200px;display:inline-block;">☆ 在哪儿：</span>具体地点</p>
          <p class="p"><span style="width:200px;display:inline-block;">☆ 何时：</span>具体时间</p>
          <p class="p"><span style="width:200px;display:inline-block;">☆ 哪一个：</span>确定需求与限制条件</p>
          <p class="p"><span style="width:200px;display:inline-block;">☆ 为什么：</span>明确达成目标的原因、目的或利益。</p>
          <p>&nbsp;</p>
          <p class="p-p"><b>• M代表“可衡量的”（MEASURABLE）</b>。为每项目标的达成设定可衡量进度的具体标准。衡量进度可以避免脱离正轨，让你能在预定日之前完成目标，并感受达成目标的喜悦。这种喜悦的感受会激励你不断努力，坚持到目标完成。
          </p>
          <p >想要知道目标是否可衡量，你可以问自己：我如何知道目标是否达成了？</p>
          <p>&nbsp;</p>
          <p class="p-p"><b>• A代表“可以达成的”（ATTAINABLE）</b>。找出最重要的目标之后，就要开始寻找实现目标的方法。你必须培养达成目标所需的能力，如技术与经济能力。借此你可能会看到之前没有注意到的机会，这些机会能让目标离你越来越近。
          </p>
          <p>你所设定的任何目标都可以达成，只要你明确地计划达成目标的步骤，并设定实践这些步骤的时间。这样看起来遥不可及的目标，距离最终都会缩短，变成可达成的目标。这并不是因为你的目标变小了，而是因为你的成长与进步，使得你的能力足以和你的目标相匹配。设定目标的过程，也是你建立自我形象的过程。你知道自己值得拥有这些目标，并且会培养出达成目标所需要的特质与个性。</p>
          <p>&nbsp;</p>
          <p class="p-p"><b>• R代表“现实的”（REALISTIC）</b>。一个现实的/切合实际的目标，代表这是一个你既有意愿又有能力去追求的目标。一个目标可以既远大又现实，只有你自己能决定目标的大小，但要确定每项目标都能带来实质性的进步。一个远大的目标往往比短小的目标更容易达成，因为对于短小的目标，你的动力通常也会很低。回想一下你曾经达成的一些极其艰难的目标，在当时对你来说可能并没有感觉到那么艰难，因为那是你心甘情愿去做的事情。</p>
          <p>如果你真心相信目标可以达成，那么就表示这项目标应该很现实。另外一个知道目标是否切合实际的方法，是想想看你过去是否达成过类似的目标？或问自己什么时候将具备条件达成这项目标？</p>
          <p>&nbsp;</p>
          <p class="p-p"><b>• T代表“实质的”（TANGIBLE）</b>。实质的目标是能以感官体验的目标——即写下来的目标像是可以通过味觉、嗅觉、触觉、视觉和听觉感知得到。如果你的目标是实质的，或你将一个非实质的目标与一个实质的目标连接起来，这个目标会变得更具体、可衡量，因此也更有机会达成。</p>
          <p>非实质的目标是指为达成更多实质目标所需的内在改变。为了追求事业成功或达成其它长期目标，你需要改变某些人格特质或行为模式。由于非实质的目标达成对于提升你的效能非常重要，设定非实质性目标时，你要密切关注实质性的衡量方法。</p>
          <p class="p-p">目标范例：</p>
          <div class="img-box">
            <img src="./images/weekTwo1.png" alt="">
          </div>
          <p>&nbsp;</p>
          <p style="border:1px solid #222;">系统会将您上周完成的“我的挑战表”发回给您，请根据本文提供的关于S.M.A.R.T.目标的指导原则，更改完善“我的挑战表”中的目标，作为你接下来要规划实现的目标。</p>
        </div>
</template>
<script>
import watermark from '@/assets/images/watermark.png'
import watermarkLmi from '@/assets/images/watermarkLMI.png'
export default {
  data() {
    return {
      watermark, watermarkLmi
    }
  }
}
</script>