<template>
  <div>
  <div class="top">
    <div class="header">
      <div class="nav-icon" :class="{ 'nav-x': type }" @click="handleNav"></div>
      <div @click="goClub" class="person-icon"></div>
      <div @click="goHome" class="logo"></div>
      <ul class="nav-list" v-if="type">
        <li
          v-for="(item, index) in menus"
          :key="index"
          @click="chooseMenu(item, index)"
        >
          <img :src="item.img" alt="" /><span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
    <van-search
      v-if="showSearch"
      v-model="searchText"
      placeholder="搜索"
      input-align="center"
    />
    <!--  -->
    
  </div>
  <ul v-if="showNav" class="nav" :class="{ top10: !showSearch }">
      <li
        class="nav-item"
        :class="[active == index ? 'active' : '']"
        @click="chooseNav(item, index)"
        v-for="(item, index) in navs"
        :key="index"
      >
        {{ item.name }}
      </li>
    </ul>
</div>
</template>

<script>
export default {
  // props:{
  //   active:{
  //     type:Number,
  //     default:-1
  //   }
  // },
  data() {
    return {
      showSearch: false,
      searchText: "",
      type: false,
      showNav: true,
      // active: 0,
      //navs:['产品资料库','应用案例','哈曼百科','学习中心','如何购买','售后服务','曼粉俱乐部','经销商通道'],
      navs: [
        {
          name: "产品资料库",
          url: "productData",
        },
        {
          name: "应用案例",
          url: "case",
        },
        {
          name: "哈曼百科",
          url: "baike",
        },
        {
          name: "学习中心",
          url: "https://apptzwcem9s4675.h5.xiaoeknow.com/mp/eyJpZCI6MTQzNTY4Mn0?entry=2&entry_type=2001&from=groupmessage&isappinstalled=0",
        },
        {
          name: "如何购买",
          url: "shop",
        },
        {
          name: "售后服务",
          url: "service",
        },
        {
          name: "曼粉俱乐部",
          url: "home",
        },
        {
          name: "经销商通道",
          url: "loginDeal",
        },
      ],
      menus: [
        {
          name: "首页",
          img: require("../assets/img/menu/menu-icon-0.png"),
          url: "index",
        },
        {
          name: "产品资料库",
          img: require("../assets/img/menu/menu-icon-1.png"),
          url: "productData",
        },

        {
          name: "应用案例",
          img: require("../assets/img/menu/menu-icon-2.png"),
          url: "case",
        },
        {
          name: "哈曼百科",
          img: require("../assets/img/menu/menu-icon-3.png"),
          url: "baike",
        },
        {
          name: "学习中心",
          img: require("../assets/img/menu/menu-icon-4.png"),
          url: "https://apptzwcem9s4675.h5.xiaoeknow.com/mp/eyJpZCI6MTQzNTY4Mn0?entry=2&entry_type=2001&from=groupmessage&isappinstalled=0",
        },
        {
          name: "如何购买",
          img: require("../assets/img/menu/menu-icon-5.png"),
          url: "shop",
        },
        {
          name: "售后服务",
          img: require("../assets/img/menu/menu-icon-6.png"),
          url: "service",
        },
        {
          name: "曼粉俱乐部",
          img: require("../assets/img/menu/menu-icon-7.png"),
          url: "home",
        },
        {
          name: "经销商通道",
          img: require("../assets/img/menu/menu-icon-8.png"),
          url: "loginDeal",
        },
      ],
      active: -1,
    };
  },
  watch: {
    showSearch(val) {
      if (val) {
        if(this.$route.name == 'productDetail'){
          document.body.style.marginTop = "2.8rem";
          console.log(1);
        } else {
          document.body.style.marginTop = `calc(1.7rem + 54px)`;
          console.log(2);
        }
        
      } else {
        if(this.$route.name == 'productDetail'){
          document.body.style.marginTop = "1.8rem";
          console.log(3);
        } else {
          document.body.style.marginTop = "1.7rem";
          console.log(4);
        }
       
      }
    },
    $route: {
      handler(val,oldVal) {
        this.$nextTick(() => {
          if (val.name == "productDetail") {
            this.showNav = false;
            document.body.style.marginTop = "1.8rem";
            console.log(5);
            //
          } else {
            this.showNav = true;
            //
            if(this.showSearch){
              document.body.style.marginTop = `calc(1.7rem + 54px)`;
            } else {
              document.body.style.marginTop = "1.7rem";
            }
            // 
            
            console.log(6);
          }
        });
      },
      immediate:true
    },
  },
  activated() {
    this.active = -1;

    console.log("this.active--1-->", this.active);
  },
  created() {},
  methods: {
    handleNav() {
      this.type = !this.type;
    },
    chooseNav(item, index) {
      if (item.name == "学习中心") {
        window.open(
          "https://apptzwcem9s4675.h5.xiaoeknow.com/mp/eyJpZCI6MTQzNTY4Mn0?entry=2&entry_type=2001&from=groupmessage&isappinstalled=0"
        );
      } else {
        this.active = index;
        this.$router.push({
          name: item.url,
        });
      }
    },
    chooseMenu(item, index) {
      this.type = false;
      if (item.name == "学习中心") {
        window.open(
          "https://apptzwcem9s4675.h5.xiaoeknow.com/mp/eyJpZCI6MTQzNTY4Mn0?entry=2&entry_type=2001&from=groupmessage&isappinstalled=0"
        );
      } else {
        this.active = index - 1;
        this.$router.push({
          name: item.url,
        });
      }
    },
    goHome() {
      this.active = -1;
      this.type = false;
      this.$router.push({
        name: "index",
      });
    },
    goClub() {
      this.showSearch = !this.showSearch;
      return;
      this.type = false;
      this.active = 6;
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.top10 {
  padding-top: 0.15rem !important;
}
.top {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  // height: 3.2rem;
  z-index: 1000;
  background: #fff;
}
.header {
  background-color: #0064a0;
  height: 1.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.3rem;
  position: relative;
  box-sizing: border-box;
  z-index: 100;
  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1.87rem;
    height: 1.01em;
    background: url("../assets/img/general/top-logo-test.png") no-repeat;
    background-size: 100% 100%;
  }
  .person-icon {
    width: 0.64rem;
    height: 0.64rem;
    background: url("../assets/img/general/search-icon.png") no-repeat;
    background-size: 100% 100%;
  }
  .nav-icon {
    width: 0.64rem;
    height: 0.64rem;
    background: url("../assets/img/general/menu-icon.png") no-repeat;
    background-size: 100% 100%;
  }
  .nav-x {
    background: url("../assets/img/general/menu-icon-close.png") no-repeat;
    background-size: 100% 100%;
  }
  .nav-list {
    position: fixed;
    z-index: 100;
    top: 1.7rem;
    left: 0;
    width: 100%;
    height: calc(100vh - 1.7rem);
    background-color: #fff;
    li {
      height: 1.16rem;
      display: flex;
      // justify-content: center;
      align-items: center;
      font-size: 0.28rem;
      color: #616161;
      border-bottom: 1px solid #eaeaed;
      img {
        width: 0.38rem;
        height: 0.38rem;
        margin-right: 0.16rem;
        margin-left: 35%;
      }
      span {
        margin-left: 0.05rem;
      }
    }
  }
}
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
  padding: 0 0.14rem 0.02rem 0.14rem;
  .nav-item {
    width: 1.7rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.6rem;
    color: #616161;
    font-size: 0.24rem;
    border-radius: 0.12rem;
    background-color: #eceff2;
    margin-bottom: 0.1rem;
    &.active {
      background-color: #0064a0;
      color: #fff;
    }
  }
}
.top ::v-deep .van-search {
  padding-left: 0.14rem !important;
  padding-right: 0.14rem !important;
}
</style>
