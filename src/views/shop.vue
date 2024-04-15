<template>
  <div>
    <!-- <indexHeader :active="4"></indexHeader> -->
    <div class="pro-nav">
      <div class="pro-item" :class="[active == index ? 'active' : '']" @click="changeTab(index)"
        v-for="(item, index) in navs" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="online" v-if="active == 0">

      <ul class="card-list">
        <li @click="goto(item)" v-for="(item, index) in links" :key="index">
          <!-- <p v-html="item.title"></p> -->
          <img :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic" alt="" />
        </li>

      </ul>
    </div>
    <div class="offline" v-if="active == 1">
      <!-- <h3 class="line-title">授权店铺</h3> -->
      <ul class="shop-list">
        <li v-for="(item, index) in shops" :key="index">
          <div class="annotation">
            <div class="bg"></div>
            <span @click="onMap(item)" style="padding-left: 0.1rem;">
              <img class="imgCss" src="../assets/img/map-icon.png" />
              {{ item.addr }}
            </span>
            <span  style="padding-right: 0.1rem;">
              <img class="imgCss" src="../assets/img/phone-icon.png" />
              <a :href="'tel:' + item.tel">{{ item.tel }}</a>
            </span>
          </div>
          <img :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic" alt="">
        </li>

      </ul>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { showToast, showSuccessToast, showFailToast } from 'vant';
import { getOnlineStore, getOfflineStore } from "../api/shopApi";

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
      active: 0,
      navs: ["线上电商", "线下体验"],
      env: window.env,
      shops: [],
      links: [],
      key: 'OTABZ-VSN6Z-KM2XL-ZD4C7-UB6I2-PMBG7'
    };
  },
  created() {
    this.active = this.$route.query.active || 0;
    this.initData();
  },
  methods: {
    initData() {
      if (this.active === 1) {
        const param = {
          action: 'getOfflineStore'
        }
        getOfflineStore(param).then(res => {
          if (res.code == 0) {
            this.shops = res.data
          } else {
            showToast(res.msg)
          }
        })
      } else {
        const param = {
          action: 'getOnlineStore'
        }
        getOnlineStore(param).then(res => {
          if (res.code == 0) {
            this.links = res.data;
          } else {
            showToast(res.msg)
          }
        })
      }

    },
    changeTab(index) {
      this.active = index;
      this.initData();
    },
    goto(item) {
      if (item.types == 2) {
        this.coppy(item.link)
      } else {
        window.open(item.link)
      }
    },
    coppy(str) {
      this.$copyText(str).then(function (e) {
        showSuccessToast('内容已成功复制到剪贴板中')
        console.log(e)
      }, function (e) {
        showFailToast('Can not copy')
        console.log(e)
      })

    },
    onMap(item) {
      window.open(`https://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${item.latitude};title:${item.title};addr:${item.addr}&key=${this.key}&referer=${this.key}`)
    }
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

.shop-title {
  text-align: center;
  color: #458eb7;
  font-size: 0.24rem;
  line-height: 0.86rem;
}

.card-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 0.45rem;
  margin-top: .4rem;

  li {
    position: relative;
    width: 3.1rem;
    height: 2.04rem;
    margin-bottom: .3rem;
    border-radius: 0.12rem;

    p {
      position: absolute;
      width: 100%;
      height: 1.45rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.26rem;
      color: #0064a0;
      font-weight: bold;
      line-height: 1.5;
      text-align: center;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.offline {
  padding: .3rem .3rem 0;
}

.line-title {
  color: #458eb7;
  font-size: 0.24rem;
  line-height: 0.86rem;
}

.shop-list {
  li {
    margin-bottom: .3rem;
    position: relative;
    height: 3rem;
    border-radius: 0.12rem;

    img {
      // display: block;
      width: 100%;
      height: 100%;
      border-radius: 0.12rem;
    }
  }
}

.annotation {
  position: absolute;
  display: block;
  bottom: 0;
  height: 0.5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .bg {
    height: 100%;
    width: 100%;
    background: #000;
    opacity: 0.6;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0.12rem;
    border-bottom-right-radius: 0.12rem;
    z-index: 1;
  }

  span {
    color: #fff;
    font-size: 0.22rem;
    line-height: 0.26rem;
    padding: 0 0.05rem;
    z-index: 2;
    display: flex;
    align-items: center;

    .van-icon {
      font-size: 0.28rem;
      margin-right: 0.05rem;
    }

    a {
      color: #fff;
    }

    .imgCss {
      margin-right: 0.1rem;
      width: auto;
      height: 60%;

    }
  }
}
</style>
