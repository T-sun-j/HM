<template>
  <div>
    <!-- <indexHeader :active="0"></indexHeader> -->

    <div class="brand">
      <div class="pro-detail">
        <div class="go-back" @click="goback"></div>
        <!-- <img v-if="index == 1" src="../assets/img/AMX/amx-detail.png" alt="">
      <img v-if="index == 5" src="../assets/img/AMX/jbl-detail.png" alt=""> -->
        <div class="title-zone">
          <div class="title-cont">{{ productDetailsInfo.title }}</div>
          <div class="back-r">
            <img :src="require('../assets/img/back.png')" alt="" />
            <span @click="goback">返回</span>
          </div>
        </div>
        <div class="tag-cont">
          <div class="logo" v-if="productDetailsInfo.logo">
            <img
              :src="
                (productDetailsInfo.logo.includes('https') ? '' : env.imgUrl) +
                productDetailsInfo.logo
              "
              alt=""
            />
          </div>
          <div
            class="buy"
            v-if="productDetailsInfo.buytype != 0"
            @click="goBuyLink"
          ></div>
          <!-- <div class="buy-none"></div> -->
          <div class="detail-img">
            <!-- <img v-if="index == 1" src="../assets/img/amx-11.png" alt="" /> -->
            <img
              v-if="productDetailsInfo.pic"
              :src="
                (productDetailsInfo.pic.includes('https') ? '' : env.imgUrl) +
                productDetailsInfo.pic
              "
              alt=""
            />
            <div
              v-if="showContent"
              :class="['content', { extended: !showTab }]"
              ref="content"
              v-html="productDetailsInfo.content"
            ></div>
            <div class="showMore" v-if="showTab" @click="showTab = !showTab">
              <van-divider>展示全部</van-divider>
              <div>
                <img
                  class="more-icon"
                  :src="require('../assets/img/more-icon.png')"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <!-- <van-divider style="padding: 0 0.2rem" /> -->
        <div class="feature">
          <h5>产品特点</h5>
          <ul>
            <li
              v-for="(item, index) in productDetailsInfo.feature"
              :key="index"
            >
              <span class="divider"></span>
              <span class="content">{{ item.title }}</span>
            </li>
          </ul>
          <p
            v-for="(item, index) in productDetailsInfo.feature"
            :key="index"
          ></p>
        </div>
        <div class="file-zone">
          <h4>技术文档</h4>
          <ul class="file-list">
            <li
              v-for="(item, index) in productDetailsInfo.docfile"
              :key="index"
            >
              <img src="../assets/img/pdf.png" alt="" />
              <span @click="onDownload(item.listpic, item.title)">{{
                item.title
              }}</span>
              <!-- <a :href="item.listpic" download>{{ item.title }}</a> -->
            </li>
            <!-- <li>
              <img src="../assets/img/pdf.png" alt="" />
              <a href="###">技术文档1</a>
            </li> -->
          </ul>
          <div class="more-file">
            <a target="_blank" :href="productDetailsInfo.filemorelink"
              >点击查看更多技术文档</a
            >
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="cases" v-if="productDetailsInfo.senes.length !== 0">
          <indexTitle>精选案例推荐</indexTitle>
          <div class="case-list">
            <div v-for="(item, index) in productDetailsInfo.senes" :key="index">
              <cell :itemdata="item"></cell>
            </div>
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
import cell from "@/components/cell.vue";
import foot from "@/components/foot.vue";
import { getProductDetails } from "@/api/product.js";
import { showToast, showSuccessToast, showFailToast } from "vant";
export default {
  components: {
    indexHeader,
    indexTitle,
    item,
    cell,
    foot,
  },
  data() {
    return {
      env: window.env,
      navs: ["按品牌分类", "按市场分类"],
      searchText: "",
      active: 0,
      showTab: false,
      showContent: false,
      secret: 0,
      productDetailsInfo: {},
      logoAct: 0,
    };
  },
  created() {
    this.secret = this.$route.query.secret;
    this.logoAct = this.$route.query.logoAct;
    console.log("this.logoAct :", this.logoAct);
    this.getProductDetails();
    this.showContent = false;
  },
  mounted() {},
  methods: {
    getProductDetails() {
      const param = {
        action: "productDetails",
      };
      if (this.secret) {
        param.secret = this.secret;
      }

      getProductDetails(param).then((res) => {
        if (res) {
          this.productDetailsInfo = res.data;
          this.showContent = true;
          this.$nextTick(() => {
            this.showTab =
              this.productDetailsInfo.content.length > 250 ? true : false;
          });
        } else {
          showToast(res.msg);
        }
      });
    },
    goback() {
      if (this.$route.query.type === "RESULT") {
        this.$router.go(-1);
      } else {
        this.$router.push({
          name: "productData",
          query: {
            logoAct: this.logoAct,
            brandsecret: this.productDetailsInfo.brandsecret,
          },
        });
      }
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
    goBuyLink() {
      if (this.productDetailsInfo.buytype === "1") {
        window.open(this.productDetailsInfo.buylink);
      } else {
        this.coppy(this.productDetailsInfo.buylink);
      }
    },
    coppy(str) {
      this.$copyText(str).then(
        function (e) {
          showSuccessToast("内容已成功复制到剪贴板中");
          console.log(e);
        },
        function (e) {
          showFailToast("Can not copy");
          console.log(e);
        }
      );
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
    font-size: 0.2rem;
    color: #fff;

    &:first-child {
      border-right: 1px solid #0064a0;
    }
    &.active {
      background-color: #0064a0;
    }
  }
}
.logos {
  white-space: nowrap;
  overflow-y: auto;
  .logo {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.menus {
  display: flex;
  font-size: 0.24rem;
  .menu-bar {
    width: 40%;
    color: #383838;
    background-color: #f7f7f7;
    // border-right: 1px solid #717171;
    // border-bottom: 1px solid #717171;
    .bar-list {
      border-bottom: 1px solid #717171;
      li {
        border-top: 1px solid #717171;
        // border-bottom: 1px solid #717171;
        border-right: 1px solid #717171;
      }
      h4 {
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;

        background-color: #fff;
        &.active {
          background-color: #026398;
          color: #fff;
        }
      }
      p {
        padding-left: 0.54rem;
        line-height: 0.7rem;
      }
    }
  }
  .menu-cont {
    width: 60%;

    font-size: 0.24rem;
    .pro-list {
      border: 1px solid #fff;
      li {
        background-color: #eceff2;
        border-bottom: 1px solid #fff;
        color: #383838;
        padding: 0.2rem 0 0.2rem 0.15rem;
        h5 {
          margin-bottom: 0.1rem;
        }
        p {
          font-size: 0.2rem;
        }
      }
    }
    h4 {
      height: 0.8rem;
      background-color: #fff;
      line-height: 0.8rem;
      padding-left: 0.2rem;
      color: #026398;
    }
  }
}
.pro-detail {
  position: relative;
  .go-back {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
  }
  img {
    width: 100%;
  }
  margin: 0.2rem 0;
  .title-zone {
    position: relative;
    .goback {
      font-size: 0.28rem;
      color: #5a5a5a;
      position: absolute;
      top: 0.05rem;
      right: 0;
      span {
        margin-right: 0.15rem;
      }
    }
    & ::v-deep .van-icon-arrow {
      margin-left: -0.2rem;
    }
  }
  .detail-img {
    margin-top: 0.2rem;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      height: 100%;
      margin: 0 auto;
    }
    .content {
      font-size: 0.24rem;
      word-wrap: break-word;
      max-height: 2rem;
      line-height: 0.4rem;
      color: #333;
      overflow-y: hidden;
      transition: max-height 0.7s linear;
      -webkit-mask: line-gradient(red 150px, transparent 200px);
      p {
        margin-bottom: 0.1rem;
      }
      div {
        margin-bottom: 0.1rem;
      }
    }
    .extended {
      max-height: 100% !important;
    }
    .showMore {
      position: relative;
    }
    .more-icon {
      width: 0.27rem;
      height: 0.15rem;
      position: absolute;
      bottom: 0.1rem;
      left: 48%;
    }
  }
  .look-more {
    text-align: center;
    font-size: 0.24rem;
    color: #458eba;
    margin: 0.4rem 0;
    p {
      text-align: center;
      padding-bottom: 0.04rem;
      position: relative;
      width: 7.06rem;
      margin: 0 auto;
      i {
        top: 50%;
        left: 0;
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: #94b0cc;
      }
      span {
        background-color: #fff;
        position: relative;
        z-index: 10;
        padding: 0 0.1rem;
      }
    }
    img {
      width: 0.27rem;
      height: 0.15rem;
    }
  }
  .file-zone {
    border: 1px solid #0064a0;
    border-radius: 0.4rem;
    overflow: hidden;
    margin: 0.22rem;
    h4 {
      height: 0.7rem;
      line-height: 0.7rem;
      background-color: #0064a0;
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
    }
    .file-list {
      padding: 0.3rem 0.3rem;
      li {
        font-size: 0.24rem;

        display: flex;
        align-items: center;
        padding: 0.25rem 0;
        img {
          width: 0.34rem;
          height: 0.34rem;
        }
        a {
          margin-left: 0.05rem;
          color: #4d4d4d;
        }
      }
    }
  }
  .more-file {
    text-align: right;
    color: #0064a0;
    font-size: 0.24rem;
    margin: 0.2rem 0.1rem 0.2rem 0;
    a {
      color: #0064a0;
    }
  }
  .cases {
    margin-top: 0.45rem;
    padding: 0 0.22rem;
    .case-list {
      margin-top: 0.3rem;
    }
  }
}
.title-zone {
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  background-color: #29629b;
  color: #fff;
  font-size: 0.28rem;
  .title-cont {
    width: 6rem;
    line-height: 1.4;
  }
  .back-r {
    display: flex;
    align-items: center;
    span {
      font-size: 0.22rem;
    }
    img {
      width: 0.17rem;
      height: 0.19rem;
      margin-right: 0.1rem;
    }
  }
}
.feature {
  margin: 0.3rem 0;
  h5 {
    font-size: 0.28rem;
    font-weight: bold;
    color: #0064a0;
    padding-left: 0.2rem;
    line-height: 0.8rem;
  }
  .divider {
    border: 0.04rem solid #333;
    width: 0.02rem;
    height: 0.02rem;
    border-radius: 50%;
    background: #333;
    // position: absolute;
    // top: 0.2rem;
    // left: 0.2rem;
    margin-top: 0.15rem;
    margin-left: 0.2rem;
  }
  .content {
    font-size: 0.24rem;
    width: 90%;
    color: #333;
    display: inline-block;
    line-height: 0.4rem;
    text-align: left;
    padding: 0 0.2rem;
    flex: 1;
    font-family: "PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif" !important;
  }
  li {
    display: flex;
  }
}
.tag-cont {
  position: relative;
  padding: 0.95rem 0.22rem 0 0.22rem;
  .logo {
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    top: 0;
    left: 0.2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .buy {
    position: absolute;
    top: 0.1rem;
    right: 0.2rem;
    width: 0.72rem;
    height: 0.72rem;
    background: url("../assets/img/buy.png") no-repeat;
    background-size: 100% 100%;
  }
  .buy-none {
    position: absolute;
    top: 0.1rem;
    right: 0.1rem;
    width: 0.86rem;
    height: 0.86rem;
    background: url("../assets/img/non-buy.png") no-repeat;
    background-size: 100% 100%;
  }
}
/deep/.van-divider {
  color: #0064a0;
  border-color: #a3afb6;
  font-size: 0.22rem;
}
</style>
