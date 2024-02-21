<template>
  <div class="title">
    <div class="title-cont">
      <slot>title</slot>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.title{
  border-bottom: 1px solid #0064a0;
  display: flex;
  .title-cont{
    height: .42rem;
    background-color: #0064a0;
    display: flex;
    // justify-content: center;
    // align-items: center;
    line-height: .44rem;;
    color: #fff;
    font-size: .28rem;
    padding: 0 .28rem;
  }
}
</style>