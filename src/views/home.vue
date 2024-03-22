<template>
  <div class="home">
    <!-- <indexHeader></indexHeader> -->
    <div class="ser-title">
      <div class="nickname">
        <img src="../assets/img/general/user-icon.png" alt="" />
        <!-- <p>欢迎您，demo <span @click="resetName">[修改昵称]</span></p> -->
        <p>欢迎您{{ namer }}</p>
      </div>

      <img
        class="set"
        @click="goto"
        src="../assets/img/member/setup.png"
        alt=""
      />
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in focusMap" :key="index">
        <img
          class="slide-img"
          :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic"
          alt=""
        />
      </van-swipe-item>
    </van-swipe>
    <div class="home-zone">
      <indexTitle>你可能感兴趣的案例推荐</indexTitle>
      <div class="case-recommend">
        <div v-for="(item, index) in likeList" :key="index">
          <item :itemdata="item"></item>
        </div>
      </div>
      <indexTitle>你可能感兴趣的产品优惠</indexTitle>
      <div class="ads">
        <img
          v-for="(item, index) in advertisement"
          :src="(item.pic.includes('https') ? '' : env.imgUrl) + item.pic"
          :key="index"
          alt=""
        />
      </div>
    </div>
    <van-popup v-model:show="show" :style="{ padding: '10px' }">
      <div class="input-zone">
        <van-field border v-model="value" label="" placeholder="修改昵称" />
      </div>
      <div class="name-btn">
        <van-button size="small" color="#0064a0" type="primary"
          >确定</van-button
        >
      </div>
    </van-popup>
    <foot></foot>
  </div>
</template>

<script>
// import indexHeader from "@/components/header.vue";
import indexTitle from "@/components/title.vue";
import item from "@/components/item.vue";
import foot from "@/components/foot.vue";
import { getUrlString } from "@/utils/tools.js";
import { getData, getcode } from "../api";
import { showToast } from "vant";
export default {
  components: {
    // indexHeader,
    indexTitle,
    item,
    foot,
  },
  data() {
    return {
      env: window.env,
      clubsecret: "",
      phone: "",
      code: "",
      checked: false,
      show: false,
      // list:[
      //     {
      //       title:'好唱易嗨，酣畅淋漓！ 中牟 MEET PARTY KTV',
      //       // time:'中牟 MEET PARTY KTV ',
      //       img:require('@/assets/img/img/case-1.png')
      //     },
      //     {
      //       title:'声享震撼，惊艳每一次观影！ 太原铜锣湾影院',
      //       // time:'太原铜锣湾影院 ',
      //       img:require('@/assets/img/img/case-2.png')
      //     },
      //     {
      //       title:'分布式音视频系统助力高效互联！ 南通万豪酒店 ',
      //       // time:'南通万豪酒店 ',
      //       img:require('@/assets/img/img/case-3.png')
      //     }
      //   ],
      focusMap: [],
      likeList: [],
      advertisement: [],
      brand: [],
      namer: "",
    };
  },
  created() {
    this.clubsecret = localStorage.getItem("clubsecret");
    if (localStorage.getItem("namer") === null) {
      this.namer = "";
    } else {
      this.namer = "," + localStorage.getItem("namer");
    }
    if (!this.clubsecret) {
      this.clubsecret = getUrlString("secret");
      console.log("clubsecret--url->>>", this.clubsecret);
    }
    if (this.clubsecret) {
      this.initData();
    } else {
      getcode().then((res) => {
        if (res.code == 0) {
        } else {
          showToast(res.msg);
        }
      });
    }
  },
  methods: {
    initData() {
      const param = {
        action: "clubsecretlogin",
        clubsecret: this.clubsecret,
      };
      getData(param).then((res) => {
        if (res.code == 0) {
          const pageData = res.pageData;
          Object.assign(this, {
            focusMap: pageData.focusMap,
            likeList: pageData.likeList,
            advertisement: pageData.advertisement,
            brand: pageData.brand,
          });
          this.likeList = pageData.likeList.map((item) => {
            return {
              ...item,
              pic:
                (item.pic.includes("https") ? "" : this.env.imgUrl) + item.pic,
            };
          });
        } else {
          showToast(res.msg);
        }
      });
    },
    resetName() {
      this.show = true;
    },
    goto() {
      this.$router.push({
        name: "register",
        query: {
          secret: this.clubsecret,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .ser-title {
    background-color: #0064a0;
    height: 1.22rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 0.28rem;
    padding: 0 0.3rem;
    .nickname {
      display: flex;
      align-items: center;

      p {
        margin-left: 0.2rem;
        span {
          font-size: 0.2rem;
        }
      }
    }
    img {
      width: 0.48rem;
      height: 0.48rem;
    }
  }
  .slide-img {
    width: 100%;
    height: auto;
  }
  .home-zone {
    margin: 0.3rem 0.16rem;
  }
  .case-recommend {
    margin: 0.2rem 0 0.4rem 0;
  }
  .ads {
    margin: 0.25rem 0;
    img {
      width: 100%;
      margin-bottom: 0.1rem;
    }
  }
}
.input-zone {
  width: 6rem;
}
.name-btn {
  display: flex;
  flex-direction: row-reverse;
  border-top: 1px solid #eee;
  padding-top: 0.2rem;
}
</style>
