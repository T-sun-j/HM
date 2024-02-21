<template>
  <div class="dealer">
    <!-- <indexHeader :active="7"></indexHeader> -->
    <div class="club-top">
      <div class="club-txt">
        <h4>欢迎来到经销商渠道</h4>
        <p>为了更好的了解您的需要，并推送相关信息给你</p>
      </div>
    </div>
    <ul class="dealer-list">
      <li @click="goto(index)" v-for="(item,index) in list" :key="index">
        <img :src="item.url" alt="">
      </li>
     
    </ul>
    <foot></foot>
  </div>
</template>

<script>
// import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { getdealercode,getData } from "../api";
import {setItem,getItem} from '../utils/storage'
export default {
  components: {
    // indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      list:[
        {
          url:require('../assets/img/dealer/dealer-icon-1.png')
        },
        {
          url:require('../assets/img/dealer/dealer-icon-2.png')
        },
        {
          url:require('../assets/img/dealer/dealer-icon-3.png')
        },
        {
          url:require('../assets/img/dealer/dealer-icon-4.png')
        },
      ]
    };
  },
  created(){
    // this.initData()
  },
  
  methods: {
    initData(){
      const param = {
        action:'dealersecretlogin',
        dealersecret:sessionStorage.getItem('secret'),
        
      }
      getData(param).then(res => {
        if(res.code == 0){
        } else {
          showToast(res.msg)
        }
      })
    },
    goto(index){
      this.$router.push({
        name:'dealerTab',
        query:{
          index
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.dealer{
.club-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:.4rem .42rem .2rem;
  .club-txt{
    h4{
      color: #0064a0;
      font-size: .3rem;
      margin-bottom: .15rem;
    }
    p{
      font-size:.24rem;
    }
  }
}
.dealer-list{
  display: flex;
  flex-wrap: wrap;
  margin:.3rem .42rem;
  justify-content: space-between;
  li{
    margin-bottom: .12rem;
    width: 3.25rem;
    height: 2.25rem;
    img{
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
}
</style>
