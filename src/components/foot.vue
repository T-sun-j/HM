<template>
  <div class="foot">
    <img class="my-logo" src="../assets/img/general/foot-logo.png" alt="">
    <div class="logos">
      <img @click="goto(item,index)" v-for="(item,index) in brand" :key="index" :src="(item.logo.includes('https') ? '' : env.imgUrl) + item.logo" alt="">
    </div>
    <!-- <p>© 2023 HARMAN International. All Rights Reserved. <br>Privacy Policy | Cookies | Terms of Use</p> -->
  </div>
</template>

<script>
// AKG，AMX，BBS，Crown，dbx，JBL，Lexicon，Martin，Soundcraft
  export default {
    data(){
      return {
        env: window.env,
      }
    },
    props: {
      brand:Array
    },
    methods: {
      goto(item,index){
        let i =0;
        if(index<=5){
          i=index
        } else {
          i=index+1
        }
        this.$router.push({
          path:'/baikeDetail',
          query:{
            title:item.title,
            index:i
          }
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
.foot{
  margin-bottom: .7rem;
  .my-logo{
    display: block;
    width: 1.56rem;
    height: .92rem;
    margin:.45rem auto .45rem;
  }
  .logos{
    display: flex;
    justify-content: center;
    margin-bottom: .35rem;
    img{
      width: .64rem;
      height: .64rem;
      margin:0 .05rem;
    }
  }
  p{
    font-size: .2rem;
    color: #616661;
    text-align: center;
  }
}
</style>