<template>
  <div>
    <indexHeader></indexHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import indexHeader from '@/components/header.vue'
  export default {
    components:{
      indexHeader
    }
  }
</script>

<style lang="scss" scoped>

</style>