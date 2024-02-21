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
          <img :src="env.imgUrl + item.pic" alt="" />
        </li>

      </ul>
    </div>
    <div class="offline" v-if="active == 1">
      <h3 class="line-title">授权店铺</h3>
      <ul class="shop-list">
        <li v-for="(item, index) in shops" :key="index">
          <p class="annotation">
          <div class="bg"></div>
          <span @click="onMap(item)" style="padding-left: 0.1rem;">
            <img class="imgCss" src="../assets/img/map-icon.png" />
            {{ item.addr }}
          </span>
          <span  style="padding-right: 0.1rem;">
            <img class="imgCss" src="../assets/img/phone-icon.png" />
            <a :href="'tel:' + item.tel">{{ item.tel }}</a>
          </span>
          </p>
          <img :src="env.imgUrl + item.pic" alt="">
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
      active: 0,
      navs: ["线上电商", "线下体验"],
      env: window.env,
      shops: [],
      links: [],
      // shops: [
      //   {
      //     address: '杭州市西湖大道18号4楼D05',
      //     phone: '0571-85771957',
      //     coord: '30.246305,120.180271',
      //     url: require('../assets/img/e-commerce/offline-icon-1.png')
      //   },
      //   {
      //     address: '广州市东方国际商业广场三楼东二街302-305',
      //     phone: '13602222018',
      //     coord: '23.120665,113.377239',
      //     url: require('../assets/img/e-commerce/offline-icon-2.png')
      //   },
      //   {
      //     address: '香港市九龙区深水埗长沙湾道248号地铺',
      //     phone: '852-28111259',
      //     coord: '22.327951,114.167596',
      //     url: require('../assets/img/e-commerce/offline-icon-3.png')
      //   },
      // ],
      // links: [
      //   {
      //     //name:'哈曼专业旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-1.png'),
      //     link: 'https://shop.m.jd.com/shop/home?shopId=11593247&venderId=11875351&skuId=10050624968768&categoryId=652_828_841&sceneval=2&jxsid=16959026724906073721&_fd=jdm%2Cjdm'
      //   },
      //   {
      //     //name:'HARMAN <br />音乐设备旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-2.png'),
      //     link: 'https://harman.tmall.com/'
      //   },
      //   {
      //     //name:'JBL <br />KTV音响旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-3.png'),
      //     link: 'https://mall.jd.com/index-11859975.html?from=pc'
      //   },
      //   {
      //     // name:'JBL<br />专业影音旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-4.png'),
      //     link: 'https://mall.jd.com/index-12637963.html?from=pc'
      //   },
      //   {
      //     //name:'AKG<br />专业音频旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-5.png'),
      //     link: 'https://mall.jd.com/index-12276420.html'
      //   },

      //   {
      //     //name:'JBL专业<br />KTV音响旗舰店',
      //     url: require('../assets/img/e-commerce/e-commerce-icon-6.png'),
      //     link: '抖音APP-搜索抖音号“34082895249”-“进入店铺”'
      //   },
      // ],
      key: 'OTABZ-VSN6Z-KM2XL-ZD4C7-UB6I2-PMBG7'
    };
  },
  created() {
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
  padding: 0 .3rem;
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
