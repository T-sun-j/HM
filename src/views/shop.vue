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
            <span style="padding-right: 0.1rem;">
              <img class="imgCss" src="../assets/img/phone-icon.png" />
              <a :href="'tel:' + item.tel">{{ item.tel }}</a>
            </span>
          </div>
          <img :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic" alt="">
        </li>

      </ul>
    </div>
    <div class="dealer" v-if="active == 2">
      <div v-if="company==''" class="dealer-search">
        <h3 class="dealer-title">授权经销商查询</h3>
        <div style="width: 100%;">
          <input v-model="dealerTitle" class="dealer-input" type="text"
            style="width: 100%; box-sizing: border-box; display: block;" placeholder="请输入完整的公司名称" />
        </div>
        <button class="dealer-btn" style="width: 100%;" @click="onDealerSearch">开始查询</button>
        <div  class="dealer-search" style="text-align: center;">
        
          <div style="margin: 0.4rem 0 0.4rem 0; color: #2a78b6; font-size: 0.32rem; font-weight: bold; text-align: center; letter-spacing: 0.08em; display: flex; justify-content: center; align-items: center;">
            或
          </div>
          <div @click="onScanQRCode" style="display: flex; flex-direction: column; align-items: center; cursor: pointer;">
            <img src="@/assets/img/code.png" alt="scan qr" style="width: 1.2rem; height: 1.2rem; margin-bottom: 0.08rem;" />
            <div style="color: #2a78b6; font-size: 0.24rem; margin-top: 0.2rem; font-weight: bold;">点击扫描二维码</div>
          </div>
        </div>
      </div>

      <div v-else class="dealer-result">
        <div class="dealer-result-header" style="display: flex; align-items: center; margin-bottom: 0.18rem;">
          <p class="dealer-result-title" style="font-weight: bold; font-size: 0.28rem; margin: 0; flex: none;">查询结果</p>
          <span class="dealer-back" @click="resetDealer"
            style="margin-left: auto; color: #2a78b6; font-size: 0.22rem; display: flex; align-items: center; cursor: pointer;">
            <van-icon name="arrow-left" style="font-size: 0.32rem; margin-right: 0.04rem; color: #2a78b6; font-weight: bold;" />
            <span style="color: #2a78b6; font-size: 0.24rem; font-weight: bold;">返回</span>
          </span>
        </div>

        <div v-if="dealerResult!==null" >
          <p style="color: #2a78b6; font-size: 0.3rem; margin-bottom: 0.18rem; margin-top: 0.38rem;">
            {{ dealerResult.title }}
          </p>
          <p class="dealer-auth-text"
            style="color: #222; font-size: 0.24rem; font-weight: bold; margin-bottom: 0.18rem;">
            属于哈曼授权经销商，可放心购买。
          </p>
          <ul class="dealer-info" style="color: #888; font-size: 0.22rem; line-height: 1.7;">
            <li style="margin-bottom: 0.02rem;font-size: 0.22rem; ">地址: {{ dealerResult.dizhi }}</li>
            <li style="margin-bottom: 0.02rem;font-size: 0.22rem; ">联系人: {{ dealerResult.chuanzhen }}</li>
            <li style="margin-bottom: 0.02rem;font-size: 0.22rem; ">联系方式: {{ dealerResult.shouji }}</li>
            <li>邮箱: <span style="color: #888;font-size: 0.22rem; ">{{ dealerResult.mail }}</span></li>
          </ul>

          <div class="dealer-certification">
            <div class="dealer-cert-images">
              <div class="dealer-cert-item" v-if="dealerResult && dealerResult.gongzhang">
                <img
                  :src="(dealerResult.gongzhang && dealerResult.gongzhang.includes('https') ? '' : env.imgUrl) + dealerResult.gongzhang"
                  alt="认证" width="100%" height="100%"/>
              </div>

            </div>
          </div>
        </div>

        <div v-else class="dealer-unauthorized">
          <p class="dealer-company-name">{{company}}</p>
          <p class="dealer-unauth-text">未查到属于哈曼国际授权经销商，请谨慎购买。</p>
          <div class="dealer-tips">
            <p>你可以，</p>
            <ul>
              <li>1.  再次确认您所输入的企业全称是否正确，并再次查询；</li>
              <li>2. 更换另一家授权企业进行查询。</li>
            </ul>
          </div>
        </div>
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
      navs: ["线上电商", "线下体验", "经销商查询"],
      env: window.env,
      shops: [],
      links: [],
      key: 'OTABZ-VSN6Z-KM2XL-ZD4C7-UB6I2-PMBG7',
      company: '',
      dealerTitle: '',
      dealerResult: null,
      html5QrCode: null,
      scannedResult: null,
    };
  },
  created() {
    this.active = this.$route.query.active || 0;
    this.company = this.$route.query.company || '';
    if (this.company) {
      this.dealerTitle = this.company;
      this.onDealerSearch();
    }
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
      } else if (this.active === 0) {
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
      } else if (this.active === 2 && !this.company) {
        // 只有当没有company参数时才重置经销商信息
        this.resetDealer();
      }

    },
    onDealerSearch() {
      if (!this.dealerTitle) {
        showToast('请输入完整的公司名称');
        return;
      }
      const params = {
        action: 'searhdistributor',
        title: this.dealerTitle,
      };
      searhdistributor(params).then(res => {
        if (res && res.code == 0) {
          this.company = this.dealerTitle;
          this.dealerResult = res.dataList[0] || null;
          console.log(res.dataList)
          console.log(this.company)
        } else {
          showToast(res.msg || '查询失败');
        }
      });
    },
    resetDealer() {
      this.dealerTitle = '';
      this.company = '';
      this.dealerResult = null;
      //TODO: 返回上一页：二维码清空，标题清空
    },
    changeTab(index) {
      this.active = index;
      // 如果切换到经销商查询标签且有company参数，不需要重置
      if (index === 2 && this.company) {
        // 保持当前经销商查询结果
      } else {
        this.initData();
      }
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
    },
    onScanQRCode() {
    
      
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

    // &:first-child {
    //   border-right: 1px solid #0064a0;
    // }

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

.dealer {
  padding: .3rem;

  .dealer-title {
    font-weight: bold; 
    color: #0064a0;
    font-size: .26rem;
    margin-bottom: .2rem;
    margin-top: .2rem;
  }

  .dealer-input {
    height: .8rem;
    border: 1px solid #fff;
    background-color: #e3e3e3;
    border-radius: .18rem;
    padding: 0 .2rem;
    font-size: .22rem;
    // margin-bottom: .3rem;
  }

  .dealer-btn {
    height: .8rem;
    background-color: #0064a0;
    color: #fff;
    border: none;
    border-radius: .18rem;
    font-size: .28rem;
  }

  .dealer-result-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: .1rem;
    margin-bottom: .2rem;

    .dealer-company {
      color: #2a78b6;
    }

    .dealer-back {
      margin-left: auto;
      color: #2a78b6;
      cursor: pointer;
    }
  }

  .dealer-auth-text {
    color: #2a78b6;
    font-size: .24rem;
    margin-bottom: .2rem;
  }

  .dealer-company-name {
    color: #2a78b6;
    font-size: .3rem;
    margin-bottom: .18rem;
    margin-top: .38rem;
  }

  .dealer-unauth-text {
    color: #ff0000;
    font-size: .24rem;
    font-weight: bold;
    margin-bottom: .18rem;
  }

  .dealer-tips {
    color: #888;
    font-size: .22rem;
    margin-top: .3rem;
    
    p {
      margin-bottom: .1rem;
    }
    
    ul {
      // padding-left: .4rem;
      
      li {
        line-height: 1.7;
        margin-bottom: .02rem;
      }
    }
  }

  .dealer-info {
    margin: .2rem 0 .3rem;

    li {
      line-height: .4rem;
      font-size: .24rem;
    }
  }

  .dealer-extra {
    display: flex;
    gap: .2rem;
    align-items: center;
    margin-bottom: .3rem;

    img {
      width: 1.6rem;
      height: 1.6rem;
      object-fit: contain;
    }
  }
}
</style>
