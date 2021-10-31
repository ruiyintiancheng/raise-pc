<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App',
    mounted() {
      this.$nextTick(_ => {
        if (!IsPC()) {
          // const navbarContainer = document.querySelector('.navbar .navbar-container.inside-container')
          // const menuItem = document.querySelector('.navbar .navbar-container.inside-container .menu .menu-item')
          // if (menuItem) {
          //   menuItem.style.margin = '0 20px'
          // }
          document.body.style.zoom = 0.657
        }
      })
    }
  }
  function IsPC() {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone',
      'SymbianOS', 'Windows Phone',
      'iPad', 'iPod']
    var flag = true
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false
        break
      }
    }
    return flag
}
</script>

