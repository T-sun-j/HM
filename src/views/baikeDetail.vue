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
    <div class="banner">
      <img @click="goLink(detail.link)" :src="env.imgUrl + detail.product_pic" alt="">
    </div>
    <div class="baike" v-if="detail.legend !== null">
      <div class="title-zone">
        <indexTitle>传奇经历</indexTitle>
        <!-- <div class="cq-img">
          <img src="../assets/img/img/about-detail-2.png" alt="">
        </div> -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in detail.legend" :key="index">
            <img class="slide-img" :src="env.imgUrl + item.listpic" alt="">
          </van-swipe-item>
        </van-swipe>
      </div>

    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showToast } from 'vant';
import { getLegendList } from "../api/baikeApi";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
    //https://cn.akg.com/
  },
  data() {
    return {
      title: '',
      index: 0,
      env: window.env,
      list: [],

      urls: [],
      slides: [],
      detail: {}
    };
  },
  beforeRouteUpdate(to, from) {
    if (to.query.title) {
      this.index = Number(to.query.index)
      this.title = to.query.title;
      this.detail = to.query.detail;
    } else {
      this.title = this.$route.query.title || 'AKG';
      this.detail = this.$route.query.detail || {};
      this.index = Number(this.$route.query.index) || 0;
    }

  },
  created() {
    this.title = this.$route.query.title;
    this.index = Number(this.$route.query.index);
    this.initData();
  },
  methods: {
    goback() {
      this.$router.push({
        name: 'baike',
        query: {
          index: this.index
        }
      })
    },
    goLink(link) {
      window.open(link);
    },
    initData() {
      const param = {
        action: 'getLegendList'
      }
      getLegendList(param).then(res => {
        if (res.code == 0) {
          this.slides = res.data;
          this.detail = this.slides[this.index];
        } else {
          showToast(res.msg)
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.baike {
  margin: .3rem .2rem 0;
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

    span {
      margin-right: .2rem;
    }

    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
}

.banner {
  img {
    width: 100%;
  }

}

.cq-img,
.my-swipe {
  img {
    width: 100%;
  }
}
</style>
