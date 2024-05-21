<template>
  <div>
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
    <div class="market-list">
      <!-- @click="goDetail(item)" -->
      <span
        class="market-item"
        v-for="(item, index) in markets"
        :key="index"
        @click="onDownload(item.docfile, item.title)"
      >
        <span>{{ item.title }}</span>
        <img :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic" alt="" />
      </span>
      <!-- <a
        class="market-item"
        :href="item.docfile"
        download
        v-for="(item, index) in markets"
        :key="index"
      >
        <span>{{ item.title }}</span
        ><img :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic" alt="" />
      </a> -->
      <!-- <div class="market-item" @click="goPDF(index)" v-for="(item,index) in markets" :key="index">
        <span>{{ item.name }}</span><img :src="item.url" alt="">
      </div> -->
    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { getPictureList } from "@/api/product.js";
import { showToast } from "vant";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      env: window.env,
      navs: ["按品牌分类", "画册下载"],
      searchText: "",
      active: 1,
      markets: [],
    };
  },
  created() {
    this.getPictureList();
  },
  methods: {
    getPictureList() {
      const param = {
        action: "getPictureList",
      };

      getPictureList(param).then((res) => {
        if (res) {
          this.markets = res.data;
        } else {
          showToast(res.msg);
        }
      });
    },
    onDownload(filepath, filename) {
      const x = new XMLHttpRequest();
      x.open("GET", filepath, true);
      x.responseType = "blob";
      x.onload = function () {
        const blob = x.response;
        const url = window.URL.createObjectURL(blob);
        // 判断是否是IE浏览器
        if (window.navigator.msSaveBlob) {
          try {
            window.navigator.msSaveBlob(blob, filename);
          } catch (e) {}
        } else {
          const a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.click();
        }
      };
      x.send();
    },
    changeTab(index) {
      this.active = index;
      if (index == 0) {
        this.$router.push({
          path: "/productData",
        });
      }
    },
    goDetail(item) {
      this.$router.push({
        path: "/productMarketDetail",
        query: {
          title: item.name,
        },
      });
    },
    goPDF(index) {
      this.$router.push({
        path: "/pdf",
        query: {
          index,
        },
      });
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
.market-list {
  .market-item {
    height: 1.2rem;
    background-color: #3db5e7;
    color: #fff;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.7rem 0 0.55rem;
    border-bottom: 1px solid #fff;
    img {
      width: 0.34rem;
      height: 0.34rem;
    }
  }
}
</style>
