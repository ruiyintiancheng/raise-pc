<template>
  <div class="jlsh-content" :style="{ minHeight: tableHight + 'px' }">
      <h4 class="h4_left">TTT审核</h4>
  </div>
</template>

<script>
export default {
  computed: {
    tableHight() {
      return this.$store.state.app.containHeight - 158
    }
  }
}
</script>
