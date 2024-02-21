<template>
  <div>
    <ul>
      <li @click="goto(item.url)" v-for="(item,index) in navs" :key="index">{{ item.name + index}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        navs:[
          {
            name:'页面',
            url:'index'
          },
          {
            name:'页面',
            url:'productData'
          },
          {
            name:'页面',
            url:'productMarket'
          },
          {
            name:'页面',
            url:'marketDetail'
          },
          {
            name:'页面',
            url:'case'
          },
          {
            name:'页面',
            url:'caseDetail'
          },
          {
            name:'页面',
            url:'baikeDetail'
          },
          {
            name:'页面',
            url:'shop'
          },
          {
            name:'页面',
            url:'service'
          },
          {
            name:'页面',
            url:'login'
          },
          {
            name:'页面',
            url:'home'
          },
          {
            name:'页面',
            url:'register'
          },
          {
            name:'页面',
            url:'dealer'
          },
          {
            name:'页面',
            url:'dealerTab'
          }
        ]
      }
    },
    methods: {
      goto(url){
        this.$router.push({
          name:url
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
ul{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 20%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #0064a0;
    color: #fff;;
    font-size: 20px;
    border:1px solid #fff;
    box-sizing: border-box;
  }
}
</style>