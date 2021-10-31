<template>
  <div class="project-coachtalk">
        <svg-icon icon-class="icon-hexin"></svg-icon>
        <img :src="jlht" alt="" />
        <img :src="cktr" alt="" />
        <img :src="u1029" alt="" />
        <img :src="u1038" alt="" />
  </div>
</template>
<script>
import jlht from '@/assets/shouye-img/pic4.png'
import cktr from '@/assets/shouye-img/pic13.png'
import u1029 from '@/assets/shouye-img/u1029.png'
import u1038 from '@/assets/shouye-img/u1038.png'
export default {
  components: {
  },
  props: {},
  data() {
    return {
      jlht,
      cktr,
      u1029,
      u1038
    }
  }
}
</script>