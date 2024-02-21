<template>
  <div>
    <indexHeader></indexHeader>
    <div class="pro-nav">
      <div
        class="pro-item"
        :class="[active == index ? 'active' : '']"
        @click="changeTab(index)"
        v-for="(item, index) in navs"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    
    <div class="detail-data">
      <div class="goback">返回 <van-icon name="arrow" /></div>
      <div class="data-more">
        <img src="../assets/img/home-kv.png" alt="" />
      </div>
    </div>
    <div class="look-more">
        <p>查看更多</p>
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
      navs: ["按品牌分类", "按市场分类"],
      searchText: "",
      active: 0,
    };
  },
  methods: {
    changeTab(index) {
      this.active = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.pro-nav {
  display: flex;
  height: 0.82rem;
  background-color: #a7a7a7;
  .pro-item {
    width: 50%;
    box-sizing: border-box;
    line-height: 0.82rem;
    text-align: center;
    font-size: 0.24rem;
    color: #fff;

    &:first-child {
      border-right: 1px solid #0064a0;
    }
    &.active {
      background-color: #0064a0;
    }
  }
}
.detail-data{
  position: relative;
}
.goback {
  color: #fff;
  position: absolute;
  top:.2rem;
  right: .2rem;
  font-size: .3rem;
}
.data-more{
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
