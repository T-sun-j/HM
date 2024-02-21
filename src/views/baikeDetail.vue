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
            <img class="slide-img" :src="item" alt="">
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
      // urls: [
      //   'https://akg.com',
      //   'https://amx.com',
      //   'https://bssaudio.com',
      //   'https://crownaudio.com',
      //   'https://dbxpro.com',
      //   'https://jblpro.com',
      //   'https://jblpro.com',
      //   'https://lexiconpro.com',
      //   'https://martin.com',
      //   'https://soundcraft.com'

      // ],
      urls: [],
      slides: [],
      // slides: [
      //   [
      //     require('../assets/img/about/1/1-1-1.png'),
      //     require('../assets/img/about/1/1-1-2.png'),
      //     require('../assets/img/about/1/1-1-3.png'),
      //     require('../assets/img/about/1/1-1-4.png'),
      //     require('../assets/img/about/1/1-1-5.png'),
      //     require('../assets/img/about/1/1-1-6.png'),
      //     require('../assets/img/about/1/1-1-7.png'),
      //     require('../assets/img/about/1/1-1-8.png'),
      //   ],
      //   [
      //     require('../assets/img/about/2/2-1-1.png'),
      //     require('../assets/img/about/2/2-1-2.png'),
      //     require('../assets/img/about/2/2-1-3.png'),
      //     require('../assets/img/about/2/2-1-4.png'),
      //   ],
      //   [
      //     require('../assets/img/about/3/3-1-1.png'),
      //     require('../assets/img/about/3/3-1-2.png'),
      //     require('../assets/img/about/3/3-1-3.png'),
      //     require('../assets/img/about/3/3-1-4.png'),
      //   ],
      //   [
      //     require('../assets/img/about/4/4-1-1.png'),
      //     require('../assets/img/about/4/4-1-2.png'),
      //     require('../assets/img/about/4/4-1-3.png'),
      //     require('../assets/img/about/4/4-1-4.png'),
      //     require('../assets/img/about/4/4-1-5.png'),
      //     require('../assets/img/about/4/4-1-6.png'),
      //     require('../assets/img/about/4/4-1-7.png'),
      //     require('../assets/img/about/4/4-1-8.png'),

      //   ],
      //   [
      //     require('../assets/img/about/5/5-1-1.png'),
      //     require('../assets/img/about/5/5-1-2.png'),
      //     require('../assets/img/about/5/5-1-3.png'),
      //   ],
      //   [
      //     require('../assets/img/about/6/6-1-1.png'),
      //     require('../assets/img/about/6/6-1-2.png'),
      //     require('../assets/img/about/6/6-1-3.png'),
      //     require('../assets/img/about/6/6-1-4.png'),
      //     require('../assets/img/about/6/6-1-5.png'),
      //     require('../assets/img/about/6/6-1-6.png'),
      //     require('../assets/img/about/6/6-1-7.png'),
      //     require('../assets/img/about/6/6-1-8.png'),
      //     require('../assets/img/about/6/6-1-9.png'),
      //     require('../assets/img/about/6/6-1-10.png'),
      //     require('../assets/img/about/6/6-1-11.png'),
      //     require('../assets/img/about/6/6-1-12.png'),
      //     require('../assets/img/about/6/6-1-13.png'),
      //     require('../assets/img/about/6/6-1-14.png'),
      //     require('../assets/img/about/6/6-1-15.png'),
      //     require('../assets/img/about/6/6-1-16.png'),
      //     require('../assets/img/about/6/6-1-17.png'),
      //     require('../assets/img/about/6/6-1-18.png'),
      //     require('../assets/img/about/6/6-1-19.png'),
      //     require('../assets/img/about/6/6-1-20.png'),
      //     require('../assets/img/about/6/6-1-21.png'),
      //     require('../assets/img/about/6/6-1-22.png'),
      //   ],
      //   [
      //     require('../assets/img/about/66/66-1-1.png'),
      //     require('../assets/img/about/66/66-1-2.png'),
      //     require('../assets/img/about/66/66-1-3.png'),
      //     require('../assets/img/about/66/66-1-4.png'),
      //     require('../assets/img/about/66/66-1-5.png'),
      //     require('../assets/img/about/66/66-1-6.png'),
      //     require('../assets/img/about/66/66-1-7.png'),
      //   ],
      //   [
      //     require('../assets/img/about/7/7-1-1.png'),
      //     require('../assets/img/about/7/7-1-2.png'),
      //     require('../assets/img/about/7/7-1-3.png'),
      //     require('../assets/img/about/7/7-1-4.png'),
      //   ],
      //   [
      //     require('../assets/img/about/8/8-1-1.png'),
      //     require('../assets/img/about/8/8-1-2.png'),
      //     require('../assets/img/about/8/8-1-3.png'),
      //     require('../assets/img/about/8/8-1-4.png'),
      //     require('../assets/img/about/8/8-1-5.png'),
      //     require('../assets/img/about/8/8-1-6.png'),
      //     require('../assets/img/about/8/8-1-7.png'),
      //     require('../assets/img/about/8/8-1-8.png'),
      //     require('../assets/img/about/8/8-1-9.png'),
      //     require('../assets/img/about/8/8-1-10.png'),
      //   ],
      //   [
      //     require('../assets/img/about/9/9-1-1.png'),
      //     require('../assets/img/about/9/9-1-2.png'),
      //     require('../assets/img/about/9/9-1-3.png'),
      //     require('../assets/img/about/9/9-1-4.png'),
      //     require('../assets/img/about/9/9-1-5.png'),
      //     require('../assets/img/about/9/9-1-6.png'),
      //   ],

      // ],
      swipes: [require('../assets/img/about/1.png')],
      detail: {}
    };
  },
  beforeRouteUpdate(to, from) {
    if (to.query.title) {
      this.index = Number(to.query.index)
      this.title = to.query.title;
      this.detail = to.query.detail;
      this.swipes = this.slides[this.index];
    } else {
      this.title = this.$route.query.title || 'AKG';
      this.detail = this.$route.query.detail || {};
      this.index = Number(this.$route.query.index) || 0;
      this.swipes = [require('../assets/img/about/1.png')]
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
