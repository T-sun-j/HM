<template>
  <div>
    <div class="title-zone">
        <indexTitle>搜索结果</indexTitle>
        <div @click="goback" class="goback">
          <span>返回</span>
          <van-icon name="arrow" /><van-icon name="arrow" />
        </div>
      </div>
    
    <p  class="doing">查不到搜索的结果</p>
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
     
    };
  },
  methods: {
    goback(){
        this.$router.go(-1)
      }
  },
};
</script>

<style lang="scss" scoped>
.case-zone{
  overflow: hidden;
  height: 1.3rem;
  margin:.4rem 0;
}
.case-list{
  
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  padding-bottom: .25rem;
  .case-item{
    display: inline-block;
    text-align: center;
    margin:0 .3rem;
    white-space: nowrap;
    overflow-y: auto;
    &.active{
      .icon-box{
        background-color: #0064a0;
      }
      p{
        color: #0064a0;
      }
    }
    .icon-box{
      width: .7rem;
      height: .7rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #949494;
      margin:0 auto;
      img{
        width: .36rem;
        height: .36rem;
      }
    }
    p{
      color: #949494;
      font-size: .26rem;
      text-align: center;
      line-height: 2;
    }
  }
}
.doing{
  text-align: center;
  font-size: .28rem;
  margin:2rem 0 4rem;
}
.title-zone {
  position: relative;
  margin:0 .2rem .16rem .2rem;
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
</style>
