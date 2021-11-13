<template>
  <SideNav /> 
  <router-view class="nav main-content position-relative max-height-vh-100 h-100 mt-1 border-radius-lg"/>
</template>

<script>

import SideNav from './Layouts/SideNav.vue'
export default {
  components: {
   SideNav
  }
}
</script>
