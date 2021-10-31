<template>
  <div class="">
    <month :viewDate="viewDate"></month>
  </div>
</template>

<script>
// import Week from './components/Week'
import month from '@/views/targetTool/components/month'
export default {
  components: {
    month
  },
  props: {
    viewDate: String
  },
  data() {
    return {
      activeName: 'first'
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

