<template>
  <div>
    <!-- <indexHeader :active="2"></indexHeader> -->
    <div class="baike">
      <div class="title-zone">
        <indexTitle>传奇经历</indexTitle>
        <!-- <div class="goback">
          <van-icon name="arrow" /><van-icon name="arrow" />
        </div> -->
      </div>
      <van-swipe
        :initial-swipe="current"
        class="my-swipe"
        :autoplay="5000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(item, index) in slides" :key="index">
          <img
            @click="gotoDetail(item, index)"
            class="slide-img"
            :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic"
            alt=""
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div class="wx-btn">哈曼专业中国客户服务中心 </div> -->
    <foot></foot>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showToast } from "vant";
import { getLegendList } from "../api/baikeApi";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      current: 0,
      changeCurrent: 0,
      name: "",
      index: 0,
      //AKG，AMX，BBS，Crown，dbx，JBL，Lexicon，Martin，Soundcraft
      // slides: [
      //   {
      //     name: 'AKG',
      //     url: require('../assets/img/about/1.png')
      //   }

      //   ,
      //   {
      //     name: 'AMX',
      //     url: require('../assets/img/about/2.png')
      //   }
      //   ,
      //   {
      //     name: 'BBS',
      //     url: require('../assets/img/about/3.png')
      //   }
      //   ,
      //   {
      //     name: 'CROWN',
      //     url: require('../assets/img/about/4.png')
      //   }
      //   ,
      //   {
      //     name: 'dbx',
      //     url: require('../assets/img/about/5.png')
      //   }
      //   ,
      //   {
      //     name: 'JBL PROFESSIONAL',
      //     url: require('../assets/img/about/6.png')
      //   },
      //   {
      //     name: 'JBL ENTERTAINMENT',
      //     url: require('../assets/img/about/66.png')
      //   }
      //   ,
      //   {
      //     name: 'Lexicon',
      //     url: require('../assets/img/about/7.png')
      //   }
      //   ,
      //   {
      //     name: 'Martin',
      //     url: require('../assets/img/about/8.png')
      //   }
      //   ,
      //   {
      //     name: 'Soundcraft',
      //     url: require('../assets/img/about/9.png')
      //   }
      //   ,
      // ],
      slides: [],
      swipes: [require("../assets/img/about/1.png")],
      env: window.env,
    };
  },
  watch: {
    $route(val) {
      console.log(val);
    },
  },
  beforeRouteUpdate(to, from) {
    if (to.query.title) {
      this.index = Number(to.query.index);
      this.title = to.query.title;
      this.swipes = this.slides[this.index];
    } else {
      this.title = this.$route.query.title || "AKG";
      this.index = Number(this.$route.query.index) || 0;
      this.swipes = [require("../assets/img/about/1.png")];
    }
  },
  created() {
    this.initData();
    this.$nextTick(() => {
      this.title = this.$route.query.title || "AKG";
      this.index = Number(this.$route.query.index) || 0;

      this.current = this.index;
      console.log("this.current---->", this.current);
    });
  },
  methods: {
    gotoDetail(item, index) {
      this.$router.push({
        path: "/baikeDetail",
        query: {
          title: item.title,
          index: index,
        },
      });
    },
    // changePage(index){

    // }
    initData() {
      const param = {
        action: "getLegendList",
      };
      getLegendList(param).then((res) => {
        if (res.code == 0) {
          this.slides = res.data;
          this.swipes = this.slides[this.index];
        } else {
          showToast(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.baike {
  margin: 0.3rem 0.2rem 0;
}

.title-zone {
  position: relative;
  margin-bottom: 0.16rem;

  .goback {
    font-size: 0.3rem;
    color: #5a5a5a;
    position: absolute;
    top: 0;
    right: 0;

    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
}

.my-swipe {
  margin-bottom: 1rem;
}

.slide-img {
  width: 100%;
}

.wx-btn {
  background-color: #0064a0;
  height: 0.72rem;
  line-height: 0.72rem;
  width: 5.25rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  margin: 0.6rem auto 1rem;
  border-radius: 0.36rem;
}
</style>
