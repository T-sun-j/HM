<template>
  <div>
    <!-- <indexHeader :active="0"></indexHeader> -->
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
    <div class="brand">
      <!-- <van-search
    @focus="goResult"
      v-model="searchText"
      placeholder="产品关键字搜索"
      input-align="center"
    /> -->
      <div class="logo-box">
        <div class="logos" ref="logoBox">
          <div
            class="logo-item"
            v-for="(item, index) in logos"
            @click="setOpacity(item, index)"
            :class="[logoAct == index ? 'active' : 'img_gray']"
            :key="index"
          >
            <img
              :src="(item.logo.includes('https') ? '' : env.imgUrl) + item.logo"
              alt=""
            />
          </div>
        </div>
      </div>

      <div v-if="show" class="menus">
        <div class="menu-bar">
          <div v-for="item in firstLevelData" :key="item.secret">
            <div class="bar-list" v-if="item.child.length === 0">
              <p
                @click="handleShow(item)"
                :class="{ active: activeItemIndex === item.secret }"
              >
                {{ item.title }}
              </p>
            </div>
            <van-collapse v-model="activeName" accordion v-else>
              <van-collapse-item :title="item.title" :name="item.secret">
                <div>
                  <p
                    v-for="itemChild in item.child"
                    :key="itemChild.secret"
                    :class="[
                      showTab ? 'active1 vanPad' : 'vanPad',
                      { active: activeItemIndex === itemChild.secret },
                    ]"
                    @click="handleShow(itemChild)"
                  >
                    {{ itemChild.title }}
                  </p>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </div>
        <div class="menu-cont">
          <ul
            class="pro-list"
            v-if="lowerData.child && lowerData.child.length !== 0"
          >
            <li v-for="(itemChild, index) in lowerData.child" :key="index">
              <h5
                class="title1"
                @click="
                  !itemChild.child || itemChild.child.length == 0
                    ? goDetail(itemChild)
                    : ''
                "
              >
                {{ itemChild.title }}
              </h5>
              <div
                v-for="(itemChild2, index2) in itemChild.child"
                :key="index2"
              >
                <h5
                  class="title2"
                  @click="
                    !itemChild2.child || itemChild2.child.length == 0
                      ? goDetail(itemChild2)
                      : ''
                  "
                >
                  {{ itemChild2.title }}
                </h5>
                <div
                  v-for="(itemChild3, index3) in itemChild2.child"
                  :key="index3"
                >
                  <h5
                    class="title3"
                    @click="
                      !itemChild3.child || itemChild3.child.length == 0
                        ? goDetail(itemChild3)
                        : ''
                    "
                  >
                    {{ itemChild3.title }}
                  </h5>
                </div>
              </div>
            </li>
          </ul>
          <div v-else>
            <van-empty description="正在建设中" />
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
import { showToast } from "vant";
import foot from "@/components/foot.vue";
import { getMaterial, getMaterialproductlist } from "@/api/product.js";
// import { proData } from "./json";
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
      show: true,
      // proData,
      firstLevelData: [],
      navs: ["按品牌分类", "画册下载"],
      searchText: "",
      active: 0,
      showTab: 0,
      logoAct: 0,
      oldLogoAct: 0,
      defaultProps: {
        children: "child",
        label: "title",
      },
      lowerData: [],
      // list: [
      //   {
      //     title: "你注册，我保障！",
      //     time: "2018年月10日",
      //     img: require("@/assets/img/home-news-1.png"),
      //   },
      //   {
      //     title: "LIFESTYLE AD ",
      //     time: "2018年月12日",
      //     img: require("@/assets/img/home-news-2.png"),
      //   },
      //   {
      //     title: "PARTNERSHIP LOCKUP ",
      //     time: "2018年月11日",
      //     img: require("@/assets/img/home-news-3.png"),
      //   },
      // ],
      logos: [],
      activeName: "",
      active: 0,
      activeItemIndex: "",
    };
  },
  created() {
    this.getMaterial(this.$route.query.brandsecret || "");
    this.logoAct = this.$route.query.logoAct || 0;
  },

  methods: {
    getMaterial(secret) {
      const param = {
        action: "material",
      };
      if (secret) {
        param.brand_secret = secret;
      }

      getMaterial(param).then((res) => {
        if (res) {
          this.firstLevelData = res.typeList;
          // this.activeItemIndex = this.firstLevelData[0].secret;
          res.productList.map((item) => (item.isProduct = true));
          this.lowerData.child = JSON.parse(JSON.stringify(res.productList));
          this.logos = res.brand;
          this.$nextTick(() => {
            const logoBox = this.$refs.logoBox;
            if (logoBox) {
              const logoItems = logoBox.getElementsByClassName("logo-item");
              if (
                logoItems &&
                logoItems.length > 0 &&
                logoItems[this.logoAct]
              ) {
                logoItems[this.logoAct].scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                if (this.oldLogoAct !== this.logoAct) {
                  this.getMaterial(this.logos[this.logoAct].secret || "");
                  this.oldLogoAct = this.logoAct;
                }
              }
            }
          });
        } else {
          showToast(res.msg);
        }
      });
    },
    setOpacity(item, index) {
      this.logoAct = index;
      this.getMaterial(item.secret);
      // this.firstLevelData = this.proData[index];
    },
    changeTab(index) {
      this.active = index;
      if (index == 1) {
        this.$router.push({
          path: "/productMarket",
        });
      }
    },
    async handleShow(data) {
      this.lowerData = [];
      this.lowerData = JSON.parse(JSON.stringify(data));
      this.activeItemIndex = data.secret;
      if (this.lowerData.child.length == 0) {
        const res = await this.getMaterialproductlist(data);
        if (res) {
          this.lowerData.child = res;
        }
      } else {
        this.lowerData.child.map(async (item) => {
          if (item.child.length > 0) {
            item.child.map(async (itemChild) => {
              if (itemChild.child.length > 0) {
                itemChild.child.map(async (itemSon) => {
                  if (itemSon.child.length === 0) {
                    const res = await this.getMaterialproductlist(itemSon);
                    if (res) {
                      itemSon.child = res;
                    }
                  } else return;
                });
              } else {
                const res = await this.getMaterialproductlist(itemChild);
                if (res) {
                  itemChild.child = res;
                }
              }
            });
          } else {
            const res = await this.getMaterialproductlist(item);
            if (res) {
              item.child = res;
            }
          }
        });
      }
    },
    async getMaterialproductlist(data) {
      const param = {
        action: "materialproductlist",
      };
      if (data.secret) {
        param.type_secret = data.secret;
      }

      try {
        const res = await new Promise((resolve, reject) => {
          getMaterialproductlist(param)
            .then((res) => {
              resolve(res);
            })
            .catch((error) => {
              reject(error);
            });
        });

        if (res) {
          res.productList.map((item) => (item.isProduct = true));
          return res.productList;
        } else {
          showToast(res.msg);
          return null;
        }
      } catch (error) {
        showToast(error.message);
        return null;
      }
    },
    goDetail(item) {
      if (item.isProduct) {
        this.$router.push({
          path: "/productDetail",
          query: {
            secret: item.secret,
            logoAct: this.logoAct,
          },
        });
      } else {
        showToast("暂无产品");
      }
    },
    goto(num) {
      this.$router.push({
        path: "/productDetail",
        query: {
          index: num,
        },
      });
    },
    goResult() {
      this.$router.push({
        path: "/result",
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

.logo-box {
  height: 1.3rem;
  overflow: hidden;
}

.logos {
  white-space: nowrap;
  overflow-y: scroll;
  display: flex;
  padding-bottom: 0.2rem;
  // .active {
  //   box-shadow: 0 5px 5px -5px grey, 0 -5px 5px -5px grey, 5px 0 5px -5px grey,
  //     -5px 0 5px -5px grey;
  // }
  .logo-item {
    width: 1.1rem;
    height: 1.1rem;
    padding: 0.1rem;
    display: inline-block;
    border: 0.01rem solid #fbf7f7;
    // border-bottom: 1px solid #bababa;
    flex-shrink: 0;

    &:last-child {
      //border: none;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.prod-detail {
  border-top: 1px solid #eee;
  position: relative;

  .r-bar {
    position: absolute;
    width: 60%;
    height: 200px;
    top: 0;
    right: 0;
  }

  img {
    width: 100%;
  }

  .data-prev {
    text-align: center;
    margin: 150px 0;
    font-size: 0.15rem;
  }
}

.menus {
  display: flex;
  font-size: 0.24rem;
  border-top: 1px solid #ccc;

  .menu-bar {
    width: 40%;
    color: #383838;
    background-color: #f7f7f7;
    .active {
      background-color: #fff;
      color: #0064a0;
    }
    .active1 {
      background-color: #fff;
      color: #0064a0;
    }
    .vanPad {
      padding: 0 0.2rem;
    }
    // border-right: 1px solid #717171;
    // border-bottom: 1px solid #717171;
    .bar-list {
      border-top: 1px solid #fff;
      background-color: #bed0e1;
      color: #000;
      p {
        padding: 0.1rem 0.1rem 0.1rem 0.3rem;
        display: flex;
        min-height: 0.6rem;
        line-height: 0.4rem;
        white-space: pre-wrap;
        align-items: center;
      }
    }
  }

  .menu-cont {
    width: 60%;
    padding-left: 0.2rem;

    font-size: 0.24rem;

    .pro-list {
      .title1 {
        background-color: #fff;
        padding: 0.1rem 0.1rem 0.1rem 0rem;
        display: flex;
        min-height: 0.6rem;
        line-height: 0.5rem;
        white-space: pre-wrap;
        align-items: center;
        color: #026398;
        border-bottom: 1px solid #7bafc9;
        font-weight: bold;
      }
      .title2 {
        width: 100%;
        padding: 0.1rem 0.1rem 0.1rem 0.2rem;
        display: flex;
        min-height: 0.6rem;
        line-height: 0.5rem;
        white-space: pre-wrap;
        align-items: center;
        background-color: #fff;
        color: #000;
        font-weight: bold;
        border-bottom: 1px solid #7bafc9;
      }
      .title3 {
        // height: 0.6rem;
        background-color: #fff;
        padding: 0.1rem 0.1rem 0.1rem 0.4rem;
        display: flex;
        min-height: 0.6rem;
        line-height: 0.5rem;
        white-space: pre-wrap;
        align-items: center;
        color: #333;
        border-bottom: 1px solid #7bafc9;
      }
    }
  }
}

/deep/.van-collapse-item,
/deep/.van-collapse-item__title {
  background: #bed0e1;
  color: #000;
  // height: 0.6rem;
  line-height: 0.4rem;
  border-top: 0.01rem solid #fff;
}
/deep/.van-collapse-item__wrapper {
  margin: 0 !important;
}
/deep/.van-collapse-item__content {
  background: #0064a0;
  color: #fff;
  padding: 0;
  margin: 0;
  p {
    // line-height: 0.6rem;
    // margin:0.3rem 0;
    padding: 0.3rem 0;
  }
  .vanPad {
    padding: 0.2rem 0.2rem !important;
  }
}
/deep/.van-collapse-item__title--expanded {
  background: #0064a0;
  color: #fff;
}
/deep/ .van-icon {
  // color: #fff;
}
.img_gray {
  // -webkit-filter: grayscale(50%);
  // -moz-filter: grayscale(50%);
  // -ms-filter: grayscale(50%);
  // -o-filter: grayscale(50%);
  filter: brightness(0);
  // filter: gray;
  opacity: 0.3;
}
/deep/.van-cell__title {
  font-size: 0.24rem;
}
</style>
