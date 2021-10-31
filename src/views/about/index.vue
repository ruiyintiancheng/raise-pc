<template>
    <div>
    <div class="about inside-container">
            <about></about>
            <jiazhiguan></jiazhiguan>
            <aboutLMI></aboutLMI>
            <aboutTdjs></aboutTdjs>
            <!-- <join></join> -->
            <!-- <aboutMap></aboutMap>     -->
    </div>
    </div>
</template>

<script>
import about from './components/about'
import jiazhiguan from './components/jiazhiguan'
import aboutLMI from './components/aboutLMI'
import aboutTdjs from './components/about-tdjs'
import join from './components/joinUs'
import aboutMap from './components/about-map'
export default {
  components: {
    about,
    aboutLMI,
    aboutMap,
    aboutTdjs,
    join,
    jiazhiguan
  }
}
</script>

<style lang="scss">
.about{
  margin: 0 auto;
  overflow: hidden;
}
</style>