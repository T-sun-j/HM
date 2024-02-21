<template>
  <div>
    <!-- @click="goDetail(itemdata)" -->
  <div class="item" @click="goDetail(itemdata)">
    <div class="img-box">
      <img :src="env.imgUrl + itemdata.pic" alt="">
    </div>
    <div class="img-cont">
      <h4>{{ itemdata.title }}</h4>
      <!-- <div class="over">
        <p v-if="itemdata.time">{{ itemdata.time }}</p>
      </div> -->
      
    </div>
  </div>

</div>
</template>

<script>
  
  export default {
    props:{
      itemdata:{
        type:Object,
        default:() => {}
      }
    },
    
    data(){
      return {
        env: window.env,
      }
    },
    methods: {
      goDetail(item){
      console.log('item :', item);
        
        this.$router.push({
          path:'/caseDetail',
          query:{
            secret:item.secret
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.item{
  overflow: hidden;
  padding:.25rem .2rem;
  border-bottom: 1px solid #a5a5a5;
  .img-box{
    float: left;
    width: 1.84rem;
    height: 1.35rem;
    margin-right: .16rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .img-cont{
    overflow: hidden;
    h4{
      font-size: .3rem;
      line-height: 1.2;
      color: #333;
      margin: .16rem 0 .1rem;
      word-wrap: break-word;
    }
    .over{
      overflow: hidden;
    }
    p{
      float: left;
      height: .32rem;
      padding:0 .15rem;
      line-height: .34rem;
      color: #fff;
      font-size: .24rem;
      background-color: #3db5e7;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

</style>