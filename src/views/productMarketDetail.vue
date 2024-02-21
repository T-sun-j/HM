<template>
  <div>
    <div class="baike">
      <div class="title-zone">
        <indexTitle>{{ title }}</indexTitle>
        <div @click="goback" class="goback">
          <span>返回</span>
          <van-icon name="arrow" /><van-icon name="arrow" />
        </div>
      </div>
      
    </div>
    <div v-if="title=='专业娱乐系统'" class="banner">
      <img src="../assets/img/img/page.png" alt="">
    </div>
    <div v-else class="nota">建设中...</div>
    <div v-if="title=='专业娱乐系统'" class="look-more">
        <p>点击查看更多</p>
        <van-icon name="arrow-down" />
      </div>
      
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      title:''
    };
  },
  created() {
    this.title = this.$route.query.title
  },
  methods: {
    goback(){
        this.$router.go(-1)
      }
  },
};
</script>

<style lang="scss" scoped>
.baike{
  margin:.3rem .2rem 0;
}
.title-zone {
  position: relative;
  margin-bottom: .16rem;
  .goback {
    font-size: 0.3rem;
    color: #5a5a5a;
    position: absolute;
    top: 0;
    right: 0;
    span{
      margin-right:.2rem;
    }
    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
}
.banner{
  img{
    width: 100%;
  }
  
}
.nota{
  font-size: .28rem;
  text-align: center;
  margin:2rem 0;
}
.cq-img{
  img{
    width: 100%;
  }
}
.look-more{
    text-align: center;
    font-size: .3rem;
    color: #458eba;
    margin: .4rem 0;
    p{
      text-align: center;
      padding-bottom: .04rem;
    }
  }
</style>
